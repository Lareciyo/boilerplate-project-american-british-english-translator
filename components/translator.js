const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  translate(text, locale) {
    const dict = locale === 'american-to-british' ? 
          { ...americanOnly, ...americanToBritishSpelling } : 
          { ...britishOnly };
    
    const titles = americanToBritishTitles;
    let translated = text;

    // 1. Handle Titles (special case for dots)
    for (let [key, val] of Object.entries(titles)) {
      if (locale === 'american-to-british') {
        // American to British (remove dots)
        const regex = new RegExp(`\\b${key.replace('.', '\\.')}`, 'gi');
        translated = translated.replace(regex, (match) => {
          return `<span class="highlight">${val.charAt(0).toUpperCase() + val.slice(1)}</span>`;
        });
      } else {
        // British to American (add dots)
        // We swap key/val for the lookup
        const britishTitle = val;
        const americanTitle = key;
        const regex = new RegExp(`\\b${britishTitle}\\b`, 'gi');
        translated = translated.replace(regex, (match) => {
          return `<span class="highlight">${americanTitle.charAt(0).toUpperCase() + americanTitle.slice(1)}</span>`;
        });
      }
    }

    // 2. Handle Time (10:30 vs 10.30)
    const timeRegex = locale === 'american-to-british' ? /([0-9]{1,2}):([0-9]{2})/g : /([0-9]{1,2})\.([0-9]{2})/g;
    const timeSeparator = locale === 'american-to-british' ? '.' : ':';
    translated = translated.replace(timeRegex, `<span class="highlight">$1${timeSeparator}$2</span>`);

    // 3. Handle General Vocabulary and Spelling
    // Flip dictionary for British to American
    const currentDict = locale === 'american-to-british' ? dict : this.reverseDict(dict);
    
    // Sort keys by length descending to match longer phrases first (e.g., "bus stop" before "bus")
    const sortedKeys = Object.keys(currentDict).sort((a, b) => b.length - a.length);

    sortedKeys.forEach(key => {
      const regex = new RegExp(`(?<=^|[\\s\\.,!\\?])(${key})(?=[\\s\\.,!\\?]|$)`, 'gi');
      translated = translated.replace(regex, (match) => {
        return `<span class="highlight">${currentDict[key]}</span>`;
      });
    });

    return translated === text ? "Everything looks good to me!" : translated;
  }

  reverseDict(obj) {
    return Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));
  }
}

module.exports = Translator;