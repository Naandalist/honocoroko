# Honocoroko - Local Tests

This directory contains local tests to ensure the honocoroko library works correctly on your machine.

## Files

- **`local-test.js`** - Automated test suite to verify library functionality
- **`README.md`** - This file

## Getting Started

### 1. Build the Library First

Before running the tests, you need to build the library:

```bash
# From the root directory of the project
npm run build
```

This will create the `dist/` directory with the compiled library files.

### 2. Run the Tests

You can run the tests in two ways:

```bash
# Using npm script (recommended)
npm run test:local

# Or directly with node
node example/local-test.js
```

This will:
- Run comprehensive test suite
- Show pass/fail status for each test
- Display a summary of results
- Exit with status code 0 if all tests pass

## What Gets Tested

### Basic Functionality
- Basic consonants (ha, na, ca, ra, ka, etc.)
- Numbers (0-9 → Javanese numerals)
- Punctuation (,.:)
- Reverse transliteration
- Round-trip conversion

### Advanced Features
- Mixed content (text + numbers)
- Special characters preservation
- Whitespace handling
- Phonetic approximations (f, v, z)
- Generic `transliterate()` function
- Options (`convertSpecialChars`)

### Edge Cases
- Empty strings
- Complex real-world examples
- Type checking
- Function availability

## Example Output

### From `local-test.js`:
```
╔═══════════════════════════════════════════════════════════╗
║         HONOCOROKO LOCAL TEST SUITE                       ║
║         Testing Library Functionality                     ║
╚═══════════════════════════════════════════════════════════╝

▶ Test 1: Basic Consonants
────────────────────────────────────────────────────────────
✓ ha → ꦲ
✓ na → ꦤ
✓ ca → ꦕ
...

TEST SUMMARY
════════════════════════════════════════════════════════════
Passed: 45
Failed: 0
Total:  45

All tests passed! The library is working correctly.
```

## Troubleshooting

### Error: Cannot find module '../dist/esm/index.js'
**Solution**: You need to build the library first:
```bash
npm run build
```

### Javanese characters not displaying correctly
**Solution**: Install the HanacarakaFont.ttf from the `/fonts` directory:
- **Windows**: Right-click → Install
- **macOS**: Double-click → Install Font
- **Linux**: Copy to `~/.fonts/` and run `fc-cache -f -v`

### Tests failing
**Solution**: 
1. Make sure you've built the library with `npm run build`
2. Check that you're running Node.js v14.0.0 or higher
3. Run the official test suite: `npm test`

## Creating Your Own Tests

You can create your own test files in this directory:

```javascript
// my-test.js
import { toHonocoroko, fromHonocoroko } from '../dist/esm/index.js';

// Your custom tests
const myText = 'your text here';
const result = toHonocoroko(myText);
console.log(`Result: ${result}`);
```

Then run it:
```bash
node example/my-test.js
```

## Quick Usage Example

Once the tests pass, you can use the library in your own code:

```javascript
import { toHonocoroko, fromHonocoroko } from '../dist/esm/index.js';

// Latin to Javanese
const javanese = toHonocoroko('hanacaraka');
console.log(javanese); // ꦲꦤꦕꦫꦏ

// Javanese to Latin
const latin = fromHonocoroko('ꦲꦤꦕꦫꦏ');
console.log(latin); // hanacaraka
```

## Additional Resources

- [Main README](../README.md) - Full library documentation
- [Source Code](../src/) - TypeScript source files
- [Official Tests](../src/test/) - Unit test suite
- [GitHub Repository](https://github.com/Naandalist/honocoroko)

## Next Steps

After confirming the library works locally:

1. **Use in your project**:
   ```bash
   npm install @naandalist/honocoroko
   ```

2. **Import in your code**:
   ```javascript
   import { toHonocoroko } from '@naandalist/honocoroko';
   ```

3. **Build something awesome!**

---

**Need help?** Check the [main README](../README.md) or open an issue on GitHub.
