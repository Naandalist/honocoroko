# honocoroko

[![npm version](https://img.shields.io/npm/v/@naandalist/honocoroko.svg)](https://www.npmjs.com/package/@naandalist/honocoroko)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library for transliterating text between Latin and [Javanese script (Aksara Jawa/Hanacaraka)](https://id.wikipedia.org/wiki/Hanacaraka).

> [!IMPORTANT]
> **This library changes writing systems (Latin ↔ Javanese script), not languages. It is transliteration, not translation.**

## Installation

```bash
npm install @naandalist/honocoroko
```

Requires Node.js 18+.

## What 1.2.x actually does

Forward mapping (`toHonocoroko`) is the reliable direction. These outputs are covered by tests:

```typescript
import { toHonocoroko, fromHonocoroko } from '@naandalist/honocoroko';

toHonocoroko('hanacaraka'); // ꦲꦤꦕꦫꦏ
toHonocoroko('bisa');       // ꦧꦶꦱ
toHonocoroko('bakso');      // ꦧꦏ꧀ꦱꦺꦴ
toHonocoroko('wong');       // ꦮꦺꦴꦤ꧀ꦒ
toHonocoroko('hana 123');   // ꦲꦤ ꧑꧒꧓
```

`fromHonocoroko` is a character lookup, not a syllable parser. Open syllables like `ꦲꦤꦕꦫꦏ` → `hanacaraka` work. Closed syllables and sandhangan do not fold back correctly yet:

```typescript
fromHonocoroko(toHonocoroko('bisa'));  // "baisa", not "bisa"
fromHonocoroko(toHonocoroko('bakso')); // "baxo", not "bakso"
fromHonocoroko(toHonocoroko('wong'));  // "waona/ga", not "wong"
```

That reverse path is the 1.3.0 work in [#9](https://github.com/Naandalist/honocoroko/issues/9).

## Not in 1.2.x

These exist as unused mapping tables or are simply unimplemented. Do not expect them:

| Missing | Planned |
|---|---|
| Aksara Murda | [#11](https://github.com/Naandalist/honocoroko/issues/11) |
| Aksara Swara as a first-class option | [#11](https://github.com/Naandalist/honocoroko/issues/11) |
| Final `-ng` / `-r` / `-h` as cecak, layar, wignyan | [#10](https://github.com/Naandalist/honocoroko/issues/10) |
| Cakra / pengkal | [#12](https://github.com/Naandalist/honocoroko/issues/12) |
| `e` vs `é` documented as taling vs pepet | [#12](https://github.com/Naandalist/honocoroko/issues/12) |

Today `wong` becomes `ꦮꦺꦴꦤ꧀ꦒ` (wa + o + na + pangkon + ga), not `ꦮꦺꦴꦁ`.

## Usage

ESM:

```typescript
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';
```

CommonJS:

```javascript
const { toHonocoroko, fromHonocoroko, transliterate } = require('@naandalist/honocoroko');
```

## Features (1.2.x)

- ESM and CommonJS
- Aksara Nglegena (basic consonants)
- Sandhangan on the **forward** path (`bi` → `ꦧꦶ`)
- Pangkon between consonants (`bakso` → `ꦧꦏ꧀ꦱꦺꦴ`)
- Javanese numerals `0-9` → `꧐-꧙`
- Javanese punctuation `,` `.` `:`
- Phonetic Latin extras: `f` `v` `z` `q` `x`
- TypeScript types, zero runtime dependencies

## Supported characters

### Basic consonants

- ha (ꦲ), na (ꦤ), ca (ꦕ), ra (ꦫ), ka (ꦏ)
- da (ꦢ), ta (ꦠ), sa (ꦱ), wa (ꦮ), la (ꦭ)
- pa (ꦥ), dha (ꦝ), ja (ꦗ), ya (ꦪ), nya (ꦚ)
- ma (ꦩ), ga (ꦒ), ba (ꦧ), tha (ꦛ), nga (ꦔ)

### Numbers

- 0-9 → ꧐-꧙

### Punctuation

- `,` → ꧈
- `.` → ꧉
- `:` → ꧇

### Phonetic approximations

- f → ꦥ꦳ (pa + cecak telu)
- v → ꦮ꦳ (wa + cecak telu)
- z → ꦗ꦳ (ja + cecak telu)
- q → ꦏ (ka)
- x → ꦏ꧀ꦱ (ks)

## Font support

This package does **not** ship a Javanese font. Output is Unicode; display depends on the font on the system or page.

- [Noto Sans Javanese](https://fonts.google.com/noto/specimen/Noto+Sans+Javanese) (SIL Open Font License)
- [nyk Ngayogyan](https://aksaradinusantara.com/fonta/nyk-ngayogyan.font) (Apri Nugroho / Dinas Kebudayaan DIY)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Javanese&display=swap">
<style>
  .aksara { font-family: "Noto Sans Javanese", sans-serif; }
</style>
```

## API

```typescript
toHonocoroko(text: string, options?: TransliterationOptions): string
fromHonocoroko(text: string, options?: TransliterationOptions): string
transliterate(text: string, direction: TransliterationDirection, options?: TransliterationOptions): string

interface TransliterationOptions {
  convertSpecialChars?: boolean; // default false — keep ?, !, @, …
  strict?: boolean;              // default false — keep unmapped chars; true throws
}
```

### `convertSpecialChars`

Default `false`: `?` `!` `@` and similar stay as Latin. `true` tries to convert them; if there is no mapping they stay as-is unless `strict` is on.

### `strict`

Default `false`: no `console` output; unmapped characters pass through. `true` throws:

```typescript
toHonocoroko('apa§', { convertSpecialChars: true, strict: true });
// Error: No mapping found for character: § (U+00A7)
```

`toHonocoroko('hana?', { strict: true })` does not throw — `?` is a preserved character.

## License

MIT © [Listiananda Apriliawan](https://www.naandalist.com/)

## Credits

Inspired by [transliterasijawa](https://github.com/bennylin/transliterasijawa).
