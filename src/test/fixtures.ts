// Exact expected outputs for the current 1.2.x forward mapper.
// Reverse cases that need syllable-aware decoding are listed separately
// and skipped until https://github.com/Naandalist/honocoroko/issues/9

export interface Fixture {
  latin: string;
  javanese: string;
}

export const toHonocorokoFixtures: Fixture[] = [
  { latin: 'ha', javanese: 'ꦲ' },
  { latin: 'na', javanese: 'ꦤ' },
  { latin: 'ca', javanese: 'ꦕ' },
  { latin: 'ra', javanese: 'ꦫ' },
  { latin: 'ka', javanese: 'ꦏ' },
  { latin: 'hanacaraka', javanese: 'ꦲꦤꦕꦫꦏ' },
  { latin: 'ha na ca ra ka', javanese: 'ꦲ ꦤ ꦕ ꦫ ꦏ' },
  { latin: 'ba', javanese: 'ꦧ' },
  { latin: 'bi', javanese: 'ꦧꦶ' },
  { latin: 'bu', javanese: 'ꦧꦸ' },
  { latin: 'be', javanese: 'ꦧꦼ' },
  { latin: 'bo', javanese: 'ꦧꦺꦴ' },
  { latin: 'bisa', javanese: 'ꦧꦶꦱ' },
  { latin: 'biso', javanese: 'ꦧꦶꦱꦺꦴ' },
  { latin: 'bakso', javanese: 'ꦧꦏ꧀ꦱꦺꦴ' },
  { latin: 'nga', javanese: 'ꦔ' },
  { latin: 'nya', javanese: 'ꦚ' },
  { latin: 'dha', javanese: 'ꦝ' },
  { latin: 'tha', javanese: 'ꦛ' },
  { latin: '0', javanese: '꧐' },
  { latin: '1', javanese: '꧑' },
  { latin: '123', javanese: '꧑꧒꧓' },
  { latin: '9876543210', javanese: '꧙꧘꧗꧖꧕꧔꧓꧒꧑꧐' },
  { latin: ',', javanese: '꧈' },
  { latin: '.', javanese: '꧉' },
  { latin: ':', javanese: '꧇' },
  { latin: 'hana 123', javanese: 'ꦲꦤ ꧑꧒꧓' },
  { latin: 'f', javanese: 'ꦥ꦳' },
  { latin: 'v', javanese: 'ꦮ꦳' },
  { latin: 'z', javanese: 'ꦗ꦳' },
  { latin: 'hana?', javanese: 'ꦲꦤ?' },
  { latin: 'cara!', javanese: 'ꦕꦫ!' },
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

// Known-broken until syllable-aware fromHonocoroko (#9)
export const brokenRoundTrip: Array<{ latin: string; reason: string }> = [
  { latin: 'bi', reason: 'ꦧꦶ currently decodes as "bai" instead of "bi"' },
  { latin: 'bisa', reason: 'sandhangan i is appended after inherent a' },
  { latin: 'biso', reason: 'sandhangan i/o are not folded into the syllable' },
  { latin: 'bakso', reason: 'pangkon ꧀ currently reverse-maps to "/"' },
  { latin: 'wong', reason: 'final ng is not cecak; reverse also drops vowels wrongly' },
];
