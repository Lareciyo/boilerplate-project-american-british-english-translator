const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  translate(text, locale) {
    const isToBritish = locale === 'american-to-british';
    
    // 1. Build the dictionary based on translation direction
    let activeDict;
    if (isToBritish) {
      activeDict = { ...americanOnly, ...americanToBritishSpelling };
    } else {
      // Reverse spelling dictionary and include British-specific terms
      activeDict = { ...britishOnly, ...this.reverseDict(americanToBritishSpelling) };
    }

    const titles = americanToBritishTitles;
    let translated = text;

    // 2. Handle Titles (Processed first to avoid double-translation of single words)
    for (let [key, val] of Object.entries(titles)) {
      const target = isToBritish ? key : val;
      const replacement = isToBritish ? val : key;
      // Regex handles word boundaries and escaped dots for American titles
      const regex = new RegExp(`(?<=^|\\s)${target.replace('.', '\\.')}(?=\\s|$)`, 'gi');
      translated = translated.replace(regex, `<span class="highlight">${replacement.charAt(0).toUpperCase() + replacement.slice(1)}</span>`);
    }

    // 3. Handle Time Formats (10:30 vs 10.30)
    const timeRegex = isToBritish ? /([0-9]{1,2}):([0-9]{2})/g : /([0-9]{1,2})\.([0-9]{2})/g;
    const timeSymbol = isToBritish ? '.' : ':';
    translated = translated.replace(timeRegex, `<span class="highlight">$1${timeSymbol}$2</span>`);

    // 4. Handle Vocabulary and Spelling
    // Sort keys by length descending to catch multi-word phrases (e.g., "car boot sale") before single words ("car")
    const sortedKeys = Object.keys(activeDict).sort((a, b) => b.length - a.length);

    sortedKeys.forEach(key => {
      // Case-insensitive match with lookbehind/lookahead for word boundaries and punctuation
      const regex = new RegExp(`(?<=^|[\\s\\.,!\\?])(${key})(?=[\\s\\.,!\\?]|$)`, 'gi');
      translated = translated.replace(regex, (match) => {
        return `<span class="highlight">${activeDict[key]}</span>`;
      });
    });

    return translated === text ? "Everything looks good to me!" : translated;
  }

  reverseDict(obj) {
    return Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));
  }
}

module.exports = Translator;