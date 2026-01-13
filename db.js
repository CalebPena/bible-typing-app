// IndexedDB wrapper for Bible Type stats

const DB_NAME = 'BibleTypeDB';
const DB_VERSION = 2;

let db = null;

// Initialize the database
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = event.target.result;

            // Store for chapter stats
            // Key: "bookIndex-chapter" (e.g., "0-1" for Genesis 1)
            if (!database.objectStoreNames.contains('chapters')) {
                const chapterStore = database.createObjectStore('chapters', { keyPath: 'id' });
                chapterStore.createIndex('bookIndex', 'bookIndex', { unique: false });
            }

            // Store for app state (replaces localStorage for main state)
            if (!database.objectStoreNames.contains('state')) {
                database.createObjectStore('state', { keyPath: 'key' });
            }

            // Store for daily sessions
            // Key: "YYYY-MM-DD" date string
            if (!database.objectStoreNames.contains('dailySessions')) {
                database.createObjectStore('dailySessions', { keyPath: 'date' });
            }
        };
    });
}

// Get a chapter's stats
async function getChapterStats(bookIndex, chapter) {
    const id = `${bookIndex}-${chapter}`;
    return new Promise((resolve, reject) => {
        const tx = db.transaction('chapters', 'readonly');
        const store = tx.objectStore('chapters');
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

// Save chapter stats
async function saveChapterStats(bookIndex, chapter, stats) {
    const id = `${bookIndex}-${chapter}`;
    const record = {
        id,
        bookIndex,
        chapter,
        ...stats,
        updatedAt: Date.now()
    };

    return new Promise((resolve, reject) => {
        const tx = db.transaction('chapters', 'readwrite');
        const store = tx.objectStore('chapters');
        const request = store.put(record);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Get all chapters for a book
async function getBookStats(bookIndex) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('chapters', 'readonly');
        const store = tx.objectStore('chapters');
        const index = store.index('bookIndex');
        const request = index.getAll(bookIndex);
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

// Get all chapter stats
async function getAllChapterStats() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('chapters', 'readonly');
        const store = tx.objectStore('chapters');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

// Save app state
async function saveAppState(key, value) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('state', 'readwrite');
        const store = tx.objectStore('state');
        const request = store.put({ key, value });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Get app state
async function getAppState(key) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('state', 'readonly');
        const store = tx.objectStore('state');
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result?.value || null);
        request.onerror = () => reject(request.error);
    });
}

// Export all data as JSON (for backup)
async function exportAllData() {
    const chapters = await getAllChapterStats();
    const state = await new Promise((resolve, reject) => {
        const tx = db.transaction('state', 'readonly');
        const store = tx.objectStore('state');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });

    return {
        exportedAt: new Date().toISOString(),
        chapters,
        state
    };
}

// Import data from JSON backup
async function importData(data) {
    if (!data.chapters || !data.state) {
        throw new Error('Invalid backup format');
    }

    // Import chapters
    const chapterTx = db.transaction('chapters', 'readwrite');
    const chapterStore = chapterTx.objectStore('chapters');
    for (const chapter of data.chapters) {
        chapterStore.put(chapter);
    }

    // Import state
    const stateTx = db.transaction('state', 'readwrite');
    const stateStore = stateTx.objectStore('state');
    for (const item of data.state) {
        stateStore.put(item);
    }
}

// Daily session helpers
function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

// Get a daily session by date
async function getDailySession(date) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('dailySessions', 'readonly');
        const store = tx.objectStore('dailySessions');
        const request = store.get(date);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

// Save or update daily session
async function saveDailySession(sessionData) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('dailySessions', 'readwrite');
        const store = tx.objectStore('dailySessions');
        const request = store.put(sessionData);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Get all daily sessions
async function getAllDailySessions() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('dailySessions', 'readonly');
        const store = tx.objectStore('dailySessions');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

// Character stat helpers
function categorizeChar(char) {
    if (/[a-z]/.test(char)) return 'lowercase';
    if (/[A-Z]/.test(char)) return 'uppercase';
    if (/[0-9]/.test(char)) return 'number';
    if (/\s/.test(char)) return 'space';
    return 'punctuation';
}

// Aggregate character stats from multiple chapters
function aggregateCharStats(chapters) {
    const charTiming = {};      // char -> { totalTime, count }
    const charErrors = {};      // char -> { errors, total }
    const transitions = {};     // "ab" -> { totalTime, count }

    for (const chapter of chapters) {
        if (!chapter.charStats) continue;

        // Aggregate timing
        if (chapter.charStats.timing) {
            for (const [char, data] of Object.entries(chapter.charStats.timing)) {
                if (!charTiming[char]) {
                    charTiming[char] = { totalTime: 0, count: 0 };
                }
                charTiming[char].totalTime += data.totalTime;
                charTiming[char].count += data.count;
            }
        }

        // Aggregate errors
        if (chapter.charStats.errors) {
            for (const [char, data] of Object.entries(chapter.charStats.errors)) {
                if (!charErrors[char]) {
                    charErrors[char] = { errors: 0, total: 0 };
                }
                charErrors[char].errors += data.errors;
                charErrors[char].total += data.total;
            }
        }

        // Aggregate transitions
        if (chapter.charStats.transitions) {
            for (const [pair, data] of Object.entries(chapter.charStats.transitions)) {
                if (!transitions[pair]) {
                    transitions[pair] = { totalTime: 0, count: 0 };
                }
                transitions[pair].totalTime += data.totalTime;
                transitions[pair].count += data.count;
            }
        }
    }

    return { charTiming, charErrors, transitions };
}
