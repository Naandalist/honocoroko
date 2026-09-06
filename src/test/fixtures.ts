// Exact expected outputs for the current 1.2.x forward mapper.
// Reverse cases that need syllable-aware decoding are listed separately
// and skipped until https://github.com/Naandalist/honocoroko/issues/9

export interface Fixture {
  latin: string;
  javanese: string;
}

export const toHonocorokoFixtures: Fixture[] = [
  { latin: 'ha', javanese: '' },
  { latin: 'na', javanese: '' },
  { latin: 'ca', javanese: '' },
  { latin: 'ra', javanese: '' },
  { latin: 'ka', javanese: '' },
  { latin: 'hanacaraka', javanese: '' },
  { latin: 'ha na ca ra ka', javanese: '    ' },
  { latin: 'ba', javanese: '' },
  { latin: 'bi', javanese: '' },
  { latin: 'bu', javanese: '' },
  { latin: 'be', javanese: '' },
  { latin: 'bo', javanese: '' },
  { latin: 'bisa', javanese: '' },
  { latin: 'biso', javanese: '' },
  { latin: 'bakso', javanese: '꧀' },
  { latin: 'nga', javanese: '' },
  { latin: 'nya', javanese: '' },
  { latin: 'dha', javanese: '' },
  { latin: 'tha', javanese: '' },
  { latin: '0', javanese: '꧐' },
  { latin: '1', javanese: '꧑' },
  { latin: '123', javanese: '꧑꧒꧓' },
  { latin: '9876543210', javanese: '꧙꧘꧗꧖꧕꧔꧓꧒꧑꧐' },
  { latin: ',', javanese: '꧈' },
  { latin: '.', javanese: '꧉' },
  { latin: ':', javanese: '꧇' },
  { latin: 'hana 123', javanese: ' ꧑꧒꧓' },
  { latin: 'f', javanese: '' },
  { latin: 'v', javanese: '' },
  { latin: 'z', javanese: '' },
  { latin: 'hana?', javanese: '?' },
  { latin: 'cara!', javanese: '!' },
  { latin: '', javanese: '' },
  { latin: '  ', javanese: '  ' },
];

// Open-syllable / simple cases that already round-trip in 1.2.x
export const workingRoundTrip: string[] = [
  'ha',
  'na',
  'ca',
  'ra',
  'ka',
  'hanacaraka',
  'hanacara',
  'ha na ca ra ka',
  '1234567890',
  'hana 123',
  'hana?',
  'cara!',
  'nga',
  'nya',
  'dha',
  'tha',
  'f',
  'v',
  'z',
];

export const workingSyllableRoundTrip: string[] = [
  'bi',
  'bu',
  'be',
  'bo',
  'bisa',
  'biso',
  'bakso',
];

// Still blocked until later 1.3.0 issues
export const brokenRoundTrip: Array<{ latin: string; reason: string }> = [
  { latin: 'wong', reason: 'final ng is not cecak (#10)' },
];
