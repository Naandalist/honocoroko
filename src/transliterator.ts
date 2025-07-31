// Main transliteration functions
import { TransliterationDirection } from './types.js';
import {
  allMappings,
  createReverseMappings,
  consonants,
  vowels,
  numbers,
  punctuation,
  phoneticApproximations,
} from './mappings.js';

// Create reverse mapping for fromHonocoroko
const reverseMapping = createReverseMappings(allMappings);

// Helper to check if a character is a consonant
function isConsonant(char: string): boolean {
  return consonants.some(c => c.latin === char || c.latin === char + 'a') || 
         /^[bcdfghjklmnpqrstvwxyz]$/i.test(char);
}

// Helper to check if a character is a vowel
function isVowel(char: string): boolean {
  return ['a', 'i', 'u', 'e', 'é', 'o'].includes(char.toLowerCase());
}

// Helper to get vowel mark (sandhangan)
function getVowelMark(vowel: string): string {
  const marks: Record<string, string> = {
    'i': 'ꦶ',     // wulu
    'u': 'ꦸ',     // suku
    'é': 'ꦺ',     // taling
    'e': 'ꦼ',     // pepet
    'o': 'ꦺꦴ',   // taling + tarung
  };
  return marks[vowel.toLowerCase()] || '';
}

/**
 * Transliterates Latin text to Javanese script (Honocoroko/Hanacaraka)
 * @param text - The Latin text to transliterate
 * @returns The transliterated Javanese text
 */
export function toHonocoroko(text: string): string {
  if (!text) return '';
  
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    const char = text[i];
    
    // Handle whitespace
    if (/\s/.test(char)) {
      result += char;
      i++;
      continue;
    }
    
    // Handle numbers
    const numberMapping = numbers.find(n => n.latin === char);
    if (numberMapping) {
      result += numberMapping.javanese;
      i++;
      continue;
    }
    
    // Handle punctuation
    const punctMapping = punctuation.find(p => p.latin === char);
    if (punctMapping) {
      result += punctMapping.javanese;
      i++;
      continue;
    }
    
    // Handle consonant clusters (nga, nya, dha, tha)
    if (i + 2 < text.length) {
      const threeChar = text.substr(i, 3);
      const mapping = consonants.find(c => c.latin === threeChar);
      if (mapping) {
        result += mapping.javanese;
        i += 3;
        continue;
      }
    }
    
    // Handle two-character consonants (ka, ba, etc.) or consonant + vowel
    if (i + 1 < text.length) {
      const twoChar = text.substr(i, 2);
      const consonantMapping = consonants.find(c => c.latin === twoChar);
      
      if (consonantMapping) {
        result += consonantMapping.javanese;
        i += 2;
        continue;
      }
      
      // Check if it's consonant + vowel
      const nextChar = text[i + 1];
      if (isVowel(nextChar)) {
        // First try to find the consonant with 'a' appended
        const consonantWithA = consonants.find(c => c.latin === char + 'a');
        if (consonantWithA) {
          result += consonantWithA.javanese;
          if (nextChar !== 'a') {
            result += getVowelMark(nextChar);
          }
          i += 2;
          continue;
        }
        
        // Fallback to single consonant
        const consonantOnly = consonants.find(c => c.latin === char);
        if (consonantOnly) {
          result += consonantOnly.javanese;
          if (nextChar !== 'a') {
            result += getVowelMark(nextChar);
          }
          i += 2;
          continue;
        }
      }
    }
    
    // Handle single character consonants
    const consonantWithA = consonants.find(c => c.latin === char + 'a');
    if (consonantWithA) {
      result += consonantWithA.javanese;
      // Add pangkon if followed by another consonant
      if (i + 1 < text.length && isConsonant(text[i + 1])) {
        result += '꧀'; // pangkon
      }
      i++;
      continue;
    }
    
    const singleConsonant = consonants.find(c => c.latin === char);
    if (singleConsonant) {
      result += singleConsonant.javanese;
      // Add pangkon if followed by another consonant
      if (i + 1 < text.length && isConsonant(text[i + 1])) {
        result += '꧀'; // pangkon
      }
      i++;
      continue;
    }
    
    // Handle standalone vowels
    const vowelMapping = vowels.find(v => v.latin === char);
    if (vowelMapping) {
      result += vowelMapping.javanese;
      i++;
      continue;
    }
    
    // Handle phonetic approximations
    const approx = phoneticApproximations.find(p => p.latin.toLowerCase() === char.toLowerCase());
    if (approx) {
      result += approx.javanese;
      i++;
      continue;
    }
    
    // If no match found, keep as-is
    console.warn(`No mapping found for character: ${char}`);
    result += char;
    i++;
  }
  
  return result;
}

/**
 * Transliterates Javanese script (Honocoroko/Hanacaraka) to Latin text
 * @param text - The Javanese text to transliterate
 * @returns The transliterated Latin text
 */
export function fromHonocoroko(text: string): string {
  if (!text) return '';
  
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    let matched = false;
    
    // Try to match longer sequences first (some Javanese characters are multi-codepoint)
    for (let len = 4; len >= 1; len--) {
      if (i + len <= text.length) {
        const substr = text.substr(i, len);
        
        if (reverseMapping.has(substr)) {
          result += reverseMapping.get(substr)!;
          i += len;
          matched = true;
          break;
        }
      }
    }
    
    // If no match found, keep the character as-is
    if (!matched) {
      const char = text[i];
      if (/\s/.test(char)) {
        result += char;
      } else {
        console.warn(`No reverse mapping found for character: ${char} (U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`);
        result += char;
      }
      i++;
    }
  }
  
  return result;
}

/**
 * Generic transliteration function that can go either direction
 * @param text - The text to transliterate
 * @param direction - The direction of transliteration
 * @returns The transliterated text
 */
export function transliterate(text: string, direction: TransliterationDirection): string {
  if (direction === 'toHonocoroko') {
    return toHonocoroko(text);
  } else {
    return fromHonocoroko(text);
  }
}