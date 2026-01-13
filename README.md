# Bible Type

A minimalist typing practice app for typing through the entire Bible (ESV).

## Features

- **Full Bible**: Type through all 1,189 chapters from Genesis to Revelation
- **Real-time stats**: WPM and accuracy displayed as you type
- **Progress tracking**: Saves your position and completed chapters
- **Daily sessions**: Tracks daily typing stats (WPM, accuracy, characters typed, verses/chapters completed)
- **Wrong shift detection**: Highlights when you use the wrong shift key for proper touch typing technique (displayed in orange)
- **Dark/light theme**: Toggle between themes
- **Character analytics**: Detailed stats page showing per-character timing, error rates, and key transitions

## Usage

1. Open `index.html` in a browser
2. Click the typing area or press any key to focus
3. Type the displayed text - errors are highlighted in red, wrong shift in orange
4. Press space to advance to the next word
5. Complete each verse to save progress

### Controls

- **Backspace**: Correct mistakes (cannot backspace into previous verse)
- **Space**: Move to next word
- **Tab**: Restart from beginning of current verse (after 5 seconds idle)

### Stats Page

Click the chart icon in the header to view:
- Overall progress and averages
- Daily session history
- Slowest characters and transitions
- Highest error rate characters
- Progress chart over time

## Technical Details

- Vanilla HTML/CSS/JavaScript (no frameworks)
- ESV Bible text via [ESV API](https://api.esv.org/)
- Progress stored in localStorage
- Detailed stats stored in IndexedDB
- Designed for GitHub Pages hosting

## Files

- `index.html` - Main typing interface
- `stats.html` - Statistics dashboard
- `app.js` - Core application logic
- `db.js` - IndexedDB wrapper for stats storage
- `styles.css` - Styling
- `test-data.html` - Utility to populate test data

## Touch Typing

The app enforces proper touch typing technique by detecting wrong shift key usage:
- Left-hand keys (QWERTASDFGZXCVB, 12345) should use **right shift**
- Right-hand keys (YUIOPHJKLNM, 67890-=) should use **left shift**

Using the wrong shift marks the character in orange and counts as an error.

## License

Scripture quotations are from the ESV Bible (The Holy Bible, English Standard Version), copyright 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.
