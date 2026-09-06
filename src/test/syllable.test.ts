// Tests for syllable handling in honocoroko
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko } from '../index.js';

describe('syllable handling', () => {
  it('transliterates "bisa" as ba+wulu+sa', () => {
    assert.strictEqual(toHonocoroko('bisa'), '');
  });

  it('transliterates "biso" as ba+wulu+sa+taling-tarung', () => {
    assert.strictEqual(toHonocoroko('biso'), '');
  });

  it('handles CV combinations', () => {
    const tests = [
      { input: 'ba', expected: '' },
      { input: 'bi', expected: '' },
      { input: 'bu', expected: '' },
      { input: 'be', expected: '' },
      { input: 'bo', expected: '' },
    ];

    for (const { input, expected } of tests) {
      assert.strictEqual(toHonocoroko(input), expected);
    }
  });

  it('inserts pangkon in "bakso"', () => {
    const result = toHonocoroko('bakso');
    assert.ok(result.includes('꧀'));
    assert.strictEqual(result, '꧀');
  });

  it('fromHonocoroko reads bisa / biso / bakso', () => {
    assert.strictEqual(fromHonocoroko(''), 'bisa');
    assert.strictEqual(fromHonocoroko(''), 'biso');
    assert.strictEqual(fromHonocoroko('꧀'), 'bakso');
  });
});
