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

## Font Support

This package does **not** ship a Javanese font. Transliteration returns Unicode text; display is up to the font on the system or page.

Use a licensed Unicode Aksara Jawa font, for example:

- [Noto Sans Javanese](https://fonts.google.com/noto/specimen/Noto+Sans+Javanese) (SIL Open Font License)
- [nyk Ngayogyan](https://aksaradinusantara.com/fonta/nyk-ngayogyan.font) (Apri Nugroho / Dinas Kebudayaan DIY)

## Options

### `convertSpecialChars: boolean`

By default, special characters like `?`, `!`, `@` are preserved. Set `convertSpecialChars: true` to attempt converting them.

Unmapped special chars stay as-is unless `strict: true`.

### `strict: boolean`

Default: `false`. Unmapped characters are kept as-is and the library does **not** write to `console`. Set `strict: true` to throw instead:

```typescript
toHonocoroko('apa§', { convertSpecialChars: true, strict: true });
// throws: No mapping found for character: § (U+00A7)
```

### Function Signatures

```typescript
toHonocoroko(text: string, options?: TransliterationOptions): string
fromHonocoroko(text: string, options?: TransliterationOptions): string
transliterate(text: string, direction: TransliterationDirection, options?: TransliterationOptions): string

interface TransliterationOptions {
  convertSpecialChars?: boolean; // Default: false
  strict?: boolean;              // Default: false (keep unmapped chars, no console output)
}
```

## License

MIT © [Listiananda Apriliawan](https://www.naandalist.com/)
