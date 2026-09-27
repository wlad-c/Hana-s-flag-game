# Learn claim and artwork verification — 20 September 2026

**Universal verification is not complete.** This report records completed full-dataset comparisons and new image/metadata findings. It does not certify all 4,638 records in the seven large registries at `db3ba05`, every sentence, every historical date, every boundary or all artwork as correct. Unchecked and unresolved claims remain explicitly unverified; an image decoding successfully or matching a third-party download does not establish authenticity.

This supplements [the original audit](LEARN_FACTUAL_AUDIT_2026-09-13.md) and [the continuation findings F40–F59](LEARN_FACTUAL_AUDIT_2026-09-19.md). No application data was changed. The evidence ledgers below are intended to preserve both positive verification and failures for subsequent work.

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

All 227 new explainers were read alongside the images. The following are direct, reproducible discrepancies; they do not require speculation about historical brand adoption:

| ID | Description says | Bundled image shows |
|---|---|---|
| `in-dainik-jagran` | Devanagari masthead | Latin `Jagran` below a sun |
| `kr-donga-ilbo` | Hangul | Hanja `東亞日報` |
| `kr-joongang-ilbo` | Hangul | Latin `The JoongAng` |
| `jp-japan-times` | Red dotted j | Monochrome wordmark |
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
