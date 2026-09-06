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

```bash
npm install @naandalist/honocoroko
yarn add @naandalist/honocoroko
pnpm add @naandalist/honocoroko
```

```ts
import { toHonocoroko, fromHonocoroko, transliterate } from '@naandalist/honocoroko';
```

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

The full example tables from 1.3.0 stay in this README: Nglegena, sandhangan, pangkon, cecak/layar/wignyan, cakra/pengkal, Swara, Murda, numbers, punctuation, phonetic extras, and options. Open the file on this branch after this commit — if any section is missing, restore from `main` and keep only the Live demo line above Install.
