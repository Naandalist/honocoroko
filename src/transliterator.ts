// Main transliteration functions
import { TransliterationDirection, TransliterationOptions } from './types.js';
import {
  allMappings,
  createReverseMappings,
  createConsonantMap,
  createVowelMap,
  createNumberMap,
  createPunctuationMap,
  createPhoneticMap,
} from './mappings.js';

// Create reverse mapping for fromHonocoroko
const reverseMapping = createReverseMappings(allMappings);

// Create Map-based lookups for O(1) performance
const consonantMap = createConsonantMap();
const vowelMap = createVowelMap();
const numberMap = createNumberMap();
const punctuationMap = createPunctuationMap();
const phoneticMap = createPhoneticMap();

// Pre-compile regex patterns for better performance
const WHITESPACE_REGEX = /\s/;
const CONSONANT_REGEX = /^[bcdfghjklmnpqrstvwxyz]$/i;
const VOWEL_SET = new Set(['a', 'i', 'u', 'e', 'é', 'o']);

// Default characters to preserve (not convert to Hanacaraka)
// Excludes characters that already have proper Javanese equivalents
const DEFAULT_PRESERVE_CHARS = new Set([
  '?', '!', '@', '#', '$', '%', '^', '&', '*', 
  '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\', 
  ';', "'", '<', '>', '/', '`', '~'
]);

// Helper to check if a character is a consonant
function isConsonant(char: string): boolean {
  return consonantMap.has(char.toLowerCase()) || 
         consonantMap.has(char.toLowerCase() + 'a') || 
         CONSONANT_REGEX.test(char);
}

// Helper to check if a character is a vowel
function isVowel(char: string): boolean {
  return VOWEL_SET.has(char.toLowerCase());
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
 * @param options - Optional transliteration options
 * @returns The transliterated Javanese text
 */
export function toHonocoroko(text: string, options?: TransliterationOptions): string {
  if (!text) return '';
  
  const convertSpecialChars = options?.convertSpecialChars ?? false;
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    const char = text[i];
    
    // Check if this character should be preserved unchanged (default behavior)
    if (!convertSpecialChars && DEFAULT_PRESERVE_CHARS.has(char)) {
      result += char;
      i++;
      continue;
    }
    
    // Handle whitespace
    if (WHITESPACE_REGEX.test(char)) {
      result += char;
      i++;
      continue;
    }
    
    // Handle numbers - use Map for O(1) lookup
    const numberJavanese = numberMap.get(char);
    if (numberJavanese) {
      result += numberJavanese;
      i++;
      continue;
    }
    
    // Handle punctuation - use Map for O(1) lookup
    const punctJavanese = punctuationMap.get(char);
    if (punctJavanese) {
      result += punctJavanese;
      i++;
      continue;
    }
    
    // Handle consonant clusters (nga, nya, dha, tha)
    if (i + 2 < text.length) {
      const threeChar = text.slice(i, i + 3);
      const mapping = consonantMap.get(threeChar.toLowerCase());
      if (mapping) {
        result += mapping;
        i += 3;
        continue;
      }
    }
    
    // Handle two-character consonants (ka, ba, etc.) or consonant + vowel
    if (i + 1 < text.length) {
      const twoChar = text.slice(i, i + 2);
      const consonantJavanese = consonantMap.get(twoChar.toLowerCase());
      
      if (consonantJavanese) {
        result += consonantJavanese;
        i += 2;
        continue;
      }
      
      // Check if it's consonant + vowel
      const nextChar = text[i + 1];
      if (isVowel(nextChar)) {
        // First try to find the consonant with 'a' appended
        const consonantWithA = consonantMap.get((char + 'a').toLowerCase());
        if (consonantWithA) {
          result += consonantWithA;
          if (nextChar !== 'a') {
            result += getVowelMark(nextChar);
          }
          i += 2;
          continue;
        }
        
        // Fallback to single consonant
        const consonantOnly = consonantMap.get(char.toLowerCase());
        if (consonantOnly) {
          result += consonantOnly;
          if (nextChar !== 'a') {
            result += getVowelMark(nextChar);
          }
          i += 2;
          continue;
        }
      }
    }
    
    // Handle single character consonants
    const consonantWithA = consonantMap.get((char + 'a').toLowerCase());
    if (consonantWithA) {
      result += consonantWithA;
      // Add pangkon if followed by another consonant
      if (i + 1 < text.length && isConsonant(text[i + 1])) {
        result += '꧀'; // pangkon
      }
      i++;
      continue;
    }
    
    const singleConsonant = consonantMap.get(char.toLowerCase());
    if (singleConsonant) {
      result += singleConsonant;
      // Add pangkon if followed by another consonant
      if (i + 1 < text.length && isConsonant(text[i + 1])) {
        result += '꧀'; // pangkon
      }
      i++;
      continue;
    }
    
    // Handle standalone vowels - use Map for O(1) lookup
    const vowelJavanese = vowelMap.get(char.toLowerCase());
    if (vowelJavanese) {
      result += vowelJavanese;
      i++;
      continue;
    }
    
    // Handle phonetic approximations - use Map for O(1) lookup
    const phoneticJavanese = phoneticMap.get(char.toLowerCase());
    if (phoneticJavanese) {
      result += phoneticJavanese;
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
 * @param options - Optional transliteration options
 * @returns The transliterated Latin text
 */
export function fromHonocoroko(text: string, options?: TransliterationOptions): string {
  if (!text) return '';
  
  const convertSpecialChars = options?.convertSpecialChars ?? false;
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    const char = text[i];
    
    // Check if this character should be preserved unchanged (default behavior)
    if (!convertSpecialChars && DEFAULT_PRESERVE_CHARS.has(char)) {
      result += char;
      i++;
      continue;
    }
    
    let matched = false;
    
    // Try to match longer sequences first (some Javanese characters are multi-codepoint)
    for (let len = 4; len >= 1; len--) {
      if (i + len <= text.length) {
        const substr = text.slice(i, i + len);
        
        const latinChar = reverseMapping.get(substr);
        if (latinChar) {
          result += latinChar;
          i += len;
          matched = true;
          break;
        }
      }
    }
    
    // If no match found, keep the character as-is
    if (!matched) {
      const char = text[i];
      if (WHITESPACE_REGEX.test(char)) {
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
 * @param options - Optional transliteration options
 * @returns The transliterated text
 */
export function transliterate(text: string, direction: TransliterationDirection, options?: TransliterationOptions): string {
  if (direction === 'toHonocoroko') {
    return toHonocoroko(text, options);
  } else {
    return fromHonocoroko(text, options);
  }
}