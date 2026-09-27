# Visa-access world-map colouring (Learn mode)

## What it is

The Learn-mode world-map toolbar passport control (🛂, next to the flag overlay)
is a **dropdown**, not a simple on/off toggle:

1. **Off** — default map colours.
2. **Passport cover colours** — existing behaviour: each country is filled with
   the predominant colour of its bundled ordinary passport cover
   (`src/data/passportColors.ts`). Unchanged.
3. **Visa access for holders of…** — type to filter, or scroll, then pick any of
   the **195** UN members / permanent observers. The map then colours every
   country by what that passport can do there.

## Colours (visa-access mode)

| Category | Colour | Hex |
|----------|--------|-----|
| Visa free (incl. numeric visa-free day counts) | Green | `#1b7a3d` |
| Visa on arrival | Blue | `#2563eb` |
| eVisa / ETA (`e-visa` + `eta` in the source) | Yellow | `#ca8a04` |
| Visa required | Red | `#dc2626` |
| No admission (rare; sourced) | Dark red | `#7f0000` |
| Selected passport (home) | Black | `#000000` |

A legend under the map names the selected passport and lists these bands with
a **sourced count** per category (e.g. `Visa free (64 countries)`), taken from
the same matrix the map paints. Hover or tap a country for the category in the
data tooltip.

## Source — never fabricated

| Field | Value |
|-------|--------|
| Publisher | [Passport Index](https://www.passportindex.org) |
| Dataset repo | [imorte/passport-index-data](https://github.com/imorte/passport-index-data) (MIT) — successor to the archived [ilyankou/passport-index-dataset](https://github.com/ilyankou/passport-index-dataset) |
| Edition | **17 February 2026** |
| Upstream commit | `842d43ce5045a93b051af664e955310ccc9b7341` |
| Bundled extract | `scripts/data/passport-index-tidy-iso2.csv` |
| Generated runtime data | `src/data/visaAccess.ts` |

The generator (`scripts/build-visa-access.mjs`) keeps **only** the game’s 195
UN codes as passport holders and as destinations. Extra Passport Index entities
(HK, MO, TW, XK) are dropped — they are not parent nations here. Home cells
(`Requirement = -1`) are omitted; the overlay paints the selected country purple.

Raw Passport Index values map as follows (refuse unknown strings — do not guess):

| Source value | Category |
|--------------|----------|
| `7`–`360` (day counts) | visa-free |
| `visa free` | visa-free |
| `visa on arrival` | visa-on-arrival |
| `eta`, `e-visa` | evisa |
| `visa required` | visa-required |
| `no admission` | no-admission |
| `-1` | home (not stored) |

## How to refresh

```bash
# 1. Replace the CSV from upstream (record the new commit + edition in
#    scripts/build-visa-access.mjs SOURCE).
curl -sL https://raw.githubusercontent.com/imorte/passport-index-data/main/passport-index-tidy-iso2.csv \
  -o scripts/data/passport-index-tidy-iso2.csv

# 2. Regenerate + check
node scripts/build-visa-access.mjs
npm run flags:check:visa-access
```

## Enforcement

`scripts/check-visa-access.mjs` (`npm run flags:check:visa-access`, in
`npm run flags:check` and the `flag-integrity` / `check-proportions` CI job)
fails when:

- the generated file’s recorded CSV sha256 drifts from the bundled CSV;
- any UN-195 passport or destination is missing or disagrees with the CSV;
- an unknown requirement string appears;
- `LearnPage` / `PassportMapControl` / `VisaAccessMapLegend` /
  `visaAccessColors` lose their wiring or the five required colour keys.

Never weaken the check to force a row through — fix the extract or the mapping.

## Mutual exclusivity

Same as before: the passport map layer, the flag overlay, and the
democracy/index map layer turn each other off. Cities and era controls are
untouched.
