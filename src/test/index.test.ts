// Tests for honocoroko package
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko, transliterate } from '../index.js';

describe('honocoroko', () => {
  describe('toHonocoroko', () => {
    it('should transliterate basic consonants', () => {
      assert.strictEqual(toHonocoroko('ha'), 'ꦲ');
      assert.strictEqual(toHonocoroko('na'), 'ꦤ');
      assert.strictEqual(toHonocoroko('ca'), 'ꦕ');
      assert.strictEqual(toHonocoroko('ra'), 'ꦫ');
      assert.strictEqual(toHonocoroko('ka'), 'ꦏ');
    });

    it('should transliterate numbers', () => {
      assert.strictEqual(toHonocoroko('0'), '꧐');
      assert.strictEqual(toHonocoroko('1'), '꧑');
      assert.strictEqual(toHonocoroko('123'), '꧑꧒꧓');
      assert.strictEqual(toHonocoroko('9876543210'), '꧙꧘꧗꧖꧕꧔꧓꧒꧑꧐');
    });

    it('should transliterate punctuation', () => {
      assert.strictEqual(toHonocoroko(','), '꧈');
      assert.strictEqual(toHonocoroko('.'), '꧉');
      assert.strictEqual(toHonocoroko(':'), '꧇');
    });

    it('should handle mixed text', () => {
      const result = toHonocoroko('hana 123');
      assert.ok(result.includes('ꦲ'));
      assert.ok(result.includes('ꦤ'));
      assert.ok(result.includes('꧑꧒꧓'));
    });

    it('should preserve spaces', () => {
      const result = toHonocoroko('ha na ca ra');
      assert.ok(result.includes(' '));
    });

    it('should handle empty string', () => {
      assert.strictEqual(toHonocoroko(''), '');
    });

    it('should use phonetic approximations', () => {
      assert.strictEqual(toHonocoroko('f'), 'ꦥ꦳');
      assert.strictEqual(toHonocoroko('v'), 'ꦮ꦳');
      assert.strictEqual(toHonocoroko('z'), 'ꦗ꦳');
    });
  });

  describe('fromHonocoroko', () => {
    it('should transliterate Javanese consonants back to Latin', () => {
      assert.strictEqual(fromHonocoroko('ꦲ'), 'ha');
      assert.strictEqual(fromHonocoroko('ꦤ'), 'na');
      assert.strictEqual(fromHonocoroko('ꦕ'), 'ca');
      assert.strictEqual(fromHonocoroko('ꦫ'), 'ra');
      assert.strictEqual(fromHonocoroko('ꦏ'), 'ka');
    });

    it('should transliterate Javanese numbers back to Latin', () => {
      assert.strictEqual(fromHonocoroko('꧐'), '0');
      assert.strictEqual(fromHonocoroko('꧑'), '1');
      assert.strictEqual(fromHonocoroko('꧑꧒꧓'), '123');
    });

    it('should handle empty string', () => {
      assert.strictEqual(fromHonocoroko(''), '');
    });

    it('should preserve spaces', () => {
      const javanese = 'ꦲ ꦤ ꦕ';
      const result = fromHonocoroko(javanese);
      assert.ok(result.includes(' '));
    });
  });

  describe('transliterate', () => {
    it('should work with toHonocoroko direction', () => {
      const result = transliterate('hana', 'toHonocoroko');
      assert.strictEqual(result, toHonocoroko('hana'));
    });

    it('should work with fromHonocoroko direction', () => {
      const javanese = 'ꦲꦤ';
      const result = transliterate(javanese, 'fromHonocoroko');
      assert.strictEqual(result, fromHonocoroko(javanese));
    });
  });

  describe('round-trip transliteration', () => {
    it('should preserve text in round-trip for basic consonants', () => {
      const original = 'hanacara';
      const javanese = toHonocoroko(original);
      const backToLatin = fromHonocoroko(javanese);
      assert.strictEqual(backToLatin, original);
    });

    it('should preserve numbers in round-trip', () => {
      const original = '1234567890';
      const javanese = toHonocoroko(original);
      const backToLatin = fromHonocoroko(javanese);
      assert.strictEqual(backToLatin, original);
    });
  });
});