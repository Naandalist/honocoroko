# honocoroko

[![npm version](https://img.shields.io/npm/v/@naandalist/honocoroko.svg)](https://www.npmjs.com/package/@naandalist/honocoroko)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Naandalist/honocoroko/actions/workflows/ci.yml/badge.svg)](https://github.com/Naandalist/honocoroko/actions/workflows/ci.yml)

TypeScript library to transliterate **Latin ↔ [Javanese script](https://id.wikipedia.org/wiki/Hanacaraka)** (Aksara Jawa / Hanacaraka / Honocoroko).

> [!IMPORTANT]
> This changes the **writing system**, not the language. `bisa` becomes `ꦧꦶꦱ`. It does **not** translate Indonesian or Javanese into English.

Live demo: [naandalist.github.io/honocoroko](https://naandalist.github.io/honocoroko)

Requires Node.js 18+. Zero runtime dependencies. ESM and CommonJS.

## Contents

- [Install](#install)
- [Usage](#usage)
- [Quick start](#quick-start)
- [How a syllable is written](#how-a-syllable-is-written)
- [Examples](#examples)
- [Options](#options)
- [Reverse: `fromHonocoroko`](#reverse-fromhonocoroko)
- [API](#api)
- [Fonts](#fonts)
- [What this version does not do](#what-this-version-does-not-do)
- [License](#license)

## Install

**npm**

```bash
npm install @naandalist/honocoroko
```

**yarn**

```bash
yarn add @naandalist/honocoroko
```

**pnpm**

```bash
pnpm add @naandalist/honocoroko
```

## Usage

**ESM**

```ts
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';
```

**CommonJS**

```js
const { toHonocoroko, fromHonocoroko, transliterate } = require('@naandalist/honocoroko');
```

## Quick start

```ts
toHonocoroko('hanacaraka'); // ꦲꦤꦕꦫꦏ
toHonocoroko('bisa');       // ꦧꦶꦱ
toHonocoroko('bakso');      // ꦧꦏ꧀ꦱꦺꦴ
toHonocoroko('wong');       // ꦮꦺꦴꦁ

fromHonocoroko('ꦧꦶꦱ');              // "bisa"
fromHonocoroko(toHonocoroko('wong')); // "wong"

transliterate('bisa', 'toHonocoroko');
transliterate('ꦧꦶꦱ', 'fromHonocoroko');
```

## How a syllable is written

Each aksara already carries an inherent **a**.

| Latin | Written as |
|---|---|
| `ka` | `ꦏ` |
| `ki` | `ꦏꦶ` (ka + wulu) |
| `k` before another consonant | `ꦏ꧀` (ka + pangkon) |
| `kang` | `ꦏꦁ` (ka + cecak) |
| `kra` | `ꦏꦿ` (ka + cakra) |

So `bisa` is `ꦧꦶꦱ` (ba + i + sa), not three independent vowel letters.

## Examples

### Basic consonants (Nglegena)

| Latin | Javanese | Latin | Javanese |
|---|---|---|---|
| `ha` | ꦲ | `pa` | ꦥ |
| `na` | ꦤ | `dha` | ꦝ |
| `ca` | ꦕ | `ja` | ꦗ |
| `ra` | ꦫ | `ya` | ꦪ |
| `ka` | ꦏ | `nya` | ꦚ |
| `da` | ꦢ | `ma` | ꦩ |
| `ta` | ꦠ | `ga` | ꦒ |
| `sa` | ꦱ | `ba` | ꦧ |
| `wa` | ꦮ | `tha` | ꦛ |
| `la` | ꦭ | `nga` | ꦔ |

```ts
toHonocoroko('ha');         // ꦲ
toHonocoroko('hanacaraka'); // ꦲꦤꦕꦫꦏ
toHonocoroko('nya');        // ꦚ   Aksara Nya, not n + pengkal
toHonocoroko('nga');        // ꦔ   Aksara Nga, not cecak
```

### Vowels on a consonant (sandhangan)

| Latin | Mark | Name | Example |
|---|---|---|---|
| inherent `a` | — | — | `ba` → `ꦧ` |
| `i` | ꦶ | wulu | `bi` → `ꦧꦶ` |
| `u` | ꦸ | suku | `bu` → `ꦧꦸ` |
| `e` | ꦼ | pepet | `be` → `ꦧꦼ` |
| `é` or `è` | ꦺ | taling | `bé` → `ꦧꦺ` |
| `o` | ꦺꦴ | taling + tarung | `bo` → `ꦧꦺꦴ` |

```ts
toHonocoroko('bi');   // ꦧꦶ
toHonocoroko('be');   // ꦧꦼ     pepet
toHonocoroko('bé');   // ꦧꦺ     taling
toHonocoroko('bè');   // ꦧꦺ     same as é
toHonocoroko('bo');   // ꦧꦺꦴ
toHonocoroko('bisa'); // ꦧꦶꦱ
toHonocoroko('biso'); // ꦧꦶꦱꦺꦴ
```

Plain `e` is pepet. Use `é` or `è` when you want taling.

### Closed syllables (pangkon)

A consonant with no vowel, sitting before another consonant, takes pangkon (`꧀`).

```ts
toHonocoroko('bakso'); // ꦧꦏ꧀ꦱꦺꦴ
// ba + ka + pangkon + sa + o
```

### Final `-ng` / `-r` / `-h`

These attach to the previous syllable. They are not extra aksara.

| Ending | Mark | Name | Example |
|---|---|---|---|
| `-ng` | ꦁ | cecak | `wong` → `ꦮꦺꦴꦁ` |
| `-r` | ꦂ | layar | `besar` → `ꦧꦼꦱꦂ` |
| `-h` | ꦃ | wignyan | `rumah` → `ꦫꦸꦩꦃ` |

```ts
toHonocoroko('wong');  // ꦮꦺꦴꦁ
toHonocoroko('besar'); // ꦧꦼꦱꦂ
toHonocoroko('rumah'); // ꦫꦸꦩꦃ
toHonocoroko('nga');   // ꦔ   onset nga stays Aksara Nga
```

### Cakra and pengkal

Medial `r` / `y` after a consonant (`CrV` / `CyV`).

```ts
toHonocoroko('kra');  // ꦏꦿ
toHonocoroko('sri');  // ꦱꦿꦶ
toHonocoroko('kya');  // ꦏꦾ
toHonocoroko('kyai'); // ꦏꦾꦆ
```

### Standalone vowels (Aksara Swara)

Default `useSwara: true`. A vowel with no consonant in front uses Swara.

| Latin | Default | `{ useSwara: false }` |
|---|---|---|
| `a` | ꦄ | ꦲ |
| `i` | ꦆ | ꦲꦶ |
| `u` | ꦈ | ꦲꦸ |
| `e` | ꦌ | ꦲꦼ |
| `o` | ꦎ | ꦲꦺꦴ |

```ts
toHonocoroko('i');                      // ꦆ
toHonocoroko('i', { useSwara: false }); // ꦲꦶ
```

### Aksara Murda

Off by default. `{ useMurda: true }` plus an **uppercase** onset `N K T S P G B`.

| Latin | Default | `{ useMurda: true }` |
|---|---|---|
| `Na` | ꦤ | ꦟ |
| `Ka` | ꦏ | ꦑ |
| `Ta` | ꦠ | ꦡ |
| `Sa` | ꦱ | ꦯ |
| `Pa` | ꦥ | ꦦ |
| `Ga` | ꦒ | ꦓ |
| `Ba` | ꦧ | ꦨ |
| `Ni` | ꦤꦶ | ꦟꦶ |
| `na` | ꦤ | ꦤ |

```ts
toHonocoroko('Na');                     // ꦤ
toHonocoroko('Na', { useMurda: true }); // ꦟ
toHonocoroko('na', { useMurda: true }); // ꦤ
toHonocoroko('hanacaraka', { useMurda: true }); // ꦲꦤꦕꦫꦏ
```

Do not call `.toLowerCase()` first if you want Murda. The capital letter is the trigger.

### Numbers

`0`–`9` → `꧐`–`꧙`.

```ts
toHonocoroko('0');        // ꧐
toHonocoroko('123');      // ꧑꧒꧓
toHonocoroko('hana 123'); // ꦲꦤ ꧑꧒꧓
```

### Punctuation

| Latin | Javanese |
|---|---|
| `,` | ꧈ |
| `.` | ꧉ |
| `:` | ꧇ |

`?` `!` `@` and similar stay Latin unless `convertSpecialChars` is on.

```ts
toHonocoroko(',');      // ꧈
toHonocoroko('hana?');  // ꦲꦤ?
toHonocoroko('cara!');  // ꦕꦫ!
```

### Phonetic Latin extras

| Latin | Javanese | Notes |
|---|---|---|
| `f` | ꦥ꦳ | pa + cecak telu |
| `v` | ꦮ꦳ | wa + cecak telu |
| `z` | ꦗ꦳ | ja + cecak telu |
| `q` | ꦏ | treated as ka |
| `x` | ꦏ꧀ꦱ | treated as ks |

```ts
toHonocoroko('f'); // ꦥ꦳
```

### Spaces and mixed text

Spaces are kept. Letters and numbers can sit in one string.

```ts
toHonocoroko('ha na ca ra ka'); // ꦲ ꦤ ꦕ ꦫ ꦏ
toHonocoroko('hana 123');       // ꦲꦤ ꧑꧒꧓
toHonocoroko('');               // ""
```

## Options

```ts
interface TransliterationOptions {
  convertSpecialChars?: boolean; // default false
  strict?: boolean;              // default false
  useMurda?: boolean;            // default false
  useSwara?: boolean;            // default true
}
```

### `convertSpecialChars`

Default `false`: `?` `!` `@` stay Latin.

### `strict`

Default `false`: unmapped characters pass through, no `console` output.

`true` throws if a character has no mapping **and** is not in the preserved set:

```ts
toHonocoroko('apa§', { convertSpecialChars: true, strict: true });
// Error: No mapping found for character: § (U+00A7)

toHonocoroko('hana?', { strict: true }); // "ꦲꦤ?" — does not throw
```

### `useMurda` / `useSwara`

See [Aksara Murda](#aksara-murda) and [Standalone vowels](#standalone-vowels-aksara-swara).

## Reverse: `fromHonocoroko`

`fromHonocoroko` reads aksara + sandhangan + pangkon + cecak/layar/wignyan + cakra/pengkal as syllables.

```ts
fromHonocoroko('ꦧꦶ');                         // "bi"
fromHonocoroko('ꦧꦏ꧀ꦱꦺꦴ');           // "bakso"
fromHonocoroko('ꦮꦺꦴꦁ');                   // "wong"
fromHonocoroko('ꦏꦿ');                         // "kra"
fromHonocoroko(toHonocoroko('bisa'));        // "bisa"
fromHonocoroko(toHonocoroko('Na', { useMurda: true })); // "Na"
```

Notes:

- Taling (`ꦺ`) comes back as `é`, not plain `e`.
- Murda glyphs come back with a capital onset (`ꦟ` → `Na`).
- Reverse is built for text this library produced. Unusual hand-composed sequences may not round-trip.

## API

```ts
toHonocoroko(text: string, options?: TransliterationOptions): string
fromHonocoroko(text: string, options?: TransliterationOptions): string
transliterate(
  text: string,
  direction: 'toHonocoroko' | 'fromHonocoroko',
  options?: TransliterationOptions,
): string
```

## Fonts

This package does **not** ship a font. Output is Unicode. Display depends on the font on the system or page.

- [Noto Sans Javanese](https://fonts.google.com/noto/specimen/Noto+Sans+Javanese) (SIL OFL)
- [nyk Ngayogyan](https://aksaradinusantara.com/fonta/nyk-ngayogyan.font) (Apri Nugroho / Dinas Kebudayaan DIY)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Javanese&display=swap">
<style>
  .aksara { font-family: "Noto Sans Javanese", sans-serif; }
</style>
```

## What this version does not do

- Translation (meaning). Only script conversion.
- Every historical or rare aksara combination.

## Releasing

See [CHANGELOG.md](CHANGELOG.md). Publish by creating a GitHub Release tagged `vX.Y.Z`. `publish.yml` uses npm Trusted Publishing (OIDC).

## License

MIT © [Listiananda Apriliawan](https://www.naandalist.com/)

## Credits

Inspired by [transliterasijawa](https://github.com/bennylin/transliterasijawa).
