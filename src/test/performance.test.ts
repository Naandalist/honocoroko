// Performance benchmarks for honocoroko
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { toHonocoroko, fromHonocoroko } from '../index.js';

describe('performance benchmarks', () => {
  // Generate test data
  const shortText = 'hanacaraka datasawala padhajayanya magabathanga';
  const mediumText = shortText.repeat(10); // ~500 chars
  const longText = shortText.repeat(100); // ~5000 chars
  
  it('should transliterate short text efficiently', () => {
    const iterations = 1000;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      toHonocoroko(shortText);
    }
    
    const end = performance.now();
    const duration = end - start;
    const avgTime = duration / iterations;
    
    console.log(`Short text (${shortText.length} chars): ${avgTime.toFixed(3)}ms per iteration`);
    console.log(`Total: ${duration.toFixed(2)}ms for ${iterations} iterations`);
    
    // Should complete in reasonable time (< 1 second total for 1000 iterations)
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });
  
  it('should transliterate medium text efficiently', () => {
    const iterations = 100;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      toHonocoroko(mediumText);
    }
    
    const end = performance.now();
    const duration = end - start;
    const avgTime = duration / iterations;
    
    console.log(`Medium text (${mediumText.length} chars): ${avgTime.toFixed(3)}ms per iteration`);
    console.log(`Total: ${duration.toFixed(2)}ms for ${iterations} iterations`);
    
    // Should complete in reasonable time (< 1 second total for 100 iterations)
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });
  
  it('should transliterate long text efficiently', () => {
    const iterations = 10;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      toHonocoroko(longText);
    }
    
    const end = performance.now();
    const duration = end - start;
    const avgTime = duration / iterations;
    
    console.log(`Long text (${longText.length} chars): ${avgTime.toFixed(3)}ms per iteration`);
    console.log(`Total: ${duration.toFixed(2)}ms for ${iterations} iterations`);
    
    // Should complete in reasonable time (< 1 second total for 10 iterations)
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });
  
  it('should reverse transliterate efficiently', () => {
    const javaneseText = toHonocoroko(mediumText);
    const iterations = 100;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      fromHonocoroko(javaneseText);
    }
    
    const end = performance.now();
    const duration = end - start;
    const avgTime = duration / iterations;
    
    console.log(`Reverse transliteration (${javaneseText.length} chars): ${avgTime.toFixed(3)}ms per iteration`);
    console.log(`Total: ${duration.toFixed(2)}ms for ${iterations} iterations`);
    
    // Should complete in reasonable time (< 1 second total for 100 iterations)
    assert.ok(duration < 1000, `Performance too slow: ${duration}ms`);
  });
  
  it('should handle mixed content with numbers and punctuation efficiently', () => {
    const mixedText = 'hana 123, cara 456. data 789: sawala!';
    const iterations = 1000;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      toHonocoroko(mixedText);
    }
    
    const end = performance.now();
    const duration = end - start;
    const avgTime = duration / iterations;
    
    console.log(`Mixed content (${mixedText.length} chars): ${avgTime.toFixed(3)}ms per iteration`);
    console.log(`Total: ${duration.toFixed(2)}ms for ${iterations} iterations`);
    
    // Should complete in reasonable time (< 500ms total for 1000 iterations)
    assert.ok(duration < 500, `Performance too slow: ${duration}ms`);
  });
  
  it('should scale linearly with input size', () => {
    const baseText = 'hanacara';
    const timings: number[] = [];
    
    // Test with different sizes
    for (const multiplier of [1, 10, 100]) {
      const testText = baseText.repeat(multiplier);
      const iterations = Math.max(1, Math.floor(100 / multiplier)); // Fewer iterations for larger texts
      
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        toHonocoroko(testText);
      }
      const end = performance.now();
      
      const avgTime = (end - start) / iterations;
      timings.push(avgTime);
      
      console.log(`Size ${testText.length} chars: ${avgTime.toFixed(3)}ms per iteration`);
    }
    
    // Check that performance scales roughly linearly
    // The ratio should be roughly proportional to the size increase
    const ratio1 = timings[1] / timings[0]; // 10x size
    const ratio2 = timings[2] / timings[1]; // 10x size
    
    console.log(`Scaling ratios: ${ratio1.toFixed(2)}x, ${ratio2.toFixed(2)}x`);
    
    // Allow some variance but should be roughly linear (< 20x for 10x input)
    assert.ok(ratio1 < 20, `Scaling not linear: ${ratio1}x for 10x input`);
    assert.ok(ratio2 < 20, `Scaling not linear: ${ratio2}x for 10x input`);
  });
});
