# honocoroko

Pustaka TypeScript untuk **alih aksara** Latin ↔ [Aksara Jawa](https://id.wikipedia.org/wiki/Hanacaraka) (Hanacaraka / Honocoroko).

Ini mengganti **sistem tulisan**, bukan bahasa. `bisa` menjadi `ꦧꦶꦱ`. Bukan penerjemah Indonesia ↔ Inggris atau Jawa ↔ Indonesia.

Demo: [naandalist.github.io/honocoroko](https://naandalist.github.io/honocoroko/?lang=id)

Dokumentasi lengkap (Inggris): [README.md](README.md)

## Pasang

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

## Pakai

**ESM**

```ts
import { toHonocoroko, fromHonocoroko } from '@naandalist/honocoroko';
```

**CommonJS**

```js
const { toHonocoroko, fromHonocoroko } = require('@naandalist/honocoroko');
```

## Tiga contoh

```ts
toHonocoroko('hanacaraka'); // ꦲꦤꦕꦫꦏ
toHonocoroko('bisa');       // ꦧꦶꦱ
toHonocoroko('wong');       // ꦮꦺꦴꦁ

fromHonocoroko('ꦧꦶꦱ'); // "bisa"
```

`e` = pepet (`ꦼ`). `é` / `è` = taling (`ꦺ`).

## Banding singkat

`@naandalist/honocoroko` adalah transliterator TypeScript kecil (tanpa dependensi runtime). Bukan kamus. Pustaka lain seperti `carakanjs` punya cakupan aksara yang berbeda; bandingkan output untuk kata yang sama sebelum mengganti.
