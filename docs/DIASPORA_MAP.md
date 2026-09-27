# Diaspora world-map heatmap (Learn mode)

## What it is

The Learn-mode world-map toolbar gains a **diaspora** control (globe icon,
next to the passport / visa-access control). It is a **dropdown**:

1. **Off** — default map colours.
2. **People born in… living abroad** — type to filter, or scroll, then pick
   any of the **195** UN members / permanent observers. The map then paints
   every *other* country as a **green heatmap** of how many people born in the
   selected origin live there.

The flag overlay, passport/visa layer, diaspora layer, and democracy/index
layer are **mutually exclusive** — turning one on clears the others.

## Colours

| Role | Colour | Hex |
|------|--------|-----|
| Fewest people (of destinations with a positive stock) | Light green | `#d8f3e0` |
| Most people | Dark green | `#004d1a` |
| Selected origin (home) | Black | `#000000` |
| Destination with **no** positive stock in the source | Neutral land | *(unchanged)* |

Intensity is **log-scaled** across the origin’s own min→max positive stocks
(skew is extreme: millions vs dozens). Equal min/max (a single destination)
maps to full dark green.

A legend under the map names the origin, shows the green gradient with the
sourced min→max counts, the origin swatch, the total people abroad and how
many destinations have a reported stock, and the UN DESA citation. Hover or
tap a destination for the exact stock in the data tooltip.

## Source — never fabricated

| Field | Value |
|-------|--------|
| Publisher | [United Nations DESA Population Division](https://www.un.org/development/desa/pd/content/international-migrant-stock) |
| Dataset | **International Migrant Stock 2024** |
| File | `undesa_pd_2024_ims_stock_by_sex_destination_and_origin.xlsx` |
| Sheet | **Table 1** — international migrant stock at mid-year, both sexes, by country of destination and origin |
| Year | mid-**2024** |
| Licence | **CC BY 3.0 IGO** |
| Upstream xlsx sha256 | `0e10179d05186041a65cf5c6200943b2231701f9c1fd33cbbe21d23b8ea47316` |
| Bundled extract | `scripts/data/diaspora-migrant-stock-2024.csv` (+ `.meta.json`) |
| Generated runtime data | `src/data/diaspora.ts` |

The generator (`scripts/build-diaspora.mjs`) keeps **only** the game’s 195 UN
codes as origins and destinations. Upstream aggregates (M49 ≥ 900) and
non-UN entities are dropped. Home cells (`origin === destination`) are
omitted; the overlay paints the selected origin black. **Zero / blank cells
are omitted** — never invented. A missing origin→destination pair on the map
simply stays the neutral land colour.

M49 numeric codes are mapped to ISO 3166-1 alpha-2 via
[lukes/ISO-3166-Countries-with-Regional-Codes](https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes)
(the same lineage used elsewhere in this repo for UN geography).

Coverage of the bundled extract (as of the 2024 file above): **195** origins,
**8,178** positive bilateral pairs. Some well-known corridors may be absent
from Table 1 for a given origin (the source simply has no positive cell) —
those destinations stay uncoloured rather than estimated.

## How to refresh

```bash
# 1. Download the official xlsx from the UN DESA page above, record its
#    sha256 in scripts/data/diaspora-migrant-stock-2024.meta.json, then
#    re-extract Table 1 country×country cells into
#    scripts/data/diaspora-migrant-stock-2024.csv
#    (origin,destination,stock — positive integers only; UN-195 only).

# 2. Regenerate + check
node scripts/build-diaspora.mjs
npm run flags:check:diaspora
```

Do **not** hand-edit `src/data/diaspora.ts` — it is generated.

## Enforcement

`scripts/check-diaspora.mjs` (`npm run flags:check:diaspora`, in
`npm run flags:check` and the `flag-integrity` / `check-proportions` CI job)
fails when:

- the generated file’s recorded CSV sha256 drifts from the bundled CSV;
- any UN-195 origin is missing, or any cell disagrees with the CSV;
- a home cell or non-UN code appears in the extract;
- `LearnPage` / `DiasporaMapControl` / `DiasporaMapLegend` / `diasporaColors`
  stop wiring the control, overlay, legend, green endpoints, home black, or
  log scale.

## UI surfaces

| Piece | Path |
|-------|------|
| Toolbar dropdown | `src/components/DiasporaMapControl.tsx` |
| Below-map legend | `src/components/DiasporaMapLegend.tsx` |
| Colours + scale | `src/lib/diasporaColors.ts` |
| Wiring | `src/pages/LearnPage.tsx` (`diasporaMapMode`, mutual exclusivity with flags / passport / democracy, `fillOverride`, data tooltip) |
| Legend gradient CSS | `.democracy-map-legend__gradient` in `src/App.css` |
