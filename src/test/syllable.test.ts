// Tests for syllable handling in honocoroko
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko } from '../index.js';

describe('syllable handling', () => {
  it('should correctly transliterate "bisa"', () => {
    // bi-sa: ꦧ (ba) + ꦶ (i) + ꦱ (sa)
    const result = toHonocoroko('bisa');
    console.log('bisa:', result);
    assert.ok(result.includes('ꦧ'));
    assert.ok(result.includes('ꦶ'));
    assert.ok(result.includes('ꦱ'));
  });

  it('should correctly transliterate "biso"', () => {
    // bi-so: ꦧ (ba) + ꦶ (i) + ꦱ (sa) + ꦺꦴ (o)
    const result = toHonocoroko('biso');
    console.log('biso:', result);
    assert.ok(result.includes('ꦧ'));
    assert.ok(result.includes('ꦶ'));
    assert.ok(result.includes('ꦱ'));
    assert.ok(result.includes('ꦺꦴ'));
  });

  it('should handle different vowel combinations', () => {
    const tests = [
      { input: 'ba', expected: 'ꦧ' },        // ba (inherent a)
      { input: 'bi', expected: 'ꦧꦶ' },       // ba + i
      { input: 'bu', expected: 'ꦧꦸ' },       // ba + u
      { input: 'be', expected: 'ꦧꦼ' },       // ba + e (pepet)
      { input: 'bo', expected: 'ꦧꦺꦴ' },      // ba + o
    ];

    tests.forEach(({ input, expected }) => {
      const result = toHonocoroko(input);
      console.log(`${input} -> ${result} (expected: ${expected})`);
      assert.strictEqual(result, expected);
    });
  });

  it('should handle consonant clusters', () => {
    // "bakso" should be: ba-k-so
    const result = toHonocoroko('bakso');
    console.log('bakso:', result);
    // Should have pangkon (꧀) between k and s
    assert.ok(result.includes('꧀'));
  });
});