# Subnational flag audit — 2026-09

Ledger for the September 2026 audit of every **state/province-level flag** (Learn-mode
subdivision cards, the sub-national flag game) and **capital-city flag** ("View capital") the app
shows. It records what was wrong, what it is now, the source that proves it, and the judgement
calls made, so a later reviewer can challenge any of them. Batches ship as separate PRs; each
section below says which batch fixed it.

**Joining the work?** Start with [the audit handbook](SUBNATIONAL_FLAG_AUDIT_HANDBOOK.md). It has
the goals, the method, the tools, the current status and the queue of open items to claim.

## Method

Nothing was changed from memory. Every decision below rests on at least one of these sources,
fetched during the audit:

| Source | How it was used |
|---|---|
| **Wikidata** `P41` (flag image) of the item whose `P300` is the ISO 3166-2 code | One SPARQL pull for all 6,097 ISO 3166-2 items (with rank and start/end qualifiers). The app code is mapped through `scripts/data/wikidata-subdivision-code-aliases.mjs`. |
| **Wikimedia Commons** file pages | The description page of each reference file was read to catch `{{fictitious flag}}`, `{{proposed flag}}` and "own work, no source" drawings. |
| **Flags of the World** (FOTW, crwflags.com) | Country indexes and per-subdivision pages. This is the only source for whether a flag exists at all, and it says so explicitly ("There is no known flag for the province…"). |
| **Local-language Wikipedia infoboxes** (`bandera`, `Bandiera`, `image_flag`) | es/it/en/uk/ja/zh/pt articles for the subdivision itself, not its capital. |
| Official sites where cited (e.g. mk-oblrada.gov.ua for Mykolaiv) | For recent adoptions. |

Automated passes (scripts in the audit scratchpad, not shipped):

1. **Inventory**: for all 4,182 divisions in 204 countries, which file is shown and where it comes from (curated override, bundled file, runtime CDN, suppressed, none).
2. **Perceptual comparison** of every shown flag with the Wikidata reference (a mean colour distance on a 24×16 grid, plus a 576-bit dHash). Every pair beyond a small tolerance was montage-reviewed by eye: 132 pairs.
3. **Capital-city comparison**: every province flag was compared with its own capital's bundled city flag. This caught provinces that were showing their **capital city's** flag.
4. **Unbacked set**: the 235 shown flags with no Wikidata backing were montage-reviewed country by country and checked against FOTW and Wikipedia.
5. **Name/code check**: each division's app name against the Wikidata label of its ISO code. This caught mis-coded divisions (Posavina, Moscow).
6. **Recent-change scan**: Wikidata flags with start dates since 2018, plus the known 2024 US changes (Minnesota and Utah are correct).

## Batch 1 — wrong flags removed or replaced, bundling fixed

### 1. Flags that were not the subdivision's own flag — now suppressed (91 codes)

A missing flag beats a wrong one (CLAUDE.md). Every bundled file below was **deleted**, and every
code is in `SUPPRESSED_SUBDIVISION_FLAGS` with a one-line reason. The new
`check-subdivision-flags-bundled.mjs` fails the build if a suppressed code keeps a file.

| Class | Codes | Evidence |
|---|---|---|
| **Parent (national) flag** | AE-FU Fujairah (UAE flag) | Fujairah has flown the UAE flag since 1975; its red emirate flag is historical (FOTW ae-fu). |
| **Invented / fictitious** | ZM-01…10 (all 10 Zambian provinces) | FOTW's Zambia index (modified 2025-09-27) lists **no** provincial flags, only five city flags and two traditional ones. Wikidata has none either. |
| | SO-BK Bakool, SO-GE Gedo, SO-BR Bari, SO-SH Lower Shabelle, SO-BY Bay | FOTW documents only the Banaadir region flag (kept: it matches) and member-state flags. FOTW's own Bari (2012) and Gedo flags are different designs from ours. |
| | GH-AA Greater Accra, GH-TV Volta, GH-EP Eastern | Ghana's regions have no flags (FOTW gh.html). The GH-EP source is tagged `{{fictitious flag}}` on Commons, and the Greater Accra file is a 2022 "own work". |
| | GH-AH Ashanti | The image is the **Asante people's** traditional flag (FOTW gh_asa, Commons "flags of ethnic groups"), not the Ashanti Region's. |
| | ZA-EC, ZA-NC, ZA-NW, ZA-WC | Only **Mpumalanga** has a provincial flag (FOTW za-.html). The Commons files are 2011 user drawings, tagged `{{fictitious flag}}`. |
| | CR-SJ San José (CR) | "San José didn't adopt a flag yet… was used for short time some years ago" (FOTW cr-sj). The Commons file is tagged `{{proposed flag}}`. |
| **Coat of arms / seal / logo / text shown as a flag** | ZA-LP Limpopo, ZA-NL KwaZulu-Natal, ZA-GT Gauteng | Coats of arms on white. KZN's "local flag" is only a SAVA proposal; Gauteng's white logo flag is a government house flag, "not considered the flag of the province" (FOTW). |
| | RO-MH, RO-CT, RO-OT, RO-SV, RO-IF, RO-AG, RO-BZ, RO-BV, RO-SB, RO-B, RO-SM | Arms only. FOTW: "No information is available on flag" for each county. |
| | RO-TM Timiș, RO-HD Hunedoara | Arms-and-lettering logos; no documented flag. |
| | RO-CS Caraș-Severin | Its real flag is blue with the arms and name (FOTW); the file was the bare arms. |
| | NG-KT Katsina | The word "KATSINA" on white. en.wikipedia: *"Please do not add a flag here without a reliable source."* |
| | NG-KE Kebbi (map silhouette), NG-FC FCT ("Abuja — The Heart of Nigeria" brand), NG-EB Ebonyi (the state seal), NG-BA Bauchi, NG-KD Kaduna | No flag in FOTW, the en.wikipedia infobox or Commons "Flags of states of Nigeria". |
| | CU-14 Guantánamo | **The seal of the US Naval Base, Guantánamo Bay.** Cuban provinces have no flags (FOTW cu-.html; es.wikipedia "bandera = no"). |
| | CU-11 Holguín | The "San Isidoro de Holguín" municipal logo. |
| | DO-05 Dajabón ("Ayuntamiento Municipal" logo), DO-02 Azua (a shield), DO-31 San José de Ocoa (an emblem) | Not flags. |
| | TT-DMN Diego Martin, TT-PRT Princes Town, TT-RCM Mayaro–Rio Claro | Corporation badges/logos; the en.wikipedia infobox flag is empty. |
| | UY-MO Montevideo (black-and-white arms drawing), UY-TA Tacuarembó (logo) | No departmental flag in the es.wikipedia infobox. |
| | NI-SJ Río San Juan | A municipal "Alcaldía" logo. |
| **A capital CITY's flag standing in for the province** (Portugal-district rule) | CU-06 Cienfuegos | es.wikipedia: the province has no flag; this is the city's. |
| | ES-ZA Zamora (the city's *Seña Bermeja*), ES-V Valencia (the Valencian *senyera*), ES-TF Santa Cruz de Tenerife (Tenerife **island**'s flag) | es.wikipedia: none of the three provinces has a flag. |
| | IT-CT Catania, IT-PT Pistoia, IT-FG Foggia, IT-BG Bergamo, IT-ME Messina | Each file was the capital city's flag. The province has only a gonfalone, or no clean flag image exists (Bergamo's only image is a drawing on a pole; Messina's is a 2025 drawing with no blazon). |
| | IT-AG Agrigento, IT-MC Macerata, IT-AP Ascoli Piceno, IT-VI Vicenza | Arms-on-white images. it.wikipedia shows only a gonfalone for each province. |
| | NI-BO, NI-CA, NI-CI, NI-CO, NI-ES, NI-GR, NI-LE, NI-MD, NI-MN, NI-MS, NI-MT, NI-NS, NI-RI (all 13 Nicaraguan departments) | Nicaragua's departments have no elected government or flag. Every image was the capital municipality's flag: Managua's reads *"Ciudad de Managua"*, and Wikidata files Carazo and Chontales under **Jinotepe** and **Juigalpa**. The two autonomous regions (NI-AN, NI-AS) keep their flags. |
| **No known flag** | DO-10 Independencia, DO-09 Espaillat, DO-32 Santo Domingo | FOTW: "There is no known flag for the province of …" |
| | DO-15 Monte Cristi, DO-13 La Vega, DO-24 Sánchez Ramírez | No FOTW page, no es.wikipedia `bandera`. |

The explainers that described these images were removed from `flagMeanings.ts`: 18 entries
(ZA-EC/NC/NW/WC/LP, RO-CT, ES-V, IT-CT/PT/FG/AG/MC/AP/VI/BG/ME, AE-FU and NI-MT), plus the
Republika Srpska explainer, BA-SRP, removed with Posavina's fix (§4). The panel renders the
explainer even when no flag is shown, so each would otherwise have described a missing flag.

**Kept with a label.** ZA-FS Free State shows its coat of arms on white, marked *"Flag not
officially recognised by South Africa"*. FOTW za-fs (Bruce Berry, 2 Jan 2022) records that exactly
that flag is flown at the provincial legislature and at public events.

### 2. Wrong images replaced with the subdivision's real flag (10 codes)

Several of these had an explainer that already described the **correct** flag while the image
was wrong. The previous meaning sweep had read the right sources, but nobody replaced the file.

| Code | Was | Now (Wikimedia Commons) |
|---|---|---|
| CH-AR Appenzell Ausserrhoden | The **shield** of the coat of arms (0.82:1) | The square cantonal flag, `Flag of Canton of Appenzell Ausserrhoden.svg` |
| AU-WA Western Australia | A Blue Ensign with a **St Edward's Crown above the swan badge**, which is not the state flag | `Flag of Western Australia.svg`: the 1953 state flag, with no crown |
| UA-48 Mykolaiv Oblast | The 2001 flag (mitre on crossed crosiers) | The **2026** flag adopted by oblast council decision No. 5 of 16 April 2026 (mk-oblrada.gov.ua), `Flag of Mykolaiv Oblast (2026).svg` |
| JP-12 Chiba | Field in dark indigo `#1a15a3` | 空色 sky blue as set by the 1963 prefectural notice No. 328-2, `Flag of Chiba Prefecture.svg` |
| IT-CO Como | The **city**'s red flag with a white cross | The provincial flag, `Provincia di Como-Bandiera.svg` |
| IT-AN Ancona | The **city**'s red flag with a gold cross | The provincial flag, `Provincia di Ancona-Bandiera.svg` |
| IT-LC Lecco | The **city**'s arms on blue | The provincial flag, `Provincia di Lecco-Bandiera.svg` |
| ES-A Alicante | The **city** arms (A-L-L-A) | The provincial flag, `Alicante (provincia).svg` |
| ES-TO Toledo | The **city**'s crimson flag with the imperial eagle | The Diputación's green flag, `Bandera de la provincia de Toledo.svg` |
| PH-ILI Iloilo | The bare seal (a square image) | The provincial flag (the seal on white, 2:1), `Flag of the Province of Iloilo.svg` |

Large or viewBox-less SVGs were bundled as Wikimedia's own 1280 px PNG renders. Sources are recorded
in `public/flags/sources.json`.

**Checked and deliberately not changed:** IT-PC Piacenza. The province's own flag *is* red with a
white square (`Flag of the province of Piacenza.svg`), the same symbol as the city's. Wikidata's
`P41` points at a blue "(Variant)" file.

### 3. Bundling: no more runtime CDN (≈350 flags)

`src/lib/subdivisionFlagIndex.ts` listed only part of the bundled files as local. The rest,
**356 flags** were fetched at runtime from a CDN. They included 31 US states plus the Northern
Mariana Islands (California, New York, Massachusetts…), 59 Italian provinces (Rome, Lucca…), 42
Thai provinces, 36 Spanish provinces, 31 Hungarian counties, 23 Mexican states and 18 Russian
regions. The CDN was
`cdn.jsdelivr.net/gh/amckenna41/iso3166-flags`. During this audit jsDelivr answered **403/404 for
46 of them** in one pass, which leaves those cards blank for users. **348 of the 356 files were
already in the repo** (347 byte-identical). The index now lists every bundled file and has **no CDN
fallback**, and the 8 files that were missing were bundled (NI-MN was then suppressed). The new
`scripts/check-subdivision-flags-bundled.mjs` (in `flags:check` and the `flag-integrity` CI job)
fails the build if:

- an indexed code has no file;
- a bundled file is unreferenced;
- a suppressed code keeps a file;
- a file's bytes don't match its extension;
- any remote URL appears.

The check also found:
- **PT-01…PT-07** (city gonfalons "Cidade de Beja", "Cidade de Coimbra"…) were still bundled and
  indexed. The earlier Portugal ruling said they had been deleted; they now are.
- **LV-102.png** was a WebP file with a `.png` name. It was converted to a real PNG, with pixels
  unchanged.

### 4. Mis-coded subdivisions (the whole data chain was wrong, not just the flag)

| Division | Problem | Fix |
|---|---|---|
| **Posavina Canton** (Bosnia and Herzegovina) | Natural Earth gives the canton **Republika Srpska's ISO code BA-SRP**. The Croat-majority Federation canton therefore showed: the **Republika Srpska flag**; its explainer; "Република Српска" as local name; RS's population, **1,228,423** (the canton has ~43,000); **Sarajevo** as capital (seat: Orašje); and Sarajevo's city flag. A previous sweep had noticed the mismatch in `capital-meaning-omitted.txt` but left it. | `public/subdivisions/BA.json` drops the code. The canton is now keyed by name like its nine sibling cantons. All BA-SRP rows were removed (population, capital, endonyms, capital flag, explainer). |
| **Moscow / Moscow Oblast** | Natural Earth **swapped** RU-MOW and RU-MOS. A meta name override hid it by renaming. So the **city** card showed the oblast's population (8.59 M), "Московская" as local name and **Krasnogorsk** as its capital; the **oblast** card showed the city's 13.27 M. | Codes swapped back in `RU.json`, override corrected. `cities.ts`, `nationalCapitalLocations.ts` and meta were regenerated. Krasnogorsk was added as the oblast's capital marker (a Wikidata fallback, applied surgically; a full regeneration of that file drags in unrelated drift). |
| **Spain's 43 provinces** | Natural Earth tags every province with its community's type, so all 50 cards said "Autonomous Community". | Typed "Province" (ISO 3166-2:ES). The 7 single-province communities and the 2 autonomous cities keep their labels. |

### 5. Knock-on fixes

- `sharedCapitalFlags.ts` was regenerated. A capital flag had been hidden as a "duplicate" of the
  city flag the province was wrongly showing (Como, Ancona, Catania, Bergamo, Messina, Cienfuegos,
  Holguín, the Nicaraguan capitals…). Those city flags now show in "View capital", where they
  belong. The generator no longer folds in a curated pair whose subdivision flag is suppressed or
  gone. **SV-AH** (Ahuachapán ≡ its capital) had silently gone stale (distance 24, not 8), so it is
  now curated.
- `subdiv-remaining.mjs` now counts curated `LOCAL_FLAG_OVERRIDES` too. This surfaced **35
  displayed flags with no explainer**: Jersey, Guernsey, Gibraltar, the Faroes, Åland, Cook
  Islands and others. See the follow-ups below.

## Batch 2 — Malaysia (owner priority, 2026-09-26)

Every flag the app shows for Malaysia was checked: the 13 state and 3 federal-territory flags, all
capital-city flags, and every explainer against its cited source.

**State and territory flags — all correct.** All 16 match Wikidata `P41` and the Commons originals
side by side, and the 14 existing explainers match their cited articles, including the adoption
dates: Negeri Sembilan 1895, Pahang 1903, Perak 1879, Malacca 16 July 1957, and Sabah and Sarawak
1988.

**Two missing explainers added.** Labuan and Putrajaya had been logged as unsourceable. The log
cited FOTW pages `my-labuan` and `my-putrajaya`, which are guessed filenames that 404. FOTW's Malaysia
index (`my_index.html`) links the real pages, `my-labua.html` and `my-pj.html`.
- Labuan: the colour and emblem symbolism is from the Malay Wikipedia article
  [Identiti, Bendera dan jata Labuan](https://ms.wikipedia.org/wiki/Identiti,_Bendera_dan_jata_Labuan).
  The adoption year is left out: sources disagree (1984 on ms.wikipedia, 31 August 1992 on
  en.wikipedia).
- Putrajaya: the flag was adopted 1 February 2001, and the national arms mark the territory as the
  federal administrative centre ([Identiti Putrajaya](https://ms.wikipedia.org/wiki/Identiti_Putrajaya)).
  Colour meanings circulate for this flag, but their primary source is the Information Department
  booklet *Mari Kenali Bendera Negeri-Negeri di Malaysia*. `dbook.penerangan.gov.my` could not be
  reached, so they are not used.

**Capital-city flags — two showed a different entity's flag.**

| Capital | Was | Evidence | Now |
|---|---|---|---|
| **Seremban** (MY-05) | `Flag of Sungei Ujong.svg` — the flag of **Sungai Ujong**, one of the nine traditional chiefdoms (*luak*) of Negeri Sembilan | FOTW [my-n-su](https://www.crwflags.com/fotw/flags/my-n-su.html) ("quartered black, yellow, white and green") vs [my-05-se](https://www.crwflags.com/fotw/flags/my-05-se.html) | The **Seremban City Council** flag: yellow–black–red with the council emblem, city since 1 Jan 2020. en.wikipedia `Flag of Seremban.png` (PD-Malaysia), identical to FOTW's image. New explainer from the council's own [logo page](https://www.mbs.gov.my/ms/mbs/profil/logo) |
| **Kuala Terengganu** (MY-11) | `Flag of Kuala Terengganu, Terengganu.svg` — the **district** flag (yellow with the state flag in the canton) | The Commons file page says "a district in Terengganu", and FOTW [my-ter-m](https://www.crwflags.com/fotw/flags/my-ter-m.html) lists it among the district flags. It gives the Kuala Terengganu City Council (MBKT) flag separately | **No flag**. MBKT's flag has no free file on Commons or en.wikipedia; its explainer is removed |

Both rejections are recorded with their evidence in the new `scripts/data/capital-flag-rejected.json`.
`build-capital-details.mjs` drops these entries on every regen, and `backfill-capital-flags.mjs` never
proposes them. `check-capital-flags.mjs` fails the build if either is back in the manifest. A
wrong-entity flag can therefore not return through the Wikidata pass, an override or a preserved
manifest entry.

**Explainers corrected.**
- Kota Kinabalu (MY-12) had given its flag the colour meanings of Sabah's **1963 state flag**, which
  no source ties to the city flag. It now says only what FOTW documents: Mount Kinabalu was chosen to
  represent Sabah's capital, and the flag was first raised at midnight on 1 February 2000, when the
  city was proclaimed.
- Putrajaya's capital-city entry had given the flag the colour meanings of the 2006 combined
  **Federal Territories flag**, a different flag. It is now aligned with the subdivision entry. The
  capital widget hides this flag anyway, because it duplicates the territory's.

**Omission logs cleaned.** Seremban's entry had described the chiefdom flag as the "MBS council
flag". Shah Alam's was stale: its flag and explainer have displayed since the Klang/Shah Alam fix.

**Gaps that stay open, with reasons.**
- No free file exists for the city-council flags of Kota Bharu, Kuantan (city since 21 Feb 2021),
  Kangar, Kuching (Kuching North City Hall and Kuching South City Council are separate councils) or
  Kuala Terengganu. FOTW documents all of them except Kota Bharu. Commons holds only the Kota Bharu
  **district** flag, an unsourced 2015 "own work", which is not used.
- The population of Labuan's capital, Victoria, is still a 2000 estimate. DOSM publishes no
  newer figure for the town, only for the whole territory (95,120 in the 2020 census).

## Batch 3 — South Korea (owner priority, 2026-09-26)

I checked the 17 first-level divisions against Wikidata `P41`, the Korean Wikipedia infoboxes and
the dedicated flag articles (`…기`), and every capital-city flag against its city's Korean Wikipedia
infobox.

**The 15 bundled flags are current.** Each matches its Commons original, including the new flags
of Gangwon State (June 2023), North Chungcheong (October 2023) and Jeonbuk State (January 2024).
Their explainers already describe those new flags.

**Seoul and Busan now have flags.** Both had none.
- **Seoul**: the 1996 flag. The logo's 서울 is drawn as a green mountain, a red sun and the blue
  Han River.
- **Busan**: the new flag adopted on 17 May 2023, which replaced the blue 1995 flag.

Both explainers come from Korean Wikipedia's flag articles
([서울특별시기](https://ko.wikipedia.org/wiki/서울특별시기),
[부산광역시기](https://ko.wikipedia.org/wiki/부산광역시기)).

**A district's flag was standing in for Seoul and Busan.** Both are city-territories, so the
Flag Master sub-national game falls back to the capital-city flag. Wikidata's `P36` for Seoul is
**Jung District**, where City Hall stands, and for Busan it is **Yeonje District**.
- The game therefore showed the Jung-gu and Yeonje-gu district flags as "Seoul's" and "Busan's"
  flags.
- The capital widget printed "Capital: Seoul — Local name: 중구" (Jung-gu) and "…연제구".

The fix:
- The seat district's name, population, endonym and flag are removed.
- `SEAT_DISTRICT_NOT_A_CAPITAL` in `build-capital-details.mjs` keeps them out on regen.
- Both flags are added to `capital-flag-rejected.json`.

**Types and plural label.** Natural Earth's `type_en` had called **South Jeolla** and
**North Gyeongsang** "Metropolitan City", and Seoul a "Capital Metropolitan City". The plural label
read "Metropolitan Citys". The types now follow ISO 3166-2:KR and Korean law:
- Seoul: Special City;
- Busan, Daegu, Incheon, Gwangju, Daejeon and Ulsan: Metropolitan City;
- the six ordinary provinces: Province;
- Gangwon (2023), Jeonbuk (2024) and Jeju (2006): Special Self-Governing Province;
- Sejong: Special Self-Governing City.

The label is now "Provinces & Metropolitan Cities".

**Three capital populations were wrong.** Each is replaced with the authority's own
resident-registration count for Korean nationals at the end of August 2026, in
`CAPITAL_POPULATION_OVERRIDES`.

| Capital | Was (Wikidata) | Problem | Now |
|---|---|---|---|
| Jeonju | 341,545 (2023) | about half the city | 618,908 ([Jeonju City](https://www.jeonju.go.kr/index.9is?contentUid=ff8080818990c349018b041a9f093a72)) |
| Jeju City | 698,358 (2024) | the whole province's figure, larger than the province's own count | 484,149 ([Jeju Statistics Portal](https://www.jeju.go.kr/stats/stats/population.htm)) |
| Chuncheon | 281,596 (2015) | eleven years stale | 284,783 ([Chuncheon City](https://www.chuncheon.go.kr/cityhall/administrative-info/municipal-info/resident-registration-population-status/)) |

**Still open.**
- Muan County has no population. The county publishes it only as a session-bound spreadsheet.
- Jeju City has no free flag file.
- South Korea's 2025 Population and Housing Census was released on 28 July 2026 and supersedes
  the mixed-year provincial figures (2018–2025) now shown. That is a population refresh for the
  whole country.

## Batch 4 — Czechia, Poland, Estonia (2026-09-26)

**41 real flags were bundled but never shown.** The files were named with the current ISO 3166-2
codes, while the app's maps use older ones:
- Poland: PL-02…PL-32 against the app's PL-DS…PL-ZP (16);
- Czechia: CZ-10…CZ-80 against CZ-PR…CZ-ZL (14);
- Estonia: the 2022 renumbering, e.g. EE-68 against EE-67 for Pärnu (11).

The files are renamed to the app's codes. Their `sources.json` keys move with them and keep their
original source URLs.

**Every file was checked against the current Commons original** (Wikidata `P41`), rendered in
Chromium. Two were out of date and are replaced from Commons:

| Code | Was | Now |
|---|---|---|
| CZ-ST Central Bohemia | St Wenceslas's eagle drawn without its flames | `Vlajka Středočeského kraje.svg` |
| PL-WP Greater Poland | older revision: the red hoist was 0.57 of the height instead of a square | `POL województwo wielkopolskie flag.svg` |

Świętokrzyskie's file is the current flag (adopted 28 December 2012), not the 2001–2013 one.
Opole's file has the 2:1 stripes its resolution sets. Polish Wikipedia's "5:2" is wrong.

**Explainers.** 43 entries, each checked against the sources named:
- 14 Czech regions, from the Czech Wikipedia "Symboly … kraje" articles.
- 14 Polish voivodeships, from the Polish Wikipedia flag and arms articles and FOTW.
  Kuyavia-Pomerania's comes from the voivodeship's own flag leaflet (archived). It explains why
  black, not white, is the bottom stripe.
- 15 Estonian counties, from the Estonian Wikipedia "… maakonna lipp" / "… maakonna vapp"
  articles and FOTW [ee-sub](https://www.crwflags.com/fotw/flags/ee-sub.html). Every county flag
  follows the pattern confirmed on 7 August 1939: white over green, with the county arms on the
  white.

Four existing Estonian explainers were wrong or incomplete:
- **Harju (EE-37)** called the flag "the county arms as a banner". It is white over green with
  the arms.
- **Viljandi (EE-84)** said the grain meant "agrarian character" and the eagle "sovereignty and
  authority". Its cited source says neither, so those claims are removed.
- **Hiiu (EE-39) and Saare (EE-74)** described only the arms, not the flag.

**Omitted, with sources recorded:** Łódzkie and Opolskie. FOTW, Polish Wikipedia and the
voivodeships' own pages give the design, date and designer only. Opole's 2004 resolution, read in
full, includes a justification with no symbolism.

**Map-overlay shapes were wrong for 23 flags.** `build-flag-aspect-ratios.mjs` read the first
`viewBox` anywhere in a file's first 2 KB. It also misread `width="2e3"` as 2 and ignored `pt`/`cm`
units. Examples:
- Roraima was recorded at 0.0014:1, East Riding and Hertfordshire at 0.0017:1, and Alsace at 42:1.
- Five Polish flags came out at 0.71:1. They keep Inkscape's A4 page (`viewBox="0 0 210 297"`)
  behind an 800×500 flag.

The builder now reads the root `<svg>` tag and prefers its absolute width and height, as browsers
do; the `viewBox` is the fallback. Chromium shows each of the 23 files painting its whole flag
across the width×height box. That includes Nepal's 1743 pennant, now 0.6759 rather than 0.8182.

**Saare County's type.** Natural Earth typed Saare "Novads" (Latvian for a municipality), so
Estonia's grid split into "County (14)" and "Municipality (1)". It is a county, as ISO 3166-2:EE
and the other 14 cards have it. There is now a type override in `build-subdivision-meta.mjs`.

**Prague is a city-territory.** Act No. 131/2000 Coll., §1(1), makes Prague the capital, a region
and a municipality at once. `CZ-PR` joins `CITY_TERRITORY_CODES`, so the capital quiz never asks
for "the capital of Prague".

## Batch 5 — Slovakia, Switzerland, Liechtenstein, the Netherlands, Comoros, Saint Helena, Russia (2026-09-26)

**16 real flags were missing and are now bundled from Commons.** Each file was compared with the
division's FOTW page before bundling.

| Code | Division | Commons file |
|---|---|---|
| SK-BL | Bratislava Region | `Bratislavsky vlajka.svg` |
| SK-BC | Banská Bystrica Region | `Banskobystricky vlajka.svg` |
| CH-AG | Aargau | `CHE Aargau Flag.svg` |
| CH-AI | Appenzell Innerrhoden | `CHE Appenzell Innerrhoden Flag.svg` |
| LI-01 | Balzers | `Flag of Balzers Liechtenstein-1.svg` |
| LI-02 | Eschen | `Flag of Eschen Liechtenstein-1.svg` |
| LI-03 | Gamprin | `Flag of Gamprin Liechtenstein-1.svg` |
| NL-LI | Limburg | `Flag of Limburg (Netherlands).svg` |
| KM-A | Anjouan | `Flag of Anjouan (official).svg` |
| KM-M | Mohéli | `Flag of Mohéli (official).svg` |
| KM-G | Grande Comore | `Flag of Grande Comore.svg` |
| SH-TA | Tristan da Cunha | `Flag of Tristan da Cunha.svg` |
| SH-AC | Ascension | `Flag of Ascension Island.svg` |
| RU-MOW | Moscow | `Flag of Moscow, Russia.svg` |
| RU-MOS | Moscow Oblast | `Flag of Moscow Oblast (large).svg` |
| RU-ORL | Oryol Oblast | `Flag of Oryol Oblast.svg` |

The Liechtenstein files are the long vertical banners (1:4) the municipalities fly.

**No screen shows the Saint Helena territory's three parts yet.** The app opens sub-national views
for UN members only, and on the UK's map the whole territory is one card, GB-SH. Ascension's and
Tristan da Cunha's flags and explainers are bundled so the data is complete if a view is added.

**Saint Helena island (SH-HL) stays blank, on purpose.** The app already shows Saint Helena's flag
for the whole territory (`sh.svg`, both as GB-SH and as the SH parent). Showing it again on the
island's card would repeat the parent's flag on a division, which the parent-collision check exists
to stop.

**Explainers.** 16 new entries. Every flag's FOTW page is cited, plus:
- Slovakia: the Bratislava Self-Governing Region's own page on its arms, and SKsymbol's blazons.
  FOTW traces each Banská Bystrica quarter to a historical county.
- Switzerland: the German Wikipedia "Wappen des Kantons …" articles. Aargau's entry has a myth
  entry. The 1803 decree gave the arms no meaning, and the rivers-and-fertile-soil reading is 20th
  century. 19th-century sources read the stars as Baden, the Freie Ämter and the Fricktal.
- Liechtenstein: the arms sections of the German Wikipedia municipality articles.
- Limburg: the Dutch Wikipedia flag article, and FOTW for the designer (the architect Maris) and
  the 1880s refusals of a white-and-red flag.
- Comoros: FOTW, and English Wikipedia for the national flag's stripe for each island.
- Tristan da Cunha and Ascension: the English Wikipedia flag and arms articles.
- Russia: the Russian Wikipedia flag and arms articles. Moscow's entry has a myth entry: the
  rider was read as Saint George only from the 1710s. Before that it stood for the sovereign.

**Identical flags in the Sub-national game.** Balzers and Gamprin fly the same flag (FOTW
li-ba.html). Measuring every same-country pair of division flags found four more identical pairs
already in the game: Ajman and Dubai, Ras Al Khaimah and Sharjah, Nariño and Vichada, and the two
Corsican departments. A player who named the other member of a pair was marked wrong.
- `src/data/identicalSubdivisionFlags.ts` lists the five pairs, each with a source. The game now
  accepts either answer, and the reveal names the other division.
- `scripts/check-identical-subdivision-flags.mjs` (in `flags:check` and CI) fails on any
  near-identical pair that is neither declared nor reviewed. It records five pairs checked by eye
  and found different. The closest is Ida-Viru and Lääne-Viru, whose arms differ only in the
  colour of the tower roof.

**Haute-Savoie's explainer described a different image.** It described the department's arms as a
banner. The bundled flag is the Savoy cross with "Haute-Savoie" written on it. FOTW says the
department has no flag of its own, and that this version is sometimes used to tell it from Savoie,
for instance at sports events. The explainer now says that. Which image French departments should
show is still open (see the judgement areas below).

**San Andrés.** Natural Earth's English name for CO-SAP was "Archipelago of Saint Andréws". It is
now "San Andrés and Providencia", as English Wikipedia names the department.

**Colombia's types.** Natural Earth kept statuses abolished in 1991. Five departments were typed
"Commissiary" (a misspelling) and four "Intendancy", including Caquetá, a department since 1981.
Bogotá was a "Federal District". Article 309 of the 1991 Constitution made them all departments,
and article 322 makes Bogotá a capital district. Type overrides in `build-subdivision-meta.mjs`.

**Moscow and Saint Petersburg are city-territories.** They are federal cities under article 65 of
the Russian Constitution, so they join `CITY_TERRITORY_CODES`.

## Batch 6a — wrong capitals found by the capital-flag scan (2026-09-26)

**North Sulawesi's capital was Gorontalo; it is Manado.** Wikidata's North Sulawesi item (Q5068)
lists two capitals. One is Gorontalo, the capital of the province that split off in 2000. The
generator picked it, so ID-SA carried Gorontalo's population and Gorontalo City's flag, and so did
the quiz. The Learn panel's name check hid it there, because the map already said Manado.
- The generator now pins ID-SA to Manado (Q15847) and rejects the Gorontalo flag.
- Manado's own flag, the city arms on white, is bundled from Commons ("City Flag of Manado.png",
  public domain in Indonesia). It matches FOTW's image on
  [id-sa-c](https://www.crwflags.com/fotw/flags/id-sa-c.html).
- Population: 462,658, BPS's mid-2025 estimate (Kota Manado Dalam Angka 2026, as cited by English
  Wikipedia). The 2020 census gave 451,916.
- The flag's explainer comes from the city government's account of its arms, as published by
  iNews Sulut (12 September 2022). The official page itself refuses automated reads.

**Schellenberg's capital was Vaduz.** Wikidata's Schellenberg item (Q49655) gives Vaduz as its
capital, although Vaduz is a different municipality (LI-11). The app showed Vaduz as
Schellenberg's capital, with Vaduz's flag and a map marker at Vaduz.
- The capital card, the flag and the map marker are gone.
- The new `scripts/data/wikidata-capital-rejected.json` records the rejection. Both capital
  generators honour it, and `check-capital-flags.mjs` fails if the capital comes back.

**Vaduz's own explainer described arms that are not on its flag.** The flag is three stripes,
red, white and red (1:1:2). The municipality's official page says the flag was granted in 1932
with the first arms and confirmed unchanged when new arms were granted in 1978. FOTW explains that
the stripes follow the first arms' red field with its white bar. The explainer now says that.

## Batch 6b — the quiz accepts identical capital flags; flags no source supports (2026-09-26 to 29)

*Shipped in #1717 (`6d8406e`); live since 29 September 2026, 7:37 PM AEST.*

**The quiz now accepts identical capital flags.** Batch 5 taught the Sub-national flags game to
accept two divisions that fly the same flag. Capital cities were still left out. In a deck of
divisions and capitals, Kyiv's flag asked as "the capital of Kyiv Oblast" marked the answer "Kyiv"
(the city's own division) wrong. The game now marks answers by key: a division's code, or
`capital:` and the code of the division it is the capital of. `identicalSubdivisionFlags.ts`
groups keys, 47 groups in all, each with its own sources:
- **One city in two roles (29 groups).** Kyiv; Minsk; Bogotá; Prague; Addis Ababa (the Oromia
  government sits there, a claim the federal constitution does not recognise); Zagreb; Budapest and
  18 other Hungarian county seats that are also cities with county rights; Bishkek; Oslo; Port
  Moresby; Honiara; Sofia (the capital of both Sofia City and Sofia Province). Each capital is
  sourced from the region's English Wikipedia infobox, or from the Counties of Hungary table.
- **One design, two or more places (13 new groups).** Each place's own flag is documented with the same
  colours in the same layout:

  | Places | Design | Sources |
  |---|---|---|
  | Bolívar department, Ibagué | yellow, green, red stripes | es.wikipedia *Bandera de Bolívar*; FOTW co-tolib |
  | Cesar department, Tunja | green, white, green stripes | es.wikipedia *Bandera de Cesar*; FOTW co-boytu |
  | Arauca, Manizales | white, green, red stripes | FOTW co-araar (Acuerdo 018 of 2001); FOTW co-cal-m (quoting the Caldas government) |
  | Prague, České Budějovice | yellow over red | cs.wikipedia *Vlajka Prahy*; cs.wikipedia *České Budějovice* |
  | Baden-Württemberg, Munich | black over gold | de.wikipedia *Flagge Baden-Württembergs*; de.wikipedia *München* ("Die Münchner Stadtflagge zeigt diese beiden Farben längsgestreift") |
  | Esmeraldas Province, Zamora canton | white over green | FOTW ec-e; zamora.gob.ec *Símbolos patrios* (FOTW's 2001 white over black for Zamora is outdated) |
  | Grenoble, Lons-le-Saunier | red and gold, divided vertically | partir-ici.fr; FOTW fr-39-ls (2021 photo) |
  | Warsaw, Łódź | gold over red | pl.wikipedia *Warszawa*; pl.wikipedia *Flaga Łodzi* |
  | Alessandria, Bologna, Genoa, Milan, Padua, Varese | red cross on white | FOTW pages for each city (CISV images) |
  | Ascoli Piceno, Bergamo, Naples, Ravenna | yellow and red, divided vertically | FOTW; it.wikipedia *Napoli* |
  | Asti, Como, Novara, Pavia | white cross on red | FOTW (Asti, Novara); it.wikipedia (Como, Pavia) |
  | Brescia, Isernia | white and blue, divided vertically | FOTW it-bs-bs; it.wikipedia *Isernia* |
  | Caserta, Catania | red and blue, divided vertically | FOTW it-csrta, it-ct-ct |

  The five groups that already existed (Ajman and Dubai, Ras Al Khaimah and Sharjah, Nariño and
  Vichada, the two Corsican departments, Balzers and Gamprin) are unchanged.
- **Checked and different.** Mantua's red cross carries Virgil in the upper hoist (FOTW it-mantu),
  so it is not grouped with Alessandria. Córdoba's top stripe is blue, not Tunja's green. Navarre,
  Tarragona and Cuenca carry different arms on red.
- The answer reveal names every twin ("…fly the same flag — any of these answers counts").
- `check-identical-subdivision-flags.mjs` now compares capital flags with the divisions and the
  other capitals of the same country. It checks a group's consistency with a shade-tolerant step
  (96, failing at 10%), requires a note and a source for every group, and gains two report modes,
  `--scan` and `--same-city`.

**Capital flags no source supports: 11 removed.** Each is recorded, with its evidence, in
`scripts/data/capital-flag-rejected.json`, so a regeneration cannot restore it. The explainers
that described these images are removed.

| Code | Capital | What it showed | Evidence |
|---|---|---|---|
| IT-RN | Rimini | Plain white and red bicolour, drawn on Commons with no source | FOTW it-rn-rn: the flag is white with the city arms (flagsonline.it); the comune's gonfalone carries the arms |
| IT-TE | Teramo | Plain white and red bicolour, no source | The gonfalone granted by DPR 11 September 2001 is white with a red border and the arms (it.wikipedia); FOTW it-te-te gives the older town flag as red and white with red at the hoist |
| IT-OR | Oristano | Plain white and red bicolour, drawn from Cagliari's file | No flag documented: no FOTW page, and it.wikipedia describes none |
| SY-DI, SY-RD | Damascus | Commons "Flag of Damascus (until 2024).svg", the governorate's logo flag | Commons records it as used until 2024. No later flag is documented (Commons category, FOTW sy-di) |
| MA-01 | Tangier | The Wilaya of Tangier's flag | FOTW ma-: the wilaya flags of 1976 are listed apart from city flags |
| MA-02, MA-03, MA-05, MA-09 | Oujda, Taza, Beni Mellal, Settat | Kénitra, Fès (twice) and Settat *province* flags | Commons "Flags of provinces of Morocco" |
| MA-10 | Guelmim | Sidi Bennour's flag | A different place |

**Italian province flags that were not the province's flag: 3 suppressed.** The documented flags
exist, but no free image of them does.
- **IT-TR Terni** showed a plain yellow and blue field. it.wikipedia describes the province's flag
  as *"partito di giallo e di azzurro con lo stemma della provincia al centro"*, with the arms at the
  centre. Commons' own-work file renders with its arms layer hidden. The only depiction (Araldica
  Civica, via it.wikipedia) is licensed to Wikipedia alone.
- **IT-UD Udine** showed the same kind of plain blue and yellow field, the Commons own-work file of
  2012. FOTW/CISV and bandieredalvivo.com, which photographed the flag at the provincial seat in
  2018, both show the provincial arms (a golden eagle) at the centre.
- **IT-TA Taranto** showed a plain red and blue field, the city's colours. The province has arms and
  a blue-and-red gonfalone (it.wikipedia; FOTW it-ta shows the arms only). Commons' "Flag of the
  Province of Taranto.svg" is a 2022 own-work drawing with no source.
- **IT-FE Ferrara was checked and is right.** Its plain white-over-light-blue flag is the CISV
  description, and bandieredalvivo.com photographed it at the provincial offices in 2010.

**Belarus.** Natural Earth swapped the two Minsk units' types and gave both the name "Minsk". BY-MI
is now **Minsk Region** (Region) and BY-HM is **Minsk** (City), per ISO 3166-2:BY. The
city-territory entry moves from the region to the city, so Minsk Region's capital card now shows
Minsk and its flag.

**Names.** BG-23 is now "Sofia Province" (en.wikipedia), so it no longer shares the name of Sofia
City. IT-GE is now "Genoa": Natural Earth had given the region's name, "Liguria", to the
metropolitan city.

**Grenoble's explainer** is rewritten from partir-ici.fr (Auvergne-Rhône-Alpes Tourisme) and
fr.wikipedia's *Armoiries de Grenoble*. The flag is red at the hoist and gold at the fly. The text
gives both readings of the three roses, Bouchayer's and Ménestrier's, the 1575 engraving, and the
registration in the Armorial général on 13 June 1698. FOTW's 2001 description of the flag as red and
white is the outlier.

**Found in passing, and queued in the handbook.** Iran's capital data uses the 2018 ISO codes while
its map uses the old ones, so Hormozgan shows Tehran (SF-03). The quiz does not apply the panel's
capital-name check (SF-02). Taranto's city flag and about 80 other Italian capital flags are not
yet checked against FOTW (SF-04).

## Batch 7a — Iran: every province carried another province's data (2026-09-29)

*Shipped in #1720 (`141cf7f`); live since 29 September 2026, 8:21 PM AEST.*

**What was wrong.** The Iran map (`public/subdivisions/IR.json`) carried the ISO 3166-2:IR codes in
force before the 2018 update. Every Wikidata-keyed dataset uses the current codes, and the two
schemes reuse the same numbers for different provinces, so all 31 provinces showed another
province's data:
- Hormozgan (map code IR-23) showed Tehran Province's 13,267,637 people (2016 census) and Tehran as
  its capital; the capital quiz used Tehran's flag for it. Hormozgan has 1,776,415 people.
- Fars (IR-14) showed Chaharmahal and Bakhtiari's 947,763; Bushehr (IR-06) showed Khuzestan's
  4,710,509; Qazvin (IR-28) showed North Khorasan's name in Persian. The same applied everywhere.
- Tehran and Alborz had no code, so the app keyed them by name. Markazi, Fars and Razavi Khorasan
  had no capital card, because their current codes (IR-00, IR-07, IR-09) did not exist on the
  map. North Khorasan was patched through a one-off alias (IR-28 → IR-31).
- The quiz asked Tabriz, Urmia, Tehran and Qom as the capitals of Ardabil, Isfahan, Hormozgan and
  Yazd.

**Fix.**
- The 31 map features now carry the current codes. Each comes from Wikidata's P300 on the province
  item, and all 31 match the ISO table in English Wikipedia's "ISO 3166-2:IR" (IR-00 Markazi …
  IR-30 Alborz). The geometry is byte-for-byte unchanged, and the alias is removed.
- Regenerated from their sources: the division list, the map's capital points (`cities.ts`, where
  only Iran's lines changed) and the national-capital host (Tehran → IR-23).
- Populations were already keyed by the current codes; the stray IR-31 duplicate is removed.
- From a fresh Wikidata run, only Iran's lines were taken: capital details for Markazi (Arak,
  520,944, 2016 census), Fars (Shiraz, 1,565,572, 2016 census), Razavi Khorasan (Mashhad,
  3,208,000, 2020 estimate) and North Khorasan (Bojnord, 228,931, 2016 census), and the native
  names of those provinces and capitals. The same run drifted 27 unrelated entries elsewhere;
  those were left as they are.
- Alborz had no capital on the map: Natural Earth predates the province (2010) and tags no capital
  for it. Its capital, Karaj (Wikidata Q36529, the province's P36), now comes from the Wikidata
  fallback layer (`subdivisionCapitals.ts`). Only that one line was taken from a fresh run of its
  generator; the same run drifted 33 unrelated lines, which were left alone.
- Three capitals showed no population, because Natural Earth spells them differently from the
  Wikidata item the population comes from, and the panel only shows a figure when the names agree.
  A new, cited table in `build-cities.mjs` (`SUBNATIONAL_NAME_ALIAS`) now gives each the Wikidata
  English name: Bandar-e Bushehr → Bushehr (Q158928), Bandar-e-Abbas → Bandar Abbas (Q154814) and
  Bojnurd → Bojnord (Q317946). Same city, same coordinates. Batch 7b uses the same table for the
  other spelling mismatches.

**Result.** All 31 provinces were checked in the running build. Each shows its own population,
capital, capital population and native names, and there were no page errors. The quiz asks
Tabriz, Urmia, Tehran and Qom as the capitals of East Azerbaijan, West Azerbaijan, Tehran and
Qom.

## Batch 7b — six more maps where polygons carried another region's code (2026-09-29)

*Shipped in #PRNUM.*

**How they were found.** After Iran, a scan tested every map polygon in the app against Wikidata.
For each ISO 3166-2 code, it checked whether the region's own coordinates (P625) and its capital's
coordinates (P36 → P625) fall inside the polygon carrying that code. When both points land in the
same other polygon, and that polygon's points land back in the first, the map has the codes on the
wrong outlines. English Wikipedia's ISO tables, Natural Earth's own towns and Flags of the World
confirmed each case. The scan is now `scripts/flag-audit/geo-code-scan.mjs`.

**What was wrong.** A polygon that carries another region's code shows that region's flag,
population, capital and native name.
- **Ecuador:** the Napo and Tungurahua outlines were swapped. The polygon around Ambato was
  labelled Napo, so it showed Napo's flag, and Napo's capital was given as Ambato. That capital is
  also in the quiz.
- **Eritrea:** four of the six regions were rotated. Asmara sat in "Anseba", Keren in "Northern Red
  Sea", Massawa in "Debub" and Mendefera in "Maekel".
- **Guyana:** eight of the ten regions carried another region's name and code. For example,
  Georgetown sat in "East Berbice-Corentyne". Essequibo Islands-West Demerara also carried the
  English name "Mahaica-Berbice", so two regions had the same name.
- **Afghanistan:** Paktia and Paktika had each other's codes.
- **Latvia:** Sala and Salacgrīva had each other's codes.
- **Uganda:** the map used the district numbering from before ISO's 2010 renumbering, so 33
  districts had another district's code. Mityana showed Lyantonde's data, and so on. One polygon
  labelled a second "Mbarara" is Kiruhura District: Wikidata's centre for Kiruhura (Q1318865)
  lies inside it. In addition, 23 districts were typed "County", and Kampala "District". ISO lists
  every one as a district, and Kampala as a city. Ugandan counties are units below the district.

**Fix.**
- In `public/subdivisions/{EC,ER,GY,AF,LV,UG}.json`, each region's properties now sit on its own
  polygon. This was done with a string-level edit of the properties, and the geometry was checked
  to be byte-for-byte unchanged.
- The Ugandan codes follow the current ISO table matched by district name. Luwero, Kibaale and
  Bukomansimbi keep their codes, because only their spelling differs from ISO's. Bukwa is Bukwo
  (UG-220). Omoro (UG-331), created in 2016, has no polygon of its own.
- Regenerated from these files:
  - the division list and the map capitals, where only these six countries changed;
  - the national-capital hosts: Asmara is now in Maekel, Georgetown in Demerara-Mahaica;
  - the Wikidata fallback capitals, taking only these countries' lines. This adds New Amsterdam,
    Lyantonde, Isingiro, Kibingo (Sheema), Nwoya and Buhweju.
- Capital details for the two districts new to the map come from a fresh Wikidata run: Isingiro
  (UG-418) and Sheema (UG-426, capital Kibingo). The same run drifted many unrelated entries,
  which were left alone.
- Paktia's capital is spelled Gardez (Wikidata Q467632; Natural Earth has "Gardiz"), using the
  alias table from 7a.
- The flags were already filed under the right ISO codes, so they now appear on the right
  outlines. `EC-T.svg` is the Commons file "Bandera Provincia Tungurahua". `EC-N.svg` matches
  the Napo image on FOTW (ec-n.html, reached from ec-.html): yellow over white, blue and red.

**Checks.**
- Capital agreement for the six countries: 251 before, 259 after. None of the codes that still
  disagree shows a different capital than before on the same outline.
- The scan now reports none of these countries. Its remaining swaps are Morocco (SF-03) and
  Antigua. The Antigua pair are border villages on coarse outlines; the polygons' extents match
  the parishes.
- Quiz capitals that disagree with the panel: 77 → 76 (Napo's capital is Tena again).

**Left for later, recorded in the handbook.**
- Wrong Natural Earth capitals, the batch 7c class. Paktika shows "Zareh Sharan", 50 km from
  its capital Sharana. Napak shows Moroto and Kiryandongo shows Masindi-Port, because the coarse
  outlines put those towns on the wrong side of the line.
- Sources disagree on Demerara-Mahaica's capital. English Wikipedia says Georgetown, and Wikidata
  says Paradise. The map shows Georgetown.
- Maps older than the current structure (SF-14): Uganda's 23 districts created in 2010–2020, and
  Kazakhstan's 2022 regions.

## Follow-ups (later batches)

### Capital flags that match another place's flag (found in batch 5)
The identical-flag scan was also run on capital flags against every other flag of the same
country. It found 46 identical pairs, in three groups:
- **One city, two subdivisions.** Kyiv, Budapest, Minsk, Oslo, Port Moresby, Honiara, Bishkek,
  Damascus, Addis Ababa, Sofia, and the Hungarian county seats that are also cities with county
  rights. The city is the capital of one subdivision and a division in its own right. A mixed deck
  should accept both answers.
- **Different places with the same design.** Probably right, but each needs checking: Genoa and
  Milan (St George's cross), Warsaw and Łódź (yellow over red), Munich and Baden-Württemberg
  (black and gold), and several Italian provincial capitals with the same bicolour.
- **Wrong data.** North Sulawesi and Schellenberg were fixed in batch 6a. Taza and Beni Mellal
  both use the Fes *province* flag; see Morocco below.
- **Checked and right.** České Budějovice's flag is yellow over red, like Prague's (Czech
  Wikipedia). Lons-le-Saunier's is red and yellow (FOTW fr-39-ls, 2021).
- **Still to check.** Grenoble's red-and-yellow file on Commons has no source for its design, and
  FOTW (fr-38-gr, 2001) describes the flag as red and white. Also Caserta and Catania, Brescia and
  Isernia, Ibagué and Bolívar, and Zamora and Esmeraldas.
- **Resolved in batch 6b** (see above): every pair is now either grouped with sources, recorded as
  distinct, or removed because its flag was wrong.

### The quiz does not check capital names (found in batch 6a)
The Learn panel shows a capital's flag only when the capital card and the map name the same city.
The capital quiz uses the card's name alone. So each of the 25 mismatches logged in
`capital-meaning-omitted.txt` reaches the quiz with the card's city. Examples: Singaraja for Bali,
Bau-Bau for Southeast Sulawesi, Pahandut for Central Kalimantan, and Trogen for Appenzell
Ausserrhoden. Some are spelling only (Gent/Ghent, Luzern/Lucerne, Dumyat/Damietta). Others are
real disagreements, and sometimes the map is the one that is out of date: South Kalimantan's
capital moved from Banjarmasin to Banjarbaru in 2022. This is the capital-name reconciliation
below, and the quiz should apply the same check.

### Morocco (found in batch 6a)
The map has the 16 regions abolished in 2015, under the pre-2015 ISO codes. The capital data was
resolved against the 2015 codes, so MA-02 shows Oujda (for Gharb-Chrarda-Béni Hssen), MA-05 Beni
Mellal (for Fès-Boulemane), and so on. Every Moroccan capital flag is a *province* flag
(Kénitra, Fès, Settat, …), not a city's. This needs one structural fix, not per-code patches.



### City-territory capital cards (found in batch 4)
The Learn panel's capital card for a city-territory shows the territory's own figure for Kuala
Lumpur and Washington, but "No further sourced data" for Prague, Seoul and Busan. The city *is*
the territory, so the card should show the territory's population. `CAPITAL_POPULATION_OVERRIDES`
can only fill an existing record, so these need a record-creating path. Seoul's and Busan's
figures should also wait for Korea's 2025 census refresh.

### Capital-name reconciliation (found in batch 3)
The capital widget shows the capital from `cityRoles` (Natural Earth, placed by point-in-polygon).
Its population and flag come from Wikidata `P36`, keyed by ISO code. A name check already hides the
population and flag when the two capitals disagree, but the **local name** was never checked. In
**255** subdivisions the two names differ:
- **About 127 are the same city spelled differently** (Bamian/Bamyan, Gent/Ghent, Homyel/Gomel).
  For these the check wrongly hides a real population and flag.
- **About 128 are different cities.** Some come from the ISO-code generation mix in Iran and
  Morocco. Others are seat districts (Beijing → Tongzhou, Taipei → Xinyi, Tokyo → Shinjuku). Others
  are Natural Earth putting the capital in the wrong city:
  - ~~Eritrea's four regions are shifted by one;~~ the map outlines were rotated; fixed in 7b;
  - Greece: Kavala for Komotini, Chalkida for Lamia, Kalamata for Tripoli;
  - ~~Afghanistan: Paktia and Paktika are swapped;~~ the map codes were swapped; fixed in 7b;
  - Ethiopia: Dese for Bahir Dar, Jima for Addis Ababa;
  - A Coruña is given as Santiago;
  - Azerbaijan's Zangilan is given as Kapan, a town in Armenia.

  These need a sourced capital-correction layer and a local-name check.

### Gaps — real flags the app shows blank

These have an official flag documented by Wikidata `P41` and the local-language Wikipedia, but show
nothing. Mostly this is an ISO-code mismatch between the flag data and the app's codes.

| Country | Divisions | Notes |
|---|---|---|
| Poland | ~~all 16 voivodeships~~ | Done in batch 4 |
| Czechia | ~~all 14 regions~~ | Done in batch 4 |
| Estonia | ~~11 of 15 counties~~ | Done in batch 4 |
| Slovakia | ~~Bratislava, Banská Bystrica~~ | Done in batch 5 |
| Switzerland | ~~Aargau, Appenzell Innerrhoden~~ | Done in batch 5 |
| South Korea | ~~Seoul, Busan~~ | Done in batch 3 |
| Liechtenstein | ~~Balzers, Eschen, Gamprin~~ | Done in batch 5 |
| Netherlands | ~~Limburg~~ | Done in batch 5 |
| Saint Helena, Ascension and Tristan da Cunha | ~~Ascension, Tristan da Cunha~~ | Bundled in batch 5, though no screen opens this territory's parts yet; Saint Helena stays blank |
| Comoros | ~~Anjouan, Mohéli, Grande Comore~~ | Done in batch 5 |
| Russia | ~~Moscow, Moscow Oblast, Oryol~~ | Done in batch 5 |
| Norway | the 7 counties re-established in 2024 | Østfold, Akershus, Buskerud, Vestfold, Telemark, Troms, Finnmark |
| Malta | 10 local councils | |
| Guatemala | 22 departments | |
| North Macedonia | ~80 municipalities | |
| Italy | Aosta Valley (the region *is* the province), South Tyrol, ~12 provinces | Only where a real *bandiera* exists |
| Moldova | Gagauzia, Chișinău, Bălți, raions | Needs per-raion verification |

Each needs a sourced explainer or a documented omission (CLAUDE.md).

### Explainers
The 35 curated-override flags listed in §5.

### Judgement areas to settle
- **French departments.** No department has an official flag. The app shows a mix of council logo
  flags and heraldic flags, some of them Commons proposals (`Proposed flag of Doubs.svg`, FR-65 is
  `{{fictitious flag}}`). This needs a policy decision before any change.
- **Mexican states.** Most use the arms on white de facto; only a few are official. Colima's Commons
  file is `{{fictitious flag}}`. Consider an "unofficial" label rather than removal.
- **Paraguay.** PY-12 Ñeembucú and PY-16 Alto Paraguay have two different designs across sources
  (ours vs es.wikipedia), and FOTW has no image. PY-1 Concepción lacks the arms that FOTW's flag
  carries.
- **El Salvador and Honduras** departments whose flag equals the capital's (FOTW says Comayagua's
  department uses its capital's flag). Review them against the Nicaragua and Portugal rule.
- **GE-AB Abkhazia** shows the Republic of Abkhazia flag labelled unofficial, as CLAUDE.md
  specifies. Georgia's own Autonomous Republic of Abkhazia flag (Georgian cross canton) exists and
  could be mentioned in the note.

### Structural data found in passing (not flag images)
- ~~**Iran**: IR-14/22/23 carry shifted ISO codes, so "Hormozgan" is keyed as Tehran.~~ Fixed in
  batch 7a: every province was affected, and the map now carries the current codes.
- ~~**Guyana**: GY-ES is mis-coded.~~ Eight of the ten regions were; fixed in batch 7b.
- **Latvia**: divisions are pre-2021 municipalities, and many old codes are named "Valmiera".
- **Vietnam**: provinces were merged in June 2025.
- **Indonesia**: six provinces created in 2022 are missing.
- **Norway**: counties changed in 2024.
- **Nepal**: the zones were dissolved in 2015.
- **Kenya**: pre-2013 provinces.
- **Luxembourg**: districts were abolished in 2015.
- **Ethiopia**: SNNPR split in 2023.
- **Sardinia**: provinces restructured in 2016–2025.
- **Bosnia**: the ten cantons could carry their ISO codes BA-01…BA-10.
- **Deep links**: `?sub=` uppercases its value, so name-keyed divisions such as Posavina cannot be
  deep-linked.

### Capital-city flags
Batch 1 fixed only the knock-on effects above. A systematic comparison of `capitalFlags.ts` with
each capital's own Wikidata `P41` is a separate batch. Malaysia (batch 2) showed what to look for:
a capital given its **district's** flag (Kuala Terengganu) or a **traditional chiefdom's** flag
(Seremban). Commons file pages that say "district" are the first thing to sweep for.
