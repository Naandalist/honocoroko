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

const reverseMapping = createReverseMappings(allMappings);
const consonantMap = createConsonantMap();
const vowelMap = createVowelMap();
const numberMap = createNumberMap();
const punctuationMap = createPunctuationMap();
const phoneticMap = createPhoneticMap();

const WHITESPACE_REGEX = /\s/;
const CONSONANT_REGEX = /^[bcdfghjklmnpqrstvwxyz]$/i;
const VOWEL_SET = new Set(['a', 'i', 'u', 'e', 'é', 'o']);

const DEFAULT_PRESERVE_CHARS = new Set([
  '?', '!', '@', '#', '$', '%', '^', '&', '*',
  '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\',
  ';', "'", '<', '>', '/', '`', '~'
]);

function isConsonant(char: string): boolean {
  return consonantMap.has(char.toLowerCase()) ||
         consonantMap.has(char.toLowerCase() + 'a') ||
         CONSONANT_REGEX.test(char);
}

function isVowel(char: string): boolean {
  return VOWEL_SET.has(char.toLowerCase());
}

const VOWEL_MARKS: Record<string, string> = {
  'i': 'ꦶ',
  'u': 'ꦸ',
  'é': 'ꦺ',
  'e': 'ꦼ',
  'o': 'ꦺꦴ',
};

function getVowelMark(vowel: string): string {
  return VOWEL_MARKS[vowel.toLowerCase()] || '';
}

function codePointLabel(char: string): string {
  const cp = char.codePointAt(0) ?? 0;
  return `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
}

function handleUnmapped(char: string, strict: boolean): string {
  if (strict) {
    throw new Error(`No mapping found for character: ${char} (${codePointLabel(char)})`);
  }
  return char;
}

export function toHonocoroko(text: string, options?: TransliterationOptions): string {
  if (!text) return '';

  const convertSpecialChars = options?.convertSpecialChars ?? false;
  const strict = options?.strict ?? false;
  let result = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (!convertSpecialChars && DEFAULT_PRESERVE_CHARS.has(char)) {
      result += char;
      i++;
      continue;
    }

    if (WHITESPACE_REGEX.test(char)) {
      result += char;
      i++;
      continue;
    }

    const numberJavanese = numberMap.get(char);
    if (numberJavanese) {
      result += numberJavanese;
      i++;
      continue;
    }

    const punctJavanese = punctuationMap.get(char);
    if (punctJavanese) {
      result += punctJavanese;
      i++;
      continue;
    }

    if (i + 2 < text.length) {
      const threeChar = text.slice(i, i + 3);
      const mapping = consonantMap.get(threeChar.toLowerCase());
      if (mapping) {
        result += mapping;
        i += 3;
        continue;
      }
    }

    if (i + 1 < text.length) {
      const twoChar = text.slice(i, i + 2);
      const consonantJavanese = consonantMap.get(twoChar.toLowerCase());

      if (consonantJavanese) {
        result += consonantJavanese;
        i += 2;
        continue;
      }

      const nextChar = text[i + 1];
      if (isVowel(nextChar)) {
        const consonantWithA = consonantMap.get((char + 'a').toLowerCase());
        if (consonantWithA) {
          result += consonantWithA;
          if (nextChar !== 'a') {
            result += getVowelMark(nextChar);
          }
          i += 2;
          continue;
        }

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

    const consonantWithA = consonantMap.get((char + 'a').toLowerCase());
    if (consonantWithA) {
      result += consonantWithA;
      if (i + 1 < text.length && isConsonant(text[i + 1])) {
        result += '꧀';
      }
      i++;
      continue;
    }

    const singleConsonant = consonantMap.get(char.toLowerCase());
    if (singleConsonant) {
      result += singleConsonant;
      if (i + 1 < text.length && isConsonant(text[i + 1])) {
        result += '꧀';
      }
      i++;
      continue;
    }

    const vowelJavanese = vowelMap.get(char.toLowerCase());
    if (vowelJavanese) {
      result += vowelJavanese;
      i++;
      continue;
    }

    const phoneticJavanese = phoneticMap.get(char.toLowerCase());
    if (phoneticJavanese) {
      result += phoneticJavanese;
      i++;
      continue;
    }

    result += handleUnmapped(char, strict);
    i++;
  }

  return result;
}

export function fromHonocoroko(text: string, options?: TransliterationOptions): string {
  if (!text) return '';

  const convertSpecialChars = options?.convertSpecialChars ?? false;
  const strict = options?.strict ?? false;
  let result = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (!convertSpecialChars && DEFAULT_PRESERVE_CHARS.has(char)) {
      result += char;
      i++;
      continue;
    }

    let matched = false;

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

    if (!matched) {
      const current = text[i];
      if (WHITESPACE_REGEX.test(current)) {
        result += current;
      } else {
        result += handleUnmapped(current, strict);
      }
      i++;
    }
  }

  return result;
}

export function transliterate(text: string, direction: TransliterationDirection, options?: TransliterationOptions): string {
  if (direction === 'toHonocoroko') {
    return toHonocoroko(text, options);
  }
  return fromHonocoroko(text, options);
}
