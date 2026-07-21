// IndexedDB wrapper for Bible Type stats

const DB_NAME = 'BibleTypeDB';
const DB_VERSION = 3;

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

            // Store for achievements
            if (!database.objectStoreNames.contains('achievements')) {
                database.createObjectStore('achievements', { keyPath: 'id' });
            }
        };
    });
}

// Achievement helpers
async function getAchievement(id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('achievements', 'readonly');
        const store = tx.objectStore('achievements');
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

async function saveAchievement(achievement) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('achievements', 'readwrite');
        const store = tx.objectStore('achievements');
        const request = store.put(achievement);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

async function getAllAchievements() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('achievements', 'readonly');
        const store = tx.objectStore('achievements');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
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
async function saveChapterStats(bookIndex, chapter, stats, timestamp = null) {
    const id = `${bookIndex}-${chapter}`;
    const record = {
        id,
        bookIndex,
        chapter,
        ...stats,
        updatedAt: timestamp || Date.now()
    };

    return new Promise((resolve, reject) => {
        const tx = db.transaction('chapters', 'readwrite');
        const store = tx.objectStore('chapters');
        const request = store.put(record);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Save many chapter records in one transaction (used by test-data generation).
async function saveChapterStatsBatch(chapters) {
    if (chapters.length === 0) return;

    return new Promise((resolve, reject) => {
        const tx = db.transaction('chapters', 'readwrite');
        const store = tx.objectStore('chapters');
        for (const { bookIndex, chapter, stats, timestamp } of chapters) {
            store.put({
                id: `${bookIndex}-${chapter}`,
                bookIndex,
                chapter,
                ...stats,
                updatedAt: timestamp || Date.now()
            });
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
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
    // Use local time so late-night typing is recorded under today, not tomorrow
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

// Calculate current streak from daily sessions (consecutive days ending at today or yesterday)
function calculateStreakFromSessions(sessions) {
    if (!sessions || sessions.length === 0) return 0;

    const dates = sessions
        .filter(s => s.charactersTyped > 0)
        .map(s => s.date)
        .sort()
        .reverse();

    if (dates.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const latestDate = new Date(dates[0] + 'T00:00:00');

    const diffDays = Math.round((today - latestDate) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) return 0;

    const dateSet = new Set(dates);
    let streak = 0;
    const checkDate = new Date(latestDate);

    while (true) {
        const dateStr = checkDate.getFullYear() + '-' +
            String(checkDate.getMonth() + 1).padStart(2, '0') + '-' +
            String(checkDate.getDate()).padStart(2, '0');
        if (dateSet.has(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
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
    const correctionErrors = {}; // Includes extra-character errors for correction analytics
    const transitions = {};     // "ab" -> { totalTime, count }
    const corrections = {};     // char -> errorType -> correction timing aggregates

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
                if (!correctionErrors[char]) {
                    correctionErrors[char] = { errors: 0, total: 0, byType: {} };
                }
                correctionErrors[char].errors += data.errors || 0;
                correctionErrors[char].total += data.total || 0;
                for (const [errType, count] of Object.entries(data.byType || {})) {
                    correctionErrors[char].byType[errType] = (correctionErrors[char].byType[errType] || 0) + count;
                }
                if (char !== '__extra__') {
                    if (!charErrors[char]) {
                        charErrors[char] = { errors: 0, total: 0, byType: {} };
                    }
                    charErrors[char].errors += data.errors || 0;
                    charErrors[char].total += data.total || 0;
                    // Aggregate error types
                    if (data.byType) {
                        for (const [errType, count] of Object.entries(data.byType)) {
                            charErrors[char].byType[errType] = (charErrors[char].byType[errType] || 0) + count;
                        }
                    }
                }
                if (data.correctionByType) {
                    if (!corrections[char]) corrections[char] = {};
                    for (const [errorType, correction] of Object.entries(data.correctionByType)) {
                        if (!corrections[char][errorType]) {
                            corrections[char][errorType] = {
                                correctedCount: 0,
                                totalLatency: 0,
                                totalExclusiveTime: 0
                            };
                        }
                        corrections[char][errorType].correctedCount += correction.correctedCount || 0;
                        corrections[char][errorType].totalLatency += correction.totalLatency || 0;
                        corrections[char][errorType].totalExclusiveTime += correction.totalExclusiveTime || 0;
                    }
                }
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

    return { charTiming, charErrors, correctionErrors, transitions, corrections };
}
