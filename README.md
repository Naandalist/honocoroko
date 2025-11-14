# honocoroko

[![Version](https://img.shields.io/badge/version-1.2.1-blue.svg)](https://github.com/Naandalist/honocoroko)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for transliterating text between Latin and [Javanese script (Aksara Jawa/Hanacaraka)](https://id.wikipedia.org/wiki/Hanacaraka).

> [!IMPORTANT]
> **This library changes writing systems (Latin ↔ Javanese script), not languages. It's transliteration, not translation.**

## Installation

```bash
npm install @naandalist/honocoroko
```


## Usage

### Import Methods

The package supports both **ESM (ES Modules)** and **CommonJS**:

#### 🔥 ESM (Modern) - Recommended
Use this in modern Node.js projects, TypeScript, Vite, or any bundler that supports ES modules:

```typescript
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';
```

#### 🔧 CommonJS (Legacy)
Use this in older Node.js projects or when `require()` is needed:

```javascript
const { toHonocoroko, fromHonocoroko, transliterate } = require('@naandalist/honocoroko');
```

### Basic Examples

```typescript
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

#### ⚡ TypeScript Projects
```typescript
import { 
  toHonocoroko, 
  fromHonocoroko, 
  TransliterationDirection, 
  TransliterationOptions 
} from '@naandalist/honocoroko';

const javanese: string = toHonocoroko('hanacaraka');
const latin: string = fromHonocoroko('ꦲꦤꦕꦫꦏ');

// With options - opt-in to convert special characters
const options: TransliterationOptions = { convertSpecialChars: true };
const result: string = toHonocoroko('sapa iki?', options);
```

#### 🌐 Browser/Bundlers (Webpack, Vite, etc.)
```typescript
import { toHonocoroko } from '@naandalist/honocoroko';

// Works in React, Vue, Svelte, etc.
const transliterated = toHonocoroko('basa jawa');
```

## Features

- ✅ **Universal Module Support** - Works with both ESM (`import`) and CommonJS (`require`)
- ✅ Full support for basic Javanese consonants (Aksara Nglegena)
- ✅ Vowels and vowel marks (Sandhangan)
- ✅ Special consonants (Aksara Murda)
- ✅ Javanese numerals (0-9)
- ✅ Javanese punctuation
- ✅ Phonetic approximations for Latin letters not in Javanese (f, v, z, q, x)
- ✅ **TypeScript support** with full type definitions
- ✅ **Zero dependencies** - lightweight and secure

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

### `toHonocoroko(text: string, options?: TransliterationOptions): string`
Converts Latin text to Javanese script.

```typescript
const javanese = toHonocoroko('hanacaraka');
// Returns: ꦲꦤꦕꦫꦏ
```

### `fromHonocoroko(text: string, options?: TransliterationOptions): string`
Converts Javanese script back to Latin text.

```typescript
const latin = fromHonocoroko('ꦲꦤꦕꦫꦏ');
// Returns: hanacaraka
```

### `transliterate(text: string, direction: 'toHonocoroko' | 'fromHonocoroko', options?: TransliterationOptions): string`
Generic function that can transliterate in either direction.

```typescript
const result1 = transliterate('hanacaraka', 'toHonocoroko');
const result2 = transliterate('ꦲꦤꦕꦫꦏ', 'fromHonocoroko');
```

## Options

All transliteration functions accept an optional `options` parameter to customize behavior:

### `convertSpecialChars: boolean`

By default, special characters like `?`, `!`, `@`, `.`, etc. are preserved unchanged during transliteration. Set `convertSpecialChars: true` to attempt converting these characters to Hanacaraka approximations.

```typescript
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';

// Default behavior - preserves special characters
const result1 = toHonocoroko('apa iki?');
// Returns: ꦄꦥ ꦆꦏꦶ? (question mark preserved)

const result2 = toHonocoroko('email@domain.com');
// Returns: ꦌꦩꦆꦭ@ꦢꦺꦴꦩꦆꦤ.ꦕꦺꦴꦩ (@ and . preserved)

// Opt-in to convert special characters
const options = { convertSpecialChars: true };
const result3 = toHonocoroko('test?', options);
// Attempts to convert ? to Hanacaraka (may produce warnings if no mapping exists)

// Works with all functions
const result4 = transliterate('hello!', 'toHonocoroko', { convertSpecialChars: false });
// Returns: ꦲꦼꦭ꧀ꦭꦺꦴ! (exclamation mark preserved - this is default)
```

### Function Signatures

```typescript
toHonocoroko(text: string, options?: TransliterationOptions): string
fromHonocoroko(text: string, options?: TransliterationOptions): string
transliterate(text: string, direction: TransliterationDirection, options?: TransliterationOptions): string

interface TransliterationOptions {
  convertSpecialChars?: boolean; // Default: false (preserves special chars)
}
```

### Default Preserved Characters

The following characters are preserved by default (when `convertSpecialChars` is `false` or not specified):
```
? ! @ # $ % ^ & * - _ = + [ ] { } | \ ; ' < > / ` ~
```

**Note**: Characters like `,` `.` `:` `"` `(` `)` have proper Javanese equivalents and will always be converted:
- `,` → `꧈`  
- `.` → `꧉`  
- `:` → `꧇`  
- `"` → `꧊꧋`  
- `(` → `꧌`  
- `)` → `꧍`

## License

MIT © [Listiananda Apriliawan](https://www.naandalist.com/)

> **NOTE**: Free to use, modify, and distribute. Just keep the copyright notice.

## Support

If you find this library helpful, you can [buy me a coffee ☕](https://teer.id/naandalist)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

This library is inspired by the [transliterasijawa](https://github.com/bennylin/transliterasijawa) project.