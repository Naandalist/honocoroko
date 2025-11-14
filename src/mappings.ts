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
  // Add single consonant mappings for easier lookup
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

// Vowels (Aksara Swara)
export const vowels: CharacterMapping[] = [
  { latin: 'a', javanese: 'ꦄ' },
  { latin: 'i', javanese: 'ꦆ' },
  { latin: 'u', javanese: 'ꦈ' },
  { latin: 'e', javanese: 'ꦌ' },
  { latin: 'o', javanese: 'ꦎ' },
];

// Vowel marks (Sandhangan)
export const vowelMarks: CharacterMapping[] = [
  { latin: 'i', javanese: 'ꦶ' },
  { latin: 'u', javanese: 'ꦸ' },
  { latin: 'é', javanese: 'ꦺ' },
  { latin: 'e', javanese: 'ꦼ' },
  { latin: 'o', javanese: 'ꦺꦴ' },
];

// Special consonants (Aksara Murda)
export const murdaConsonants: CharacterMapping[] = [
  { latin: 'Na', javanese: 'ꦟ' },
  { latin: 'Ka', javanese: 'ꦑ' },
  { latin: 'Ta', javanese: 'ꦡ' },
  { latin: 'Sa', javanese: 'ꦯ' },
  { latin: 'Pa', javanese: 'ꦦ' },
  { latin: 'Ga', javanese: 'ꦓ' },
  { latin: 'Ba', javanese: 'ꦨ' },
];

// Numbers
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

// Punctuation
export const punctuation: CharacterMapping[] = [
  { latin: ',', javanese: '꧈' },
  { latin: '.', javanese: '꧉' },
  { latin: ':', javanese: '꧇' },
  { latin: '"', javanese: '꧊꧋' },
  { latin: '(', javanese: '꧌' },
  { latin: ')', javanese: '꧍' },
];

// Special marks
export const specialMarks: CharacterMapping[] = [
  { latin: 'ng', javanese: 'ꦁ' }, // cecak
  { latin: 'r', javanese: 'ꦂ' },  // layar
  { latin: 'h', javanese: 'ꦃ' },  // wignyan
  { latin: '/', javanese: '꧀' },  // pangkon
];

// Phonetic approximations for Latin letters not in Javanese
export const phoneticApproximations: CharacterMapping[] = [
  { latin: 'f', javanese: 'ꦥ꦳' }, // pa + cecak telu
  { latin: 'v', javanese: 'ꦮ꦳' }, // wa + cecak telu
  { latin: 'z', javanese: 'ꦗ꦳' }, // ja + cecak telu
  { latin: 'q', javanese: 'ꦏ' },   // ka (maps to k sound)
  { latin: 'x', javanese: 'ꦏ꧀ꦱ' }, // ks
];

// Create reverse mappings for fromHonocoroko
export function createReverseMappings(_mappings: CharacterMapping[]): Map<string, string> {
  const reverseMap = new Map<string, string>();
  
  // Add vowel marks first
  vowelMarks.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  
  // Add consonants with 'a' (prefer 'ha', 'na', etc. over single letters)
  consonants.filter(m => m.latin.length > 1 && m.latin.endsWith('a')).forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  
  // Add standalone vowels
  vowels.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  
  // Add numbers and punctuation
  numbers.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  
  punctuation.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  
  // Add special marks
  specialMarks.forEach(({ latin, javanese }) => {
    reverseMap.set(javanese, latin);
  });
  
  // Add phonetic approximations last (but don't override consonants)
  phoneticApproximations.forEach(({ latin, javanese }) => {
    if (!reverseMap.has(javanese)) {
      reverseMap.set(javanese, latin);
    }
  });
  
  return reverseMap;
}

// Combined mappings for easy access
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

// Create Map-based lookups for O(1) performance
export function createLatinToJavaneseMap(): Map<string, string> {
  const map = new Map<string, string>();
  
  // Add all mappings, later entries with same key will override earlier ones
  // This maintains the priority: specific mappings override general ones
  allMappings.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  
  return map;
}

// Create Map for quick consonant lookups
export function createConsonantMap(): Map<string, string> {
  const map = new Map<string, string>();
  consonants.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  return map;
}

// Create Map for vowel lookups
export function createVowelMap(): Map<string, string> {
  const map = new Map<string, string>();
  vowels.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  return map;
}

// Create Map for number lookups
export function createNumberMap(): Map<string, string> {
  const map = new Map<string, string>();
  numbers.forEach(({ latin, javanese }) => {
    map.set(latin, javanese);
  });
  return map;
}

// Create Map for punctuation lookups
export function createPunctuationMap(): Map<string, string> {
  const map = new Map<string, string>();
  punctuation.forEach(({ latin, javanese }) => {
    map.set(latin, javanese);
  });
  return map;
}

// Create Map for phonetic approximations
export function createPhoneticMap(): Map<string, string> {
  const map = new Map<string, string>();
  phoneticApproximations.forEach(({ latin, javanese }) => {
    map.set(latin.toLowerCase(), javanese);
  });
  return map;
}