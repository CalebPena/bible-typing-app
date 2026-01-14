// ESV API configuration
const ESV_API_KEY = 'acf9f0975f3f82e32f6e143dbb6e51f04f02b27f';
const ESV_API_BASE = 'https://api.esv.org/v3/passage/text';

// Bible book data
const BIBLE_BOOKS = [
    { name: 'Genesis', chapters: 50 },
    { name: 'Exodus', chapters: 40 },
    { name: 'Leviticus', chapters: 27 },
    { name: 'Numbers', chapters: 36 },
    { name: 'Deuteronomy', chapters: 34 },
    { name: 'Joshua', chapters: 24 },
    { name: 'Judges', chapters: 21 },
    { name: 'Ruth', chapters: 4 },
    { name: '1 Samuel', chapters: 31 },
    { name: '2 Samuel', chapters: 24 },
    { name: '1 Kings', chapters: 22 },
    { name: '2 Kings', chapters: 25 },
    { name: '1 Chronicles', chapters: 29 },
    { name: '2 Chronicles', chapters: 36 },
    { name: 'Ezra', chapters: 10 },
    { name: 'Nehemiah', chapters: 13 },
    { name: 'Esther', chapters: 10 },
    { name: 'Job', chapters: 42 },
    { name: 'Psalms', chapters: 150 },
    { name: 'Proverbs', chapters: 31 },
    { name: 'Ecclesiastes', chapters: 12 },
    { name: 'Song of Solomon', chapters: 8 },
    { name: 'Isaiah', chapters: 66 },
    { name: 'Jeremiah', chapters: 52 },
    { name: 'Lamentations', chapters: 5 },
    { name: 'Ezekiel', chapters: 48 },
    { name: 'Daniel', chapters: 12 },
    { name: 'Hosea', chapters: 14 },
    { name: 'Joel', chapters: 3 },
    { name: 'Amos', chapters: 9 },
    { name: 'Obadiah', chapters: 1 },
    { name: 'Jonah', chapters: 4 },
    { name: 'Micah', chapters: 7 },
    { name: 'Nahum', chapters: 3 },
    { name: 'Habakkuk', chapters: 3 },
    { name: 'Zephaniah', chapters: 3 },
    { name: 'Haggai', chapters: 2 },
    { name: 'Zechariah', chapters: 14 },
    { name: 'Malachi', chapters: 4 },
    { name: 'Matthew', chapters: 28 },
    { name: 'Mark', chapters: 16 },
    { name: 'Luke', chapters: 24 },
    { name: 'John', chapters: 21 },
    { name: 'Acts', chapters: 28 },
    { name: 'Romans', chapters: 16 },
    { name: '1 Corinthians', chapters: 16 },
    { name: '2 Corinthians', chapters: 13 },
    { name: 'Galatians', chapters: 6 },
    { name: 'Ephesians', chapters: 6 },
    { name: 'Philippians', chapters: 4 },
    { name: 'Colossians', chapters: 4 },
    { name: '1 Thessalonians', chapters: 5 },
    { name: '2 Thessalonians', chapters: 3 },
    { name: '1 Timothy', chapters: 6 },
    { name: '2 Timothy', chapters: 4 },
    { name: 'Titus', chapters: 3 },
    { name: 'Philemon', chapters: 1 },
    { name: 'Hebrews', chapters: 13 },
    { name: 'James', chapters: 5 },
    { name: '1 Peter', chapters: 5 },
    { name: '2 Peter', chapters: 3 },
    { name: '1 John', chapters: 5 },
    { name: '2 John', chapters: 1 },
    { name: '3 John', chapters: 1 },
    { name: 'Jude', chapters: 1 },
    { name: 'Revelation', chapters: 22 }
];

const TOTAL_CHAPTERS = BIBLE_BOOKS.reduce((sum, book) => sum + book.chapters, 0);

// Chapter cache
const chapterCache = {};

function getCacheKey(bookIndex, chapter) {
    return `${bookIndex}-${chapter}`;
}

// State
const state = {
    currentBookIndex: 0,
    currentChapter: 1,
    theme: 'dark',
    words: [],
    wordToVerse: [], // Maps word index to verse number
    verseStartIndices: {}, // Maps verse number to starting word index
    typedWords: [],
    currentWordIndex: 0,
    savedWordIndex: 0, // For resuming progress
    currentLetterIndex: 0,
    inputValue: '',
    verseStartTime: null, // Timer starts at beginning of each verse
    verseTimes: [], // Array of { chars, time, keystrokes, correctKeystrokes } for completed verses
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    verseKeystrokes: 0, // Keystrokes for current verse
    verseCorrectKeystrokes: 0,
    isComplete: false,
    isFocused: false,
    idleTimer: null, // Timer for idle detection
    lastPracticeDate: null,
    completedChapters: {},
    chapterProgress: {}, // Save progress within chapters: { "bookIndex-chapter": wordIndex }
    // Character stats tracking
    lastKeyTime: null, // Timestamp of last keypress
    lastChar: null, // Last character typed
    charTiming: {}, // char -> { totalTime, count }
    charErrors: {}, // char -> { errors, total }
    transitions: {}, // "ab" -> { totalTime, count }
    // Daily session tracking
    dailySession: null, // Current day's session data
    // Shift key tracking
    leftShiftHeld: false,
    rightShiftHeld: false,
    wrongShiftPositions: [] // Array of {wordIndex, letterIndex} for wrong shift errors
};

const IDLE_TIMEOUT = 5000; // 5 seconds

// Keyboard layout for shift detection
// Left hand types these keys, so they need RIGHT shift
const LEFT_HAND_LETTERS = 'qwertasdfgzxcvbQWERTASDFGZXCVB';
const LEFT_HAND_SHIFTED = '~!@#$%'; // ` 1 2 3 4 5 with shift
// Right hand types these keys, so they need LEFT shift
const RIGHT_HAND_LETTERS = 'yuiophjklnmYUIOPHJKLNM';
const RIGHT_HAND_SHIFTED = '^&*()_+{}|:"<>?'; // 6 7 8 9 0 - = [ ] \ ; ' , . / with shift

function getCorrectShift(char) {
    if (LEFT_HAND_LETTERS.includes(char)) return 'right';
    if (RIGHT_HAND_LETTERS.includes(char)) return 'left';
    if (LEFT_HAND_SHIFTED.includes(char)) return 'right';
    if (RIGHT_HAND_SHIFTED.includes(char)) return 'left';
    return null; // Doesn't require specific shift
}

// DOM Elements
const $ = id => document.getElementById(id);
const els = {
    words: $('words'),
    hiddenInput: $('hidden-input'),
    typingArea: $('typing-area'),
    wpm: $('wpm'),
    accuracy: $('accuracy'),
    currentLocation: $('current-location'),
    chapterProgress: $('chapter-progress'),
    statsBar: document.querySelector('.stats-bar'),
    modalOverlay: $('modal-overlay'),
    finalWpm: $('final-wpm'),
    finalAccuracy: $('final-accuracy'),
    nextChapter: $('next-chapter'),
    overallProgress: $('overall-progress'),
    themeToggle: $('theme-toggle'),
};

// Load/Save State
function loadState() {
    const saved = localStorage.getItem('bibleTypeState');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
    }
    applyTheme();
}

function saveState() {
    const toSave = {
        currentBookIndex: state.currentBookIndex,
        currentChapter: state.currentChapter,
        theme: state.theme,
        lastPracticeDate: state.lastPracticeDate,
        completedChapters: state.completedChapters,
        chapterProgress: state.chapterProgress
    };
    localStorage.setItem('bibleTypeState', JSON.stringify(toSave));
}

function saveVerseProgress() {
    const key = `${state.currentBookIndex}-${state.currentChapter}`;
    state.chapterProgress[key] = state.currentWordIndex;
    saveState();
}

// Idle timer functions
function clearIdleTimer() {
    if (state.idleTimer) {
        clearTimeout(state.idleTimer);
        state.idleTimer = null;
    }
}

function resetIdleTimer() {
    clearIdleTimer();
    state.idleTimer = setTimeout(handleIdle, IDLE_TIMEOUT);
}

function handleIdle() {
    // Reset to start of current verse
    const currentVerse = state.wordToVerse[state.currentWordIndex];
    const verseStartIndex = state.verseStartIndices[currentVerse];

    // Clear typed words for current verse
    for (let i = verseStartIndex; i <= state.currentWordIndex; i++) {
        delete state.typedWords[i];
    }

    state.currentWordIndex = verseStartIndex;
    state.inputValue = '';
    state.verseStartTime = null;
    state.verseKeystrokes = 0;
    state.verseCorrectKeystrokes = 0;
    els.hiddenInput.value = '';

    renderWords();
    updateProgress();
    updateStats();
}

// Theme
function applyTheme() {
    if (state.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveState();
}

// Record practice for daily tracking
function recordPractice() {
    const today = new Date().toDateString();
    if (state.lastPracticeDate !== today) {
        state.lastPracticeDate = today;
        saveState();
    }
}

// Daily session tracking
async function loadDailySession() {
    const today = getTodayDateString();
    try {
        const session = await getDailySession(today);
        if (session) {
            state.dailySession = session;
        } else {
            // Create new session for today
            state.dailySession = {
                date: today,
                totalWpm: 0,
                totalAccuracy: 0,
                charactersTyped: 0,
                correctKeystrokes: 0,
                totalKeystrokes: 0,
                startPosition: null,
                endPosition: null,
                chaptersCompleted: 0,
                versesCompleted: 0
            };
        }
    } catch (err) {
        console.error('Failed to load daily session:', err);
    }
}

async function updateDailySession(charsTyped, keystrokes, correctKeystrokes, wpm, accuracy) {
    if (!state.dailySession) return;

    const session = state.dailySession;
    const currentVerse = state.wordToVerse[state.currentWordIndex] || 1;

    // Set start position if not set
    if (!session.startPosition) {
        session.startPosition = {
            bookIndex: state.currentBookIndex,
            chapter: state.currentChapter,
            verse: currentVerse
        };
    }

    // Always update end position
    session.endPosition = {
        bookIndex: state.currentBookIndex,
        chapter: state.currentChapter,
        verse: currentVerse
    };

    // Update stats with weighted average
    const prevChars = session.charactersTyped;
    const newTotalChars = prevChars + charsTyped;

    if (newTotalChars > 0) {
        // Weighted average for WPM and accuracy
        session.totalWpm = Math.round(
            (session.totalWpm * prevChars + wpm * charsTyped) / newTotalChars
        );
        session.totalAccuracy = Math.round(
            (session.totalAccuracy * prevChars + accuracy * charsTyped) / newTotalChars
        );
    }

    session.charactersTyped = newTotalChars;
    session.totalKeystrokes += keystrokes;
    session.correctKeystrokes += correctKeystrokes;

    try {
        await saveDailySession(session);
    } catch (err) {
        console.error('Failed to save daily session:', err);
    }
}

async function recordVerseComplete(verseData) {
    if (!state.dailySession) return;

    state.dailySession.versesCompleted++;

    await updateDailySession(
        verseData.chars,
        verseData.keystrokes,
        verseData.correctKeystrokes,
        Math.round((verseData.chars / 5) / (verseData.time / 60000)), // WPM for this verse
        verseData.keystrokes > 0 ? Math.round((verseData.correctKeystrokes / verseData.keystrokes) * 100) : 100
    );
}

async function recordChapterComplete() {
    if (!state.dailySession) return;

    state.dailySession.chaptersCompleted++;

    try {
        await saveDailySession(state.dailySession);
    } catch (err) {
        console.error('Failed to save daily session:', err);
    }
}

// API
async function fetchChapter() {
    const book = BIBLE_BOOKS[state.currentBookIndex];
    const cacheKey = getCacheKey(state.currentBookIndex, state.currentChapter);

    els.words.innerHTML = '<span class="loading">loading...</span>';
    els.words.classList.add('loading');

    try {
        let verses;

        // Check cache first
        if (chapterCache[cacheKey]) {
            verses = chapterCache[cacheKey];
        } else {
            // Fetch from ESV API
            verses = await fetchESV(book.name, state.currentChapter);
            chapterCache[cacheKey] = verses;
        }

        // Build words array with verse tracking
        state.words = [];
        state.wordToVerse = [];
        state.verseStartIndices = {};

        for (const verse of verses) {
            const verseNum = verse.number;
            const verseText = verse.text.replace(/\s+/g, ' ').trim();
            const verseWords = verseText.split(' ').filter(w => w.length > 0);

            if (verseWords.length === 0) continue;

            state.verseStartIndices[verseNum] = state.words.length;

            for (const word of verseWords) {
                state.wordToVerse.push(verseNum);
                state.words.push(word);
            }
        }

        state.typedWords = [];
        state.currentLetterIndex = 0;
        state.inputValue = '';
        state.verseStartTime = null;
        state.verseTimes = [];
        state.totalKeystrokes = 0;
        state.correctKeystrokes = 0;
        state.verseKeystrokes = 0;
        state.verseCorrectKeystrokes = 0;
        state.isComplete = false;
        clearIdleTimer();

        // Reset character stats for new chapter
        state.lastKeyTime = null;
        state.lastChar = null;
        state.charTiming = {};
        state.charErrors = {};
        state.transitions = {};
        state.wrongShiftPositions = [];

        // Restore progress if available
        const key = `${state.currentBookIndex}-${state.currentChapter}`;
        const savedProgress = state.chapterProgress[key];
        if (savedProgress && savedProgress > 0 && savedProgress < state.words.length) {
            state.currentWordIndex = savedProgress;
            for (let i = 0; i < savedProgress; i++) {
                state.typedWords[i] = state.words[i];
            }
        } else {
            state.currentWordIndex = 0;
        }

        els.words.classList.remove('loading');
        renderWords();
        updateProgress();
        els.hiddenInput.value = '';
        focus();

    } catch (err) {
        els.words.innerHTML = '<span class="loading">failed to load. click to retry.</span>';
        console.error(err);
    }
}

// Normalize special characters to standard keyboard characters
function normalizeText(text) {
    return text
        // Smart/curly double quotes to straight quotes
        .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')
        // Smart/curly single quotes and apostrophes to straight apostrophe
        .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
        // Em dash, en dash, and other dashes to hyphen
        .replace(/[\u2013\u2014\u2015\u2212]/g, '-')
        // Ellipsis to three periods
        .replace(/\u2026/g, '...')
        // Non-breaking space to regular space
        .replace(/\u00A0/g, ' ')
        // Fancy asterisks
        .replace(/[\u2217\u204E]/g, '*')
        // Other common replacements
        .replace(/\u00B7/g, '-')  // middle dot
        .replace(/\u2022/g, '-')  // bullet
        .replace(/\u00AB/g, '"')  // left double angle quote
        .replace(/\u00BB/g, '"')  // right double angle quote
        .replace(/\u2039/g, "'")  // left single angle quote
        .replace(/\u203A/g, "'"); // right single angle quote
}

async function fetchESV(bookName, chapter) {
    const passage = `${bookName} ${chapter}`;
    const params = new URLSearchParams({
        q: passage,
        'include-headings': 'false',
        'include-footnotes': 'false',
        'include-verse-numbers': 'true',
        'include-short-copyright': 'false',
        'include-passage-references': 'false',
        'indent-paragraphs': '0',
        'indent-poetry': 'false',
        'indent-declares': '0',
        'indent-psalm-doxology': '0'
    });

    const res = await fetch(`${ESV_API_BASE}?${params}`, {
        headers: { 'Authorization': `Token ${ESV_API_KEY}` }
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('ESV API Error:', res.status, errorText);
        throw new Error('Failed to fetch');
    }

    const data = await res.json();
    let text = data.passages[0] || '';

    // Normalize special characters to standard keyboard equivalents
    text = normalizeText(text);

    // Remove the header (e.g., "Genesis 1\n\n")
    text = text.replace(/^[^\[]+/, '');

    // Parse verses from the text (format: [1] text [2] text...)
    const verses = [];
    const verseRegex = /\[(\d+)\]\s*/g;
    const parts = text.split(verseRegex);

    // parts = ['', '1', 'verse 1 text', '2', 'verse 2 text', ...]
    for (let i = 1; i < parts.length; i += 2) {
        const verseNum = parseInt(parts[i], 10);
        let verseText = (parts[i + 1] || '').trim();
        // Clean up extra whitespace and newlines
        verseText = verseText.replace(/\s+/g, ' ').trim();
        if (verseText) {
            verses.push({ number: verseNum, text: verseText });
        }
    }

    return verses;
}

// Render
function renderWords() {
    let html = '';

    for (let wi = 0; wi < state.words.length; wi++) {
        const word = state.words[wi];
        const isCurrentWord = wi === state.currentWordIndex;
        const isPastWord = wi < state.currentWordIndex;
        const typedWord = isPastWord ? state.typedWords[wi] : (isCurrentWord ? state.inputValue : '');

        // Check if this word starts a new verse
        const verseNum = state.wordToVerse[wi];
        const isVerseStart = state.verseStartIndices[verseNum] === wi;

        let wordClass = 'word';
        let wordHtml = '';
        let hasError = false;

        // Add verse number as superscript
        if (isVerseStart) {
            wordHtml += `<sup class="verse-num">${verseNum}</sup>`;
        }

        for (let li = 0; li < word.length; li++) {
            const letter = word[li];
            let letterClass = 'letter';

            // Check if this position has a wrong-shift error
            const isWrongShift = state.wrongShiftPositions.some(
                pos => pos.wordIndex === wi && pos.letterIndex === li
            );

            if (isPastWord || isCurrentWord) {
                if (li < typedWord.length) {
                    if (typedWord[li] === letter) {
                        if (isWrongShift) {
                            letterClass += ' wrong-shift';
                            hasError = true;
                        } else {
                            letterClass += ' correct';
                        }
                    } else {
                        letterClass += ' incorrect';
                        hasError = true;
                    }
                } else if (isCurrentWord && li === typedWord.length) {
                    letterClass += ' current';
                } else if (isPastWord) {
                    // Letter wasn't typed (word was too short)
                    letterClass += ' incorrect';
                    hasError = true;
                }
            }

            wordHtml += `<span class="${letterClass}">${escapeHtml(letter)}</span>`;
        }

        // Extra typed letters
        if (typedWord.length > word.length) {
            const extra = typedWord.slice(word.length);
            for (const ch of extra) {
                wordHtml += `<span class="letter extra">${escapeHtml(ch)}</span>`;
            }
            hasError = true;
        }

        if (hasError) {
            wordClass += ' error';
        }

        // Show cursor at end of word if we've typed exactly the word length
        if (isCurrentWord && typedWord.length >= word.length) {
            wordHtml += `<span class="cursor"></span>`;
        }

        html += `<span class="${wordClass}" data-index="${wi}">${wordHtml}</span>`;
    }

    els.words.innerHTML = html;
    scrollToCurrentLine();
}

function scrollToCurrentLine() {
    const currentWordEl = els.words.querySelector(`[data-index="${state.currentWordIndex}"]`);
    if (!currentWordEl) return;

    const style = getComputedStyle(els.words);
    const lineHeight = parseFloat(style.lineHeight) || 48;

    // offsetTop gives position in the document flow (unaffected by transform)
    const wordTop = currentWordEl.offsetTop;

    // We want the current word's line to be in the middle (2nd of 3 visible lines)
    // So scroll the content so that wordTop aligns with lineHeight (the start of line 2)
    const scrollY = Math.max(0, wordTop - lineHeight);

    // Snap to line boundaries to avoid partial lines
    const snappedScrollY = Math.round(scrollY / lineHeight) * lineHeight;

    els.words.style.transform = `translateY(-${snappedScrollY}px)`;
}

function escapeHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return str.replace(/[&<>"']/g, c => map[c]);
}

// Input handling
function handleInput(e) {
    if (state.isComplete) return;

    const value = e.target.value;
    const now = Date.now();

    // Start verse timer on first input of a verse
    if (!state.verseStartTime && value.length > 0) {
        state.verseStartTime = now;
        state.lastKeyTime = now;
        els.statsBar.classList.add('visible');
        recordPractice();
    }

    // Reset idle timer on any input
    if (value.length > 0) {
        resetIdleTimer();
    }

    // Handle backspace - remove any wrong shift position at the deleted letter
    if (value.length < state.inputValue.length) {
        const deletedIndex = value.length; // The letter that was just deleted
        state.wrongShiftPositions = state.wrongShiftPositions.filter(
            pos => !(pos.wordIndex === state.currentWordIndex && pos.letterIndex === deletedIndex)
        );
    }

    // Track keystrokes and character stats
    if (value.length > state.inputValue.length) {
        const newChar = value[value.length - 1];
        const expectedChar = state.words[state.currentWordIndex][state.inputValue.length];
        state.totalKeystrokes++;
        state.verseKeystrokes++;

        let isCorrect = newChar === expectedChar;

        // Check for wrong shift on capital letters and shifted punctuation
        let isWrongShift = false;
        const correctShift = getCorrectShift(newChar);
        if (isCorrect && correctShift && state.shiftHeld && state.shiftHeld !== correctShift) {
            isWrongShift = true;
            isCorrect = false; // Wrong shift counts as an error
            state.wrongShiftPositions.push({
                wordIndex: state.currentWordIndex,
                letterIndex: state.inputValue.length
            });
        }

        if (isCorrect) {
            state.correctKeystrokes++;
            state.verseCorrectKeystrokes++;
        }

        // Track character timing (time to type this expected character)
        if (expectedChar && state.lastKeyTime) {
            const elapsed = now - state.lastKeyTime;
            if (!state.charTiming[expectedChar]) {
                state.charTiming[expectedChar] = { totalTime: 0, count: 0 };
            }
            state.charTiming[expectedChar].totalTime += elapsed;
            state.charTiming[expectedChar].count++;
        }

        // Track character errors
        if (expectedChar) {
            if (!state.charErrors[expectedChar]) {
                state.charErrors[expectedChar] = { errors: 0, total: 0 };
            }
            state.charErrors[expectedChar].total++;
            if (!isCorrect) {
                state.charErrors[expectedChar].errors++;
            }
        }

        // Track transitions (time from prev char to this char)
        if (state.lastChar && expectedChar && state.lastKeyTime) {
            const transitionKey = state.lastChar + expectedChar;
            const elapsed = now - state.lastKeyTime;
            if (!state.transitions[transitionKey]) {
                state.transitions[transitionKey] = { totalTime: 0, count: 0 };
            }
            state.transitions[transitionKey].totalTime += elapsed;
            state.transitions[transitionKey].count++;
        }

        state.lastKeyTime = now;
        state.lastChar = expectedChar || newChar;
    }

    state.inputValue = value;
    renderWords();
    updateStats();
}

function handleKeyDown(e) {
    // Track shift key state
    if (e.code === 'ShiftLeft') state.shiftHeld = 'left';
    else if (e.code === 'ShiftRight') state.shiftHeld = 'right';

    if (state.isComplete) return;

    // Backspace at start of word - go back to previous word
    if (e.key === 'Backspace' && state.inputValue === '' && state.currentWordIndex > 0) {
        e.preventDefault();

        const currentVerse = state.wordToVerse[state.currentWordIndex];
        const prevWordIndex = state.currentWordIndex - 1;
        const prevVerse = state.wordToVerse[prevWordIndex];

        // Don't allow backspace into previous verse
        if (prevVerse !== currentVerse) {
            return;
        }

        state.currentWordIndex = prevWordIndex;

        // Clear any wrong shift positions for the word we're going back to
        state.wrongShiftPositions = state.wrongShiftPositions.filter(
            pos => pos.wordIndex !== state.currentWordIndex
        );

        state.inputValue = state.typedWords[state.currentWordIndex] || '';
        els.hiddenInput.value = state.inputValue;

        resetIdleTimer();
        renderWords();
        updateProgress();
        return;
    }

    // Space - move to next word
    if (e.key === ' ') {
        e.preventDefault();

        if (state.inputValue.length > 0) {
            const now = Date.now();

            // Reset idle timer
            resetIdleTimer();

            // Count space keystroke
            state.totalKeystrokes++;
            state.correctKeystrokes++;
            state.verseKeystrokes++;
            state.verseCorrectKeystrokes++;

            // Track space timing and transitions
            if (state.lastKeyTime) {
                const elapsed = now - state.lastKeyTime;
                if (!state.charTiming[' ']) {
                    state.charTiming[' '] = { totalTime: 0, count: 0 };
                }
                state.charTiming[' '].totalTime += elapsed;
                state.charTiming[' '].count++;

                // Track transition to space
                if (state.lastChar) {
                    const transitionKey = state.lastChar + ' ';
                    if (!state.transitions[transitionKey]) {
                        state.transitions[transitionKey] = { totalTime: 0, count: 0 };
                    }
                    state.transitions[transitionKey].totalTime += elapsed;
                    state.transitions[transitionKey].count++;
                }
            }

            // Space error tracking (spaces are always correct if we get here)
            if (!state.charErrors[' ']) {
                state.charErrors[' '] = { errors: 0, total: 0 };
            }
            state.charErrors[' '].total++;

            state.lastKeyTime = now;
            state.lastChar = ' ';

            // Store what was typed for this word
            state.typedWords[state.currentWordIndex] = state.inputValue;

            const prevVerse = state.wordToVerse[state.currentWordIndex];

            // Move to next word
            state.currentWordIndex++;
            state.inputValue = '';
            els.hiddenInput.value = '';

            // Check if chapter complete
            if (state.currentWordIndex >= state.words.length) {
                // Record final verse time
                if (state.verseStartTime) {
                    const verseChars = getVerseCharCount(prevVerse);
                    const verseData = {
                        chars: verseChars,
                        time: Date.now() - state.verseStartTime,
                        keystrokes: state.verseKeystrokes,
                        correctKeystrokes: state.verseCorrectKeystrokes
                    };
                    state.verseTimes.push(verseData);
                    recordVerseComplete(verseData);
                }
                clearIdleTimer();

                // Clear chapter progress since it's complete
                const key = `${state.currentBookIndex}-${state.currentChapter}`;
                delete state.chapterProgress[key];
                saveState();
                completeChapter();
            } else {
                // Check if we completed a verse
                const newVerse = state.wordToVerse[state.currentWordIndex];
                if (newVerse !== prevVerse) {
                    // Record verse time
                    if (state.verseStartTime) {
                        const verseChars = getVerseCharCount(prevVerse);
                        const verseData = {
                            chars: verseChars,
                            time: Date.now() - state.verseStartTime,
                            keystrokes: state.verseKeystrokes,
                            correctKeystrokes: state.verseCorrectKeystrokes
                        };
                        state.verseTimes.push(verseData);
                        recordVerseComplete(verseData);
                    }

                    // Reset for new verse
                    state.verseStartTime = null;
                    state.verseKeystrokes = 0;
                    state.verseCorrectKeystrokes = 0;
                    clearIdleTimer();

                    saveVerseProgress();
                }

                renderWords();
                updateProgress();
                updateStats();
            }
        }
    }
}

function getVerseCharCount(verseNum) {
    let chars = 0;
    for (let i = 0; i < state.words.length; i++) {
        if (state.wordToVerse[i] === verseNum) {
            chars += state.words[i].length + 1; // +1 for space
        }
    }
    return chars;
}

// Stats
function calculateWPM() {
    let totalChars = 0;
    let totalTime = 0;

    // Add last 3 completed verses (chars and time)
    const recentVerses = state.verseTimes.slice(-3);
    for (const verse of recentVerses) {
        totalChars += verse.chars;
        totalTime += verse.time;
    }

    // Add current verse progress (chars typed and time elapsed)
    if (state.verseStartTime) {
        const currentVerse = state.wordToVerse[state.currentWordIndex];
        const verseStart = state.verseStartIndices[currentVerse];

        // Count chars typed in current verse
        let currentChars = 0;
        for (let i = verseStart; i < state.currentWordIndex; i++) {
            currentChars += state.words[i].length + 1;
        }
        currentChars += state.inputValue.length;

        totalChars += currentChars;
        totalTime += Date.now() - state.verseStartTime;
    }

    if (totalTime === 0) return 0;

    const minutes = totalTime / 60000;
    return Math.round((totalChars / 5) / minutes);
}

function calculateAccuracy() {
    // Get last 3 completed verses
    const recentVerses = state.verseTimes.slice(-3);

    let totalKeystrokes = 0;
    let correctKeystrokes = 0;

    for (const verse of recentVerses) {
        totalKeystrokes += verse.keystrokes;
        correctKeystrokes += verse.correctKeystrokes;
    }

    // Add current verse in-progress
    totalKeystrokes += state.verseKeystrokes;
    correctKeystrokes += state.verseCorrectKeystrokes;

    if (totalKeystrokes === 0) return 100;
    return Math.round((correctKeystrokes / totalKeystrokes) * 100);
}

function updateStats() {
    els.wpm.textContent = calculateWPM();
    els.accuracy.textContent = calculateAccuracy();
}

function updateProgress() {
    const progress = Math.round((state.currentWordIndex / state.words.length) * 100);
    els.chapterProgress.textContent = progress;
}

// Focus handling
function focus() {
    els.hiddenInput.focus();
    state.isFocused = true;
    els.typingArea.classList.remove('blur');
}

function blur() {
    state.isFocused = false;
    els.typingArea.classList.add('blur');
}

// Chapter complete
async function completeChapter() {
    state.isComplete = true;

    // Calculate final WPM and accuracy using ALL verses in the chapter
    let totalChars = 0;
    let totalTime = 0;
    let totalKeystrokes = 0;
    let correctKeystrokes = 0;

    for (const verse of state.verseTimes) {
        totalChars += verse.chars;
        totalTime += verse.time;
        totalKeystrokes += verse.keystrokes;
        correctKeystrokes += verse.correctKeystrokes;
    }

    const minutes = totalTime / 60000;
    const wpm = minutes > 0 ? Math.round((totalChars / 5) / minutes) : 0;
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

    const key = `${state.currentBookIndex}-${state.currentChapter}`;
    state.completedChapters[key] = { wpm, accuracy, completedAt: Date.now() };
    saveState();

    // Save detailed stats to IndexedDB
    try {
        await saveChapterStats(state.currentBookIndex, state.currentChapter, {
            wpm,
            accuracy,
            totalKeystrokes: state.totalKeystrokes,
            correctKeystrokes: state.correctKeystrokes,
            charStats: {
                timing: state.charTiming,
                errors: state.charErrors,
                transitions: state.transitions
            }
        });
        await recordChapterComplete();
    } catch (err) {
        console.error('Failed to save chapter stats:', err);
    }

    els.finalWpm.textContent = wpm;
    els.finalAccuracy.textContent = accuracy + '%';
    els.modalOverlay.hidden = false;

    updateOverallProgress();
}

function nextChapter() {
    const book = BIBLE_BOOKS[state.currentBookIndex];

    if (state.currentChapter < book.chapters) {
        state.currentChapter++;
    } else if (state.currentBookIndex < BIBLE_BOOKS.length - 1) {
        state.currentBookIndex++;
        state.currentChapter = 1;
    } else {
        alert('Congratulations! You have typed through the entire Bible!');
        return;
    }

    saveState();
    els.modalOverlay.hidden = true;
    els.statsBar.classList.remove('visible');
    updateLocation();
    fetchChapter();
}

// UI Updates
function updateLocation() {
    const book = BIBLE_BOOKS[state.currentBookIndex];
    els.currentLocation.textContent = `${book.name} ${state.currentChapter}`;
}

function updateOverallProgress() {
    els.overallProgress.textContent = Object.keys(state.completedChapters).length;
}

// Init
async function init() {
    // Initialize IndexedDB
    try {
        await initDB();
        await loadDailySession();
    } catch (err) {
        console.error('Failed to initialize IndexedDB:', err);
    }

    loadState();
    updateLocation();
    updateOverallProgress();
    fetchChapter();

    // Events
    els.hiddenInput.addEventListener('input', handleInput);
    els.hiddenInput.addEventListener('keydown', handleKeyDown);
    els.hiddenInput.addEventListener('blur', blur);

    els.typingArea.addEventListener('click', focus);
    document.addEventListener('keydown', e => {
        if (!state.isFocused && !e.ctrlKey && !e.metaKey && !e.altKey) {
            focus();
        }
    });

    els.themeToggle.addEventListener('click', toggleTheme);
    els.nextChapter.addEventListener('click', nextChapter);

    // Track shift key state
    document.addEventListener('keydown', e => {
        if (e.code === 'ShiftLeft') state.shiftHeld = 'left';
        else if (e.code === 'ShiftRight') state.shiftHeld = 'right';
    });
    document.addEventListener('keyup', e => {
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
            state.shiftHeld = null;
        }
    });

    // Prevent context menu on typing area
    els.typingArea.addEventListener('contextmenu', e => e.preventDefault());
}

init();
