# Sub-national and capital-city flag audit — handbook

This is the entry point for anyone joining the sub-national flag audit, human or agent. It says what
the audit is for, how the work is done, which tools exist, what has shipped, and which work is open
to claim. It does not repeat the evidence. Every decision, with its sources, is in the ledger.

| File | What it holds |
|---|---|
| **This handbook** | Goals, method, tools, status and the open work queue |
| [`SUBNATIONAL_FLAG_AUDIT_2026-09.md`](SUBNATIONAL_FLAG_AUDIT_2026-09.md) | The ledger: every change and judgement, batch by batch, with its evidence |
| [`LEARN_CLAIM_VERIFICATION_2026-09-20.md`](LEARN_CLAIM_VERIFICATION_2026-09-20.md), section "Shared agent coordination and progress log" | The log every agent working on this repository shares. Claims and milestones go there too |
| `CLAUDE.md` | The hard rules. The sections listed under "Rules" below govern this audit |

*Last updated 29 September 2026, by the Claude Code session on branch
`claude/subnational-flags-audit-pc1zvz`.*

---

## 1. Goals

The audit is done when all six hold for every country.

1. **The right entity's flag.** Each subdivision card shows that subdivision's own flag. It must
   not show its capital city's flag, a coat of arms, seal or logo, a Commons fantasy, or the flag of
   a same-named place in another country.
2. **The right capital-city flag.** "View capital" shows the city's own municipal flag. It must not
   show the national flag, a district's, a chiefdom's or a province's flag, a design recorded as
   superseded, or a drawing no source documents.
3. **Complete where a real flag exists.** A subdivision with a documented flag shows it. Every
   bundled flag has a sourced "What this flag means" explainer, or its absence is logged after the
   FOTW check.
4. **Consistent entity data.** Code, name, type, capital, population and flag describe the same
   place. ISO code changes and swapped codes break all of them at once.
5. **A fair quiz.** Every Sub-national flags question has one right answer, or the game accepts
   every answer that flies the identical flag.
6. **Shipped.** Each batch is merged, confirmed live with `scripts/check-live-build.mjs`, and
   recorded in the ledger.

**Scope.** In: subdivision flags (`public/flags/sub/**`, `LOCAL_FLAG_OVERRIDES`); capital-city flags
(`public/capital-flags/**`); their explainers (`src/data/flagMeanings.ts`,
`src/data/cityFlagMeanings.ts`); the data behind them (`src/lib/subdivisionMeta.ts`,
`src/data/capitalDetails.ts`, `src/data/subdivisionCapitals.ts`); the Sub-national flags quiz.
Out: national flags and the National symbols tab, historical eras, map geometry, and the media,
bank, party and index datasets. Other agents cover those in the shared log.

## 2. Rules

Read these `CLAUDE.md` sections before changing anything. They are hard rules, and each exists
because the bug it describes shipped:

- "A subdivision's flag must be ITS OWN flag"
- "Never trust a bulk-imported subdivision flag"
- "Capital-city flags: never blindly trust P41"
- "A capital-city flag must never duplicate its own subdivision's flag"
- "A newly added or newly surfaced entity must be COMPLETE"
- "Every newly bundled flag MUST get a flag-meaning search"
- "Capital-city flag-meaning explainer — exhaust every language"
- "Flag-meaning explanations must be sourced"
- "All flag files must be bundled"
- "Flag aspect ratios", and "Mandatory visual verification"
- "PR workflow", including the live check

In short: never invent a flag, a date, a capital or a meaning. A missing flag is better than a wrong
one. Read the file page before trusting a file. Record every decision where the next person will
find it.

## 3. Method — one country at a time

### Step 1: list what the app shows
For the country, list the division codes and names (`SUBDIVISION_META`), each division's flag file,
each capital (`capitalDetails.ts`) and each capital flag (`capitalFlags.ts`). Then run
`node scripts/flag-audit/wikidata-subdivision.mjs <codes…>`. It prints the app's view next to
Wikidata's item for the same ISO code. When the two names disagree, investigate that first. The
problem is usually a code, not a flag.

### Step 2: gather references, in this order
1. **FOTW** (crwflags.com). Open the country's index (`it.html`, `it-reg.html`, `it-muni.html`,
   `co-.html` and so on) and follow its links. Never guess a filename. FOTW is often the only source
   that says a flag does not exist ("There is no known flag for…"). It also records variants and old
   errors, such as Lons-le-Saunier's colours being reported swapped in 2004.
2. **The local-language Wikipedia article**, read in full, not the summary. The flag is often
   described in a section below the lead: *Bandiera/Simboli*, *Bandera*, *Vlajka*, *Flaga*,
   *Flagge*, *Blason*. Use `scripts/flag-audit/wiki-raw.sh`.
3. **The official site** (region, province, comune or alcaldía). It outranks both of the above when
   it is current. Zamora's municipality settled its white-over-green flag against FOTW's 2001
   white-over-black.
4. **The Wikimedia Commons file page** (`scripts/flag-audit/commons-file.sh`). Read the description
   before trusting the image.

### Step 3: compare by eye
Put the bundled image next to each reference with `scripts/flag-audit/montage.mjs`, then look at
it. Filenames, hashes and pixel scores find candidates, but none of them decides.

### Step 4: decide, then change every file the decision touches

| Decision | Files to change |
|---|---|
| **Replace a division flag** | New file in `public/flags/sub/CC/CODE.ext`; entry in `public/flags/sources.json` (sorted, indent 2); `FLAG_CODES`/`NON_SVG_EXT` in `src/lib/subdivisionFlagIndex.ts` (keep sorted); `node scripts/build-flag-aspect-ratios.mjs`; explainer or logged omission |
| **Suppress a division flag** | Delete the file; remove it from the index and from `sources.json`; add the code, with a comment, to `SUPPRESSED_SUBDIVISION_FLAGS` in `src/api/subdivisions.ts`; remove its explainer from `flagMeanings.ts` (the panel shows an explainer even with no flag); regenerate aspect ratios |
| **Reject a capital flag** | Add `{file, reason}` to `scripts/data/capital-flag-rejected.json`; delete the code from `scripts/data/capital-flag-sources.json` and `src/data/capitalFlags.ts`; `git rm public/capital-flags/code.*`; remove the `cityFlagMeanings.ts` entry and any `capital-meaning-omitted.txt` line |
| **Wrong capital** (Wikidata P36) | `scripts/data/wikidata-capital-rejected.json`, or pin the right city in `CAPITAL_CITY_QIDS` (`scripts/build-capital-details.mjs`); mirror the change in the generated files |
| **Map capital spelled differently from its Wikidata item** (the panel hides the population and flag) | A row in `SUBNATIONAL_NAME_ALIAS` (`scripts/build-cities.mjs`), keyed `CODE|NE name` and citing the capital's QID; then `node scripts/build-cities.mjs`. For the same city only; a different city goes in `SUBNATIONAL_OVERRIDE` with a reason |
| **Map capital is a different city** (Natural Earth tags the wrong one) | If Natural Earth has the right city, add it to `SUBNATIONAL_OVERRIDE`. If not, add the code to `NE_CAPITAL_BLOCK`, so the Wikidata fallback supplies it. Either way cite the QID, then `node scripts/build-cities.mjs` and the fallback generator into scratch |
| **Map capital missing** (Natural Earth tags none) | `node scripts/build-subdivision-capitals.mjs` into a scratch copy; take only the target country's lines into `src/data/subdivisionCapitals.ts` |
| **Map polygon carries another region's code** | Confirm with `geo-code-scan.mjs` (centre and capital point to the same other polygon) and the ISO table. Move the properties in `public/subdivisions/CC.json` with a string-level edit so the geometry stays byte-identical, and check that it does. Then run `build-subdivision-meta.mjs`, `build-cities.mjs` and `build-national-capital-locations.mjs`; run the capital, capital-detail and native-name generators into scratch and take only that country's lines |
| **Wrong name, type or code** | Override tables in `scripts/build-subdivision-meta.mjs`, then `node scripts/build-subdivision-meta.mjs`; a wrong code is fixed in `public/subdivisions/CC.json` |
| **Two quiz answers, one flag** | A sourced group in `src/data/identicalSubdivisionFlags.ts` (an answer key is a division code or `capital:` plus the division's code); pairs checked and found different go in `REVIEWED_DISTINCT` in `scripts/check-identical-subdivision-flags.mjs` |

`capitalDetails.ts`, `capitalFlags.ts` and `subdivisionCapitals.ts` are generated, but they are
hand-updated to match their generator's tables until the next networked regeneration. Always
change the generator's table as well, so a regeneration cannot undo the fix.

### Step 5: explainers
Each newly shown flag gets a search for its meaning in the same change: FOTW, the local Wikipedia,
the official site. Write it only from what the source says. If nothing can be found, log the
omission with the FOTW page you checked. Run `npm run subdiv:audit-omissions` and
`npm run capitals:audit-omissions`.

### Step 6: verify, then ship
1. Run `npm run flags:check`, `npx tsc -b` and `npm run build`.
2. Run `npx vite preview --port 4173` (after the build), then
   `node scripts/flag-audit/learn-check.mjs <codes…>`. Open the screenshots. The script also
   reports whether each image actually painted, whether any flag came from a remote host, and any
   page errors.
3. For quiz changes, play `/game?mode=subnational&country=CC`.
4. Update the ledger (a new batch section), this handbook's status and queue, and the shared log.
5. Open a PR, squash-merge it, and run `node scripts/check-live-build.mjs <sha>`.

### Patterns found so far
The same bug usually occurs in several countries, so check for each of these:
- **A capital city's flag used for the province**: Italy, Spain, all of Nicaragua, Cuba.
- **Arms, seal, logo or plain text used as a flag**: Romania, South Africa, Nigeria.
- **Commons fantasy flags**: Zambia's ten provinces, five Somali and four Ghanaian regions. Commons
  tags (`{{fictitious flag}}`, `{{proposed flag}}`) or an "own work" upload with no source give
  these away.
- **A plain field that is missing its arms**: the Terni and Udine province flags.
- **A plain colour field no source documents**: Rimini, Teramo, Oristano.
- **A superseded flag**: Damascus, where the Commons file itself is named "until 2024".
- **Wikidata errors**: P36 with two values (North Sulawesi); P36 naming the wrong place
  (Schellenberg → Vaduz); a city's P41 pointing at the national flag (Porto).
- **A map polygon carrying another region's code** (so it shows that region's flag, population,
  capital and native name). Three forms: old ISO numbering (Iran before 2018 and Uganda before
  2010, fixed in 7a and 7b); codes swapped or offset between neighbours (Paktia/Paktika,
  Sala/Salacgrīva, fixed in 7b); and names and codes attached to the wrong outlines (Ecuador's
  Napo/Tungurahua, a four-way rotation in Eritrea, eight of Guyana's ten regions, fixed in 7b).
  Also Posavina carrying Republika Srpska's code (batch 1). Still open: Morocco (2015 regions).
  `scripts/flag-audit/geo-code-scan.mjs` finds these.
- **A district's or chiefdom's flag given to a city**: Kuala Terengganu, Seremban.
- **The flag of the tier above given to the capital**: Egyptian governorate flags in capital
  slots, Guatemalan department flags, Irish county GAA colours for county towns (Tipperary, Cork,
  Limerick, Longford, Waterford), Pasco Province for Cerro de Pasco. The Commons filename usually
  says so ("Governadorat de …", "… Department", "Colours of …").
- **A historical flag of the city**: the 1941 flags of Bistrița, Baia Mare, Zalău, Satu Mare and
  Sombor (Hungarian-era, filed on Commons with the year); Santa Isabel's colonial flag for Malabo.
- **A capital slot holding the old seat's flag after the capital moved or was re-pinned**:
  Trogen's flag for Herisau, Sievierodonetsk's for Luhansk. A manifest filename can also disagree
  with the file on disk: Donetsk's slot held Donetsk's flag while naming Kramatorsk's.
- **A logo or a photograph as a capital flag**: Abuja's logo on white (the documented flag is
  green), San Carlos's town-hall logo, a photograph of flags on a building for Luxembourg City.
- **Same design, different places**: Italian civic colours, Warsaw and Łódź, Munich and
  Baden-Württemberg. **One city in two roles**: Kyiv, the Hungarian county seats.

### Pixel metrics (`check-identical-subdivision-flags.mjs`)
- Every flag is reduced to 48×32 pixels; a pixel counts as different when a colour channel moves by
  more than the channel step.
- **Discovery** uses step 48 and flags pairs under 3%. True twins score 0.0%; the closest distinct
  pair scores 0.1% (the Estonian roofs); the first unreviewed pair scores 4.4%.
- **Group consistency** uses step 96 and fails a declared group at 10%. That step ignores shade:
  Genoa against Padua scores 5.5%, and Kecskemét's two files, one with a border, score 8.7%.
  It also mistakes green for blue (Córdoba and Tunja), so look before grouping.
- **Report modes**, which print and never gate: `--scan [--max=0.012 --channel=96]` and
  `--same-city`. The second finds one city in two roles, including pairs the pixel scan misses.

## 4. Tools

| Command | Use |
|---|---|
| `npm run flags:check` | Runs every gate. It must pass before a push |
| `node scripts/check-identical-subdivision-flags.mjs [--scan \| --same-city]` | Quiz twins: the gate and the two report modes |
| `node scripts/subdiv-remaining.mjs [CC]` / `node scripts/capital-meaning-remaining.mjs [CC]` | Explainer coverage still missing |
| `npm run subdiv:audit-omissions` / `npm run capitals:audit-omissions` | Omissions whose reasons cite too little, or cite a dead FOTW URL |
| `node scripts/build-flag-aspect-ratios.mjs` | Regenerates the flag-ratio table after a flag changes |
| `node scripts/check-live-build.mjs [sha]` (`npm run live:check`) | Confirms users can see a merge. A network failure is *inconclusive*, never a pass |
| `scripts/flag-audit/wikidata-subdivision.mjs CODE…` | The entity check: app name, capital and files beside Wikidata's item for the ISO code |
| `scripts/flag-audit/fotw-page.sh page.html` | Prints a cached FOTW page as text with its links |
| `scripts/flag-audit/wiki-raw.sh lang "Title"` | Cached raw wikitext; follows redirects |
| `scripts/flag-audit/commons-file.sh "File.svg" [dir]` | Shows a Commons file page, then downloads the file, retrying on 429 and refusing HTML |
| `scripts/flag-audit/montage.mjs list.json prefix` | Side-by-side contact sheets |
| `scripts/flag-audit/learn-check.mjs CODE…` | In-app check: panels, painted images, explainers, capital card, screenshots |
| `node scripts/check-capital-name-agreement.mjs [--all]` | The gate: every quiz capital must be the capital the Learn panel shows. `--all` also lists capital cards whose Wikidata capital differs (SF-03) |
| `scripts/flag-audit/geo-code-scan.mjs [CC…]` | Finds map polygons carrying another region's code: each region's Wikidata centre and capital should fall inside its own polygon. Swaps and cycles where both agree are the signal; one-way hits are usually enclaves or border towns |

**Network notes.** Wikimedia's `api.php` and upload.wikimedia.org answer 429 after bursts. In that
case, read wikitext and file pages through `index.php?action=raw`, download through
`Special:FilePath` with pauses (the helpers do both), and query `query.wikidata.org/sparql` for
Wikidata. When upload.wikimedia.org keeps answering 429 for hours (it did on 30 September),
`commons.wikimedia.org/w/thumb.php?f=File.svg&w=1000` still returns Commons' own PNG render from
the app servers; it is the same route the capital-flag downloader uses for oversized files. Always
send a user-agent. Some official sites refuse automated reads. A news report that
quotes the site is an acceptable citation, and the ledger should say which you used. Cloud sessions
provide Chromium at `/opt/pw-browsers/chromium`.

## 5. Status — 30 September 2026

| Batch | PR / merge | What shipped |
|---|---|---|
| 1 | #1703 `2d5745a` | 91 flags that belonged to another entity suppressed, 10 replaced with the real flag, about 350 CDN flags bundled, mis-coded divisions fixed (Posavina, Moscow city and oblast) |
| 2 Malaysia | #1704 `1466a98` | Seremban's and Kuala Terengganu's capital flags (a chiefdom's and a district's flag were rejected), Labuan and Putrajaya explainers |
| 3 South Korea | #1705 `7c0c061` | Seoul and Busan flags, type labels, seat-district capitals, capital populations |
| 4 Czechia, Poland, Estonia | #1706 `ab8cea4` | Czech, Polish and Estonian region flags shown under the app's codes, with sourced explainers |
| 5 | #1707 `9e8449e` | Slovak, Swiss, Liechtenstein, Limburg, Comoros, Saint Helena and Russian gaps; the quiz accepts identical division flags; new identical-flag gate |
| 6a | #1708 `e3c1a35` | North Sulawesi's capital is Manado; Schellenberg's is not Vaduz; the Wikidata-capital rejection list and its check |
| 6b | #1717 `6d8406e` | The quiz accepts identical capital flags (47 sourced groups); 11 capital flags and 3 Italian province flags that no source supports removed; Minsk Region, Sofia Province and Genoa named correctly; Grenoble's explainer rewritten |
| 7a | #1720 `141cf7f` | Iran re-keyed to the current ISO codes: all 31 provinces had shown another province's population, capital and native name. Alborz gained its capital (Karaj); three capital spellings aligned so their populations show |
| 7b | #1727 `8311a07` | Map polygons carrying another region's code: Ecuador (2), Eritrea (4), Guyana (8), Afghanistan (2), Latvia (2), Uganda (33, plus Kiruhura, which was drawn as a second Mbarara). Uganda's 23 "County" labels corrected to District, and Kampala to City |
| 7c | #1728 `67773b5` | 64 quiz capitals now agree with the map: 43 spelling or renamed-city aliases, 13 overrides, 10 blocked wrong Natural Earth capitals, Laguna pinned to Santa Cruz; a capital marker can belong to several territories |
| 7d | #PRNUM | The last 12 quiz capitals fixed on the Wikidata side (Denpasar, Kendari, Palangka Raya, Herisau, Ponta Delgada, Pesaro, Cesena, Olbia, Sanluri, Nenagh, Luhansk, Donetsk; Tokyo's seat ward is not a capital); 8 wrong-entity capital flags removed (five 1941 Hungarian-era flags, Santa Isabel's colonial flag, Banjarmasin's flag on Central Kalimantan, Tipperary's GAA colours); new gate `check-capital-name-agreement.mjs` (81 → 0) |

The independent auditor in the shared log screened every image added through `e3c1a35`: 76
subdivision flags and 2 capital flags. Its findings F84–F86 (Estonian explainers and SVG metadata)
were fixed by the implementing agent in `f0c9407`.

The ledger's Batch 6b section gives the evidence for each change, including the Italian city and
province flags that turned out to be undocumented and Damascus's superseded flag.

**Coverage at this checkpoint:**
- About 2,100 subdivision flag files and 1,350 capital flags are bundled.
- Capital explainers are complete: every capital flag has a sourced explainer (about 1,000) or a
  logged omission.
- Subdivision explainers: `subdiv-remaining.mjs` reports 35 flags with neither an explainer nor an
  omission, all of them territories or disputed areas (see SF-08).

## 6. Open work — claim one item per PR

Claim an item before starting, as described in section 7. **Owner** is empty when an item is free.
The ledger's "Follow-ups" section has the detail behind each item.

| ID | Work | Why it matters / first step | Main files | Owner |
|---|---|---|---|---|
| SF-02 | ~~Reconcile the 81 quiz capitals whose name disagrees with the Learn panel, then make the quiz apply the same agreement check~~ **Done in 7a–7d** | 81 → 77 (7a) → 76 (7b) → 12 (7c) → 0 (7d). Each was fixed at its source; the ledger's batch 7 sections list every case. `scripts/check-capital-name-agreement.mjs` now fails the build on any disagreement | `scripts/build-cities.mjs`, `scripts/build-capital-details.mjs`, `scripts/check-capital-name-agreement.mjs` | Claude Code, batch 7 (done) |
| SF-03 | Reconcile capital names (255 mismatches) | About 127 are spellings (Gent/Ghent), which need an alias table; about 128 are different cities. Fix at the source: Morocco's 2015 regions, the Greek, Afghan and Ethiopian swaps, A Coruña, Zangilan (Latvia LV-085/086, Eritrea and Paktia/Paktika were map mis-codings, fixed in 7b); check whether RO-IF's seat is Buftea | `public/subdivisions/*.json`, `scripts/build-capital-details.mjs`, `src/lib/cityRoles.ts` | |
| SF-04 | Italian capital flags, about 80 still unchecked | Check each against FOTW (via `it-muni.html`), it.wikipedia and the comune's statute; reject undocumented plain bicolours as in 6b | capital-flag files (section 3, step 4) | |
| SF-05 | Italian province flags | Look for other plain fields missing their arms (the Terni/Udine pattern) and logo flags (IT-RN, IT-SR); fill real *bandiere* still missing (Aosta Valley, South Tyrol and about 12 more) | division-flag files | |
| SF-06 | Gaps: real flags the app shows blank | Norway's 7 counties re-established in 2024, Malta's 10 local councils, Guatemala's 22 departments, about 80 North Macedonian municipalities, Moldova (Gagauzia, Chișinău, Bălți, raions) | division-flag files, explainers | |
| SF-07 | Systematic capital-flag comparison | Compare each capital flag with the capital's own P41, country by country, looking for the district, chiefdom, province and national-flag patterns. Malaysia, Morocco and Italy's twins are done. **Batch 7f (claimed, Claude Code):** a filename scan found capital slots holding the flag of the province, department, governorate or county above the city (Egypt 4, Guatemala 4, Ireland 4, Pasco), plus Savoy's flag for Timișoara, Beaugency's for Gap, a photograph for Luxembourg, and two logos (Abuja, San Carlos); see the ledger's batch 7d section | capital-flag files | |
| SF-08 | Territories and disputed areas without explainers (35) | GB overseas territories and Crown dependencies, French overseas departments, AU and NZ territories, CN-TW, CN-XZ, the `~` disputed codes, MX-DIF, TW-TPQ, HU-ED. First check whether the panel already shows the national-level entry. If it does, teach `subdiv-remaining.mjs` that; if not, add sourced entries | `src/data/flagMeanings.ts`, `scripts/subdiv-remaining.mjs` | |
| SF-09 | Explainers for the 35 curated-override flags | Ledger §5 lists them | `src/data/flagMeanings.ts` | |
| SF-10 | City-territory capital cards | Prague, Seoul and Busan show "No further sourced data" because the override can only fill an existing record. Refresh Korea from the 2025 census | `scripts/build-capital-details.mjs` | |
| SF-11 | Syria | Watch for a documented post-2024 Damascus flag; consider making SY-DI a city-territory so its card works like Kyiv's | `src/data/cityTerritories.ts` | |
| SF-12 | Names | PE-CUS, IT-BZ, PH-SUN, MX-DIF | `scripts/build-subdivision-meta.mjs` | |
| SF-13 | Turn `--same-city` into a gate | Keep a reviewed list of different cities that share a name (San Fernando), so a future county-seat capital flag cannot bring back an unaccepted twin | `scripts/check-identical-subdivision-flags.mjs` | |
| SF-14 | **Needs the owner** — out-of-date subdivision structures | Vietnam (2025 merger), Indonesia (6 provinces created in 2022), Latvia (2021), Nepal zones (dissolved 2015), Kenya provinces (replaced 2013), Luxembourg districts (abolished 2015), Ethiopia (SNNPR split 2023), Norway (2024), Sardinia, Bosnia's canton codes, Uganda (the map has 112 of 135 districts: the 23 created 2010–2020 are missing), Kazakhstan (Abai, Jetisu and Ulytau, created 2022). These need new geometry, not flag edits | `public/subdivisions/*.json` | |
| SF-15 | **Needs the owner** — judgement calls | French departments (no official flags; the app mixes logos, heraldic flags and proposals); Mexican states (arms on white, used de facto); Paraguay PY-1, PY-12, PY-16; El Salvador and Honduras departments that fly their capital's flag; GE-AB note | ledger "Judgement areas" | |
| SF-16 | Saint Helena, Ascension and Tristan da Cunha | Their flags are bundled, but the sub-national view only opens for UN members, so no screen reaches them | Learn navigation | |

## 7. Working in parallel

1. **Start from the current state.** Run `git fetch origin main`. Read this queue, the ledger's last
   batch and the shared log. Search open PRs and branches for the SF-ID you want.
2. **Claim the item.** Put your agent or branch name in its **Owner** cell, and add a row to the
   shared log with status **claimed** and the files you will touch. Commit both before the work
   (a one-line change) or as the first commit of your PR. Take one item per PR and start the PR
   title with its ID, for example `[SF-06] Norway: the 2024 county flags`. If an item is too big,
   split it into lettered parts (SF-06a Norway, SF-06b Malta) and claim only yours.
3. **Handle the files that often conflict:**
   - `scripts/data/capital-flag-sources.json` is one line of compact JSON, so any two edits
     conflict. Take main's version, then re-apply your own additions and deletions with a script:
     load the JSON, change it, and write it back with `json.dumps(…, ensure_ascii=False,
     separators=(",", ":"))`, keeping the key order.
   - `src/lib/subdivisionMeta.ts` is generated. Merge the generator's override tables, then re-run
     `node scripts/build-subdivision-meta.mjs`.
   - `src/lib/subdivisionFlagIndex.ts` (union the lists, keep them sorted), `public/flags/sources.json`
     (sorted keys, indent 2) and `src/data/flagOverlayAspectRatios.ts` (regenerate it).
   - `flagMeanings.ts` and `cityFlagMeanings.ts`: edit only your own codes' blocks, and never
     reformat the file.
   - The ledger: add your own batch section at the end, and don't reflow anyone else's.
4. **Keep two milestones apart.** Record "implemented", then "live", with the commit or PR and the
   `live:check` result, both in the shared log and in your ledger section. Only another agent can
   record "independently verified".
5. **Finish the item.** Clear it from the queue in your PR, or mark it done with the PR number, and
   update section 5.
