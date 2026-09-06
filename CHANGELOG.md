# Changelog

All notable changes to `@naandalist/honocoroko` are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [SemVer](https://semver.org/).

## [Unreleased]

Planned as **1.3.0**.

### Fixed

- `fromHonocoroko` is syllable-aware: `ꦧꦶ` → `bi`, pangkon no longer becomes `/` ([#9](https://github.com/Naandalist/honocoroko/issues/9)).
- Syllable-final `-ng` / `-r` / `-h` map to cecak, layar, wignyan ([#10](https://github.com/Naandalist/honocoroko/issues/10)).

### Added

- `useMurda` and `useSwara` options ([#11](https://github.com/Naandalist/honocoroko/issues/11)).
- Cakra / pengkal for `CrV` / `CyV`. `e` is pepet, `é`/`è` is taling ([#12](https://github.com/Naandalist/honocoroko/issues/12)).

## [1.2.2] - 2026-09-06

### Fixed

- Tests no longer compile into the published tarball. `exports.types` is first; `engines.node` is `>=18` ([#3](https://github.com/Naandalist/honocoroko/issues/3)).
- Removed unlicensed bundled fonts. README no longer mentions a nonexistent `HanacarakaFont.ttf` ([#4](https://github.com/Naandalist/honocoroko/issues/4)).
- Library code no longer calls `console.warn`. `strict: true` throws on unmapped characters ([#5](https://github.com/Naandalist/honocoroko/issues/5)).

### Changed

- README now describes 1.2.x behavior only: Murda, cecak/layar/wignyan, and cakra are not claimed ([#6](https://github.com/Naandalist/honocoroko/issues/6)).

### Added

- Exact fixture tests; known-broken reverse cases are skipped instead of asserted loosely ([#8](https://github.com/Naandalist/honocoroko/issues/8)).
- CI on push/PR to `main` (Node 18 and 20) ([#7](https://github.com/Naandalist/honocoroko/issues/7)).

## [1.2.1] - 2025-09-14

Published to npm as `@naandalist/honocoroko@1.2.1`. There was no matching GitHub Release at the time.

### Added

- Latin → Javanese (`toHonocoroko`) for Nglegena, sandhangan, pangkon, numbers, and basic punctuation.
- Javanese → Latin (`fromHonocoroko`) as a character lookup (not syllable-aware).
- Dual ESM / CommonJS build with TypeScript types.

[Unreleased]: https://github.com/Naandalist/honocoroko/compare/v1.2.2...HEAD
[1.2.2]: https://github.com/Naandalist/honocoroko/compare/v1.2.1...v1.2.2
[1.2.1]: https://www.npmjs.com/package/@naandalist/honocoroko/v/1.2.1
