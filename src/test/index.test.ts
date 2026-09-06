// Tests for honocoroko package
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko, transliterate } from '../index.js';
import {
  toHonocorokoFixtures,
  workingRoundTrip,
  brokenRoundTrip,
} from './fixtures.js';

describe('honocoroko', () => {
  describe('toHonocoroko fixtures', () => {
    for (const { latin, javanese } of toHonocorokoFixtures) {
      it(`"${latin}" → exact Javanese`, () => {
        assert.strictEqual(toHonocoroko(latin), javanese);
      });
    }
  });

  describe('toHonocoroko extras', () => {
    it('inserts pangkon between k and s in bakso', () => {
      const result = toHonocoroko('bakso');
      assert.ok(result.includes('꧀'));
      assert.strictEqual(result, 'ꦧꦏ꧀ꦱꦺꦴ');
    });

    it('preserves special characters by default', () => {
      assert.strictEqual(toHonocoroko('hana?'), 'ꦲꦤ?');
      assert.strictEqual(toHonocoroko('cara!'), 'ꦕꦫ!');
      assert.ok(toHonocoroko('hello? world!').includes('?'));
      assert.ok(toHonocoroko('hello? world!').includes('!'));
    });

    it('still returns a string when convertSpecialChars is true', () => {
      const options = { convertSpecialChars: true };
      assert.strictEqual(typeof toHonocoroko('test?', options), 'string');
      assert.strictEqual(typeof toHonocoroko('email@domain', options), 'string');
    });
  });

  describe('strict option and silence', () => {
    function captureWarns(fn: () => void): string[] {
      const warns: string[] = [];
      const original = console.warn;
      console.warn = (...args: unknown[]) => {
        warns.push(args.map(String).join(' '));
      };
      try {
        fn();
      } finally {
        console.warn = original;
      }
      return warns;
    }

    it('does not call console.warn for hello?', () => {
      const warns = captureWarns(() => {
        toHonocoroko('hello?');
      });
      assert.deepStrictEqual(warns, []);
    });

    it('does not call console.warn for unmapped chars in default mode', () => {
      const warns = captureWarns(() => {
        toHonocoroko('test?', { convertSpecialChars: true });
        fromHonocoroko('ꦲꦤ!');
      });
      assert.deepStrictEqual(warns, []);
    });

    it('keeps unmapped characters when strict is false', () => {
      assert.ok(toHonocoroko('apa§', { convertSpecialChars: true }).includes('§'));
    });

    it('throws in strict mode for an unmapped character', () => {
      assert.throws(
        () => toHonocoroko('apa§', { convertSpecialChars: true, strict: true }),
        /No mapping found for character: § \(U\+00A7\)/
      );
      assert.throws(
        () => fromHonocoroko('ꦲ§', { convertSpecialChars: true, strict: true }),
        /No mapping found for character: §/
      );
    });

    it('does not throw in strict mode for preserved special chars', () => {
      assert.strictEqual(toHonocoroko('hana?', { strict: true }), 'ꦲꦤ?');
    });
  });

  describe('fromHonocoroko', () => {
    it('maps basic aksara back to Latin CV syllables', () => {
      assert.strictEqual(fromHonocoroko('ꦲ'), 'ha');
      assert.strictEqual(fromHonocoroko('ꦤ'), 'na');
      assert.strictEqual(fromHonocoroko('ꦕ'), 'ca');
      assert.strictEqual(fromHonocoroko('ꦫ'), 'ra');
      assert.strictEqual(fromHonocoroko('ꦏ'), 'ka');
    });

    it('maps Javanese numbers back to Latin', () => {
      assert.strictEqual(fromHonocoroko('꧐'), '0');
      assert.strictEqual(fromHonocoroko('꧑'), '1');
      assert.strictEqual(fromHonocoroko('꧑꧒꧓'), '123');
    });

    it('handles empty string and spaces', () => {
      assert.strictEqual(fromHonocoroko(''), '');
      assert.ok(fromHonocoroko('ꦲ ꦤ ꦕ').includes(' '));
    });

    it('preserves special characters by default', () => {
      assert.strictEqual(fromHonocoroko('ꦲꦤ?'), 'hana?');
      assert.strictEqual(fromHonocoroko('ꦕꦫ!'), 'cara!');
      assert.strictEqual(fromHonocoroko('ꦲ@ꦧ'), 'ha@ba');
    });
  });

  describe('transliterate', () => {
    it('matches toHonocoroko / fromHonocoroko', () => {
      assert.strictEqual(transliterate('hana', 'toHonocoroko'), toHonocoroko('hana'));
      assert.strictEqual(transliterate('ꦲꦤ', 'fromHonocoroko'), fromHonocoroko('ꦲꦤ'));
    });

    it('accepts convertSpecialChars in both directions', () => {
      const options = { convertSpecialChars: true };
      assert.strictEqual(typeof transliterate('hana?', 'toHonocoroko', options), 'string');
      assert.strictEqual(typeof transliterate('ꦲꦤ!', 'fromHonocoroko', options), 'string');
    });
  });

  describe('round-trip transliteration (working in 1.2.x)', () => {
    for (const original of workingRoundTrip) {
      it(`round-trips "${original}"`, () => {
        assert.strictEqual(fromHonocoroko(toHonocoroko(original)), original);
      });
    }
  });

  describe('round-trip transliteration (blocked by #9)', () => {
    for (const { latin, reason } of brokenRoundTrip) {
      it.skip(`round-trips "${latin}" — ${reason}`, () => {
        assert.strictEqual(fromHonocoroko(toHonocoroko(latin)), latin);
      });
    }
  });
});
