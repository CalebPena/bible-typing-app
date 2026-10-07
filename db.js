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

const BACKUP_VERSION = 1;
const BACKUP_STORES = { chapters: 'id', state: 'key', dailySessions: 'date', achievements: 'id' };
const BACKUP_LOCAL_KEYS = ['bibleTypeState', 'midChapterStats'];

// Snapshot all stores in one read transaction so the backup has a consistent view.
async function exportAllData() {
    const stores = Object.keys(BACKUP_STORES);
    const data = await new Promise((resolve, reject) => {
        const tx = db.transaction(stores, 'readonly');
        const result = {};
        for (const name of stores) {
            tx.objectStore(name).getAll().onsuccess = event => {
                result[name] = event.target.result;
            };
        }
        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
    });
    const localData = {};
    for (const key of BACKUP_LOCAL_KEYS) {
        const value = localStorage.getItem(key);
        if (value !== null) localData[key] = JSON.parse(value);
    }
    return { format: 'bible-type-backup', version: BACKUP_VERSION,
        exportedAt: new Date().toISOString(), ...data, localStorage: localData };
}

// Old exports had only chapters and state; the active progress was stored separately
// in localStorage. Missing fields in those exports must not erase newer local data.
function normalizeBackup(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data) ||
        (data.format !== undefined && (data.format !== 'bible-type-backup' || data.version === undefined)) ||
        (data.version !== undefined && (!Number.isInteger(data.version) || data.version > BACKUP_VERSION || data.version < 1))) {
        throw new Error('Unsupported backup format or version');
    }
    if (!Array.isArray(data.chapters) || !Array.isArray(data.state)) {
        throw new Error('Invalid backup: chapters and state are required');
    }
    if (data.format === 'bible-type-backup' &&
        (!Array.isArray(data.dailySessions) || !Array.isArray(data.achievements) ||
            !data.localStorage || typeof data.localStorage !== 'object')) {
        throw new Error('Invalid backup: required data is missing');
    }
    const stores = {};
    for (const [name, key] of Object.entries(BACKUP_STORES)) {
        if (!(name in data)) continue;
        if (!Array.isArray(data[name]) || data[name].some(item =>
            !item || typeof item !== 'object' || Array.isArray(item) ||
            (typeof item[key] !== 'string' && typeof item[key] !== 'number') ||
            item[key] === '')) {
            throw new Error(`Invalid backup: ${name} contains invalid records`);
        }
        stores[name] = data[name];
    }
    const localData = data.localStorage === undefined ? {} : data.localStorage;
    if (!localData || typeof localData !== 'object' || Array.isArray(localData)) {
        throw new Error('Invalid backup: localStorage must be an object');
    }
    const localValues = {};
    for (const key of BACKUP_LOCAL_KEYS) {
        if (!(key in localData)) continue;
        if (!localData[key] || typeof localData[key] !== 'object' || Array.isArray(localData[key])) {
            throw new Error(`Invalid backup: ${key} must be an object`);
        }
        localValues[key] = JSON.stringify(localData[key]);
    }
    return { stores, localValues, complete: data.format === 'bible-type-backup' };
}

// Replace only stores present in the backup, atomically. Legacy backups omit newer stores.
async function importData(data) {
    const { stores, localValues, complete } = normalizeBackup(data);
    await new Promise((resolve, reject) => {
        const tx = db.transaction(Object.keys(stores), 'readwrite');
        for (const [name, records] of Object.entries(stores)) {
            const store = tx.objectStore(name);
            store.clear();
            for (const record of records) store.put(record);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
    });
    for (const key of BACKUP_LOCAL_KEYS) {
        if (key in localValues) localStorage.setItem(key, localValues[key]);
        else if (complete) localStorage.removeItem(key);
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
