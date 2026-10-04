# Diaspora world-map heatmap (Learn mode)

## What it is

The Learn-mode world-map **diaspora** control (globe icon) colours destinations
for a chosen origin. It offers **two sourced measures** — pick the measure,
then the country:

1. **Off** — default map colours.
2. **Living abroad now (foreign-born stock, 2024)** — how many people *born in*
   the origin live in each destination today.
3. **Moved 2015–2020 (estimated flows)** — estimated people who *moved* from
   the origin to each destination during that five-year window.

Flag / passport·visa / diaspora / democracy layers stay mutually exclusive.

## What these numbers are — and are not

| Concept | In this feature? | Meaning |
|---------|------------------|---------|
| **Foreign-born stock** | Yes — “Living abroad now” | People born in O living in D at a point in time (census / register concept). Long-settled migrants still count. |
| **Period migration flow** | Yes — “Moved 2015–2020” | Estimated movers O→D during 2015–2020 (Abel & Cohen). |
| **Ethnic / ancestry “historical diaspora”** | **No** | e.g. Brazil-born Japanese-Brazilians whose grandparents migrated in the early 1900s. That is ancestry, not birthplace — no global bilateral matrix of that kind is bundled here, and we do not invent one. |

Example (Japan → Brazil):

- **Stock (2024):** ~59,000 Japan-born residents of Brazil (UN DESA).
- **Flow (2015–2020):** ~21,000 estimated movers Japan→Brazil in that window (Abel & Cohen).
- **Ethnic Nikkei community in Brazil:** on the order of 1–2 million — **not** shown; it is a different concept.

## Colours

Same green heatmap for both measures: light `#d8f3e0` → dark `#004d1a`, origin
black `#000000`, missing pairs stay neutral land. Log-scaled within the
selected origin’s own min→max.

## Sources — never fabricated

### Stock — UN DESA International Migrant Stock 2024 (active)

| Field | Value |
|-------|--------|
| Publisher | United Nations DESA Population Division |
| File | `undesa_pd_2024_ims_stock_by_sex_destination_and_origin.xlsx` (Table 1) |
| Year | **2024** (mid-year estimates, both sexes combined) |
| Bundled extract | `scripts/data/diaspora-migrant-stock-2024.csv` |
| Upstream xlsx sha256 | `0e10179d05186041a65cf5c6200943b2231701f9c1fd33cbbe21d23b8ea47316` |
| Licence | CC BY 3.0 IGO |

Stock uses UN DESA 2024 Table 1, providing the exact bilateral transpose of the
Learn-mode Migrant Origins layer (`docs/MIGRANT_ORIGINS.md`). When comparing
Diaspora (origin O → destination D) and Migrant Origins (destination D ← origin O)
for the same 2024 period, figures match identically.

### Stock — World Bank Global Bilateral Migration Matrix 1960–2020 (retained extract)

The World Bank 2020 extract remains in `scripts/data/diaspora-migrant-stock-2020-wb.csv`
and `scripts/data/diaspora-migrant-stock-2020-wb.meta.json` for historical comparison:

| Field | Value |
|-------|--------|
| Bundled extract | `scripts/data/diaspora-migrant-stock-2024.csv` |
| Meta | `scripts/data/diaspora-migrant-stock-2024.meta.json` |

The app’s stock mode reads the World Bank extract only. Do not remove either
stock CSV when adding flow (or other) layers.

### Flow — Abel & Cohen bilateral estimates (2015–2020)

| Field | Value |
|-------|--------|
| Citation | Abel & Cohen (2019), *Scientific Data* — [doi:10.1038/s41597-019-0089-3](https://www.nature.com/articles/s41597-019-0089-3) |
| Collection | [Figshare c.4470464](https://doi.org/10.6084/m9.figshare.c.4470464) (update using UN DESA IMS 2024 / WPP 2024) |
| Method | **`da_pb_closed`** (closed demographic accounting, pseudo-Bayesian) — the paper finds closed accounting methods correlate best with reported flows |
| Period | **2015–2020** |
| Bundled extract | `scripts/data/diaspora-migrant-flow-2015-2020.csv` |
| Licence | CC BY 4.0 |

These are **modelled** flows from stock changes, not raw border counts. Treat
them as estimates.

## How to refresh

```bash
# Stock — download Global-Migration-Matrix-1960-2020.zip from WDR 2023 data,
# unzip WBMM_1960_2020.xlsx, then:
node scripts/extract-diaspora-wb.mjs /path/to/WBMM_1960_2020.xlsx

# Flow — refresh scripts/data/diaspora-migrant-flow-2015-2020.csv from the
# Figshare CSV (year0=2015, da_pb_closed, UN-195 only); update .meta.json hashes.

node scripts/build-diaspora.mjs
npm run flags:check:diaspora
```

Do **not** hand-edit `src/data/diaspora.ts`.

## Enforcement

`scripts/check-diaspora.mjs` fails when stock/flow drift from their CSVs, when
Australia’s stock loses US/FR/DE/TH/KR, when the UI drops stock/flow wiring,
or when heatmap endpoints / log scale / home black drift.

## UI surfaces

| Piece | Path |
|-------|------|
| Toolbar dropdown | `src/components/DiasporaMapControl.tsx` |
| Below-map legend | `src/components/DiasporaMapLegend.tsx` |
| Colours + scale | `src/lib/diasporaColors.ts` |
| Data | `src/data/diaspora.ts` (`DIASPORA_STOCK`, `DIASPORA_FLOW`) |
| Wiring | `src/pages/LearnPage.tsx` |
