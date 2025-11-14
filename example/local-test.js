// Local testing file to ensure the library works correctly
// Run this file with: node example/local-test.js

import { toHonocoroko, fromHonocoroko, transliterate } from '../dist/esm/index.js';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

let passedTests = 0;
let failedTests = 0;

function test(description, actual, expected) {
  const passed = actual === expected;
  if (passed) {
    console.log(`${colors.green}✓${colors.reset} ${description}`);
    passedTests++;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${description}`);
    console.log(`  Expected: ${colors.cyan}${expected}${colors.reset}`);
    console.log(`  Got:      ${colors.yellow}${actual}${colors.reset}`);
    failedTests++;
  }
}

function testTruthy(description, condition) {
  if (condition) {
    console.log(`${colors.green}✓${colors.reset} ${description}`);
    passedTests++;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${description}`);
    failedTests++;
  }
}

function section(title) {
  console.log(`\n${colors.blue}▶${colors.reset} ${title}`);
  console.log('─'.repeat(60));
}

console.log(`${colors.cyan}
╔═══════════════════════════════════════════════════════════╗
║         HONOCOROKO LOCAL TEST SUITE                       ║
║         Testing Library Functionality                     ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}`);

// Test 1: Basic Consonants
section('Test 1: Basic Consonants');
test('ha → ꦲ', toHonocoroko('ha'), 'ꦲ');
test('na → ꦤ', toHonocoroko('na'), 'ꦤ');
test('ca → ꦕ', toHonocoroko('ca'), 'ꦕ');
test('ra → ꦫ', toHonocoroko('ra'), 'ꦫ');
test('ka → ꦏ', toHonocoroko('ka'), 'ꦏ');

// Test 2: Numbers
section('Test 2: Javanese Numbers');
test('0 → ꧐', toHonocoroko('0'), '꧐');
test('1 → ꧑', toHonocoroko('1'), '꧑');
test('123 → ꧑꧒꧓', toHonocoroko('123'), '꧑꧒꧓');
test('9876543210 → ꧙꧘꧗꧖꧕꧔꧓꧒꧑꧐', toHonocoroko('9876543210'), '꧙꧘꧗꧖꧕꧔꧓꧒꧑꧐');

// Test 3: Punctuation
section('Test 3: Punctuation');
test(', → ꧈', toHonocoroko(','), '꧈');
test('. → ꧉', toHonocoroko('.'), '꧉');
test(': → ꧇', toHonocoroko(':'), '꧇');

// Test 4: Reverse Transliteration
section('Test 4: Reverse Transliteration (Javanese → Latin)');
test('ꦲ → ha', fromHonocoroko('ꦲ'), 'ha');
test('ꦤ → na', fromHonocoroko('ꦤ'), 'na');
test('ꦕ → ca', fromHonocoroko('ꦕ'), 'ca');
test('꧑꧒꧓ → 123', fromHonocoroko('꧑꧒꧓'), '123');

// Test 5: Round-trip Transliteration
section('Test 5: Round-trip Transliteration');
const roundTrip1 = 'hanacara';
test(`${roundTrip1} round-trip`, fromHonocoroko(toHonocoroko(roundTrip1)), roundTrip1);

const roundTrip2 = '1234567890';
test(`${roundTrip2} round-trip`, fromHonocoroko(toHonocoroko(roundTrip2)), roundTrip2);

// Test 6: Mixed Content
section('Test 6: Mixed Content');
const mixed = toHonocoroko('hana 123');
testTruthy('Mixed text contains Javanese chars', mixed.includes('ꦲ') && mixed.includes('ꦤ'));
testTruthy('Mixed text contains numbers', mixed.includes('꧑꧒꧓'));

// Test 7: Special Characters (Default Behavior)
section('Test 7: Special Characters (Preserved by Default)');
testTruthy('Preserves ? by default', toHonocoroko('hana?').includes('?'));
testTruthy('Preserves ! by default', toHonocoroko('cara!').includes('!'));
testTruthy('Preserves @ by default', toHonocoroko('test@domain').includes('@'));

// Test 8: Empty String
section('Test 8: Edge Cases');
test('Empty string', toHonocoroko(''), '');
test('Empty string reverse', fromHonocoroko(''), '');

// Test 9: Spaces
section('Test 9: Whitespace Handling');
const withSpaces = toHonocoroko('ha na ca ra');
testTruthy('Preserves spaces', withSpaces.includes(' '));

// Test 10: Phonetic Approximations
section('Test 10: Phonetic Approximations');
test('f → ꦥ꦳', toHonocoroko('f'), 'ꦥ꦳');
test('v → ꦮ꦳', toHonocoroko('v'), 'ꦮ꦳');
test('z → ꦗ꦳', toHonocoroko('z'), 'ꦗ꦳');

// Test 11: Generic transliterate function
section('Test 11: Generic transliterate() Function');
const text11 = 'hana';
test('transliterate to Javanese', transliterate(text11, 'toHonocoroko'), toHonocoroko(text11));
const javanese11 = 'ꦲꦤ';
test('transliterate from Javanese', transliterate(javanese11, 'fromHonocoroko'), fromHonocoroko(javanese11));

// Test 12: Options - convertSpecialChars
section('Test 12: Options - convertSpecialChars');
const withOption = toHonocoroko('test?', { convertSpecialChars: true });
const withoutOption = toHonocoroko('test?', { convertSpecialChars: false });
const defaultBehavior = toHonocoroko('test?');
testTruthy('Returns string with option=true', typeof withOption === 'string');
testTruthy('Preserves ? with option=false', withoutOption.includes('?'));
testTruthy('Preserves ? by default', defaultBehavior.includes('?'));
test('Default matches explicit false', defaultBehavior, withoutOption);

// Test 13: Complex Real-World Examples
section('Test 13: Complex Real-World Examples');
const example1 = 'selamat datang';
const java1 = toHonocoroko(example1);
testTruthy('Complex text converts', java1.length > 0 && java1 !== example1);

const example2 = 'nomor: 123';
const java2 = toHonocoroko(example2);
testTruthy('Text with numbers and punctuation', 
  java2.includes('꧇') && // colon
  java2.includes('꧑') && // number 1
  java2.includes('꧒') && // number 2
  java2.includes('꧓')    // number 3
);

// Test 14: Type Checking
section('Test 14: Type Checking');
testTruthy('toHonocoroko returns string', typeof toHonocoroko('test') === 'string');
testTruthy('fromHonocoroko returns string', typeof fromHonocoroko('ꦠꦼꦱ꧀ꦠ') === 'string');
testTruthy('transliterate returns string', typeof transliterate('test', 'toHonocoroko') === 'string');

// Test 15: Function Availability
section('Test 15: Function Availability');
testTruthy('toHonocoroko is a function', typeof toHonocoroko === 'function');
testTruthy('fromHonocoroko is a function', typeof fromHonocoroko === 'function');
testTruthy('transliterate is a function', typeof transliterate === 'function');

// Summary
console.log(`\n${colors.cyan}${'═'.repeat(60)}`);
console.log(`TEST SUMMARY`);
console.log(`${'═'.repeat(60)}${colors.reset}`);
console.log(`${colors.green}Passed:${colors.reset} ${passedTests}`);
console.log(`${colors.red}Failed:${colors.reset} ${failedTests}`);
console.log(`${colors.yellow}Total:${colors.reset}  ${passedTests + failedTests}`);

if (failedTests === 0) {
  console.log(`\n${colors.green}✅ All tests passed! The library is working correctly.${colors.reset}`);
  process.exit(0);
} else {
  console.log(`\n${colors.red}❌ Some tests failed. Please review the output above.${colors.reset}`);
  process.exit(1);
}
