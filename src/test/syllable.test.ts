// Tests for syllable handling in honocoroko
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko } from '../index.js';

describe('syllable handling', () => {
  it('transliterates "bisa" as ba+wulu+sa', () => {
    assert.strictEqual(toHonocoroko('bisa'), 'ꦧꦶꦱ');
  });

  it('transliterates "biso" as ba+wulu+sa+taling-tarung', () => {
    assert.strictEqual(toHonocoroko('biso'), 'ꦧꦶꦱꦺꦴ');
  });

  it('handles CV combinations', () => {
    const tests = [
      { input: 'ba', expected: 'ꦧ' },
      { input: 'bi', expected: 'ꦧꦶ' },
      { input: 'bu', expected: 'ꦧꦸ' },
      { input: 'be', expected: 'ꦧꦼ' },
      { input: 'bo', expected: 'ꦧꦺꦴ' },
    ];

    for (const { input, expected } of tests) {
      assert.strictEqual(toHonocoroko(input), expected);
    }
  });

  it('inserts pangkon in "bakso"', () => {
    const result = toHonocoroko('bakso');
    assert.ok(result.includes('꧀'));
    assert.strictEqual(result, 'ꦧꦏ꧀ꦱꦺꦴ');
  });

  it('fromHonocoroko reads bisa / biso / bakso', () => {
    assert.strictEqual(fromHonocoroko('ꦧꦶꦱ'), 'bisa');
    assert.strictEqual(fromHonocoroko('ꦧꦶꦱꦺꦴ'), 'biso');
    assert.strictEqual(fromHonocoroko('ꦧꦏ꧀ꦱꦺꦴ'), 'bakso');
  });
});
