# honocoroko

A TypeScript library for transliterating text between Latin and [Javanese script (Aksara Jawa/Hanacaraka)](https://id.wikipedia.org/wiki/Hanacaraka).

> [!IMPORTANT]
> **This library changes writing systems (Latin ↔ Javanese script), not languages. It's transliteration, not translation.**

## Installation

```bash
npm install @naandalist/honocoroko
```

## Usage

```typescript
// ESM (import)
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';

// CommonJS (require)
const { toHonocoroko, fromHonocoroko, transliterate } = require('@naandalist/honocoroko');

// Convert Latin text to Javanese script
const javanese = toHonocoroko('hanacaraka');
console.log(javanese); // ꦲꦤꦕꦫꦏ

// Convert Javanese script back to Latin
const latin = fromHonocoroko('ꦲꦤꦕꦫꦏ');
console.log(latin); // hanacaraka

// Using the generic transliterate function
const result1 = transliterate('hanacaraka', 'toHonocoroko');
const result2 = transliterate('ꦲꦤꦕꦫꦏ', 'fromHonocoroko');
```

## Features

- ✅ Full support for basic Javanese consonants (Aksara Nglegena)
- ✅ Vowels and vowel marks (Sandhangan)
- ✅ Special consonants (Aksara Murda)
- ✅ Javanese numerals (0-9)
- ✅ Javanese punctuation
- ✅ Phonetic approximations for Latin letters not in Javanese (f, v, z, q, x)

## Supported Characters

### Basic Consonants
- ha (ꦲ), na (ꦤ), ca (ꦕ), ra (ꦫ), ka (ꦏ)
- da (ꦢ), ta (ꦠ), sa (ꦱ), wa (ꦮ), la (ꦭ)
- pa (ꦥ), dha (ꦝ), ja (ꦗ), ya (ꦪ), nya (ꦚ)
- ma (ꦩ), ga (ꦒ), ba (ꦧ), tha (ꦛ), nga (ꦔ)

### Numbers
- 0-9 → ꧐-꧙

### Punctuation
- Comma (,) → ꧈
- Period (.) → ꧉
- Colon (:) → ꧇

### Phonetic Approximations
- f → ꦥ꦳ (pa + cecak telu)
- v → ꦮ꦳ (wa + cecak telu)
- z → ꦗ꦳ (ja + cecak telu)
- q → ꦏ (ka)
- x → ꦏ꧀ꦱ (ks)

## Font Support

This package includes the HanacarakaFont.ttf in the `/fonts` directory for proper display of Javanese script.

### Installing the Font

#### Windows
1. Navigate to `node_modules/@naandalist/honocoroko/fonts/`
2. Right-click on `.ttf`
3. Select "Install" or "Install for all users"

#### macOS
1. Navigate to `node_modules/@naandalist/honocoroko/fonts/`
2. Double-click on `.ttf`
3. Click "Install Font" in the preview window


## API

### `toHonocoroko(text: string): string`
Converts Latin text to Javanese script.

### `fromHonocoroko(text: string): string`
Converts Javanese script back to Latin text.

### `transliterate(text: string, direction: 'toHonocoroko' | 'fromHonocoroko'): string`
Generic function that can transliterate in either direction.

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Clean build artifacts
npm run clean
```

## License

MIT © [Listiananda Apriliawan](https://www.naandalist.com/)

> **NOTE**: Free to use, modify, and distribute. Just keep the copyright notice.

## Support

If you find this library helpful, you can [buy me a coffee ☕](https://teer.id/naandalist)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

This library is inspired by the [transliterasijawa](https://github.com/bennylin/transliterasijawa) project.