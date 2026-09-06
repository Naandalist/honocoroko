// Main transliteration functions
import { TransliterationDirection, TransliterationOptions } from './types.js';
import {
  createConsonantMap,
  createVowelMap,
  createNumberMap,
  createPunctuationMap,
  createPhoneticMap,
} from './mappings.js';

const consonantMap = createConsonantMap();
const vowelMap = createVowelMap();
const numberMap = createNumberMap();
const punctuationMap = createPunctuationMap();
const phoneticMap = createPhoneticMap();

const WHITESPACE_REGEX = /\s/;
const CONSONANT_REGEX = /^[bcdfghjklmnpqrstvwxyz]$/i;
const VOWEL_SET = new Set(['a', 'i', 'u', 'e', 'é', 'è', 'o']);

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
  'è': 'ꦺ',
  'e': 'ꦼ',
  'o': 'ꦺꦴ',
};

const CAKRA = 'ꦿ';
const PENGKAL = 'ꦾ';

function getVowelMark(vowel: string): string {
  return VOWEL_MARKS[vowel.toLowerCase()] || '';
}

const MURDA_ONSET: Record<string, string> = {
  N: 'ꦟ',
  K: 'ꦑ',
  T: 'ꦡ',
  S: 'ꦯ',
  P: 'ꦦ',
  G: 'ꦓ',
  B: 'ꦨ',
};

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
  const useMurda = options?.useMurda ?? false;
  const useSwara = options?.useSwara ?? true;
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

    if (useMurda && MURDA_ONSET[char]) {
      const murda = MURDA_ONSET[char];
      const nextChar = text[i + 1];
      if (nextChar !== undefined && isVowel(nextChar)) {
        result += murda;
        if (nextChar.toLowerCase() !== 'a') {
          result += getVowelMark(nextChar);
        }
        i += 2;
        continue;
      }
      result += murda;
      if (nextChar !== undefined && isConsonant(nextChar)) {
        result += '꧀';
      }
      i += 1;
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

      const mid = text[i + 1].toLowerCase();
      const vowel = text[i + 2];
      if ((mid === 'r' || mid === 'y') && isVowel(vowel)) {
        const onset = consonantMap.get((char + 'a').toLowerCase()) || consonantMap.get(char.toLowerCase());
        if (onset) {
          result += onset + (mid === 'r' ? CAKRA : PENGKAL);
          if (vowel.toLowerCase() !== 'a') {
            result += getVowelMark(vowel);
          }
          i += 3;
          continue;
        }
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

    const rest2 = text.slice(i, i + 2).toLowerCase();
    const afterNg = text[i + 2];
    if (rest2 === 'ng' && (afterNg === undefined || !isVowel(afterNg))) {
      result += 'ꦁ';
      i += 2;
      continue;
    }
    if (char.toLowerCase() === 'r' && (text[i + 1] === undefined || !isVowel(text[i + 1]))) {
      result += 'ꦂ';
      i += 1;
      continue;
    }
    if (char.toLowerCase() === 'h' && (text[i + 1] === undefined || !isVowel(text[i + 1]))) {
      result += 'ꦃ';
      i += 1;
      continue;
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
      if (useSwara) {
        result += vowelJavanese;
      } else {
        result += 'ꦲ';
        if (char.toLowerCase() !== 'a') {
          result += getVowelMark(char);
        }
      }
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

  const PANGKON = '꧀';
  const CECAK_TELU = '꦳';
  const TALING = 'ꦺ';
  const TARUNG = 'ꦴ';

  const sandhangan: Record<string, string> = {
    'ꦶ': 'i',
    'ꦸ': 'u',
    'ꦼ': 'e',
    'ꦺ': 'é',
  };

  const aksara: Record<string, { base: string; withA: string }> = {
    'ꦲ': { base: 'h', withA: 'ha' },
    'ꦤ': { base: 'n', withA: 'na' },
    'ꦕ': { base: 'c', withA: 'ca' },
    'ꦫ': { base: 'r', withA: 'ra' },
    'ꦏ': { base: 'k', withA: 'ka' },
    'ꦢ': { base: 'd', withA: 'da' },
    'ꦠ': { base: 't', withA: 'ta' },
    'ꦱ': { base: 's', withA: 'sa' },
    'ꦮ': { base: 'w', withA: 'wa' },
    'ꦭ': { base: 'l', withA: 'la' },
    'ꦥ': { base: 'p', withA: 'pa' },
    'ꦝ': { base: 'dh', withA: 'dha' },
    'ꦗ': { base: 'j', withA: 'ja' },
    'ꦪ': { base: 'y', withA: 'ya' },
    'ꦚ': { base: 'ny', withA: 'nya' },
    'ꦩ': { base: 'm', withA: 'ma' },
    'ꦒ': { base: 'g', withA: 'ga' },
    'ꦧ': { base: 'b', withA: 'ba' },
    'ꦛ': { base: 'th', withA: 'tha' },
    'ꦔ': { base: 'ng', withA: 'nga' },
    'ꦟ': { base: 'N', withA: 'Na' },
    'ꦑ': { base: 'K', withA: 'Ka' },
    'ꦡ': { base: 'T', withA: 'Ta' },
    'ꦯ': { base: 'S', withA: 'Sa' },
    'ꦦ': { base: 'P', withA: 'Pa' },
    'ꦓ': { base: 'G', withA: 'Ga' },
    'ꦨ': { base: 'B', withA: 'Ba' },
  };

  const phoneticOnset: Record<string, string> = {
    'ꦥ': 'f',
    'ꦮ': 'v',
    'ꦗ': 'z',
  };

  function takeVowelOrPangkon(onset: string): string {
    if (i >= text.length) return onset;
    if (text[i] === TALING && text[i + 1] === TARUNG) {
      i += 2;
      return onset + 'o';
    }
    const mark = sandhangan[text[i]];
    if (mark) {
      i += 1;
      return onset + mark;
    }
    if (text[i] === PANGKON) {
      i += 1;
      return onset;
    }
    if (onset.length === 1 && 'fvz'.includes(onset)) {
      return onset;
    }
    return onset + 'a';
  }

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

    const numberLatin = [...numberMap.entries()].find(([, j]) => j === char)?.[0];
    if (numberLatin) {
      result += numberLatin;
      i++;
      continue;
    }

    let punctMatched = false;
    for (const [latin, javanese] of punctuationMap.entries()) {
      if (text.startsWith(javanese, i)) {
        result += latin;
        i += javanese.length;
        punctMatched = true;
        break;
      }
    }
    if (punctMatched) continue;

    if (aksara[char] && text[i + 1] === CECAK_TELU && phoneticOnset[char]) {
      i += 2;
      result += takeVowelOrPangkon(phoneticOnset[char]);
      continue;
    }

    if (aksara[char]) {
      const { base, withA } = aksara[char];
      i += 1;
      let cluster = '';
      if (text[i] === CAKRA) { cluster = 'r'; i += 1; }
      else if (text[i] === PENGKAL) { cluster = 'y'; i += 1; }
      const onset = cluster ? base + cluster : base;
      if (text[i] === TALING && text[i + 1] === TARUNG) {
        result += onset + 'o';
        i += 2;
        continue;
      }
      const mark = sandhangan[text[i]];
      if (mark) {
        result += onset + mark;
        i += 1;
        continue;
      }
      if (text[i] === PANGKON) {
        result += onset;
        i += 1;
        continue;
      }
      result += cluster ? onset + 'a' : withA;
      continue;
    }

    if (char === TALING && text[i + 1] === TARUNG) {
      result += 'o';
      i += 2;
      continue;
    }
    if (sandhangan[char]) {
      result += sandhangan[char];
      i += 1;
      continue;
    }

    const vowelLatin = [...vowelMap.entries()].find(([, j]) => j === char)?.[0];
    if (vowelLatin) {
      result += vowelLatin;
      i += 1;
      continue;
    }

    if (char === 'ꦁ') { result += 'ng'; i += 1; continue; }
    if (char === 'ꦂ') { result += 'r'; i += 1; continue; }
    if (char === 'ꦃ') { result += 'h'; i += 1; continue; }
    if (char === PANGKON) { i += 1; continue; }

    result += handleUnmapped(char, strict);
    i += 1;
  }

  return result;
}

export function transliterate(text: string, direction: TransliterationDirection, options?: TransliterationOptions): string {
  if (direction === 'toHonocoroko') {
    return toHonocoroko(text, options);
  }
  return fromHonocoroko(text, options);
}
