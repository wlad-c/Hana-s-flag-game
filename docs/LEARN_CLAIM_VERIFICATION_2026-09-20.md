# Learn claim and artwork verification — 20 September 2026

> **Remediation is under way.** A Cursor cloud agent is implementing these findings, and continuing the audit, from 27 September 2026. Who is fixing what, the branch/PR, and the status of every finding are in [Remediation log](#remediation-log--cursor-agent-from-27-september-2026) at the end of this file. Read it before starting a fix, to avoid duplicate work.

**Universal verification is not complete.** This report records completed full-dataset comparisons and new image/metadata findings. It does not certify all 4,638 records in the seven large registries at `db3ba05`, every sentence, every historical date, every boundary or all artwork as correct. Unchecked and unresolved claims remain explicitly unverified; an image decoding successfully or matching a third-party download does not establish authenticity.

This supplements [the original audit](LEARN_FACTUAL_AUDIT_2026-09-13.md) and [the continuation findings F40–F59](LEARN_FACTUAL_AUDIT_2026-09-19.md). No application data was changed by Codex during the audit work recorded below. Implementation by other agents must be tracked in the shared log. The evidence ledgers below are intended to preserve both positive verification and failures for subsequent work.

## Shared agent coordination and progress log

**Coordination checkpoint: 27 September 2026, 14:02 Australia/Melbourne (04:02 UTC).** The owner reports that an **Opus 5.5 agent** has been asked to implement findings identified so far, then continue the audit while implementing newly established fixes. This section records that assignment; it does **not** establish that Opus has read this document, started a particular item, or completed any fix. Each agent must record its own observed work here.

This document is the shared audit and implementation record. The detailed JSON files under `docs/audit/` remain supporting evidence. Existing dated findings describe the revision actually inspected and must remain recoverable after corrections.

### Ownership and current state

| Agent | Assigned or observed role | Last documented state | Scope / handoff |
|---|---|---|---|
| Codex, this audit thread | Independent factual/artwork audit; audit-document edits only | F104–F107 narrative recovered; F105 names and F106 exact public asset verified; F108 open. All 29 new Norway population values match SSB. | Latest application baseline `081f2dea`; observed public build `38b87bc`. F104/SF-17, F107 wording dispute and broader unchecked coverage remain open; preserve other agents' implementation records. |
| Opus 5.5 (Cursor cloud agent) | Implement findings and continue audit; see detailed remediation log | Corrections are now on `main`, as documented in Opus's log and observed through `7c75c318`; earlier PR #1709 branch-only state is superseded. | R01, R02, … remain Opus finding IDs. Independent verification and deployment are recorded separately per finding; do not treat merged as verified. |
| Claude Code, sub-national flag audit (branch `claude/subnational-flags-audit-pc1zvz`) | Audits and fixes sub-national and capital-city flags, their explainers, the capitals behind them and the Sub-national flags quiz; ships by PR, each confirmed live | Batches 1–6a live (#1703–#1708); batch 6b live (#1717, `6d8406e`); batch 7 claimed | Method, status and the claimable SF-01…SF-16 queue: [`SUBNATIONAL_FLAG_AUDIT_HANDBOOK.md`](SUBNATIONAL_FLAG_AUDIT_HANDBOOK.md). Evidence per decision: [`SUBNATIONAL_FLAG_AUDIT_2026-09.md`](SUBNATIONAL_FLAG_AUDIT_2026-09.md). Any agent may claim an SF item there and here. |

### Required work record for every participating agent

Before starting a batch, add or update a row below with the agent, timestamp, finding IDs or precisely bounded new audit scope, affected files, current status and reason for the change. Read the current document and repository revision first. Do not assume an old local copy reflects another agent's work.

Use explicit statuses: **claimed**, **investigating**, **implemented — awaiting verification**, **independently verified**, **blocked**, or **superseded**. A source comparison that confirms existing data is a verified check, not an implemented fix. Keep unsupported claims and conflicting sources unresolved.

For each implementation, record:
- Finding ID, exact change and factual reason, including primary evidence and relevant historical/as-of dates.
- Commit or PR, affected records/assets/files, and any linked evidence-ledger update.
- Validation actually performed and its outcome. Structural checks, successful image decoding and a passing build do not establish factual or visual identity.
- Remaining limitations and deployment status. Keep implementation, independent verification and public deployment as separate milestones; identify the verifying agent and revision.
- Any departure from a recommendation and its evidence. Do not silently convert an unresolved candidate into a confirmed error.

Preserve existing finding IDs and dated evidence. Mark a finding's resolution alongside it or link its resolution row here; do not erase the original diagnosis. Refresh the document before allocating new F-numbers; **F103 is the highest numbered finding at the 28 September national-symbol checkpoint**, not a permanent reservation for any agent. Merge concurrent documentation changes and use the current file SHA when saving; never overwrite another agent's progress with a stale full-file copy.

### Work and resolution ledger

| Updated (timezone stated) | Agent | Finding / bounded scope | Status | Action and reason | Commit / validation / remaining work |
|---|---|---|---|---|---|
| 2026-10-01, Melbourne | Codex | F105/F106 independent remediation checks; new F108; Norway population comparison | Independently verified — bounded checks; F108 open | Restored missing F104–F107 narrative (`38b87bc`); exact corrected Khmelnytskyi asset publicly served; Guyana names corrected; all 29 Norwegian county/municipal values match SSB. BIOT still serves the pre-October-2025 artwork beside the new Tudor Crown caption. | Evidence `15c5fa2`; application `081f2dea`, public `38b87bc`. No application edits. F104/SF-17 and F107 wording disagreement remain open; broader audit incomplete. |
| 2026-10-01 22:13 Melbourne / 12:13 UTC (request time) | Codex | Restore September 30 F104–F107 narrative; independently review fixes and batches 8a–8e through `081f2dea` | Investigating | Recovered evidence `c95ff6f`; preserve subsequent implementation entries. F107 legal-event wording remains disputed, F104 queued as SF-17. | Audit/documentation only. No application edits. |
| 2026-10-01 12:45 Melbourne / 02:45 UTC | Claude Code (sub-national flag audit) | Batch 8e: capital flags for Norway's county seats (SF-18) | Verified in the running app: the capital cards for Stavanger, Bodø, Drammen, Hamar, Steinkjer, Tromsø and Vadsø paint their flags with sourced explainers and 2026 populations; Molde, Kristiansand, Skien and Tønsberg show none; no page errors or remote requests. Capital-flag, collision, name-agreement, transparency and ratio checks pass; merge pending | Only Sarpsborg, Oslo and Bergen had capital flags: the pipeline reads Norwegian town items, which carry no P41. Seven municipal flags added, each checked against FOTW and Lovdata or the National Archives (Steinkjer flies Verran's flag since the 2020 merger); four withheld because no source documents the flag flown today. | PR pending; evidence in the ledger's Batch 8e section. |
| 2026-10-01 11:45 Melbourne / 01:45 UTC | Claude Code (sub-national flag audit) | Batch 8d: Norway's 2024 counties | Verified in the running app: the sub-national grid lists the 15 counties of 2024 (no 2019 county names), 12 county flags paint (Akershus at its portrait ratio, Trøndelag with its white field), Innlandet, Telemark and Vestland show none; 15 panels probed with their explainers, 2026 populations and capitals (Sarpsborg, Oslo and Bergen with their flags); no page errors, no remote requests. `flags:check` and `npm run build` pass. Live (`438923f`, 11:58 AM AEST 1 October 2026) | Norway's map still showed the 19 counties abolished in 2020. It now has the 15 counties of 2024 from Kartverket's boundaries (checked against Kartverket's API), with re-keyed meta, capitals, SSB 1 January 2026 populations (summing to the national total) and capital flags. 7 county flags added and 2 corrected; 3 withheld with reasons; 8 explainers added and 2 corrected. Saransk's capital flag re-encoded to UTF-8 so the capital-flag checks read it. | #1737 `438923f`; evidence in the ledger's Batch 8d section. |
| 2026-10-01 03:53 Melbourne / 17:53 UTC | Claude Code (sub-national flag audit) | Batch 8c: explainers for the last 30 shown sub-national flags | Live (`e095aa4`, 10:42 AM AEST 1 October 2026); verified in the running app (16 views probed: 15 render the new explainer beside a painted flag; New Taipei's view does not open because Taiwan has no country panel, logged under SF-16) | 30 sourced explainers for British, Australian and New Zealand territories, the Faroes, Åland, Taiwan and Tibet (under China), Kosovo, Western Sahara, Northern Cyprus, Paris, Érd and New Taipei; myth-versus-fact for Kosovo's stars and Northern Cyprus's stripes. `subdiv-remaining` reads 0 and the omission audit is clean. | #1736 `e095aa4`; evidence in the ledger's Batch 8c section. |
| 2026-10-01 03:36 Melbourne / 17:36 UTC | Claude Code (sub-national flag audit) | Batch 8b: Codex's 30 September findings F104–F107 (see its `SUBNATIONAL_DELTA_VERIFICATION_2026-09-30.json`) | Live (`43d1594`, 3:51 AM AEST 1 October 2026); verified in the running app (Khmelnytskyi's capital card paints the council's flag; Demerara-Mahaica shows Triumph, 3,788; Mahaica-Berbice shows Fort Wellington, 33) | F106 fixed: Khmelnytskyi's capital flag is now the council's own artwork (16 rays; byte-identical to khm.gov.ua flag_0.png), replacing a 12-ray SVG redraw. F105 fixed: Guyana Region 4's capital is Triumph (RDC seat per DPI Guyana and the Ministry of Education; was Georgetown on the map, Paradise on the card); Region 5 gains Fort Wellington; populations from Statistics Guyana's 2012 village census (3,788 and 33). F104 queued as SF-17 (co-capitals need a list-valued subdivision capital). F107: the NHCP seal page re-read and supports the La Trinidad explainer. | #1735 `43d1594`; evidence in the ledger's Batch 8b section. |
| 2026-10-01 03:22 Melbourne / 17:22 UTC | Claude Code (sub-national flag audit) | Batch 8a: Guatemala's 22 department flags, Mexico City, and an explainer-key gate | Verified in the running app: Guatemala's grid shows 22 departments, 17 flags painted and 5 placeholders; 24 panels probed with no page errors and no remote requests; 7 new explainers render; shared capitals (Escuintla, Huehuetenango, Quetzaltenango) show the flag once; Mexico City shows its arms explainer as a Federal Entity. `flags:check` passes. Live (`bdf5026`, 3:35 AM AEST 1 October 2026) | The app showed no Guatemalan department flag: 9 files sat under ISO's 2021 numeric codes, 4 of them another entity's flag. 17 department flags bundled after checking each against FOTW; Petén from its 1998 creating agreement (FOTW's image is wrong); Huehuetenango's 1955 flag, official for city and department since 1987. Withheld: Baja Verapaz, Guatemala, Quiché, Sololá, Zacapa. 7 sourced explainers, 10 FOTW-cited omissions. Capital flags: Flores and San Marcos removed, Huehuetenango and Quetzaltenango shared; 5 capital explainers removed and 3 rewritten (unsupported colour meanings, a wrong ring text, a dead source). Mexico City's explainer re-keyed MX-CMX → MX-DIF and the entity renamed from "Mexico"; VE-A renamed Capital District. New gate in check-flag-meanings (E: key must be a shown code; F: explainer must sit beside a flag), both branches exercised. | #1734 `bdf5026`; evidence in the ledger's Batch 8a section. |
| 2026-09-30 23:22 Melbourne / 13:22 UTC (request time) | Codex | Independent review of changes since `011e0065`, through observed head `3528c20d`: geography/capital identity and newly reachable flag explainers | Investigating | Read shared log; 23 commits inventoried. Audit/documentation only; preserve Claude Code and Opus implementation ownership. Prior F93–F103 remain open unless independently resolved. | Will separate repository/source checks from rendered/live verification. No application edits. |
| 2026-09-30 20:23 Melbourne / 10:23 UTC | Claude Code (sub-national flag audit) | Batch 7e: the capital flags the name fixes made visible | Live (`342a5e0`, 8:48 PM AEST 30 September 2026); verified in the running app (17 capitals probed: 11 new explainers render with their flags, including Khmelnytskyi's new flag; Granada, Huacho and Areguá show no flag; Juba and Estelí show their flags without an explainer; Washington's name no longer has a doubled space) | 32 sourced explainers; Khmelnytskyi's capital flag replaced by the 2017 city flag; Granada, Huacho and Areguá capital flags removed; 11 omission lines rewritten; new stale-omission gate in check-city-flag-meanings. Banjarbaru and Juba were first rejected on an incomplete FOTW keyword search and restored after the regional FOTW pages documented both. | #1733; evidence in the ledger's Batch 7e section. |
| 2026-09-30 09:29 Melbourne / 23:29 UTC | Claude Code (sub-national flag audit) | Batch 7f (SF-07): capital flags that belong to someone else | Live (`1a7c5fe`, 7:49 PM AEST 30 September 2026); verified in the running app (14 capitals probed: 11 removed show no flag, the 3 kept paint with their explainers) | 20 removed with evidence in `capital-flag-rejected.json`: governorate flags in four Egyptian capital slots, Guatemalan department variants for Jalapa and Jutiapa, Pasco Province's flag for Cerro de Pasco, Irish county GAA colours for Cork, Limerick, Longford and Waterford, an unsourced Tullamore bicolour, the Abuja and San Carlos logos, a photograph for Luxembourg City, unsourced drawings for Sokhumi (Commons-tagged factual accuracy) and Gori (FOTW gives the 2010 decree flag), Querétaro's Commons proposal (tagged fictitious), Jinotepe's stripes without its arms, and Timișoara's 1941 flag. Three kept after checking (Gap, Escuintla, Antigua Guatemala): the designs are the cities' documented flags. | #1732; evidence in the ledger's Batch 7f section. |
| 2026-09-30 09:05 Melbourne / 23:05 UTC (29 Sep) | Claude Code (sub-national flag audit) | Batch 7d (SF-02 done): the last 12 quiz capitals, 8 wrong-entity capital flags, and the capital-name gate | **Live** | Wikidata-side pins in `CAPITAL_CITY_QIDS` (Denpasar, Kendari, Palangka Raya, Herisau, Ponta Delgada, Pesaro, Cesena, Olbia, Sanluri, Nenagh, Luhansk, Donetsk), each citing the city's item and why; Tokyo's seat ward (Shinjuku) is not a capital. Capital flags replaced for Herisau, Ponta Delgada and Luhansk; Donetsk's slot already held Donetsk's flag under Kramatorsk's name. Rejected with evidence: five 1941 Hungarian-era city flags (Bistrița, Baia Mare, Zalău, Satu Mare, Sombor), Santa Isabel's colonial flag for Malabo, Banjarmasin's flag on Central Kalimantan, Tipperary's GAA colours. Five new sourced explainers; Pesaro's rewritten. New gate `check-capital-name-agreement.mjs`: 81 → 0 disagreements. | #1730 `28316d5`; live build confirmed 09:25 Melbourne (30 Sep) by `check-live-build.mjs`; evidence in the ledger's Batch 7d section. |
| 2026-09-30 01:30 Melbourne / 15:30 UTC | Claude Code (sub-national flag audit) | Batch 7c (SF-02): quiz capitals whose name disagreed with the Learn panel's capital, 76 → 12 | **Live** | Map-side fixes in `scripts/build-cities.mjs`, each citing the capital's Wikidata item. 43 same-city spelling or renamed-city aliases (e.g. Kropyvnytskyi, Manas after its 2025 renaming, Santa Tecla). 13 overrides where Natural Earth tags another city it also has (Caracas, Juba, Bayamo, Badajoz…). A new `NE_CAPITAL_BLOCK` for 10 where Natural Earth lacks the real capital, so the Wikidata fallback supplies it (Kolonia, Gori, Banjarbaru, Nof HaGalil, Magas…). Laguna pinned to Santa Cruz in the fallback generator (`GAP_CAPITAL_CITY_QIDS`, sourced to en.wikipedia). Markers can now belong to several territories (`ownerCodes`), so Oslo and Akershus both reveal "Oslo". The remaining 12 are Wikidata-side, for 7d. | #1728 `67773b5`; live build confirmed 01:59 Melbourne (30 Sep) by `check-live-build.mjs`; evidence in the ledger's Batch 7c section. |
| 2026-09-29 21:30 Melbourne / 11:30 UTC | Claude Code (sub-national flag audit) | Batch 7b: map polygons carrying another region's code in Ecuador, Eritrea, Guyana, Afghanistan, Latvia and Uganda | **Live** | Found by a scan of every polygon against Wikidata. Each region's own coordinates and its capital's coordinates should fall inside the polygon carrying its ISO code. The scan is now `scripts/flag-audit/geo-code-scan.mjs`. Swapped or rotated outlines: Napo/Tungurahua, four Eritrean regions, eight Guyanese regions. Swapped or old codes: Paktia/Paktika, Sala/Salacgrīva, and 33 Ugandan districts on the pre-2010 numbering, plus Kiruhura drawn as a second Mbarara. Properties moved with the geometry byte-identical; derived files regenerated for these countries only. Uganda's "County" types corrected to District, and Kampala's to City. | #1727 `8311a07`; live build confirmed 01:32 Melbourne (30 Sep) by `check-live-build.mjs`. |
| 2026-09-29 20:00 Melbourne / 10:00 UTC | Claude Code (sub-national flag audit) | Batch 7a (part of SF-02): Iran's 31 provinces re-keyed to the current ISO 3166-2:IR codes | **Live** | Every province showed another province's population, capital and native name (Hormozgan showed Tehran Province's 13.27 million), because the map used pre-2018 codes and the Wikidata-keyed data the current ones. Codes from Wikidata P300 per province item, matching the ISO table on en.wikipedia; geometry unchanged. Files: `public/subdivisions/IR.json`, the code aliases, regenerated meta/`cities.ts`/national-capital host (Iran lines only), `capitalDetails.ts` + endonyms (Iran lines only, from a fresh Wikidata run), `subdivisionPopulation.ts` (stray IR-31 removed), `subdivisionCapitals.ts` (Alborz → Karaj, Q36529), and a cited `SUBNATIONAL_NAME_ALIAS` table in `build-cities.mjs` (Bushehr, Bandar Abbas, Bojnord). All 31 provinces checked in the running build. | #1720 `141cf7f`; live build confirmed 20:22 Melbourne by `check-live-build.mjs`. |
| 2026-09-29 19:45 Melbourne / 09:45 UTC | Claude Code (sub-national flag audit) | SF-02, batch 7: the 81 quiz capitals whose name disagrees with the Learn panel's capital (spellings, outdated map capitals, wrong Wikidata capitals incl. Iran's ISO-code drift), then the same agreement check in the quiz | Claimed | Classify each mismatch against a primary or authoritative source and fix it where it is wrong; never drop a correct question. Files: `scripts/build-cities.mjs` + `src/data/cities.ts`, `src/lib/capitalInfo.ts`, `src/lib/playableSubdivisions.ts`, `scripts/data/wikidata-capital-rejected.json`, `scripts/build-capital-details.mjs` + generated capital files, a new check | Batch 6b (#1717, `6d8406e`) is live. |
| 2026-09-29 19:03 Melbourne / 09:03 UTC | Claude Code (sub-national flag audit) | Audit handbook and open-work queue for sub-national and capital-city flags | Documented | Owner asked for goals, approach and progress to be written down so other agents can continue the work in parallel. The handbook covers the method, file checklists, the patterns found, the tools (`scripts/flag-audit/`), the status and the SF-01…SF-16 queue, with a claim protocol that points back to this log. | Docs and helper scripts only; application unchanged by this entry. |
| 2026-09-29 19:03 Melbourne / 09:03 UTC | Claude Code (sub-national flag audit) | SF-01, batch 6b: quiz accepts identical capital flags (47 sourced groups); 11 capital flags removed (Rimini, Teramo, Oristano, Damascus ×2, six Moroccan province/wilaya flags); IT-TA/TR/UD province flags suppressed; Belarus Minsk types/names; BG-23 and IT-GE names; Grenoble explainer | **Live** — implemented, awaiting independent verification | Evidence per change in the ledger's Batch 6b section. Files: `src/data/identicalSubdivisionFlags.ts`, `src/hooks/useSubdivisionGame.ts`, `scripts/check-identical-subdivision-flags.mjs`, capital-flag manifest/rejections/`capitalFlags.ts`, `cityFlagMeanings.ts`, `flagMeanings.ts` (IT-TA/TR/UD only), `src/api/subdivisions.ts`, `subdivisionFlagIndex.ts`, `build-subdivision-meta.mjs` + meta, `cityTerritories.ts`. | #1717. Before merging: `npm run flags:check`, `npm run build` (UI checks + `tsc`) passed; in the running build, `scripts/flag-audit/learn-check.mjs` confirmed the removed flags no longer show and Minsk Region's capital card shows Minsk's flag, and a Belarus mixed-deck game accepted both Minsk answers. Merged as `6d8406e`; `check-live-build.mjs` at 7:39 PM Melbourne: the live site serves `6d8406e` (built 09:37 UTC). |
| 2026-09-26 (batches 1–6a; recorded 2026-09-29) | Claude Code (sub-national flag audit) | Sub-national and capital-city flag audit, batches 1–6a | **Live** | #1703 `2d5745a` (91 wrong-entity flags suppressed, 10 replaced, ≈350 CDN flags bundled, mis-coded divisions); #1704 `1466a98` Malaysia; #1705 `7c0c061` South Korea; #1706 `ab8cea4` Czechia, Poland, Estonia; #1707 `9e8449e` gap flags + identical-flag quiz gate; #1708 `e3c1a35` North Sulawesi/Schellenberg capitals. | Each merge confirmed live with `check-live-build.mjs` at the time. Codex screened the `e3c1a35` image delta (76 subdivision, 2 capital flags); its F84–F86 were fixed by Opus in `f0c9407`. |
| 2026-09-28, Melbourne | Codex | F99–F103: NZ flag chronology, two historical captions/variants, Māori attribution, passport series | Independently verified — bounded source/image checks | Eleven images screened; nine declared hashes match; national/Union flag chronology, royal/United Tribes images, Māori design date/credit and passport series findings saved. | Evidence `0934d44`; official government/PRADO sources; positive arms/design checks retained. No fixes implemented; no country-wide certification. |
| 2026-09-28, Melbourne | Codex | New Zealand current national flag, coat of arms and passport descriptions/assets | Investigating | Resume previously exploratory national-symbol checks against NZ government sources. Audit-only; historical symbols separately bounded if inspected. | Baseline `044711a5`; no application edits. |
| 2026-09-28, Melbourne | Codex | F61 current caption reconciliation | Independently verified — bounded visual check | Four mismatches remain; four records removed; Ukraine caption broadened; Japan Times finding withdrawn as auditor error. Four variant caveats remain. | Ten retained asset hashes match original ledger. Evidence `dc8df7a`; original Japan Times verdict marked superseded at `bf85d28`. Static visual check, not browser certification. |
| 2026-09-28, Melbourne | Codex | F61: ten media caption/pixel mismatches and four variant caveats at `044711a5` | Investigating | Re-open exact bundled assets and current captions; preserve identity/current-brand uncertainty separately. Audit-only. | No application edits or ownership overlap with Opus; evidence and outcomes to follow. |
| 2026-09-28, Melbourne | Codex | F93–F98; migration delta through `044711a5` | Independently verified — findings; fixes unclaimed | All 10,037 positive World Bank pairs match; 27,019 zero cells dropped; temporal/definition, refresh, legend and live-check assurance issues documented. | Evidence `6c0c09e`; migration checks pass internally; live build `71e380b` verified; UN/flow downloads 403 and browser stalled. Not universal completion. |
| 2026-09-28 14:59 Melbourne / 04:59 UTC (claim commit time) | Codex | Changes since `bf7b7709` through `044711a5`: new diaspora stock/flow and migrant-origin layers, 31 changed files | Investigating | Owner reconfirmed Opus implementation/continuation assignment. Codex claims independent audit of new migration datasets, extraction/mapping, labels and public rendering; application fixes remain with Opus. Preserve all existing remediation entries. | Four new commits inventoried. Checking primary-source definitions and reproducibility; no new findings or deployment claims yet. |
| 2026-09-27 14:02 Melbourne / 04:02 UTC | Codex | Shared coordination record | Documented | Record owner's Opus assignment and distinguish implementation from independent verification | Application unchanged. Read repository head `2e3838a12fade330945ba1e37161f157358e0d66` before this update; no Opus implementation commit was visible in the latest five commits inspected. |
| 2026-09-27, before coordination checkpoint | Codex | F87–F89; NZ party facts, logos/metadata, public bundle; 842-record position consistency scan | Audit evidence saved; fixes not implemented by Codex | See findings and linked ledgers below; exact artwork versions and source conflicts remain qualified | Report/evidence commits `014d3a4`, `1146207`, `3589908`, `8eda019`, `2e3838a`; saved files read back and verified. |
| 2026-09-27, owner report | Opus 5.5 | Existing findings and subsequent audit/fix work | Assigned; awaiting agent's own scope/progress entry | Owner requested implementation and continuation in parallel with documentation | Opus to record claimed batches, actual commits and validation here. No completion inferred. |
| 2026-09-27 14:10 Melbourne / 04:10 UTC | Opus 5.5 | F16, F29–F33, F39, F41, F42 (country facts: languages, currencies) | Implemented — awaiting verification | Each value re-checked against the constitution / central bank cited. Corrections live in `src/data/countryFactCorrections.json`, applied by `scripts/build-country-facts.mjs` and after the REST Countries merge in `src/api/countries.ts` (the structural fix for F39). Also fixed the rand symbol in Zimbabwe's list ("Rs" → "R"). | Commit `e154089e`. `countryFacts.ts` patched in place for these 10 codes only (no full regeneration). Not merged. |
| 2026-09-27 14:10 Melbourne / 04:10 UTC | Opus 5.5 | F02 (Japanese passport emblem) | Implemented — awaiting verification | MOFA passport Q&A Q30: no legal national emblem, stylised single-row chrysanthemum since 1926. Bundled cover image opened and confirmed. Imperial Seal explainer adjusted to match. | Commit `8ea7a3b4`; `check-national-flags` passes. |
| 2026-09-27 14:10 Melbourne / 04:10 UTC | Opus 5.5 | F35, F36 (socialist Bosnia canton; Cuban presidential flag) | Implemented — awaiting verification | Rendered both images first. Bosnia canton is blue-white-red; the "never adopted symbols of its own" claim was also false (the republic had its own arms) and is removed; the Fandom citation is replaced. Cuba: the Grokipedia text contradicted the official blazon; the flag is dated 1959 and its arms 1849 / 1906 decree. | Commit `02d2d601`; `check-national-flags`, `check-user-facing-copy` pass. |
| 2026-09-27 14:13 Melbourne / 04:13 UTC | Opus 5.5 | F38: the 23 Grokipedia / Fandom citations in `scripts/data/national-flag-sources.json` (10), `src/data/flagMeanings.ts` (12), `src/data/tourismLogos.ts` (1) | Part 1 implemented — awaiting verification; part 2 claimed | Re-check each claim against a stronger source (primary law, the subject's own article, FOTW); trim what no stronger source supports rather than re-cite it. Found during this batch: **R01**, the Moroccan royal standard is described as \"the national flag in the canton\" but the bundled image is a green field bearing the **1957 coat of arms**. | Part 1 commit `97b3eff4` (10 national-symbol explainers + R01). Part 2 still claimed by Opus: 12 subdivision citations in `flagMeanings.ts`, 1 in `tourismLogos.ts`. |
| 2026-09-27 14:45 Melbourne / 04:45 UTC | Opus 5.5 | **R02** (new): country widget Languages row capped at four | Implemented — awaiting verification | `EntitySummary.tsx` showed `languages.slice(0, 4)` with no sign more existed, so Zimbabwe's 16 constitutional languages showed as 4 (Nambya hidden) and Bolivia's 37 as 4. This hid the F33/F41 corrections and silently reduced the fact-sheet. The row now lists every language, as the Currencies row already did. | Checked in the running app (headless Chrome): ZW 16, BO 37, the long row wraps with no horizontal overflow. |
| 2026-09-27 14:45 Melbourne / 04:45 UTC | Opus 5.5 | In-app check of F02, F35, R01, F16/F41 | Checked in running app | Dev server on this branch. Japan passport shows the single-chrysanthemum text and image; the Moroccan royal standard shows the arms image with no years on the card; SR Bosnia reads "blue over white over red"; Zimbabwe's Finance tab lists ZiG first with no bond notes. Full `npm run flags:check` and `tsc` pass. | Owner instruction 27 Sep 14:18 Melbourne: **keep everything on `main`**. From now on Opus commits directly to `main`, like Codex; PR #1709's commits are fast-forwarded onto `main`. Not an independent verification. |
| 2026-09-27 14:46 Melbourne / 04:46 UTC | Opus 5.5 | Deployment of F02, F16, F29–F33, F35, F36, F38 part 1, F39, F41, F42, R01, R02 | **Live** | Fast-forwarded to `main` at `3ac34aca`; Deploy workflow succeeded. | `npm run live:check`: the live site serves `3ac34ac` (built 04:44:46 UTC). Independent verification by another agent still pending. |
| 2026-09-27 15:40 Melbourne / 05:40 UTC | Opus 5.5 | F38 part 2: the 12 Fandom citations in `src/data/flagMeanings.ts` (PH-NSA, MSC, QUE, LAG, ALB, SOR, MAD, MDR, ROM, SCO, SUK; VE-W) and 1 in `src/data/tourismLogos.ts` (Czechia) | Implemented — awaiting verification | Every claim was re-checked against a stronger source: the Bureau of Local Government's *Symbols of the State* (1975, Internet Archive), the provinces' own sites, Wikipedia or Commons. Claims no stronger source supports were trimmed:
- **PH-QUE and PH-SOR:** now carry only what the official or Wikipedia text supports.
- **PH-NSA:** same text, re-cited.
- **VE-W:** the explainer was removed; FOTW `ve-w.html` and the en/es Wikipedia articles give no symbolism. It is logged in `subdiv-meaning-omitted.txt`.
- **Czechia tourism logo:** the Fandom source and its unsupported `launched: 2013` were dropped.

New finding **R03**, below. | Checked in the running app (dev server, via Philippines → Learn more → province card → expanded explainer): Romblon, Sorsogon, Albay, Laguna, Misamis Occidental and Quezon show the new text with no page errors. `check-flag-meanings`, `check-user-facing-copy`, `check-tourism-logos` and `tsc` pass. **F38 is now fully implemented.** |
| 2026-09-27 15:40 Melbourne / 05:40 UTC | Opus 5.5 | **R03** (new): subdivision explainers describing a superseded seal | Implemented — awaiting verification | Found while doing F38 part 2. The PH-ROM and PH-SOR explainers described older seals, not the bundled image. Romblon is rewritten to its current seal (17 figures for the 17 municipalities, marble craftsman, Mt Guiting-Guiting). Sorsogon is trimmed to what the 2019 seal's own documentation supports. | Same commit as F38 part 2. **Open:** other Philippine entries (PH-NER, PH-BAS, PH-CAV, PH-LEY, PH-QUI, PH-NEC, …) cite brainly, blogspot, scribd or social media. This should be swept like F38, but nobody has claimed it yet. |
| 2026-09-27 16:45 Melbourne / 06:45 UTC | Opus 5.5 | F84, F85, F86 (Estonian county explainers and SVG identifiers) | Implemented — awaiting verification | Fetched the Riigikantselei blazons myself:
- **F84 (Lääne, EE-57):** the blazon names a *kotkas* (eagle), rising and looking back, with a gold halo on red. "Silver hawk" is corrected to eagle, and the Government Office page is added as a source.
- **F85 (Võru, EE-86):** the blazon puts the sword *langeva talana* (in bend sinister). A render of the bundled SVG shows the hilt at the lower left and the blade pointing to the upper right. "Pointing downwards" is replaced with that orientation, and the Government Office page is added as a source.
- **F86:** `EE-37.svg` and `EE-51.svg` each carried "Flag of Elva" twice (the root `id` and the Inkscape `current-layer`). Both are renamed to the county. No `url(#…)` or `href` references them, and both files render unchanged (Harju's cross, Järva's tower). | `check-flag-meanings` and `check-subdivision-flags-bundled` pass. **Remaining for F86:** the audit's suggested per-file provenance record (entity, artwork version, source, licence) is not done; that is a larger manifest change and is unclaimed. |
| 2026-09-27 17:05 Melbourne / 07:05 UTC | Opus 5.5 | F87, F88, F89 (NZ seats, Green co-leaders, six position contradictions) | Implemented — awaiting verification | Parliament's site is behind a bot check and the Electoral Commission archive returns 403. Evidence used instead: Wikipedia's *54th New Zealand Parliament* standings (123 MPs both at the 2023 Port Waikato by-election and as of Nov 2025; Labour 34; ACT 11) and the Green Party article (Davidson co-leader since 2018, Swarbrick since March 2024).
- **F87:** Labour 34, ACT 11. `seatsTotal` is 123 for all four records, because the chamber's allocated and occupied membership is 123 in both dated columns; this is not a blind swap for the nominal 120. National 48 and Green 15 are **not changed**, per Codex's caution (the overview gives 49/14, Wikipedia 49/15, Hansard 48/15).
- **F88:** co-leaders shown as `Marama Davidson; Chlöe Swarbrick`, using the dataset's existing co-leader convention.
- **F89:** each row checked against the party's current Wikipedia infobox position:
  - NZ-NAT, GH-NPP: grouping right → centre-right;
  - MX-MORENA: grouping left → centre-left;
  - ZA-EFF: grouping left → far-left;
  - PL-PSL: label Right-wing → Centre-right (the grouping was already right);
  - ZA-DA: label → "Centre to centre-right", grouping centre-right.

New gate in `check-political-parties.mjs`: a single-category `positionRaw` must group under the same `ideologyPosition`. It fails when one fix is reverted and passes on all 842 records. | In the running app, NZ → Learn more → Political parties shows Greens "Co-leaders Marama Davidson; Chlöe Swarbrick" at 15/123 and National "Centre-right" at 48/123; all NZ logos paint and there are no page errors. `check-political-parties` passes. Also noted in `docs/POLITICAL_PARTY_AUDIT_2026.md` (NZ left unticked: NZ First and Te Pāti Māori are still missing). |
| 2026-09-27 17:40 Melbourne / 07:40 UTC | Opus 5.5 | F77 (GPI Honduras rank), F78 (Soft Power Guatemala movement and 19 missing movements) | Implemented — awaiting verification | Downloaded both publisher PDFs.
- **F77:** IEP 2026 p.13 prints "96 Cambodia 2.075 ↓8" and "97 Honduras 2.075 ↑13". Honduras's rank is now 97 in all four copies (CSV, extract, `democracyData`, `countryFacts`); the +13 movement was already right. `check-gpi-data.mjs` had **hard-coded the wrong tie** ("KH/HN must both be rank 96"). It now asserts the publisher's 96/97. The Jamaica/Serbia 70 and Haiti/Nigeria 142 ties were checked in the same table and are genuine.
- **F78:** rendered Brand Finance's country cards (PDF pp. 8–9) and read each previous rank. GT 126 from 120 = −6. The 19 missing movements are now filled:
  - AF +2, SO +4, LC 0, ER +6, DJ −3, MH +6, SR 0, TL −3, PW +5, LS −1;
  - VC −11, TO −4, FM +2, KN −3, TV +1, VU +1, NR −4, KI 0, SL −3.
  `check-soft-power-data.mjs` now fails if any entry lacks a movement, or if GT ≠ −6. | In the running app: Honduras shows "Rank 97 (+13)", Guatemala "Rank 126 (-6)", St Vincent "Rank 186 (-11)". The GPI and Soft Power checks and `tsc` pass. Persona inputs (frozen) are not touched. |
| 2026-09-27 18:10 Melbourne / 08:10 UTC | Opus 5.5 | F70 (CPI missing prior ranks), F71 (DPI rank universe, Panama category) | Implemented — awaiting verification |
- **F70:** the official CPI 2025 workbook's timeseries sheet has blank 2024 ranks for Belize and Brunei. Their `rankChange: 0` is removed in all three copies, so no "unchanged" movement is shown. The UI already renders a missing movement as no arrow.
- **F71:** rendered the report's Country Appendix pp. 28–29. The printed tiers are Very Positive ≥+15, Positive +6…+14, Neutral −5…+5, Negative −6…**−15** (Panama is printed under Negative), and Very Negative ≤−16.
  - `dpiTierFromScore` is corrected and Panama is now Negative. The chart bands are cut at the half-points between the integer scores (−15.5, −5.5, 5.5, 14.5).
  - Ranks are now competition ranks over **all 98** published units. Taiwan (−4) and Puerto Rico (−11) are held in `DPI_2026_NON_UN_SCORES`, not shown, but still count, so Kazakhstan is 98th as the report says. 48 ranks changed.
  - The data comment states that the rank is app-derived (the report prints no rank column).

`check-dpi-data.mjs` now ranks over the 98 units and asserts the published tiers. Congo → CD remains **unresolved**, as Codex noted. | In the running app: Panama "Rank 77 · Negative · -15", Kazakhstan "Rank 98", Belize CPI "Rank 104 · Score 36" with no movement. The DPI, CPI and chart-band checks pass. |
| 2026-09-27 19:05 Melbourne / 09:05 UTC | Opus 5.5 | F43, F44, F45 (era summaries, 2000 BC overrides, Hejaz), F53 (Brazil Olympic colours), F54 (Bermuda grouping) | Implemented — awaiting verification |
- **F53:** the explainer now says the green and yellow were **carried over** from the 1822 imperial flag (Braganza / Habsburg, per *Flag of Brazil*) and that Decree No. 4 of 19 Nov 1889 kept them when the globe replaced the imperial arms. The Planalto decree is added as a source (the page timed out from this VM, so the "kept the old colours" wording rests on the audit's reading plus Wikipedia). An uncited "the Committee's website confirms" clause is trimmed.
- **F54:** Bermuda's `subcontinent` is now "North America" in both `iocAssociations.ts` and `fifaAssociations.ts`. That is the label the app already uses for UN M49 Northern America (US, Canada), so no one-card heading is created. The confederation zone is untouched. In the running app, Football associations → Group by sub-continent shows NORTH AMERICA (4): Bermuda, Canada, Mexico, United States.
- **F43:** the Today summary now reads "195 countries — the 193 UN member states plus the two UN observer states, the Holy See and Palestine". No other user-facing string says "195 UN members"; code comments are left alone.
- **F44:** 600 → Sui China; the 1500 "Mughal era begins" clause is removed (founded 1526); 1920 → three empires gone, the defeated Ottoman Empire being partitioned, sultanate abolished 1922; 2000 BC "Old Kingdom" → Middle Kingdom.
  - **New finding (R04):** none of the names in the 2000 BC `ERA_OVERRIDES` block is a feature in `world_bc2000.geojson` (which uses Egypt, Hittites, Ur, Xia …), and there is no remap for that era, so the block is unreachable. It also held 14 polities from centuries later (Hittite Empire, Shang, New Kingdom, Hammurabi's Babylon, Mitanni, Amorites as "Indo-European", Phoenicians, Sabaeans, Vedic and Gangetic kingdoms, early Zhou, Mycenae, Hattusas, Arzawa). Those 14 are deleted. The remaining entries are still unreachable; wiring the era's real names is **unclaimed**.
  - **Exposure:** `EraSlider`, the only component that renders `Era.summary`, is not mounted anywhere, so the summary fixes are repository corrections with no live exposure today.
- **F45:** the 1920 Hejaz note now describes the bundled image (black, white and green bands, red hoist triangle, the Arab Revolt colours; *Flag of the Arab Revolt* dates this variant 1920–1926), and says Nejd conquered the kingdom in 1925. The 1938 Hejaz entry is removed: `world_1938` has no Hejaz feature, and the note falsely claimed "the GeoJSON includes it". | In the running app, 1920 Hejaz shows the corrected note and flag. The historical-flag-validity, era-explanations, anachronism, continents and historical-maps checks, `check-national-flags` and `tsc` pass. The push was blocked by an expired VM token between f0c9407d and 03723e33; everything reached `main` at 03723e33. |
| 2026-09-27 19:45 Melbourne / 09:45 UTC | Opus 5.5 | F48 (Nauru papers), F50 (ABC funding term), F51 (composite mastheads), F52 (captions vs artwork), F57 (undecodable SVG), part of F49 (defaulted fields) | Implemented — awaiting verification |
- **F52:** rendered the three Olympic marks and all 20 replacement mastheads from `purge-fabricated-newspaper-logos.mjs` in a montage before editing.
  - GB (red/blue lion's head), KE (white figure with raised arms over black, red and green bands; the audit's "bird" was not what I saw either, so the text says only what is drawn) and BM (rings, then BERMUDA, then the arms) design lines now match their images.
  - Le Figaro (white serif capitals and quill on blue), La Presse, Die Welt, Ouest-France, USA Today and The Guardian captions now describe the image. Unsourced typeface and year claims ("Guardian Egyptian, post-2018", "2020 identity … Futura-derived", "2012 digital-era") are trimmed.
  - **Libération disagreement:** the render shows **white** letters with heavy black outlines and a black offset shadow on the red lozenge, not "predominantly black letterforms". The caption is refined but keeps white. Codex, please re-check against your render.
- **F48:** the University of Canterbury holdings date Central Star News to 1991–92 and The Nauru Chronicle to 1993–c.1995. Both were presented as current papers with invented owners ("Aiwo & Buada Community Council", "Pacific Voices Publishing"), so both records are removed; re-adding either needs a sourced current-operation claim.
  - Mwinen Ko is rebuilt from the government's Nauru Bulletin (7 Feb 2017, p.4): monthly print publication of the Nauru Media Bureau (Ministry for Telecommunications and Media), $1 at local retail outlets, with an advertising manager on staff. The invented "Nauru Community Media Association" owner, the 2010 founding year, the "Let's Talk About It" gloss and the "Nauru Community Media Archive" readership source are removed.
- **F49 (partial):** `founded` and `readership` are now **optional** in `Newspaper`, in `check-national-newspapers.mjs` (still validated when present) and in the panel and grid (rows render only when present). The schema no longer forces a generator to invent them. The 55 + 3 "Audience Review 2024" strings are **not yet** addressed (unclaimed).
- **F51 / F57:**
  - `scripts/generate-island-logos.mjs` is deleted, along with its remaining outputs (`nr/naoero-gazette.svg`, `nr/nauru-bulletin.svg`, `va/acta-apostolicae-sedis.svg`) and the orphaned `nr/nauru-gio.svg`.
  - The Naoero Gazette record is removed: it is an official statutory record, not a news retailer, and its masthead was the broken composite.
  - Both media checks now **rasterise every logo with sharp**. Tested: re-inserting the Gazette SVG fails with "Namespace prefix xlink … is not defined", and the real data passes. The size/primitive "fabricated" heuristic is left in place as a review flag; a provenance manifest (F51/F62) is unclaimed.
- **F50:** the ABC's funding is described as five-year terms, the first from 1 July 2023 (replacing three-year terms), operating by convention; the department's review page is cited. Appropriation vs revenue for the A$1,139.7m figure is **not yet** checked against the annual report. | Newspaper, agency, national-flag, grid-content, grid-grouping, image-key and user-facing-copy checks and `tsc` pass. In the running app, Mwinen Ko shows the sourced fields with no Founded or Readership row. The full `flags:check` passed on 03723e33 (before this batch). |
| 2026-09-27 20:30 Melbourne / 10:30 UTC | Opus 5.5 | F58 (generated "sources were checked" gap text) | Implemented — awaiting verification |
- **F58:** 34 newspaper records and 1 agency record carried a `noImageReason` claiming a specific research history (named sources "checked") that no one had performed; the text was a generator constant. Each is replaced with a plain statement that is true by construction: "No verified masthead image is available in the app for this newspaper yet, so it is listed without one rather than with an invented logo." (agencies: "…emblem… agency…").
  - The same constants are replaced in the four generators that emitted them (`apply-newspaper-top5.mjs`, `apply-newspaper-top5-batch2.mjs`, `purge-fabricated-newspaper-logos.mjs`, `purge-fabricated-agency-logos.mjs`), so a regen cannot reintroduce the false research claim.
  - Hand-written reasons that describe real, recorded research are untouched. | Newspaper, agency and user-facing-copy checks pass. |
| 2026-09-27 20:55 Melbourne / 10:55 UTC | Opus 5.5 | F59 (Vatican News misfiled), F60 + F64 (30 wrong-entity media logos, plus El Mundo) | Implemented — awaiting verification |
- **F60 / F64:** rendered all 31 bundled images in one montage before touching them. 17 are another organisation on sight: the Soviet ТРУД with СССР emblems, TELUS Digital, a HELSINGIN SANOMAT masthead on Aamulehti, Semana 35 años, the Nigeria Police crest, FERMA, Loops, EXPRESSO industrial, ABC television, BonBelta, the Danish BOPA, Katholische Nachrichten-Agentur, the APC party logo, the New Era cap brand, the Bangladeshi আভাস/AVAS, the Paraguayan La Tribuna naming Carlos Ruiz Apezteguia, and the Argentine El Tiempo.
  - For six of the remaining plain wordmarks, the Commons metadata was re-read and each named a different entity: El Universal (Cartagena), The Tribune (India), Le Messager (France), Blikk (a Norwegian magazine) and Panorama (NDR television). The La Razón lookup failed and is not re-verified by me.
  - All 26 newspaper and 5 agency images are quarantined: `logo`/`logoExplainer`/`licenceNote` are removed, the files are deleted, and a plain `noImageReason` says an earlier image was another organisation's logo. `es-el-mundo` is included because the audit found its cited file categorised under Medellín and conflicting with the Spanish publisher's masthead.
  - Replacing any of these needs an identity-bound source (entity + country + official domain), per F62. None is claimed.
- **F59:** Acta Apostolicae Sedis and the Nauru gazette were already gone (F51/F48), and Vatican News is no longer in the agency registry. The remaining `va-vatican-news` newspaper record was a Holy See multimedia portal filed as a newspaper. It carried L'Osservatore Romano's motto and budget/visitor figures cited to an unlocatable "Relazione di Bilancio". It is removed with its logo, and `apply-agency-non-agency-cleanup.mjs` no longer migrates it into newspapers. L'Osservatore Romano remains as the Holy See's newspaper. The "what does 'top' mean" methodology point is **not** addressed (unclaimed). | In the running app, Top newspapers → Trud and THISDAY show the "—" no-image tile; Vatican City lists AsiaNews, Donne Chiesa Mondo, L'Osservatore Romano and National Catholic Register; no page errors. Newspaper, agency, user-facing-copy, grid-content and image-key checks and `tsc` pass. |

| 2026-09-27 21:50 Melbourne / 11:50 UTC | Codex | F84–F89 remediation; new visa-access map in PR #1710 | Investigating | Independently compare corrected records/artwork and new visa data/presentation against evidence; document remaining gaps | Baseline `7c75c3182419e125b29cbde27e1d02935cbd6e22`; audit-only, no overlapping application edits. |

| 2026-09-27 22:05 Melbourne / 12:05 UTC | Codex | F84–F89 verification; visa F90–F92; PR #1711; public bundle | Independently verified bounded checks; new findings open | 108 primary visa-category comparisons, 37,830 reproduction checks, 842 party consistency checks, two full-image raster equality checks. See new section below. | Evidence commits `303f9224`, `1bbb1747`, `fb9c2331`, `4fbdfd06`; exact readback verified. Public bundle `07b14a3`. F87 denominator, provenance and broader universal verification remain open. |

### Open handoff cautions

- Universal verification remains incomplete. The 82 NZ field assessments include unresolved and partly verified fields; the 842-record scan checks only internal position consistency. Neither is blanket factual certification.
- F87: Labour 34 and ACT 11 are supported, but distinguish nominal chamber size, allocated seats, occupied seats and dated party membership. Do not blindly replace every 120 denominator with 123.
- F88: use dated co-leadership information, not a single replacement name that omits the other co-leader.
- F89: resolve the six contradictions from attributable evidence; do not automatically select either the normalized or raw classification as correct.
- NZ logos: entity recognition is corroborated, but exact registered variants/colours and rights are not fully verified. National's May 2026 registration alone does not prove which bundled variant must replace the existing file.
- The next NZ national-symbol check had only begun: the national-flag description was read and official flag/arms/passport sources located. **No completed claim ledger or additional finding from that exploratory work exists yet.** No exclusive claim on that scope is held.
- Preserve the already recorded source conflicts and historical revision distinctions. A corrected registry does not alone prove the public site's fresh or cached rendering has changed.

## Independent verification and territorial-flag follow-up — 1 October 2026

**Codex; inspected application `081f2dea16cda54ede57414379bd53b6ed4bdc37`.** Five new application batches (#1734–#1738) plus two audit commits since `3528c20d`: seven commits / 91 changed files inventoried. Supporting evidence: [INDEPENDENT_DELTA_VERIFICATION_2026-10-01.json](audit/INDEPENDENT_DELTA_VERIFICATION_2026-10-01.json), commit `15c5fa2`. No application changes by Codex.

### F108 — BIOT's new Tudor Crown caption accompanies the superseded flag artwork (P2)

**Confirmed repository and publicly served asset mismatch.** The new `FLAG_MEANINGS["GB-IO"]` in `src/data/flagMeanings.ts` describes a Tudor Crown. However, `src/api/subdivisions.ts` maps GB-IO to `public/flags/io.svg`, which still shows the earlier St Edward's Crown with red lining and coloured jewels.

The [BIOT administration's current flag page](https://www.biot.gov.io/governance/flag-and-crest/) explicitly dates the formal update to **October 2025** and specifies a simple gold Tudor Crown without red velvet or jewels. Its [current official artwork](https://www.biot.gov.io/wp-content/uploads/BIOT-Flag-Tudor-Crown.jpg) was downloaded and visually compared with the exact bundled SVG.

The public `/flags/io.svg` is byte-identical to the old repository image: SHA-256 `aeb872cb50192585fee2f29a9bf4c6fb81605ccd110386136c2f08ed8437a1a1`. Thus the stale design is still available to users; this check did not inspect the rendered live GB-IO panel.

**Recommendation:** replace the current-use asset with a faithful, provenance-bound rendition of the October 2025 design. Keep the older flag only with an explicit historical date range. Distinguish the original 1990 grant from the later design change, and check every shared IO/GB-IO image reference. This finding concerns artwork/version accuracy; it makes no determination about treaty commencement or sovereignty.

**Status: open, implementation unclaimed.** Coordinate with the subdivision/territorial flag agent before modifying shared assets.

### Independent remediation results

| Item | Independently observed result | Remaining limit |
|---|---|---|
| F106 — Khmelnytskyi | **Exact artwork correction verified.** Current repository PNG and publicly served PNG both match the previously independently viewed council raster: SHA-256 `fee6fad8c229c2bb2ca4e8bdbd9cd5b7995528160fae0186aa051e74f6ec7cff`. Re-rendered image has 16 rays. | Public asset verified by HTTP; no fresh browser screenshot pass. |
| F105 — Guyana centres | Both capital generator/data paths now select **Triumph** and **Fort Wellington**. Georgetown remains the national capital. Names agree with prior primary-source evidence. | New 2012 populations (3,788 and 33) and coordinates not independently certified here. Primary village ZIP located, contents not read. |
| F104 — co-capitals | Implementation remains queued as **SF-17**; Norway adds Agder/Trøndelag role cases in the implementing agent's ledger. | Open; a passing name-agreement gate does not resolve this. |
| F107 — La Trinidad | Law independently re-read; it converts an existing municipal district into a regular municipality. Other agent reports NHCP wording supports the caption. | Wording qualification/disagreement retained. Do not represent it as a wrong year or wholly fabricated seal explanation. |
| Capital-name gate | Pass: **1,224 quiz capitals**; **259 non-quiz disagreements** remain. | Internal name/prefix consistency, not universal factual identity. |

### Norway population comparison — positive primary verification

Independently queried Statistics Norway's [table 07459](https://www.ssb.no/en/statbank1/table/07459/) via its [official API](https://data.ssb.no/api/v0/en/table/07459/), selecting 2026 and summing both sexes and all 106 age categories. **All 29 values agree:** the 15 county populations in `subdivisionPopulation.ts` and 14 capital municipalities in the generator overrides. The 14 generated capital-card population values also agree. The 15 counties sum exactly to the source's national **5,627,400**.

The evidence JSON preserves the request, response SHA-256 and every app/source comparison. This verifies **1 January 2026 municipal/county counts**; it does not establish urban-settlement populations, current-quarter totals, complete capital roles, legal boundary geometry or flag authenticity. Oslo's national-capital data is outside the 14 capital-override comparisons.

### Source conflicts and unfinished checks retained

- **Norfolk Island (AU-NF):** the new caption's 6 June 1979 “adopted” date needs an event qualifier. [PM&C](https://www.pmc.gov.au/resources/australian-symbols-booklet/state-and-territory-symbols/symbols-norfolk-island) gives proclamation on 11 January 1980; the [Act's commencement table](https://www.legislation.gov.au/C2015Q00187/asmade/2015-06-18/text/original/pdf) gives 17 January 1980. Council approval, proclamation and statutory commencement are distinct. Do not silently substitute one unqualified date for another; original council/proclamation records still need reconciliation.
- **Tokelau (NZ-TK):** [government documentation](https://www.tokelau.org.nz/About%2BUs/Government/Tokelau%2BFlag%2Band%2BNational%2BSymbol.html) confirms the 2009 royal licence and canoe/navigation meanings. The caption's “in place of New Zealand's” wording needs a protocol/status check. The indexed official yearbook says the flags fly alongside each other, but its full PDF exceeded the web reader's limit; no new definitive finding allocated.
- **Møre og Romsdal (NO-15):** the bundled image is a blue banner of the three ships. The implementing agent already records an older FOTW report of a white flag bearing a shield. No primary current flown-flag evidence obtained here; neither version is universally certified.
- Guatemala's full artwork/source set, all territorial caption claims, Norway geometry and remaining flag versions still require independent verification. The 91-file inventory is not a 91-file factual clearance.

**Deployment observation:** `check-live-build.mjs --print` reported public build `38b87bc`, timestamp `2026-10-01T12:15:39.800Z`, bundle `assets/index-DmxWmwLE.js`. Exact public asset checks are recorded separately above. The comprehensive audit remains incomplete; retain all earlier unresolved findings and ownership records.


## Recovered September 30 findings and October 1 continuation

**Codex checkpoint, 1 October 2026, 22:13 Melbourne / 12:13 UTC (request time).** The September 30 evidence was successfully committed as `c95ff6f`, but the accompanying Markdown update was not executed because automatic approval review hit a usage limit. This section restores the missing narrative, preserving the subsequent Claude Code implementation entries above.

The [September 30 evidence ledger](audit/SUBNATIONAL_DELTA_VERIFICATION_2026-09-30.json) records application revision `3528c20d`, a 23-commit / 127-file inventory, 336/336 unchanged parsed geometries across seven changed country files, 37 new-caption image screens, and all ten Guyana regional-centre name comparisons. The capital-name gate passed for 1,223 quiz capitals but reported 261 non-quiz disagreements. These are bounded checks, not universal factual certification. Browser checks then observed builds `3528c20` and `42eeeea`.

### F104 — Single-capital pins omit co-capitals and distributed seats (P2)

At the inspected revision, Learn displayed Cesena alone for Forlì-Cesena, Pesaro alone for Pesaro e Urbino, and Ponta Delgada alone for the Azores. Cesena and Pesaro are valid capitals; the defect is omission of other legitimate capitals/roles.

The [province's January 2024 announcement](https://www.provincia.fc.it/it/news/121361/da-oggi-martedi-30-gennaio-la-citta-di-cesena-e-ufficialmente-co-capoluogo-della-provincia-forli-cesena) expressly retains Forlì alongside Cesena. The [current Pesaro e Urbino statute](https://www.provincia.pu.it/fileadmin/grpmnt/1057/SegretarioGenerale/STATUTO_COORDINATO_-_ULTIMA_MODIFICA_2025.pdf), Art. 4(1), printed p. 5, names both cities as co-capitals while locating the provincial seat in Pesaro. The [Azores statute](https://diariodarepublica.pt/dr/legislacao-consolidada/lei/1980-34507075), Arts. 25/76, seats the legislature in Horta and distributes regional government departments across Angra do Heroísmo, Horta and Ponta Delgada.

Use sourced lists of city identities, roles and validity dates in the generators, data, cards and markers. A representative flag card must retain its city's identity without implying exclusivity. String agreement alone cannot establish capital correctness. **October 1 status:** Claude Code has queued the model change as SF-17; still open.

### F105 — Guyana Region 4's capital was wrong and Region 5's was missing (P2)

At `3528c20d`, GY-DE displayed Georgetown while its capital-details record said Paradise; GY-MA had no displayed capital. The [Ministry of Education table](https://education.gov.gy/web2/index.php/ngsa-2022/4596-social-studies-made-easy-revised-edition/file), printed p. 53/PDF index 64, gives **Triumph** and **Fort Wellington** as the regional centres. Eight other regional centre names agree with the app. [Government reporting](https://dpi.gov.gy/substantial-upgrades-slated-for-region-four-roads-bridges/) corroborates the RDC at Triumph. Both failures were observed in the live panels.

**October 1 status:** implemented by Claude Code in #1735/`43d1594`, with 2012 village census populations added. Independent verification of the implementation is being performed below. Name, coordinate, population and deployment verification are separate; the original audit did not certify new population values.

### F106 — Khmelnytskyi replacement artwork had 12 rays instead of 16 (P2)

The `ua-68.png` introduced in #1733 showed twelve triangular rays, despite its caption saying sixteen. The [council's specification](https://www.khm.gov.ua/uk/pro-hromadu/symvoly) and independently viewed [official image](https://www.khm.gov.ua/sites/default/files/flag_0.png) specify/show sixteen. The live capital card loaded the affected image. The 2017 distinction between city flag and mayor's standard was supported; the replacement drawing was not faithful.

**October 1 status:** Claude Code replaced it with the council raster in #1735/`43d1594`. Independently verify the asset hash against the previously captured official SHA-256 `fee6fad8c229c2bb2ca4e8bdbd9cd5b7995528160fae0186aa051e74f6ec7cff`. Do not change the correct sixteen-ray caption to accommodate incorrect artwork.

### F107 — La Trinidad's municipal conversion is described as the town's founding (P3; wording disagreement open)

The new PH-BEN caption says the town was founded in 1950. [Republic Act 531, 16 June 1950](https://lawphil.net/statutes/repacts/ra1950/ra_531_1950.html), sections 1–2, converts an existing municipal district into a regular municipality and continues its officials. “Became a regular municipality in 1950” precisely identifies that event.

**October 1 reconciliation:** Claude Code reports that the NHCP seal description supports the existing wording. This supports attribution of the seal explanation, but does not remove the legal distinction between municipal conversion and settlement origin. Codex re-read the act; NHCP direct retrieval remains unavailable to this auditor. Keep the finding as a historical-wording qualification/disagreement, not a claim that 1950 is the wrong year or that the entire seal explainer is fabricated.

### Recurring findings and current scope

F93 persisted in the redesigned live Travel & migration control: “Living abroad now” and “live today” appeared beside a 2020 legend. Update `TravelMigrationMapControl.tsx`, not merely its removed predecessor. F98 was reproduced when an unavailable local deployed commit caused a false “behind” conclusion; fetching it resolved the ancestry test, with no deployment repair required.

**Current claim:** Codex is independently reviewing corrections F105/F106 and new batches 8a–8e through `081f2dea` (Guatemala, territorial explainers, Norway counties/capital flags), audit/documentation only. Preserve Claude Code and Opus implementation ownership. Previous unchecked claims, administrative vintages, remaining caption/source verification and UN/flow matrix comparisons remain open.


## New Zealand national-symbol verification — 28 September 2026

**Codex, application revision `044711a5`; audit-only.** [Evidence ledger](audit/NZ_NATIONAL_SYMBOL_VERIFICATION_2026-09-28.json), commit `0934d44`. All 11 manifest entries were read and all 11 images rendered and visually inspected. All nine declared image hashes agree with the bundled bytes. That is file integrity, not universal authenticity: sports statistics and some historical dates remain unchecked. Relevant incorrect prose was also found in the public `71e380b` bundle.

### F99 — New Zealand flag chronology mixes 1903 legislation and maritime use with national adoption (P1)

**Confirmed.** `src/data/flagAdoptionYears.ts` gives NZ **1903**; `nz-official-national` repeats it in the source manifest, generated data and design line. Yet `flagMeanings.ts` correctly says **1902**. The [government's flag history](https://nzhistory.govt.nz/politics/flags-of-new-zealand/maritime-origins) distinguishes 1869 maritime use, royal approval on 24 March 1902, proclamation on 12 June, and the technical notice on 27 June 1902. Later 1903 legislation did not introduce a different national design.

The historical `nz-union-flag` window also ends in **1867**, but [NZHistory](https://nzhistory.govt.nz/politics/flags-of-new-zealand/union-jack) says the Union Jack remained the national/legal flag until **1902** and continued in use afterwards. The 1867 colonial ship ensign did not replace the onshore flag.

Correct the adoption source/override, generated adoption table, manifest and generated symbol entry together. Preserve overlapping maritime and national-use periods rather than forcing one continuous succession. `seed-national-symbols.mjs` consumes the adoption table; `build-flag-adoption-years.mjs` currently has no NZ corrective override. Do not indiscriminately substitute 1869 for every national-adoption field.

### F100 — The Queen's personal flag explainer adds fern leaves absent from the banner (P2)

**Confirmed pixel contradiction.** `nz-royal-1962` describes “two fern leaves … beneath.” The bundled rectangular banner shows the quartered shield's devices and central crowned E/rose disc; there are **no fern leaves**. It confuses a banner of the shield with the full coat of arms and its external ornaments. Remove that clause or explicitly describe the relationship without assigning the arms' external elements to the flag. This check does not independently certify all dates in the 1962–2022 period or any current successor standard.

### F101 — United Tribes explainer describes a different historical border variant (P2)

**Confirmed artwork/variant mismatch.** The `nz-united-tribes` image has a **white** border around the small canton cross; its explainer describes a black-bordered design. The [government's archival-image note](https://nzhistory.govt.nz/media/photo/united-tribes-flag) expressly distinguishes the officially approved white-border version, reproduced in an 1845 flag book, from the original 1834 black-border version.

Identify the actual displayed variant, distinguish the selection from the later approval/redrawing, and use separate dated images if showing both. Do not “correct” the white border to black without changing the variant attribution and source. The [20 March 1834 selection by 25 northern chiefs](https://nzhistory.govt.nz/politics/flags-of-new-zealand/united-tribes-flag) is supported; this audit does not assign an exact alteration date from the 1845 reproduction alone.

### F102 — Māori flag design date and attribution are incomplete (P2)

**Confirmed.** `nz-maori` says “Designed by Hiraina Marsden in 1990.” [Te Ara](https://teara.govt.nz/en/photograph/32152/tino-rangatiratanga-flag) credits **Hiraina Marsden, Jan Dobson Smith and Linda Munn in 1989**; [NZHistory](https://nzhistory.govt.nz/politics/flags-of-new-zealand/maori-flag) also identifies the three designers. The [Ministry](https://www.mch.govt.nz/our-work/flags-anthems-and-emblems/new-zealand-flag/tino-rangatiratanga-flag) distinguishes development in 1989 from unveiling at Waitangi on 6 February 1990, and Cabinet recognition on 14 December 2009 as the **preferred national Māori flag**.

Correct the prose and full credit; a `from: 1990` public-use window need not be changed to 1989 simply because design work began earlier. Preserve recognition versus statutory status: the Ministry says the flag does not have official status. The existing black/red/white three-realm symbolism and koru interpretation agree with that Ministry source and should not be replaced merely because this entry contains another error.

### F103 — New Zealand passport rendering is an unlabelled earlier cover (P2; concrete instance of F14)

**Confirmed series/presentation gap, not an invalid-passport claim.** The bundled drawing shows **NEW ZEALAND PASSPORT above URUWHENUA AOTEAROA** and warm gold-coloured decoration. DIA's [3 May 2021 announcement](https://www.dia.govt.nz/press.nsf/d77da9b523f12931cc256ac5000d19b6/a6ec02445c0c97bfcc2586ca0000b198!OpenDocument) says the updated cover puts te reo Māori first and explains that older stock would continue to be issued during transition and existing passports remain valid until expiry. [PRADO NZL-AO-04001](https://www.consilium.europa.eu/prado/en/NZL-AO-04001/index.html) identifies first issue as **15 April 2021**, with silver foil on a black cover.

Label the displayed older English-first series and add a sourced current-series cover where available. Keep first issue, announcement, phase-in and expiry separate. Do not assert the old drawing depicts the 2021 series, that all earlier passports are invalid, or that this audit established a precise last-issue date. The gold-toned drawing also needs comparison with an authoritative rendering of its exact older series; it is not certified as an accurate foil-colour reproduction.

### Supported details, completeness gaps and limits

- The current national flag's major design and ratio agree with [Ministry guidance](https://www.mch.govt.nz/our-work/flags-anthems-and-emblems/new-zealand-flag). The app uses `#C8102E/#012169` while current Ministry approximate digital equivalents are `#C91235/#02216E`. Record the palette source and review consistency; this small digital difference is **not** adjudicated here as an unlawful or fabricated flag.
- The arms' Southern Cross, three ships, fleece, wheat, hammers, European woman with flag, Māori chief with taiaha, St Edward's Crown and **1911 grant / 1956 revision** agree with the [Ministry's account](https://www.mch.govt.nz/our-work/flags-anthems-and-emblems/coat-arms). Every interpretive gloss and fine heraldic line is not thereby verified.
- The Red Ensign's major design and use on occasions of Māori significance agree with the [official-flags guidance](https://www.mch.govt.nz/our-work/flags-anthems-and-emblems/new-zealand-flag/other-official-new-zealand-flags). Its exact adoption history remains a separate check.
- That official list also identifies four flags absent from the NZ symbol manifest: **Governor-General's flag, NZ White Ensign, RNZAF Ensign and NZ Civil Air Ensign**. These are documented completeness gaps; adding them requires sourced assets, dates and descriptions.
- The football and Olympic logos were visually screened only. Medal totals, participation, foundation dates and exact current brand variants remain unverified. Likewise, this pass does not certify the country's entire independence model, subdivisions or historical maps.

**Handoff:** F99–F103 are open, implementation unclaimed. Correct source manifests/generators first and verify rendered cards when browser access is restored. Preserve all prior Opus ownership and implementation records.

## F61 independent recheck and audit correction — 28 September 2026

**Revision `044711a5`; Codex; no application edits.** [Per-record evidence](audit/MEDIA_F61_RECHECK_2026-09-28.json), commit `dc8df7a`. All ten remaining images were reopened and visually inspected; their hashes match the original 20 September ledger. The original ledger now also carries the superseding Japan Times correction (`bf85d28`).

| Earlier F61 item | Current outcome |
|---|---|
| Dong-a Ilbo | **Still wrong:** image reads Hanja `東亞日報`; caption says Hangul |
| JoongAng Ilbo | **Still wrong:** image reads Latin `The JoongAng`; caption says Hangul |
| Rappler | **Still wrong:** R emblem; caption says wordmark |
| Dagens Nyheter | **Still wrong:** `DN.` monogram; caption says full nameplate |
| The Japan Times | **WITHDRAWN — auditor error.** The unchanged SVG visibly has a red dot over the j, matching the caption. Earlier “monochrome” description was wrong; no fix is needed for that claim. |
| Ukrainska Pravda | Image remains `УП`; caption changed from full-wordmark wording to generic “masthead/logo.” The old exact contradiction is no longer current. Explicitly naming the monogram would be clearer; generic “logo” is not proved false. |
| Dainik Jagran, TVNZ 1News, Il Sole 24 Ore, Slovak Hospodárske noviny | All four absent from current newspaper/news-agency registries. Record removal eliminates current exposure of those captions; it does not establish that the historical assets/captions were correct. |

**Count: four current confirmed mismatches, four removed records, one withdrawn audit error, one broadened caption.** This supersedes any reading of the old ten-row list as ten current confirmed errors.

The four variant caveats remain: Página|12 includes `50 AÑOS DEL GOLPE` and a white-headscarf outline (a coup-anniversary reference, **not** the newspaper's 50th anniversary); La Jornada includes `CUMPLIMOS 40 años`; El Observador includes a social-follow callout; Nhân Dân uses a Russian-language edition lockup. Record the actual variant and date/edition where supported, rather than silently describing a timeless clean masthead. These observations do not independently certify official status/current brand rights.

**Opus handoff:** do not change the Japan Times red-dot caption to satisfy the withdrawn finding. F61 remains partly open for the four current mismatches and four variant caveats. The separate F65/F69 caption/asset-role queues and Delfi's browser-animation question remain open. Browser visual verification is still unavailable following the stalled request.

## Migration-layer audit — 28 September 2026

**Agent: Codex. Application revision: `044711a56878091f42e00e0a032989262d297b94`.** Four application commits since `bf7b7709` changed 31 paths, introducing diaspora stock/flow and migrant-origins layers. This pass independently checks the World Bank extraction, reads all new extraction/build/check/control/legend/colour code, and reconciles the deployed bundle. It does not certify all migration estimates or the wider application.

Evidence: [Migration source/implementation ledger](audit/MIGRATION_LAYER_VERIFICATION_2026-09-28.json), saved in commit `6c0c09e`.

### Completed comparisons and limits

| Check | Result | Limit |
|---|---|---|
| Original World Bank WDR 2023 migration archive and workbook | Downloaded; both SHA-256 hashes match the committed metadata | Establishes exact source-file identity |
| All 2020 source rows and retained positive pairs | 77,618 male/female rows read; **10,037/10,037 retained positive pairs match**, no numeric differences | Source agreement, not independent validation of the source estimates |
| Legacy ISO3 aliases | Workbook labels confirm ROM=Romania, ZAR=DR Congo, YUG=Serbia, TMP=Timor-Leste | In particular, YUG→RS is not classified as a misidentification merely from its historical code |
| Source zeros | **27,019** eligible off-diagonal zero cells omitted | See F95; a source zero is not proof of real-world absence |
| Two retained UN DESA CSVs | All 8,178 positive pairs agree under transposition; migrant-origins CSV additionally preserves 235 zeros | Internal agreement only: direct primary workbook retrieval returned HTTP 403 |
| Abel–Cohen flow provenance | Publisher version 8 (26 March 2025) confirms period, IMS2024/WPP2024 inputs, file 53235671, `da_pb_closed`, and CC BY 4.0 | Both source download URLs returned HTTP 403; **17,965 flow values remain independently unverified** |
| Existing migration checks | Both exit 0 | They compare committed CSVs with generated data and check source strings; they do not prove upstream agreement or rendered behaviour |
| Public deployment | Bundle `assets/index-BdAwni6S.js`, build `71e380b`, timestamp `2026-09-28T05:00:43.002Z`; ancestry verified after fetching history | Bundle text/commit checked; browser creation stalled and was interrupted, so no rendered-UI pass is claimed |

World Bank positive examples independently reproduced: Japan→Brazil **62,296**, Australia→US **118,905**, Serbia→Germany **184,574**. These are source values for **2020**, not current counts. The flow dataset's 2015–2020 estimates were added after the original 2019 paper; the [publisher's versioned data page](https://figshare.com/articles/dataset/Bilateral_international_migration_flow_estimates_for_200_countries_1990-1995_to_2010-2015_/7731233) establishes this, so their absence from the original paper's 1990–2015 window is not itself an error.

### F93 — 2020 stock is described as people living abroad “now” and “today” (P2)

**Confirmed temporal misstatement.** `DiasporaMapControl.tsx` lines 145/161 say “Living abroad now (foreign-born stock, 2020)” and “live in each destination today”; `diasporaMeasureLabel()` repeats “now.” `docs/DIASPORA_MAP.md` repeats the same present-time claim. The correct workbook column is 2020, and the legend already gives that year. All relevant present-time strings were found in the live bundle.

Use “Living abroad in 2020” and past-tense explanatory text throughout. Keep the source edition and observation year distinct. Update the checker too: `check-diaspora.mjs` currently requires the exact “Living abroad now” substring, which would reject the factual correction. This recommendation is to replace the false expectation, not remove coverage checks.

### F94 — UN migrant stock is universally labelled birthplace-based; documentation also misstates cross-layer equivalence (P2)

**Confirmed definition/provenance problem.** `MigrantOriginsPanelRows.tsx` labels every pair “Born in {origin}, living in {destination}”; generated data and documentation make the same unconditional claim. UN DESA's [2024-edition methodological publication](https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/undesa_pd_2025_intlmigstock_2024_key_facts_and_figures_advance-unedited.pdf) says birthplace is preferred but citizenship is used when birthplace data are unavailable. That statement was recovered from the indexed UN publication and corroborated by [Germany's official statistical office](https://www.destatis.de/EN/Themes/Countries-Regions/International-Statistics/Data-Topic/Population-Labour-Social-Issues/DemographyMigration/Migrants.html); direct UN PDF retrieval failed. Do not infer which destinations use which basis without the workbook/source notes.

Use “International migrant stock from …” with a visible birthplace/citizenship qualification, or carry destination-specific basis metadata before using “born in.” The World Bank workbook separately defines its own `mig` field as birthplace-based; this finding does not automatically relabel that series.

In addition, `docs/MIGRANT_ORIGINS.md` lines 49–52 still says the blue and green maps use the same UN 2024 table. Active green stock now uses World Bank **2020** while blue stock uses UN **2024**. They are conceptually opposite directions but **not numerical inverses of one matrix**. Document both source/year combinations and avoid implying that changing direction preserves a corridor's value.

### F95 — Published zero cells become “No stock reported” (P2)

**Confirmed loss of source status.** `extract-diaspora-wb.mjs` drops every `mig <= 0` before summing; `diasporaValueFor()` only returns positive numbers; `LearnPage.tsx` then displays “No stock reported” for missing retained pairs. Independent extraction found **27,019** eligible 2020 country-pair cells whose male/female sum is explicitly zero in the workbook but absent from the app. Examples include AU→AF, AU→AO, AU→AL and AU→AE.

The legend's broader “no positive stock” wording is compatible with a zero, but the tooltip's assertion of no reported stock is not the same statement. Preserve separate statuses for source zero, source missing, filtered geography and missing origin; display the source's zero with a methodological qualification. Do not convert an upstream modelled/encoded zero into a claim that nobody lives there. Retaining only positive shading is possible without destroying the source status.

The flow pipeline also omits zeros, but no equivalent primary count is claimed because the upstream flow CSV could not be retrieved.

### F96 — The documented World Bank refresh cannot run from a clean checkout (P2)

**Reproduced.** Running the documented command with the exact original workbook and Python/openpyxl available exits 1 with:

`FileNotFoundError: [Errno 2] No such file or directory: '/tmp/migrant/m49.csv'`

The absolute path is hard-coded at `scripts/extract-diaspora-wb.mjs:32`; that dependency is neither bundled nor created by the documented procedure. No generated application data was changed by the failed run. The independent comparison above deliberately used a separate audit extractor, so the positive numeric result does not clear the refresh failure.

Commit and pin the required alpha-2/alpha-3 mapping (or use an explicitly declared dependency), resolve it relative to the repository, and run the extraction in a clean temporary working directory. Also compute `zipSha256` from the archive actually supplied or remove it from workbook-only refresh output: the current script writes a fixed historical archive hash even when invoked with a different workbook. The flow refresh is manual prose rather than a committed extractor; preserve a reproducible filter/rounding/mapping procedure for that source too.

### F97 — Migration legends do not share their maps' colour calculation; empty diaspora origins contradict the black-origin key (P2)

**Confirmed from implementation; rendered appearance not checked this pass.** The diaspora map linearly interpolates only its two endpoint colours after log-normalising values, while the legend interpolates a different six-stop palette. At normalised position 0.5, the map's RGB interpolation gives `#6ca07d`, whereas the legend lies between `#5cb87a` and `#2d8a4e`. The migrant-origins map uses five blue stops, but its legend uses only the light/dark endpoints. Thus matching positions on the legend and map do not encode the same colour. The diaspora key also omits disclosure that its numeric scale is logarithmic.

For stock origins ME and VA, `diasporaScale()` is null and `getDiasporaColorOverlay()` returns null before inserting the origin's black colour. Nevertheless `DiasporaMapLegend` always shows a black-origin key and a generic fewer→more gradient. This is an unsupported empty-data presentation, not evidence that the missing stocks are zero.

Derive map and legend from one colour/scale function; label logarithmic and per-selection scaling; explicitly show an empty-data state; keep the origin black if that is what the key promises. Verify these cases in the running app before marking this finding independently resolved.

### F98 — Live checker turns unavailable commit ancestry into a false “site behind” conclusion (P2)

**Reproduced assurance failure.** From the fresh depth-1 checkout at `044711a`, `check-live-build.mjs` correctly read live build `71e380b` but could not resolve that newer object locally. Its catch branch treated any `git merge-base --is-ancestor` error as false and asserted that the site was behind. After `git fetch origin main --depth=10`, ancestry `044711a`→`71e380b` succeeded and the live check passed. The initial error was not evidence of a deployment outage.

Distinguish Git exit 1 (known non-ancestor) from exit 128/unknown object or incomplete history; fetch the observed revision when permitted, or return **inconclusive**. Keep actual deployment verification separate from a green workflow and from browser visual verification. No deployment was restarted because the observed site already contained the audited application changes.

### Handoff and unfinished coverage

F93–F98 are established audit findings, **not implemented fixes**. Opus may claim them in the shared log; Codex has not changed application data, generators, tests or UI. Preserve Opus's existing R-number findings and work ownership.

Still required for this batch: primary numeric checks of all UN/flow values, destination-specific migration definitions/territorial notes, raw-zero interpretation, and rendered colour/tooltip/selection checks. The browser stall is a concrete visual-verification blocker; the 403 responses are concrete source-retrieval blockers. Neither makes a claim false by itself.

All earlier outstanding work remains open, including F61 media captions, F90–F92 visa corrections, unresolved institutional/media metadata, flags/arms/passport dating, populations and complete historical boundaries. The earlier informal 10% estimate is not a measured completion percentage and is not upgraded by this batch.


## Visa-access audit and independent remediation checks — 27 September 2026

**Codex checkpoint: 22:05 Melbourne / 12:05 UTC.** Data reviewed at `7c75c3182419e125b29cbde27e1d02935cbd6e22` (PR #1710), with the subsequent legend/count change in `1ee7c78515b494e25aa5e40b59fabd07af47a7d9` (PR #1711) also inspected. The [change inventory](audit/REMEDIATION_CHANGE_INVENTORY_2026-09-27.json) records 51 commits / 113 changed paths from `e3c1a35` to `7c75c318`, plus PR #1711's four paths. Inventory inclusion is **not factual verification**.

The [visa evidence ledger](audit/VISA_ACCESS_CLAIM_VERIFICATION_2026-09-27.json) separates:
- **Complete reproduction check:** all **37,830** foreign passport–destination pairs (195 × 194) match the bundled third-party CSV; all 39,601 source pairs are unique. Bundled and pinned upstream CSVs have identical Git blob `c90054300eb2e0615ebf088412c3040d6958026f` and SHA-256 `d985f861c1d03be9de61a9257c3fbb7b4ef94677b5e3827012cc4d602ab45fcf`.
- **Bounded primary-policy checks:** **108** pairs checked under stated conditions: China's 50-country unilateral exemption list, New Zealand's 57 included waiver origins, and the Australian-passport exception. **106 category matches and 2 errors.** This targeted sample is not an estimate of the overall error rate. The NZ matches use the product's explicit combined eVisa/ETA category; eligibility, residence/passport type, visit purpose and duration conditions still apply.
- **Israel qualification check:** all 194 foreign origins are yellow; underlying source tokens are **97 `eta` and 97 `e-visa`**, not 194 ETA entries. Official sources do not support unconditional eVisa access for every visa-required nationality.
- **PR #1711:** counts independently recomputed for all 195 passport rows; zero arithmetic discrepancies, totals 195 including home. Black home / dark-red no-admission presentation matches the new documentation. This does not validate the underlying immigration rules.

### F90 — China visa exemption missing for British and Canadian ordinary passports (P1)

Both `GB→CN` and `CA→CN` are stored as `visa-required`. China's official [50-country list, dated 17 February 2026](https://en.nia.gov.cn/n147418/n147463/c183390/content.html), includes both. Its Canadian embassy's [Chinese notice](https://ca.china-embassy.gov.cn/zytz/202602/t20260216_11860600.htm) and [English notice](https://ca.china-embassy.gov.cn/eng/zytz_0/202602/t20260216_11860601.htm), published 15 February, specify exemption beginning **00:00 on 17 February 2026**, through **24:00 on 31 December 2026, Beijing time**, for qualifying ordinary-passport short visits of up to **30 days**. Other visit purposes or ineligible travellers still need the appropriate visa.

These two entries were already wrong on the matrix's stated edition date, **17 February 2026**. The other 48 origins on that dated list match at category level. **Recommendation:** correct through a sourced override/generation process that retains the underlying third-party snapshot, effective dates, conditions and primary-policy citations. The edition label alone cannot establish correctness.

### F91 — Israel's blanket eVisa classification drops nationality/residence eligibility (P1)

`src/data/visaAccess.ts` labels every one of 194 foreign origins `evisa`. The official [PIBA eVisa-B2 page](https://israel-entry.piba.gov.il/learn-about-evisa-b2/) and [Mumbai consulate notice](https://embassies.gov.il/mumbai/en/announcements/evisa-israel) restrict the pilot to Indian/Sri Lankan passport holders residing in India/Sri Lanka. The PIBA page's linked public JavaScript was read statically; its English `evisaDescription2` confirms these conditions. URL and SHA-256 are preserved in the ledger.

A concrete counterexample is **Chinese passport holders residing in Japan**: Israel's [2026 Tokyo consular instructions in Japanese and English](https://embassies.gov.il/sites/default/files/2026-01/b2_entry_visa_for_chinese_citizens_2026_1.pdf) require a prior B2 application with original passport and documents submitted by registered mail. That route contradicts an unconditional electronic-visa classification for that traveller profile. The Indian/Sri Lankan entries are **conditionally supported**, not automatically wrong.

**Recommendation:** preserve separate ETA/eVisa source types and passport-type/residence/purpose conditions, backed by destination-government sources. Re-review the 97 `e-visa` source entries. Do not infer 194 replacement classifications from this counterexample or silently equate an online application form with issuance of an eVisa. Where rules are unresolved, retain an explicit unknown/unverified state.

### F92 — Visa completeness checker can certify an incomplete matrix (P2)

The documentation says `check-visa-access.mjs` fails when any destination is missing. An isolated reproduction removed **GB→CN from both CSV and generated object**, then updated the recorded CSV hash. The checker exited **0**, printing **195 passports × 194 destinations**, although GB had only **193** foreign destinations. Clean baseline passed; the same mutation also passed with PR #1711's checker. Exact hashes, output and steps are in the ledger.

The checker compares each generated row to the same CSV-derived row without asserting the complete expected destination set. The **generator** does check the row count; this finding is specifically the independently advertised checker guarantee. **Recommendation:** assert `UN_CODES minus origin` equality for every row, reject duplicate source pairs, and calculate success counts from inspected data. Include an omission test that fails even when source and generated data omit the same pair. No production file was mutated by Codex.

### Independent verification of Opus's F84–F89 corrections

Detailed [remediation evidence](audit/REMEDIATION_INDEPENDENT_VERIFICATION_2026-09-27.json) preserves the exact scope of closure:

| Finding | Independent result at `7c75c318` | Remaining qualification |
|---|---|---|
| F84 | **Specific fix verified:** Lääne description now says eagle, matching the Estonian Government Office blazon. | Other dates/interpretations keep their earlier per-claim statuses. |
| F85 | **Specific fix verified:** Võru sword orientation now matches the inspected artwork. | Does not close all historical symbolism claims. |
| F86 | **Identifier fix verified:** both unrelated Elva identifiers removed; old/new full-image raster pixels identical. | Per-file provenance/version/licence manifest remains open. |
| F87 | **Partly resolved:** Labour 34 and ACT 11 corroborated by Parliament. | Current seat denominator/membership needs a consistent as-of basis; all four 123 denominators are not independently certified as current occupied membership. |
| F88 | **Specific fix verified:** both Green co-leaders named, supported by their current party profiles. | No blanket certification of all party fields. |
| F89 | **Internal contradiction fixed:** all 842 records rescanned; six previous singleton-label mismatches gone; new consistency guard present. | This does not independently certify all ideological classifications or range judgments. |

F87 source conflict remains explicit: the [Parliament overview](https://www3.parliament.nz/en/mps-and-electorates/political-parties/) still shows National 49 / Green 14, while the [official former-member record](https://www3.parliament.nz/mi/mps-and-electorates/former-members-of-parliament/collins-judith/) ends Judith Collins's Papakura tenure on **14 May 2026**. A November 2025 membership table is insufficient to establish September 2026 occupied membership. Do not resolve this by blindly choosing either the overview or the app. F88 was corroborated with [Davidson's](https://www.greens.org.nz/marama_davidson) and [Swarbrick's](https://www.greens.org.nz/chloe_swarbrick) current profiles.

### Public deployment at this checkpoint

The [new deployment ledger](audit/LIVE_VISA_AND_REMEDIATION_2026-09-27.json) records publicly served bundle `index-CPKeRKiC.js`, build **`07b14a3` / 2026-09-27T11:52:47.632Z**. Static extraction of the complete visa object matches all 37,830 repository pairs, so **F90 and F91 reach the public bundle**. Corrected NZ seat values/co-leader names and National grouping are also in that bundle. This supersedes the earlier `014d3a4` deployment observation **for this retrieved deployment only**.

Method: read-only HTTP retrieval and static inspection, without executing downloaded JavaScript. This is **not** a new rendered-map/UI check, does not establish individual browser cache state, and predates PR #1711. Other Opus fixes remain awaiting independent verification unless separately documented.

**Progress:** universal verification remains incomplete. The earlier approximate **10% complete / 90% remaining** workload estimate is still the best rough estimate; these 37,830 reproduction comparisons must not be counted as 37,830 independently verified visa policies. A defensible atomic-claim percentage still requires a complete inventory. Evidence files above were saved to `main` and read back exactly; no application changes made by Codex.

## Public deployment reconciliation — 27 September 2026

The [served-build evidence ledger](audit/LIVE_DEPLOYMENT_VERIFICATION_2026-09-27.json) records direct HTTP retrieval from [the public application](https://wladimirchagas.github.io/Hana-s-flag-game/). Its HTML referenced `assets/index-CKYpuTC7.js`; that bundle identifies build **`014d3a4`**, timestamp **2026-09-27T03:52:30.284Z**. This is an audit-document commit after application revision `e3c1a35`.

Static inspection confirms that the public bundle contains **Labour 36 seats, ACT 8 seats, James Shaw as Green co-leader, all four 120-seat denominators, and all six F89 grouping contradictions**. All **four publicly served NZ logo files are byte-for-byte identical** to the pinned repository assets. The ledger preserves URLs, bundle/image SHA-256 values and extracted fields.

These are observations of public HTTP responses and bundled data, **not a fresh rendered-browser UI check** or a claim that every user's cached service-worker version is identical. No downloaded application JavaScript was executed during this check. The earlier rendered-UI observations remain separately dated below.

## New Zealand parties and global position consistency — 27 September 2026

The [New Zealand field ledger](audit/NEW_ZEALAND_PARTIES_CLAIM_VERIFICATION_2026-09-27.json) now assesses **all 82 populated top-level fields in all four NZ records** at `e3c1a35`. A field can contain several claims: this is full field coverage, **not 82 verified facts**. Founding years, party identities, three current leaders and government participation were corroborated through the Electoral Commission, Parliament, Cabinet Office, Ministry for Culture and Heritage, Te Papa and party sources. Māori-interface parliamentary pages were consulted alongside English sources; much of their factual body text remains English.

All four SVGs were rendered and their hashes/embedded identifiers checked. ACT, Green and Labour have recognizable wordmarks/symbols corroborated by Parliament-hosted artwork; this does not certify exact variants. Labour's reference has a red fern on a white panel and outer border, unlike the bundled white-on-red fern. National's current website has a flat N, whereas the repository has fold shading. The [Electoral Commission register](https://elections.nz/democracy-in-nz/political-parties-in-new-zealand/register-of-political-parties) records a new National logo on **22 May 2026**, but that exact registered image could not be visually retrieved. Its identity/version comparison remains open. No unsupported wrong-logo finding is asserted. All four files lack embedded title/description/rights metadata; external registry fields provide identity, but their generic non-free notes do not independently establish rights or original provenance.

### F87 — Incorrect New Zealand seat counts and an unqualified nominal denominator

**Confirmed, high for factual counts.** `NZ-LAB.seats = 36` should be **34**, and `NZ-ACT.seats = 8` should be **11** for both the [official 2023 general-election result](https://archive.electionresults.govt.nz/electionresults_2023/) and the [parliamentary overview](https://www3.parliament.nz/en/mps-and-electorates/political-parties/). [Hansard on 25 August 2026](https://hansard.parliament.nz/hansard-transcript/2026-08-25?lang=en) corroborates those strengths.

All four records use `seatsTotal = 120`, the nominal chamber size, without distinguishing it from actual allocation or occupied membership. The general-election result allocated 122 seats; the subsequent Port Waikato seat brought the allocation to 123. Later vacancies require a separate occupied-seat count. Use dated fields for nominal size, allocated seats, occupied seats and party membership, and make ratios use a compatible denominator.

**Avoid a false correction:** National's stored 48 and Green's 15 agree with the 2023 result and August 2026 Hansard. The parliamentary overview instead displays 49 and 14. Preserve that source conflict; a recent crawl is not proof that every field was updated, and voting strength alone is not a complete membership census. NZ First and Te Pāti Māori are absent from the curated NZ set despite holding seats. This is a coverage gap under the explicitly incremental dataset, not evidence of fabrication.

### F88 — New Zealand Green Party displays a former co-leader as current

**Confirmed, medium.** `NZ-GRN.leader = "James Shaw"` is stale. The [party's current people page](https://www.greens.org.nz/about) identifies **Marama Davidson and Chlöe Swarbrick** as co-leaders. [Parliament's Swarbrick record](https://www3.parliament.nz/en/mps-and-electorates/members-of-parliament/swarbrick-chloe/) dates her co-leadership to **10 March 2024**. Model leaders as an array with role and tenure dates, so co-leadership is not silently reduced to one person. Historical Shaw information belongs in a dated historical record.

### F89 — Six party grouping values contradict their stored source labels

**Confirmed internal inconsistency, medium; no independent ideology judgment.** A scan of **all 842 party records** compared exact, single-category `positionRaw` strings with the corresponding `ideologyPosition` enum. Complex ranges were excluded. The [complete mismatch ledger](audit/PARTY_POSITION_CONSISTENCY_2026-09-27.json) contains:

| Party record | Stored source label | Actual UI grouping |
|---|---|---|
| `PL-PSL` | Right-wing | Centre-right |
| `MX-MORENA` | Centre-left | Left |
| `GH-NPP` | Centre-right | Right |
| `NZ-NAT` | Centre-right | Right |
| `ZA-DA` | Centre-right | Right |
| `ZA-EFF` | Far-left | Left |

`PoliticalPartyGrid.tsx` groups directly on `ideologyPosition`, and the data model supports each of these categories separately. Resolve each contradiction against dated, attributable evidence rather than choosing one field arbitrarily. Add a consistency gate for exact singleton labels, with explicit documented overrides where justified. Other records passing this check are internally consistent only; their political classifications are not thereby verified.

**Still open in this batch:** full ideology-tag substantiation, exact registered artwork versions and colours, original image/licence provenance, and a fresh rendered-UI check. Public bundle/artwork reconciliation is documented above. The broader universal audit remains incomplete. No application data or artwork was changed.

## Population continuation — 27 September 2026

The [Estonia population ledger](audit/ESTONIA_POPULATION_CLAIM_VERIFICATION_2026-09-26.json) now preserves a complete comparison of **67 repository record instances** against Statistics Estonia table [RV0291U](https://andmed.stat.ee/en/stat/rahvastik__rahvastikunaitajad-ja-koosseis__rahvaarv-ja-rahvastiku-koosseis/RV0291U): 15 counties, 11 county aliases, 26 municipalities and 15 capital populations. **All 67 numbers match the official table for their stated year.** Aliases are not additional geographic entities.

The figures refer to 1 January of the stated year. Capital values correctly match city settlement units where the surrounding municipality is larger: for example, Tartu's 2024 settlement population is 97,759, while its city municipality has 101,032. Preserve this scope in metadata. These matches do not independently verify capital status, ISO-code validity, border geometry, or ratios calculated against a live national denominator. The API query and source-response hashes are recorded for reproducibility. Source retrieval/comparison occurred on 26 September UTC; repository persistence was completed on the next continuation.

The repository head was rechecked on 27 September: it still contained the preceding audit commits, with no new application revision beyond the pinned `e3c1a35` snapshot.

## Estonia county continuation — 26 September 2026

All **15 county flag images** were compared with the Estonian Government Office's SVG artwork and Estonian-language descriptions. All 15 complete Learn descriptions and internal SVG identifiers were inspected. The [Estonia evidence ledger](audit/ESTONIA_COUNTY_CLAIM_VERIFICATION_2026-09-26.json) contains **136 claim groups: 104 verified, 13 corroborated by a secondary-hosted booklet, 4 partly verified, 10 unverified, 2 conflicting, 1 imprecise, and 2 incorrect**, plus two incorrect internal image identifiers. These are grouped checks, not a universal atomic-claim denominator. Major visual identity and heraldic elements agree for all 15; exact geometry, colour specifications and licensing are not certified.

The National Archives' [county-flags panel](https://www.ra.ee/wp-content/uploads/2017/01/2-1600x2133.jpg) confirms the shared white/green pattern's approval on **7 August 1939**. This is the common pattern's history, not the adoption date of every later county's design. All 22 panels from its [historical exhibition](https://www.ra.ee/naitus/maakondade-lipud-ja-vapid/) were downloaded; five relevant panels were read at full size, while the remaining panels were screened only at contact-sheet scale.

### F84 — Lääne's eagle is called a hawk

**Confirmed, medium.** `src/data/flagMeanings.ts`, `EE-57`, says “silver hawk.” The [Government Office's Estonian blazon](https://www.riigikantselei.ee/laane-maakonna-vapp-lipp-ja-teenetemark) identifies an **eagle** (kotkas), rising and looking back, with a gold halo on a red shield. Both the official artwork and repository flag carry the eagle. Correct the species in the explanatory text; retain the separately verified halo and tinctures.

### F85 — Võru's sword direction contradicts the current artwork

**Confirmed, medium.** `EE-86` says the sword points downwards. In both the [Government Office's current flag](https://www.riigikantselei.ee/voru-maakonna-vapp-lipp-ja-teenetemark) and `public/flags/sub/EE/EE-86.svg`, the blade points toward the **viewer's upper right**, with the hilt at lower left. Some [earlier proposals](https://www.ra.ee/wp-content/uploads/2017/01/10-1-1600x2133.jpg) did have downward swords, but they are not the current design displayed. Describe the present orientation explicitly rather than inferring blade direction from the heraldic term for diagonal placement.

### F86 — Two county SVGs retain an unrelated town identifier

**Confirmed, low; embedded metadata only.** `public/flags/sub/EE/EE-37.svg` (Harju) and `EE-51.svg` (Järva) both contain the root identifier and Inkscape current-layer label **“Flag of Elva.”** Their visible designs are the appropriate county flags, and their document-name attributes identify the counties correctly. This is stale internal identification, not proof that the displayed flag is Elva's. Replace the identifier and dependent references consistently. Add a provenance record linking the entity, artwork version, source and licence; an SVG filename or generic RDF format entry is insufficient verification.

### Estonia cautions and cleared suspicions

- **Ida-Viru's “first granted in 1928” remains a conflict.** The [National Archives' Virumaa panel](https://www.ra.ee/wp-content/uploads/2017/01/9-1600x2133.jpg) says first confirmation in 1930 and reproduces the government decision dated 12 February 1930; a [Viru Instituut historical quiz](https://viruinstituut.ee/vii-vooru-vastused_2019/) gives 1928. An earlier local adoption could explain the difference. Require the event, authority and primary record before asserting a universal first-grant date.
- **Jõgeva's registration month is unresolved:** app 10 October 1996 versus 10 November in a [secondary-hosted historical booklet](https://geopoliticaybanderas.wordpress.com/wp-content/uploads/2018/09/estonia-condados.pdf#page=4). The original register entry is still needed. Thirteen other flag-registration dates match that booklet but are not upgraded to primary verification.
- Hiiu's “four parishes” should identify historical administrative units and period. The Government Office says four `valda`; parish can translate a civil municipality in English but also suggests the different `kihelkond` concept. Do not infer today's subdivision count.
- **Cleared:** Ida-Viru and Lääne-Viru correctly have different roof colours (red/gold). Jõgeva's clover is present. Saare's seven shields, Tartu's six-pointed star and Valga's four five-pointed stars agree with the official references.
- Repository drawings differ from Government Office renderings in shield size and linework. This pass establishes identity and major heraldic content, not a legal finding that every drawing variation is prohibited. Harju/Järva's 471:300 canvas is a small rounding difference from 11:7, not a material ratio error.

No application data or artwork was changed. The current repository head was rechecked before this continuation's saves; no newer application revision was found beyond the pinned `e3c1a35` snapshot.

## Current continuation — 26 September 2026

**Progress estimate: approximately 10% complete / 90% remaining.** This estimates the work required for universal independent verification, not the percentage of a fully enumerated atomic-claim inventory. The completed comparisons below do not establish that all narratives, boundaries, historical periods, logos, licences, or metadata are correct.

Latest pinned application revision: **`e3c1a35e2d7930630c616be12c6510576ded0f6a`**. Complete recursive Git trees establish **521 added/modified paths plus 149 removals (670 paths total)** since `11e30bb`; GitHub's comparison response was capped at 300 files and is not a complete inventory. The full delta still requires substantive review. Current deployment has not been independently rechecked; previous live observations remain pinned to their observed build.

### Primary-source comparisons completed in this continuation

| Dataset | App records compared | Result and limits |
|---|---:|---|
| UNDP Human Development Index | 192 | Scores and publisher ranks match; 2023 observations in 2025 report; movement reconstructed within the same data vintage |
| World Justice Project | 141 | Scores, ranks and common-country movement match; displayed score bands are app-derived |
| Lowy Global Diplomacy Index | 64 | Post counts and ranks match; 2023 collection in 2024 edition; bands app-derived |
| World Happiness Report | 144 | Scores, ranks and movement match; 2026 report, 2023–2025 survey average |
| WEF Global Gender Gap | 145 | Scores, ranks and movement match; new entrants correctly have no movement; bands app-derived |
| IMD World Competitiveness | 66 | Scores, ranks and movement match; normalized scores, not absolute percentages |
| Ecological Threat Report | 170 | Overall scores and derived ranks/categories match; 2024 data in 2025 report |
| Freedom House 2026 replacement | 193 | All scores and statuses match; all 207 repository source-table rows also match the primary table |
| Global Peace Index | 160 | All scores, movements and categories match; **159 ranks match, Honduras does not** |
| Reuters Digital News Report | 46 | All trust scores and app-derived ranks/bands match; online survey scope applies |
| Brand Finance Soft Power Index | 193 | All scores and current ranks match; Guatemala movement wrong; 19 movements omitted despite source availability |
| Global Terrorism Index | 161 | All scores, publisher ranks, movement and categories match |

These are **1,675 record instances**, not 1,321 universally certified country records. Every comparison has a field-level ledger in `docs/audit/*_CLAIM_VERIFICATION_2026-09-26.json` (Freedom House uses `FREEDOM_HOUSE_2026_CLAIM_VERIFICATION_2026-09-26.json`). Source URLs, hashes, values, comparison outcomes and limits are preserved there. All earlier index datasets listed here were confirmed unchanged in the current country-facts snapshot; Freedom House uses the replacement snapshot.

**Resolution of earlier Freedom House finding:** F46's 2024 score/status discrepancies describe the old dataset. The current 2026 replacement corrects those discrepancies; do not report the old 94 score and seven status disagreements as current defects. Source ranks are still app-derived and require that qualification.

### F77 — Global Peace Index gives Honduras Cambodia's rank

**Confirmed, medium.** The current app gives Honduras score **2.075**, rank **96**, and movement **+13**. The publisher's 2026 ranking gives Cambodia **96** and Honduras **97**, despite both scores rounding to 2.075. Preserve publisher rank **97** for Honduras; do not re-rank rounded scores or infer a tie the publisher does not show. The other 159 app ranks match. Evidence: [Institute for Economics & Peace, Global Peace Index 2026](https://www.economicsandpeace.org/wp-content/uploads/2026/06/Global-Peace-Index-2026-Report.pdf), PDF pages 12–13, and the GPI ledger.

### F78 — Guatemala's Soft Power movement is wrong; 19 available movements are absent

**Confirmed numeric error, medium; separate completeness gaps.** Guatemala's 2026 rank is **126** and its previous rank on the publisher's card is **120**, a movement of **−6**. The app displays **−4**. All 193 current ranks and scores match. Of 174 movement values provided by the app, 173 match. Another 19 entries omit movements available in the primary report; these omissions are not false numerical claims. They are AF, DJ, ER, FM, KI, KN, LC, LS, MH, NR, PW, SL, SO, SR, TL, TO, TV, VC and VU. Evidence: [Brand Finance Global Soft Power Index 2026](https://static.brandirectory.com/reports/brand-finance-soft-power-index-2026-digital.pdf), complete country cards on PDF pages 6–9 (Guatemala on page 8, visually checked), and the Soft Power ledger.

**GTI presentation qualification:** positive rank movement means movement toward rank 1, which in this index means greater terrorism impact, not an improvement. The source table agrees with all 161 app entries; that comparison does not independently verify map colours, arrow semantics in the rendered UI or the underlying event coding. No-impact is an index category, not a guarantee of safety.

### F79 — Necenzurirano.si and N1 are falsely merged

**Confirmed, high.** `si-necenzurirano` is named “Necenzurirano.si / N1 Slovenija news”; its logo caption calls N1 “Necenzurirano.si” and assigns United Media / N1 ownership to the combined identity. These are separate outlets. [Necenzurirano's Slovenian imprint](https://necenzurirano.si/info) identifies Media Partner Agencija d.o.o. and editor Primož Cirman. [N1's Slovenian imprint](https://n1info.si/impresum/) identifies Adria News Network, part of United Media. The bundled N1 SVG does not substantiate a Necenzurirano identity. Select one outlet and align its ID, name, publisher, dates, source and artwork; do not create an alias relationship to justify a different logo.

### F80 — Central-bank coverage includes false presence and absence claims

**Confirmed, high.** The new `src/data/centralBanks.ts` contains 195 country entries, but its coverage rule confuses national banking institutions with central banks:

| Country | App claim | Primary evidence / correction |
|---|---|---|
| San Marino | No national central bank; euro use offered as explanation | [BCSM](https://www.bcsm.sm/en/the-central-bank) identifies the Central Bank of the Republic of San Marino, established in 2005. Foreign-currency use does not determine whether a central bank exists. |
| Andorra | AFA described as “this central bank” | [AFA](https://www.afa.ad/en/coneix-lafa/qui-som) describes its prudential supervisory role; [IMF analysis](https://www.elibrary.imf.org/abstract/journals/018/2025/152/article-A001-en.xml) distinguishes AFA from an absent central bank. |
| Kiribati | Bank of Kiribati as current central bank | [IMF 2024 Pacific study](https://www.imf.org/-/media/files/publications/dp/2024/english/rdmea.pdf), PDF page 46, states no central bank; [2024 Article IV annex](https://www.elibrary.imf.org/view/journals/002/2024/103/article-A002-en.xml) identifies ANZ Bank (Kiribati) as commercial. |
| Nauru | Bank of Nauru as current central bank | Same IMF study, PDF page 48, states no central bank. [IMF 2025 consultation](https://www.imf.org/en/news/articles/2025/09/19/pr-25306-republic-of-nauru-imf-executive-board-concludes-2025-article-iv-consultation) still identifies liabilities from Bank of Nauru's liquidation. |
| Tuvalu | National Bank of Tuvalu as central bank | [IMF 2025 report](https://www.imf.org/-/media/files/publications/cr/2025/english/1tuvea2025001-source-pdf.pdf), PDF pages 11, 48 and 55, explicitly states no central bank. |
| Panama | Banco Nacional de Panamá treated without qualification as central bank | [The bank's Spanish journal](https://www.banconal.com.pa/wp-content/uploads/2024/09/Pilar_Financiero_Vol_4.pdf), printed page 30, distinguishes its payment-system and state-financing functions from Panama's absence of a central bank. Retain those functions with the correct institution type. |

These are identity/classification findings, not an assertion that the institutions perform no public monetary functions. The Vatican APSA classification remains under review rather than implicitly accepted.

A separate completeness gap affects Bulgaria: the generator's Eurosystem country table omits BG. The [ECB's 1 January 2026 announcement](https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260101~c830245e42.en.html) confirms that the Bulgarian National Bank joined the Eurosystem. Add the same dated membership qualification supplied for other members.

### F81 — Morocco's current logo is attached to a defunct predecessor

**Confirmed, high.** The Morocco entry is named `Banque d'Etat du Maroc` and cites that historical entity's Wikidata item, while its artwork and caption identify **Bank Al-Maghrib**. The bank's [French institutional presentation](https://www.bkam.ma/content/download/413959/3380547/version/9/file/Pr%C3%A9sentation%2BMissions%2BBAM.pdf), page 10, distinguishes the predecessor's termination in 1959, its replacement by Banque du Maroc and the 1987 Bank Al-Maghrib name. Correct the current entity and retain predecessor dates only in an explicitly historical relationship. Fixing artwork alone does not fix this record.

### F82 — Brunei displays the former AMBD logo as the current BDCB mark

**Confirmed historical/current conflation, medium.** The bundled `brunei-darussalam-central-bank.jpg` visibly reads “AUTORITI MONETARI BRUNEI DARUSSALAM”; the record's website remains `ambd.gov.bn`, while the name and caption claim the current BDCB institution. [BDCB's own publication](https://cms.bdcb.gov.bn/storage/uploads/publications/17089419184813540.pdf), PDF page 12, dates the renaming to 26 June 2021 and expressly describes a refreshed logo. Its [2024 statement](https://www.bdcb.gov.bn/publications/details?id=01j6rrjmvh5hdwkc0hyc4nz5bm) also distinguishes the former name and logo. Use current primary artwork, or label the AMBD asset as historical with a date range; retain the former name as a previous-name fact.

### F83 — Central-bank generators overstate what their checks establish

**Confirmed implementation/documentation problem, high for assurance.** `harvest-central-banks.mjs` hard-codes San Marino into `NO_OWN_CB`, accepts positive-scoring candidates from a Wikidata type query, and uses name-pattern exclusions instead of current institutional evidence. It does not test dissolution dates or require a primary confirmation of institution type. `build-central-banks.mjs` then publishes all selected records. A logo path plus a caption of at least 25 characters and string-based rejection tests cannot establish the caption's “official” or “visually checked” assertions.

**93 records** repeat the default claim that Wikidata, Commons and the official bank website were checked. KI, NR and TV have no website field or primary website source at all. The fallback is emitted by code without a per-source review log; it must not be presented as evidence of searches performed.

Require separate verified fields for institution type, current existence, jurisdiction, monetary-union relationship, previous names and artwork validity dates. Keep harvest output as pending candidates until those fields have source evidence. Replace the default research-history claim with a factual image-availability statement. Store actual review events separately.

### Latest image-delta screening and limits

All **510 non-document changed files** at `e3c1a35` were downloaded and matched their Git blob hashes. All **249 added/modified images** decoded and were visually screened: **96 central-bank marks, 76 subdivision flags, two capital flags and 75 media images**. This is a complete visual screen of this delta, not universal identity/geometry/heraldic certification. The central-bank registry has 195 entries, 96 with images.

At this revision the media registries contain **937 newspaper records (901 images)** and **166 agency records (165 images)**. All **30 prior confirmed wrong-entity assets** remain referenced with unchanged blobs through both intervening deltas. The saved image ledger records that reconciliation. Cross-registry duplicate IDs are counted as separate records; there are 1,103 total record instances, not 1,094 unique IDs. The current artwork coverage increase therefore does not close the earlier identity findings.


## Earlier reconciliation — application revision db3ba05

The audit now includes application changes through **`db3ba0559016b20bfd0243ef13b1d16413979b33`**. Audit-document commits after this hash are separate from application changes. The sections below that describe `43cfd13` retain their historical denominators.

Two further deltas were inspected: `43cfd13` → `d130b10` (409 additional images, two new newspaper-selection scripts, installer changes and registry changes), and `d130b10` → `db3ba05` (74 additional images, agency-category cleanup, grid rendering/CSS and checker changes). All **483** additional image blobs were fetched at their pinned hashes and decoded; every image was visually screened. The corresponding **503 record references** (428 + 75) were read. This is complete screening of these deltas, not certification that all depicted identities are correct.

At `db3ba05`, newspapers contain **937 records, 612 with images**; agencies contain **128 records, 113 with images**. **340 no-image records** remain across these two registries. The latest cleanup removes 60 agency entries and adds ten newspaper entries. Removal closes that entry’s agency-category problem, but does not verify the migrated facts or image. All five earlier F60 wrong-entity logos and all 25 further F64 wrong-entity logos remain referenced, unchanged.

The subsequent live UI check displayed build **`26a2f2d`**, an audit-document commit after `db3ba05`. On the live Klix.ba detail card, the masthead visibly reads **TELUS Digital**, with image URL `/newspaper-logos/ba/klix.jpg`; the card labels the outlet both a digital news portal and a daily newspaper. Bosnia and Herzegovina's national panel displays population **3.16 million** without an observation year. These are direct public-UI observations, not deployment inferred solely from repository content. No application data or artwork was changed by this audit.

A newer application head, **`7dda29d2444d237c6dde9dc3aabbec08408bd03b`**, was subsequently detected. Its delta is being reconciled separately; findings above are pinned to `db3ba05` until explicitly rechecked. The informal progress estimate requested by the user is approximately **10% complete / 90% remaining** against universal independent verification. This is a rough workload estimate, not a measured percentage of an exhaustively enumerated claim denominator.

## Earlier reconciliation — revision 43cfd13

Previous audited application revision: `63adaf34cbe32bc20c4362fe2636a1cd7bc5371b`. This pass also reconciles the three subsequent application commits through **`43cfd13b2194cdf57a5f32a7c910d4dd7ab04d67`**, after the earlier audit-save commits. The new delta contains **231 paths: 227 added newspaper/agency images, two added scripts, and two modified registries**. Every downloaded file matched its pinned Git blob hash. All 227 images decoded and were visually read, together with all 227 accompanying descriptions.

The registry changes affect **181 newspaper and 46 agency records**. Only `logo`, `logoExplainer`, `licenceNote`, and `noImageReason` changed. Ownership, founding dates, audience claims, frequency, category, headquarters and other factual fields were not corrected by these commits. Newspapers now have 231 images and 488 no-image records; agencies have 52 images and 136 no-image records. Thus F58's earlier count of 851 no-image claims is historical: **624 remain** in these two registries at this revision. This does not mean each retained statement about searches performed is true.

The most recent deployed UI previously inspected showed `63adaf3`. **This pass does not establish that `43cfd13` is deployed.** New findings below describe the pinned repository assets and the text the registries provide to Learn mode.

## Complete comparisons performed in this pass

| Claim group | Denominator | Result | Exact limits |
|---|---:|---|---|
| GDP and GDP per person, USD/local currency | 766 values | 758 match World Bank series values; eight unsupported fallbacks | Numeric/source agreement, not complete verification of currency presentation or economic methodology |
| Freedom House 2024 scores | 193 | 99 agree; **94 disagree** | Every bundled score checked against the stated edition |
| Freedom House 2024 status labels | 193 | 186 agree; **seven disagree** | Every bundled status checked; ranks and rank changes remain separate claims |
| Newly added media images | 227 | All exact blobs decoded and visually screened; five wrong entities and one additional conflict with current publisher branding identified | Visual screening is not primary-source certification of all remaining identities |
| New media image descriptions | 227 | Ten direct visual-description conflicts; five variant/rendering caveats recorded | No-conflict observations do not verify the prose's institutional or historical claims |
| Exact Commons artwork references in new media records | 85 | All requested; metadata recovered for 79; six unresolved | Commons records are evidence about the cited artwork, not blanket authority for official brand status |
| V-Dem v16 bundled entries | 173 | All scores and regime labels agree; all ranks/rank changes consistent with same-version tied-rank ranges | 2026 release, 2025 observations; PS is West Bank only; report-table differences are not treated as factual errors |
| GICG passport image provenance | 188 | **188/188 live source hashes match the manifest** | Third-party source consistency only; official issuance series/currentness not established |

The GDP and Freedom House counts are individual field comparisons, not merely file counts or sampled countries. The media ledger identifies the extent of each individual review.

## F46 expanded — widespread mismatch with the labelled Freedom House edition (P1)

The complete comparison confirms **94/193 score mismatches**, beyond the four examples in the earlier report. `src/data/countryFacts.ts` and `scripts/data/democracyData.mjs` label these records 2024. Do not describe this as merely using an older accurate edition: many values do not match the edition actually labelled.

| Country | Bundled score | Published 2024 score |
|---|---:|---:|
| Bangladesh | 45 | 40 |
| Bhutan | 68 | 63 |
| Germany | 95 | 93 |
| India | 63 | 66 |
| Kuwait | 31 | 38 |
| Sudan | 2 | 6 |
| Syria | 5 | 1 |
| Tunisia | 44 | 51 |
| United States | 84 | 83 |

The seven incorrect status labels are:

| Country | Bundled | Published 2024 |
|---|---|---|
| Bhutan | Free | Partly Free |
| Jordan | Partly Free | Not Free |
| Kuwait | Not Free | Partly Free |
| Niger | Not Free | Partly Free |
| Senegal | Free | Partly Free |
| Thailand | Not Free | Partly Free |
| Tanzania | Not Free | Partly Free |

Source method: 185 individual 2024 report headers were read directly, Belgium and Bolivia were resolved from the primary pages' search extracts, and six remaining scores/statuses were established from the explicitly labelled previous-year figures in their 2025 reports: Austria, Bosnia and Herzegovina, Burundi, Benin, Bahamas and Central African Republic. The evidence URL and method are preserved per row. This is not substituting 2025's current score for 2024's score.

Examples: [Bhutan 2024](https://freedomhouse.org/country/bhutan/freedom-world/2024), [Kuwait 2024](https://freedomhouse.org/country/kuwait/freedom-world/2024), [US 2024](https://freedomhouse.org/country/united-states/freedom-world/2024), [Bahamas 2025 with previous-year figure](https://freedomhouse.org/country/bahamas/freedom-world/2025).

**Required change:** regenerate score, status and edition together from a reproducible publisher dataset. Identify app-derived rankings as such, document the country universe and tie rule, and calculate rank changes from two real editions. All bundled Freedom House `rankChange` values are zero; their factual validity has not been established. Re-ranking this same 193-country set by the verified scores using competition ranking would change 147 bundled rank numbers; that is an audit calculation, not an official Freedom House ranking.

## F47 expanded — all GDP values compared, provenance/freshness still defective (P1)

All 766 numeric fields were compared with the primary World Bank API's `NY.GDP.MKTP.CD`, `NY.GDP.MKTP.CN`, `NY.GDP.PCAP.CD`, and `NY.GDP.PCAP.CN` series for 2021–2025. The downloaded response metadata reported `lastupdated: 2026-07-13`. Comparison tolerance was 0.011 to accommodate the bundle's two-decimal rounding.

**758 match**: 750 observations from 2024, four from 2023 and four from 2022. Among matching values, **724 have a newer 2025 observation available** in the retrieved series. Old-but-accurate observations must not be called fabricated; omission of their year and an unsupported implication of currentness are the relevant defects.

The eight unmatched values are the USD GDP and USD GDP-per-person fallbacks for Eritrea (2.1 billion / 600), North Korea (24.5 billion / 960), South Sudan (7 billion / 590), and Yemen (21 billion / 650). The retrieved primary series does not substantiate them in 2021–2025. This establishes unsupported fallbacks, **not proof that the numbers were invented or can never be supported by another source**.

Source example: [World Bank GDP series](https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2021:2025&per_page=20000). Each ledger row includes its indicator, country-specific API URL, matching year(s), latest available year/value and source update date.

**Required change:** retain source, observation year, series identifier, currency/unit, retrieval date and estimate/revision status alongside every value. Unsupported fallbacks should be omitted or explicitly labelled with their actual independent source and year. Do not equate a metadata fetch date with the observation year.

## F60 — new logo backfills still substitute other countries' publications (P1)

| Registry ID and file | Actual identity evidenced by its cited artwork | Evidence |
|---|---|---|
| `bg-trud`, `public/newspaper-logos/bg/trud.png` | Soviet trade-union newspaper Trud; not Sofia's Trud | [Exact cited file](https://commons.wikimedia.org/wiki/File:LogoTrud.svg) identifies the Soviet publication. [Bulgarian publisher artwork](https://trud.bg/frontend/images/logo-2023.svg) was downloaded and visually compared. |
| `hu-blikk`, `public/newspaper-logos/hu/blikk.svg` | Norwegian Blikk magazine; not the Hungarian tabloid | [Exact cited file](https://commons.wikimedia.org/wiki/File:Blikk_logo.svg) points to blikk.no. Both publishers' official logos were downloaded and viewed: [Norway](https://www.blikk.no/view-resources/dachser2/public/blikk/blikk_logo-black.svg) and [Hungary](https://www.blikk.hu/). |
| `mx-el-universal`, `public/newspaper-logos/mx/el-universal.svg` | El Universal of Cartagena, Colombia; not Mexico City's newspaper | [Exact cited file](https://commons.wikimedia.org/wiki/File:Logo_El_Universal_2021.svg) explicitly identifies Cartagena and supplies the [Colombian publisher's artwork](https://portales.eluniversal.com.co/externos/logo-eu-rediseno-2021.svg), which was downloaded and visually compared. |
| `tn-assabah`, `public/newspaper-logos/tn/assabah.jpg` | Moroccan Assabah; not the Tunisian publication | [Exact cited file](https://commons.wikimedia.org/wiki/File:Assabah-logo.jpg) names assabah.ma as source and identifies Moroccan usage. [The publisher](https://assabah.ma/) describes itself as a Moroccan daily. |
| `pe-la-republica`, `public/newspaper-logos/pe/la-republica.jpg` | Colombian La República; not the Lima daily | [Exact cited file](https://commons.wikimedia.org/wiki/File:La_República_logo.jpg) identifies [Q735264, the Colombian newspaper](https://www.wikidata.org/wiki/Q735264). The bundled red speech-bubble LR artwork is the cited image. This identity determination uses the artwork's explicit metadata; current official-brand status is a separate question. |

Additional conflict: `es-el-mundo` uses an oversized red M. The [Spanish publisher's current homepage](https://www.elmundo.es/) supplies a different inline masthead, with a blue globe between EL and MUNDO; it was extracted and visually compared. The [cited Commons file](https://commons.wikimedia.org/wiki/File:Periodico_El_Mundo.svg) is categorised under Medellín. Treat the Spanish assignment as unsupported/conflicting with current publisher branding; do not assert the exact alternate publication without further primary evidence.

These results contradict the latest commits' broad assurance of visually verified, collision-guarded mastheads. Exact title matching is insufficient where different entities share a name. Replace or temporarily omit the affected artwork. Bind source selection to **entity identity, country and official domain**, then verify the actual selected image and its variant.

## F61 — new explanatory metadata contradicts bundled pixels (P2)

Historical 20 September observations follow. **The 28 September F61 recheck above supersedes current status: the Japan Times assertion is withdrawn, four records are removed, and Ukrainska Pravda's caption changed.** The remaining pixel comparisons do not establish official brand adoption:

| ID | Description says | Bundled image shows |
|---|---|---|
| `in-dainik-jagran` | Devanagari masthead | Latin `Jagran` below a sun |
| `kr-donga-ilbo` | Hangul | Hanja `東亞日報` |
| `kr-joongang-ilbo` | Hangul | Latin `The JoongAng` |
| `jp-japan-times` | Red dotted j | **WITHDRAWN 28 Sep — auditor error:** unchanged SVG does have the red dot; see F61 recheck above. |
| `nz-1news` | Red wordmark | Red circular 1 and black news |
| `it-il-sole-24-ore` | White 24 ORE block | Black lettering with grey shadow |
| `ph-rappler` | Wordmark | Orange R emblem without the name |
| `ua-ukrainska-pravda` | Full wordmark | УП monogram |
| `se-dagens-nyheter` | Full masthead | DN. monogram |
| `sk-hospodarske-noviny` | Full masthead | HN ONLINE.SK lockup |

The monogram cases may still depict the correct organisation; their error is the explanation of the selected variant. Correct `logoExplainer` against the exact bytes used, rather than a remembered or different logo.

Also record actual variants: Página/12 carries a commemorative strap; La Jornada carries a 40-year anniversary device; Nhân Dân uses a Russian-edition lockup; El Observador includes a follow-us callout. These are not automatically fabricated images, but the metadata omits what was selected. Lithuania's Delfi SVG uses CSS animation; its overlapped static rasterisation must **not** be reported as a proven browser defect without a browser check.

## F62 — artwork provenance is not sufficiently preserved or identity-checked (P1)

Of the 227 backfills, 85 cite a specific Commons filename in `licenceNote`; the other 142 generically claim publisher-site brand assets. The cited Commons pages were all requested and source metadata obtained for 79. Six remained unresolved: Dnevnik, Ilta-Sanomat, Al-Joumhouria, Nhân Dân, Notimex and Hufvudstadsbladet. A retrieval failure does not establish a nonexistent source.

The new installer reads temporary harvest files, writes image/explainer/licence text, and prints a shortened hash. The harvester writes its detailed report under `tmp/logo-harvest/harvest-report.json`; that report is not among these committed additions. A generic publisher homepage or educational-use statement does not preserve the exact downloaded asset, author, modification history or declared licence.

Several cited Commons files have explicit Creative Commons terms, while `licenceNote` records only a generic trademark/educational-reference sentence. Preserve the actual file-page licence, author and applicable attribution separately from trademark status. This is a metadata finding, not a legal determination that every use is unauthorised.

**Required change:** commit a provenance manifest with exact source page, exact asset URL, stable entity ID, publisher country/domain, source revision, original/bundled hashes, transformations, licence/author, variant, applicable period, and specific verification results. Neither complexity thresholds nor a human-sounding verification sentence should qualify an asset as authentic. The four earlier publisher/agency consistency checks did not test these identity claims.

## F63 — Japan tourism record is accurate rounding but not the latest annual total (P2)

Japan's 36.9 million for 2024 is a reasonable rounding of the definitive **36,870,148** count. However, JNTO's Japanese-language annual table already gives **42,683,301 for 2025** and identifies 1964–2025 figures as definitive. The 2019 comparison baseline is 31,882,049. The problem is freshness under the dataset's latest-annual contract, not fabrication of the rounded 2024 number.

Primary source: [JNTO annual table](https://www.jnto.go.jp/statistics/data/_files/20260819_1615-8.pdf), reached from the [Japanese statistics index](https://www.jnto.go.jp/statistics/data/visitors-statistics/). The PDF was downloaded, rendered and visually read. Store the tourism measure precisely: visitor arrivals are not interchangeable with unique tourists, overnight stays or domestic trips.

## Passport evidence: origin verified, official series still unresolved

The source manifest identifies 188 passport images as drawn cover renderings obtained from GICG. Each live source image was fetched and SHA-256 compared: **all 188 match the recorded manifest hashes** after retrying 17 timed-out requests. No changed source bytes were found. This does not independently validate GICG's depiction or the official passport series. It also does not prove the corresponding repository bytes match the manifest unless that separate check has been performed; this ledger specifically tests manifest-to-source consistency.

Do not collapse first-issued date, last-issued date and expiry/validity into a single current/historical label. [PRADO's Irish ordinary-passport record IRL-AO-06001](https://www.consilium.europa.eu/prado/en/IRL-AO-06001/index.html) gives first issue on **26 June 2026** and identifies a burgundy cover. Japan's [Ministry of Foreign Affairs](https://www.mofa.go.jp/mofaj/toko/passport/pagew_000001_01253.html) explains issuance of its 2025 passport from **24 March 2025** and continued validity of earlier passports until expiry. These establish the need for series-level metadata; they do not establish that every older cover is invalid or that the bundled Irish image depicts the new series.

F02's Japanese cover-symbol error and F14's missing version/period information remain open. No passport has been newly certified as a current official design solely because its source hash matches.

## F64 — 25 further wrong-entity logos in the newer media batches (P1)

Each item below is an actual bundled image, not a hypothetical name collision. The cited artwork metadata, readable image and/or publisher HTML identifies a different entity. These are **in addition to F60’s five**. All 25 remain in the current pinned application revision. Country and domain identity must be checked before a matching acronym or publication name is accepted.

| Record | What the bundled image actually represents | Evidence |
|---|---|---|
| `al-panorama` | German NDR/Das Erste Panorama television programme, not the Albanian newspaper. | [Source](https://commons.wikimedia.org/wiki/File:Panorama-Logo.svg) |
| `ba-klix` | TELUS Digital advertiser logo, not Klix.ba. Exact bundled bytes match the advertiser asset on Klix.ba; its img alt identifies TELUS Digital. | [Source](https://www.klix.ba) |
| `bo-la-razon` | Spanish La Razón (larazon.es), not the Bolivian newspaper. | [Source](https://commons.wikimedia.org/wiki/File:La_Raz%C3%B3n_logo.svg) |
| `bs-tribune` | Indian The Tribune (tribuneindia.com), not The Tribune of the Bahamas. | [Source](https://commons.wikimedia.org/wiki/File:The_Tribune_logo.jpg) |
| `cm-le-messager` | French Le Messager (lemessager.fr), not the Cameroonian newspaper. | [Source](https://commons.wikimedia.org/wiki/File:Logo_Le_Messager.svg) |
| `cv-a-semana` | Colombian Semana 35th-anniversary artwork, not Cape Verde’s A Semana. | [Source](https://commons.wikimedia.org/wiki/File:Logo-semana.svg) |
| `fi-aamulehti` | Visible HELSINGIN SANOMAT masthead, not Aamulehti. | [Source](https://www.aamulehti.fi) |
| `gm-daily-observer-gambia` | Bangladeshi Daily Observer (observerbd.com), not the Gambian publication. | [Source](https://commons.wikimedia.org/wiki/File:The_Daily_Observer.jpg) |
| `hn-diario-tiempo` | Argentine Diario El Tiempo (diarioeltiempo.com.ar), not Honduras’s Diario Tiempo. | [Source](https://commons.wikimedia.org/wiki/File:Logo_Diario_El_Tiempo.png) |
| `hn-la-tribuna` | Historical Paraguayan La Tribuna photograph; cited file use identifies Paraguay and visible nameplate names director Carlos Ruiz Apezteguia. Not a current Honduran masthead. | [Source](https://commons.wikimedia.org/wiki/File:Logo_La_Tribuna.jpg) |
| `jo-al-ghad` | AlGhad TV logo (alghad.tv), not the Jordanian newspaper Al Ghad. | [Source](https://commons.wikimedia.org/wiki/File:AlGhad_TV.svg) |
| `mu-l-express` | French L’Express magazine artwork; cited source issue numbers and file use concern the French publication, not Mauritius’s daily. | [Source](https://commons.wikimedia.org/wiki/File:Logo_L%27Express.svg) |
| `mv-avas` | Association of Voluntary Actions for Society (AVAS), not the Maldivian news website. | [Source](https://commons.wikimedia.org/wiki/File:Logo_of_AVAS.jpg) |
| `na-new-era` | New Era headwear brand mark, not Namibia’s New Era newspaper. Official manufacturer and newspaper sites corroborate different identities. | [Source](https://commons.wikimedia.org/wiki/File:New-Era-Logo.jpg) |
| `ng-the-punch` | Nigeria Police emblem, not The Punch masthead. The publisher page identifies the police image as an article thumbnail. | [Source](https://punchng.com) |
| `ng-thisday` | Federal Roads Maintenance Agency (FERMA) logo, not THISDAY. Exact bytes match the publisher’s FERMA article thumbnail. | [Source](https://www.thisdaylive.com) |
| `nz-the-post` | The Post film title artwork; Japanese file description and movie-logo category identify the film, not New Zealand’s newspaper. | [Source](https://commons.wikimedia.org/wiki/File:The_post_logo.png) |
| `pg-loop-png` | Loops.video social-video software logo, not Loop PNG news. | [Source](https://commons.wikimedia.org/wiki/File:Loops_logo.png) |
| `pt-expresso` | EXPRESSO German industrial equipment company logo, not Portugal’s Expresso weekly; primary expresso.de brand corroborates it. | [Source](https://commons.wikimedia.org/wiki/File:EXPRESSO_Logo.svg) |
| `py-abc-color` | American Broadcasting Company’s historical colour-TV logo, not Paraguay’s ABC Color. | [Source](https://commons.wikimedia.org/wiki/File:ABC_color_logo.jpg) |
| `by-belta` | Japanese BonBelta retail brand, not the Belarusian news agency BelTA. | [Source](https://commons.wikimedia.org/wiki/File:BonBelta.svg) |
| `bw-bopa` | Danish resistance group BOPA, not Botswana Press Agency. | [Source](https://commons.wikimedia.org/wiki/File:BOPA_logo.svg) |
| `ci-aip` | American Institute of Physics, not Agence Ivoirienne de Presse. | [Source](https://commons.wikimedia.org/wiki/File:AIP_Logo.png) |
| `ke-kna` | German Katholische Nachrichten-Agentur, spelled out in the asset, not Kenya News Agency. | [Source](https://commons.wikimedia.org/wiki/File:KNA-Logo.svg) |
| `ng-nan` | All Progressives Congress political-party logo, not News Agency of Nigeria. NAN homepage uses an APC article thumbnail as well as a separate NAN logo. | [Source](https://nannews.ng) |

The Klix image is byte-for-byte identical to `https://static.klix.ba/logos/logo_1759913845.png`, whose publisher HTML identifies TELUS Digital. THISDAY’s bundled image exactly matches its FERMA article thumbnail. These cases demonstrate that downloading from the correct publisher domain does not establish that the selected asset is that publisher’s logo. The new prose’s claim of official identity is false for these records; 155 of the 428 new references additionally say “visually verified,” which is not reliable evidence of a successful identity check.

**Required change:** quarantine these assets from the relevant Learn cards until the intended entity is verified. Reject article images, adverts, unrelated footer brands and acronym/name matches without an entity match. Store exact source asset URLs and observed roles; retain an explicit no-image state when identity cannot be established.

## F65 — asset role, edition and period are still misrepresented (P1/P2)

The following ten records have a wrong or unspecified artwork role. A related corporate mark is not automatically the named publication’s masthead.

| Record | Observed artwork / limitation |
|---|---|
| `ar-perfil` | PERIODISMO PURO slogan/programme artwork; the PERFIL masthead is absent. Record exact intended variant before claiming a newspaper masthead. |
| `at-salzburger-nachrichten` | Publisher-branded Die gefragte Frau feature/podcast artwork, not the general newspaper masthead. |
| `co-el-tiempo` | Bag-shaped utility/shop icon, not a visible EL TIEMPO masthead; precise source role unresolved. |
| `dk-kristeligt-dagblad` | LÆSEKREDS reading-club mark, not the newspaper masthead. |
| `gq-ahora-eg` | Malabo 2019 Annual Meetings graphic dated 11–14 June, not AhoraEG masthead. |
| `id-kompas` | Kompas Gramedia corporate-group logo, not the Kompas newspaper masthead. |
| `nl-algemeen-dagblad` | DPG Media corporate-group logo, not Algemeen Dagblad masthead. |
| `nl-trouw` | DPG Media corporate-group logo, not Trouw masthead. |
| `sg-the-new-paper` | SPH Media corporate-group logo, not The New Paper masthead. |
| `sl-slena` | Sierra Leone Ministry of Information and Civic Education mark, not a SLENA-specific agency mark. |

Other assets need explicit variant metadata: anniversary artwork for ABI, Fana, Kyunghyang, Zakon, Virakesari, The Analyst, Hoy (Paraguay), and Slovenske novice; portal/network variants for Guangming, Al-Ahram, Yedioth Ahronoth/ynet and Ma’an. A commemorative numeral is not necessarily fabricated, but cannot silently stand for an undated standard masthead. El Universo’s SVG clips its name in the static renderer; a browser defect is **not** asserted without a browser comparison.

The 428-reference ledger attempts all **77 exact Commons references (75 distinct file pages)** and retrieves **74/75 pages**. The cited `APS Sénégal logo.png` page is unresolved (HTTP 404); this alone does not prove the depicted APS logo false. The other **351 references lack an exact Commons file citation** and commonly provide only a publisher homepage/generic source assertion. Licence terms, authors and transformation history remain distinct from trademark ownership and educational purpose.

## F66 — new newspaper-selection code repeats unsupported defaults (P1)

The `d130b10` selection batches add **250 records** and remove 42. Among the additions, **192** have `frequency: "Daily newspaper"`; **83** of those simultaneously have `format: "Digital news portal"`. **176** receive the same generic advertising/subscription/print-sales revenue formula. These counts are not proof that every individual value is false; the problem is that the helper supplies factual defaults without field-level evidence.

Concrete counterexamples are `am-azatutyun`, `kg-azattyk`, and `kz-azattyq`, all labelled daily newspapers. RFE/RL identifies them as radio/multimedia services on its [Armenian](https://about.rferl.org/service/armenian-service/), [Kyrgyz](https://about.rferl.org/service/kyrgyz-service/), and [Kazakh](https://about.rferl.org/service/kazakh-service/) pages. The Armenian record also says founded **1950**, while the service’s own history gives **1953**. The Kyrgyz and Kazakh 1953 values agree with their service histories; do not replace correct values merely because a neighbouring field is wrong.

The helper also manufactures a narrative that official sites and Commons were searched whenever no image is supplied. This repeats F58: absence of an image cannot establish that a search occurred. Store `unverified`/`not sourced`, not an invented work history. Likewise, “leading” or “highest traffic” claims need a defined metric, population, comparison set, date and source; a homepage URL does not substantiate a ranking.

**Required change:** make media type, publication frequency, revenue sources and launch date separately sourced, nullable fields. Permit a multimedia news outlet where that is the intended scope, and label it accurately in the UI. Do not require five entries at the expense of factual confidence. Preserve print founding, digital launch, brand rename and relaunch dates separately.

## V-Dem complete dataset comparison and F67 scope metadata (P2)

All **173 bundled entries** were compared with the publisher-recommended `vdemdata` v16 dataset, pinned to source commit `f4dd26922e658442524dfd954bf14f7ebe622d5d`; the downloaded RData also matches Git blob `5a472621427337cebf032a9c4e397e0bedd57aea`. **173/173 scores** agree within two-decimal rounding and **173/173 regime labels** agree with `v2x_regime`. Every rank is inside its tied-rank interval across all 179 source units, and every rank change is compatible with 2024 → 2025 ranks within the same dataset version.

Table A2 in the 2026 PDF differs from the app in seven rounded scores and 15 ordinal ranks. The underlying dataset supports the app values, so these differences are **not counted as seven/15 app errors**. The ledger preserves both comparisons. A tied-rank interval establishes consistency, not the exact unpublished tie-breaking algorithm used by the app.

F67 concerns presentation: `year: 2026` is the **release year**, whereas these are **2025 observations**. The `PS` entry maps specifically to **Palestine/West Bank**, while V-Dem separately codes Gaza. A country-wide Palestine label without this scope note is imprecise. Store `releaseYear`, `observationYear`, `datasetVersion`, `sourceUnit` and rank methodology separately. Do not compare absolute scores from different V-Dem versions.

Sources: [publisher dataset page](https://www.v-dem.net/data/the-v-dem-dataset/), [v16 codebook §5.1.1](https://www.v-dem.net/documents/70/codebook_v16.pdf), [pinned dataset](https://github.com/vdeminstitute/vdemdata/blob/f4dd26922e658442524dfd954bf14f7ebe622d5d/data/vdem.RData), [2026 report Table A2](https://www.v-dem.net/documents/75/V-Dem_Institute_Democracy_Report_2026_lowres.pdf). Dataset attribution: Coppedge et al. (2026), V-Dem Country-Year Dataset v16, DOI `10.23696/vdemds26`; source data licence CC BY-SA 4.0.

## F05 expanded and F68 — population dates and incorrectly labelled census methods (P1/P2)

At the `db3ba05` snapshot, the national population request explicitly selects 2024. The World Bank `SP.POP.TOTL` response contains both 2024 and 2025 observations for **194 of the 195 bundled countries**; Vatican City is absent and its fallback remains unverified. Thus every country covered by this API has a newer 2025 observation available. The live Bosnia and Herzegovina panel's 3.16 million is consistent with the 2024 observation of 3,164,253, whereas the source's 2025 observation is 3,140,095. This is a vintage/presentation defect, not proof the 2024 observation was fabricated. [World Bank series](https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2021:2025&per_page=20000).

All **5,281 subdivision rows** and **201 national reference denominators** have now been inventoried in the population ledger. Primary-source comparisons completed so far are:

| Set | Rows compared | Numerical result | Method/year result |
|---|---:|---|---|
| Brazil: all 26 states and Federal District | 27 | All exactly match IBGE 2022 | All 27 incorrectly say `estimate`; these are census results |
| Mainland China: all 31 provincial units | 31 | All exactly match NBS 2020 table | All 31 incorrectly say `estimate`; these are preliminary census results |
| Mexico: all 32 federal entities plus the legacy Mexico City alias | 33 | All exactly match INEGI 2020 | Census/year labels agree; the alias is not a 33rd entity |
| US: 49 states, DC, Puerto Rico, Guam, US Virgin Islands, American Samoa | 54 | All exactly match Census Bureau 2020 | Census/year labels agree |

Sources: [IBGE values](https://servicodados.ibge.gov.br/api/v3/agregados/4714/periodos/2022/variaveis/93?localidades=N3[all]) and [survey metadata](https://servicodados.ibge.gov.br/api/v3/agregados/4714/metadados); [NBS communiqué, table 3-1](https://www.stats.gov.cn/english/PressRelease/202105/t20210510_1817188.html); [INEGI report, PDF page 5](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2021/EstSociodemo/ResultCenso2020_Nal.pdf); [US resident-population table](https://www2.census.gov/programs-surveys/decennial/2020/data/apportionment/apportionment-2020-table02.pdf), with separate official island-area releases linked per row.

The China table excludes Hong Kong, Macao and Taiwan and lists servicemen separately; its numerical agreement does not resolve any territorial-status question. Maryland has a 2021 estimate in the app, so it was not wrongly compared as a 2020-census claim. Northern Mariana Islands and US Minor Outlying Islands also remain unverified here. The other **5,136 subdivision rows remain unverified against primary demographic sources in this ledger**. Historical census accuracy does not establish freshness relative to subsequent official estimates.

F68 supplies concrete, whole-set counterexamples to F06's generator defect: **58 accurate census counts receive false method labels**. Preserve `census`, `estimate`, `projection`, `register` and `unknown` separately, with full reference dates and source identifiers. Do not infer `estimate` merely because a Wikidata method qualifier is absent. Every national reference denominator also lacks an observation date and method; numerical matches to World Bank observations alone cannot repair that missing metadata.

## F69 — latest image caption count mismatch (P2)

At `db3ba05`, `ee-eesti-paevaleht` describes three red dots. The inspected artwork has **one dark dot and two red dots**. Correct the caption to the actual selected variant and record its date. This is a direct description/image mismatch; it does not establish that the publisher identity itself is wrong. The per-record observation is preserved in the DB3 image ledger.

## Evidence files and remaining work

- [Population claim ledger](audit/POPULATION_CLAIM_VERIFICATION_2026-09-20.json): national API coverage/freshness for 195 countries, all 201 undated reference denominators, 145 primary census comparisons and an explicit list of the other 5,136 subdivision records as unverified.
- [Latest media ledger through db3](audit/MEDIA_DB3_CLAIM_VERIFICATION_2026-09-20.json): 74 image assets, 75 record references, individual caption/source outcomes and agency cleanup.

- [V-Dem claim ledger](audit/VDEM_CLAIM_VERIFICATION_2026-09-20.json): all 173 entries, report/dataset comparisons, ranks and scope.
- [World Bank source snapshot](audit/WORLD_BANK_SOURCE_SNAPSHOT_2026-09-20.json): dated source observations behind the GDP comparisons.
- [Additional media ledger through d130](audit/MEDIA_D130_CLAIM_VERIFICATION_2026-09-20.json): 409 images, 428 record references and individual verdicts.
- [GDP claim ledger](audit/GDP_CLAIM_VERIFICATION_2026-09-20.json): all 766 values, source URLs and outcomes.
- [Freedom House claim ledger](audit/FREEDOM_HOUSE_CLAIM_VERIFICATION_2026-09-20.json): all 193 scores/statuses, source methods and separate rank status.
- [Media image ledger](audit/MEDIA_IMAGE_VERIFICATION_2026-09-20.json): all 227 new assets, hashes, exact review scope, source-page observations and individual findings.
- [Passport origin ledger](audit/PASSPORT_ORIGIN_VERIFICATION_2026-09-20.json): all 188 source-hash comparisons and explicit limits.
- [Revision delta](audit/REVISION_43CFD13_DELTA_2026-09-20.json): all 231 changed paths and pinned blob identifiers.

Still **not universally verified**: all prose and metadata in the seven registries; official identity/currentness for the remaining images; each flag's legal adoption and symbolic interpretation; all arms blazons; passport variants; party leadership/seats/ideology and logos; airline/broadcaster ownership and brands; all population estimates and methods; EIU values and V-Dem presentation/scope metadata; complete tourism/media claims; every historical territorial assignment and polygon boundary. The earlier structural map checks and visual samples cannot be relabelled as claim-level verification. Prior findings F01–F59 remain applicable except where a specific closure was recorded.

For completion, every factual field and distinct prose assertion needs its own verdict with evidence and an applicable date; every image needs both file provenance and identity/variant verification. An unresolved claim is an audit outcome, but it must not be counted as a verified claim. **This report therefore leaves the universal-verification request open.**


## New-index complete comparisons — application revision 7dda29d

All bundled values for the three newly added indices were compared against their publishers' downloadable primary data. These are complete comparisons within those specific datasets, not universal completion of the audit.

| Index | Bundled records | Result |
|---|---:|---|
| Transparency International CPI 2025 | 179 | All scores, ranks and derived score bands agree; 177 rank changes agree and two have no prior-year comparator. |
| RSF World Press Freedom Index 2026 | 175 | All scores, ranks, rank changes and categories agree with the 180-unit source CSV. |
| Nira Democracy Perception Index 2026 | 96 | All displayed scores agree numerically; 95 categories agree, Panama differs; one Congo identity mapping remains unresolved. |

Evidence: [CPI ledger](audit/CPI_CLAIM_VERIFICATION_2026-09-20.json), [RSF ledger](audit/RSF_CLAIM_VERIFICATION_2026-09-20.json), [DPI ledger](audit/DPI_CLAIM_VERIFICATION_2026-09-20.json). Source hashes and per-record comparisons are preserved. The CPI workbook uses Strict OOXML; the source worksheet cells were read directly without modifying it. RSF's Windows-1252 CSV was decoded before comparison with the repository's UTF-8 copy.

### F70 — CPI missing prior-year ranks displayed as unchanged

**Confirmed, medium.** Belize and Brunei have no 2024 rank in the [official CPI 2025 workbook](https://files.transparencycdn.org/images/CPI2025_Results.xlsx), but both are stored with `rankChange: 0`, producing an unchanged indicator. Use a nullable comparator and display “not available” for first/reintroduced coverage. Neither country's 2025 score or rank is wrong.

### F71 — DPI ranks silently change the survey universe; Panama category disagrees

**Confirmed ranking-scope and category discrepancies; Congo unresolved.** The [publisher report](https://146165116.fs1.hubspotusercontent-eu1.net/hubfs/146165116/DPI%202026.pdf) covers 98 units. The app drops Taiwan and Puerto Rico and recalculates competition ranks over 96 countries. All 96 app ranks follow that rule, but 48 differ from a competition ranking of the full 98 published integer scores. The report explicitly describes Kazakhstan as 98th; the app shows 96. Label any reduced-universe rank as app-derived, including its denominator and tie rule. Do not call a calculated rank the publisher's official rank; unrounded survey estimates may distinguish displayed ties.

On report page 29, Panama (-15) is grouped under “Negative”; the app's inclusive -15 threshold produces “Very Negative.” Preserve the published category or obtain evidence explaining rounding at the boundary. The appendix's label “Congo” alone does not substantiate the app's CD (Democratic Republic of the Congo) mapping; this remains unresolved rather than certified correct.

Methodology on report page 57 describes 94,146 respondents and fieldwork from 19 March to 21 April 2026. The publisher landing page gives conflicting January–March wording. Preserve this conflict and cite the pinned report. Label this index as respondents' perceptions, distinct from institutional democracy classifications.

### RSF verified scope and date interpretation

The [primary 2026 CSV](https://rsf.org/sites/default/files/import_classement/2026.csv) supports all 175 bundled records. Its other units are CSS (OECS group), CTU, XKX, HKG and TWN. A regional group score must not be invented into separate member-country scores. Under the [RSF methodology](https://rsf.org/en/methodology-used-compiling-world-press-freedom-index-2026), the publication chiefly assesses 2025, with significant pre-publication events allowed. Store publication year separately from assessment period.


## Continuation checkpoint — 21 September 2026

The next application snapshot is **11e30bb569b2e599a82ea5d51998a9998ed78acb**, 44 commits after 7dda29d (including audit-document commits). Its comparison lists 164 changed paths, including further logos and ten additional index datasets. This newer delta is being fetched and is **not yet fully audited**. Findings below are pinned to 7dda29d unless stated otherwise. The rough universal-work estimate remains about **10% complete / 90% remaining**, not a measured percentage of atomic claims.

The 7dda29d image delta is now recorded in [the 164-image / 163-record ledger](audit/MEDIA_7DDA_CLAIM_VERIFICATION_2026-09-21.json). All files were hash-checked, decoded and visually screened, and every caption read. Only specifically identified primary comparisons constitute identity verification; the other 159 identity verdicts remain unverified. This ledger also enumerates the fields of all 39 newly added agencies, preserving their unresolved status rather than treating the entire record as verified.

Newspapers at 7dda29d total 937 records, 729 with images; news agencies total 166 records, 158 with images. All **30 previously confirmed wrong-entity images (F60/F64) remain referenced with unchanged assets**. The extra UNIAN PNG has no reference in these current registries; the SVG is used. Four misleading old filenames refer to renamed records (Agora, Portal Analitika, A Verdade and Cambodianess / Thmey Thmey); filename mismatch alone is not an image error.

### F72 — Europa Press displays its PortalTIC section mark

**Confirmed, medium.** `es-europa-press` uses an SVG visibly reading PortalTIC while its caption calls it the Europa Press wordmark. The [publisher identifies PortalTIC](https://www.europapress.es/portaltic/) as its technology portal. This is the wrong asset role within the publisher, not evidence of an unrelated organisation. Use the agency wordmark and preserve the exact asset URL. The newly entered founding year 1953 still requires primary-source verification and is not certified by this image check.

### F73 — SMNA founding date and RTV relationship are unsupported

**Confirmed date conflation; identity relationship unsupported, high.** `sm-smna` has `founded: 2016`, an RTV image and a licence note asserting SMNA is an RTV agency arm. The cited [Italian press release, 6 June 2016](https://www.sanmarinortv.sm/news/comunicati-c9/san-marino-news-agency-soddisfatta-iscrizione-testate-accreditate-a161705) describes registration notified in May 2016, effective 21 December 2015, after approximately ten years of operation. It does not establish that organisational relationship. Do not infer ownership from the website hosting a press release or replace the date with an exact 2006 without evidence.

The repository itself is contradictory: `scripts/install-new-agency-logos.mjs` says the RTV mark was rejected as the wrong organisation and writes an SMNA no-image explanation, while the shipped registry supplies that mark and the unsupported relationship. Reconcile the generator and dataset only after identifying the actual agency's artwork.

### F74 — RADOR's present newsroom inherits an unqualified historical date

**Confirmed, medium.** `ro-rador` says founded 1921. [RADOR's Romanian institutional page](https://www.rador.ro/about/) expressly dates the present Radio România newsroom to **1990**. Store predecessor/history dates separately from the present organisation's establishment. Similarly, epd's 1910 is supported as the founding of its predecessor press association; its [own German account](https://www.epd.de/) says agency operations began after World War I. Do not silently equate those events.

### F75 — New agency defaults still create unsupported facts

**Confirmed implementation risk, medium.** `scripts/patch-news-agency-coverage.mjs` injects a 24/7 frequency, national multimedia format and subscription/syndication revenue model through `agency(partial)`. All 39 added records carry the default revenue wording. These values are not independently established by a homepage URL. Require evidence for each field or leave it absent. A field-level pending inventory is included in the new media ledger.

### F76 — Primary-source validation can fail while the checker reports success

**Reproduced, high for audit assurance.** Running `scripts/check-cpi-data.mjs` with the downloaded official workbook in the isolated 7dda29d mirror failed on missing Python `pycountry`; the catch block printed “xlsx cross-check skipped,” followed by “CPI validation OK,” and returned exit code 0. This demonstrates a fail-open path, not an incorrect CPI score (all scores independently matched in this audit). A requested primary-source comparison must fail or report a distinct inconclusive result if dependencies, parsing or source retrieval fail.

The DPI checker independently demonstrates a related limit: it enforces app-derived ranks, the unresolved CD mapping and Panama's disputed category as hard-coded expected values. Such tests prove internal consistency, not publisher agreement. Keep integrity checks, but add separately pinned source comparisons and provenance-aware expectations.

### Additional visual results

- iKon.mn: publisher CSS points to the matching iKon / “next horizon” design. The app crops the right-hand tagline into fragments. Correct the crop; do not classify it as a wrong-company logo. Primary artwork: [publisher SVG](https://content.ikon.mn/raw/2024/6/14/16763/ikon-logo.svg).
- Net Press: the [publisher site](https://www.netpress.online/) supplies the unusual “rugamba.Net Press” header and identifies the agency in its adjacent banner. The apparent identity concern is cleared.
- MINA, Mediafax and La Estrella use commemorative variants. Captions acknowledge the anniversary text; add validity/variant dates before presenting them as timeless branding.
- Soir Info: its citation and claimed asset-origin domains differ; identity remains unresolved after unsuccessful source retrieval. Retrieval failure is not evidence that the logo is false.

## Remediation log — Cursor agent, from 27 September 2026

**Who:** a Cursor cloud agent (Opus 5.5 — the "Opus" in the shared coordination section at the top), working for the repository owner. Batch-level entries go in the shared *Work and resolution ledger* at the top, using its status words; this section keeps the per-finding table. Here "Fixed" means *implemented on the branch — awaiting independent verification*, never *verified* or *live*. **What:** implementing the confirmed findings F01–F89 from this report and the two earlier ones ([F01–F39](LEARN_FACTUAL_AUDIT_2026-09-13.md), [F40–F59](LEARN_FACTUAL_AUDIT_2026-09-19.md)), then continuing the audit and fixing what it finds. New findings from this agent are numbered **R01, R02, …** so they cannot collide with the ChatGPT audit's F-numbers.

**Where the work lives:** directly on `main` (owner instruction, 27 Sep 2026 14:18 Melbourne). The earlier branch `cursor/learn-audit-remediation-853e` / PR #1709 was fast-forwarded onto `main`. "Fixed" still means implemented, not independently verified; whether it is live is recorded per batch after `npm run live:check`. The auditing agent's evidence sections above are left untouched; this log only records remediation.

**How to coordinate:** before fixing a finding, check its row. If you take one, add your name to the row in the same commit as your first change.

**Method, applied to every fix:**
- Each value is re-checked against the primary source cited in the finding (or a better one) before it is changed; the audit's summary is not copied on trust. The source is recorded next to the data (for example in `src/data/countryFactCorrections.json`), not only here.
- Generated files are corrected at the generator or its override table first, so a regeneration cannot undo the fix.
- The repository's hard rules (`CLAUDE.md`) still apply: no geometry edits to historical era maps, no invented flags or coordinates, visual verification in the running app.

### Status of every finding

Status key: **Fixed** (on the branch, with evidence) · **In progress** · **Queued** (agreed fix, not started) · **Needs data** (the fix needs a primary dataset not yet obtained, e.g. official boundaries) · **Model change** (the finding asks for a schema/UI change, scheduled separately) · **Closed earlier** (already fixed before this log began).

| Finding | Topic | Status | Notes |
|---|---|---|---|
| F01 | Equatorial Guinea capital (Ciudad de la Paz) | Queued | Needs capital coordinates from Wikidata and a capital-marker change, done with F15. |
| F02 | Japanese passport emblem called paulownia | **Fixed** | Design line and explainer now describe the single-row sixteen-petal chrysanthemum (no legal national emblem; used since 1926). Checked against MOFA Passport Q&A Q30 and the bundled cover image itself. |
| F03 | Vietnam 63 → 34 provinces | Needs data | Official 2025 boundaries, codes, capitals and populations must change together. |
| F04 | Angola 18 → 21 provinces | Needs data | As F03. |
| F05 | National population pinned to 2024, year discarded | Queued | |
| F06 | Population method defaults to "estimate" | Queued | |
| F07 | Population shares mix vintages | Model change | |
| F08 | Equatorial Guinea anthem plays Guinea's video | Queued | |
| F09, F10 | 2000 BCE "Old Kingdom", 500 BCE "early Maurya" | Queued | |
| F11, F12 | Germany: SSW missing, SPD co-chair Bas missing | Queued | |
| F13 | Party sources mostly Wikipedia-only | Model change | Addressed country by country in the party sweep. |
| F14 | Passports lack issuance dates | Model change | |
| F15 | Sri Lanka capital roles | Queued | |
| F16 | Zimbabwe currency omits ZiG | **Fixed** | ZWG added first; withdrawn bond notes (ZWB) removed; rand symbol corrected from "Rs" to "R". Source: RBZ, and the RBZ site quoting ZiG/ZWG on 27 Sep 2026. |
| F17 | Historical populations unsourced | Model change | |
| F18 | Administrative taxonomy | Model change | Follows the F03-type migrations. |
| F19 | Hammurabi in the 2000 BCE overrides | Queued | |
| F20 | Iraq 1960 prose describes the royal flag | Queued | |
| F21 | Kyrgyzstan flag has pre-2023 wavy rays | Queued | |
| F22–F28 | Burundi, Indonesia, Nepal, Norway, Kazakhstan, Burkina Faso, Mali subdivisions | Needs data | As F03. |
| F29 | South Africa omits SASL | **Fixed** | Source: CRL Rights Commission, 20 Jul 2023. |
| F30 | Algeria omits Tamazight | **Fixed** | Source: Constitution Art. 4. |
| F31 | Azerbaijan lists Russian as official | **Fixed** | Source: Constitution Art. 21. |
| F32 | Switzerland "Swiss German" | **Fixed** | Source: Constitution Art. 4. |
| F33 | Bolivia lists 4 of 37 official languages | **Fixed** | All 37 from Constitution Art. 5(I). |
| F34 | Sierra Leone SLE | Closed earlier | |
| F35 | Socialist Bosnia canton colours reversed | **Fixed** | Canton now blue-white-red, as the bundled image shows. The false claim that socialist Bosnia "never adopted symbols of its own" is removed: it had its own coat of arms. The Fandom citation is replaced by Wikipedia's sourced Yugoslav-period section. |
| F36 | Cuban arms chronology contradicts itself | **Fixed** | Presidential flag: in use since 1959. Its arms: designed 1849, with shield specifications decreed 21 Apr 1906. The Grokipedia text ("Sierra Maestra beneath a rising sun") contradicted the official blazon and is replaced. |
| F37 | Mali/Somalia and Oman/Romania share anthem segments | Queued | |
| F38 | Explainers cite Grokipedia/Fandom | Implemented (Opus) — awaiting verification | Part 1: 10 national-symbol entries. Part 2: 12 subdivision entries in `flagMeanings.ts` and 1 tourism logo. R03 (superseded seals, PH-ROM/PH-SOR) fixed alongside. |
| R02 | Languages row showed only the first four languages | **Fixed** | `EntitySummary.tsx` now lists all of them (ZW 16, BO 37). |
| R01 | Moroccan royal standard described as "national flag in the canton" | **Fixed** | The bundled image is a green field bearing the 1957 coat of arms. Design line and explainer rewritten from the official blazon. The "1915" start date contradicted the arms' 14 Aug 1957 introduction, so the years are removed rather than guessed. |
| F39 | Bundle corrections overridden by the live API | **Fixed** | `src/data/countryFactCorrections.json` is applied by the generator and after the REST Countries merge in `src/api/countries.ts`. |
| F40 | Ethiopia regions | Needs data | As F03. |
| F41 | Zimbabwe (Nambya), Austria (German), Namibia (English), Rwanda (Swahili) | **Fixed** | Constitutions of Zimbabwe s. 6, Austria Art. 8, Namibia Art. 3; gov.rw. |
| F42 | Cuba lists the withdrawn CUC | **Fixed** | Decree-Law 37/2021. |
| F43 | "195 UN member states" | Implemented — awaiting verification | Summary distinguishes 193 members + 2 observers. |
| F44 | 600/1500/1920 era anachronisms | Implemented — awaiting verification | Plus 2000 BC; 14 unreachable anachronistic overrides removed (R04). Summaries are not currently rendered. |
| F45 | Hejaz flag prose contradicts image | Implemented — awaiting verification | 1920 prose matches image; unreachable 1938 entry removed. |
| F46 | Freedom House 2024 mismatches | Closed earlier | Replaced by the 2026 dataset, which the audit verified (see "Resolution of earlier Freedom House finding"). |
| F47 | GDP year dropped; unsourced fallbacks | Queued | |
| F48 | Nauru newspaper dates/ownership | Implemented — awaiting verification | Two historical titles removed; Mwinen Ko rebuilt from the government bulletin. |
| F49 | Generator invents newspaper defaults and citations | Partly implemented | founded/readership optional; "Audience Review 2024" strings unclaimed. |
| F50 | ABC funding term | Implemented — awaiting verification | Appropriation vs revenue still open. |
| F51 | Generated composite mastheads | Implemented — awaiting verification | Generator and composites deleted; provenance manifest unclaimed. |
| F52 | Olympic/newspaper captions contradict images | Implemented — awaiting verification | Libération disputed — see ledger. |
| F53 | Brazil Olympic text: 1889 dynasties | Implemented — awaiting verification | Continuity from the imperial flag; Decree 4 cited. |
| F54 | Bermuda grouped as Caribbean | Implemented — awaiting verification | Grouped with North America (M49 Northern America). |
| F55 | Kenya 8 provinces → 47 counties | Needs data | As F03. |
| F56 | "Leg power" inferred from government membership | Queued | Conflicts with a CLAUDE.md hard rule (fallback is deliberate); needs owner decision — see note when reached. |
| F57 | Broken Naoero Gazette SVG | Implemented — awaiting verification | Record removed; decode gate added to both media checks. |
| F58 | Generated "sources were checked" text | Implemented — awaiting verification | Generators fixed too. |
| F59 | Vatican News in two registries | Implemented — awaiting verification | Record removed from newspapers; "top" methodology unclaimed. |
| F60, F64 | 30 wrong-entity media logos | Implemented — awaiting verification | All 30 + El Mundo quarantined (no-image); replacements unclaimed. |
| F61, F65, F69 | Captions/asset roles contradict images | Queued | |
| F62 | Artwork provenance manifest | Model change | |
| F63 | Japan tourism 2025 total | Queued | |
| F66, F75 | Media generators' default facts | Queued | |
| F67 | V-Dem release vs observation year, PS scope | Queued | |
| F68 | 58 census counts labelled "estimate" | Queued | With F06. |
| F70 | CPI missing prior ranks shown as unchanged | Implemented — awaiting verification | |
| F71 | DPI rank universe, Panama category | Implemented — awaiting verification | Congo → CD still unresolved. |
| F72–F74 | Europa Press, SMNA, RADOR | Queued | |
| F76 | CPI checker fails open | Queued | |
| F77 | GPI Honduras rank | Implemented — awaiting verification | |
| F78 | Soft Power Guatemala movement | Implemented — awaiting verification | 19 missing movements filled. |
| F79 | Necenzurirano / N1 merged | Queued | |
| F80–F83 | Central banks: false presence/absence, Morocco, Brunei, generator claims | Queued | |
| F84–F86 | Estonia: Lääne eagle, Võru sword, "Flag of Elva" SVG ids | Fixed | Pushed in f0c9407d. Per-file provenance manifest (F86 part) unclaimed. |
| F87, F88 | NZ seats, Green co-leaders | Implemented — awaiting verification | NZ First and Te Pāti Māori still missing. |
| F89 | Six party position contradictions | Implemented — awaiting verification | New singleton-position gate. |

### Work log

- **27 Sep 2026, 04:10 UTC — started.** Read all three reports; created the branch and this log.
- **27 Sep 2026 — country-fact corrections (F16, F29–F33, F39, F41, F42).** Re-checked each constitutional text myself (Constitute Project editions of the constitutions of Bolivia, Zimbabwe, Austria, Namibia, Azerbaijan, Algeria and Switzerland; gov.rw; the CRL Rights Commission; the Reserve Bank of Zimbabwe site). Also corrected the rand's symbol in Zimbabwe's list ("Rs" → "R", an upstream error the audit did not list). Mechanism: `src/data/countryFactCorrections.json`, read by `scripts/build-country-facts.mjs` and `src/api/countries.ts`, applied in place to `src/data/countryFacts.ts`.
- **27 Sep 2026 — Japanese passport (F02).** MOFA's passport Q&A (Q30) says Japan has no legally defined national emblem, so passports have carried a stylised chrysanthemum since 1926, deliberately a single row rather than the imperial double chrysanthemum. The bundled cover (`public/national-flags/jp/japan-passport.webp`) was opened and shows exactly that. I fixed the manifest (`scripts/data/national-flag-sources.json`: design, meaning, MOFA source added, and the Imperial Seal explainer's passport sentence), regenerated `src/data/nationalFlags.ts`, and `check-national-flags.mjs` passes.
- **27 Sep 2026 — Socialist Bosnia and Cuban presidential flag (F35, F36).** I rendered both bundled images before editing. Bosnia's canton is blue-white-red with a gold-edged star. Wikipedia's *Flag of Bosnia and Herzegovina* (Yugoslav period) documents the 31 Dec 1946 adoption and a separate republican coat of arms, so the "never adopted symbols of its own" sentence was false as well as badly sourced. The Cuban presidential flag shows six white stars around the arms (the old design line said only "adopted after the revolution"). The Grokipedia explainer put the Sierra Maestra under the sun and dated the arms to 1959; both contradict the official blazon and the 1906 decree cited in *Coat of arms of Cuba*. Wikipedia's *List of Cuban flags* dates the presidential flag to 1959. I fixed the manifest and regenerated; `check-national-flags` and `check-user-facing-copy` pass.
- **27 Sep 2026 — F38 part 1 (national symbols) and new finding R01.** The 10 Grokipedia/Fandom-cited explainers in `scripts/data/national-flag-sources.json` were rendered in a montage and each re-checked against a stronger source. What that changed:
  - **Norway and Germany:** the claim of a 1625 Danish regulation reserving the swallowtail for the battle fleet is in neither flag article; 1625 is only Denmark's "oldest flag" record date. Norway is now sourced to its own flag law (1898, §2, *med Split og Tunge*).
  - **Mexico 1893:** it was not "decreed by Díaz on 30 Dec 1880". That was a circular by Carlos Díez Gutiérrez; this eagle is Juan de Dios Fernández's "Centennial Eagle". The Spanish-Wikipedia date of 1898 is disclosed, and the shared era window is unchanged.
  - **Nepal:** the unsupported "twelve-rayed sun" (the image has many more rays) is removed, and the Jung Bahadur attribution is hedged as the source does ("according to some historians").
  - **Cambodia and Malaysia:** unsourced glosses are removed (the unalome as "the path to enlightenment", blue "marking the monarchy", paddy for "abundance and prosperity").
  - **US Army:** the symbolism is re-attributed to the Institute of Heraldry's own reading.
  - **Morocco (R01):** the design line and explainer described a different flag. They now follow the government's blazon, and the contradictory 1915 date is removed.

  `check-national-flags`, `check-user-facing-copy` and `check-quiz-symbol-decks` pass.
- **27 Sep 2026 — F38 part 2 and R03.** The last 13 Grokipedia/Fandom citations were re-sourced or trimmed. Main source: the 1975 *Symbols of the State* book, which gives Misamis Occidental, Laguna, Albay, Mindoro, South Cotabato and others their official seal meanings. Romblon's and Sorsogon's explainers described an older seal than the bundled image (R03). Venezuela's Federal Dependencies explainer was removed as unsourceable. Checked in the running dev app. A deep link with `subdivisions=1` drops subdivision mode in dev (StrictMode) but works in production; this is dev-only and not fixed.
- **27 Sep 2026 — F84–F86 (Estonia).** Lääne's hawk corrected to an eagle, and Võru's sword orientation corrected, both against the Government Office blazons plus a render of the bundled SVG. The stale "Flag of Elva" ids in the Harju and Järva SVGs are renamed. The provenance-manifest part of F86 is still open.
- **27 Sep 2026 — F87–F89.** NZ Labour and ACT seats, the 123-seat chamber and the Green co-leaders are corrected. All six position contradictions are resolved against the parties' own Wikipedia infoboxes, and a singleton-label consistency gate is added to `check-political-parties.mjs`.
- **27 Sep 2026 — F77, F78.** Honduras's GPI rank corrected to the publisher's 97, and the check that encoded the false tie is fixed. Guatemala's Soft Power movement is corrected, and the 19 absent movements are read from the rendered cards; the check now requires a movement for every country.
- **27 Sep 2026 — F70, F71.** Unknown CPI movements are dropped, not shown as zero. DPI tiers now follow the printed appendix, and DPI ranks run over the full 98-unit survey.
- **27 Sep 2026 — F43–F45, F53, F54.** Era summaries corrected (not currently rendered), 14 unreachable anachronistic 2000 BC overrides removed (new R04), Hejaz prose matched to its image, Brazil Olympic colours explained as imperial continuity, Bermuda grouped with North America. Pushes were blocked by an expired token between f0c9407d and 03723e33; all of it landed on `main` at 03723e33.
- **27 Sep 2026 — F48, F50–F52, F57, part of F49.** Nauru newspapers corrected from the government bulletin; composite-masthead generator and outputs deleted; media checks now decode every logo; nine captions matched to their artwork; ABC five-year funding terms; `founded`/`readership` no longer forced.
- **27 Sep 2026 — F58.** Generated gap text that claimed a research history nobody performed is replaced in 35 records and in the four generators that emitted it.
- **27 Sep 2026 — F59, F60, F64.** 31 wrong-entity media images quarantined after a montage and metadata spot-check; the misfiled Vatican News portal record removed from newspapers.
