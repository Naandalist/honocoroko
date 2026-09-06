// Performance checks for honocoroko. Still run in CI.
// Shared runners are noisy, so scale tests use a warmup + larger samples.
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko } from '../index.js';

function timeAverage(fn: () => void, iterations: number): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  return (performance.now() - start) / iterations;
}

describe('performance benchmarks', () => {
  const shortText = 'hanacaraka datasawala padhajayanya magabathanga';
  const mediumText = shortText.repeat(10);
  const longText = shortText.repeat(100);

  it('should transliterate short text efficiently', () => {
    const duration = timeAverage(() => {
      toHonocoroko(shortText);
    }, 1000) * 1000;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should transliterate medium text efficiently', () => {
    const duration = timeAverage(() => {
      toHonocoroko(mediumText);
    }, 100) * 100;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should transliterate long text efficiently', () => {
    const duration = timeAverage(() => {
      toHonocoroko(longText);
    }, 10) * 10;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should reverse transliterate efficiently', () => {
    const javaneseText = toHonocoroko(mediumText);
    const duration = timeAverage(() => {
      fromHonocoroko(javaneseText);
    }, 100) * 100;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should handle mixed content with numbers and punctuation efficiently', () => {
    const mixedText = 'hana 123, cara 456. data 789: sawala!';
    const duration = timeAverage(() => {
      toHonocoroko(mixedText);
    }, 1000) * 1000;
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });

  it('should scale roughly linearly with input size', () => {
    // Use a chunk large enough that timer noise does not dominate the 1x sample.
    const baseText = shortText.repeat(20);
    const small = baseText;
    const large = baseText.repeat(10);

    // Warmup so JIT / maps are hot before we measure.
    toHonocoroko(small);
    toHonocoroko(large);
    toHonocoroko(small);
    toHonocoroko(large);

    const smallMs = timeAverage(() => {
      toHonocoroko(small);
    }, 30);
    const largeMs = timeAverage(() => {
      toHonocoroko(large);
    }, 10);

    const ratio = largeMs / smallMs;
    assert.ok(
      ratio < 25,
      `Scaling not linear: ${ratio.toFixed(2)}x time for 10x input (small=${smallMs.toFixed(3)}ms large=${largeMs.toFixed(3)}ms)`
    );
  });
});
