// Exact expected outputs for the current forward mapper.
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
  { latin: 'wong', javanese: 'ꦮꦺꦴꦁ' },
  { latin: 'besar', javanese: 'ꦧꦼꦱꦂ' },
  { latin: 'rumah', javanese: 'ꦫꦸꦩꦃ' },
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

export const workingRoundTrip: string[] = [
  'ha', 'na', 'ca', 'ra', 'ka', 'hanacaraka', 'hanacara',
  'ha na ca ra ka', '1234567890', 'hana 123', 'hana?', 'cara!',
  'nga', 'nya', 'dha', 'tha', 'f', 'v', 'z',
];

export const workingSyllableRoundTrip: string[] = [
  'bi', 'bu', 'be', 'bo', 'bisa', 'biso', 'bakso',
  'wong', 'besar', 'rumah',
];

export const brokenRoundTrip: Array<{ latin: string; reason: string }> = [];
