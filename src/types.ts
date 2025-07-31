// Type definitions for honocoroko package

export type TransliterationDirection = 'toHonocoroko' | 'fromHonocoroko';

export interface CharacterMapping {
  latin: string;
  javanese: string;
}

export interface TransliterationOptions {
  // Future options can be added here
  strict?: boolean;
}