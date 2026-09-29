# Learn factual audit — 19 September 2026 continuation

> Latest claim-level evidence: [20 September verification](LEARN_CLAIM_VERIFICATION_2026-09-20.md). Counts in this older report describe its pinned revision; consult the later report for GDP, Freedom House, image and passport-source verification.

Last updated: **20 September 2026 UTC**. Status: completed revision-bounded audit report, with explicitly unverified material below. **This is not a certification that every fact, image and boundary has been independently verified.** This file supplements, and does not erase, `LEARN_FACTUAL_AUDIT_2026-09-13.md`. Findings F01–F39 retain their original definitions. No application data or hard rules have been edited by this audit.

## Revision and scope

Original baseline: `8b2167aef864e61aaa2051ed714ce391f2ff1023`. Intermediate reviewed revision: `158801ce713fd0f8cd5fe08c36064d11fb5ca337`. **Latest reviewed code: `63adaf34cbe32bc20c4362fe2636a1cd7bc5371b`.** The published Learn footer was observed showing `158801c` on 19 September and **`63adaf3` on 20 September**. The intermediate comparison covered 207 commits and 1,915 changed files. A further 14 commits, including the first save of this report, were reconciled using complete recursive trees: 67 added/modified files and 931 deleted newspaper-logo files since the intermediate snapshot. The net comparison against the original baseline is **1,008 changed paths: 968 additions, 39 modifications and one deletion**. The remaining deletion against the original baseline is `public/party-logos/pk/sic.png`. Files added and subsequently removed disappear from that net count; they are retained in the intermediate-delta evidence.

Inventory is not factual certification. The latest revision contains **4,480 records across the seven registries checked**: 2,044 national-symbol records (207 new Olympic committee records; all 1,837 previous records unchanged); 842 political-party records in 100 groups; 288 airlines in 196 groups; 204 broadcasters in 195 groups; **719 newspapers** in 195 groups (71 removed from the intermediate 790); 188 news agencies in 139 groups; and 195 tourism entries. Empty country arrays are included in group counts. New economic fields contain 193 USD GDP observations and 190 local-currency observations without their observation dates.

## Reconciliation of earlier findings

F34: Sierra Leone currency changed from SLL to SLE in the bundle. Closed for the observed data field; retain a regression check in the generator.

All other pre-existing country-fact values are unchanged, verified field by field. National flag, passport, coat-of-arms and historical-symbol records from the old registry are unchanged, verified record by record. Subdivision/historical geometry and era metadata did not change in the full tree comparison. The earlier political-party findings about Germany remain: no SSW record; SPD leader only Lars Klingbeil. The first party delta affected LK, TJ, TM, TR, PK and PS; the subsequent delta changes executive/chamber metadata or sources in AR, KR, PH, BR, FR, AU, US, CL, ID, TR, PE, TL, UY, EC, PY, SR and VE. Historical dates, population provenance, official-language distinctions and symbol-description defects therefore still require remediation; a new deployment alone does not close them.

F13's current count is **771 of 842 party records whose `sources` array contains only Wikipedia URLs**. This measures that field, not every separate artwork-provenance field, and does not establish that all those claims are false.

The latest newspaper cleanup is a real improvement: 669 newspaper records and 182 news-agency records now use `noImageReason`; only 50 newspapers and six agencies retain an image. The 71 removed newspaper records include numerous broadcasters and portals. However, F48's three Nauru records **remain**, with their inaccurate dates/ownership; only their mastheads/explainers were removed. This was confirmed again in the deployed `63adaf3` UI. The four latest repository checks for newspapers, agencies, airlines and tourism all pass; F49, F51 and F57 show why those checks cannot be treated as factual certification.

## Confirmed continuation findings

### F40 — Ethiopia uses a superseded administrative model (P1)

The unchanged subdivision metadata includes Southern Nations, Nationalities and Peoples while lacking the current regional-state configuration. The Ethiopian Statistical Service and Ministry of Planning's December 2023 **Ethiopian Statistical Development Program EFY 2016–2018 (2023/24–2025/26)** explicitly describes **12 regional states and two autonomous city administrations**, paragraph 7, printed p.3 (PDF page 6). The downloaded PDF page was rendered and visually read. This is not merely a disagreement over English spellings. Replace the taxonomy and geometry together, with effective dates and a crosswalk for split regions.

Source: https://ess.gov.et/wp-content/uploads/2024/08/ESDP-3-1-2_compressed-1.pdf

### F41 — Additional constitutional-language errors (P1)

`src/data/countryFacts.ts` still omits **Nambya** from Zimbabwe's 16 constitutionally officially recognised languages (section 6); calls Austria's language **Austro-Bavarian German** instead of the constitutional **German** (article 8); and presents Namibia's nine-language list under a contract describing official languages, although article 3 designates English, while allowing other language use in specified circumstances. These are designation/scope errors, not statements that the other languages are absent from those countries. A single flat list cannot distinguish national, official, regional, recognised and widely spoken languages.

Constitution texts consulted: https://www.constituteproject.org/constitution/Zimbabwe_2013 ; https://www.constituteproject.org/constitution/Austria_2013 ; https://www.constituteproject.org/constitution/Namibia_2014 . These are editions of primary legal texts hosted by a scholarly project; the Austrian 2013 edition is not described here as a complete 2026 consolidation.

Additional confirmed example: Rwanda's current bundle lists English, French and Kinyarwanda but omits **Kiswahili**, explicitly identified as an official language on the [Rwandan government's country page](https://www.gov.rw/about). This source is used for its language statement, not as blanket validation of the other statistics on that page.

### F42 — Cuba's withdrawn convertible peso remains a current currency (P1)

The unchanged current bundle lists CUC and CUP. Decree-Law 37/2021, article 2, ended acceptance of CUC in the specified commercial transactions on 1 July 2021; exchange arrangements were a separate transitional question. Do not display it as an undated current currency. The gazette instrument later became repealed, so this evidence establishes the historical withdrawal event, not that this particular instrument remains in force today.

Primary gazette reproduction: Gaceta Oficial 51 Extraordinaria, 21 June 2021, printed p.598 / PDF p.3: https://www.cibercuba.com/s/gacetaoficial/pdf/goc-2021-ex51.pdf . Official index: https://www.gacetaoficial.gob.cu/es/tasa-de-cambio .

### F43 — “Today” misstates UN membership (P1)

`src/lib/historicalEras.ts` describes 195 UN member states. The application set combines **193 members** and **two non-member observer states** (Holy See and State of Palestine). UN membership is also not a universal country-recognition decision. Correct the summary and internal names to distinguish these categories.

UN references: https://research.un.org/en/unmembers/currentmembers and https://research.un.org/en/unmembers/observers . Specific indexed UN excerpts were retrieved; some direct UN page requests were access-limited.

### F44 — Further historical-era anachronisms (P1)

In `src/lib/historicalEras.ts`, the 600 CE summary names Tang China, although its own polity override correctly says Sui in 600 and Tang from 618. The 1500 summary says the Mughal era begins, while the Met dates the dynasty from 1526. The 1920 summary treats the Ottoman Empire as already gone: distinguish defeat/partition after 1918 from the abolition of the sultanate on 1 November 1922. The 2000 BCE override for New Kingdom Egypt is about a polity beginning around 1550 BCE; its Shang material is similarly too early for the c.1600 BCE chronology. Some raw-map entities do not reach the UI because of property-name problems already documented; repository misinformation and live exposure are separate claims.

Sources: https://www.metmuseum.org/learn/educators/curriculum-resources/art-of-the-islamic-world/unit-five/chapter-four/introduction ; https://kurtulussavasimuzesi.tbmm.gov.tr/meclisacilis ; https://www.metmuseum.org/essays/egypt-in-the-new-kingdom-ca-1550-1070-b-c ; https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china . Tang finding additionally has an explicit internal contradiction.

### F45 — Hejaz flag description contradicts its bundled design (P1)

The 1920 Hejaz override describes a green flag with a gold star and crescent; `public/historical-flags/hejaz-1920.svg` contains black, white and green horizontal bands and a red hoist triangle, with no crescent or star. A similar description exists in the 1938 override; its applicability must be checked against that era's actual geometry. Correct the prose to the authenticated period variant, not merely to any image that happens to load.

### F46 — Freedom House values do not match their stated edition (P1)

`scripts/data/democracyData.mjs` and generated country facts label these scores 2024: United States **84**, Norway **99**, India **63**, Russia **12**. Freedom House's own 2024 country reports give **83, 98, 66, 13** respectively. The country reports' statuses in these four examples match the bundle; this finding establishes numerical errors, not that all colour classifications are wrong. The UI displays ranks rather than scores; ranks derived from this wrong score set also need rebuilding, not cosmetic year changes.

Sources: https://freedomhouse.org/country/united-states/freedom-world/2024 ; https://freedomhouse.org/country/norway/freedom-world/2024 ; https://freedomhouse.org/country/india/freedom-world/2024 ; https://freedomhouse.org/country/russia/freedom-world/2024 .

### F47 — GDP provenance and observation years are discarded (P1)

`scripts/build-country-facts.mjs` retrieves four indicators independently over 2021–2024, keeps each latest non-null value, then drops all four date fields when emitting the bundle. Five hard-coded fallback country estimates (CU, ER, KP, SS, YE) are called verified without a source, date or method. `EntitySummary.tsx` selects the first current currency for local-currency formatting, which cannot establish the historical unit of a World Bank observation. Store year, unit, source, series code and estimate method with each observation; do not imply a common date or convert units by changing their label.

### F48 — Nauru newspaper chronology and ownership are wrong (P1)

`nr-central-star-news` says founded 2015; the University of Canterbury's holdings identify Central Star News, 1991–1992, with later title Nauru Chronicle. `nr-nauru-chronicle` says founded 2005, while the library identifies the title from 1993 and a 1995 issue. `nr-mwinen-ko` assigns ownership to a Nauru Community Media Association / civic non-profit; Nauru's official bulletin identifies Mwinen Ko as Nauru Media's print publication. Current publication status and any relaunch must be sourced separately; historical holdings alone do not prove current operation or its absence. All three entries were observed in the current Learn UI.

Sources: https://libcat.canterbury.ac.nz/Record/2595228 ; https://canterbury.libguides.com/pacific/newspapers ; https://www.nauru.gov.nr/media/58467/nauru_20bulletin_20_02_7feb2017_20_28150_29.pdf . Catalogue/guide evidence was retrieved as specific indexed excerpts; direct requests were limited. The government PDF was readable.

### F49 — A generator manufactures factual defaults and citation titles (P1)

`scripts/build-and-add-block8.mjs` substitutes founding year **2000**, headquarters **National Capital**, and language **English** when parsing fails. It mechanically labels readership evidence `${name} Audience Review 2024` without retrieving such a publication, and defaults every entry to daily newspaper / broadsheet / subscriptions / print sales / advertising. A citation-looking string generated from a name is not evidence. This is confirmed fabrication-by-code in the generator; whether each generated value remains in current records must be recorded separately. Replace defaults with explicit missing data and fail closed on parser failures.

Latest-bundle check: **55 newspaper records and three agency records** still contain readership-source strings ending in `Audience Review 2024`. The agency IDs are `gy-stabroek-news`, `in-dainik-jagran`, and `in-hindustan-times`; the full newspaper list is in the JSON evidence companion. This identifies a template pattern requiring source verification; it does not prove that every similarly named publication is nonexistent. It does prove that the generator supplies such titles without obtaining them. The UI prints these strings after “Source:”, giving generated prose the appearance of a citation.

### F50 — Australian broadcaster funding-cycle description is obsolete (P2)

`au-abc` describes a triennial funding envelope for FY2023–24. The Australian government's review says five-year terms commenced on **1 July 2023**. Correct the term and distinguish appropriations from actual revenue. Other quotas and audience figures require independent checks; do not infer their correctness from a working annual-report link.

Primary source: https://www.infrastructure.gov.au/have-your-say/review-options-support-national-broadcasters-independence .

### F51 — The masthead cleanup retains generated composites and mistakes shape complexity for authenticity (P1)

`scripts/generate-island-logos.mjs` explicitly composes mastheads using chosen system-font stacks, decorative lines and embedded national arms. In the latest tree, **`newspaper-logos/nr/naoero-gazette.svg` and `newspaper-logos/va/acta-apostolicae-sedis.svg` retain every literal section of those templates**, surrounding the inserted arms. They are locally composed reconstructions with no demonstrated publisher artwork match. Embedding authentic national arms does not authenticate the resulting masthead. The Acta rendering also puts a large arms graphic over its title.

The new purge/check scripts classify SVGs as fabricated using size, `<text>`, `<rect>` and path-count thresholds. These composites evade the thresholds because their embedded arms contain many paths. Conversely, a genuinely simple publisher wordmark can satisfy the rejection threshold. This contradicts the existing `CLAUDE.md` party-logo guidance that primitive count and file size are not proof of fabrication. Raster format and path complexity are not provenance either.

The removed Mwinen Ko and Central Star News graphics were also generated by this script: their supposed twelve-point stars have five points. Their earlier UI descriptions said twelve. **That image/text defect is closed for those two removed assets**, but the generator remains and the F48 factual defects remain. Replace the authenticity heuristic with a provenance manifest: exact publisher/archive asset URL, acquisition date, source-byte hash, transformation history, and separately justified educational reconstruction status. A heuristic may flag a file for review; it should not decide authenticity.

### F52 — Symbol and replacement-masthead descriptions contradict the displayed artwork (P1)

Visual comparison of the bundled files with `src/data/nationalFlags.ts` and `src/data/nationalNewspapers.ts` establishes these internal mismatches:

| Record | Description | Bundled artwork |
|---|---|---|
| `gb-olympic-committee` | Union Flag on a shield | Stylised red/blue lion head; no flag-bearing shield |
| `ke-olympic-committee` | Shield and crossed spears | White human figure with raised arms over national-colour bands; no shield/spears. **27 Sep audit correction:** earlier identification as a bird withdrawn. |
| `bm-olympic-committee` | Arms above BERMUDA and rings | Rings at top, BERMUDA in middle, arms below |
| `fr-le-figaro` | Ornate gothic masthead | White slab-serif capitals on a blue rectangle, with a quill motif |
| `fr-liberation` | White letters over red lozenge | White letter faces, black outlines and offset shadow over the red lozenge. **27 Sep: original audit colour allegation withdrawn; the stated white colour was correct.** |

All 206 new Olympic image files were rendered and visually screened; these are specific observed discrepancies, not a claim that all remaining captions are authenticated. Match each explainer to its exact asset version, then verify the historical/symbolic interpretation separately. The Le Figaro discrepancy was introduced or retained by the replacement-explainer overrides in `scripts/purge-fabricated-newspaper-logos.mjs`. The original Libération colour allegation is withdrawn after independent re-rendering on 27 September 2026; the historical audit text is preserved in Git history. See the [shared report's correction and remaining minor caption issues](LEARN_CLAIM_VERIFICATION_2026-09-20.md#media-remediation-and-audit-corrections--27-september-2026) and [exact-asset ledger](audit/MEDIA_REMEDIATION_VERIFICATION_2026-09-27.json).

### F53 — Brazil's Olympic-logo explanation projects imperial dynasties into 1889 (P2)

The Brazilian Olympic meaning text says the colours came from ruling houses “at the time of the flag's 1889 design”, naming Pedro I and Maria Leopoldina. This confuses the imperial antecedent with the republican redesign. The Portuguese text of [Decree 4 of 19 November 1889](https://www.planalto.gov.br/ccivil_03/decreto/1851-1899/d0004.htm) explicitly retains the old colours while establishing the republican flag. Explain continuity from the earlier flag; do not describe those imperial houses as the ruling houses of the 1889 republican design.

### F54 — Bermuda is geographically grouped as Caribbean (P2)

`src/lib/iocAssociations.ts` puts Bermuda in `subcontinent: "Caribbean"`; the FIFA mapping also uses this treatment. The [UN M49 geographical classification](https://unstats.un.org/unsd/methodology/m49/) places Bermuda in **Northern America**, separately from the Caribbean. Sporting affiliation and cultural regional association can differ from geographical classification. Use explicitly named grouping schemes and keep sports-confederation membership in a separate field. North America as the broader continent is not the error here.

### F55 — Kenya's current layer retains eight former provinces (P1)

`src/lib/subdivisionMeta.ts` uses `pluralLabel: "Provinces"` and eight entries, including Rift Valley and Nyanza. Article 6 and the First Schedule of the [2010 Constitution](https://www.constituteproject.org/constitution/Kenya_2010) establish **47 counties**. The metadata also labels Eastern as a “National Capital Area”, a separate incorrect classification. Replace the current taxonomy and corresponding geometry as a coordinated change; retain provinces only in an explicitly dated historical layer. This finding is supported by the constitutional text, not by comparing counts alone.

### F56 — New “Leg power” badges infer legislative control from government participation (P1)

In `src/lib/politicalParties.ts`, `partyPowerBadges` falls back to `party.inPower → "Leg power"` when there is no recorded chamber majority. But `PoliticalParty.inPower` explicitly means cabinet and/or confidence-and-supply participation, not a legislative majority. The function does not establish a coalition's seats, a support agreement's scope, a chamber, or an observation date. `countryHasChamberMajority` also combines all chambers into one Boolean, so one chamber's known majority changes how all other chambers are represented.

Concrete internal example: the French records marked `inPower` have **91 + 33 + 26 = 150 of 577 seats**, yet receive legislative-power badges. This demonstrates an unsupported inference from the repository's own inputs; it is not an assertion that these seat counts independently describe France correctly today. Brazil has a legislature catalogue but no party `chambers` arrays, so its many governing-party flags also trigger the fallback. The Brazil catalogue's source title additionally lists 207 + 151 + 158 seats, totalling **516**, while saying the chamber has 513 seats.

Keep separately sourced fields for head of state, head of government, cabinet participation, confidence support, coalition membership, chamber seats and actual chamber control. Show unknown where chamber evidence is absent. In semi-presidential systems a single head-of-government-party badge is not a complete description of executive authority. The new separate office fields are useful, but must not be collapsed back into an unsupported generic power label.

### F57 — A retained masthead is malformed and broken in the published UI (P1)

Of the **905 surviving added/changed public assets**, 903 decoded successfully. `public/newspaper-logos/nr/naoero-gazette.svg` and `public/newspaper-logos/nr/nauru-bulletin.svg` fail XML parsing because `xlink:href` is used without an `xmlns:xlink` declaration. The extraction/composition script copies inner SVG elements while dropping the source root namespace declarations.

The Gazette is referenced by the current newspaper registry. On published build `63adaf3`, selecting **Show Naoero Gazette** produces an image element with `complete: true` and **`naturalWidth: 0`**, confirming user-visible failure. The Bulletin file is retained in the tree but is not referenced by either current newspaper/agency registry; do not report that second file as a demonstrated live broken card. The newspaper integrity check nevertheless passes. Add actual XML/image decoding and browser-load checks for referenced assets; sniffing `<svg>` is insufficient.

### F58 — The new missing-image text invents a research history (P2)

Both purge scripts automatically insert the same claim that Wikimedia Commons, official sites and brand CDNs were checked. Those scripts inspect local files and do not perform or record those searches. The fixed sentence appears in **669 newspaper and 182 agency records** and is shown to users; it cannot serve as record-level evidence that those checks happened. This finding does not claim that no human ever searched any of those sources. It identifies an unsupported blanket assertion generated for every affected record.

Use a factual UI message such as “No verified image is currently bundled.” Record actual attempted sources, dates and outcomes separately. “Freely citable”, public accessibility, copyright permission and faithful reproduction are also different questions and should not be conflated.

### F59 — The newspaper category remains broader than its label and stated cleanup (P2)

The latest removal of 71 entries improves classification, but **`va-vatican-news` remains in both newspapers and news agencies**. Vatican News describes itself as the Holy See's multimedia news portal, separately from L'Osservatore Romano, on its [own about page](https://www.vaticannews.va/en/about-us.html). The newspaper registry also retains Acta Apostolicae Sedis and the Nauru government gazette with formats explicitly identifying official records rather than general newspapers. These institutions can be useful learning content, but should be classified as portals, official gazettes or journals rather than implicitly treated as equivalent “Top newspapers”. Define whether “top” refers to audited circulation, reach, historical importance or a curated selection; no universal ranking methodology is supplied.

## Checks that prevented false positives

- The Turkish parliament's current [Turkish-language seat table](https://www.tbmm.gov.tr/SandalyeDagilimi) lists **Yeni Parti, 91 seats**. The [CHP's own Turkish-language site](https://chp.org.tr/) identifies **Kemal Kılıçdaroğlu** as general chairman in September 2026 posts. These new records must not be labelled fabricated merely because they differ from older knowledge. Party membership versus parliamentary-group totals still needs an explicit basis: the bundle's CHP 45 and parliament's CHP 44 are not automatically comparable where constituent-party affiliations are separately counted.
- The [AEC's final 2025 election table](https://results.aec.gov.au/31496/Website/HouseDefault-31496.htm) totals **150 seats**. Therefore this audit does **not** flag the Australian catalogue's 150 as wrong based on older assumptions about redistribution. Election-result totals do not validate every current party affiliation or Senate figure.
- M49 currently uses **Naoero** for code NR. The application's use of that name is not itself evidence of fabrication. This does not validate its separately sourced newspaper, media-budget or ownership claims.
- Bulgaria's current currency cannot by itself prove the unit of a historical GDP series; historical World Bank series can be restated. No unsupported “lev versus euro” correction is asserted here. The proven defect is lost observation-unit metadata and arbitrary currency selection in F47.

## Coverage and verification results

| Area | Completed checks | What those checks do not establish |
|---|---|---|
| Repository changes | Full recursive trees at baseline, intermediate and latest revision; complete changed/deleted path manifests; later party/media field deltas | Independent truth of every unchanged or added sentence |
| Seven registries | Parsed all 4,480 records; IDs, group/code agreement and referenced asset existence checked against the complete tree; no issues in these checks | Source authority, factual support, legal status or currentness |
| Changed public assets | All 905 acquired and matched to their Git blob hashes; all attempted through an image decoder; two XML failures | Authenticity, official adoption or accurate symbolism |
| Visual symbols | Earlier 195 current national flags; all 206 new Olympic images; all 50 retained newspaper images attempted (49 rendered, one failed); targeted historical/arms enlargements | Pixel-by-pixel authoritative comparison of every symbol, passport or logo |
| Current countries | All 195 country-fact records compared to baseline; targeted primary constitutional/statistical crosschecks | Every country's facts independently verified in multiple languages |
| Subnational and historical maps | All 251 subdivision and 21 historical GeoJSON files structurally inspected in baseline work; latest hashes unchanged | Every border's topology, effective date, legal basis, actual control or disputed status |
| Historical content | Era summaries, overrides and targeted flag/image/date contradictions examined | Scholarly validation of all 5,917 historical features and every claimed historical population |
| Political parties | All 842 parsed; new office/chamber logic reviewed; changed groups reconciled; targeted official evidence including current Turkish sources | All current leaders, party/group seats, government agreements, logos or ideologies |
| New media, tourism and airlines | All records structurally checked; generator/default/provenance review; targeted factual and artwork evidence | All ownership, circulation, budgets, fleets, brand histories and tourism claims |
| Published application | Latest footer `63adaf3`; Nauru symbol lists, missing-image notices, ownership text and broken Gazette image directly observed | Every possible interaction, device size, country and historical era tested live |

The current checks `check-national-newspapers.mjs`, `check-national-news-agencies.mjs`, `check-commercial-airlines.mjs` and `check-tourism-logos.mjs` passed. Their success coexists with the defects above. No full build was claimed from the partial local source/asset mirror, and no absent mirror file was counted as an absent repository asset. Geometry parse checks are not legal-boundary verification.

Machine-readable evidence: **`docs/LEARN_AUDIT_DELTA_2026-09-20.json`** contains revision IDs, both change manifests, asset results, per-country registry coverage, template-citation IDs, party/media deltas and remaining verification statuses. The earlier **`LEARN_AUDIT_COVERAGE_2026-09-14.md`** and **`LEARN_AUDIT_INTEGRITY_2026-09-14.json`** retain baseline country and geometry evidence.

## Recommended remediation order and hard-rule changes

1. **Stop generating unsupported facts and citations.** Remove the F49 fallback behaviour, quarantine affected readership claims, and require an exact source passage/table for each numerical or historical claim. A missing value is preferable to a manufactured value. Replace absolute “every fact is verified” dataset comments with measured verification status until that review exists.
2. **Correct current core geography and symbols.** Prioritise the earlier capital, subdivision, language, currency, passport-emblem, anthem and flag-design findings, plus Ethiopia, Kenya and Rwanda above. Update geometry, names, type labels, capitals and population joins together with an effective-date crosswalk.
3. **Repair artwork provenance and loading.** Fix or remove the broken Gazette; review retained composites; bind descriptions to exact asset hashes and version dates. Generalise the existing party-data permission for a documented missing image to all symbol/media classes. Do not require an invented image or interpretation to satisfy coverage.
4. **Give observations their own dates and units.** Store source edition, reference period, publication date, retrieval date, method, uncertainty and territorial coverage. GDP, population, audience, fleet and party-seat observations must not inherit a generic page date or today's first currency. Show historical valid-from/valid-to dates separately from data retrieval dates.
5. **Separate political relationships and classification systems.** Distinguish sovereign status, dependency, disputed claim, de facto administration, UN membership, sports membership and statistical grouping. Model offices, cabinet membership and each chamber independently. Preserve historical administrative systems without presenting them as current.
6. **Use gates that test claims they can actually establish.** Add image decoding, date-range contradictions, arithmetic and cross-registry reconciliation checks. Keep geometry provenance locks, but permit documented, reviewed replacements when laws or official boundaries change. Never make a stale checksum an authority over newer primary evidence. Automated checks should flag missing evidence, not invent it or certify truth from a URL's presence.

For remediation acceptance, require the corrected record/asset, an authoritative dated source (with the original-language passage where material), the exact displayed result, and a recorded resolution of the relevant finding ID. Do not close an entire country or topic because one field was corrected.

## Remaining authoritative-verification work — not confirmed findings

Nepal's coat of arms still needs a dated comparison with the constitutional 2020 Schedule 3 amendment, especially the map outline; the English Refworld constitution omits that amendment whereas its Nepali edition includes it. Do not close this from an English-only comparison. Additional administrative-model leads in CD, CI, GH, BD, TZ and NA require dated primary-law/statistics crosschecks; apparent count differences are not automatically errors. Language-status leads for MD, ML, BF, NE, IN, CD and CG remain unconfirmed here. Kenya and Rwanda have been promoted to confirmed findings above.

Further uncompleted comparisons include every passport issuing series and validity window; every subnational flag/arms adoption instrument; exact disputed-border presentation and all historical map features; V-Dem/EIU edition-wide reconciliation and uncertainty; Olympic totals/participation as of specific Games; airline fleet/operating status and alliance transition dates; broadcaster appropriations versus revenue and audience measurement; tourism-brand versions and ownership; and every party's contemporary leadership/seat basis. ITA's alliance transition, Voepass operating status and some airline designer attributions were research leads, not sufficiently completed primary-source findings in this report.

**Conclusion:** the revision comparison, structural sweep, targeted source audit and findings register above are complete for the stated snapshot. The requested universal, multilingual, claim-by-claim verification is **not complete**, and no 100% accuracy guarantee is defensible. This limitation is preserved explicitly so a future session cannot mistake inventory or passing tests for completed factual verification. Findings F01–F59 are a cumulative register of specific defects and evidence weaknesses; F34 is closed for the corrected field, and individual image fixes are reconciled above. Other findings remain actionable unless explicitly qualified.
