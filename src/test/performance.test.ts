// Performance benchmarks for honocoroko
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
    assert.ok(duration < 500, `Performance too slow: ${duration}ms`);
  });

  it('should scale linearly with input size', () => {
    const baseText = 'hanacara';
    const timings: number[] = [];

    for (const multiplier of [1, 10, 100]) {
      const testText = baseText.repeat(multiplier);
      const iterations = Math.max(1, Math.floor(100 / multiplier));

      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        toHonocoroko(testText);
      }
      timings.push((performance.now() - start) / iterations);
    }

    const ratio1 = timings[1] / timings[0];
    const ratio2 = timings[2] / timings[1];

    assert.ok(ratio1 < 20, `Scaling not linear: ${ratio1}x for 10x input`);
    assert.ok(ratio2 < 20, `Scaling not linear: ${ratio2}x for 10x input`);
  });
});
