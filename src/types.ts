// Type definitions for honocoroko package

export type TransliterationDirection = 'toHonocoroko' | 'fromHonocoroko';

export interface CharacterMapping {
  latin: string;
  javanese: string;
}

export interface TransliterationOptions {
  // When true, throw if a character has no mapping. Default: false (keep as-is, no console output)
  strict?: boolean;
  // When true, converts special characters (like ?, @, .) to Hanacaraka approximations
  // When false (default), preserves these characters unchanged
  convertSpecialChars?: boolean;
  // When true, uppercase N/K/T/S/P/G/B onsets use Aksara Murda. Default false.
  useMurda?: boolean;
  // When true (default), standalone vowels use Aksara Swara.
  // When false, they use ha + sandhangan.
  useSwara?: boolean;
}
