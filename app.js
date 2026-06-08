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

// Book categories with their book indices
const BOOK_CATEGORIES = {
    'Pentateuch': { books: [0, 1, 2, 3, 4], name: 'Pentateuch' }, // Genesis - Deuteronomy
    'History': { books: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], name: 'History' }, // Joshua - Esther
    'Poetry': { books: [17, 18, 19, 20, 21], name: 'Poetry' }, // Job - Song of Solomon
    'Major Prophets': { books: [22, 23, 24, 25, 26], name: 'Major Prophets' }, // Isaiah - Daniel
    'Minor Prophets': { books: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], name: 'Minor Prophets' }, // Hosea - Malachi
    'Gospels': { books: [39, 40, 41, 42], name: 'Gospels' }, // Matthew - John
    'Pauline Epistles': { books: [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56], name: 'Pauline Epistles' }, // Romans - Philemon
    'General Epistles': { books: [57, 58, 59, 60, 61, 62, 63, 64], name: 'General Epistles' } // Hebrews - Jude
};

// Achievement definitions
const ACHIEVEMENTS = {
    // Chapters completed
    chapters_1: { id: 'chapters_1', name: 'First Steps', desc: 'Complete 1 chapter', category: 'progress', target: 1 },
    chapters_10: { id: 'chapters_10', name: 'Getting Started', desc: 'Complete 10 chapters', category: 'progress', target: 10 },
    chapters_100: { id: 'chapters_100', name: 'Century', desc: 'Complete 100 chapters', category: 'progress', target: 100 },
    chapters_595: { id: 'chapters_595', name: 'Halfway There', desc: 'Complete half the Bible (595 chapters)', category: 'progress', target: 595 },

    // Streaks
    streak_3: { id: 'streak_3', name: 'Three Day Streak', desc: '3 day streak', category: 'streak', target: 3 },
    streak_7: { id: 'streak_7', name: 'Week Warrior', desc: '7 day streak', category: 'streak', target: 7 },
    streak_14: { id: 'streak_14', name: 'Two Week Triumph', desc: '14 day streak', category: 'streak', target: 14 },
    streak_30: { id: 'streak_30', name: 'Monthly Master', desc: '30 day streak', category: 'streak', target: 30 },
    streak_100: { id: 'streak_100', name: 'Century Streak', desc: '100 day streak', category: 'streak', target: 100 },

    // Book categories
    cat_pentateuch: { id: 'cat_pentateuch', name: 'Pentateuch Complete', desc: 'Complete the Pentateuch', category: 'books', catKey: 'Pentateuch' },
    cat_history: { id: 'cat_history', name: 'History Complete', desc: 'Complete History books', category: 'books', catKey: 'History' },
    cat_poetry: { id: 'cat_poetry', name: 'Poet', desc: 'Complete Poetry books', category: 'books', catKey: 'Poetry' },
    cat_major_prophets: { id: 'cat_major_prophets', name: 'Major Prophet Reader', desc: 'Complete Major Prophets', category: 'books', catKey: 'Major Prophets' },
    cat_minor_prophets: { id: 'cat_minor_prophets', name: 'Minor Prophet Reader', desc: 'Complete Minor Prophets', category: 'books', catKey: 'Minor Prophets' },
    cat_gospels: { id: 'cat_gospels', name: 'Gospel Reader', desc: 'Complete the Gospels', category: 'books', catKey: 'Gospels' },
    cat_pauline: { id: 'cat_pauline', name: 'Pauline Scholar', desc: 'Complete Pauline Epistles', category: 'books', catKey: 'Pauline Epistles' },
    cat_general: { id: 'cat_general', name: 'Epistle Reader', desc: 'Complete General Epistles', category: 'books', catKey: 'General Epistles' },

    // Testaments
    old_testament: { id: 'old_testament', name: 'Old Testament', desc: 'Complete the Old Testament', category: 'books' },
    new_testament: { id: 'new_testament', name: 'New Testament', desc: 'Complete the New Testament', category: 'books' },

    // Entire Bible
    entire_bible: { id: 'entire_bible', name: 'Bible Complete', desc: 'Complete the entire Bible', category: 'progress', target: 1189 },

    // Notable chapters
    chapter_genesis_1: { id: 'chapter_genesis_1', name: 'In the Beginning', desc: 'Complete Genesis 1 (Creation)', category: 'notable', bookIndex: 0, chapter: 1 },
    chapter_genesis_3: { id: 'chapter_genesis_3', name: 'The Fall', desc: 'Complete Genesis 3', category: 'notable', bookIndex: 0, chapter: 3 },
    chapter_exodus_20: { id: 'chapter_exodus_20', name: 'The Law', desc: 'Complete Exodus 20 (Ten Commandments)', category: 'notable', bookIndex: 1, chapter: 20 },
    chapter_psalm_23: { id: 'chapter_psalm_23', name: 'The Shepherd', desc: 'Complete Psalm 23', category: 'notable', bookIndex: 18, chapter: 23 },
    chapter_psalm_117: { id: 'chapter_psalm_117', name: 'Short & Sweet', desc: 'Complete Psalm 117 (shortest chapter)', category: 'notable', bookIndex: 18, chapter: 117 },
    chapter_psalm_119: { id: 'chapter_psalm_119', name: 'The Long Haul', desc: 'Complete Psalm 119 (longest chapter)', category: 'notable', bookIndex: 18, chapter: 119 },
    chapter_isaiah_53: { id: 'chapter_isaiah_53', name: 'Suffering Servant', desc: 'Complete Isaiah 53', category: 'notable', bookIndex: 22, chapter: 53 },
    chapter_matthew_5: { id: 'chapter_matthew_5', name: 'Sermon on the Mount', desc: 'Complete Matthew 5 (Beatitudes)', category: 'notable', bookIndex: 39, chapter: 5 },
    chapter_john_3: { id: 'chapter_john_3', name: 'For God So Loved', desc: 'Complete John 3', category: 'notable', bookIndex: 42, chapter: 3 },
    chapter_romans_8: { id: 'chapter_romans_8', name: 'More Than Conquerors', desc: 'Complete Romans 8', category: 'notable', bookIndex: 44, chapter: 8 },
    chapter_1cor_13: { id: 'chapter_1cor_13', name: 'Love Chapter', desc: 'Complete 1 Corinthians 13', category: 'notable', bookIndex: 45, chapter: 13 },
    chapter_hebrews_11: { id: 'chapter_hebrews_11', name: 'Hall of Faith', desc: 'Complete Hebrews 11', category: 'notable', bookIndex: 57, chapter: 11 },
    chapter_revelation_22: { id: 'chapter_revelation_22', name: 'The End', desc: 'Complete Revelation 22', category: 'notable', bookIndex: 65, chapter: 22 },

    // Notable verses
    verse_john_11_35: { id: 'verse_john_11_35', name: 'Jesus Wept', desc: 'Complete John 11:35 (shortest verse)', category: 'notable', bookIndex: 42, chapter: 11, verse: 35 },
    verse_esther_8_9: { id: 'verse_esther_8_9', name: 'Marathon Verse', desc: 'Complete Esther 8:9 (longest verse)', category: 'notable', bookIndex: 16, chapter: 8, verse: 9 },

    // Famous Bible characters (first appearances)
    character_adam: { id: 'character_adam', name: 'Meet Adam', desc: 'Complete Genesis 2', category: 'characters', bookIndex: 0, chapter: 2 },
    character_noah: { id: 'character_noah', name: 'Meet Noah', desc: 'Complete Genesis 6', category: 'characters', bookIndex: 0, chapter: 6 },
    character_abraham: { id: 'character_abraham', name: 'Meet Abraham', desc: 'Complete Genesis 12', category: 'characters', bookIndex: 0, chapter: 12 },
    character_moses: { id: 'character_moses', name: 'Meet Moses', desc: 'Complete Exodus 2', category: 'characters', bookIndex: 1, chapter: 2 },
    character_ruth: { id: 'character_ruth', name: 'Meet Ruth', desc: 'Complete Ruth 1', category: 'characters', bookIndex: 7, chapter: 1 },
    character_samson: { id: 'character_samson', name: 'Meet Samson', desc: 'Complete Judges 13', category: 'characters', bookIndex: 6, chapter: 13 },
    character_david: { id: 'character_david', name: 'Meet David', desc: 'Complete 1 Samuel 16', category: 'characters', bookIndex: 8, chapter: 16 },
    character_solomon: { id: 'character_solomon', name: 'Meet Solomon', desc: 'Complete 1 Kings 3', category: 'characters', bookIndex: 10, chapter: 3 },
    character_elijah: { id: 'character_elijah', name: 'Meet Elijah', desc: 'Complete 1 Kings 17', category: 'characters', bookIndex: 10, chapter: 17 },
    character_esther: { id: 'character_esther', name: 'Meet Esther', desc: 'Complete Esther 2', category: 'characters', bookIndex: 16, chapter: 2 },
    character_isaiah: { id: 'character_isaiah', name: 'Meet Isaiah', desc: 'Complete Isaiah 1', category: 'characters', bookIndex: 22, chapter: 1 },
    character_daniel: { id: 'character_daniel', name: 'Meet Daniel', desc: 'Complete Daniel 1', category: 'characters', bookIndex: 26, chapter: 1 },
    character_jonah: { id: 'character_jonah', name: 'Meet Jonah', desc: 'Complete Jonah 1', category: 'characters', bookIndex: 31, chapter: 1 },
    character_mary: { id: 'character_mary', name: 'Meet Mary', desc: 'Complete Luke 1', category: 'characters', bookIndex: 41, chapter: 1 },
    character_jesus: { id: 'character_jesus', name: 'Meet Jesus', desc: 'Complete Matthew 1', category: 'characters', bookIndex: 39, chapter: 1 },
    character_peter: { id: 'character_peter', name: 'Meet Peter', desc: 'Complete Matthew 4', category: 'characters', bookIndex: 39, chapter: 4 },
    character_paul: { id: 'character_paul', name: 'Meet Paul', desc: 'Complete Acts 7', category: 'characters', bookIndex: 43, chapter: 7 },
    character_timothy: { id: 'character_timothy', name: 'Meet Timothy', desc: 'Complete Acts 16', category: 'characters', bookIndex: 43, chapter: 16 },

    // Chapter WPM (40-150 in increments of 10)
    ...Object.fromEntries([40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150].map(wpm => [
        `chapter_wpm_${wpm}`, { id: `chapter_wpm_${wpm}`, name: `${wpm} WPM Chapter`, desc: `Complete a chapter at ${wpm}+ WPM`, category: 'speed', target: wpm }
    ])),

    // Verse WPM (40-150 in increments of 10)
    ...Object.fromEntries([40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150].map(wpm => [
        `verse_wpm_${wpm}`, { id: `verse_wpm_${wpm}`, name: `${wpm} WPM Verse`, desc: `Complete a verse at ${wpm}+ WPM`, category: 'speed', target: wpm, verse: true }
    ])),

    // Accuracy
    accuracy_97: { id: 'accuracy_97', name: '97% Accuracy', desc: 'Complete a chapter with 97%+ accuracy', category: 'accuracy', target: 97 },
    accuracy_98: { id: 'accuracy_98', name: '98% Accuracy', desc: 'Complete a chapter with 98%+ accuracy', category: 'accuracy', target: 98 },
    accuracy_99: { id: 'accuracy_99', name: '99% Accuracy', desc: 'Complete a chapter with 99%+ accuracy', category: 'accuracy', target: 99 },
    accuracy_100: { id: 'accuracy_100', name: 'Perfectionist', desc: 'Complete a chapter with 100% accuracy', category: 'accuracy', target: 100 },

    // Consecutive perfect verses
    perfect_verses_1: { id: 'perfect_verses_1', name: 'Perfect Verse', desc: 'Complete 1 verse with no errors', category: 'accuracy', target: 1 },
    perfect_verses_3: { id: 'perfect_verses_3', name: 'Triple Perfect', desc: 'Complete 3 consecutive verses with no errors', category: 'accuracy', target: 3 },
    perfect_verses_5: { id: 'perfect_verses_5', name: 'Five Perfect', desc: 'Complete 5 consecutive verses with no errors', category: 'accuracy', target: 5 },
    perfect_verses_10: { id: 'perfect_verses_10', name: 'Perfect Ten', desc: 'Complete 10 consecutive verses with no errors', category: 'accuracy', target: 10 },
    perfect_verses_25: { id: 'perfect_verses_25', name: 'Quarter Century Perfect', desc: 'Complete 25 consecutive verses with no errors', category: 'accuracy', target: 25 },

    // Error mastery - complete a chapter with zero of each error type
    mastery_no_wrong_shift: { id: 'mastery_no_wrong_shift', name: 'Shift Master', desc: 'Complete a chapter with no wrong-shift errors', category: 'mastery' },
    mastery_no_wrong_case: { id: 'mastery_no_wrong_case', name: 'Case Master', desc: 'Complete a chapter with no wrong-case errors', category: 'mastery' },
    mastery_no_too_early: { id: 'mastery_no_too_early', name: 'Patience', desc: 'Complete a chapter with no too-early errors', category: 'mastery' },
    mastery_no_too_late: { id: 'mastery_no_too_late', name: 'Quick Recovery', desc: 'Complete a chapter with no too-late errors', category: 'mastery' },
    mastery_no_duplicate: { id: 'mastery_no_duplicate', name: 'No Echoes', desc: 'Complete a chapter with no duplicate errors', category: 'mastery' },
    mastery_no_adjacent: { id: 'mastery_no_adjacent', name: 'Precision', desc: 'Complete a chapter with no adjacent key errors', category: 'mastery' },
    mastery_no_other: { id: 'mastery_no_other', name: 'Classified', desc: 'Complete a chapter with no uncategorized errors', category: 'mastery' },

    // Adjacent direction mastery - complete a chapter with no errors in each direction
    mastery_no_adj_up: { id: 'mastery_no_adj_up', name: 'Grounded Fingers', desc: 'Complete a chapter with no upward adjacent errors', category: 'mastery' },
    mastery_no_adj_down: { id: 'mastery_no_adj_down', name: 'High Ground', desc: 'Complete a chapter with no downward adjacent errors', category: 'mastery' },
    mastery_no_adj_left: { id: 'mastery_no_adj_left', name: 'Left in Place', desc: 'Complete a chapter with no leftward adjacent errors', category: 'mastery' },
    mastery_no_adj_right: { id: 'mastery_no_adj_right', name: 'Right on Track', desc: 'Complete a chapter with no rightward adjacent errors', category: 'mastery' },

    // Total characters typed
    chars_10k: { id: 'chars_10k', name: '10K Characters', desc: 'Type 10,000 characters', category: 'volume', target: 10000 },
    chars_50k: { id: 'chars_50k', name: '50K Characters', desc: 'Type 50,000 characters', category: 'volume', target: 50000 },
    chars_100k: { id: 'chars_100k', name: '100K Characters', desc: 'Type 100,000 characters', category: 'volume', target: 100000 },
    chars_500k: { id: 'chars_500k', name: '500K Characters', desc: 'Type 500,000 characters', category: 'volume', target: 500000 },
    chars_1m: { id: 'chars_1m', name: '1M Characters', desc: 'Type 1,000,000 characters', category: 'volume', target: 1000000 },
    chars_2m: { id: 'chars_2m', name: '2M Characters', desc: 'Type 2,000,000 characters', category: 'volume', target: 2000000 },
    chars_3m: { id: 'chars_3m', name: '3M Characters', desc: 'Type 3,000,000 characters', category: 'volume', target: 3000000 },

    // Session characters
    session_5k: { id: 'session_5k', name: '5K Session', desc: 'Type 5,000 characters in one session', category: 'session', target: 5000 },
    session_10k: { id: 'session_10k', name: '10K Session', desc: 'Type 10,000 characters in one session', category: 'session', target: 10000 },
    session_25k: { id: 'session_25k', name: '25K Session', desc: 'Type 25,000 characters in one session', category: 'session', target: 25000 },
    session_50k: { id: 'session_50k', name: '50K Session', desc: 'Type 50,000 characters in one session', category: 'session', target: 50000 },
    session_100k: { id: 'session_100k', name: '100K Session', desc: 'Type 100,000 characters in one session', category: 'session', target: 100000 },

    // Hour achievements (0-23)
    ...Object.fromEntries(Array.from({ length: 24 }, (_, h) => [
        `hour_${h}`, { id: `hour_${h}`, name: `${h === 0 ? 'Midnight' : h === 12 ? 'Noon' : h < 12 ? h + ' AM' : (h - 12) + ' PM'} Typist`, desc: `Complete a chapter at ${h === 0 ? '12' : h > 12 ? h - 12 : h}:00 ${h < 12 ? 'AM' : 'PM'}`, category: 'hour', target: h }
    ]))
};

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
    statsHidden: false,
    progressDisplayMode: 'verses',
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
    charErrors: {}, // char -> { errors, total, byType: { errorType: count } }
    transitions: {}, // "ab" -> { totalTime, count }
    // Daily session tracking
    dailySession: null, // Current day's session data
    // Shift key tracking
    leftShiftHeld: false,
    rightShiftHeld: false,
    errorPositions: [], // Array of {wordIndex, letterIndex, errorType, direction?} for categorized errors
    // Error type counts for current chapter
    errorCounts: {
        'wrong-shift': 0,
        'wrong-case': 0,
        'too-early': 0,
        'too-late': 0,
        'duplicate': 0,
        'adjacent': 0,
        'other': 0
    },
    adjacentDirections: { up: 0, down: 0, left: 0, right: 0 }
};

// Cache for verse achievements to avoid DB queries on every verse
const verseAchievementCache = {
    loaded: false,
    unlocked: new Set()
};

const IDLE_TIMEOUT = 5000; // 5 seconds

// Keyboard layout for shift detection
// Left hand types these shifted keys, so they need RIGHT shift
const LEFT_HAND_LETTERS = 'qwertasdfgzxcvb';
const LEFT_HAND_SHIFTED = '~!@#$%'; // ` 1 2 3 4 5 with shift
// Right hand types these shifted keys, so they need LEFT shift
const RIGHT_HAND_LETTERS = 'yuiophjklnm';
const RIGHT_HAND_SHIFTED = '^&*()_+{}|:"<>?'; // 6 7 8 9 0 - = [ ] \ ; ' , . / with shift

function getCorrectShift(char) {
    if (/[A-Z]/.test(char)) {
        const lowerChar = char.toLowerCase();
        if (LEFT_HAND_LETTERS.includes(lowerChar)) return 'right';
        if (RIGHT_HAND_LETTERS.includes(lowerChar)) return 'left';
    }
    if (LEFT_HAND_SHIFTED.includes(char)) return 'right';
    if (RIGHT_HAND_SHIFTED.includes(char)) return 'left';
    return null; // Doesn't require specific shift
}

// Keyboard layout with row and column positions for direction detection
const KEYBOARD_POSITIONS = {
    // Row 0 (number row)
    '`': [0, 0], '1': [0, 1], '2': [0, 2], '3': [0, 3], '4': [0, 4], '5': [0, 5],
    '6': [0, 6], '7': [0, 7], '8': [0, 8], '9': [0, 9], '0': [0, 10], '-': [0, 11], '=': [0, 12],
    '~': [0, 0], '!': [0, 1], '@': [0, 2], '#': [0, 3], '$': [0, 4], '%': [0, 5],
    '^': [0, 6], '&': [0, 7], '*': [0, 8], '(': [0, 9], ')': [0, 10], '_': [0, 11], '+': [0, 12],
    // Row 1 (qwerty row)
    'q': [1, 1], 'w': [1, 2], 'e': [1, 3], 'r': [1, 4], 't': [1, 5],
    'y': [1, 6], 'u': [1, 7], 'i': [1, 8], 'o': [1, 9], 'p': [1, 10], '[': [1, 11], ']': [1, 12], '\\': [1, 13],
    'Q': [1, 1], 'W': [1, 2], 'E': [1, 3], 'R': [1, 4], 'T': [1, 5],
    'Y': [1, 6], 'U': [1, 7], 'I': [1, 8], 'O': [1, 9], 'P': [1, 10], '{': [1, 11], '}': [1, 12], '|': [1, 13],
    // Row 2 (asdf row)
    'a': [2, 1], 's': [2, 2], 'd': [2, 3], 'f': [2, 4], 'g': [2, 5],
    'h': [2, 6], 'j': [2, 7], 'k': [2, 8], 'l': [2, 9], ';': [2, 10], "'": [2, 11],
    'A': [2, 1], 'S': [2, 2], 'D': [2, 3], 'F': [2, 4], 'G': [2, 5],
    'H': [2, 6], 'J': [2, 7], 'K': [2, 8], 'L': [2, 9], ':': [2, 10], '"': [2, 11],
    // Row 3 (zxcv row)
    'z': [3, 1], 'x': [3, 2], 'c': [3, 3], 'v': [3, 4], 'b': [3, 5],
    'n': [3, 6], 'm': [3, 7], ',': [3, 8], '.': [3, 9], '/': [3, 10],
    'Z': [3, 1], 'X': [3, 2], 'C': [3, 3], 'V': [3, 4], 'B': [3, 5],
    'N': [3, 6], 'M': [3, 7], '<': [3, 8], '>': [3, 9], '?': [3, 10],
};

// Keyboard adjacency map for detecting mistyped keys
// Corrected for physical keyboard stagger
const ADJACENT_KEYS = {
    // Row 1 - QWERTY
    'q': 'wa12', 'w': 'qeas23', 'e': 'wrds34', 'r': 'etdf45', 't': 'ryfg56',
    'y': 'tugh67', 'u': 'yihj78', 'i': 'uojk89', 'o': 'ip90lk', 'p': 'o0-[;l',
    // Row 2 - ASDF
    'a': 'qwsz', 's': 'awedxz', 'd': 'serfcx', 'f': 'drtgvc', 'g': 'ftyhbv',
    'h': 'gyujnb', 'j': 'huikmn', 'k': 'jiol,m', 'l': 'k;op.,',
    // Row 3 - ZXCV
    'z': 'asx', 'x': 'zsdc', 'c': 'xdfv', 'v': 'cfgb', 'b': 'vghn',
    'n': 'bhjm', 'm': 'njk,',
    // Numbers
    '1': '2q`', '2': '13qw', '3': '24we', '4': '35er', '5': '46rt',
    '6': '57ty', '7': '68yu', '8': '79ui', '9': '80io', '0': '9-op',
    // Punctuation
    '`': '1', '~': '!',
    '-': '0=[p', '_': ')+=P',
    '=': '-[]', '+': '_{}',
    '[': "p-=]';", '{': "P_+}':",
    ']': "[=\\'", '}': '{+|"',
    '\\': ']', '|': '}',
    ';': "l'p[/.", ':': "L\"P{?>",
    "'": ';[]/', '"': ':{}?',
    ',': 'mkl.', '<': 'MKL>',
    '.': ',/l;', '>': '<?L:',
    '/': ".;'", '?': ">:'\"",
};

function getAdjacentDirection(typed, expected) {
    const typedPos = KEYBOARD_POSITIONS[typed];
    const expectedPos = KEYBOARD_POSITIONS[expected];
    if (!typedPos || !expectedPos) return null;

    const rowDiff = typedPos[0] - expectedPos[0];
    const colDiff = typedPos[1] - expectedPos[1];

    // Determine primary direction
    if (Math.abs(rowDiff) >= Math.abs(colDiff)) {
        return rowDiff < 0 ? 'up' : 'down';
    } else {
        return colDiff < 0 ? 'left' : 'right';
    }
}

// Error types for categorization
const ERROR_TYPES = {
    WRONG_SHIFT: 'wrong-shift',
    WRONG_CASE: 'wrong-case',
    TOO_EARLY: 'too-early',
    TOO_LATE: 'too-late',
    DUPLICATE: 'duplicate',
    ADJACENT: 'adjacent',
    OTHER: 'other'
};

function isAdjacentKey(typed, expected) {
    const typedLower = typed.toLowerCase();
    const expectedLower = expected.toLowerCase();
    const adjacent = ADJACENT_KEYS[expectedLower];
    return adjacent && adjacent.includes(typedLower);
}

function classifyError(typed, expected, prevExpectedChar, prevTypedChar, nextChar, isWrongShift, prevWasCorrect = true, prevErrorType = null) {
    if (isWrongShift) return { type: ERROR_TYPES.WRONG_SHIFT };

    const isDuplicateOfPrev = prevTypedChar && typed === prevTypedChar &&
        (prevWasCorrect || prevErrorType === ERROR_TYPES.DUPLICATE);

    // Extra character (typed past word length)
    if (!expected) {
        if (isDuplicateOfPrev) {
            return { type: ERROR_TYPES.DUPLICATE };
        }
        if (nextChar && typed === nextChar) {
            return { type: ERROR_TYPES.TOO_EARLY };
        }
        return { type: ERROR_TYPES.OTHER };
    }

    // Wrong case: same letter, different case
    if (typed.toLowerCase() === expected.toLowerCase() && typed !== expected) {
        return { type: ERROR_TYPES.WRONG_CASE };
    }

    // Duplicate: typed the previous character again (if prev was correct or prev was also a duplicate)
    if (isDuplicateOfPrev) {
        return { type: ERROR_TYPES.DUPLICATE };
    }

    // Too late: typed what was expected earlier (prev was wrong, now typing it)
    if (prevExpectedChar && typed === prevExpectedChar && !prevWasCorrect) {
        return { type: ERROR_TYPES.TOO_LATE };
    }

    // Too early: typed the next character
    if (nextChar && typed === nextChar) {
        return { type: ERROR_TYPES.TOO_EARLY };
    }

    // Adjacent key: mistyped to a nearby key
    if (isAdjacentKey(typed, expected)) {
        const direction = getAdjacentDirection(typed, expected);
        return { type: ERROR_TYPES.ADJACENT, direction };
    }

    return { type: ERROR_TYPES.OTHER };
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
    progressToggle: $('progress-toggle'),
    statsBar: document.querySelector('.stats-bar'),
    modalOverlay: $('modal-overlay'),
    finalWpm: $('final-wpm'),
    finalAccuracy: $('final-accuracy'),
    nextChapter: $('next-chapter'),
    overallProgress: $('overall-progress'),
    themeToggle: $('theme-toggle'),
    statsToggle: $('stats-toggle'),
    openBible: $('open-bible'),
    copyContext: $('copy-context'),
    copyMenu: $('copy-menu'),
};

// Load/Save State
function loadState() {
    const saved = localStorage.getItem('bibleTypeState');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
    }
    applyTheme();
    applyStatsVisibility();
}

function saveState() {
    const toSave = {
        currentBookIndex: state.currentBookIndex,
        currentChapter: state.currentChapter,
        theme: state.theme,
        statsHidden: state.statsHidden,
        progressDisplayMode: state.progressDisplayMode,
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
    saveMidChapterStats();
}

function saveMidChapterStats() {
    const stats = {
        bookIndex: state.currentBookIndex,
        chapter: state.currentChapter,
        verseTimes: state.verseTimes,
        totalKeystrokes: state.totalKeystrokes,
        correctKeystrokes: state.correctKeystrokes,
        verseKeystrokes: state.verseKeystrokes,
        verseCorrectKeystrokes: state.verseCorrectKeystrokes,
        currentWordIndex: state.currentWordIndex,
        currentLetterIndex: state.currentLetterIndex,
        typedWords: state.typedWords,
        charTiming: state.charTiming,
        charErrors: state.charErrors,
        transitions: state.transitions,
        errorCounts: state.errorCounts,
        errorPositions: state.errorPositions
    };
    localStorage.setItem('midChapterStats', JSON.stringify(stats));
}

function loadMidChapterStats() {
    const saved = localStorage.getItem('midChapterStats');
    if (saved) {
        const stats = JSON.parse(saved);
        // Only load if it's for the current chapter
        if (stats.bookIndex !== state.currentBookIndex || stats.chapter !== state.currentChapter) {
            return false;
        }
        state.verseTimes = stats.verseTimes || [];
        state.totalKeystrokes = stats.totalKeystrokes || 0;
        state.correctKeystrokes = stats.correctKeystrokes || 0;
        state.verseKeystrokes = stats.verseKeystrokes || 0;
        state.verseCorrectKeystrokes = stats.verseCorrectKeystrokes || 0;
        state.currentWordIndex = stats.currentWordIndex || 0;
        state.currentLetterIndex = stats.currentLetterIndex || 0;
        state.typedWords = stats.typedWords || [];
        state.charTiming = stats.charTiming || {};
        state.charErrors = stats.charErrors || {};
        state.transitions = stats.transitions || {};
        state.errorCounts = stats.errorCounts || {
            'wrong-shift': 0, 'wrong-case': 0, 'too-early': 0,
            'too-late': 0, 'duplicate': 0, 'adjacent': 0, 'other': 0
        };
        state.errorPositions = stats.errorPositions || [];
        return true;
    }
    return false;
}

function clearMidChapterStats() {
    localStorage.removeItem('midChapterStats');
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

// Stats visibility
function applyStatsVisibility() {
    if (state.statsHidden) {
        document.documentElement.setAttribute('data-stats-hidden', 'true');
    } else {
        document.documentElement.removeAttribute('data-stats-hidden');
    }
}

function toggleStatsVisibility() {
    state.statsHidden = !state.statsHidden;
    applyStatsVisibility();
    saveState();
    els.hiddenInput.focus();
}

function getCurrentVerseNumber() {
    return state.wordToVerse[state.currentWordIndex] || 1;
}

function getVerseFromLoadedChapter(verseNumber) {
    const startIdx = state.verseStartIndices[verseNumber];
    if (startIdx === undefined) return null;

    const nextVerse = Object.keys(state.verseStartIndices)
        .map(Number)
        .filter(num => num > verseNumber)
        .sort((a, b) => a - b)[0];
    const endIdx = nextVerse ? state.verseStartIndices[nextVerse] : state.words.length;
    const text = state.words.slice(startIdx, endIdx).join(' ').replace(/\s+/g, ' ').trim();

    return text ? {
        bookName: BIBLE_BOOKS[state.currentBookIndex].name,
        chapter: state.currentChapter,
        number: verseNumber,
        text
    } : null;
}

async function getChapterVerses(bookIndex, chapter) {
    const cacheKey = getCacheKey(bookIndex, chapter);
    if (!chapterCache[cacheKey]) {
        chapterCache[cacheKey] = await fetchESV(BIBLE_BOOKS[bookIndex].name, chapter);
    }
    return chapterCache[cacheKey];
}

function getPreviousChapterPosition() {
    let bookIndex = state.currentBookIndex;
    let chapter = state.currentChapter - 1;

    if (chapter < 1) {
        bookIndex--;
        if (bookIndex < 0) return null;
        chapter = BIBLE_BOOKS[bookIndex].chapters;
    }

    return { bookIndex, chapter };
}

async function getLastVerse() {
    const currentVerse = getCurrentVerseNumber();

    if (currentVerse > 1) {
        return getVerseFromLoadedChapter(currentVerse - 1);
    }

    const previousChapter = getPreviousChapterPosition();
    if (!previousChapter) return null;

    const verses = await getChapterVerses(previousChapter.bookIndex, previousChapter.chapter);
    const lastVerse = verses[verses.length - 1];
    if (!lastVerse) return null;

    return {
        bookName: BIBLE_BOOKS[previousChapter.bookIndex].name,
        chapter: previousChapter.chapter,
        number: lastVerse.number,
        text: lastVerse.text.replace(/\s+/g, ' ').trim()
    };
}

function formatVerseForAI(verse) {
    return `<context>${verse.bookName} ${verse.chapter}:${verse.number}: ${verse.text}\n</context>`;
}

function formatChapterSummaryForAI(bookName, chapter, verses) {
    const firstVerse = verses[0]?.number || 1;
    const lastVerse = verses[verses.length - 1]?.number || firstVerse;
    return `<context>Summarize ${bookName} ${chapter}:${firstVerse}-${lastVerse}\n</context>`;
}

function formatCurrentChapterSummaryForAI(bookName, chapter, throughVerse, verses) {
    const firstVerse = verses
        .filter(verse => verse.number <= throughVerse)
        [0]?.number || 1;
    return `<context>Summarize ${bookName} ${chapter}:${firstVerse}-${throughVerse}\n</context>`;
}

function formatMeaningForAI(verse) {
    return `<context>What is the meaning of ${verse.bookName} ${verse.chapter}:${verse.number}: ${verse.text}\n</context>`;
}

function setCopyMenuOpen(isOpen) {
    els.copyMenu.hidden = !isOpen;
    els.copyContext.setAttribute('aria-expanded', String(isOpen));
}

function toggleCopyMenu(event) {
    event.stopPropagation();
    setCopyMenuOpen(els.copyMenu.hidden);
}

async function copyText(text) {
    await navigator.clipboard.writeText(text);
    els.copyContext.classList.add('copied');
    setTimeout(() => els.copyContext.classList.remove('copied'), 1000);
}

async function handleCopyMenuClick(event) {
    const option = event.target.closest('[data-copy-action]');
    if (!option) return;

    const action = option.dataset.copyAction;
    setCopyMenuOpen(false);

    try {
        if (action === 'last-verse') {
            const verse = await getLastVerse();
            if (verse) await copyText(formatVerseForAI(verse));
        } else if (action === 'current-verse') {
            const verse = getVerseFromLoadedChapter(getCurrentVerseNumber());
            if (verse) await copyText(formatVerseForAI(verse));
        } else if (action === 'meaning-current-verse') {
            const verse = getVerseFromLoadedChapter(getCurrentVerseNumber());
            if (verse) await copyText(formatMeaningForAI(verse));
        } else if (action === 'current-chapter-summary') {
            const bookName = BIBLE_BOOKS[state.currentBookIndex].name;
            const verses = await getChapterVerses(state.currentBookIndex, state.currentChapter);
            await copyText(formatCurrentChapterSummaryForAI(bookName, state.currentChapter, getCurrentVerseNumber(), verses));
        } else if (action === 'previous-chapter-summary') {
            const previousChapter = getPreviousChapterPosition();
            if (previousChapter) {
                const verses = await getChapterVerses(previousChapter.bookIndex, previousChapter.chapter);
                const bookName = BIBLE_BOOKS[previousChapter.bookIndex].name;
                await copyText(formatChapterSummaryForAI(bookName, previousChapter.chapter, verses));
            }
        }
    } catch (err) {
        console.error('Failed to copy AI context:', err);
    }

    els.hiddenInput.focus();
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
                totalTimeMs: 0,
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

async function recordVerseComplete(verseData, verseNum) {
    if (!state.dailySession) return;

    state.dailySession.versesCompleted++;

    // Update end position with the completed verse
    state.dailySession.endPosition = {
        bookIndex: state.currentBookIndex,
        chapter: state.currentChapter,
        verse: verseNum
    };

    // Set start position if not set
    if (!state.dailySession.startPosition) {
        state.dailySession.startPosition = {
            bookIndex: state.currentBookIndex,
            chapter: state.currentChapter,
            verse: verseNum
        };
    }

    // Update stats
    const session = state.dailySession;
    session.totalTimeMs = (session.totalTimeMs || 0) + verseData.time;
    session.charactersTyped += verseData.chars;

    // Derive WPM and accuracy from totals
    const totalMinutes = session.totalTimeMs / 60000;
    session.totalWpm = totalMinutes > 0 ? Math.round((session.charactersTyped / 5) / totalMinutes) : 0;
    session.totalAccuracy = session.totalKeystrokes + verseData.keystrokes > 0
        ? Math.round(((session.correctKeystrokes + verseData.correctKeystrokes) / (session.totalKeystrokes + verseData.keystrokes)) * 100)
        : 100;
    session.totalKeystrokes += verseData.keystrokes;
    session.correctKeystrokes += verseData.correctKeystrokes;

    try {
        await saveDailySession(session);
    } catch (err) {
        console.error('Failed to save daily session:', err);
    }

    // Check verse achievements
    const verseWpm = verseData.time > 0 ? Math.round((verseData.chars / 5) / (verseData.time / 60000)) : 0;
    checkVerseAchievements(verseData, verseWpm, verseNum);
}

async function checkVerseAchievements(verseData, wpm, verseNum) {
    // Load cache if not loaded
    if (!verseAchievementCache.loaded) {
        try {
            const all = await getAllAchievements();
            for (const a of all) {
                verseAchievementCache.unlocked.add(a.id);
            }
            verseAchievementCache.loaded = true;
        } catch (e) {
            verseAchievementCache.loaded = true;
        }
    }

    const newAchievements = [];

    const unlock = async (id) => {
        if (!verseAchievementCache.unlocked.has(id) && ACHIEVEMENTS[id]) {
            await saveAchievement({ id, ...ACHIEVEMENTS[id], unlockedAt: Date.now() });
            verseAchievementCache.unlocked.add(id);
            newAchievements.push(ACHIEVEMENTS[id]);
        }
    };

    // Check verse WPM achievements
    for (const targetWpm of [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]) {
        if (wpm >= targetWpm) {
            await unlock(`verse_wpm_${targetWpm}`);
        }
    }

    // Count consecutive perfect verses from the end (verseTimes already includes current verse)
    let streak = 0;
    for (let i = state.verseTimes.length - 1; i >= 0; i--) {
        const v = state.verseTimes[i];
        if (v.keystrokes === v.correctKeystrokes) {
            streak++;
        } else {
            break;
        }
    }
    if (streak >= 1) await unlock('perfect_verses_1');
    if (streak >= 3) await unlock('perfect_verses_3');
    if (streak >= 5) await unlock('perfect_verses_5');
    if (streak >= 10) await unlock('perfect_verses_10');
    if (streak >= 25) await unlock('perfect_verses_25');

    // Check notable verse achievements
    if (state.currentBookIndex === 42 && state.currentChapter === 11 && verseNum === 35) {
        await unlock('verse_john_11_35');
    }
    if (state.currentBookIndex === 16 && state.currentChapter === 8 && verseNum === 9) {
        await unlock('verse_esther_8_9');
    }

    if (newAchievements.length > 0) {
        showAchievementNotification(newAchievements);
    }
}

async function recordChapterComplete() {
    if (!state.dailySession) return;

    state.dailySession.chaptersCompleted++;

    // Update end position to the last verse of the completed chapter
    const lastVerse = Math.max(...Object.keys(state.verseStartIndices).map(Number));
    state.dailySession.endPosition = {
        bookIndex: state.currentBookIndex,
        chapter: state.currentChapter,
        verse: lastVerse
    };

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
        state.errorPositions = [];
        state.errorCounts = {
            'wrong-shift': 0,
            'wrong-case': 0,
            'too-early': 0,
            'too-late': 0,
            'duplicate': 0,
            'adjacent': 0,
            'other': 0
        };
        state.adjacentDirections = { up: 0, down: 0, left: 0, right: 0 };

        // Restore progress if available
        const key = `${state.currentBookIndex}-${state.currentChapter}`;
        const savedProgress = state.chapterProgress[key];
        if (savedProgress && savedProgress > 0 && savedProgress < state.words.length) {
            // Try to load full mid-chapter stats first
            if (loadMidChapterStats()) {
                // Stats loaded, but still need to ensure typedWords has correct length
                for (let i = state.typedWords.length; i < state.currentWordIndex; i++) {
                    state.typedWords[i] = state.words[i];
                }
            } else {
                // No mid-chapter stats, just restore position
                state.currentWordIndex = savedProgress;
                for (let i = 0; i < savedProgress; i++) {
                    state.typedWords[i] = state.words[i];
                }
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

            // Check if this position has a categorized error
            const errorInfo = state.errorPositions.find(
                pos => pos.wordIndex === wi && pos.letterIndex === li
            );

            if (isPastWord || isCurrentWord) {
                if (li < typedWord.length) {
                    if (typedWord[li] === letter) {
                        if (errorInfo) {
                            letterClass += ' ' + errorInfo.errorType;
                            hasError = true;
                        } else {
                            letterClass += ' correct';
                        }
                    } else {
                        // Character doesn't match - use the error type if we have one
                        if (errorInfo) {
                            letterClass += ' ' + errorInfo.errorType;
                        } else {
                            letterClass += ' incorrect';
                        }
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
            for (let li = word.length; li < typedWord.length; li++) {
                const ch = typedWord[li];
                const errorInfo = state.errorPositions.find(
                    pos => pos.wordIndex === wi && pos.letterIndex === li
                );
                let letterClass = 'letter extra';
                if (errorInfo) {
                    letterClass += ' ' + errorInfo.errorType;
                }
                wordHtml += `<span class="${letterClass}">${escapeHtml(ch)}</span>`;
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

function renderCurrentWord() {
    const wi = state.currentWordIndex;
    const word = state.words[wi];
    const typedWord = state.inputValue;
    const wordEl = els.words.querySelector(`[data-index="${wi}"]`);
    if (!wordEl) return;

    let wordHtml = '';
    let hasError = false;

    // Preserve verse number if present
    const verseNum = state.wordToVerse[wi];
    const isVerseStart = state.verseStartIndices[verseNum] === wi;
    if (isVerseStart) {
        wordHtml += `<sup class="verse-num">${verseNum}</sup>`;
    }

    for (let li = 0; li < word.length; li++) {
        const letter = word[li];
        let letterClass = 'letter';

        const errorInfo = state.errorPositions.find(
            pos => pos.wordIndex === wi && pos.letterIndex === li
        );

        if (li < typedWord.length) {
            if (typedWord[li] === letter) {
                if (errorInfo) {
                    letterClass += ' ' + errorInfo.errorType;
                    hasError = true;
                } else {
                    letterClass += ' correct';
                }
            } else {
                if (errorInfo) {
                    letterClass += ' ' + errorInfo.errorType;
                } else {
                    letterClass += ' incorrect';
                }
                hasError = true;
            }
        } else if (li === typedWord.length) {
            letterClass += ' current';
        }

        wordHtml += `<span class="${letterClass}">${escapeHtml(letter)}</span>`;
    }

    // Extra typed letters
    if (typedWord.length > word.length) {
        for (let li = word.length; li < typedWord.length; li++) {
            const ch = typedWord[li];
            const errorInfo = state.errorPositions.find(
                pos => pos.wordIndex === wi && pos.letterIndex === li
            );
            let letterClass = 'letter extra';
            if (errorInfo) {
                letterClass += ' ' + errorInfo.errorType;
            }
            wordHtml += `<span class="${letterClass}">${escapeHtml(ch)}</span>`;
        }
        hasError = true;
    }

    // Cursor at end
    if (typedWord.length >= word.length) {
        wordHtml += `<span class="cursor"></span>`;
    }

    wordEl.innerHTML = wordHtml;
    wordEl.className = hasError ? 'word error' : 'word';
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

    // Handle backspace - remove any error at the deleted letter
    if (value.length < state.inputValue.length) {
        const deletedIndex = value.length; // The letter that was just deleted
        state.errorPositions = state.errorPositions.filter(
            pos => !(pos.wordIndex === state.currentWordIndex && pos.letterIndex === deletedIndex)
        );
    }

    // Track keystrokes and character stats
    if (value.length > state.inputValue.length) {
        const newChar = value[value.length - 1];
        const currentWord = state.words[state.currentWordIndex];
        const letterIndex = state.inputValue.length;
        const expectedChar = currentWord[letterIndex];
        const prevExpectedChar = letterIndex > 0 ? currentWord[letterIndex - 1] : null;
        const nextWord = state.words[state.currentWordIndex + 1];
        const nextExpectedChar = letterIndex < currentWord.length - 1
            ? currentWord[letterIndex + 1]
            : (nextWord ? nextWord[0] : null);

        state.totalKeystrokes++;
        state.verseKeystrokes++;

        let isCorrect = newChar === expectedChar;

        // Check for wrong shift on capital letters and shifted punctuation
        let isWrongShift = false;
        const correctShift = getCorrectShift(newChar);
        if (isCorrect && correctShift && state.shiftHeld && state.shiftHeld !== correctShift) {
            isWrongShift = true;
            isCorrect = false; // Wrong shift counts as an error
        }

        // Classify the error (if any)
        let errorInfo = null;
        if (!isCorrect || isWrongShift) {
            const prevTypedChar = letterIndex > 0 ? state.inputValue[letterIndex - 1] : null;
            const prevWasCorrect = prevTypedChar === prevExpectedChar;
            const prevError = state.errorPositions.findLast(
                p => p.wordIndex === state.currentWordIndex && p.letterIndex === letterIndex - 1
            );
            const prevErrorType = prevError ? prevError.errorType : null;
            errorInfo = classifyError(newChar, expectedChar, prevExpectedChar, prevTypedChar, nextExpectedChar, isWrongShift, prevWasCorrect, prevErrorType);
            state.errorPositions.push({
                wordIndex: state.currentWordIndex,
                letterIndex: letterIndex,
                errorType: errorInfo.type,
                direction: errorInfo.direction || null
            });
            // Track error counts
            state.errorCounts[errorInfo.type] = (state.errorCounts[errorInfo.type] || 0) + 1;
            if (errorInfo.type === ERROR_TYPES.ADJACENT && errorInfo.direction) {
                state.adjacentDirections[errorInfo.direction]++;
            }
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

        // Track character errors with error type breakdown
        if (expectedChar) {
            if (!state.charErrors[expectedChar]) {
                state.charErrors[expectedChar] = { errors: 0, total: 0, byType: {} };
            }
            state.charErrors[expectedChar].total++;
            if (!isCorrect && errorInfo) {
                state.charErrors[expectedChar].errors++;
                const errType = errorInfo.type;
                state.charErrors[expectedChar].byType[errType] = (state.charErrors[expectedChar].byType[errType] || 0) + 1;
                // Track adjacent direction per character
                if (errType === ERROR_TYPES.ADJACENT && errorInfo.direction) {
                    const dirKey = 'adjacent-' + errorInfo.direction;
                    state.charErrors[expectedChar].byType[dirKey] = (state.charErrors[expectedChar].byType[dirKey] || 0) + 1;
                }
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
    renderCurrentWord();
    updateStats();
}

function handleKeyDown(e) {
    // Track shift key state
    if (e.code === 'ShiftLeft') state.shiftHeld = 'left';
    else if (e.code === 'ShiftRight') state.shiftHeld = 'right';
    else if (!e.shiftKey) state.shiftHeld = null;

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
                    recordVerseComplete(verseData, prevVerse);
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
                        recordVerseComplete(verseData, prevVerse);
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

    // Add previous verse (chars and time)
    const prevVerse = state.verseTimes.slice(-1)[0];
    if (prevVerse) {
        totalChars += prevVerse.chars;
        totalTime += prevVerse.time;
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
    let totalKeystrokes = 0;
    let correctKeystrokes = 0;

    // Add previous verse
    const prevVerse = state.verseTimes.slice(-1)[0];
    if (prevVerse) {
        totalKeystrokes += prevVerse.keystrokes;
        correctKeystrokes += prevVerse.correctKeystrokes;
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
    if (state.progressDisplayMode === 'percent') {
        const typedChars = getTypedChapterChars();
        const totalChars = getTotalChapterChars();
        const progress = totalChars === 0 ? 0 : Math.round((typedChars / totalChars) * 100);
        els.chapterProgress.textContent = `${progress}%`;
        return;
    }

    const verseNumbers = Object.keys(state.verseStartIndices)
        .map(Number)
        .sort((a, b) => a - b);

    if (verseNumbers.length === 0) {
        els.chapterProgress.textContent = '0/0';
        return;
    }

    const currentVerse = state.wordToVerse[state.currentWordIndex] || verseNumbers[verseNumbers.length - 1];
    const currentVerseIndex = verseNumbers.indexOf(currentVerse) + 1;

    els.chapterProgress.textContent = `${currentVerseIndex}/${verseNumbers.length}`;
}

function getTotalChapterChars() {
    if (state.words.length === 0) return 0;
    return state.words.reduce((sum, word) => sum + word.length, 0) + state.words.length - 1;
}

function getTypedChapterChars() {
    if (state.words.length === 0) return 0;

    const completedWords = Math.min(state.currentWordIndex, state.words.length);
    let chars = 0;

    for (let i = 0; i < completedWords; i++) {
        chars += state.words[i].length;
        if (i < state.words.length - 1) chars += 1;
    }

    if (completedWords < state.words.length) {
        chars += state.inputValue.length;
    }

    return Math.min(chars, getTotalChapterChars());
}

function toggleProgressDisplay() {
    state.progressDisplayMode = state.progressDisplayMode === 'percent' ? 'verses' : 'percent';
    updateProgress();
    saveState();
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

// Display error breakdown in modal
function displayErrorBreakdown() {
    const container = document.getElementById('error-breakdown');
    const totalErrors = Object.values(state.errorCounts).reduce((a, b) => a + b, 0);

    if (totalErrors === 0) {
        container.innerHTML = '<div class="error-breakdown-title">No errors!</div>';
        return;
    }

    const errorLabels = {
        'wrong-shift': 'Wrong Shift',
        'wrong-case': 'Wrong Case',
        'too-early': 'Too Early',
        'too-late': 'Too Late',
        'duplicate': 'Duplicate',
        'adjacent': 'Adjacent Key',
        'other': 'Other'
    };

    let html = '<div class="error-breakdown-title">Errors</div><ul class="error-breakdown-list">';

    for (const [type, count] of Object.entries(state.errorCounts)) {
        if (count === 0) continue;

        const percent = Math.round((count / totalErrors) * 100);
        html += `<li class="error-breakdown-item">
            <span class="color-dot ${type}"></span>
            <span class="error-name">${errorLabels[type]}</span>
            <span class="error-count">${count} (${percent}%)</span>
        </li>`;

        // Add direction sub-items for adjacent errors
        if (type === 'adjacent') {
            const dirs = state.adjacentDirections;
            const dirItems = [];
            if (dirs.up > 0) dirItems.push(`up: ${dirs.up}`);
            if (dirs.down > 0) dirItems.push(`down: ${dirs.down}`);
            if (dirs.left > 0) dirItems.push(`left: ${dirs.left}`);
            if (dirs.right > 0) dirItems.push(`right: ${dirs.right}`);

            if (dirItems.length > 0) {
                html += '<ul class="error-subitems">';
                for (const item of dirItems) {
                    html += `<li>${item}</li>`;
                }
                html += '</ul>';
            }
        }
    }

    html += '</ul>';
    container.innerHTML = html;
}

// Achievement checking
async function checkAchievements(chapterWpm, chapterAccuracy) {
    const newAchievements = [];
    let unlockedAchievements;

    try {
        unlockedAchievements = await getAllAchievements();
    } catch (err) {
        unlockedAchievements = [];
    }

    const unlocked = new Set(unlockedAchievements.map(a => a.id));

    // Helper to unlock achievement
    const unlock = async (id) => {
        if (!unlocked.has(id) && ACHIEVEMENTS[id]) {
            const achievement = {
                id,
                unlockedAt: Date.now(),
                ...ACHIEVEMENTS[id]
            };
            await saveAchievement(achievement);
            newAchievements.push(achievement);
            unlocked.add(id);
        }
    };

    // Get all chapter stats for progress calculations
    let allChapters;
    try {
        allChapters = await getAllChapterStats();
    } catch (err) {
        allChapters = [];
    }

    const completedCount = allChapters.length;

    // 1. Chapters completed
    if (completedCount >= 1) await unlock('chapters_1');
    if (completedCount >= 10) await unlock('chapters_10');
    if (completedCount >= 100) await unlock('chapters_100');
    if (completedCount >= 595) await unlock('chapters_595');
    if (completedCount >= 1189) await unlock('entire_bible');

    // 2. Streaks
    let allSessions;
    try {
        allSessions = await getAllDailySessions();
    } catch (err) {
        allSessions = [];
    }
    const streak = calculateStreakFromSessions(allSessions);
    if (streak >= 3) await unlock('streak_3');
    if (streak >= 7) await unlock('streak_7');
    if (streak >= 14) await unlock('streak_14');
    if (streak >= 30) await unlock('streak_30');
    if (streak >= 100) await unlock('streak_100');

    // 3. Book categories
    for (const [catKey, catData] of Object.entries(BOOK_CATEGORIES)) {
        const catBooks = catData.books;
        let allComplete = true;
        for (const bookIdx of catBooks) {
            const book = BIBLE_BOOKS[bookIdx];
            for (let ch = 1; ch <= book.chapters; ch++) {
                const found = allChapters.some(c => c.bookIndex === bookIdx && c.chapter === ch);
                if (!found) {
                    allComplete = false;
                    break;
                }
            }
            if (!allComplete) break;
        }
        if (allComplete) {
            const achievementId = 'cat_' + catKey.toLowerCase().replace(/[^a-z]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
            // Map to actual achievement IDs
            const catIdMap = {
                'Pentateuch': 'cat_pentateuch',
                'History': 'cat_history',
                'Poetry': 'cat_poetry',
                'Major Prophets': 'cat_major_prophets',
                'Minor Prophets': 'cat_minor_prophets',
                'Gospels': 'cat_gospels',
                'Pauline Epistles': 'cat_pauline',
                'General Epistles': 'cat_general'
            };
            if (catIdMap[catKey]) {
                await unlock(catIdMap[catKey]);
            }
        }
    }

    // 3b. Testaments
    const otBooks = Array.from({ length: 39 }, (_, i) => i); // 0-38
    const ntBooks = Array.from({ length: 27 }, (_, i) => i + 39); // 39-65

    let otComplete = true;
    for (const bookIdx of otBooks) {
        const book = BIBLE_BOOKS[bookIdx];
        for (let ch = 1; ch <= book.chapters; ch++) {
            if (!allChapters.some(c => c.bookIndex === bookIdx && c.chapter === ch)) {
                otComplete = false;
                break;
            }
        }
        if (!otComplete) break;
    }
    if (otComplete) await unlock('old_testament');

    let ntComplete = true;
    for (const bookIdx of ntBooks) {
        const book = BIBLE_BOOKS[bookIdx];
        for (let ch = 1; ch <= book.chapters; ch++) {
            if (!allChapters.some(c => c.bookIndex === bookIdx && c.chapter === ch)) {
                ntComplete = false;
                break;
            }
        }
        if (!ntComplete) break;
    }
    if (ntComplete) await unlock('new_testament');

    // 3c. Notable chapters and characters
    const chapterAchievements = Object.values(ACHIEVEMENTS).filter(a =>
        a.category === 'notable' || a.category === 'characters'
    );
    for (const achievement of chapterAchievements) {
        if (allChapters.some(c => c.bookIndex === achievement.bookIndex && c.chapter === achievement.chapter)) {
            await unlock(achievement.id);
        }
    }

    // 4. Chapter WPM
    for (const wpm of [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]) {
        if (chapterWpm >= wpm) {
            await unlock(`chapter_wpm_${wpm}`);
        }
    }

    // 5. Verse WPM - check current chapter's verses
    for (const verse of state.verseTimes) {
        if (verse.time > 0 && verse.chars > 0) {
            const verseWpm = Math.round((verse.chars / 5) / (verse.time / 60000));
            for (const wpm of [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]) {
                if (verseWpm >= wpm) {
                    await unlock(`verse_wpm_${wpm}`);
                }
            }
        }
    }

    // 6. Accuracy
    if (chapterAccuracy >= 97) await unlock('accuracy_97');
    if (chapterAccuracy >= 98) await unlock('accuracy_98');
    if (chapterAccuracy >= 99) await unlock('accuracy_99');
    if (chapterAccuracy >= 100) await unlock('accuracy_100');

    // 7. Consecutive perfect verses
    let maxConsecutivePerfect = 0;
    let currentStreak = 0;
    for (const verse of state.verseTimes) {
        if (verse.keystrokes === verse.correctKeystrokes) {
            currentStreak++;
            maxConsecutivePerfect = Math.max(maxConsecutivePerfect, currentStreak);
        } else {
            currentStreak = 0;
        }
    }
    if (maxConsecutivePerfect >= 1) await unlock('perfect_verses_1');
    if (maxConsecutivePerfect >= 3) await unlock('perfect_verses_3');
    if (maxConsecutivePerfect >= 5) await unlock('perfect_verses_5');
    if (maxConsecutivePerfect >= 10) await unlock('perfect_verses_10');
    if (maxConsecutivePerfect >= 25) await unlock('perfect_verses_25');

    // 8. Error mastery (chapter with zero of each error type)
    // Only award if chapter has at least one specific error type tracked (not just "other")
    const ec = state.errorCounts;
    const hasSpecificErrors = ec['wrong-shift'] > 0 || ec['wrong-case'] > 0 ||
        ec['too-early'] > 0 || ec['too-late'] > 0 || ec['duplicate'] > 0 || ec['adjacent'] > 0;
    if (hasSpecificErrors) {
        if (ec['wrong-shift'] === 0) await unlock('mastery_no_wrong_shift');
        if (ec['wrong-case'] === 0) await unlock('mastery_no_wrong_case');
        if (ec['too-early'] === 0) await unlock('mastery_no_too_early');
        if (ec['too-late'] === 0) await unlock('mastery_no_too_late');
        if (ec['duplicate'] === 0) await unlock('mastery_no_duplicate');
        if (ec['adjacent'] === 0) await unlock('mastery_no_adjacent');
        if (ec['other'] === 0) await unlock('mastery_no_other');
    }

    // 8b. Adjacent direction mastery
    const dirs = state.adjacentDirections;
    if (ec['adjacent'] > 0) {
        if (dirs.up === 0) await unlock('mastery_no_adj_up');
        if (dirs.down === 0) await unlock('mastery_no_adj_down');
        if (dirs.left === 0) await unlock('mastery_no_adj_left');
        if (dirs.right === 0) await unlock('mastery_no_adj_right');
    }

    // 9. Total characters typed
    let totalChars = 0;
    for (const chapter of allChapters) {
        totalChars += chapter.totalKeystrokes || 0;
    }
    if (totalChars >= 10000) await unlock('chars_10k');
    if (totalChars >= 50000) await unlock('chars_50k');
    if (totalChars >= 100000) await unlock('chars_100k');
    if (totalChars >= 500000) await unlock('chars_500k');
    if (totalChars >= 1000000) await unlock('chars_1m');
    if (totalChars >= 2000000) await unlock('chars_2m');
    if (totalChars >= 3000000) await unlock('chars_3m');

    // 9. Session characters
    const sessionChars = state.dailySession?.charactersTyped || 0;
    if (sessionChars >= 5000) await unlock('session_5k');
    if (sessionChars >= 10000) await unlock('session_10k');
    if (sessionChars >= 25000) await unlock('session_25k');
    if (sessionChars >= 50000) await unlock('session_50k');
    if (sessionChars >= 100000) await unlock('session_100k');

    // 10. Hour achievements
    const currentHour = new Date().getHours();
    await unlock(`hour_${currentHour}`);

    return newAchievements;
}

function showAchievementNotification(achievements) {
    if (achievements.length === 0) return;

    // Create notification container if it doesn't exist
    let container = document.getElementById('achievement-notifications');
    if (!container) {
        container = document.createElement('div');
        container.id = 'achievement-notifications';
        container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; flex-direction: column; gap: 10px; max-height: 90vh; overflow-y: auto;';
        document.body.appendChild(container);
    }

    for (const achievement of achievements) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            background: var(--bg-secondary, #2c2e31);
            border: 2px solid var(--accent, #e2b714);
            border-radius: 8px;
            padding: 1rem 1.5rem;
            color: var(--text, #d1d0c5);
            font-family: var(--font-mono, monospace);
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            position: relative;
        `;
        notification.innerHTML = `
            <button style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: var(--text-secondary, #646669); cursor: pointer; font-size: 1.25rem; line-height: 1; padding: 0;" onclick="this.parentElement.style.animation='slideOut 0.3s ease-in'; setTimeout(() => this.parentElement.remove(), 300);">&times;</button>
            <div style="color: var(--accent, #e2b714); font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.25rem;">Achievement Unlocked!</div>
            <div style="font-weight: bold; margin-bottom: 0.25rem;">${achievement.name}</div>
            <div style="font-size: 0.875rem; color: var(--text-secondary, #646669);">${achievement.desc}</div>
        `;
        container.appendChild(notification);
    }
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
    delete state.chapterProgress[key]; // Clear word progress
    saveState();
    clearMidChapterStats(); // Clear mid-chapter stats from localStorage

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
            },
            errorCounts: { ...state.errorCounts },
            adjacentDirections: { ...state.adjacentDirections },
            verseTimes: [...state.verseTimes],
            completedHour: new Date().getHours()
        });
        await recordChapterComplete();

        // Check achievements
        const newAchievements = await checkAchievements(wpm, accuracy);
        if (newAchievements.length > 0) {
            showAchievementNotification(newAchievements);
        }
    } catch (err) {
        console.error('Failed to save chapter stats:', err);
    }

    els.finalWpm.textContent = wpm;
    els.finalAccuracy.textContent = accuracy + '%';
    displayErrorBreakdown();
    els.modalOverlay.hidden = false;

    updateOverallProgress();

    // Advance to next chapter immediately (state saved, so refresh-safe)
    const book = BIBLE_BOOKS[state.currentBookIndex];
    if (state.currentChapter < book.chapters) {
        state.currentChapter++;
    } else if (state.currentBookIndex < BIBLE_BOOKS.length - 1) {
        state.currentBookIndex++;
        state.currentChapter = 1;
    }
    // Save the advanced position
    saveState();
}

function nextChapter() {
    // Check if we've finished the entire Bible
    if (state.currentBookIndex >= BIBLE_BOOKS.length - 1 &&
        state.currentChapter > BIBLE_BOOKS[BIBLE_BOOKS.length - 1].chapters) {
        alert('Congratulations! You have typed through the entire Bible!');
        return;
    }

    // Just close modal and load the already-advanced chapter
    els.modalOverlay.hidden = true;
    els.statsBar.classList.remove('visible');
    updateLocation();
    fetchChapter();
}

// UI Updates
function getBibleChapterUrl(bookName, chapter) {
    const passage = encodeURIComponent(`${bookName} ${chapter}`);
    return `https://www.biblegateway.com/passage/?search=${passage}&version=ESV`;
}

function updateLocation() {
    const book = BIBLE_BOOKS[state.currentBookIndex];
    els.currentLocation.textContent = `${book.name} ${state.currentChapter}`;
    els.openBible.href = getBibleChapterUrl(book.name, state.currentChapter);
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

    els.typingArea.addEventListener('click', focus);
    document.addEventListener('keydown', e => {
        if (!state.isFocused && !e.ctrlKey && !e.metaKey && !e.altKey) {
            focus();
        }
    });

    els.themeToggle.addEventListener('click', toggleTheme);
    els.statsToggle.addEventListener('click', toggleStatsVisibility);
    if (els.progressToggle) {
        els.progressToggle.addEventListener('click', toggleProgressDisplay);
        els.progressToggle.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleProgressDisplay();
            }
        });
    }
    if (els.copyContext && els.copyMenu) {
        els.copyContext.addEventListener('click', toggleCopyMenu);
        els.copyMenu.addEventListener('click', handleCopyMenuClick);
    }
    document.addEventListener('click', () => setCopyMenuOpen(false));
    els.nextChapter.addEventListener('click', nextChapter);

    // Track shift key state
    document.addEventListener('keydown', e => {
        if (e.code === 'ShiftLeft') state.shiftHeld = 'left';
        else if (e.code === 'ShiftRight') state.shiftHeld = 'right';
        else if (!e.shiftKey) state.shiftHeld = null;
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
