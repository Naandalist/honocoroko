# Contributing

One issue → one branch → one PR. Do not mix two issues.

## Setup

Node.js 18+.

```bash
git clone https://github.com/Naandalist/honocoroko.git
cd honocoroko
npm install
npm test
```

`npm test` builds ESM/CJS/types, then runs `node --test` on `dist/esm/test/*.test.js`.

## Branch names

```text
feat/<issue>-short-name
fix/<issue>-short-name
docs/<issue>-short-name
```

Examples: `feat/14-contributing`, `fix/9-from-honocoroko`.

Open the PR against `main`. Title matches the issue. Body includes `Closes #<n>`.

## How to add a punctuation mapping

Example: map `;` → `꧈` (only if that pairing is actually wanted).

1. Open an issue first. Describe the Latin character, the Javanese glyph, and a short source.
2. Add a row in `src/mappings.ts` inside `punctuation`:

```ts
export const punctuation: CharacterMapping[] = [
  { latin: ',', javanese: '꧈' },
  { latin: '.', javanese: '꧉' },
  { latin: ':', javanese: '꧇' },
  { latin: ';', javanese: '꧈' }, // new
];
```

`createPunctuationMap()` already reads that array. Reverse lookup uses the same list.

3. Add a fixture in `src/test/fixtures.ts` (or a focused test next to the other suites):

```ts
{ latin: ';', javanese: '꧈' }
```

4. Run `npm test`.
5. Mention the pair in README under Punctuation if the mapping is public API.

Do not add a mapping only in `transliterator.ts` if it belongs in `mappings.ts`.

Syllable rules (sandhangan, pangkon, cecak/layar/wignyan, cakra) are not a one-line map. Open an issue and expect a test-first change in `src/transliterator.ts`.

## What not to send

- Font files
- `console.log` / `console.warn` in library code
- Version bumps unless the issue is a release
- Unrelated README rewrites in a mapping PR

## Release

Maintainers only: bump `package.json`, update `CHANGELOG.md`, tag `vX.Y.Z` as a GitHub Release. `publish.yml` uses npm Trusted Publishing.
