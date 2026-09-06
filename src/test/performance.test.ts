// Performance smoke tests for honocoroko.
// These are upper-bound checks, not microbenchmarks. Shared CI runners are noisy.
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko } from '../index.js';

describe('performance benchmarks', () => {
  const shortText = 'hanacaraka datasawala padhajayanya magabathanga';
  const mediumText = shortText.repeat(10);
  const longText = shortText.repeat(100);

  it('should transliterate short text efficiently', () => {
    const iterations = 1000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      toHonocoroko(shortText);
    }

    const duration = performance.now() - start;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should transliterate medium text efficiently', () => {
    const iterations = 100;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      toHonocoroko(mediumText);
    }

    const duration = performance.now() - start;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should transliterate long text efficiently', () => {
    const iterations = 10;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      toHonocoroko(longText);
    }

    const duration = performance.now() - start;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should reverse transliterate efficiently', () => {
    const javaneseText = toHonocoroko(mediumText);
    const iterations = 100;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      fromHonocoroko(javaneseText);
    }

    const duration = performance.now() - start;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should handle mixed content with numbers and punctuation efficiently', () => {
    const mixedText = 'hana 123, cara 456. data 789: sawala!';
    const iterations = 1000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      toHonocoroko(mixedText);
    }

    const duration = performance.now() - start;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should finish a 100x input in a bounded time', () => {
    const testText = 'hanacara'.repeat(100);
    const start = performance.now();
    toHonocoroko(testText);
    const duration = performance.now() - start;
    assert.ok(duration < 200, `Large input too slow: ${duration}ms`);
  });
});
