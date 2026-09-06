# honocoroko

[![Version](https://img.shields.io/badge/version-1.2.1-blue.svg)](https://github.com/Naandalist/honocoroko)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
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

#### ESM (Modern) - Recommended
Use this in modern Node.js projects, TypeScript, Vite, or any bundler that supports ES modules:

```typescript
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';
```

#### CommonJS (Legacy)
Use this in older Node.js projects or when `require()` is needed:

```javascript
const { toHonocoroko, fromHonocoroko, transliterate } = require('@naandalist/honocoroko');
```

### Basic Examples

```typescript
const javanese = toHonocoroko('hanacaraka');
console.log(javanese); // ꦲꦤꦕꦫꦏ

const latin = fromHonocoroko('ꦲꦤꦕꦫꦏ');
console.log(latin); // hanacaraka

const result1 = transliterate('hanacaraka', 'toHonocoroko');
const result2 = transliterate('ꦲꦤꦕꦫꦏ', 'fromHonocoroko');
```

## Features

- Universal module support (ESM and CommonJS)
- Basic Javanese consonants (Aksara Nglegena)
- Vowels and vowel marks (Sandhangan)
- Javanese numerals (0-9)
- Javanese punctuation
- Phonetic approximations for Latin letters not in Javanese (f, v, z, q, x)
- TypeScript support with full type definitions
- Zero dependencies

Aksara Murda mappings exist in source but are not used by the converter yet. See upcoming 1.3.0 work.

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

This package does **not** ship a Javanese font. Transliteration returns Unicode text; display is up to the font on the system or page.

Use a licensed Unicode Aksara Jawa font, for example:

- [Noto Sans Javanese](https://fonts.google.com/noto/specimen/Noto+Sans+Javanese) (SIL Open Font License)
- [nyk Ngayogyan](https://aksaradinusantara.com/fonta/nyk-ngayogyan.font) (Apri Nugroho / Dinas Kebudayaan DIY)

## API

### `toHonocoroko(text: string, options?: TransliterationOptions): string`
Converts Latin text to Javanese script.

### `fromHonocoroko(text: string, options?: TransliterationOptions): string`
Converts Javanese script back to Latin text.

### `transliterate(text: string, direction: TransliterationDirection, options?: TransliterationOptions): string`
Generic function that can transliterate in either direction.

## Options

### `convertSpecialChars: boolean`

By default, special characters like `?`, `!`, `@` are preserved unchanged. Set `convertSpecialChars: true` to attempt converting them. Unmapped characters stay as-is unless `strict` is enabled.

### `strict: boolean`

Default: `false`. Unmapped characters are kept as-is and the library does **not** write to `console`. Set `strict: true` to throw instead:

```typescript
toHonocoroko('apa§', { convertSpecialChars: true, strict: true });
// throws: No mapping found for character: § (U+00A7)
```

```typescript
interface TransliterationOptions {
  convertSpecialChars?: boolean; // Default: false
  strict?: boolean;              // Default: false
}
```

## License

MIT © [Listiananda Apriliawan](https://www.naandalist.com/)

## Credits

This library is inspired by the [transliterasijawa](https://github.com/bennylin/transliterasijawa) project.
