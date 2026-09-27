# Migrant origins map

Learn-mode world-map colour layer: pick a **destination** country; every other
country is shaded by how many people **born there** live in that destination
(absolute international migrant stock).

## Product decisions (2026-09)

| Decision | Choice |
|----------|--------|
| Source | UN DESA Population Division — International Migrant Stock **2024** |
| Metric | Absolute stock (both sexes, mid-year 2024) |
| Selected destination | **Black** |
| Published **0** | Lightest blue |
| No country-level figure | Grey (missing ≠ zero) |
| Scale | Per-destination continuous blue (min → max among published origins) |
| UI | Toolbar control with searchable destination list; panel rows + legend citation |

## Source (authoritative — never fabricate)

- **Publisher:** United Nations Department of Economic and Social Affairs, Population Division  
- **Dataset:** International Migrant Stock 2024 — Destination and origin  
- **Page:** https://www.un.org/development/desa/pd/content/international-migrant-stock  
- **Workbook:** `undesa_pd_2024_ims_stock_by_sex_destination_and_origin.xlsx`  
- **Table used:** Table 1 — international migrant stock at mid-year by sex and by region/country of destination and origin, **2024** column, both sexes combined  
- **Citation:** United Nations Department of Economic and Social Affairs, Population Division (2024). International Migrant Stock 2024.  
- **Licence:** CC BY 3.0 IGO  

### What we keep / drop

- Only the game’s **195** UN members / permanent observers (same as `UN_MEMBER_CODES`).
- Country↔country pairs only (M49 location codes mapped via `scripts/data/iso3166-m49.json`).
- Region aggregates, development groups, and the residual **“Others”** origin bucket are **not** painted as countries.
- Self pairs (born in X living in X) are omitted; the destination is black by UI rule.
- An origin **absent** from a destination’s published country list is **no data**, not zero — UN DESA often folds residual stock into “Others”. Listed zeros are kept.

## Pipeline

1. `node scripts/extract-undesa-migrant-bilateral.mjs [xlsx]`  
   Downloads (or reads) the official workbook → writes  
   `scripts/data/undesa-ims-2024-bilateral-iso2.csv`
2. `node scripts/build-migrant-origins.mjs`  
   CSV → `src/data/migrantOrigins.ts` (with sha256 provenance)
3. `node scripts/check-migrant-origins.mjs` / `npm run flags:check:migrant-origins`  
   CSV ↔ generated file + UI wiring + spot-checks (e.g. US←MX, AU←GB)

## UI

- `MigrantOriginsMapControl` — toolbar icon; Off + searchable “People living in…” list  
- `getMigrantOriginsColorOverlay` — blue heatmap + black destination + grey gaps  
- `MigrantOriginsMapLegend` — scale + source note  
- `MigrantOriginsPanelRows` — stock / year / citation on the Overview fact-sheet when the layer is on  

Mutually exclusive with the flag overlay, passport map, and democracy/index map layers (same pattern as visa access).
