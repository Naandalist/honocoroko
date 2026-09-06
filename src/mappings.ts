// Character mappings between Latin and Javanese script
import { CharacterMapping } from './types.js';

// Basic consonants (Aksara Nglegena)
export const consonants: CharacterMapping[] = [
  { latin: 'ha', javanese: 'ꦲ' },
  { latin: 'na', javanese: 'ꦤ' },
  { latin: 'ca', javanese: 'ꦕ' },
  { latin: 'ra', javanese: 'ꦫ' },
  { latin: 'ka', javanese: 'ꦏ' },
  { latin: 'da', javanese: 'ꦢ' },
  { latin: 'ta', javanese: 'ꦠ' },
  { latin: 'sa', javanese: 'ꦱ' },
  { latin: 'wa', javanese: 'ꦮ' },
  { latin: 'la', javanese: 'ꦭ' },
  { latin: 'pa', javanese: 'ꦥ' },
  { latin: 'dha', javanese: 'ꦝ' },
  { latin: 'ja', javanese: 'ꦗ' },
  { latin: 'ya', javanese: 'ꦪ' },
  { latin: 'nya', javanese: 'ꦚ' },
  { latin: 'ma', javanese: 'ꦩ' },
  { latin: 'ga', javanese: 'ꦒ' },
  { latin: 'ba', javanese: 'ꦧ' },
  { latin: 'tha', javanese: 'ꦛ' },
  { latin: 'nga', javanese: 'ꦔ' },
  { latin: 'h', javanese: 'ꦲ' },
  { latin: 'n', javanese: 'ꦤ' },
  { latin: 'c', javanese: 'ꦕ' },
  { latin: 'r', javanese: 'ꦫ' },
  { latin: 'k', javanese: 'ꦏ' },
  { latin: 'd', javanese: 'ꦢ' },
  { latin: 't', javanese: 'ꦠ' },
  { latin: 's', javanese: 'ꦱ' },
  { latin: 'w', javanese: 'ꦮ' },
  { latin: 'l', javanese: 'ꦭ' },
  { latin: 'p', javanese: 'ꦥ' },
  { latin: 'j', javanese: 'ꦗ' },
  { latin: 'y', javanese: 'ꦪ' },
  { latin: 'm', javanese: 'ꦩ' },
  { latin: 'g', javanese: 'ꦒ' },
  { latin: 'b', javanese: 'ꦧ' },
];

export const vowels: CharacterMapping[] = [
  { latin: 'a', javanese: 'ꦄ' },
  { latin: 'i', javanese: 'ꦆ' },
  { latin: 'u', javanese: 'ꦈ' },
  { latin: 'e', javanese: 'ꦌ' },
  { latin: 'o', javanese: 'ꦎ' },
];

export const vowelMarks: CharacterMapping[] = [
  { latin: 'i', javanese: 'ꦶ' },
  { latin: 'u', javanese: 'ꦸ' },
  { latin: 'é', javanese: 'ꦺ' },
  { latin: 'e', javanese: 'ꦼ' },
  { latin: 'o', javanese: 'ꦺꦴ' },
];

export const murdaConsonants: CharacterMapping[] = [
  { latin: 'Na', javanese: 'ꦟ' },
  { latin: 'Ka', javanese: 'ꦑ' },
  { latin: 'Ta', javanese: 'ꦡ' },
  { latin: 'Sa', javanese: 'ꦯ' },
  { latin: 'Pa', javanese: 'ꦦ' },
  { latin: 'Ga', javanese: 'ꦓ' },
  { latin: 'Ba', javanese: 'ꦨ' },
];

export const numbers: CharacterMapping[] = [
  { latin: '0', javanese: '꧐' },
  { latin: '1', javanese: '꧑' },
  { latin: '2', javanese: '꧒' },
  { latin: '3', javanese: '꧓' },
  { latin: '4', javanese: '꧔' },
  { latin: '5', javanese: '꧕' },
  { latin: '6', javanese: '꧖' },
  { latin: '7', javanese: '꧗' },
  { latin: '8', javanese: '꧘' },
  { latin: '9', javanese: '꧙' },
];

export const punctuation: CharacterMapping[] = [
  { latin: ',', javanese: '꧈' },
  { latin: '.', javanese: '꧉' },
  { latin: ':', javanese: '꧇' },
  { latin: '"', javanese: '꧊꧋' },
  { latin: '(', javanese: '꧌' },
  { latin: ')', javanese: '꧍' },
];

export const specialMarks: CharacterMapping[] = [
  { latin: 'ng', javanese: 'ꦁ' },
  { latin: 'r', javanese: 'ꦂ' },
  { latin: 'h', javanese: 'ꦃ' },
  { latin: '/', javanese: '꧀' },
];

export const phoneticApproximations: CharacterMapping[] = [
  { latin: 'f', javanese: 'ꦥ꦳' },
  { latin: 'v', javanese: 'ꦮ꦳' },
  { latin: 'z', javanese: 'ꦗ꦳' },
  { latin: 'q', javanese: 'ꦏ' },
  { latin: 'x', javanese: 'ꦏ꧀ꦱ' },
];

export function createReverseMappings(_mappings: CharacterMapping[]): Map<string, string> {
  const reverseMap = new Map<string, string>();
  vowelMarks.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  consonants.filter(m => m.latin.length > 1 && m.latin.endsWith('a')).forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  vowels.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  numbers.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  punctuation.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  specialMarks.forEach(({ latin, javanese }) => {
    if (javanese !== '꧀') {
      reverseMap.set(javanese, latin);
    }
  });
  phoneticApproximations.forEach(({ latin, javanese }) => {
    if (!reverseMap.has(javanese)) {
      reverseMap.set(javanese, latin);
    }
  });
  return reverseMap;
}

export const allMappings = [
  ...consonants,
  ...vowels,
  ...vowelMarks,
  ...murdaConsonants,
  ...numbers,
  ...punctuation,
  ...specialMarks,
  ...phoneticApproximations,
];

export function createLatinToJavaneseMap(): Map<string, string> {
  const map = new Map<string, string>();
  allMappings.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  return map;
}

export function createConsonantMap(): Map<string, string> {
  const map = new Map<string, string>();
  consonants.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  return map;
}

export function createVowelMap(): Map<string, string> {
  const map = new Map<string, string>();
  vowels.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  return map;
}

export function createNumberMap(): Map<string, string> {
  const map = new Map<string, string>();
  numbers.forEach(({ latin, javanese }) => {
    map.set(latin, javanese);
  });
  return map;
}

export function createPunctuationMap(): Map<string, string> {
  const map = new Map<string, string>();
  punctuation.forEach(({ latin, javanese }) => {
    map.set(latin, javanese);
  });
  return map;
}

export function createPhoneticMap(): Map<string, string> {
  const map = new Map<string, string>();
  phoneticApproximations.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  return map;
}
