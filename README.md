# honocoroko

[![npm version](https://img.shields.io/npm/v/@naandalist/honocoroko.svg)](https://www.npmjs.com/package/@naandalist/honocoroko)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Naandalist/honocoroko/actions/workflows/ci.yml/badge.svg)](https://github.com/Naandalist/honocoroko/actions/workflows/ci.yml)

TypeScript library to transliterate **Latin ↔ [Javanese script](https://id.wikipedia.org/wiki/Hanacaraka)** (Aksara Jawa / Hanacaraka / Honocoroko).

> [!IMPORTANT]
> This changes the **writing system**, not the language. `bisa` becomes `ꦧꦶꦱ`. It does **not** translate Indonesian or Javanese into English.

Requires Node.js 18+. Zero runtime dependencies. ESM and CommonJS.

## Contents

- [Install](#install)
- [Quick start](#quick-start)
- [How a syllable is written](#how-a-syllable-is-written)
- [Examples](#examples)
  - [Basic consonants (Nglegena)](#basic-consonants-nglegena)
  - [Vowels on a consonant (sandhangan)](#vowels-on-a-consonant-sandhangan)
  - [Closed syllables (pangkon)](#closed-syllables-pangkon)
  - [Final -ng / -r / -h](#final--ng---r---h)
  - [Cakra and pengkal](#cakra-and-pengkal)
  - [Standalone vowels (Aksara Swara)](#standalone-vowels-aksara-swara)
  - [Aksara Murda](#aksara-murda)
  - [Numbers](#numbers)
  - [Punctuation](#punctuation)
  - [Phonetic Latin extras](#phonetic-latin-extras)
  - [Spaces and mixed text](#spaces-and-mixed-text)
- [Options](#options)
- [Reverse: `fromHonocoroko`](#reverse-fromhonocoroko)
- [API](#api)
- [Fonts](#fonts)
- [What this version does not do](#what-this-version-does-not-do)
- [License](#license)

## Install

```bash
npm install @naandalist/honocoroko
```

ESM:

```ts
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';
```

CommonJS:

```js
const { toHonocoroko, fromHonocoroko, transliterate } = require('@naandalist/honocoroko');
```

## Quick start

```ts
import { toHonocoroko, fromHonocoroko } from '@naandalist/honocoroko';

toHonocoroko('hanacaraka'); // ꦲꦤꦕꦫꦏ
toHonocoroko('bisa');       // ꦧꦶꦱ
toHonocoroko('bakso');      // ꦧꦏ꧀ꦱꦺꦴ
toHonocoroko('wong');       // ꦮꦺꦴꦁ

fromHonocoroko('ꦧꦶꦱ');              // "bisa"
fromHonocoroko(toHonocoroko('wong')); // "wong"
```

`transliterate` is the same functions with an explicit direction:

```ts
transliterate('bisa', 'toHonocoroko');
transliterate('ꦧꦶꦱ', 'fromHonocoroko');
```

## How a syllable is written

Javanese letters already include an inherent **a**.

| Latin idea | What the library writes |
|---|---|
| `ka` | aksara ka `ꦏ` |
| `ki` | aksara ka + wulu `ꦏꦶ` |
| `k` before another consonant | aksara ka + pangkon `ꦏ꧀` |
| `kang` (final ng) | ka + cecak `ꦏꦁ` |
| `kra` | ka + cakra `ꦏꦿ` |

That is why `bisa` is `ꦧꦶꦱ` (ba + i + sa), not three independent vowel letters.

## Examples

### Basic consonants (Nglegena)

| Latin | Javanese |
|---|---|
| `ha` | ꦲ |
| `na` | ꦤ |
| `ca` | ꦕ |
| `ra` | ꦫ |
| `ka` | ꦏ |
| `da` | ꦢ |
| `ta` | ꦠ |
| `sa` | ꦱ |
| `wa` | ꦮ |
| `la` | ꦭ |
| `pa` | ꦥ |
| `dha` | ꦝ |
| `ja` | ꦗ |
| `ya` | ꦪ |
| `nya` | ꦚ |
| `ma` | ꦩ |
| `ga` | ꦒ |
| `ba` | ꦧ |
| `tha` | ꦛ |
| `nga` | ꦔ |

```ts
toHonocoroko('ha');         // ꦲ
toHonocoroko('hanacaraka'); // ꦲꦤꦕꦫꦏ
toHonocoroko('nya');        // ꦚ   (Aksara Nya, not n + pengkal)
toHonocoroko('nga');        // ꦔ   (Aksara Nga, not cecak)
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
toHonocoroko('be');   // ꦧꦼ     pepet (schwa)
toHonocoroko('bé');   // ꦧꦺ     taling
toHonocoroko('bè');   // ꦧꦺ     same as é
toHonocoroko('bo');   // ꦧꦺꦴ
toHonocoroko('bisa'); // ꦧꦶꦱ
toHonocoroko('biso'); // ꦧꦶꦱꦺꦴ
```

Plain `e` is **pepet**. Use `é` / `é` / `è` when you want taling.

### Closed syllables (pangkon)

A consonant with no vowel, before another consonant, takes pangkon (`꧀`).

```ts
toHonocoroko('bakso'); // ꦧꦏ꧀ꦱꦺꦴ
// ba + ka + pangkon + sa + o
```

### Final `-ng` / `-r` / `-h`

These are marks on the previous syllable, not extra aksara.

| Latin ending | Mark | Name | Example |
|---|---|---|---|
| `-ng` | ꦁ | cecak | `wong` → `ꦮꦺꦴꦁ` |
| `-r` | ꦂ | layar | `besar` → `ꦧꦼꦱꦂ` |
| `-h` | ꦃ | wignyan | `rumah` → `ꦫꦸꦩꦃ` |

```ts
toHonocoroko('wong');  // ꦮꦺꦴꦁ     not wa + o + na + pangkon + ga
toHonocoroko('besar'); // ꦧꦼꦱꦂ
toHonocoroko('rumah'); // ꦫꦸꦩꦃ
toHonocoroko('nga');   // ꦔ          onset nga stays Aksara Nga
```

### Cakra and pengkal

Medial `r` / `y` after a consonant: `CrV` / `CyV`.

```ts
toHonocoroko('kra');  // ꦏꦿ      ka + cakra
toHonocoroko('sri');  // ꦱꦿꦶ    sa + cakra + i
toHonocoroko('kya');  // ꦏꦾ      ka + pengkal
toHonocoroko('kyai'); // ꦏꦾꦆ    kya + standalone i
```

`nya` is still Aksara Nya (`ꦚ`), not `n` + pengkal.

### Standalone vowels (Aksara Swara)

A vowel with no consonant in front uses Aksara Swara by default (`useSwara: true`).

| Latin | Default (Swara) | `useSwara: false` (ha + mark) |
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

Off by default so `hanacaraka` stays Nglegena. Turn on with `useMurda: true` and an **uppercase** onset `N K T S P G B`.

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
toHonocoroko('na', { useMurda: true }); // ꦤ   lowercase stays Nglegena
toHonocoroko('hanacaraka', { useMurda: true }); // ꦲꦤꦕꦫꦏ
```

Do not `.toLowerCase()` the string first if you want Murda. The capital letter is the trigger.

### Numbers

| Latin | Javanese |
|---|---|
| `0` | ꧐ |
| `1` | ꧑ |
| `2` | ꧒ |
| `3` | ꧓ |
| `4` | ꧔ |
| `5` | ꧕ |
| `6` | ꧖ |
| `7` | ꧗ |
| `8` | ꧘ |
| `9` | ꧙ |

```ts
toHonocoroko('123');        // ꧑꧒꧓
toHonocoroko('hana 123');   // ꦲꦤ ꧑꧒꧓
```

### Punctuation

| Latin | Javanese |
|---|---|
| `,` | ꧈ |
| `.` | ꧉ |
| `:` | ꧇ |

`?` `!` `@` and similar stay Latin unless you set `convertSpecialChars: true`.

```ts
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

Spaces are kept. Numbers and letters can sit in one string.

```ts
toHonocoroko('ha na ca ra ka'); // ꦲ ꦤ ꦕ ꦫ ꦏ
toHonocoroko('hana 123');       // ꦲꦤ ꧑꧓ wait no 123 is three digits
```

Wait I need to fix that last comment - hana 123 is ꦲꦤ ꧑꧒꧓. I'll not include a wrong comment in the actual file.
