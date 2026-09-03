# npm upgrade plan (Sept 2026)

## Deprecation warning sources

Warnings come from transitive deps, not direct control in most cases:

- `inflight@1.0.6`, `glob@7.2.3`/`8.1.0` — pulled by `browserify` (glob@7), `nyc` (glob@7, rimraf@3), `asciidoctor`→`@asciidoctor/opal-runtime` (glob@8). Old `nyc`/`rimraf` chain also pulls `glob@7`→`inflight`.
- `rimraf@3.0.2` — pulled by `eslint@8` (via `flat-cache`) and `nyc` (`istanbul-lib-processinfo`, `spawn-wrap`).
- `@humanwhocodes/config-array@0.13.0`, `@humanwhocodes/object-schema@2.0.3` — pulled by `eslint@8`. Fixed upstream in eslint 9 (renamed to `@eslint/config-array`, `@eslint/object-schema`).
- `uuid@8.3.2` — pulled by `nyc`→`istanbul-lib-processinfo`.
- `glob@10.5.0` — pulled by `mocha@11`. Newer major (glob 11) exists but mocha pins this; low priority.
- `eslint@8.57.1` — EOL per eslint.org, no more support.

Root cause: **eslint@8** and **nyc** (via old rimraf/glob/uuid) are main offenders. Upgrading these removes most warnings.

## Direct dependency upgrade targets

| Package | Current | Latest | Action |
|---|---|---|---|
| eslint | 8.57.1 | 10.9.1 | Upgrade → flat config, eliminates `@humanwhocodes/*`, `rimraf@3` deprecation from this chain |
| @drom/eslint-config | 0.12.0 | 1.0.0 | Upgrade together with eslint. v1.0.0 ships `eslint9/node22.js` (flat config). Update `eslintConfig` field → `eslint.config.js` flat format |
| chai | 5.2.0 | 6.2.2 | Upgrade, check ESM-only breaking changes (chai 5+ already ESM-only, verify 6.x changelog) |
| commander | ^13.1.0 | 15.0.0 | Upgrade, check CHANGELOG for breaking CLI API changes |
| fs-extra | 11.3.0 | 11.4.0 | Patch bump, safe |
| highlight.js | 11.11.1 | 11.12.0 | Patch bump, safe |
| mocha | 11.1.0 | 12.0.0 | Upgrade, resolves to newer `glob` internally too |
| nyc | 17.1.0 | 18.0.0 | Upgrade — check if 18.x drops old rimraf/glob/uuid chain |
| pdfjs-dist | ^5.1.91 (installed 5.7.284) | 6.3.289 | Major bump, check API changes used in `lib/` |
| puppeteer | 24.4.0 | 25.9.0 | Upgrade — current version flagged deprecated (`< 24.15.0 no longer supported`), security-relevant |
| wavedrom | 3.5.0 | 3.7.0 | Minor bump, safe |
| asciidoctor | 3.0.4 | 4.0.11 | Major bump, check breaking changes + confirm `@asciidoctor/opal-runtime` drops old glob chain |

## Eliminate / replace candidates

- **browserify@17.0.1** — old bundler (glob@7→inflight chain lives here). Only used in `lib/bundler.js`. Modern alternatives: `esbuild` (fast, no deprecated transitive deps) or `rollup`. Recommend migrating `lib/bundler.js` to esbuild API, drop browserify entirely.
- **lodash.range@3.2.0** — single-purpose micro-package (used in `lib/vreg.js`). Replace with native: `Array.from({length: n}, (_, i) => start + i)`. Drop dependency.
- **onml@2.1.0** — check for active maintenance/updates (`lib/render-all.js`). Verify no unmaintained transitive risk; if fine, keep.

## Verification steps

1. Bump direct deps in `package.json` per table above.
2. Migrate `eslintConfig` → flat `eslint.config.js` using `@drom/eslint-config/eslint9/node22.js` (or check for newer node target export).
3. Drop `browserify` + `lodash.range`; refactor `lib/bundler.js` (→ esbuild) and `lib/vreg.js` (→ native range).
4. Run `npm i`, confirm deprecation warnings gone or reduced (glob@7/inflight/rimraf@3/uuid@8/@humanwhocodes chain should disappear once eslint@8, nyc old-version, browserify removed).
5. Run `npm test` (`eslint lib/*.js`) + full test suite (mocha/nyc) + smoke-test CLI (`bin/cli.js`) to catch pdfjs-dist 6.x / puppeteer 25.x / asciidoctor 4.x breaking API changes.
6. Re-run `npm outdated` to confirm clean state.
