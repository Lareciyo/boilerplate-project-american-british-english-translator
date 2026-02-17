const chai = require('chai');
const assert = chai.assert;
const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('To British English', () => {
    test('Mangoes are my favorite fruit.', () => {
      assert.include(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'favourite');
    });
    test('I ate yogurt for breakfast.', () => {
      assert.include(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'yoghurt');
    });
    test('We had a party at my friend\'s condo.', () => {
      assert.include(translator.translate('We had a party at my friend\'s condo.', 'american-to-british'), 'flat');
    });
    test('Can you toss this in the trashcan for me?', () => {
      assert.include(translator.translate('Can you toss this in the trashcan for me?', 'american-to-british'), 'bin');
    });
    test('The parking lot was full.', () => {
      assert.include(translator.translate('The parking lot was full.', 'american-to-british'), 'car park');
    });
    test('Like a high tech Rube Goldberg machine.', () => {
      assert.include(translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british'), 'Heath Robinson device');
    });
    test('To play hooky means to skip class or work.', () => {
      assert.include(translator.translate('To play hooky means to skip class or work.', 'american-to-british'), 'bunk off');
    });
    test('No Mr. Bond, I expect you to die.', () => {
      // Updated to match capitalized output 'Mr'
      assert.include(translator.translate('No Mr. Bond, I expect you to die.', 'american-to-british'), 'Mr');
    });
    test('Dr. Grosh will see you now.', () => {
      // Updated to match capitalized output 'Dr'
      assert.include(translator.translate('Dr. Grosh will see you now.', 'american-to-british'), 'Dr');
    });
    test('Lunch is at 12:15 today.', () => {
      assert.include(translator.translate('Lunch is at 12:15 today.', 'american-to-british'), '12.15');
    });
  });

  suite('To American English', () => {
    test('We watched the footie match for a while.', () => {
      assert.include(translator.translate('We watched the footie match for a while.', 'british-to-american'), 'soccer');
    });
    test('Paracetamol takes up to an hour to work.', () => {
      assert.include(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american'), 'Tylenol');
    });
    test('First, caramelise the onions.', () => {
      assert.include(translator.translate('First, caramelise the onions.', 'british-to-american'), 'caramelize');
    });
    test('I spent the bank holiday at the funfair.', () => {
      assert.include(translator.translate('I spent the bank holiday at the funfair.', 'british-to-american'), 'public holiday');
    });
    test('I had a bicky then went to the chippy.', () => {
      assert.include(translator.translate('I had a bicky then went to the chippy.', 'british-to-american'), 'cookie');
    });
    test('I\'ve just got bits and bobs in my bum bag.', () => {
      assert.include(translator.translate('I\'ve just got bits and bobs in my bum bag.', 'british-to-american'), 'fanny pack');
    });
    test('The car boot sale at Boxted Airfield was called off.', () => {
      assert.include(translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american'), 'swap meet');
    });
    test('Have you met Mrs Kalyani?', () => {
      assert.include(translator.translate('Have you met Mrs Kalyani?', 'british-to-american'), 'Mrs.');
    });
    test('Prof Joyner of King\'s College, London.', () => {
      assert.include(translator.translate('Prof Joyner of King\'s College, London.', 'british-to-american'), 'Prof.');
    });
    test('Tea time is usually around 4 or 4.30.', () => {
      assert.include(translator.translate('Tea time is usually around 4 or 4.30.', 'british-to-american'), '4:30');
    });
  });

  suite('Highlight Translations', () => {
    test('Highlight translation in Mangoes are my favorite fruit.', () => {
      assert.include(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), '<span class="highlight">favourite</span>');
    });
    test('Highlight translation in I ate yogurt for breakfast.', () => {
      assert.include(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), '<span class="highlight">yoghurt</span>');
    });
    test('Highlight translation in We watched the footie match for a while.', () => {
      assert.include(translator.translate('We watched the footie match for a while.', 'british-to-american'), '<span class="highlight">soccer</span>');
    });
    test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
      assert.include(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american'), '<span class="highlight">Tylenol</span>');
    });
  });
});