# Political-party dataset — rolling audit & refresh (2026)

**Standing mandate, given by the repository owner on 2026-09-11:**

> Audit **and fix** the Learn-mode political-party data for **all 195 countries**, one country at a
> time, in the priority order below. **Finish a country, then ship it to production before starting
> the next one.** Do not stop to ask whether to continue. The job is done only when all 195
> countries have been audited. Keep this document updated as you go so nothing is lost.

This file is the **living record**: the queue, the per-country verdicts, and every finding with its
fix. It is written incrementally — a country is added the moment its work merges, never batched.
The method, the freshness contract and the severity model live in
[`POLITICAL_PARTY_AUDIT_PROMPT.md`](./POLITICAL_PARTY_AUDIT_PROMPT.md); this file is the ledger.

**Working rule for each country:** verify → fix `src/data/politicalParties.ts` → `npm run
flags:check` → visual check in the running app → update this file → commit → PR → squash-merge →
`npm run live:check` → next country.

## Current owner direction — Asian countries outside Southeast Asia

**2026-09-12 — priority update from the repository owner.** Southeast Asia is complete. Continue the standing audit with **Asian countries outside Southeast Asia** before resuming the remaining Europe and then the rest-of-world queue. Begin with **Afghanistan (`AF`)**, the first untreated Asian country in the existing queue, then work through the remaining untreated Asian countries one at a time. This supplements the original regional sequence; every other standing rule remains unchanged: evidence first, one country per PR, update this ledger in the same commit, merge, and confirm the production build is live before starting the next country.


---

## Baseline as measured on 2026-09-11 (commit `c631c65`, then live)

90 of 195 countries covered · 389 parties · 11 coalitions. Whole-dataset defects found in the
survey, each to be closed as its country comes up in the queue:

| # | Defect | Scale |
|---|---|---|
| B1 | Seat sums exceed the chamber total (arithmetically impossible) | `DK` 197/179, `FI` 215/200, `NO` 191/169, `ID` 609/575, `SG` 98/97, `GY` 72/65 |
| B2 | Two different `seatsTotal` values inside one country | `ID` (575 and 580) |
| B3 | Parties recorded with 0 seats, contradicting the file's own scope rule | 19 parties; `AM` and `BD` have no seated party at all |
| B4 | Chamber coverage under 60% | 22 countries, incl. single-party entries for `DE`, `FR`, `GB`, `ES`, `CA`, `PL`, `UY` |
| B5 | No logo | 69 parties, against a 23-entry grandfather allowlist |
| B6 | `inPower` true but no `inExecutive` party | 59 of 90 countries |
| B6a | **Exec-power badge must be the HoG party only** (owner, 2026-09-19) | `headOfGovernment`; cabinet partners stay on `inExecutive` / Leg power |
| B6b | **Leg power is a chamber majority, not the coalition flag** (owner, 2026-09-19) | `PARTY_LEGISLATURES` + `chambers[]`; US/AU/BR seeded |
| B7 | Single-source concentration | 664 of ~750 citations are English Wikipedia |
| B8 | **No date field in the schema** — staleness is undetectable by construction | whole dataset |

**B8 is the structural root cause** and is deliberately being deferred until enough countries are
refreshed to know what shape the field should take (per-party `asOf`, or per-country). It is not
forgotten; it is tracked here.

---

## Progress

**Countries audited: 77 / 195; plus a cross-country rule change and logo backfill (2026-09-12) — Southeast Asia, South America and Phase 4 (UK / US / Canada) complete; Europe part-done. Per the owner's 2026-09-12 priority update, the sweep now continues with Asian countries outside Southeast Asia before the remaining Europe queue.**

**2026-09-19 — Exec-power badge = head of government.** Owner direction: cabinet coalitions are irrelevant to "Exec power"; the badge is the party that supplies the HoG (president where that office is HoG; prime minister otherwise), never the head of state merely for being HoS. Field: `headOfGovernment` (at most one per country). Sourced HoG parties set in the same change: BR-PT (Lula), CL-REP (Kast, aligned with the Republican Party he founded), ID-GERINDRA (Prabowo), FR-RE (PM Lecornu / Renaissance), TL-CNRT (PM Gusmão), plus the presidential systems that already had a single `inExecutive` party (AR, KR, PH, US, TR, PE, UY, EC, PY, SR, VE).

**2026-09-19 — Leg power is per-chamber majority, with a coalition fallback.** Owner follow-up: bicameral bodies (BR, AU, US) can have different parties in each house. Where a party holds more than half a chamber, the badge is House/Senate. Where none does (Brazil), `inPower` still yields **Leg power** so the governing coalition is not invisible. US Republicans House 218/435 + Senate 53/100; Australia Labor In-power (House) with a hung Senate; Brazil Workers' Exec+Leg and other government parties Leg. A second owner follow-up the same day: card titles are the official **local** name, with `nameEn` in parentheses.

| Country | Merged | Parties before → after | Chamber coverage | Verdict before |
|---|---|---|---|---|
| 🇦🇺 Australia | `#1313` | 3 → 9 | 142 / 150 | **STALE — S1** |
| 🇲🇾 Malaysia | `#1314` | 22 → 22 | 212 / 222 | **CURRENT on seats — S2/S3 elsewhere** |
| 🇧🇷 Brazil | `#1315` | 12 → 22 | **513 / 513** | **WRONG — S1, worst so far** |
| 🇲🇲 Myanmar | `#1317` | not covered (decision recorded) | — | **OUT OF SCOPE, documented** |
| 🇹🇭 Thailand | `#1317` | 20 → 20 | 497 / 500 | **NEARLY CURRENT — S2/S3** |
| 🇻🇳 Vietnam | `#1318` | 1 → 1 | 482 / 500 | **WRONG — S1 (deceased leader)** |
| 🇮🇩 Indonesia | `#1319` | 8 → 8 | **580 / 580** | **WRONG — S1 (wrong company's logo)** |
| 🇵🇭 Philippines | `#1320` | 13 → 16 | 261 / 318 | **STALE — S2/S3** |
| 🇸🇬 Singapore | `#1321` | 2 → 2 | 98 / 108 | **IMPOSSIBLE TOTAL — S1** |
| 🇰🇭 Cambodia | `#1322` | 2 → 2 | 125 / 125 | **WRONG — S1 (unidentified logo, wrong leader)** |
| 🇱🇦 Laos | `#1323` | 1 → 1 | 169 / 175 | **STALE — a whole parliament behind** |
| 🇧🇳 Brunei | `#1324` | **3 → 0 (removed)** | n/a | **FABRICATED REPRESENTATION — S1** |
| 🇹🇱 Timor-Leste | `#1325` | 5 → 5 | 65 / 65 | **WRONG — S1 (an audio file as a logo)** |
| 🇦🇷 Argentina | `#1326` | 19 → 19 | 257 / 257 | **NEARLY CURRENT — one rename missed** |
| 🇨🇱 Chile | `#1327` | 7 → 14 | 151 / 155 | **WRONG — a whole parliament and government** |
| 🇨🇴 Colombia | `#1328` | 5 → 13 | 158 / 183 | **WRONG — the largest party was absent** |
| 🇵🇪 Peru | `#1329` | 6 → 6 | **130 / 130** | **WRONG — a legislature that no longer exists** |
| 🇻🇪 Venezuela | `#1330` | **1 → 20** | 277 / 285 | **WRONG — one party credited with every seat** |
| 🇪🇨 Ecuador | `#1331` | 4 → 6 | 133 / 151 | **WRONG — a fictitious party with 17 seats** |
| 🇧🇴 Bolivia | `#1332` | 3 → 6 | 129 / 130 | **WRONG — two invented parties, no government** |
| 🇵🇾 Paraguay | `#1333` | 3 → 7 | 77 / 80 | **WRONG — a chamber size that never existed** |
| 🇺🇾 Uruguay | `#1334` | 1 → 6 | **99 / 99** | **WRONG — a fabricated logo explainer** |
| 🇬🇾 Guyana | `#1335` | 3 → 3 | 64 / 65 | **IMPOSSIBLE TOTAL — 72 seats in a 65-seat chamber** |
| 🇸🇷 Suriname | `#1336` | 2 → 6 | 50 / 51 | **WRONG — a defunct 1987 coalition marked as governing** |
| 🇬🇧 United Kingdom | `#1337` | **1 → 15** | 637 / 650 | **WRONG — a former prime minister, no opposition at all** |
| 🇺🇸 United States | `#1338` | 2 → 2 | 432 / 435 | **CONTRADICTORY — two simultaneous presidents** |
| 🇨🇦 Canada | `#1339` | 1 → 5 | 338 / 343 | **WRONG — a departed PM, a retired chamber size** |
| 🇩🇪 Germany | `#1340` | 1 → 6 | 627 / 630 | **WRONG — a seat count belonging to no Bundestag** |
| 🇫🇷 France | `#1341` | 1 → 13 | 513 / 577 | **WRONG — a parliamentary group modelled as a party** |
| 🇮🇹 Italy | `#1342` | 6 → 12 | 389 / 400 | **WRONG — a leader who died in 2023** |
| 🇪🇸 Spain | `#1343` | 1 → 14 | 346 / 350 | **WRONG — the opposition marked as governing** |
| 🇵🇱 Poland | `#1344` | 1 → 11 | 433 / 460 | **WRONG — only a junior coalition partner present** |
| 🇳🇱 Netherlands | `#1346` | 5 → 15 | 142 / 150 | **WRONG — a rival party's politician as VVD leader** |
| 🇧🇪 Belgium | `#1347` | 9 → 12 | 149 / 150 | **WRONG — two parties under names they dropped** |
| 🇳🇴 Norway | `#1348` | 9 → 9 | **169 / 169** | **IMPOSSIBLE TOTAL — 191 seats in a 169-seat Storting** |
| 🇸🇪 Sweden | `#1349` | 4 → 11 | **349 / 349** | **WRONG — largest party understated by 39 seats** |
| 🇩🇰 Denmark | `#1350` | 7 → 12 | 171 / 179 | **FABRICATED PARTY — 50 seats for one that does not exist** |
| 🇮🇪 Ireland | `#1351` | 3 → 10 | 159 / 174 | **BROKEN IMAGES — every logo was an HTML error page** |
| 🇵🇹 Portugal | `#1352` | 2 → 10 | **230 / 230** | **WRONG — the opposition marked as governing, 62 seats out** |
| 🇱🇺 Luxembourg | `#1354` | 3 → 7 | **60 / 60** | **WRONG — two of three leaders lead a different party** |
| 🇨🇭 Switzerland | `#1355` | 3 → 10 | **200 / 200** | **WRONG — an FDP councillor listed as the Social Democrats' leader** |
| 🇦🇹 Austria | `#1356` | 2 → 5 | 182 / 183 | **WRONG — the election's winner recorded with zero seats** |
| 🇦🇫 Afghanistan | `9f1bd78` | **3 → 0 (removed)** | n/a | **OUT OF SCOPE — party activity is illegal; audited by the owner** |
| 🇨🇿 Czechia | `#1359` | 3 → 13 | 187 / 200 | **WRONG — a party with no seats carried as seated** |
| 🇦🇲 Armenia | `#1360` | 3 → 4 | 94 / 105 | **ALL THREE PARTIES UNSEATED — and the chamber size wrong** |
| 🇦🇿 Azerbaijan | `#1361` | 3 → 11 | 81 / 125 | **WRONG — a party leader who died in 1878** |
| 🇧🇭 Bahrain | `#1362` | **3 → 0 (removed)** | n/a | **OUT OF SCOPE — no parties; all three were dissolved or banned** |
| 🇧🇩 Bangladesh | `#1364` | 1 → 10 | 339 / 350 | **FABRICATED LOGO in the repo — and a whole 2026 parliament missing** |
| 🇧🇹 Bhutan | `#1365` | 3 → 2 | **47 / 47** | **INVERTED — the governing party sat in opposition; two entries held no seats** |
| 🇨🇳 China | `#1366` | 1 → 9 | 2,411 / 2,977 | **The ruling party was given every seat in the chamber; all eight other legal parties were missing** |
| 🇨🇾 Cyprus | `#1368` | 0 → 6 | **56 / 56** | **Absent from the dataset entirely; a general election in May 2026 had replaced three parties with two** |
| 🇬🇪 Georgia | `#1369` | 3 → 4 | 101 / 150 (49 vacant) | **Two of three entries held no seats after 49 opposition mandates were revoked; the three parties that do sit were missing** |
| 🇮🇳 India | `#1370` | 4 → 43 | 536 / 543 | **Thirty-nine seated parties missing; the TMC had lost 20 MPs to a new NDA party and the DMK's count was its alliance's** |
| 🇮🇱 Israel | `#1374` | 3 → 15 | **120 / 120** | **Ten factions missing; the coalition and the government had come apart in 2025 and neither was modelled** |
| 🇮🇶 Iraq | `#1375` | 0 → 41 | 320 / 329 (9 minority-quota) | **Absent entirely; a 329-seat chamber elected in November 2025 with 41 seated lists** |
| 🇮🇷 Iran | `#1376` | 0 → 13 | 31 / 290 (254 independents) | **Absent entirely; three wrong leaders caught, including one dead since 2017** |
| 🇯🇴 Jordan | `#1377` | 0 → 12 | 99 / 138 (39 independents) | **Absent entirely; the Islamic Action Front had been renamed and a branch's emblem was nearly bundled as the party's** |
| 🇯🇵 Japan | `#1378` | 9 → 9 | 460 / 465 (5 unaffiliated) | Best-maintained entry so far; `inExecutive` absent, Ishin's date from the previous cabinet, one seat double-counted |
| 🇰🇿 Kazakhstan | `#1379` | 0 → 5 | **145 / 145** | **Absent entirely; the bicameral parliament was replaced by a unicameral Kurultai on 1 July 2026** |
| 🇰🇷 South Korea | `#1380` | 7 → 7 | 291 / 300 (8 independents, 1 vacant) | Accurate on coverage; `inExecutive` absent though the DP holds the presidency |
| 🇰🇼 Kuwait | `#1381` | — | — | **Out of scope — political parties are illegal and the Assembly has been suspended since May 2024** |
| 🇰🇬 Kyrgyzstan | `#1382` | 0 → 6 | 84 / 90 (3 vacant, 3 other ungrouped) | **Absent entirely; only one party won seats as a party — 84 of 90 went to independents, so the chamber's own factions are the party structure** |
| 🇱🇧 Lebanon | `#1383` | 0 → 25 | 83 / 128 (44 independents, 1 vacancy) | **Absent entirely; the obvious source reports BLOC seats as party seats for all six large parties** |
| 🇲🇻 Maldives | `#1384` | 0 → 5 | 91 / 93 (2 independents) | **Absent entirely; the MDP ships with no leader — its presidency is vacant and the interim chair is under challenge** |
| 🇲🇳 Mongolia | `#1385` | 0 → 5 | 125 / 126 (1 independent) | **Absent entirely; the government has changed twice since the election — the sitting PM took office in March 2026** |
| 🇳🇵 Nepal | `#1386` | 0 → 6 | 274 / 275 (1 independent) | **Absent entirely; the chamber was replaced wholesale in March 2026 and two of its six parties are younger than a year** |
| 🇴🇲 Oman | `#1387` | — | — | **Out of scope — political parties are not permitted and all 90 elected members are non-partisan** |
| 🇵🇰 Pakistan | `#1397` | 2 → 17 | 334 / 336 | **Carried 2 of 17 seated parties, on a `seatsTotal` two elections out of date, with the PPP marked out of power while it sits in the coalition** |
| 🇵🇸 Palestine | `#1399` | 0 → 7 | 128 / 132 (4 independents) | **Absent entirely; the Prime Minister is an independent, not Fatah as the obvious source says** |
| 🇶🇦 Qatar | `#1400` | — | — | **Out of scope — law permits no political bodies, and the 2024 referendum abolished Shura Council elections outright** |
| 🇸🇦 Saudi Arabia | `#1401` | — | — | **Out of scope — the Basic Law bans political parties; the 150-member Consultative Assembly is appointed and wholly non-partisan** |
| 🇱🇰 Sri Lanka | `#1403` | 0 → 12 | 224 / 225 (1 independent) | **Absent entirely; the only file matching the DTNA's acronym is Daimler Truck North America's logo** |
| 🇸🇾 Syria | `#1404` | — | — | **Out of scope for now — the post-Assad Assembly is 205 independents and 5 vacancies; no party holds a seat** |
| 🇹🇯 Tajikistan | `#1405` | 0 → 5 | **63 / 63** | **Absent entirely; reconciles exactly, and its ruling party's leader has been President since 1994** |
| 🇹🇲 Turkmenistan | `#1406` | 0 → 3 | 107 / 125 (18 independents) | **Absent entirely; the chamber's own labelling separates the governing party from the two that merely support it** |
| 🇹🇷 Türkiye | `#1407` | 4 → 15 | 579 / 600 (13 independents, 8 vacant) | **The largest staleness in the sweep: the CHP carried 169 seats where the chamber gives it 45, and a 91-seat Main Opposition party was missing entirely** |
| 🇦🇪 United Arab Emirates | *(see PR)* | **3 → 0** | — | **🚨 Three FABRICATED parties removed — invented names, leaders, seats and a cited source that does not exist. Out of scope: the UAE permits no parties** |

---

## Findings

### 🇦🇺 Australia — audited 2026-09-11

Production was showing the **2022 parliament**, three elections' worth of leadership out of date,
with a seat count that was wrong even for 2022.

Verified against the [48th Parliament of Australia](https://en.wikipedia.org/wiki/48th_Parliament_of_Australia)
(party summary and the full membership-changes table) and
[Members of the Australian House of Representatives, 2025–2028](https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028)
(current party standings, as of 25 June 2026 — the most recent change on record), plus each party's
own article. `aph.gov.au` returns HTTP 403 to automated fetches, so the parliamentary record was
reached through its Wikipedia mirrors rather than directly; noted as a sourcing limit, not a gap.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-001 | **S1** | `AU-LNP.leader` | Peter Dutton | — (entry replaced) | Dutton lost his own seat of Dickson at the 3 May 2025 election and ceased to be Liberal leader |
| PP-002 | **S1** | `AU-GRN.leader` | Adam Bandt | Larissa Waters | Bandt lost Melbourne in 2025; Waters is Greens leader |
| PP-003 | **S1** | `AU-LNP` identity | "Liberal/National Coalition" modelled as a single **party**, founded 1931 | Split into `AU-LIB` (Liberal, 17), `AU-NAT` (Nationals, 8) and `AU-LNP` (Liberal National Party of Queensland, 16), joined by a new `AU-COALITION` record | The Coalition is an alliance, not a party; 1931 is neither the Liberal Party's founding (1944) nor the Coalition's |
| PP-004 | **S1** | `AU-LNP.logoSourceUrl` | `File:Liberal_National_Coalition.svg` | `File:LNP_Regular.svg` | The bundled bytes (sha `1ce1c62a…`) are the **Queensland LNP** logo — verified by rendering it. Production was captioning a real party's logo as a coalition's |
| PP-005 | **S2** | `seats` / `seatsTotal` | ALP 67, LNP 58, GRN 4 of **151** | 94 / 17 / 16 / 8 / 2 / 2 / 1 / 1 / 1 of **150** | The House was reduced to 150 seats at the 2025 election. ALP 67 was wrong even for the 2022 parliament (77) |
| PP-006 | **S3** | coverage | 3 parties, 129 seats | 9 parties, 142 seats | The 8 remaining seats are independents, correctly not modelled as a party |
| PP-007 | **S3** | missing parties | — | One Nation (2), Community Strong Australia (2), Centre Alliance (1), KAP (1) added | Six bundled logos were sitting unused in `public/party-logos/au/` while the data referenced only three |
| PP-008 | **S3** | `inExecutive` | absent | `AU-ALP: true` | Second Albanese ministry, formed 13 May 2025 |
| PP-009 | **S6** | `founded`, `ideology`, `positionRaw` | ALP ideology included "Progressivism"; Greens "Social democracy"; positions loosely worded | Re-copied verbatim from each party's current infobox | e.g. Greens are "Left-wing", not "Left" |

**Judgement calls, recorded so they can be challenged.**

1. **Liberal 17 / LNP 16 / Nationals 8**, not the party-room figures the parties' own infoboxes
   give (Liberal 27, Nationals 14). The infobox numbers distribute the 16 Queensland LNP MPs into
   the two federal party rooms, so using them would double-count the LNP and push the country's
   seat sum over 150 — exactly defect B1. The disaggregated standings are cited on each entry.
2. **KAP carries `ideologyPosition: "right"` with no `positionRaw`.** English Wikipedia leaves
   KAP's position field deliberately blank by talk-page consensus, so there is no raw string to
   quote; the bucket is cited to The Conversation's survey of Australia's minor right-wing parties
   rather than assigned by us.
3. **Centre Alliance and Community Strong Australia carry no `leader`.** Neither designates one —
   Centre Alliance's sole MP calls herself "a party of one". An absent leader is the honest record.
4. **The Coalition record notes its own discontinuity**: the agreement lapsed on 22 January 2026
   and was re-formed on 8 February 2026. Shown as a coalition of three parties with the note
   attached, rather than flattened into one.

**Visual verification:** the Political parties tab renders all 9 cards grouped by ideology, every
logo painted (`img.complete && naturalWidth > 0` asserted for all nine), ALP badged *In-power*, and
the three Coalition members badged *Liberal–National Coalition*. No console errors.

### 🇲🇾 Malaysia — audited 2026-09-11

The best-kept country in the dataset so far, and the first evidence that the survey's whole-dataset
defects are not uniform: **every one of Malaysia's 22 seat figures already matched the chamber
exactly.** The failures here were relational rather than numeric.

Verified against the [Dewan Rakyat](https://en.wikipedia.org/wiki/Dewan_Rakyat) infobox's political
groups (dated 10 August 2026 — Government 150, Opposition 69, vacant 3, of 222), the
[Anwar Ibrahim cabinet](https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet) member-parties table
(ministers per party after the 17 December 2025 reshuffle), and all 22 parties' own infoboxes.

Reconciliation of the chamber against the dataset, party by party:
PH 76 (DAP 40, PKR 28, AMANAH 8) · BN 30 (UMNO 26, MCA 2, MIC 1, PBRS 1) · GPS 23 (PBB 14, PRS 5,
PDP 2, SUPP 2) · GRS 7 (direct 4, UPKO 2, PBS 1) · WARISAN 3 · KDM 2 · STAR 1 · PBM 1 ·
PN 49 (PAS 43, WAWASAN 6) · BERSATU 19 · MUDA 1. Every figure matched. The 10-seat gap to 222 is
7 independents and 3 vacancies — correctly not modelled as parties.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-010 | **S2** | `MY-BERSATU.coalitionId` | `MY-PN` | *(removed)* | Bersatu is no longer counted inside Perikatan Nasional: PN's own affiliate list marks it **"disputed"**, and the Dewan Rakyat counts its 19 seats as a bloc of their own, outside PN's 49. `MY-PN`'s members are now PAS + WAWASAN, with the dispute recorded in the coalition's `note` |
| PP-011 | **S3** | `inExecutive` | absent on all 22 | `true` on the 9 parties holding full cabinet portfolios — PKR (9 ministers), UMNO (7), DAP (5), PBB (3), AMANAH (2), PBRS, PDP, PRS, GRS (1 each) | The cabinet's own member-parties table. This is the first country-level fix for defect **B6** |
| PP-012 | **S6** | `MY-GRS.ideologyPosition` | `other` (no `positionRaw`) | `centre`, `positionRaw: "Centre to centre-right"` | GRS's infobox does carry a sourced position; `other` was a placeholder, not a genuine absence |
| PP-013 | — | seat citations | party articles only | every entry now also cites the Dewan Rakyat's dated composition | Closes the circular-citation risk: seats are cited to the chamber, not to the party describing itself |

**Confirmed correct, and therefore left alone:** all 22 leaders (DAP's leader is its
Secretary-General Anthony Loke, not the National Chairman — checked against the infobox's own title
fields); the 18 `inPower` flags; every `founded` year; and the `previousNames` chains, including
WAWASAN's rename from Parti Cinta Malaysia on 13 June 2026 and PBM's from Sarawak Workers Party.

**Judgement calls.**

1. **`inExecutive` means a full cabinet portfolio, not a deputy ministry.** SUPP, PBS and WARISAN
   hold deputy ministries only and are recorded `inPower: true, inExecutive: false`. MCA and MIC sit
   in the government with no portfolio at all. This reading is applied consistently from here on.
2. **GRS is modelled as a party with 4 seats** even though it is also a coalition, because the
   Dewan Rakyat itself counts 4 "GRS direct member" MPs who belong to no component party. The
   `MY-GRS` coalition record and the `MY-GRS` party entry therefore coexist by design.
3. **Bersatu is left with no coalition rather than being forced into PN.** Where a membership is
   genuinely contested, recording no coalition and explaining why beats asserting either side.

**Visual verification:** 22 cards, 21 logos asserted painted, PBM correctly rendering its "No free
image" card, In-power and coalition badges correct, GRS now grouped under Centre. No console errors.

### 🇧🇷 Brazil — audited 2026-09-11

The worst country found so far. **Ten of the twelve seat figures were wrong, ten parties were
missing — including PL, the largest party in the Chamber with 98 seats — and five parties carried
the wrong leader, one of them a deputy who belongs to a different party.**

**A better source, and why it matters.** English Wikipedia's Chamber-of-Deputies infobox lists party
figures that sum to **515 of 513** — an impossible total, so it cannot be used as the seat authority.
The Câmara dos Deputados publishes its own bench as open data
([`/api/v2/deputados`](https://dadosabertos.camara.leg.br/api/v2/deputados)); it returns all 513
sitting deputies, and the party tally sums to exactly 513. Every seat figure here now comes from
that official source. Government/opposition status comes from the
[Second cabinet of Lula da Silva](https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva)
(its supporting-parties table and the cabinet's own party key), and identity facts from each party's
own article.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-014 | **S3** | coverage | 12 parties, 364 / 513 | **22 parties, 513 / 513** | Missing: **PL 98**, PSB 17, PDT 9, NOVO 5, Avante 5, Solidariedade 4, REDE 3, PRD 3, DC 1, MISSÃO 1. Nine of their logos were already bundled and unreferenced; DC's was sourced and bundled in this change |
| PP-015 | **S1** | `seats` | 10 of 12 wrong | corrected | e.g. PODEMOS 11 → **27**, PSDB 33 → **18**, CIDADANIA 9 → **2**, UNIÃO 58 → **52**, PSD 43 → **48**, PP 41 → **46**, PCdoB 6 → **11** |
| PP-016 | **S1** | `leader` | PV led by **Sâmia Bomfim** — a PSOL deputy, not PV's president | José Luiz Penna | PV's own infobox |
| PP-017 | **S1** | `leader` | PSOL **Edmilson Rodrigues**; PODEMOS **Ciro Gomes**; PSDB **Bruno Araújo**; Cidadania **Roberto Freire** | Paula Coradi; Renata Abreu; Aécio Neves; Comte Bittencourt | each party's infobox |
| PP-018 | **S1** | `founded` | PSD **1945** | **2011** | 1945 is the *defunct* PSD of the Vargas era — a different party entirely |
| PP-019 | **S2** | `founded` | PP 1965; PODEMOS 2015; Republicanos 1989; Cidadania 1988 | 1995; 1995; 2003; 1992 | party infoboxes |
| PP-020 | **S1** | `ideologyPosition`, `ideology` | PODEMOS recorded as **left-wing / social democracy / environmentalism** | **centre-right**, economic liberalism, anti-corruption | Podemos is a centre-right party; the entry described a different party altogether |
| PP-021 | **S2** | `ideologyPosition` | PSD, MDB, PSDB all `centre` | all `centre-right`, each with its source's own `positionRaw` | infobox positions ("Centre to centre-right") |
| PP-022 | **S3** | `inPower` / `inExecutive` | only PT in power; `inExecutive` false everywhere | **14 in power, 11 holding ministries** | the cabinet's party key: PT 19 ministries, PSB 6, PDT/MDB/PSD/UNIÃO 3 each, PSOL 2, Republicanos/PCdoB/REDE/PP 1 each. PV, Avante and Solidariedade are coalition members without portfolios |
| PP-023 | **S1** | coalition identity | `BR-FE` named **"Frente Ampla"** (a different organisation) with a URL to match | **Federação Brasil da Esperança** / Brazil of Hope | The PT–PCdoB–PV federation registered in 2022 |
| PP-024 | **S4** | coalition URLs | `BR-UP` cited `…/wiki/Unionão_Progressista` — a malformed title that 404s; `BR-AF` cited `…/wiki/Sempre_Frente` | both re-pointed at the live articles | Link-integrity pass |
| PP-025 | **S3** | missing coalitions | 3 federations | **5** — added `BR-PSOLREDE` (PSOL + REDE) and `BR-RS` (Solidariedade + PRD) | Both are federations the Chamber counts as single blocs |
| PP-026 | **S4** | `logoSourceUrl` | recorded by hand; `BR-PSD` cited the **Brazilian Democratic Movement** article | every logo re-pointed at the Commons file whose **SHA-1 matches the bundled bytes exactly** | All 21 bundled logos were matched to Commons by content hash, not by trusting the recorded URL. This is now the standard provenance method for the sweep |

**Judgement calls.**

1. **`inPower` is the union of the cabinet's "government parties" and the parties actually holding
   ministries.** Brazil's coalition politics puts PSD, MDB, Republicanos, UNIÃO, PP and PDT in the
   cabinet while the Chamber classifies them as *Independent*; recording them as out of power would
   contradict their ministers. The Chamber's own classification is cited alongside so a reader can
   see both.
2. **REDE's `ideologyPosition` is `other`.** Its infobox gives two opposite axes ("Social:
   left-wing; Fiscal: right-wing") and no single bucket. `other` exists for exactly this.
3. **MISSÃO carries no leader.** Its infobox names none.
4. **Cidadania's exit from the PSDB federation is kept as a coalition note** — confirmed: its
   national directory voted in 2025 to end the federation in 2026, the earliest Brazilian electoral
   law allows.

**Visual verification:** 22 cards grouped by ideology, all 22 logos asserted painted after scrolling
the full grid, executive/legislative badges and all five federation labels correct. (The console
shows `ERR_CONNECTION_RESET` for `restcountries.com`, which is blocked in this environment and
unrelated to party data — the bundled-fallback rule covers it.)

### 🇲🇲 Myanmar — audited 2026-09-11 · **deliberately out of scope**

Myanmar is absent from the dataset, and after auditing it the absence is **correct** — but it was
undocumented, which is the failure mode this repo calls out elsewhere ("an omission the user cannot
see makes an incomplete set look complete"). It is now recorded.

The junta held elections in three phases from 28 December 2025 to 25 January 2026, the first since
the 2021 coup. The dataset's scope rule admits only competitive multi-party systems, and this
process does not qualify on its own published record: the 2023 electoral law barred convicted
persons including Aung San Suu Kyi and Win Myint from standing, the main opposition party was
dissolved, and the vote is described by the sources as intended to legitimise continued military
rule. Beyond scope, the arithmetic is not sourceable either — declared Pyithu Hluttaw results
account for 258 elected seats across 11 parties, constituencies were cancelled for conflict, and a
quarter of the chamber is appointed by the military rather than elected, so no defensible
seats/seatsTotal pair exists.

**Decision: leave Myanmar uncovered.** Revisit if a competitively-elected chamber is seated and its
composition is published. A wrong chamber would be worse than an absent one.

### 🇹🇭 Thailand — audited 2026-09-11

Thailand was the first country found already refreshed past its most recent election — the data
reflects the **27th House elected 8 February 2026**, not the 2023 parliament. The defects were a
single wrong seat count, two missing micro-parties, a misused field, and the usual missing
`inExecutive`.

Verified against the [House of Representatives](https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand))
political groups (Government 292, Opposition 207, 1 vacant, of 500) and the
[Second Anutin cabinet](https://en.wikipedia.org/wiki/Second_Anutin_cabinet).

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-027 | **S2** | `TH-BJT.seats` | 192 | **191** | The chamber's own group list. Bhumjaithai leads a 292-seat government under Anutin Charnvirakul |
| PP-028 | **S1** | `TH-TST.leader` | the string *"Vacant (Sudarat Keyuraphan resigned as party leader on 12 February 2026, saying \"there is no place for idealists\" in current Thai politics)"* | *(omitted)* | The field is a person's name and is rendered as one — a 130-character sentence was being displayed to users as a leader. The resignation is now recorded in a cited source title instead. **Class defect: check every country for prose smuggled into `leader`.** |
| PP-029 | **S3** | `inExecutive` | absent on all 20 | `true` on the **12** covered parties holding ministries | The cabinet lists thirteen member parties; the thirteenth (New Dimension) is not in the dataset — see below |
| PP-030 | **S3** | coverage | 20 parties, 497 / 500 | unchanged, gap documented | Two seated parties are **knowingly absent**: **New Dimension** (1 seat, in the cabinet) and **Thai Sub Thawee** (1 seat) |

**Why two seated parties were left out — and the structural finding behind it.**
Neither has an article in English or Thai Wikipedia; the 2026 election article gives only their names
and lead candidates (Preecha Khaikaew; Melda Ketwichit). `check-political-parties.mjs` requires a
plausible `founded` year on every entry, and no source gives one for either party. Inventing a year
to satisfy the gate is exactly what the sourcing rule forbids, so they are omitted and the gap is
recorded here rather than hidden.

* **New finding — S5 (structural).** A mandatory `founded` makes a genuinely-new micro-party
  *unrepresentable*, even when its existence and seat count are beyond doubt from the chamber's own
  record. Candidate fix: allow `founded` to be omitted when a `foundedUnknownReason` documents the
  search, exactly as `noImageReason` does for logos. Deferred with **B8** until enough countries are
  done to size it; both are tracked here so neither is lost.

**Visual verification:** 20 cards, all 16 bundled logos asserted painted, the four "No free image"
cards correct, in-power badges correct.

### 🇻🇳 Vietnam — audited 2026-09-11

One party, one seat figure, and it was **right** — 482 of 500, the balance being 18 independents,
matching the National Assembly elected 15 March 2026 exactly. The failure was the person.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-031 | **S1** | `VN-CPV.leader` | **Nguyễn Phú Trọng** | **Tô Lâm** | Nguyễn Phú Trọng **died in July 2024**. The app was naming a dead man as Vietnam's current leader — the single most damaging kind of staleness in this dataset, and invisible to every structural check |
| PP-032 | **S3** | `inExecutive` | absent | `true` | The CPV is the sole governing party; its General Secretary heads the state |
| PP-033 | **S4** | `logoSourceUrl` | `en.wikipedia.org/…/File:Communist_Party_of_Vietnam.svg`, with a non-free `licenceNote` | the Commons file whose **SHA-1 matches the bundled bytes**: `File:Communist_Party_of_Vietnam_flag_logo.svg`; `licenceNote` dropped as it is Commons-hosted | Content-hash provenance, as established in Brazil |
| PP-034 | — | `ideology` | "Marxism-Leninism" (hyphen) | "Marxism–Leninism" (en dash, as the source writes it) | quoted verbatim per the sourcing rule |

**Method note.** The SHA-1 provenance check is now run for **every** country, not just where a logo
looks wrong. Two countries in, it has caught two mis-recorded source URLs out of 22 logos checked —
a hand-recorded URL is simply not reliable evidence of what the bundled bytes are.

### 🇮🇩 Indonesia — audited 2026-09-11

Closes dataset defects **B1** (seats summing above the chamber) and **B2** (two `seatsTotal` values
in one country) — and turned up the worst *image* defect of the sweep so far.

> **`pan.svg`, shipped as the logo of Indonesia's National Mandate Party (PAN), was the logo of
> "pans & COMPANY" — a restaurant chain.** The SHA-1 provenance check matched the bundled bytes to
> Commons `File:Logo_pans_&_company.png`; rendering it confirmed a yellow box reading *pans &
> COMPANY*. It had been live in production. This is precisely the name-collision failure the repo's
> flag rules exist to prevent ("Misiones", "adidas for Vietnam"), reproduced in the party data.

Verified against the [House of Representatives](https://en.wikipedia.org/wiki/People%27s_Representative_Council)
and its seat template (`Template:DPR RI`), which gives all eight parties and sums to exactly 580.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-035 | **S1** | `ID-PAN.logo` | **the "pans & COMPANY" restaurant logo** | `pan.png`, the 2024 PAN logo (Commons, public domain) — the correct file was already bundled and unreferenced | SHA-1 provenance + visual render |
| PP-036 | **S1** | `seats` | PDI-P 128, Golkar 97, Gerindra 112, PKB 58 — **summing to 609 of a stated 575** | 110 / 102 / 86 / 68, summing to **580 of 580** | `Template:DPR RI`, which the chamber infobox itself uses |
| PP-037 | **S1** | `seatsTotal` | **575 for four parties, 580 for the other four** | 580 throughout | The DPR has had 580 seats since the 2024 election; 575 was the 2019–2024 chamber |
| PP-038 | **S1** | `chamberName` | **"People's Consultative Assembly"** for four parties | "People's Representative Council (DPR)" throughout | The MPR is the *bicameral assembly*; the lower house is the DPR. Four parties named the wrong institution |
| PP-039 | **S1** | `leader` | Golkar **Airlangga Hartarto**; PKS **Ahmad Syaikhu** | **Bahlil Lahadalia**; **Sohibul Iman** | party infoboxes |
| PP-040 | **S2** | `logo` | NasDem's **superseded** logo (Commons `Partai_Nasdem_Old.svg`); Golkar and PKB on files with no traceable provenance and a non-free note | current Commons files: `Logo_Utama_Partai_NasDem.png`, `Logo_Golkar.svg`, `Logo_PKB_2024.png`, all public domain | infobox `logo` fields + Commons licence metadata |
| PP-041 | **S3** | `inPower` / `inExecutive` | NasDem in power, PKS out, `inExecutive` absent | the five **KIM** government parties (Golkar, Gerindra, PKB, PAN, Demokrat) are in power and in the executive | The chamber's own three-way split: Government (KIM), confidence-and-supply (KIM+: NasDem, PKS), check-and-balance (PDI-P) |

**Judgement call — NasDem and PKS.** The chamber classifies them as *confidence and supply*, which
is support without joining the government, so both are recorded out of power. No per-minister source
listing cabinet portfolios by party could be reached (neither the English nor the Indonesian cabinet
article carries a machine-readable party column), so if either holds a portfolio it is not reflected
here. **That limit is recorded rather than papered over** — revisit when a minister-by-party source
is available.

**Housekeeping:** five superseded or wrong logo files were deleted (`pan.svg`, `nasdem.svg`,
`nasdem.png`, `golkar.png`, `pkb.png`).

**Visual verification:** 8 cards, all 8 logos asserted painted and montage-checked side by side —
PAN now shows the party's blue sunburst, not a restaurant.

### 🇵🇭 Philippines — audited 2026-09-11

Verified against the [House of Representatives](https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines)
political groups for the 20th Congress (elected 12 May 2025): Majority 287, Minority 27, Independent
4, of 318 — 254 district seats plus 64 party-list seats.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-042 | **S2** | `seats` | Lakas 77, NUP 55 | **76**, **56** | Both parties sit across the majority and minority blocs; summing the chamber's own per-bloc figures gives 75+1 and 54+2 |
| PP-043 | **S3** | coverage | 13 parties | **16** — added One Cebu (1), LDP (1) and UNA (1) with fair-use logos sourced and bundled | Chamber group list |
| PP-044 | **S3** | `inExecutive` | absent | `true` on **PFP** only | The Philippines is presidential and Ferdinand Marcos Jr. leads PFP; no source lists cabinet portfolios by party, so the flag is confined to the President's own party |
| — | ✓ | party-list seats | Akbayan 3, Tingog 3, 4Ps 2, Ako Bicol 2 | unchanged — **all four verified correct** | The 2025 party-list election's elected-representatives table |

**Documented coverage gaps — two parties that cannot be added, and 54 party-list seats.**

* **Centrist Democratic Party (1 seat)** and **Partido Navoteño (1 seat)** sit in the majority bloc
  and are *not* in the dataset, because neither has a logo file anywhere: CDP's infobox `logo` field
  contains the literal string `200px` (a broken parameter) and Navoteño's article has no logo at
  all. The political-party rule requires every new entry to carry a bundled logo, and
  `noImageReason` is reserved for entries predating 2026-09-08, so **the gate makes these parties
  unrepresentable.** This is the same structural wall Thailand hit on `founded` — see **S5** below.
* **54 of the 64 party-list seats** belong to sectoral organisations the dataset does not model
  (ACT-CIS, CIBAC, SAGIP, Kabataan, TUCP, Senior Citizens, 1-Rider and roughly forty more, most with
  a single seat). Four are modelled and correct. This is a recorded, deliberate gap for a later
  pass, not an oversight — it is why Philippine coverage reads 261/318 rather than ~315/318.

* **S5 (structural), second instance.** Two different mandatory fields have now blocked real, seated
  parties from being recorded: `founded` in Thailand and `logo` here. The gate is protecting quality
  in general while producing *invisible* incompleteness in particular. Candidate fix, to be proposed
  once more countries are done: extend the `noImageReason` pattern to any mandatory field —
  a sourced, human-written reason for the gap, visible in the UI, beats an absent party.

**Visual verification:** 16 cards, 15 logos asserted painted (the sixteenth is a documented
no-image entry), the three new logos montage-checked before bundling.

### 🇸🇬 Singapore — audited 2026-09-11

Closes another instance of dataset defect **B1**: PAP 86 + WP 12 = 98 seats in a chamber the entry
said had **97**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-045 | **S1** | `seatsTotal` | 97 | **108** | 97 is the number of *elected constituency* seats. Parliament's actual membership is 108: PAP 86, WP 12 (including Non-Constituency MPs), 9 Nominated MPs and 1 vacancy. Using the elected-seat figure as the denominator while counting NCMPs in the numerator is what made the sum impossible |
| PP-046 | **S3** | `inExecutive` | absent | `true` on PAP | Second Lawrence Wong Cabinet |

Both seat figures, both leaders (Lawrence Wong; Pritam Singh) and both logos' provenance were
checked and are correct.

### 🇰🇭 Cambodia — audited 2026-09-11

Seats were right (CPP 120, FUNCINPEC 5, of 125). Everything else about the CPP entry was not.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-047 | **S1** | `KH-CPP.logo` | **a magenta oval reading "CPP"** — Commons `File:Cpp 2.png`, which Commons itself files under **"Unidentified logos"** and "Self-published work" | the party's own emblem (the devata scattering flowers, wreathed in rice ears) as used by its article | SHA-1 provenance, then the Commons category, then a render. Second wrong-logo find of the sweep after Indonesia's restaurant chain |
| PP-048 | **S1** | `KH-CPP.leader` | **Hun Manet**, titled "Prime Minister" | **Hun Sen**, President | Hun Manet is Prime Minister and a party vice-president; the CPP's president is Hun Sen. The field is the *party* leader |
| PP-049 | **S2** | file type | `cpp.svg` and `funcinpec.svg` were **PNG bytes with an `.svg` extension** | renamed `.png` | `file(1)` on the bundled bytes. Browsers sniff content so they rendered, but the extension was false |
| PP-050 | **S3** | `inExecutive` | absent | `true` on CPP | Cabinet of Hun Manet |

**Method note — two wrong logos in ten countries.** Both were found by the SHA-1 provenance check
followed by actually *looking* at the image, and neither was detectable from the recorded metadata.
A Commons match is necessary but not sufficient: `Cpp 2.png` is a real Commons file, freely
licensed, and still the wrong picture. **Rendering every logo is now part of the per-country loop.**

### 🇱🇦 Laos — audited 2026-09-11

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-051 | **S2** | `seats`, `seatsTotal` | 158 / 164 — the assembly elected in 2021 | **169 / 175** | A new National Assembly was elected **22 February 2026**: LPRP 169 and 6 independents, all within the Lao Front for National Development |
| PP-052 | **S3** | `inExecutive` | absent | `true` | The LPRP is the sole governing party; Thongloun Sisoulith is both its General Secretary and President of Laos |
| PP-053 | **S2** | file type + `logoSourceUrl` | `lprp.svg` was **PNG bytes with an `.svg` extension**, cited to `File:Emblem_of_the_Lao_People's_Revolutionary_Party.svg` — a different file | renamed `lprp.png`, cited to `File:LPRP_logo_red.png`, the Commons file whose SHA-1 matches | Third country where the recorded logo URL did not describe the bundled bytes |

Leader (Thongloun Sisoulith) and founding year (22 March 1955) were checked and are correct; the
logo was rendered and is the party's red hammer-and-sickle.

**Pattern worth naming: the `.svg`-extension-on-PNG-bytes defect has now appeared in Cambodia (2
files) and Laos (1).** It is invisible in the browser because content sniffing rescues it, and
invisible to the gate because the check only verifies the sha256. Worth a mechanical sweep across
all bundled party logos in a later structural PR — added to the deferred list with **B8** and the
mandatory-field wall.

### 🇧🇳 Brunei — audited 2026-09-11 · **country removed**

The only country so far whose entry had to be **deleted rather than corrected**, because what it
asserted was not true of Brunei at all.

The dataset carried three parties — PDNB credited with **1 seat**, PNDB and PNS with 0 — in a
36-seat chamber. Brunei's [Legislative Council](https://en.wikipedia.org/wiki/Legislative_Council_of_Brunei)
has **34 members, every one of them ex-officio (14) or appointed and non-partisan (20)**. No party
holds a seat, and none can: Brunei is an absolute monarchy and, as the National Development Party's
own article states, **no legislative election has been held in Brunei since 1962.**

| ID | Sev | Finding |
|---|---|---|
| PP-054 | **S1** | A party was credited with a seat in a legislature that has **no elected members and no party representation whatsoever**. This is not a stale figure — it describes a parliamentary system Brunei does not have |
| PP-055 | **S1** | `seatsTotal` 36 against an actual membership of 34 |
| PP-056 | **S2** | Two of the three entries held 0 seats, already contradicting the file's own scope rule ("only parties currently holding at least one seat") |

**Decision: remove Brunei from `POLITICAL_PARTIES` and delete its three bundled logos.** The file's
scope rule admits only competitive multi-party systems; Brunei is an absolute monarchy with an
appointed legislature. Keeping the entry would assert representation that does not exist, which is
worse than the country being absent — the same reasoning that keeps **Myanmar** out.

**Verified in the running app:** Brunei's page renders normally and the Political parties tab is
simply **not offered** (tabs: National symbols, Sub-national divisions, Capital cities, Hierarchy),
with no console errors. A country with no party data degrades cleanly by design.

**This closes 3 of the 19 zero-seat entries in defect B3.** The remaining 16 are checked as their
countries come up.

### 🇹🇱 Timor-Leste — audited 2026-09-11 · **Southeast Asia complete**

Every seat figure was already correct (CNRT 31, FRETILIN 19, PD 6, KHUNTO 5, PLP 4 = 65), as were
the government/opposition flags. **Three of the five logos were the wrong image, including one that
was not an image at all.**

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-057 | **S1** | `TL-FRETILIN.logo` | **an Ogg Vorbis audio file** — a Voice of America clip of someone *pronouncing* the word "Fretilin", renamed `fretilin.svg` | the party's emblem (fist and star, *Frente Revolucionária do Timor-Leste Independente*) | `file(1)` reported `Ogg data, Vorbis audio, stereo, 44100 Hz`. It was live, rendering as a broken image |
| PP-058 | **S1** | `TL-CNRT.logo` | **"CNRT — CONTROL DEL TRANSPORTE"**, a Spanish transport-control company | the National Congress for Timorese Reconstruction's own emblem | Acronym collision, rendered and confirmed |
| PP-059 | **S1** | `TL-PD.logo` | **a yellow handheld games console** (a Playdate) | the Partido Democrático's blue roundel | "PD" collision, rendered and confirmed |
| PP-060 | **S2** | `TL-FRETILIN.leader` | Francisco Guterres (Lú-Olo), as President | **Mari Alkatiri, Secretary-General** | FRETILIN's infobox now records its presidency as `TBD`; the Secretary-General is the sourced office-holder, so the entry names the office that actually exists |
| PP-061 | **S2** | file types | `cnrt.svg` was PNG bytes; `plp.svg` replaced by the party's own file | all extensions now match their bytes | Same `.svg`-on-not-SVG defect as Cambodia and Laos |

**Five wrong logos in thirteen countries — and every one was an acronym or name collision.**
pans & COMPANY for PAN, an unidentified magenta mark for the CPP, a transport firm for CNRT, a
games console for PD, and an audio clip for FRETILIN. This is the **Misiones bug** the repo's flag
rules were written for, reproduced wholesale in the party data. It is also why the loop now ends
with rendering every logo: four of the five passed a Commons or Wikipedia lookup, and three of them
were freely licensed. **Provenance proves where bytes came from; only looking proves what they are.**

### 🇦🇷 Argentina — audited 2026-09-11

The strongest country yet on numbers: **all nineteen blocs reconciled exactly** against the Chamber
of Deputies after the 26 October 2025 legislative election — LLA 95, FP 93, United Provinces 18,
PRO 12, Innovación Federal 7, UCR 6, FIT-U 4, three 3-seat blocs, four 2-seat blocs and five
1-seat blocs, summing to 257 of 257. All seven bundled logos matched Commons or Wikipedia by SHA-1
and rendered correctly.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-062 | **S2** | `AR-UXP.name` | **Unión por la Patria** | **Fuerza Patria** / Homeland Force, with the old name preserved in `previousNames` (2023–2025) | The coalition was renamed in 2025. Argentina's main opposition bloc — 93 seats — was carrying a superseded name |
| PP-063 | **S3** | `inExecutive` | absent | `true` on LLA only | Javier Milei's party; the chamber separates Government (95) from Allies (24), so PRO, UCR, MID and the small provincial blocs stay out of power |

**Unresolved, flagged rather than guessed.** The chamber now lists a 3-seat bloc as **"País
Federal"** where the dataset has **"Coherencia"** (also 3 seats, led by Marcela Pagano, formed
August 2025 by four ex-libertarians). They may be the same bloc renamed, or two different ones.
Neither English nor Spanish Wikipedia search resolved it within this pass, so **the entry is left
unchanged and the discrepancy recorded here** — changing a name on a guess is what the sourcing
rule forbids. Recheck when a source lists the bloc's membership.

**Note on modelling:** Argentina's entries are legislative *blocs*, not registered parties. That was
an existing choice and it matches how the chamber itself reports composition; it is noted so a later
reviewer knows it is deliberate.

### 🇨🇱 Chile — audited 2026-09-11

The entry described **a parliament and a government that no longer exist.** It held seven parties
and 132 of 155 seats with Gabriel Boric's Frente Amplio governing; the **16 November 2025 general
election** produced a new chamber and a new, right-wing government.

Verified against the [Chamber of Deputies](https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile):
Government 67 (Republicans 31, UDI 18, the RN group 16, 2 independents), supported by 8 (PNL),
independents 15 (PDG), opposition 65 — 155 in total.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-064 | **S1** | whole country | 7 parties, 132 / 155, Frente Amplio in government | **14 parties, 151 / 155**, Republicans/UDI/RN/Evópoli/Demócratas in government | Every seat figure superseded by the 2025 election |
| PP-065 | **S1** | `CL-PRCH.logo` | **the Republican Party's logo**, filed as the **Radical Party's** | each party's own emblem; the Republican logo now sits on the new `CL-REP` entry where it belongs | SHA-1 matched `Republican_Party_of_Chile_logo.svg`. Opposite ends of Chilean politics |
| PP-066 | **S1** | `CL-UDI.logo` | **the FRENCH UDI's logo** — *"udi · union des démocrates et indépendants"* | Chile's own Unión Demócrata Independiente logo | SHA-1 matched Commons `UDI_logo.svg` (France). The correct Chilean file **was already bundled** as `udi.png` |
| PP-067 | **S2** | `seats` | UDI 26, RN 18, PDC 16, PPD 12, PS 8, FA 49, PR 3 | 18, 13, 8, 10, 11, 18, 1 | Chamber composition |
| PP-068 | **S3** | coverage | — | added Republicans 31, PDG 15, Communists 12, PNL 8, Liberals 3, Evópoli 2, Demócratas 1 | Seven parties absent entirely, including the **largest party in the chamber** |
| PP-069 | **S2** | junk files | three stray `*.svg.sha256` text files in `public/` | deleted | Not images; they were being shipped to users' browsers as part of the static site |

**Documented gap.** **FREVS** (Social Green Regionalist Federation, 2 seats) is **not added**: it has
no logo on English *or* Spanish Wikipedia, and the gate requires one on every new entry. This is the
**third** time a mandatory field has blocked a real seated party — `founded` in Thailand, `logo` in
the Philippines, `logo` here — and the reason Chile reads 151/155 rather than 153/155 (the other
2 seats are independents).

**Seven wrong logos in fifteen countries, every one a name collision.** Chile contributed two of the
starkest: a party's opponents' logo, and a French party's logo. Both were caught the same way —
SHA-1 provenance, then rendering the image and looking at it.

### 🇨🇴 Colombia — audited 2026-09-12

The dataset held **five parties covering 102 of a stated 188 seats**, with leaders attached to the
wrong parties. Colombia elected a new Chamber on **8 March 2026** and a new President took office in
August, so nothing in the entry survived.

**English Wikipedia could not be used, and that is itself a finding.** Its Chamber-of-Representatives
infobox lists blocs totalling 85 + 69 + 44 = 198, whose member parties sum to **202**, against a
stated **183 members** — internally inconsistent three ways over. The **Spanish** article
([`Cámara de Representantes de Colombia`](https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia))
reconciles exactly: Government 118 + Independents 11 + Opposition 44 + special seats 9 + 1 = **183**.
Every seat figure here comes from it. That is the second country (after Brazil) where the English
chamber article was arithmetically impossible and a better source had to be found — **checking that
the composition sums to the chamber size is now a standing step in the loop.**

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-064 | **S1** | coverage | 5 parties, 102 / **188** | **13 parties, 158 / 183** | The Chamber has 183 members. Added Pacto Histórico (43 — the largest party, absent), Partido de la U (13), Alianza Verde (7), ASI (2), Creemos (2), Nuevo Liberalismo (2), Salvación Nacional (1), MIRA (1), MAIS (1) |
| PP-065 | **S1** | `seats` | every one wrong | CD 30, PLC 24, PCC 20, CR 12 … | The old figures were from the 2022 chamber |
| PP-066 | **S1** | `leader` | Liberal led by **Ernesto Macías** (a Centro Democrático senator); Conservative led by **Carlos Fernando Galán** (Bogotá's mayor, of New Liberalism) | César Gaviria; Nadia Blel | Two leaders were not merely stale but attached to the *wrong party* |
| PP-067 | **S2** | `ideologyPosition` | Cambio Radical `centre`; Centro Democrático "Right-wing" | `centre-right`; "Right-wing to far-right" | party infoboxes |
| PP-068 | **S3** | `inPower` | absent on all | `true` on the **8 government-bloc parties** | The Spanish chamber article's own Gobierno grouping |
| PP-069 | **S4** | logo hygiene | three stray `.sha256` files and four unreferenced duplicate logos in `public/party-logos/co/` | removed | `conservador.png` and `pcc.png` were byte-identical |

**`inExecutive` is `false` for every Colombian party, and that is a sourced statement, not a gap.**
President **Abelardo de la Espriella** (in office since 2026) leads **Defensores de la Patria**,
founded 2024 — a party that holds **no seats in the Chamber at all**. So no seated party is the
President's. Whether any coalition party holds ministries could not be sourced (no cabinet article
with a party column was reachable), and that limit is recorded here rather than guessed at.

**Documented gaps — 25 of the 183 seats are deliberately not modelled.**

* **18 are not party seats**: the 16 **CITREP** transitional peace-constituency seats (11 counted
  with the government, 5 special), the **Consejo Comunitario El Naranjo** (a community council), and
  one **Raizal** representative. Modelling these as parties would misdescribe them.
* **7 belong to four parties that could not be completed**: **Partido Demócrata Colombiano** (3) —
  no founding year in any reachable source; **Colombia Renaciente** (2), **La Fuerza** (1) and
  **Movimiento Unidad en Minga por Colombia** (1) — no logo file on Commons or either Wikipedia.
  Same mandatory-field wall as Thailand and the Philippines; recorded, not hidden.

All 13 bundled logos were SHA-1 matched to Commons or English Wikipedia and montage-verified.

### 🇵🇪 Peru — audited 2026-09-12

Peru's parties were the right six, but the entry described **a legislature that no longer exists**.

At the 12–13 April 2026 general election Peru returned to a **bicameral** Congress after thirty
years: a 60-member Senate and a **130-member Chamber of Deputies**. The dataset still named the old
unicameral "Congress of the Republic" and carried a seat split that matches neither house.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-070 | **S1** | `chamberName` | "Congress of the Republic" | **"Chamber of Deputies"** | The Congress has been bicameral since the 2026 election; the Congress article's own header reads "Unicameral (1995–2026)" |
| PP-071 | **S1** | `seats` | FP 24, JP 9, RP 15, PBG 22, OBRAS 16, AN 14 — summing to 100 of 130 | **FP 41, JP 32, PBG 18, RP 15, OBRAS 14, AN 10 — exactly 130 of 130** | The Chamber's own composition |
| PP-072 | **S1** | `leader` | Juntos por el Perú led by "Raúl Alfredo de la Pue…" | **Roberto Sánchez** | party infobox |
| PP-073 | **S3** | `leader` | PBG, OBRAS and AN had none | Jorge Nieto; Ricardo Belmont; Luis López-Chau Pastor | party infoboxes |
| PP-074 | **S3** | `inPower` / `inExecutive` | false on every party | `true` on **Popular Force** | **Keiko Fujimori**, Popular Force's leader, is President of Peru. Popular Renewal is recorded as *supported by* the government, so it stays out of power — the same reading applied in Indonesia |

All six logos were SHA-1 matched to Commons and montage-verified. Seats now reconcile exactly, which
closes Peru's contribution to defect **B4** (chamber coverage below 60% — it was 77%).

### 🇻🇪 Venezuela — audited 2026-09-12

Venezuela was the **single most wrong country** the sweep has reached. The dataset held **one party**
— PSUV — credited with **277 of 277** seats: a chamber size that was retired at the 2025 election, a
seat count that asserted a one-party legislature, and a logo that had been written off as
unsourceable when the party's own 2024 mark sits on Commons in the public domain.

The National Assembly's **VI Legislature** was installed on 5 January 2026 with **285** seats. Nine
parties of the governing **Gran Polo Patriótico Simón Bolívar** hold 253 of them (PSUV itself holds
**219**, not all of them); three are indigenous seats; and **eleven** further parties sit in three
opposition parliamentary groups.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-075 | **S1** | `seats` / `seatsTotal` | PSUV **277 of 277** — a legislature with no other party in it | **PSUV 219 of 285**, 20 parties totalling **277 of 285** | The Assembly's own VI-Legislature composition. 277 was the 2020–2025 chamber size; the 2025 election returned 285 |
| PP-076 | **S1** | coverage | 1 party | **20 parties** | Nineteen seated parties were absent, including the whole of the governing alliance beyond PSUV and every opposition party |
| PP-077 | **S1** | `leader` | Diosdado Cabello, **"Party Chairman"** | **Delcy Rodríguez**, "Party leader" | Cabello is PSUV's **secretary**, never its chairman. Nicolás Maduro remains the formally elected party president but has been in United States custody since January 2026; the party's own infobox now names Rodríguez as its leader |
| PP-078 | **S1** | `inExecutive` context | "Diosdado Cabello … in executive power" | PSUV holds the presidency through **Delcy Rodríguez, interim president since 2026** | Maduro was captured during the United States intervention in Venezuela; Rodríguez, his vice-president since 2018, is the first woman to perform the duties of the presidency |
| PP-079 | **S1** | `founded` | **1997** | **2007** | 1997 is the founding year of the *Fifth Republic Movement*, one of PSUV's merger predecessors. PSUV itself dates from 2007 (es.wikipedia gives 14 March 2008 for its registration — the discrepancy is recorded here, not resolved by guessing) |
| PP-080 | **S2** | `noImageReason` | "no freely-licensed vectorized logo available" | **`party-logos/ve/psuv.svg`** | `PSUV 2024 logo.svg` is on Commons in the **public domain**. The reason was wrong, and PSUV has now been removed from `GRANDFATHERED_PARTIES_WITH_NO_IMAGE` |
| PP-081 | **S3** | `chamberName` | "National Assembly (disputed)" | **"National Assembly"** | `chamberName` names the chamber; the recognition dispute belongs in the sources, where it now is (the English article's "partial recognition" note is cited) |
| PP-082 | **S3** | coalitions | none | **`VE-GPPSB`** (9 seated members) and **`VE-AD-ALLIANCE`** (7) | The governing Chavista alliance and the opposition Democratic Alliance |

**A judgement call, recorded.** Acción Democrática, Primero Justicia and Copei hold their seats
through the **ad hoc boards imposed by the Supreme Tribunal of Justice**, not through the leaderships
those parties themselves recognise. The dataset shows each party's own leadership (AD: Isabel Carmona
de Serra, the *dirección en resistencia*) and states the ad-hoc split in that party's sources and in
the `VE-AD-ALLIANCE` coalition note. Suppressing either fact would take a side.

**Documented gaps — 8 of the 285 seats are deliberately not modelled.**

* **3 are indigenous seats**, elected nationally by indigenous communities and not held by a party.
* **5 belong to Vamos Vamos Cojedes**, a regional party registered on 11 April 2025. No logo file
  exists on Commons, on either Wikipedia, or anywhere freely licensable (the party's presence is
  social-media only), and the gate forbids a new no-image entry. Recorded, not hidden — the same
  mandatory-field wall as Thailand, the Philippines and Colombia.

All 20 bundled logos were resolved on Commons, downloaded, checked that their bytes match their
extension, and **montage-verified**. That pass mattered: UNICA's Commons file is named
`GqRp6FJXgAA6TRL.jpg` — a raw social-media filename of exactly the shape that produced seven wrong
logos earlier in this sweep — and rendering it confirmed it really is the Unión y Cambio mark.

---

### 🇪🇨 Ecuador — audited 2026-09-12

Ecuador's entry described the **2021–2023 Assembly**: 137 seats, when the chamber has had **151**
since the 2023 snap election. Every seat figure, every founding year, and one entire party were
wrong.

The fifth legislative period was elected on 9 February 2025: **Government 78** (ADN 66, PSP 1, two
provincial movements, 9 independents), **Opposition 61** (RC 59, RETO 1, one provincial), **unaligned
12** (Pachakutik 3, PSC 3, 6 independents) — 151 exactly.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-083 | **S1** | `seatsTotal` | **137** | **151** | 137 was the 2021–2023 Assembly. The chamber has 151 members |
| PP-084 | **S1** | existence | **`EC-UDCPP` "Unión Demócrata Cristiana", 17 seats** | **removed** | The article redirects to **Democracia Popular**, founded 1977 — a party that holds **no seats at all** in this Assembly. The entry also gave it the wrong founding year (1978) and the Social Christian Party's English name |
| PP-085 | **S1** | `seats` | ADN 35, RC 27, PK 15 | **ADN 66, RC 59, PK 3** | Pachakutik was over-credited five-fold; ADN and RC both roughly doubled |
| PP-086 | **S1** | `founded` | ADN **2012**, RC **2006**, PK **1996** | **2021, 2010, 1995** | Each party's own infobox. ADN did not exist in 2012 — it was founded 20 November 2021 and legalised in May 2024 |
| PP-087 | **S2** | coverage | 4 parties (one fictitious) | **6 parties, 133 of 151** | Added **PSC** (3), **PSP** (1) and **RETO** (1); PSC is the party the removed UDCPP entry had been half-describing |
| PP-088 | **S2** | `leader` | Pachakutik and UDCPP had none; RC led by Andrés Arauz | **Marlon Vargas**; RC led by **Gabriela Rivadeneira** | party infoboxes |
| PP-089 | **S2** | `logo` | RC carried an older mark | **`Logo-rc5-actual-a-color.png`** (the current RC5 logo) | Commons |
| PP-090 | **S3** | `ideology` | ADN "Conservatism, Social democracy"; RC "Left-wing, Socialism, Progressivism" | re-copied verbatim from each infobox | "Left-wing" is a *position*, not an ideology; ADN's own article gives right-wing populism, personalism, neoliberalism |
| PP-091 | **S3** | `inPower` | ADN only | ADN **and PSP** | The Assembly's own *Oficialismo* grouping counts PSP with the government |

**Documented gap — 18 of the 151 seats are deliberately not modelled**: **15 independents** and
**3 provincial-movement** seats, none of which is a national party.

All six logos were downloaded from Commons, byte-checked against their extension, and
montage-verified (each carries its CNE ballot list number — ADN 7, Pachakutik 18, PSC 6, PSP 3,
RC 5, RETO 33 — which is a useful confirmation that each is the electoral mark, not a corporate one).
All four of Ecuador's entries have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE`.

---

### 🇧🇴 Bolivia — audited 2026-09-12

Bolivia's three entries were **garbled rather than merely stale**: two of them named a party that
does not exist under that name, and attached to it the leader of a *different* party.

The Chamber of Deputies elected on 17 August 2025 seats seven groups across 130 members: **PDC 49**
(government), **Alianza Libre 39**, **Unidad 26**, **Alianza Popular 8**, **APB Súmate 5** (ally),
**MAS-IPSP 2**, **Bia Yuqui 1**. Rodrigo Paz of the PDC has been president since 8 November 2025.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-092 | **S1** | existence | **"Arcistas por Bolivia" (16 seats), led by Luis Fernando Camacho**; **"Unidad Movil" (8), led by Oscar Ortiz** | removed; replaced by the groups that actually sit | Neither name appears in the Chamber. Camacho leads **Creemos**, not an "Arcistas" party; "Unidad Movil" is not a Bolivian party at all — the bloc is **Bloque de Unidad** |
| PP-093 | **S1** | coverage | 3 parties, 26 of 130 | **6 parties, 129 of 130** | Five of the seven seated groups were absent, including **PDC**, the party of the President, with 49 seats |
| PP-094 | **S1** | `inPower` / `inExecutive` | **false on every party** — Bolivia had no governing party at all | **PDC** in power and in the executive; **APB Súmate** in power as its ally | Rodrigo Paz (PDC) took office 8 November 2025 |
| PP-095 | **S1** | `chamberName` | "Plurinational Legislative Assembly" | **"Chamber of Deputies"** | The Assembly is the whole bicameral body (130 + 36); 130 is the lower house alone |
| PP-096 | **S2** | `seats` | MAS 2 | 2 — **the one figure that was right** | MAS-IPSP collapsed from governing party to two seats at the 2025 election |
| PP-097 | **S3** | `founded` | "Arcistas" 2017, "Unidad Movil" 2018 | n/a — entries removed | Both were inventions of the removed entries |

**Documented gap — 1 of the 130 seats is deliberately not modelled.** **Bia Yuqui** (Consejo Indígena
Yuqui Bia Recuate) holds one special indigenous-constituency seat, and no reachable source gives it a
founding year, which the schema requires. Recorded, not hidden — the same mandatory-field wall as
Thailand, the Philippines, Chile, Colombia and Venezuela.

All six logos were downloaded from Commons (all public domain), byte-checked against their extension,
and montage-verified.

---

### 🇵🇾 Paraguay — audited 2026-09-12

Paraguay's entry had the **wrong chamber size**, and every seat figure was scaled to it. The Chamber
of Deputies has **80** members, not 128 — 128 is not the size of either Paraguayan house (the Senate
has 45), so the figure appears to have been invented rather than taken from a superseded chamber.

The Chamber elected on 30 April 2023 sits **ANR 48** (government), **PLRA 22**, **Yo Creo 3**, 3
independents, and one seat each for **PCN**, **PEN**, **PPQ** and **PPS**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-098 | **S1** | `seatsTotal` | **128** | **80** | The Chamber has 80 deputies; the Senate has 45. 128 matches neither, nor their sum |
| PP-099 | **S1** | `seats` | ANR 51, PLRA 38 | **ANR 48, PLRA 22** | The Chamber's own composition, corroborated by both parties' English infoboxes |
| PP-100 | **S1** | existence | **"Hagamos" (26 seats), founded 2018** | **removed** | No party of that name sits in the Chamber. The 26 seats were spread across five parties that were absent |
| PP-101 | **S1** | `founded` | PLRA **1873** | **1887** | The PLRA dates from 10 July 1887; the ANR from 11 September 1887, eight weeks later — the dataset had the ANR's year right and the PLRA's wrong by fourteen years |
| PP-102 | **S2** | coverage | 3 parties (one fictitious), 115 of a wrong 128 | **7 parties, 77 of 80** | Added Yo Creo (3), PCN, PEN, PPQ and PPS (1 each) |
| PP-103 | **S2** | `noImageReason` | all three entries claimed no freely-licensed logo exists | **all seven now carry one** | Every one is on Commons; the ANR's and PLRA's are SVGs in the public domain |
| PP-104 | **S3** | `leader` | PLRA and "Hagamos" had none | **Alcides Riveros**, plus a leader for each new party | party infoboxes |

**Documented gap — 3 of the 80 seats are independents**, not a party.

All seven logos were downloaded from Commons, byte-checked against their extension, and
montage-verified. Paraguay's three entries have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE`.

---

### 🇺🇾 Uruguay — audited 2026-09-12

Uruguay had **one party**, and the most interesting defect in the sweep so far: a **fabricated
logo explainer**.

`UY-FA` carried a `logoMeaning` asserting that the Frente Amplio's emblem "features a red and white
color scheme", that "the red represents the socialist and social democratic values of the alliance,
while white symbolizes peace and democratic governance" — cited to the party's English Wikipedia
article, which says nothing of the kind. **The image is not red and white.** It is the Frente Amplio
flag: red, blue and white bands with a yellow FA monogram. So the text was not merely unsourced
(which the flag-meaning hard rule already forbids) — it described a picture that is not there, with
a citation that does not support it. Removed rather than rewritten: no source documents the emblem's
symbolism.

The Chamber of Representatives elected on 27 October 2024 seats **FA 48** (government) against an
opposition of 51: the **Coalición Republicana** 47 (Partido Nacional 29, Partido Colorado 17,
Partido Independiente 1), **Identidad Soberana** 2 and **Cabildo Abierto** 2.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-105 | **S1** | `logoMeaning` | fabricated symbolism, wrong about the image itself, cited to an article that does not contain it | **removed** | The flag-meaning hard rule: never fabricate, always cite. The emblem is red/blue/white with a yellow FA monogram |
| PP-106 | **S1** | `seatsTotal` | **130** | **99** | 130 is not a Uruguayan number at all — the Chamber has 99 representatives and the Senate 30 |
| PP-107 | **S1** | `chamberName` | "Chamber of Deputies" | **"Chamber of Representatives"** | Uruguay's lower house is the Cámara de Representantes |
| PP-108 | **S1** | `leader` | **Yamandú Orsi** | **Fernando Pereira** | Orsi is *President of Uruguay*; the Frente Amplio's own president is Pereira. The party's head of state was being shown as its party leader |
| PP-109 | **S1** | coverage | 1 party, 48 of a wrong 130 | **6 parties, 99 of 99 — exact** | Five of the six seated parties were absent, including the 29-seat Partido Nacional |
| PP-110 | **S2** | `timeInPower` | "2025-present" | a sentence naming the date and the event | The field is prose elsewhere in the dataset; a bare year range reads as a data artefact |
| PP-111 | **S3** | logo path | `party-logos/**UY**/…` | `party-logos/**uy**/…` | The only upper-case logo directory in the repository |
| PP-112 | **S3** | coalitions | none | **`UY-CR`** (Coalición Republicana, 3 members, 47 seats) | The Chamber's own grouping |

**Two non-free logos, declared.** Identidad Soberana's and Cabildo Abierto's emblems have no
freely-licensed file on Commons; both are bundled from the SVGs English Wikipedia hosts under a
fair-use rationale, each carrying a `licenceNote` stating the copyright position — the same
owner-directed position taken for the non-free football crests and passport covers. Note that
Spanish Wikipedia's Identidad Soberana infobox uses **a cropped photograph of the party's candidate**
in the logo slot; using it would have put a man's face on the card as a party emblem, which is
exactly the class of wrong-image bug the montage pass exists to catch.

All six logos were byte-checked against their extension and montage-verified. Uruguay's seats now
reconcile **exactly** — 99 of 99.

---

### 🇬🇾 Guyana — audited 2026-09-12

Guyana's three parties summed to **72 seats in a 65-seat chamber** — an arithmetically impossible
total sitting in production, and the third country in this sweep whose numbers could have been
falsified without leaving the dataset (after Singapore's 98-of-108 and Brazil's 515-of-513).

The 13th Parliament was elected on 1 September 2025: **PPP/C 36** (government), **WIN 16**,
**PNCR–APNU 12**, **Forward Guyana Movement 1**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-113 | **S1** | `seats` | PPP/C 43 + APNU 25 + AFC 4 = **72 of 65** | **PPP/C 36, WIN 16, PNCR 12 = 64 of 65** | The Assembly's own composition. The old figures were the 2020 Parliament's, and even then did not sum |
| PP-114 | **S1** | existence | **AFC** (Alliance For Change), 4 seats | **removed** | The AFC contested 2025 separately from APNU and won **no seats** |
| PP-115 | **S1** | existence | **APNU** as a party, 25 seats | replaced by **PNCR** (12) | APNU is a coalition, not a party; the 12 seats are the PNCR's, which the Assembly lists as "PNCR–APNU" |
| PP-116 | **S1** | coverage | **WIN** absent | **16 seats — the official opposition** | WIN was founded on 23 June 2025 and became the second-largest party in the chamber ten weeks later. Its leader, Azruddin Mohamed, is Leader of the Opposition |
| PP-117 | **S2** | `noImageReason` | all three claimed no freely-licensed logo exists | **all three now carry one** | Two are non-free (declared); the PNCR's is a CC BY-SA file on Commons |
| PP-118 | **S3** | `previousNames` | none | PPP (1950–1991); PNC (1957–1997) and PNC/R (1997–2001) | each party's own abbreviation history |

**Two non-free logos, declared.** The PPP/C's and WIN's emblems exist only as fair-use files on
English Wikipedia; both carry a `licenceNote` stating the copyright position, as for the non-free
football crests and passport covers.

**One judgement call, recorded.** The PNCR has no logo at all — its own Wikipedia infobox carries a
`flag` and an empty `logo` field — so the bundled image is the **party's flag** (red/black/green with
a palm tree in a white disc), which is the emblem the party itself uses. That is the party's own
symbol, not a national or coalition flag, so it is not the parent-flag-collision case; it is recorded
here so a later reviewer can see it was a decision rather than an accident.

**Documented gap — 1 of the 65 seats.** The **Forward Guyana Movement** has no article on any
Wikipedia, no logo file, and no sourceable founding year. Recorded, not hidden.

All three logos were byte-checked against their extension and montage-verified. Guyana's three
entries have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE`.

---

### 🇸🇷 Suriname — audited 2026-09-12

Suriname had **two entries, both wrong about who governs**. `SR-NF` — "Nieuw Front voor Democratie",
marked as **in power** with 20 seats — is a coalition that contested the elections of 1987 to 2005
and has not existed as a parliamentary force for two decades. Meanwhile the VHP, which really did
govern from 2020 to 2025, was marked **out** of power with the wrong seat count.

The 8th National Assembly was elected on 25 May 2025: **NDP 18**, **VHP 17**, **ABOP 6**, **NPS 6**,
**PL 2**, **BEP 1**, **A20 1**. Jennifer Geerlings-Simons (NDP) was inaugurated president on
16 July 2025, so the VHP moved to opposition.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-119 | **S1** | existence | **`SR-NF` "Nieuw Front voor Democratie", 20 seats, in power** | **removed** | A 1987 electoral coalition, not a party, and not a force in the Assembly since 2005 |
| PP-120 | **S1** | `inPower` | NF in power; VHP out | **NDP, ABOP, NPS, PL and BEP in power; VHP in opposition** | The Assembly's own Government/Opposition grouping |
| PP-121 | **S1** | coverage | 2 parties, 34 of 51 | **6 parties, 50 of 51** | Five of the seven seated parties were absent, including the governing **NDP** |
| PP-122 | **S2** | `seats` | VHP 14 | **17** | The VHP is the whole of the opposition |
| PP-123 | **S2** | `founded` | VHP **1961** | **1949** | The VHP dates from January 1949 |
| PP-124 | **S2** | `noImageReason` | both entries claimed no freely-licensed logo exists | **all six now carry one** | Two are on Commons in the public domain; three are non-free (declared) |
| PP-125 | **S3** | `leader` | neither entry had one | **four of the six do** | party infoboxes. The VHP's own infobox gives its chairman as "TBD", so it correctly has none |

**Three non-free logos, declared.** The VHP's, NPS's and BEP's emblems exist only as fair-use files on
English Wikipedia; each carries a `licenceNote` stating the copyright position.

**Documented gap — 1 of the 51 seats.** **Alternatief 2020** has no logo file on Commons or either
Wikipedia; its article's infobox `logo` field is empty. Recorded, not hidden.

All six logos were byte-checked against their extension and montage-verified. Suriname's two entries
have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE` — **which empties that list of every South American
entry.**

---

## Phase 3 complete — South America, all 11 countries

Every South American country has now been audited, fixed, merged and confirmed live. What the
continent looked like before this sweep:

* **Two countries carried arithmetically impossible seat totals** (Guyana 72 of 65; and Colombia's
  English-Wikipedia source was inconsistent three ways over).
* **Five countries contained entries for parties that do not exist** — Ecuador's "Unión Demócrata
  Cristiana" with 17 seats, Bolivia's "Arcistas por Bolivia" and "Unidad Movil", Paraguay's
  "Hagamos", Suriname's "Nieuw Front", Guyana's "APNU" as a party.
* **Three countries showed the wrong government or none at all** — Bolivia had no governing party
  while the PDC held the presidency; Suriname marked a defunct 1987 coalition as in power; Venezuela
  credited one party with every seat in the legislature.
* **Two countries had a chamber size that matches no real chamber** — Paraguay's 128, Uruguay's 130.
* **One carried a fabricated logo explainer** — Uruguay's, which described colours the image does
  not have.
* **Seven wrong logos were found and replaced across the continent**, every one a name or acronym
  collision, including the French UDI's logo on Chile's UDI and the Republican Party's on the
  Radicals.

Coverage went from 61 parties to 128; six of the eleven countries now reconcile exactly against
their chamber.

---

## Phase 4 — United Kingdom, United States, Canada

### 🇬🇧 United Kingdom — audited 2026-09-12

The UK had **one party**: Labour, with 412 seats, led by **Keir Starmer**, who has not been prime
minister since **20 July 2026**. Fourteen other parties sit in the Commons and none of them was in
the dataset — including the Official Opposition.

The 59th Parliament's current standing: **Labour 403** (government), **Conservative 118** (Official
Opposition), **Liberal Democrats 71**, **Reform UK 8**, **SNP 8**, **DUP 5**, **Green 5**,
**Independent Alliance 4**, **Plaid Cymru 4**, **SDLP 2**, **Your Party 2**, **Alliance 1**,
**Restore Britain 1**, **TUV 1**, **UUP 1**, 7 independents, the Speaker, **Sinn Féin 7**
(abstentionist) and 1 vacancy.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-126 | **S1** | `leader` | **Keir Starmer** | **Andy Burnham** | Burnham has led Labour and been prime minister since 20 July 2026 |
| PP-127 | **S1** | coverage | **1 party** | **15 parties, 637 of 650** | The Conservative Party — the Official Opposition, with 118 seats — was not in the dataset at all, nor were the Liberal Democrats' 71 |
| PP-128 | **S2** | `seats` | Labour **412** | **403** | 412 was the 2024 election night figure; by-elections, defections and suspensions have moved it |
| PP-129 | **S3** | `timeInPower` | absent detail | a sentence naming both the election and the change of prime minister | Labour has governed continuously since 4 July 2024 under two leaders |

**Three parties in this chamber did not exist when the dataset's Labour entry was written**, which is
a good measure of how far behind it had fallen: **Your Party** (founded 24 July 2025, 2 MPs),
**Restore Britain** (a pressure group from 30 June 2025, a registered party from 13 February 2026,
1 MP), and the Liberal Democrats' and SDLP's own articles have been refounded under 2025 titles.

**Sinn Féin is included, with its abstention stated.** Its seven MPs are elected but do not take
their seats; leaving the party out would misrepresent seven Northern Irish constituencies as
unrepresented, and including it silently would misrepresent the Commons arithmetic. The party's
source line says so explicitly.

**Documented gap — 13 of the 650 seats**: 7 independents, the 4-MP **Independent Alliance** (a
parliamentary grouping of independents rather than a registered party), the **Speaker** (who sits
apart from party), and **1 vacancy**.

**Eleven non-free logos, declared.** Only four UK party logos (Reform UK, SDLP, Your Party, Alliance)
are on Commons. The rest are English Wikipedia local files: eight under a fair-use rationale and
three (Conservative, SNP, UUP) held as public domain because the marks fall below the UK threshold of
originality. Each carries a `licenceNote` saying which of the two it is — the notes are not
interchangeable, and writing "fair use" over a public-domain file would be as wrong as the reverse.

All fifteen logos were montage-verified.

---

### 🇺🇸 United States — audited 2026-09-12

The United States had **two presidents at once**. `US-DEM` carried
`leader: "Kamala Harris", leaderTitle: "President (2025–present)"` and `US-REP` carried
`leader: "Donald Trump", leaderTitle: "President (2025–present)"`, and **both** were marked
`inPower: true` **and** `inExecutive: true` with `timeInPower: "2025-present"`. Two parties cannot
simultaneously hold the same single-occupant office, so this was not a stale fact that time
overtook — it was internally contradictory the day it was written. Kamala Harris has never been
president.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-130 | **S1** | `leader` / `leaderTitle` | **both parties' leaders titled "President (2025–present)"**; the Democratic one named **Kamala Harris** | **Donald Trump, "U.S. President"** for the Republicans; **Ken Martin, "Chair of the Democratic National Committee"** for the Democrats | Donald Trump has been president since 20 January 2025. Each party's own infobox: the Republicans list the president as their leader; the Democrats, holding no such office, list their DNC chair first |
| PP-131 | **S1** | `inPower` / `inExecutive` | **true on both parties** | **true on the Republicans only** | Only one party holds the presidency and the House majority |
| PP-132 | **S1** | `seats` | Democratic **222**, Republican **213** — the majority on the wrong side | **Republican 218, Democratic 214** | The House's own composition for the 119th Congress. The old figures reversed control of the chamber |
| PP-133 | **S2** | `logo` | 2016-era marks | the **2025** Democratic logo and the current GOP mark | Each party's own infobox image |
| PP-134 | **S3** | `ideology` | generic | copied from each party's own infobox | The Republican entry now records right-wing populism with a conservative faction; the Democratic, liberalism |

**A deliberate asymmetry, recorded.** American parties have no single "leader" post. English
Wikipedia's Republican infobox lists the **U.S. President** as the party's first leadership entry;
the Democratic infobox, with no such officeholder, leads with the **DNC chair**. The dataset follows
each source rather than forcing a symmetry neither party has.

**Documented gap — 3 of the 435 seats**: **2 vacancies** and **1 independent** (Kevin Kiley, elected
as a Republican, who caucuses with them but sits as an independent). No third party holds a House
seat, so the two entries are full coverage of the chamber's parties.

Both logos are public domain on Commons and were montage-verified.

---

### 🇨🇦 Canada — audited 2026-09-12

Canada had **one party**, led by a prime minister who left office in 2025, sitting in a House of
Commons that no longer has that many seats.

The 45th Parliament was elected on 28 April 2025 into a **343-seat** chamber (redistribution added
five seats): **Liberal 173** (government), **Conservative 138** (Official Opposition), **Bloc
Québécois 21**, **New Democratic 5**, **Green 1**, 5 vacancies.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-135 | **S1** | `leader` | **Justin Trudeau** | **Mark Carney** | Carney succeeded Trudeau as Liberal leader and prime minister in 2025 and won the April election |
| PP-136 | **S1** | `seatsTotal` | **338** | **343** | The 2022 redistribution raised the Commons from 338 to 343 seats, effective at the 2025 election |
| PP-137 | **S1** | `seats` | Liberal **160** | **173** | The Liberals' result at the 2025 election |
| PP-138 | **S1** | coverage | 1 party | **5 parties, 338 of 343** | The Conservative Party — the Official Opposition, with 138 seats — was absent, as were the Bloc, the NDP and the Greens |
| PP-139 | **S3** | `inExecutive` | absent | **true** on the Liberals | The party holds the government |

**Documented gap — 5 of the 343 seats are vacancies.** No other party holds a Commons seat, so these
five entries are full coverage of the chamber's parties.

**Two non-free logos, declared.** The Liberal Party's mark is a fair-use file on English Wikipedia;
the Bloc Québécois's is held there as public domain (below the threshold of originality). Each
carries the matching `licenceNote`. The Conservative, NDP and Green logos are on Commons.

All five logos were montage-verified.

---

## Phase 4 complete — United Kingdom, United States, Canada

Three of the world's most-viewed democracies, and all three were wrong in a way a reader would
notice immediately:

* **The UK** had one party and no opposition at all, led by a former prime minister.
* **The US** had **two simultaneous presidents**, one of whom has never held the office, and showed
  House control on the wrong side.
* **Canada** had one party, a prime minister who left in 2025, and a chamber size retired at the
  2025 election.

Coverage across the three went from **4 parties to 22**.

---

## Phase 5 — Europe

### 🇩🇪 Germany — audited 2026-09-12

Germany had **one party**: the CDU, with **258** seats — a figure that belongs to no Bundestag. The
CDU/CSU group won 208 seats in 2025 and the CDU's own share is **164**; 258 appears to conflate the
group with something else again.

The 21st Bundestag, elected 23 February 2025, has 630 seats: **Government (Merz cabinet) 328** —
CDU 164, CSU 44, SPD 120 — and **Opposition 302** — AfD 150, Greens 85, Die Linke 64, and 3
non-attached.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-140 | **S1** | `seats` | CDU **258** | **164** | The Bundestag's own composition. 258 matches neither the CDU nor the CDU/CSU group (208) |
| PP-141 | **S1** | coverage | 1 party | **6 parties, 627 of 630** | The **AfD**, the largest opposition party with 150 seats, was absent, as were the SPD — the CDU's own coalition partner, with 120 — the Greens, Die Linke and the CSU |
| PP-142 | **S2** | `inExecutive` | absent | **true** on the CDU, CSU and SPD | The three parties of the Merz cabinet |
| PP-143 | **S3** | coalitions | none | **`DE-GOV`** (CDU/CSU–SPD, 328 seats) | The Bundestag's own Government grouping |

**The CDU/CSU relationship is modelled explicitly rather than flattened.** They are two separate
parties that never contest each other's territory — the CSU stands only in Bavaria — and sit as a
single group in the Bundestag. Both are entered separately with their own seat counts, and the
`DE-GOV` coalition note explains the arrangement. Merging them into one "CDU/CSU" entry would have
hidden a real party; treating the group's 208 seats as the CDU's would have been the 258 error again.

**Documented gap — 3 of the 630 seats are non-attached members**, including the SSW's single
representative, who sits outside every group.

All six logos are public domain on Commons and were montage-verified.

---

### 🇫🇷 France — audited 2026-09-12

France had **one entry**, and it was not a party. `FR-ENSEMBLE` — "Ensemble pour la République",
250 seats, led by Gabriel Attal — is a **parliamentary group**, and its 250 seats belong to a
legislature that no longer exists: the group now holds 92.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-144 | **S1** | existence | a **parliamentary group** modelled as a party, with 250 seats | **13 parties** with their own seat counts | The Assembly's own composition gives a per-party breakdown inside each group; EPR now holds 92, of which Renaissance's own share is 87 |
| PP-145 | **S1** | coverage | 1 entry | **13 parties, 513 of 577** | The **Rassemblement National**, the largest single party in the chamber with 115 seats, was absent, as were LFI, the PS, LR and nine others |
| PP-146 | **S1** | `inExecutive` | **false** on the one entry marked `inPower: true` | **true** on Renaissance, MoDem and Horizons | The three parties of the second Lecornu government. An entry that is in power but in no executive describes nothing |
| PP-147 | **S3** | coalitions | none | **`FR-GOV`** (Renaissance, MoDem, Horizons — 162 seats) | The Assembly's own Government grouping |

**A modelling decision, recorded.** France's Assembly reports composition by **group**, and each
group contains several parties — the EPR group's 92 seats are Renaissance's 87 plus five deputies
from four other parties, and Les Républicains' 48 seats are split across three different groups. The
dataset models **parties**, not groups, because that is what the feature is, and because every party
has a logo where a group does not. Each party's seat figure is the sum of its own deputies across
every group, taken from the Assembly article's per-group breakdown. The `FR-GOV` coalition carries
the group-level picture, including the note that Les Républicains *support* the government without
being in it — the same reading applied in Indonesia and Peru.

**Documented gap — 64 of the 577 seats**: nine non-attached members, and deputies of the small
overseas, regional and miscellaneous-right/left groupings (DVD, DVG, Péyi-A, Tāvini, Tapura,
Caledonian Union, Place Publique, L'Après and some twenty others), most holding one or two seats and
many with no logo file anywhere.

**Four non-free logos, declared** (PS, Les Écologistes, Génération.s, L'Avenir Français); the other
nine are on Commons. All thirteen were montage-verified.

---

### 🇮🇹 Italy — audited 2026-09-12

Italy's six parties were the right six, but **Forza Italia was led by Silvio Berlusconi, who died in
June 2023** — the second deceased leader this sweep has found in production, after Vietnam's. Every
seat figure was also from the 2022 election night rather than the current chamber.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-148 | **S1** | `leader` | Forza Italia led by **Silvio Berlusconi** | **Antonio Tajani** | Berlusconi died on 12 June 2023; Tajani has been Forza Italia's national secretary since |
| PP-149 | **S1** | `seats` | FdI 115, PD 69, M5S 63, Lega **30**, FI 37, AVS 13 | **FdI 117, PD 68, M5S 48, Lega 57, FI 52, AVS 10** | The Chamber's own composition. The Lega figure was out by 27 seats and the M5S by 15 |
| PP-150 | **S2** | coverage | 6 parties, 327 of 400 | **12 parties, 389 of 400** | Added Azione (10), **Futuro Nazionale** (8), Italia Viva (7), Noi Moderati (7), SVP (3) and Più Europa (2) |
| PP-151 | **S2** | `founded` | Lega **1991** | **2017** | 1991 is Lega Nord's founding year; Lega per Salvini Premier is a distinct party registered on 14 December 2017 |
| PP-152 | **S2** | `inExecutive` | absent on all | **true** on FdI, Lega and Forza Italia | The three parties of the Meloni cabinet |
| PP-153 | **S3** | coalitions | none | **`IT-CDX`** (centre-right, 227 seats) | The Chamber's own Government grouping |

**Futuro Nazionale did not exist when the old entries were written** — Roberto Vannacci's party was
founded on 6 February 2026 and already holds 8 Chamber seats, more than Italia Viva or Noi Moderati.

**Noi Moderati is `inPower` but outside the coalition**, because the Chamber lists it under
*supported by* rather than as part of the government — the same confidence-and-supply reading applied
in Indonesia, Peru and France.

**Documented gap — 11 of the 400 seats**: the remaining Mixed-group deputies (Valdostan Union, the
Italian Radicals, Sardinian Progressives, DemoS, Christian Democracy with Rotondi and the
non-inscrits), each holding one or two seats.

**Seven non-free logos, declared**; five are on Commons. All twelve were montage-verified.

---

### 🇪🇸 Spain — audited 2026-09-12

Spain had **one party — and it was the opposition, marked as governing.** `ES-PP` carried
`inPower: true` with `inExecutive: false`, a combination that describes nothing: the People's Party
leads the **Opposition**, and the PSOE, which actually governs, was not in the dataset.

The Congress of Deputies, 350 seats: **Government 147** (PSOE 121, the Sumar group 26), **supported
by 24** (ERC 7, EH Bildu 6, PNV 5, Mixed 6), **Opposition 179** (PP 137, Vox 32, Junts 7, Mixed 3).

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-154 | **S1** | `inPower` | **true on the People's Party**, Spain's opposition, with `inExecutive: false` | **false on the PP**; true on the PSOE and its partners | The Congress's own Government/Opposition grouping. The PP has not held the premiership since 2018 |
| PP-155 | **S1** | coverage | 1 party | **14 parties, 346 of 350** | The **PSOE**, the governing party with 121 seats, was absent, as was **Vox** with 32, and eleven others |
| PP-156 | **S2** | `seats` | PP **136** | **137** | The Congress's own composition |
| PP-157 | **S3** | coalitions | none | **`ES-GOV`** (PSOE + the five Sumar-group parties) | The Congress's own Government grouping |

**The Sumar group is unpacked into its parties.** Its 26 seats belong to six different parties —
Movimiento Sumar 11, Catalunya en Comú 6, Izquierda Unida 5, Más Madrid 2, Compromís 1, Més per
Mallorca 1 — so each is entered with its own count rather than the group's, the same treatment given
to France's parliamentary groups.

**Five parties are `inPower` without being in the coalition**: ERC, EH Bildu, the PNV and the BNG
support the government on confidence and supply without cabinet office. Podemos, which left the
government bloc, is recorded out of power. The same reading as Indonesia, Peru, France and Italy.

**Documented gap — 4 of the 350 seats**: Més per Mallorca, Navarrese People's Union, Coalición
Canaria and one further Mixed-group deputy, each holding a single seat.

All fourteen logos are on Commons and were montage-verified.

---

### 🇵🇱 Poland — audited 2026-09-12

Poland had **one party, and it was the fourth-largest member of the governing coalition** — the PSL,
with 28 of the Sejm's 460 seats. The Civic Coalition, which leads the government with 153, and Law
and Justice, the opposition with 140, were both absent.

The Sejm: **Government (Tusk III) 239** — KO 156, Polish Coalition 32, The Left 21, Centre Union 15,
Poland 2050 15 — **supported by 4**, **Opposition 217** — PiS 146, Development Plus 41,
Confederation 16, Razem 4, Direct Democracy 4.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-158 | **S1** | coverage | 1 party — a junior coalition partner | **11 parties, 433 of 460** | The **Civic Coalition** (153) and **Law and Justice** (140) were both absent: the party of the prime minister and the party of the opposition |
| PP-159 | **S2** | `seats` | PSL **30** | **28** | The Sejm's own composition; the Polish Coalition group's 32 seats include three Centre for Poland deputies and one independent |
| PP-160 | **S2** | `inExecutive` | absent | **true** on the five coalition parties | The Tusk III cabinet |
| PP-161 | **S3** | coalitions | none | **`PL-GOV`** (239 seats) | The Sejm's own Government grouping |

**Two parties in this Sejm are younger than the dataset entry they were missing from.** **Development
Plus** — Mateusz Morawiecki's party, now the second-largest opposition force with 40 seats — was
founded on 15 April 2026, and the **Centre Union** became a registered party on 12 July 2026, two
months before this audit. Both are in the chamber today.

**The Confederation group is unpacked**: its 16 seats are New Hope's 8 and the National Movement's 7,
two distinct parties, entered separately.

**Documented gap — 27 of the 460 seats**: the Direct Democracy group (Kukiz'15 and others), Centre
for Poland, the Greens, AGROunia, Free Republicans, and the independents and non-aligned deputies
spread across the government and opposition groups.

**Three non-free logos, declared** (New Hope and Odnowa under fair use, the Centre Union as a local
public-domain file); the other eight are on Commons. All eleven were montage-verified.

---

### 🌍 Rule change and cross-country logo backfill — 2026-09-12

**The owner directed that the mandatory-logo rule be relaxed from a MUST to a SHOULD**, that the
parties it had kept out be added back, and that the logo search be widened beyond Wikimedia to the
regional *Elects* network (EuropeElects, AsiaElects, AfricaElects, OceaniaElects, LatamElects) and
the parties' own sites. All three are done, and `CLAUDE.md` now carries the rewritten rule.

**Why the old rule was wrong.** `GRANDFATHERED_PARTIES_WITH_NO_IMAGE` failed the build on any party
added after 2026-09-08 without a bundled logo. It did not produce better images; it produced
**missing parties** — and an omission the reader cannot see makes an incomplete chamber look
complete, which is the Torres Strait Islander Flag lesson in a new place. The gate now enforces the
RESEARCH: `noImageReason` is allowed on any party, but must be ≥60 characters and must name at least
two of eight searched source families. `founded` became optional for the same reason.

| ID | Sev | What | Outcome |
|---|---|---|---|
| PP-162 | **S1** | The mandatory-logo gate | Replaced by a research gate. `GRANDFATHERED_PARTIES_WITH_NO_IMAGE` deleted; `NO_IMAGE_SOURCE_FAMILIES` + a 60-character floor replace it |
| PP-163 | **S1** | `founded` was mandatory | Now optional; `PoliticalPartyFacts` omits the row rather than rendering `undefined` |
| PP-164 | **S1** | **13 real, seated parties were missing** purely for want of a logo or a founding year | **All 13 added** — see the table below |
| PP-165 | **S1** | **`DK-F` "Free Democrats" (Denmark), 50 seats** | **Removed — the party does not exist.** Its cited article `Free Democrats (Denmark)` is *missing* on Wikipedia. Deleting it also fixes Denmark's impossible **197-of-179** total, which drops to 147/179 |
| PP-166 | **S2** | 58 parties carried `noImageReason` | **39 now have a real, montage-verified logo**; the remaining 19 carry a reason naming what was swept |

**The 13 parties restored** (every one holds seats):

| Country | Party | Seats | Logo? |
|---|---|---|---|
| 🇨🇴 Colombia | Partido Demócrata Colombiano | 3 | ✅ (no founding year — none is sourceable) |
| 🇨🇴 Colombia | Colombia Renaciente | 2 | ✅ |
| 🇨🇴 Colombia | La Fuerza de las Regiones | 1 | ✅ |
| 🇨🇴 Colombia | Unidad en Minga por Colombia | 1 | ✅ |
| 🇻🇪 Venezuela | Vamos, Vamos Cojedes | 5 | — social-media only |
| 🇨🇱 Chile | Federación Regionalista Verde Social | 2 | — empty infobox image field |
| 🇧🇴 Bolivia | Consejo Indígena Yuqui Bia Recuate | 1 | ✅ (no founding year) |
| 🇬🇾 Guyana | Forward Guyana Movement | 1 | — no article anywhere |
| 🇸🇷 Suriname | Alternatief 2020 | 1 | — empty infobox logo field |
| 🇵🇭 Philippines | Centrist Democratic Party | 1 | — infobox logo field is the broken literal `200px` |
| 🇵🇭 Philippines | Partido Navoteño | 1 | — no logo field |
| 🇹🇭 Thailand | New Dimension Party | 1 | — no article anywhere |
| 🇹🇭 Thailand | Thai Sup Thawee Party | 1 | — no article anywhere |

**Four countries now reconcile EXACTLY** as a result: Bolivia **130/130**, Guyana **65/65**,
Suriname **51/51**, Argentina **257/257**.

**The country constraint is the whole game.** The first backfill pass matched parties by NAME against
Wikidata and produced precisely the collisions this repository exists to prevent — **Spain's Vox on
an Argentine bloc; Romania's Social Democrats on both Korea's and Nigeria's; Sweden's Vänsterpartiet
on Norway's SV; Finland's Keskusta on Norway's Sp; the German Greens on Norway's MDG; the
Netherlands' SP on Portugal's PS; a photograph of a politician, the Buenos Aires Underground logo and
the flag of Argentina** on three more. Re-running it as a SPARQL query constrained by `P17` (country)
and accepting only exact name/alias matches removed every one. That constraint is now written into
`CLAUDE.md` rule 2.

**And the montage caught three that survived every mechanical check**: Open Vld resolved to a bare
blue circle, **Vlaams Belang got the logo of Vlaams Blok** — the banned predecessor it replaced in
2004 — and "Party of Life" got Reiwa Shinsengumi's. All three were corrected by hand.

**Logos added, by country**: Belgium 9, Norway 9, Denmark 7, Switzerland 3, Argentina 3, Greece 2,
Portugal 2, Thailand 3, Japan 1, Kenya 1, South Korea 1, plus the four Colombian and one Bolivian
re-adds. 44 in total, every one montage-verified.

**Two findings logged for the countries they belong to** (not fixed here — they need their own
audit): **Belgium's SP.a renamed itself Vooruit** and **Open Vld renamed itself Anders**, so both
cards now show a logo whose wordmark does not match the `shortName` beside it. **Norway's seats sum
to 191 of 169** — another impossible total, waiting for the Norway audit.

---

### 🇳🇱 Netherlands — audited 2026-09-12

The Netherlands held five parties on the **2023** election result, with the VVD led by **Derk Jan
Eppink** — who is a **JA21/FvD** politician, not a VVD one, the same wrong-party-leader defect found
in Colombia. Every seat figure was superseded by the 29 October 2025 election, and the party that now
leads the government was carried as an opposition entry.

The House of Representatives, 150 seats: **Government (Jetten cabinet) 66** — D66 26, VVD 22,
CDA 18 — and **Opposition 84**, led by Progressief Nederland's 20 and the PVV's 19.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-167 | **S1** | `leader` | VVD led by **Derk Jan Eppink** | **Dilan Yeşilgöz** | Eppink is a JA21 politician; the VVD's leader is Yeşilgöz. A leader attached to the wrong party, as in Colombia |
| PP-168 | **S1** | `seats` | VVD 35, PVV 37, CDA 27, SP 25, D66 21 | **VVD 22, PVV 19, CDA 18, SP 3, D66 26** | The chamber's own composition. The **SP fell from 25 to 3** and the PVV from 37 to 19 |
| PP-169 | **S1** | `inPower` | VVD, PVV, CDA and D66 all in power; none in the executive | **D66, VVD and CDA in power and in the executive; the PVV in opposition** | The PVV left government in 2024 and is now the second-largest opposition party |
| PP-170 | **S2** | coverage | 5 parties, 145 of a chamber whose seats they no longer hold | **15 parties, 142 of 150** | Ten seated parties were absent, including **Progressief Nederland**, the largest opposition party with 20 seats |
| PP-171 | **S3** | coalitions | none | **`NL-GOV`** (D66 + VVD + CDA, 66 seats — a minority government) | The chamber's own Government grouping |

**Progressief Nederland did not exist under that name when the old entries were written**: the
GroenLinks–PvdA alliance became a single party on 1 July 2026, and the entry records the previous
name. Rob Jetten (D66) has been prime minister since 23 February 2026.

**Documented gap — 8 of the 150 seats**: the **Markuszower Group** (7) and the **Keijzer Group** (1),
both splinter groups of deputies rather than registered parties.

**Fifteen orphan logo files** were already sitting in `public/party-logos/nl/` from an earlier PR,
unreferenced by any entry. They have been replaced with a freshly fetched, montage-verified set.

**Two non-free logos, declared** (Progressief Nederland, PVV); the other thirteen are on Commons.

---

### 🇧🇪 Belgium — audited 2026-09-12

Belgium's nine parties included **two that have since renamed themselves**, which the logo backfill
had already flagged: the cards read **SP.a** and **Open Vld** while the logos beside them read
**Vooruit** and **Anders**. Three seated parties were missing, and `inPower` described the previous
government rather than the De Wever coalition sworn in on 3 February 2025.

The Chamber, 150 seats: **Government 80** — N-VA 23, MR 18, Les Engagés 15, Vooruit 13, CD&V 11 —
one supporting independent, **Opposition 69** — VB 20, PS 16, PVDA-PTB 15, Anders 8, Groen 6,
Ecolo 3, DéFI 1.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-172 | **S1** | party identity | **SP.a** and **Open Vld** | **Vooruit** (renamed 2021) and **Anders** (renamed 19 January 2026) | Both parties' own articles. The previous names are preserved in `previousNames` |
| PP-173 | **S1** | `inPower` | MR, PS and N-VA in power; none in the executive | **N-VA, MR, Les Engagés, Vooruit and CD&V**; the **PS in opposition** | The De Wever cabinet formed 3 February 2025. The PS was in the previous government and is now the second-largest opposition party |
| PP-174 | **S1** | coverage | 9 parties | **12 parties, 149 of 150** | **Les Engagés** (15 seats, a governing party), **Groen** (6) and **DéFI** (1) were absent |
| PP-175 | **S2** | `seats` | VB 22, MR 20, N-VA 22 | **VB 20, MR 18, N-VA 23** | The Chamber's own composition |
| PP-176 | **S2** | `founded` | MR **2011**, Ecolo **1981** | **2002, 1980** | Each party's own article |
| PP-177 | **S3** | coalitions | none | **`BE-GOV`** (the five-party "Arizona" coalition, 80 seats) | The Chamber's own Government grouping |

**Documented gap — 1 of the 150 seats**: the independent deputy who supports the government without
belonging to a party.

**Three non-free logos, declared** (Vlaams Belang, Les Engagés, DéFI); the other nine are on Commons.
All twelve were montage-verified — and Vlaams Belang's is the file corrected by hand in the backfill,
after the automated pass had handed it the logo of **Vlaams Blok**, the banned predecessor party it
replaced in 2004.

---

### 🇳🇴 Norway — audited 2026-09-12

Norway's nine parties summed to **191 seats in a 169-seat Storting** — the fourth impossible total
this sweep has found, flagged during the 2026-09-12 logo backfill. Every seat figure and **eight of
the nine leaders** were superseded by the September 2025 election.

The Storting: **Government 53** — Labour alone, as a minority — **supported by 35** (Socialist Left
9, Centre 9, Red 9, Green 8), **Opposition 81** (Progress 47, Conservative 24, Christian Democratic
7, Liberal 3).

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-178 | **S1** | `seats` | 48, 45, 36, 13, 13, 12, 8, 8, 8 = **191 of 169** | 53, 47, 24, 9, 9, 9, 8, 7, 3 = **169 of 169 exactly** | The Storting's own composition |
| PP-179 | **S1** | the chamber's shape | Conservative 45, Progress 36 | **Progress 47, Conservative 24** | The 2025 election turned the Progress Party into the largest opposition party and **halved the Conservatives**. The old figures had them the other way round |
| PP-180 | **S1** | `leader` | **eight of nine wrong** — Støre, Solberg, Listhaug, Lysbakken, Moxnes, Hansson, Ropstad … | Brenna, Søviknes, Eriksen Søreide, Bergstø, Sneve Martinussen, Liland, Ulstein … | Each party's own article. Only the Centre Party's Trygve Slagsvold Vedum was still correct |
| PP-181 | **S1** | `inPower` | Labour **and the Centre Party** in government | **Labour alone in the executive**; Socialist Left, Centre, Red and Green in power as confidence-and-supply | The Centre Party left the government in early 2025; Labour has governed as a minority since |
| PP-182 | **S2** | `founded` | Red Party **1990** | **2007** | 1990 is its predecessor's year; the Red Party was founded 11 March 2007 |
| PP-183 | **S2** | `chamberName` | "Parliament" | **"Storting"** | The chamber's own name |

**Jonas Gahr Støre is still prime minister** — he was the one leadership fact the entry had right,
but it was attached to the wrong field: he had been recorded as Labour's *party* leader, which is now
Tonje Brenna.

All nine logos were added in the 2026-09-12 backfill and montage-verified. Norway is the fifth
country in this sweep to reconcile **exactly**.

---

### 🇸🇪 Sweden — audited 2026-09-12

Sweden held **four parties covering 236 of 349 seats**, on figures from the 2022 election, with the
governing coalition's two junior partners and the entire left of the chamber absent. The Social
Democrats — the largest party in the Riksdag, with 106 seats — were carried at **67**.

The Riksdag: **Government 103** (Moderates 66, Christian Democrats 19, Liberals 16, two non-attached
Sweden Democrats), **supported by 73** (Sweden Democrats 70, Ambition Sweden 2, one Christian
Democrat), **Opposition 173** (Social Democrats 106, Centre 24, Left 21, Green 18, Future Left 3,
Unity 1).

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-184 | **S1** | `seats` | S 67, M 68, SD 73, V 28 | **S 106, SD 72, M 66, V 21** | The Riksdag's own composition. The Social Democrats were understated by **39 seats** |
| PP-185 | **S1** | coverage | 4 parties, 236 of 349 | **11 parties, 349 of 349 — exact** | The **Christian Democrats** and **Liberals**, both in government, were absent, as were the Centre and Green parties and three parties founded in 2025 |
| PP-186 | **S1** | `leader` | S led by **Magdalena Andersson**, SD by **Jimmie Åkesson**, V by **Nooshi Dadgostar** | **Lena Hallengren, Mattias Bäckström Johansson, Samuel Gonzalez Westling** | Each party's own article. Only the Moderates' Ulf Kristersson was still correct |
| PP-187 | **S1** | `inPower` | **Moderates only**, with the Sweden Democrats out of power | Moderates, Christian Democrats and Liberals in the executive; **Sweden Democrats and Ambition Sweden in power** on confidence and supply | The Tidö Agreement: the SD is the government's largest supporting party and was recorded as opposition |
| PP-188 | **S2** | `founded` | Centre Party absent; V **1917** | 1913; V **1917** confirmed | party infoboxes |
| PP-189 | **S3** | coalitions | none | **`SE-GOV`** (the Tidö coalition, 103 seats) | The Riksdag's own Government grouping |

**Three parties in this Riksdag were founded in 2025** and could not have been in the old entries:
**Ambition Sweden** (June 2025, 2 seats, supporting the government), **Unity** (August 2025, 1) and
**Future Left** (December 2025, 3).

**Seven non-free logos, declared**; four are on Commons. All eleven were montage-verified. Sweden is
the sixth country in this sweep to reconcile **exactly**.

---

### 🇩🇰 Denmark — audited 2026-09-12

Denmark's headline defect was already fixed during the 2026-09-12 rule change: **`DK-F` "Free
Democrats", credited with 50 of 179 seats, is a party that does not exist** — its cited Wikipedia
article is missing — and removing it dropped Denmark's impossible **197-of-179** total to 147. This
audit finishes the country on the 24 March 2026 election.

The Folketing: **Government (Frederiksen III) 82** — Social Democrats 38, Green Left 20, Moderates
14, Social Liberals 10 — **supported by 20**, **Opposition 77** — Venstre 18, Danish People's 16,
Liberal Alliance 15, Conservatives 13, Denmark Democrats 10, Citizens' 1, 4 independents.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-190 | **S1** | `leader` | Nye Borgerlige led by **Rasmus Paludan** | n/a — the party no longer sits | Paludan leads **Stram Kurs**, a different party entirely. A leader attached to the wrong party, as in Colombia and the Netherlands |
| PP-191 | **S1** | `leader` | Venstre led by **Jakob Ellemann-Jensen**; Alternativet by **Uffe Elbæk** | **Troels Lund Poulsen**; **Franciska Rosenkilde** | Ellemann-Jensen left politics in 2023; Elbæk stood down in 2020 |
| PP-192 | **S1** | party identity | **SF — Socialistisk Folkeparti** | **Grønne Venstre (Green Left)** | The party renamed in 2025; the old name is preserved in `previousNames` |
| PP-193 | **S1** | `seats` | S 52, V 43, SF 15, Å 13, M 12, DF 8, NY 4 | **S 38, Green Left 20, V 18, DF 16, LA 15, M 14, KF 13, Ø 11, B 10, DD 10, Å 5, BP 1** | The Folketing's own composition after the 24 March 2026 election |
| PP-194 | **S1** | coverage | 7 parties (one fictitious), 147 of 179 | **12 parties, 171 of 179** | Six seated parties were absent, including the **Liberal Alliance** (15), the **Conservatives** (13) and the **Red–Green Alliance** (11) |
| PP-195 | **S2** | `inPower` | S, SF and M in power; none in the executive | **S, Green Left, Moderates and Social Liberals in the executive**; the Red–Green Alliance and the Alternative in power on confidence and supply | The Frederiksen III cabinet |
| PP-196 | **S2** | `founded` | Å **2013** ✓, NY 2017 | Alternativet 2013 confirmed; Citizens' Party **2024**, Denmark Democrats **2022** | party infoboxes |
| PP-197 | **S4** | logo hygiene | **three stray `.sha256` text files and four duplicate/orphan logos** in `public/party-logos/dk/` | removed | Not images; they were being shipped to users' browsers as part of the static site — the same defect found in Chile and Colombia |
| PP-198 | **S3** | coalitions | none | **`DK-GOV`** (Frederiksen III, 82 seats — a minority government) | The Folketing's own Government grouping |

**Documented gap — 8 of the 179 seats**: the **four North Atlantic members** (two Faroese, two
Greenlandic, elected on their own islands' party lists) and **four independents**.

All twelve logos are public domain on Commons and were montage-verified.

---

### 🇮🇪 Ireland — audited 2026-09-12

**Every one of Ireland's three logo files was a Wikimedia error page, not an image.**
`fianna-fail.svg`, `fine-gael.svg` and `sinn-fein.svg` were each 2,256 bytes of
`<!DOCTYPE html><title>Wikimedia Error</title>…` saved under an `.svg` extension. All three
were shipping to users, and all three rendered broken — the whole country's grid was empty
boxes. This is the same class as Timor-Leste's audio file and Indonesia's wrong-company logo,
and it is why `getlogo.mjs` now refuses any download whose first bytes are HTML.

The Dáil was also the wrong size. The **Electoral (Amendment) Act 2023 raised the Dáil from 160
to 174 seats** for the 2024 general election; the entries still carried `seatsTotal: 160`, so
every percentage the widget rendered was computed against a chamber that no longer exists.

The 34th Dáil, 174 seats: **Government 90** — Fianna Fáil 48, Fine Gael 38, independents 4 —
**supported by 3** independents, **Opposition 80** — Sinn Féin 39, Social Democrats 12, Labour
11, Independent Ireland 4, PBP–Solidarity 3, Aontú 2, Green Party 1, 100% Redress 1,
independents 7 — plus the Ceann Comhairle.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-199 | **S1** | `logo` | **all three files were Wikimedia HTML error pages** saved as `.svg` | ten real, montage-verified logos | The bundled bytes begin `<!DOCTYPE html>`; a browser renders nothing. Verified by reading the files, then by re-rendering the replacements |
| PP-200 | **S1** | `seatsTotal` | **160** | **174** | The Dáil was enlarged by the Electoral (Amendment) Act 2023 and 174 TDs were returned on 29 November 2024 |
| PP-201 | **S1** | `seats` | FF **78**, FG 37, SF 37 | **FF 48, SF 39, FG 38** | The 34th Dáil's own composition table. Fianna Fáil was overstated by 30 seats — more than the entire Fine Gael parliamentary party |
| PP-202 | **S3** | coverage | 3 parties, 152 seats | **10 parties, 159 of 174** | Seven seated parties were absent: the Social Democrats (12), Labour (11), Independent Ireland (4), PBP–Solidarity (3), Aontú (2), the Green Party (1) and 100% Redress (1) |
| PP-203 | **S2** | `inPower` / `inExecutive` | FF and FG in power, **`inExecutive` absent on both** | `inExecutive: true` on Fianna Fáil and Fine Gael | The 35th government, formed 23 January 2025, is an FF–FG coalition; its independent supporters hold office only at minister-of-state rank. This closes defect **B6** for Ireland |
| PP-204 | **S2** | `leaderTitle` | all three "Party Leader" | **"Leader"** for Fianna Fáil, Fine Gael, the Social Democrats, Labour, Independent Ireland, Aontú and the Greens; **"President"** for Sinn Féin; **"Chairperson"** for 100% Redress | Each party's own infobox. Sinn Féin's leader holds the office of *President*, not "Party Leader" |
| PP-205 | **S6** | `positionRaw` / `ideologyPosition` | FF "Centre-right"; SF "Left-wing" | FF **"Centre to centre-right"**; SF **"Centre-left to left-wing"** | Each party's cited position, copied verbatim rather than flattened |
| PP-206 | **S3** | coalitions | none | **`IE-GOV`** (the 35th government, Fianna Fáil + Fine Gael) | The government's own article |

**A leader field left deliberately empty.** People Before Profit–Solidarity's infobox gives its
leader as *"Collective leadership"* — a description, not a person. Following the Thailand lesson
(**PP-028**, a 130-character sentence rendered to users as a leader's name), the field is omitted
rather than filled with prose.

**Documented gap — 15 of the 174 seats**: **14 independents** and the **Ceann Comhairle**, who by
convention sits apart from party politics. Neither is a party.

**Aontú is `other`, not a point on the left–right axis.** Its own cited position is *"Fiscal:
left-wing; social: right-wing"* — two positions, not a range — so flattening it to either would
misstate the source. `other` is what that field is for.

**Six logos are on Commons; four (Fine Gael, Sinn Féin, PBP–Solidarity, Aontú) are non-free files
held on English Wikipedia and are declared with `licenceNote`s.** All ten were montage-verified
before bundling.

---

### 🇵🇹 Portugal — audited 2026-09-12

Portugal held **two parties**, and the one marked as governing has been in opposition since April
2024. **`PT-PS` carried 120 seats; the Socialist Party holds 58** — overstated by 62, more than the
entire Chega parliamentary party. The governing Social Democrats, with 89, were not in the dataset
at all.

The Assembly of the Republic, 230 seats, after the 18 May 2025 election: **Government (XXV
Constitutional) 91** — PSD 89, CDS–PP 2 — **Opposition 139** — Chega 60, PS 58, IL 9, LIVRE 6,
PCP 3, BE 1, PAN 1, JPP 1.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-207 | **S1** | `seats` | PS **120**, BE **12** | **PS 58, BE 1** | The Assembly's own composition after the 18 May 2025 election. Both figures predate two general elections |
| PP-208 | **S1** | `inPower` | **PS true** | **false**; PSD and CDS–PP true and `inExecutive` | The Socialist Party left office in April 2024. The XXV Constitutional Government, formed 5 June 2025, is a PSD–CDS–PP minority coalition under Luís Montenegro |
| PP-209 | **S1** | `leader` | PS **Pedro Nuno Santos**; BE **Mariana Mortágua** | **José Luís Carneiro**; **José Manuel Pureza** | Santos resigned after the May 2025 defeat; each party's own infobox |
| PP-210 | **S3** | coverage | 2 parties, 132 of 230 | **10 parties, 230 of 230 exactly** | Eight seated parties were absent, including the governing **PSD (89)** and **Chega (60)** |
| PP-211 | **S2** | `founded` | BE **1997** | **1999** | The Left Bloc's own infobox: founded 28 February 1999 |
| PP-212 | **S2** | `leaderTitle` | "Party Leader" on both | **President** (PSD, Chega, IL, CDS–PP, JPP), **Secretary-General** (PS), **General Secretary** (PCP), **Coordinator of the Political Commission** (BE), **Spokespersons** (LIVRE) | Portuguese parties do not share one leadership office, and the widget renders the title verbatim |
| PP-213 | **S3** | coalitions | none | **`PT-GOV`** (XXV Constitutional Government, 91 of 230 — a minority coalition) | The government's own article |
| PP-214 | **S6** | `ideology`, `positionRaw` | PS "Social democracy / Progressivism / Pro-EU", position "Centre-left"; BE position "Left" | each party's cited list and position, verbatim (BE: "Left-wing to far-left") | Flattened ranges restored to the source's own wording |

**Chega is now the largest opposition party**, at 60 seats against the Socialists' 58 — the first
time since the Carnation Revolution that neither PS nor PSD leads the opposition. The old two-party
dataset could not express that at all.

**Documented gap — none.** Portugal is the **seventh country in this sweep to reconcile exactly**:
all 230 seats belong to one of the ten parties, with no independents and no unmodelled groups.

**A logo double-checked because it looked wrong.** LIVRE's emblem is a red poppy with a black,
paw-like centre, which reads at thumbnail size like an animal-rights symbol rather than a green
party's. It was confirmed against **two independent infoboxes** — English Wikipedia's
`Logo of the LIVRE.svg` and Portuguese Wikipedia's `Partido LIVRE logo.png` — which carry the same
design from different uploads. Six logos are on Commons; four (Chega, PS, PAN, JPP) are non-free
files held on English Wikipedia and are declared with `licenceNote`s. All ten were montage-verified.

---

### 🇱🇺 Luxembourg — audited 2026-09-12

Luxembourg's three parties carried **three leaders, and two of them lead a different party**. `LU-CSV`
was led by **Claude Haagen**, an LSAP politician, and `LU-LSAP` by **François Benoy**, a co-leader of
the Greens — the same wrong-party-leader defect found in Colombia, the Netherlands and Denmark, but
twice in one country of three entries. Every seat figure was also wrong, and the opposition's largest
party was marked as governing.

The Chamber of Deputies, 60 seats: **Government (Frieden-Bettel) 35** — CSV 21, DP 14 —
**Opposition 25** — LSAP 12, ADR 5, Greens 4, Pirates 2, The Left 2.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-220 | **S1** | `leader` | CSV led by **Claude Haagen**; LSAP by **François Benoy** | **Luc Frieden**; **Georges Engel and Maxime Miltgen** | Haagen is an LSAP politician and Benoy a Green co-leader. Frieden has been CSV president — and prime minister — since 2023 |
| PP-221 | **S1** | `seats` | DP **21**, CSV **13**, LSAP **10** | **CSV 21, DP 14, LSAP 12** | The Chamber's own composition after the 8 October 2023 election. The 21 belonged to the CSV, not the DP — the two largest parties' figures were swapped |
| PP-222 | **S1** | `inPower` | all three true | **CSV and DP true and `inExecutive`; LSAP false** | The LSAP left government in 2023 and is the largest opposition party |
| PP-223 | **S3** | coverage | 3 parties, 44 of 60 | **7 parties, 60 of 60 exactly** | Four seated parties were absent: the ADR (5), the Greens (4), the Pirates (2) and The Left (2) |
| PP-224 | **S2** | `leaderTitle` | absent | **President** (CSV), **Leader** (DP, ADR), **Presidents** (LSAP), **Co-leaders** (Greens), **Spokespersons** (Pirates) | Each party's own infobox |
| PP-225 | **S3** | coalitions | none | **`LU-GOV`** (Frieden-Bettel, 35 of 60) | The Chamber's own Government grouping |

**A leader field left deliberately empty.** Déi Lénk's infobox gives its leader as *"Collective
leadership"* — a description, not a person — so the field is omitted, as for Ireland's PBP–Solidarity
and Portugal's PAN.

**The Pirates are `other`, not a point on the left–right axis.** Their cited position is *"Syncretic"*,
which is what that bucket is for.

**Documented gap — none.** Luxembourg is the **eighth country in this sweep to reconcile exactly**.

All seven logos are on Commons and were montage-verified; the CSV, DP and LSAP files were the three
recovered hours earlier in the cross-country broken-image sweep below, where they were Wikimedia error
pages.

---

### 🇨🇭 Switzerland — audited 2026-09-12

Switzerland's three parties were led by **Karin Keller-Sutter** (recorded as leading the Social
Democrats — she is an **FDP** federal councillor, and was President of the Confederation in 2025),
**Marco Chiesa** (SVP president until 2024) and **Beatrice Kappeler** (a journalist, not an FDP
office-holder). All three were also marked `inPower: true` with **`inExecutive: false`** — a
combination that describes nothing, and one that is especially wrong here, because Switzerland's
executive is the one place in this dataset where "in power" is a permanent, structural fact.

The National Council, 200 seats: **SVP 62, SP 41, The Centre 29, FDP 28, Greens 23, GLP 10, MCG 2,
EVP 2, EDU 2, Ticino League 1.**

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-226 | **S1** | `leader` | SP led by **Karin Keller-Sutter**; SVP by **Marco Chiesa**; FDP by **Beatrice Kappeler** | **Cédric Wermuth and Mattea Meyer**; **Marcel Dettling**; **Susanne Vincenz-Stauffacher and Benjamin Mühlemann** | Keller-Sutter is an FDP federal councillor, not the SP's leader — the wrong-party-leader defect again, and this time across the political divide |
| PP-227 | **S1** | `inPower` / `inExecutive` | three parties in power, **none in the executive** | **SVP, SP, FDP and The Centre in the executive**; the other six out of power | The Federal Council is a permanent grand coalition holding 2–2–2–1 under the 1959 Zauberformel |
| PP-228 | **S2** | `seats` | SP **43**, FDP **29** | **41**, **28** | The National Council's own composition after the 22 October 2023 election |
| PP-229 | **S3** | coverage | 3 parties, 134 of 200 | **10 parties, 200 of 200 exactly** | Seven seated parties were absent, including **The Centre (29)**, a governing party, and the **Greens (23)** |
| PP-230 | **S3** | coalitions | none | **`CH-FC`** (the Federal Council, 4 parties, 7 seats) | Recorded with a note that this is *not* a government formed after an election |
| PP-231 | **S6** | `positionRaw` | SVP "Right-wing"; SP "Centre-left"; FDP "Centre-right" | each party's cited position verbatim (SVP **"Right-wing to far-right"**, FDP **"Centre to centre-right"**) | Flattened ranges restored |

**Switzerland's `inPower` means something different, and the coalition entry says so.** Everywhere
else in this dataset a governing coalition is formed after an election and falls with it. The Federal
Council is a standing, voluntary grand coalition of the four largest parties that does not change when
the National Council does, so `timeInPower` records the concordance rather than a date, and `CH-FC`
carries a note explaining it. Modelling it as an ordinary cabinet would misstate how the country works.

**The Evangelical People's Party is `other`**, like Ireland's Aontú: its own cited position is two
positions, *"Economic: centre to centre-left; social: centre-right"*, not a range.

**One honest gap.** The **Ticino League** has no bundled emblem: Commons holds no logo file for it (a
namespace-6 search returns only seating diagrams), its article's infobox carries no `logo` parameter
at all, and Wikidata records no P154 image on its item under Switzerland. Listed with a
`noImageReason` rather than dropped — and rather than shown a canton flag it does not own.

**Documented gap — none on seats.** Switzerland is the **ninth country in this sweep to reconcile
exactly**. Seven logos are on Commons; two (the Greens and the EVP) are non-free files on English
Wikipedia and are declared. All nine were montage-verified.

---

### 🇦🇹 Austria — audited 2026-09-12

Austria had **two** parties, and the one that won the election was recorded with **zero seats**.
`AT-FPOE` carried `seats: 0` while the Freedom Party is the **largest single party in the National
Council with 57** — the starkest instance yet of defect **B3**, the zero-seat entries the baseline
survey counted. A reader opening Austria saw a two-party country in which the winner did not appear
to hold a seat.

The National Council, 183 seats: **Government (Stocker) 109** — ÖVP 51, SPÖ 41, NEOS 17 —
**Opposition 74** — FPÖ 57, Greens 16, one independent.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-232 | **S1** | `seats` | FPÖ **0** | **57** | The National Council's own composition after the 29 September 2024 election. The FPÖ won that election |
| PP-233 | **S3** | coverage | 2 parties, 41 of 183 | **5 parties, 182 of 183** | Three seated parties were absent, including the **ÖVP (51)**, which holds the chancellorship |
| PP-234 | **S2** | `inPower` / `inExecutive` | SPÖ in power, `inExecutive` absent | **ÖVP, SPÖ and NEOS in the executive**; FPÖ and the Greens out | The Stocker government, formed 3 March 2025 |
| PP-235 | **S2** | `leaderTitle` | absent | **Chairman** (FPÖ, SPÖ), **Chairperson** (ÖVP), **Chairwoman** (NEOS), **Spokeswoman** (Greens) | Each party's own infobox |
| PP-236 | **S3** | coalitions | none | **`AT-GOV`** (Stocker, 109 of 183) | Austria's first three-party federal coalition |
| PP-237 | **S4** | logo hygiene | `at/` held three broken files and three stray `.sha256` texts | directory rebuilt with five verified logos | The broken files were cleared in the cross-country sweep below; the directory is now exactly the five parties |

**Why the election's winner sits in opposition** is recorded in the coalition's note, because the
data alone reads as a contradiction: the ÖVP–FPÖ talks collapsed, and the ÖVP then formed Austria's
first three-party federal coalition with the SPÖ and NEOS instead.

**Documented gap — 1 of the 183 seats**: a single independent member, correctly not modelled as a
party.

All five logos are public domain on Commons and were montage-verified.

---

### 🇦🇫 Afghanistan — audited 2026-09-12 · **deliberately out of scope**

Afghanistan's three entries described the former republic's **Wolesi Jirga**: Afghan Millat was assigned 0 of 249 seats, Islamic Society 10, and Tajik National Unity 8. That chamber has no current party composition to model. Under the de facto authorities, the Ministry of Justice states that its political-parties department has been abolished and that **any activity under a party name is illegal**; the EUAA's February 2026 country report likewise records that political parties are outlawed and there is no space for political opposition.

| ID | Sev | Finding |
|---|---|---|
| PP-238 | **S1** | The dataset presented **18 historical seats in a 249-seat former chamber** as current party representation, even though political-party activity is now illegal and no current competitive party legislature exists. |
| PP-239 | **S2** | AF-AMP carried **0 seats**, contradicting the dataset's seated-party scope rule. Its two companion entries relied on pre-2021 electoral figures and English-Wikipedia citations rather than a current authority. |
| PP-240 | **S1** | AF-ISA referenced a bundled logo that was one of the cross-country sweep's non-image/broken-file cases. Removing an out-of-scope country also removes the dead asset rather than continuing to ship it. |

**Decision: remove Afghanistan from POLITICAL_PARTIES and delete its sole referenced party-logo file.** This is not a judgement that Afghan political movements do not exist; it is a scope decision. The Learn-mode party grid represents current, seated parties in a competitively functioning legislature. That condition is not currently sourceable for Afghanistan. Revisit only after a lawful multi-party electoral legislature is operating and publishes a defensible composition.

**Sources checked:** [Afghanistan Ministry of Justice, Dari statement on the prohibition of party activity (16 April 2024)](https://moj.gov.af/dr/node/3140); [EUAA, *Afghanistan: Country Focus*, “Political opposition and civic space” (February 2026)](https://www.euaa.europa.eu/coi-report-afghanistan-country-focus/111-political-opposition-and-civic-space).

### 🇨🇿 Czechia — audited 2026-09-12

Czechia held three parties, and **one of them holds no seat in either chamber**. `CZ-CSSD` carried
the Czech Social Democrats as a seated party; the party — which **renamed itself Social Democracy
(SOCDEM) in 2023** — has held **0 of 200** Chamber seats and 0 of 81 Senate seats since 2021. The two
other entries were on the previous parliament's figures, and the government they described has been
out of office since 2021.

The Chamber of Deputies, 200 seats, after the 3–4 October 2025 election: **Government (Babiš III)
108** — ANO 80, SPD 15, Motorists 13 as *groups* — **Opposition 92** — ODS 27, STAN 22, Pirates 18,
KDU-ČSL 16, TOP 09 9.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-241 | **S1** | party identity | **`CZ-CSSD` — Czech Social Democratic Party**, carried as seated | **removed** | The party renamed itself Social Democracy in 2023 and holds **0 seats** in both chambers. A party with no seats is outside this dataset's scope |
| PP-242 | **S1** | `seats` | ANO 72, SPD 20 | **ANO 76, SPD 11** | The Chamber's own composition. The SPD figure is the *group's* 15 minus the four deputies who belong to other parties — the group is not the party |
| PP-243 | **S3** | coverage | 3 parties, 107 of 200 | **13 parties, 187 of 200** | Eleven seated parties were absent, including **ODS (26)**, **STAN (20)** and the **Pirates (16)** |
| PP-244 | **S2** | `inPower` / `inExecutive` | ANO in power, `inExecutive` absent | **ANO, SPD and the Motorists in the executive**; PRO, Svobodní and Tricolour in power without cabinet office | The third Babiš cabinet, formed 15 December 2025 |
| PP-245 | **S3** | coalitions | none | **`CZ-GOV`** (Babiš III, 108 of 200) | The cabinet's own article |
| PP-246 | **S6** | `ideology`, `positionRaw` | flattened | each party's cited list and position verbatim | e.g. STAN "Centre to centre-right", the Motorists "Right-wing to far-right" |

**The Czech chamber reports GROUPS, and a group is not a party** — the same modelling problem as
France's Assembly. Four of the five government/opposition groups contain deputies from other parties
or none: SPD's 15 is SPD 11 + PRO 1 + Svobodní 1 + Tricolour 1 + one independent; the Motorists' 13 is
6 party deputies and 7 independents; ANO's 80 is 76 + 4; ODS's 27 is 26 + 1; STAN's 22 is STAN 20 +
SLK 2; the Pirates' 18 is 16 + 2 Greens. **Each party carries its own deputies only**, so the six
micro-parties riding those lists (SLK, the Greens, PRO, Svobodní, Tricolour) are entered separately
rather than folded into the group that carried them.

**Three parties are `inPower` without being in the executive.** PRO, Svobodní and Tricolour sit inside
the SPD group on the government benches but hold no cabinet post — the same confidence-and-supply
reading applied in Indonesia, Peru, France, Italy, Spain and Ireland.

**Documented gap — 13 of the 200 seats**: the independents elected on the ANO, SPD, Motorists and ODS
lists, who belong to no party.

All thirteen logos are on Wikimedia Commons under free licences and were montage-verified.

---

### 🇦🇲 Armenia — audited 2026-09-12 · first country under the Asian priority

The first country audited under the owner's **2026-09-12 Asian priority update**, after Afghanistan.

Armenia's three entries held **zero seats between them** — `AM-RKP` (Republican Party), `AM-FDARC`
(Free Democrats) and `AM-HGP` (Armenian Public Party), each `seats: 0` against a `seatsTotal` of
**101**. Every one of the three had been out of parliament since 2018, the chamber has **105**
members rather than 101, and a **general election was held on 7 June 2026** that none of them
reflected. Armenia was the worst instance of defect **B3** in the dataset: a country whose entire
party list was unseated.

The National Assembly, 105 seats: **Government 64** — Civil Contract — **Opposition 41** — Strong
Armenia's group 29, the Armenia Alliance's 12.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-247 | **S1** | coverage | 3 parties, **all with 0 seats** | **4 parties, 94 of 105** | None of the Republican Party, the Free Democrats or the Armenian Public Party has sat since 2018. All three are removed; the seated parties replace them |
| PP-248 | **S1** | `seatsTotal` | **101** | **105** | The National Assembly's own composition. The 2026 election returned 105 members |
| PP-249 | **S1** | the governing party was absent | — | **Civil Contract, 62 seats**, `inExecutive` | Nikol Pashinyan's party has governed since 2018 and holds an outright majority; it was not in the dataset at all |
| PP-250 | **S2** | opposition | — | **Strong Armenia 26, ARF 5, Country of Living 1** | Strong Armenia was founded on **8 December 2025** and is now the largest opposition party — it could not have appeared in the old entries |
| PP-251 | **S6** | `positionRaw` | — | each party's cited position verbatim (ARF "Centre-left to left-wing"; Strong Armenia "Big tent") | Strong Armenia is filed `other`: "Big tent" is not a point on the axis |

**A bloc is not a party, again.** The Assembly reports groups, and both opposition groups contain
other parties and independents: **Strong Armenia's 29** is the party's 26 plus one independent,
Country of Living 1 and New Age 1; the **Armenia Alliance's 12** is six independents, the ARF's 5 and
Forward Party 1 — the Alliance itself holds no seat of its own. Each party carries only its own
deputies, the same treatment as Czechia and France.

**Seats are cited to the chamber, not to the party.** The ARF's own infobox claims **15 of 107** and
Strong Armenia's **29 of 107** — both the previous parliament's denominator. The Assembly's dated
composition gives ARF 5 and Strong Armenia 26 of 105. Trusting the party page here would have carried
the stale figure straight in, which is exactly the circular-citation trap the sweep's method forbids.

**Documented gap — 11 of the 105 seats**: **nine independents**, plus **New Age** and the **Forward
Party**, one seat each. Both are named by the Assembly but have no English Wikipedia article, so no
field beyond the name and seat count could be sourced; they are recorded here rather than entered
with invented data.

**Country of Living ships with no ideology list.** Its article carries a position (Centre) but no
ideology field at all, so the array is empty and the widget falls back to the position label — an
honest absence rather than a guess.

Two logos are on Commons; two (the ARF and Country of Living) are non-free files on English Wikipedia
and are declared. All four were montage-verified.

---

### 🇦🇿 Azerbaijan — audited 2026-09-12

Azerbaijan's three entries carried **a party leader who died in 1878**. `AZ-APF`'s leader was recorded
as **Mirza Fatali Akhundov** — the 19th-century playwright and philosopher (1812–1878), the founder of
modern Azerbaijani drama, and under no reading a living party official. This is the deceased-leader
defect (Italy's Berlusconi, Vietnam's) taken to its limit: not a leader who left office, but a man who
died 148 years ago.

The ruling party's seat count was also out by **45**, and two of the three entries hold no seat at all.

The National Assembly, 125 seats, after the 1 September 2024 election: **Government 68** — New
Azerbaijan — **other parties 13** across ten parties — **independents 44**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-252 | **S1** | `leader` | `AZ-APF` led by **Mirza Fatali Akhundov** | *(entry removed)* | Akhundov died in **1878**. The Popular Front Party was founded in 1989 |
| PP-253 | **S1** | `seats` | YAP **113** | **68** | The Assembly's own composition. Overstated by 45 — more than every other party and every independent combined |
| PP-254 | **S1** | coverage | 3 parties, two of them unseated | **11 parties, 81 of 125** | Musavat and the Popular Front hold **no seat** in this Assembly and are removed; the ten seated minor parties were all absent |
| PP-255 | **S2** | party identity | `AZ-MSIP` — **"Müsavat Seçim İttifaqı Partiyası"** | *(entry removed)* | Not a party name: Musavat's own name is *Müsavat Partiyası*; "Seçim İttifaqı" means "election alliance". The entry conflated the party with an electoral bloc, and in any case it holds no seat |
| PP-256 | **S2** | `leader` | — | **omitted for the Motherland Party** | Its own infobox records the leadership as **vacant**: Fazail Agamali led it from 1990 until his death in 2026. "Vacant" is a status, not a person — the same discipline as Ireland's PBP–Solidarity |
| PP-257 | **S3** | coverage of minor parties | — | Civic Solidarity 3, ƏHD 2, and eight parties with one seat each | The Assembly names all ten |

**Two parties ship with `noImageReason`.** The **Democratic Reforms Party**'s article carries no logo
parameter at all, and the **Great Azerbaijan Party** has no English Wikipedia article whatsoever — only
a row in the List of political parties in Azerbaijan, from which its name, abbreviation, leader and
single seat are taken. Both are listed rather than dropped, per the logo-is-a-SHOULD rule.

**Four parties are filed `other`.** The Democratic Enlightenment Party, the Great Azerbaijan Party, the
National Front Party and the Democratic Reforms Party have **no cited political position** — the
Enlightenment and National Front infoboxes are malformed at exactly that field, and BAP has no article.
`other` records that honestly rather than placing them on an axis no source puts them on.

**Documented gap — 44 of the 125 seats**: independents, who form the single largest bloc in this
Assembly and belong to no party.

Five logos are on Commons; four (YAP, ƏHD, the Motherland Party and the Justice/Law/Democracy Party)
are non-free files on English Wikipedia and are declared. All nine were montage-verified.

---

### 🇧🇭 Bahrain — audited 2026-09-12 · **deliberately out of scope**

Bahrain's Council of Representatives is **40 seats held by 40 independents**. No party holds a seat,
because Bahrain has no political parties: the 2005 Political Societies Law permits registered
*political societies* rather than parties, and candidates contest elections as individuals.

All three entries named societies that have since been **dissolved or banned by court order** — and
two of them carried the *same name*.

| ID | Sev | Finding |
|---|---|---|
| PP-258 | **S1** | All three entries were credited with seats (**1 + 2**) in a chamber whose own composition is **40 independents and no party**. |
| PP-259 | **S1** | Every one names a dissolved or banned body: **Al-Wefaq** ("legally dissolved" per its own article), the **Islamic Action Society** (`dissolved = 2011` in its infobox) and the **National Democratic Action Society** (Wa'ad, *"banned on terrorism charges"* in June 2017). |
| PP-260 | **S2** | `BH-ALWEFAQ` carried `nameEn: "Islamic Action Society"` — **the name of a different entry in the same country**. Two of Bahrain's three cards displayed an identical name. |

**Decision: remove Bahrain from `POLITICAL_PARTIES` and delete its two bundled logo files.** The same
scope decision taken for Afghanistan, and for the same reason: the Learn-mode party grid represents
current, seated parties in a functioning multi-party legislature, and that condition is not sourceable
here. This is not a judgement that Bahraini political movements do not exist — it is that none of them
sits in this chamber, and the dataset should not imply otherwise.

Revisit if Bahrain's Political Societies Law changes or a future election returns society-affiliated
members the Council itself reports as such.

**Sources checked:** [Council of Representatives (Bahrain) — composition after the 12–19 November 2022
election](https://en.wikipedia.org/wiki/Council_of_Representatives_(Bahrain)); [Al Wefaq](https://en.wikipedia.org/wiki/Al_Wefaq);
[Islamic Action Society](https://en.wikipedia.org/wiki/Islamic_Action_Society); [National Democratic
Action Society](https://en.wikipedia.org/wiki/National_Democratic_Action_Society); [Politics of
Bahrain — Political Societies Law](https://en.wikipedia.org/wiki/Politics_of_Bahrain).

---

### 🇧🇩 Bangladesh — audited 2026-09-12 · **a hand-drawn logo found in the repository**

Bangladesh held **one** party, with **0 seats**, against a `seatsTotal` of **272** — a chamber size the
Jatiya Sangsad has never had. It has **350** members, and a **general election was held on 12 February
2026** — the first since the previous government fell — returning an entirely new parliament that the
dataset did not reflect at all.

Nine logo files were already sitting in `public/party-logos/bd/`, prefetched by an earlier pass and
referenced by nothing. **One of them was fabricated.**

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-261 | **S1** | **invented image content** | `bd/bkm.svg` — **334 bytes of hand-written SVG primitives**: a `<rect>`, a `<circle>`, and the comment *"Center circle traced from the provided image"* | **deleted**; the party now carries a `noImageReason` | This is the "never generate, invent, or approximate flag SVG content" rule, in the party-logo feature. The file was an orphan and never shipped, but it was in the tree waiting to be wired up |
| PP-262 | **S1** | coverage | 1 party, **0 seats** | **10 parties, 339 of 350** | The whole 2026 parliament was missing, including the governing **BNP (246)** and the **Jamaat-e-Islami (76)** |
| PP-263 | **S1** | `seatsTotal` | **272** | **350** | The Jatiya Sangsad has 350 members (300 elected + 50 reserved) |
| PP-264 | **S1** | `leader` | BNP led by **Begum Khaleda Zia** | **Tarique Rahman** | Rahman is BNP chairman and, since 17 February 2026, prime minister |
| PP-265 | **S2** | `inPower` | BNP **false** | **true and `inExecutive`**, with its three coalition partners | The Tarique Rahman ministry |
| PP-266 | **S3** | coalitions | none | **`BD-GOV`** (249 of 350) | The ministry's own article |
| PP-267 | **S2** | unverifiable images | `bd/iab.svg` and `bd/jagpa.png` matched **no** file on Commons | replaced with sourced Commons files | Neither party's article carries a logo, so the prefetched bytes had no citable origin. Replaced with `Hand fan, Election Symbol of the Islami Andolan Bangladesh.png` and `Flag of Jagpa.svg`, both verified |

**Every prefetched file was re-verified against its cited source, not trusted.** Seven of the nine
matched Commons **byte for byte** (BNP, Jamaat, NCP, Bangladesh Jatiya Party, Ganosanhati, Gono Odhikar
Parishad, Khelafat Majlis). One was fabricated (PP-261) and two had no traceable origin (PP-267). That
check is the direct application of the `logoSourceUrl` rule added earlier the same day.

**A false-positive worth recording, so the next sweep does not repeat it.** The same scan flagged
`my/pas.svg` (225 bytes, a `<rect>` and a `<circle>`) and `eg/justice.svg` as possible fabrications.
Both turned out to be **byte-identical to their real Commons files** — Commons genuinely hosts PAS's
logo as a minimal two-shape SVG, because that is what the design is. **File size and "primitives only"
are not evidence of fabrication; a failed byte-comparison against the cited source is.** Verify before
deleting.

**Documented gap — 11 of the 350 seats**: nine independents (seven supporting the government, two
crossbench) and two casual vacancies.

**Bangladesh Khelafat Majlis (3 seats) ships with `noImageReason`**: Commons holds only photographs and
a lapel-pin image, the party has no English Wikipedia article, and Wikidata records no P154 logo. That
honest gap replaces the hand-drawn file.

All nine bundled logos are on Commons under free licences and were montage-verified.

---

### 🇧🇹 Bhutan — audited 2026-09-12

Bhutan was a **complete inversion**. The party recorded as governing holds **no seat at all**; the
party that actually governs was recorded as opposition with a third of its real seats; and the real
opposition was missing entirely.

The National Assembly has only **two** parties. After the 2023–24 election: **Government 31** — the
People's Democratic Party — **Opposition 16** — the Bhutan Tendrel Party.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-268 | **S1** | `inPower` / identity | **`BT-DPT`** (Bhutan Peace and Prosperity Party) marked `inPower` **and** `inExecutive` with **20 seats** | *(entry removed)* | The DPT holds **zero** seats in this Assembly and heads no government. It was eliminated before the second round |
| PP-269 | **S1** | `seats` / `inPower` | **PDP 10 seats, `inPower: false`** | **31 seats, `inPower` and `inExecutive`** | The PDP won the 2023–24 election and Tshering Tobgay has been prime minister since January 2024. The dataset had the governing party in opposition |
| PP-270 | **S1** | coverage | `BT-BKP` (Bhutan Kuen Nyam Party) with **17 seats** | *(entry removed)*; **Bhutan Tendrel Party added with 16** | The BKP holds **zero** seats; the BTP — the actual opposition — was absent from the dataset |
| PP-271 | **S2** | `leader` | absent on all three | **Tshering Tobgay** (PDP), **Pema Chewang** (BTP), both *President* | Each party's own infobox |

**Two of the three entries were parties with no seats, and the seat figures did not correspond to any
election.** 17 + 20 + 10 sums to 47, so the total looked right while every component was wrong — a
reminder that a correct-looking sum is not a correctness check.

**Documented gap — none.** Bhutan is the **tenth country in this sweep to reconcile exactly**: its
Assembly seats only two parties, and both are now present with their true counts.

Both logos are non-free files on English Wikipedia and are declared. Both were montage-verified — the
BTP's caparisoned elephant and the PDP's white horse.

---

### 🇨🇳 China — audited 2026-09-12

China was represented by **one party holding every seat in the chamber**: the Communist Party of
China, `seats: 2977` of `seatsTotal: 2977`. That is not what the National People's Congress looks
like. China has **nine** legally recognised parties, and the eight besides the CPC hold **371 of the
2,977 seats** between them — every one of them absent from the dataset.

The 14th NPC, elected March 2023 for a term to March 2028: **CPC 2,040** — eight democratic parties
**371** — the balance non-party deputies.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-272 | **S1** | `seats` | **CPC 2,977 of 2,977** — the whole chamber | **2,040 of 2,977** | The CPC does not hold every NPC seat. 371 are held by the eight democratic parties and the balance by non-party deputies |
| PP-273 | **S1** | coverage | **1 party** | **9 parties** | All eight of China's other legal parties were missing: 农工党 60, 九三学社 61, 民盟 56, 民进 54, 民建 44, 民革 43, 致公党 39, 台盟 14 |
| PP-274 | **S2** | `logo` | orphan **`cn/cpc.svg`** — the party **flag** (red banner), referenced by nothing | *(deleted)*; emblem bundled as the referenced logo | Same orphan-prefetch class as Bangladesh's `bd/bkm.svg`. A party flag is not its emblem, and an unreferenced file is one wiring change away from shipping |
| PP-275 | **S2** | `logo` | — | **Zhi Gong Party: rejected two candidate files before bundling** | Wikidata/Commons offer a 166-byte SVG of four plain bars — a Commons user's redrawing of one element of the party's **pre-1949** emblem — and a grainy scan of that historic emblem. Neither is the mark the party uses. The current emblem (red disc, gold ring, yellow star, 致力为公) was taken from English Wikipedia instead |
| PP-276 | **S2** | `logo` | — | **RCCK: rejected Wikidata's P154** | Wikidata gives the **Kuomintang's** white-sun emblem for the Revolutionary Committee — a different organisation's mark. The party's own 民革 seal was used instead |
| PP-277 | **S3** | structure | — | **`CN-UF` coalition added** | Without it the eight democratic parties read as ordinary opposition. They are constitutionally *participating parties* that accept CPC leadership, do not contest elections against it and do not seek to form a government |
| PP-278 | **S3** | `logo` path | `party-logos/CN/Communist Party of China.svg` | `party-logos/cn/cpc.svg` | Upper-case directory and a spaced filename, against the documented `{cc}` convention |

**Seat figures were taken from each party's own central committee, not from Wikipedia — and that
mattered.** The two Wikipedias disagree on four of the eight, and where the parties publish their own
rosters the encyclopaedias are wrong as often as right:

| Party | en.wp | zh.wp | **party's own site** | |
|---|---|---|---|---|
| 民革 RCCK | 41 | 43 | **43** | minge.gov.cn, March 2026 — "共43名，以代表团为序" |
| 民盟 CDL | 56 | 55 | **56** | mmzy.org.cn, republished for the 2025 session |
| 民进 CAPD | 54 | 54 | **54** | mj.org.cn — "名单（54人）" |
| 九三学社 Jiusan | 56 | 61 | **61** | 93.gov.cn — "名单（61人）"; the 26 delegation sub-totals were summed and come to exactly 61. en.wikipedia's 56 is the *election-night* figure |
| 农工党 CPWDP | 60 | 60 | **60** | 团结网 — "60名农工党党员当选…分布在26个代表团" |
| 台盟 TDSGL | 14 | 13 | **14** | taimeng.org.cn — 6 Taiwan-province + 8 other deputies, named |
| 民建 CNDCA | 44 | 44 | *not published* | en and zh agree |
| 致公党 Zhi Gong | 39 | 39 | *not published* | en and zh agree |

**Documented gap — the CPC's own seat count is the one figure with no authoritative source, and it
is flagged rather than hidden.** China publishes no party breakdown of NPC deputies: the credentials
committee's report gives gender, ethnicity and occupation but not party, **both** Wikipedias leave
the CPC's cell blank in their chamber articles, and zh.wikipedia labels its own distribution table
*仅供参考* ("for reference only"). The only figure that exists anywhere is the **2,040** asserted,
uncited, in en.wikipedia's CPC infobox. It is used because the alternative — leaving 2,977 — is
definitely false, and it reconciles: 2,977 − 2,040 − 371 = **566 non-party deputies**, about 19%,
consistent with the published allocation plan. The entry's own `sources` title states that no
official breakdown exists, so a reader following the citation sees the weakness. **Revisit if the
NPC ever publishes the breakdown.**

**A second dating note.** 2,977 deputies were elected, but zh.wikipedia, citing an NPC Standing
Committee announcement, records **2,847 currently sitting** — 130 seats lost to removals and
resignations over the term. `seatsTotal` stays at the chamber's full complement of 2,977, as it does
for every other country in this dataset, with the vacancies unmodelled.

**Two parties ship with `noImageReason`.** The 中国民主促进会 (CAPD) and the 九三学社 (Jiusan
Society) have no emblem on Wikidata (no P154), none on Commons under either their English or Chinese
names, no logo parameter in either the English or Chinese Wikipedia infobox, and no emblem image
published on their own websites (mj.org.cn and 93.gov.cn both serve text mastheads). They are listed
with an honest gap rather than dropped.

**Eight of the nine parties are filed `other`.** Their cited ideology is "socialism with Chinese
characteristics" and no source places any of them on a left-right axis — which is itself the honest
answer for a participating party in a one-party state. Only the CPC carries a position (far-left,
from its Communism / Marxism–Leninism tags).

**Scope.** China stays in the dataset on the same basis as Vietnam and Laos, already audited in this
sweep: a one-party state whose ruling party genuinely exists is represented, with its real seat
count rather than the whole chamber. The difference here is that China's chamber also seats eight
other legal parties, so all nine are shown.

---

### 🇨🇾 Cyprus — audited 2026-09-12

**Cyprus was not in the dataset at all** — a country with a fully competitive multi-party
parliament, six parties in its chamber, and no entry. It is also one of the freshest: a general
election was held on **24 May 2026**, three and a half months before this audit, and it changed the
chamber substantially.

The House of Representatives, **56 seats de facto**: **Government 8** — DIKO, supporting an
independent president — **Opposition 48** — DISY 17, AKEL 15, ELAM 8, ALMA 4, ADK 4.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-279 | **S1** | coverage | **Cyprus absent from `POLITICAL_PARTIES`** | **6 parties, 56 / 56** | Every party in the chamber elected on 24 May 2026 |
| PP-280 | **S2** | `inPower` / `inExecutive` | — | **DIKO `inPower: true`, `inExecutive: false`** | Cyprus is a full presidential system and President Christodoulides is an **independent**; the Council of Ministers' own article gives its political composition as "Independent", with support from DIKO. DIKO sustains the government but holds no portfolio |
| PP-281 | **S3** | `seatsTotal` | — | **56, not 80** | 80 seats de jure; the 24 allocated to Turkish Cypriots have been vacant since 1964, so the chamber's own infobox gives 56 as the de facto size |

**Three parties left the chamber and two entered it at this election** — EDEK, the Democratic
Alignment and the Movement of Ecologists lost all 11 of their seats between them, while ALMA and
Direct Democracy Cyprus won four each at their first attempt. A dataset built before May 2026 would
have carried three parties that now hold nothing and missed two that do; adding Cyprus now avoids
inheriting that.

**The cabinet article is stale and was not used for the government/opposition split.** Its
`opposition_parties` still lists the Movement of Ecologists and Volt — neither of which holds a seat
— and names Averof Neofytou as an opposition leader, though DISY has been led by **Annita
Demetriou** since 2021. The split was taken from the chamber's own (post-election) composition
instead. Only the cabinet's *party composition* line was used from it, which is the fact it is
authoritative for.

**Documented gap — none.** Cyprus is the **eleventh country in this sweep to reconcile exactly**:
17 + 15 + 8 + 8 + 4 + 4 = 56.

**Direct Democracy Cyprus ships with no ideology list and is filed `other`.** Its article's infobox
carries neither an ideology nor a left-right position — unsurprising for a party declared in October
2025 and legally constituted under this name in February 2026 by the YouTuber and MEP Fidias
Panayiotou. The array is left empty rather than filled from the party's name.

Five logos are non-free files on English Wikipedia and are declared; ADK's is on Commons under CC0.
All six were montage-verified.

---

### 🇬🇪 Georgia — audited 2026-09-12

Georgia's three entries described a parliament that no longer exists. **Two of the three hold no
seat at all**, the third's seat count was 11 too high, and the three parties that actually sit
alongside it — 23 seats between them — were all missing.

In **February 2025** parliament revoked the mandates of **49 opposition MPs**, from the Coalition
for Change, Unity – National Movement and Strong Georgia, after those blocs submitted statements
requesting the termination of their own parliamentary authority. Those 49 seats are **vacant**, and
the parties that won them hold nothing.

The Parliament of Georgia, 150 seats: **Government 78** — Georgian Dream — **Opposition 12** — For
Georgia — **others 11** — People's Power 8, European Socialists 3 — **vacant 49**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-282 | **S1** | `seats` / coverage | **`GE-UNM`** (United National Movement) with **35 seats** | *(entry removed)* | The UNM's own infobox now reads **0 of 150**. Its MPs' mandates were revoked in February 2025 |
| PP-283 | **S1** | `seats` / coverage | **`GE-COALITION`** (Coalition for Change) | *(entry removed)* | Its infobox likewise reads **0 of 150** — same revocation |
| PP-284 | **S1** | coverage | — | **For Georgia 12, People's Power 8, European Socialists 3 added** | Every party that actually holds a seat besides Georgian Dream was absent |
| PP-285 | **S2** | `seats` | Georgian Dream **89** | **78** | Overstated by 11 |
| PP-286 | **S2** | `leader` | **Irakli Garibashvili** | **Irakli Kobakhidze** | Garibashvili is neither the party's chairman nor prime minister. Kobakhidze is both; Bidzina Ivanishvili is Honorary Chairman |
| PP-287 | **S2** | `ideologyPosition` | Georgian Dream **centre-left** | **other**, `positionRaw` "Syncretic — fiscally centre-left, socially right-wing" | The party's cited position is *syncretic*, split between a centre-left fiscal stance and a right-wing social one. Filing it centre-left reported half of that as the whole |
| PP-288 | **S2** | `inExecutive` | absent | **`true`** | The second Kobakhidze government, formed 28 November 2024, is composed **solely** of Georgian Dream members |
| PP-289 | **S3** | `ideology` | "Centre-left, Populism, Nationalism" | "Populism, Conservatism, Left conservatism, Social market economy, Euroscepticism" | "Centre-left" is a position, not an ideology tag, and Euroscepticism — a defining feature of the party since 2024 — was absent |

**Removing the UNM and the Coalition for Change is a seat-count decision, not a political one.** The
dataset's scope is parties *currently holding at least one seat*, applied the same way to Armenia's
Republican Party, Azerbaijan's Popular Front and Bhutan's DPT earlier in this sweep. Both parties
continue to exist and contest Georgian politics; neither sits in this parliament. The 49 vacant
seats are the reason, and they are recorded here so the removal is legible rather than silent.

**Documented gap — 49 of the 150 seats are vacant**, so Georgia cannot reconcile to its chamber
size: 78 + 12 + 8 + 3 = 101. This is a genuine feature of the chamber, not missing data.

`ge/unm.jpg` was deleted along with the entry. Two of the three new logos are non-free files on
English Wikipedia and are declared; For Georgia's is on Commons. All four bundled logos were
montage-verified.

---

### 🇮🇳 India — audited 2026-09-12

India had **four** parties recorded against a 543-seat chamber — the worst coverage gap in the
dataset relative to chamber size. **Thirty-nine parties holding 296 seats were missing**, and three
of the four that were present had the wrong seat count, two of them wildly so.

The Lok Sabha, 543 seats: **NDA 318** — **INDIA bloc 184** — **other opposition 38** — **vacant 3**.
Forty-three parties hold seats; the remaining 7 are 4 independents and 3 casual vacancies.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-290 | **S1** | coverage | **4 parties, 407 / 543** | **43 parties, 536 / 543** | Every seated party is now present. The 7 unmodelled seats are 4 independents and 3 casual vacancies |
| PP-291 | **S1** | `seats` | **Trinamool Congress 29** | **8** | Twenty of the TMC's MPs left to form the **Nationalist Citizens Party of India**, which joined the NDA in 2026 and is now its second-largest member. The dataset recorded neither the loss nor the new party |
| PP-292 | **S1** | `seats` | **DMK 39** | **22** | 39 is the DMK-led alliance's tally in Tamil Nadu, not the party's own seats |
| PP-293 | **S2** | `seats` | INC 99 | **98** | |
| PP-294 | **S2** | `leader` | BJP **Narendra Modi** | **Nitin Nabin**, President | Modi is *Leader of the House in the Lok Sabha*, and J. P. Nadda leads in the Rajya Sabha; neither is the party's national president. This field is the party leader everywhere else in the dataset |
| PP-295 | **S2** | `inExecutive` | absent on all four | **set on the 9 NDA parties that hold portfolios** | The third Modi ministry's own article names them: BJP, JD(U), TDP, Shiv Sena, LJP(RV), JD(S), RLD, HAM and Apna Dal (Sonelal). The other six NDA parties support the government without a ministry |
| PP-296 | **S3** | structure | — | **`IN-NDA` and `IN-INDIA` coalitions added** | With 43 parties, the alliance each belongs to is the single most useful thing a reader can be told |
| PP-297 | **S2** | `logo` | — | **three wrong images caught by the montage pass** | See below |
| PP-298 | **S2** | `logo` | — | **two orphan files deleted** | `in/bjd.svg` (Biju Janata Dal — **zero** Lok Sabha seats) and `in/ncp-aghdikar.png`, both prefetched by an earlier pass and referenced by nothing. Three `.png` duplicates of logos now bundled as `.svg` were also removed |

**The montage pass earned its keep three times over.** Each of these passed every mechanical check —
the file existed, hashed, and came from Commons:

* **CPI(ML) Liberation** resolved to `Flag Logo of CPIML.png`, a black-and-white line drawing of a
  flag with three stars. That is the party's **Election Commission ballot symbol**, not its flag,
  which is red with a hammer and sickle and the letters CPI (ML). Replaced.
* **Hindustani Awam Morcha** resolved to a Commons SVG that is a **broken potrace trace** — a single
  red rectangle covering a fifth of the canvas, with no design at all. Its only other candidate was
  a **photograph of a cooking pan** (its "Pan" ballot symbol). Neither is an emblem, so HAM ships
  with a `noImageReason`.
* **Kerala Congress** resolved to an unattributed white-and-red bicolour that could belong to any of
  the several Kerala Congress factions. Replaced with the auto-rickshaw symbol its own article
  declares.

**India's parties have two different marks, and conflating them causes collisions.** Each party has
its own logo or flag *and* an Election Commission ballot symbol. The generic ECI symbol files are
shared: the "cycle" symbol belongs to the Samajwadi Party in Uttar Pradesh **and** the Telugu Desam
Party in Andhra Pradesh, so taking the generic file for both would have put the same image on two
different parties. The rule applied here is: **use the party's own logo or flag where one exists;
where none does, use the ballot symbol its own article declares** — which is the case for AGP
(elephant), RLD (hand pump), JKNC (plough), Kerala Congress (auto-rickshaw), ZPM (hat), UPPL
(tractor), RLP (water bottle) and LJP(RV) (helicopter). No file is used for two parties.

**Documented gap — 7 of 543 seats.** Four independents and three casual vacancies, neither of which
is a party. 536 is the correct party total.

**Fourteen parties are filed `other`.** Their articles carry an ideology but no left-right position —
common for India's regional and caste-based parties (Apna Dal, AJSU, the Bharat Adivasi Party,
Kerala Congress, the IUML, RLD, RLP, SKM, UPPL, VCK, ZPM, NCP(SP), HAM and the J&K Awami Ittehad
Party). The position is left unset rather than inferred from the ideology tags.

Thirty-seven logos are on Commons under free licences; five are non-free files on English Wikipedia
and are declared. All 42 were montage-verified.

---

### 🇮🇱 Israel — audited 2026-09-12

Israel had **three** parties against a 120-seat Knesset — 62 seats modelled, **58 missing**. Ten
factions were absent, and one of the three present was a party that no longer sits under that name.

The Knesset, 120 seats: **Government 60** — Likud 32, Shas 11, Religious Zionist Party 7, Otzma
Yehudit 6, New Hope 4 — **Opposition 60** — Yesh Atid 24, National Unity 8, UTJ 7, Yisrael Beiteinu
6, Ra'am 5, Hadash–Ta'al 5, Labor 4, Noam 1.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-299 | **S1** | coverage | **3 parties, 62 / 120** | **15 parties, 120 / 120** | Shas, the Religious Zionist Party, Otzma Yehudit, New Hope, UTJ (as Agudat Yisrael + Degel HaTorah), Yisrael Beiteinu, Ra'am, Hadash, Ta'al, Labor and Noam were all absent |
| PP-300 | **S1** | identity / `seats` | **`IL-BLUE-WHITE`, Blue and White, 6 seats** | **National Unity, 8 seats** | The Knesset faction is Blue and White–National Unity and holds 8. Blue and White as such no longer contests; the entry was renamed rather than kept alongside |
| PP-301 | **S1** | `inPower` | only Likud | **the five coalition parties** | Four more parties sustain the government and none was marked in power |
| PP-302 | **S2** | `inExecutive` | absent | **`true` on 4, `false` on Shas** | See below — this is the sharpest case of the distinction in the sweep so far |
| PP-303 | **S2** | `leader` | Blue and White's **Gadi Eisenkot** | *(entry replaced)*; National Unity's leader is **Benny Gantz** | Eisenkot left National Unity in 2025; he was recorded as leading a faction that no longer exists under that name |
| PP-304 | **S3** | structure | — | **`IL-COALITION`, `IL-UTJ`, `IL-HADASH-TAAL` added** | Israel's chamber is built out of joint lists; without them the two Haredi parties and the two Arab parties read as unrelated |
| PP-305 | **S3** | `logo` | — | **two orphan files deleted** | `il/blue-white.svg` and `il/yesh-atid.svg`, superseded by the renamed entry and by the current Yesh Atid wordmark |

**The government and the coalition are not the same set, and 2025 pulled them apart.** The
thirty-seventh government's own member list records **UTJ leaving on 15 July 2025**, **Shas on 17
July 2025** — with the explicit note that Shas *"exited the government, though it remains part of the
coalition"* — **Noam leaving in March 2025**, and **Otzma Yehudit returning on 19 March 2025** after
its own January departure. So:

* **`inPower` + `inExecutive`**: Likud, the Religious Zionist Party, Otzma Yehudit, New Hope.
* **`inPower`, `inExecutive: false`**: **Shas** — in the coalition, holding no ministry. This is the
  confidence-and-supply shape the dataset already uses for Cyprus's DIKO, arrived at from the
  opposite direction: a party that *had* the ministries and gave them up.
* **Neither**: UTJ and Noam, which the Knesset now lists on the **opposition** side.

A dataset that only knew "Likud governs" would have missed all of that.

**Joint lists are modelled as their component parties, not as the list.** United Torah Judaism's 7
seats are entered as **Agudat Yisrael 4 + Degel HaTorah 3**, and Hadash–Ta'al's 5 as **Hadash 3 +
Ta'al 2**, because the Knesset's own composition lists them that way — the same "a group is not a
party" treatment already applied to France, Czechia, Armenia and Bangladesh. The alliances survive as
coalition entries so the pairing is still visible.

**Documented gap — none.** Israel is the **twelfth country in this sweep to reconcile exactly**:
60 + 60 = 120. (One of Hadash's three seats is held by an independent rather than by Maki, its
dominant component; that is recorded in the coalition note rather than modelled as a fourth tier.)

**Two parties are filed `other`.** Ra'am's article gives an ideology but no left-right position, and
Ta'al's cited position is "big tent", which is not a point on the axis.

Eight logos are on Commons under free licences; seven are non-free files on English Wikipedia and are
declared. All fifteen were montage-verified — every one is the party's own Hebrew or Arabic wordmark.

---

### 🇮🇶 Iraq — audited 2026-09-12

**Iraq was not in the dataset at all** — a 329-seat chamber, 41 seated lists, no entry. It held a
general election on **11 November 2025**, certified by the Independent High Electoral Commission on
17 November and ratified by the Federal Supreme Court on 14 December.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-306 | **S1** | coverage | **Iraq absent from `POLITICAL_PARTIES`** | **41 parties, 320 / 329** | Every list the IHEC's certified results seat |
| PP-307 | **S2** | `inPower` / `inExecutive` | — | **8 in the cabinet, 4 supporting without portfolio** | The chamber's own groups: a State Administration Assembly of 243, of which 205 sit in the cabinet and the rest support it |
| PP-308 | **S2** | `logo` | — | **a plain green star rejected for the Azem Alliance** | Its infobox's only candidate is Commons "Star Green.svg" — a generic shape, not an emblem. Same class as the Zhi Gong Party's four blue bars in the China audit |

**The results table reconciles exactly: 329 of 329.** Of those, **9 are minority-quota seats** —
five Christian, one each Feyli, Yazidi, Mandaean and Shabak — which the IHEC reports as candidate
groupings rather than as parties, so they are not modelled and 320 is the correct party total.

**The governing side is two tiers, and they are recorded separately.** Iraq's *State Administration
Assembly* is a 243-seat governing bloc, but only 205 of those seats are in the cabinet:

* **`inPower` + `inExecutive`** — the Reconstruction and Development Coalition (46), State of Law
  (29), Al-Sadiqoun (27), Taqaddum (27), the KDP (26), Badr (18), the PUK (15) and Azem (15).
* **`inPower`, `inExecutive: false`** — the Alliance of Nation State Forces (18), Al-Asas (8),
  Tasmim (6) and Huqouq (6): in the governing assembly, holding no portfolio. The same
  confidence-and-supply shape as Cyprus's DIKO and Israel's Shas.

The prime minister, **Ali al-Zaidi**, is an **independent** and has held office since 14 May 2026,
so no party's `timeInPower` claims the premiership itself.

**Thirty of the 41 ship with a `noImageReason`, and twenty-three of those have no English Wikipedia
article at all.** Iraq's chamber is unusually fragmented — governorate-level lists holding one to
nine seats each — and the documentation thins out fast below the top ten. A country-constrained
Wikidata sweep of **all 152 parties it records for Iraq** returned a P154 logo for almost none of
them. Those lists are entered anyway, with their IHEC-certified name and seat count, because the
party-logo rule is explicit that a seated party is never withheld for want of a picture: an
omission the reader cannot see would make a 329-seat chamber look like a 251-seat one.

**Thirty-one are filed `other`** for the same reason — no source places them on a left-right axis.
Where a party does have a cited position it is used (the PUK centre-left, Badr and Al-Sadiqoun
right-wing, the RDC and Azem centre).

**A caveat on the chamber article's own arithmetic, recorded rather than silently reconciled.** Its
group listing labels the non-cabinet tier "35" while the four lists under it sum to 38, and gives
Al-Siyadah 8 where the certified results give 9. Seats here come from the **IHEC results table**,
which sums exactly to 329; the chamber article is used only for the government/opposition split,
which is the fact it is authoritative for.

Eleven logos are bundled — six non-free English-Wikipedia files (declared) and five from Commons.
All eleven were montage-verified; the twelfth candidate was the green star above, and it was dropped.

---

### 🇮🇷 Iran — audited 2026-09-12

**Iran was not in the dataset at all.** Its Islamic Consultative Assembly has 290 seats, of which
**13 registered parties hold 31**; **254 deputies sit as independents** and 5 seats are vacant.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-309 | **S1** | coverage | **Iran absent from `POLITICAL_PARTIES`** | **13 parties, 31 / 290** | The Assembly's own by-party breakdown |
| PP-310 | **S1** | `leader` | — | **three wrong leaders caught before they shipped** | See below |
| PP-311 | **S2** | `inPower` | — | **12 of 13 in power, none in the executive** | The Assembly's by-coalition view: Government 43, confidence and supply 119, opposition 79 |

**Three leaders were caught before they shipped, and one of them was a dead man.** A naive "first
leader-ish infobox field" read — the approach that works for most countries — produces all three:

* **Executives of Construction Party** → `leader1_name = Akbar Hashemi Rafsanjani`, whose own field
  is labelled *"Spiritual leader"* and annotated **`(deceased)`**. Rafsanjani **died in 2017**. The
  party's actual General Secretary is **Hossein Marashi**. This is the deceased-leader defect the
  sweep has now hit in Azerbaijan (a man dead since 1878) and here.
* **Front of Islamic Revolution Stability** → `leader1_name = Mojtaba Khamenei`, whose field is
  labelled *"Political and Financial Patron"*. He is the Supreme Leader's son, not the party's
  officer — and naming him its leader would assert something materially false. The infobox's actual
  officer rows are **inside an HTML comment**, deliberately withdrawn by editors as stale, so the
  party ships with **no leader at all** rather than a guess.
* **Progress and Justice Population** → the figurehead reading gives Speaker Mohammad Bagher
  Ghalibaf; the party's own General Secretary is **Morteza Kamel Navvab**, which is the office this
  field records everywhere else in the dataset.

**Iran is in scope on the Azerbaijan pattern, not the Bahrain one.** Bahrain was removed because
**no** party holds a seat there. Iran's chamber genuinely seats 13 registered parties; the other 254
deputies are independents, exactly as Azerbaijan's 44 and India's 4 are, and independents are never
modelled as parties.

**Twelve of the thirteen are `inPower`, and none is `inExecutive`.** The Assembly's own
by-coalition view splits the chamber into a **Government** bloc of 43 (Voice of the Nation,
supporting President Masoud Pezeshkian), a **confidence-and-supply** bloc of 119 (the Coalition
Council of Islamic Revolution Forces and the Combatant Clergy Association) and an **opposition** of
79 (the Front of Islamic Revolution Stability). The four reformist parties sit in the first, eight
principlist parties in the second, and Paydari alone in the third. No source records any of these
parties holding a ministry, so `inExecutive` is `false` throughout and each entry's `timeInPower`
says which bloc it sits in rather than claiming office.

**Five are filed `other`** — their articles carry an ideology but no left-right position.

Ten logos are bundled (seven non-free English-Wikipedia files, declared; three PD), all
montage-verified as the parties' own Persian wordmarks. Three parties — the Development and Justice
Party, the YEKTA Front and the Islamic Association of Physicians — have no logo parameter in their
infoboxes and no Commons or Wikidata file, so they ship with a `noImageReason`.

---

### 🇯🇴 Jordan — audited 2026-09-12

**Jordan was not in the dataset at all.** Its House of Representatives has 138 seats, of which
**twelve parties hold 99** and 39 members sit as independents, following the election of
**10 September 2024** — the first under Jordan's new party-list law.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-312 | **S1** | coverage | **Jordan absent from `POLITICAL_PARTIES`** | **12 parties, 99 / 138** | The chamber's current composition |
| PP-313 | **S2** | `previousNames` | — | **Umma Party ← Islamic Action Front (1992–2025)** | The party was founded as the IAF, the Muslim Brotherhood's political wing, on 8 December 1992 and renamed after Jordan banned the Brotherhood in early 2025 |
| PP-314 | **S2** | `logo` | — | **a branch's emblem rejected for the Umma Party** | The only file Commons or Wikipedia holds is the IAF emblem overprinted with **فرع طارق ("Tariq Branch")** — text baked into the image that is not part of the party's own emblem |

**The chamber today is not the election result, and the current composition is what is recorded.**
Comparing the two: the **Azem Party's five seats are gone**, the **Growth (Namaa) Party has
appeared** with one, and the Labour Party is down from two to one — defections since September 2024.
Seats here come from the chamber's own current listing, with the election results cited alongside.

**Eight of the twelve parties have no English Wikipedia article**, which is unsurprising for a
party system only two years old: Jordan's parties were legalised into their present form by the
2022 Political Parties Law and most contested their first election in 2024. They are entered with
their name and seat count from the chamber's composition and a `noImageReason`, on the same
reasoning as Iraq's twenty-three — an omission the reader cannot see would make a 138-seat chamber
look like a 78-seat one.

**Nine are filed `other`** — no source places them on a left-right axis, including the Umma Party,
whose article gives its ideology as Islamism but no position.

**No party is marked in power.** Jordan is a constitutional monarchy in which the King appoints the
prime minister and the cabinet; the government of Jafar Hassan is not formed from a parliamentary
majority, and no source records any of these parties holding a ministry as a party. Recording one
as "in power" would assert a parliamentary system Jordan does not have.

Three logos are bundled, all non-free English-Wikipedia files and declared. All were
montage-verified; the fourth candidate was the branch emblem above, and it was dropped.

---

### 🇯🇵 Japan — audited 2026-09-12

**Japan's entry was the best-maintained the sweep has audited so far** — nine parties, current as
of the general election of **8 February 2026**, with Japanese names, `previousNames` on the Party
of Life (renamed from Reiwa Shinsengumi in 2026), and a `positionRaw` on the Genzei–Yūkoku Alliance
that spells out its two co-representatives' disagreement. Every one of its nine leaders checked out
against the parties' own articles. Four narrower things were wrong.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-315 | **S2** | `inExecutive` | **absent on all nine** | **`true` on the LDP, `false` on Ishin** | The second Takaichi cabinet's own party list marks the Japan Innovation Party **"(confidence and supply)"**, and the chamber lists its 36 seats under **"Supported by"**, separately from Government |
| PP-316 | **S2** | `timeInPower` | Ishin: **"2025-10-20–present"** | the second Takaichi cabinet, formed **18 February 2026** | The date belonged to the *previous* cabinet; the February 2026 election and the new cabinet had superseded it |
| PP-317 | **S2** | `seats` | CRA **49** | **48** | The chamber lists the Centrist Reform Alliance's parliamentary group as 48 and counts its **vice-speaker** separately under "Unaffiliated". Recording 49 double-counted him |
| PP-318 | **S3** | `timeInPower` | LDP: a bare date range | prose naming the current cabinet | It said only that the LDP had governed since 2012, without saying which cabinet it holds now |

**The arithmetic now closes.** 316 + 36 + 48 + 28 + 15 + 11 + 4 + 1 + 1 = **460**, and the chamber's
remaining **5** are its Unaffiliated members who are not counted in any parliamentary group: the
Speaker (LDP), the Vice-Speaker (CRA) and three independents. Before the fix the total was 461 and
the vice-speaker was in two places at once.

**Japan is the clearest confidence-and-supply case in the sweep**, because the source says so in as
many words. The cabinet's own `political_party` field reads "Liberal Democratic Party" and "Japan
Innovation Party *(confidence and supply)*" — so the LDP is `inExecutive: true` and Ishin
`inExecutive: false`, both `inPower`. That is the same shape as Cyprus's DIKO, Israel's Shas and
Iraq's non-cabinet bloc, but here it is stated rather than inferred.

---

### 🇰🇿 Kazakhstan — audited 2026-09-12

**Kazakhstan was not in the dataset — and the chamber it would have been entered against no longer
exists.** On **1 July 2026** Kazakhstan replaced its bicameral Parliament (a 49-seat Senate and a
98-seat Mäjilis) with a **unicameral 145-seat Kurultai**, first elected on **23 August 2026**, three
weeks before this audit.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-319 | **S1** | coverage | **Kazakhstan absent from `POLITICAL_PARTIES`** | **5 parties, 145 / 145** | The Kurultai's own composition |
| PP-320 | **S1** | `chamberName` | *(would have been "Mäjilis", 98 seats)* | **"Kurultai", 145 seats** | The Mäjilis article still carries 98 members and a 2023 election; it is the superseded chamber |

**This is the first structural chamber change the sweep has met**, and it is the reason entering
Kazakhstan from the obvious article would have been wrong twice over: the Mäjilis page is still
live, still says 98 members, and still cites the January 2023 election. A dataset built from it
would have described a parliament abolished ten weeks ago.

The Kurultai, 145 seats: **Government 110** — Ädilet — **Opposition 35** — Auyl 10, Respublica 9,
Aq Jol 8, JSDP 8.

**Documented gap — none.** Kazakhstan is the **thirteenth country in this sweep to reconcile
exactly**: 110 + 10 + 9 + 8 + 8 = 145.

**The ruling party is four months old.** Ädilet was founded on **7 May 2026** in support of
President Kassym-Jomart Tokayev's reforms and took 110 of the 145 seats at its first election —
so its `founded` year and its `timeInPower` start in the same year, which is rare enough to be
worth stating rather than looking like an error. Two parties that held seats before the reform, the
People's Party of Kazakhstan and Baytaq, **lost all of theirs** and are therefore not in the
dataset.

**Ädilet is filed `other`** — its cited position is "big tent", which is not a point on the
left-right axis.

Three logos are on Commons under free licences; two are non-free English-Wikipedia files and are
declared. All five were montage-verified.

---

### 🇰🇷 South Korea — audited 2026-09-12

South Korea's entry was **accurate on coverage and seats** — all seven seated parties present, and
its 291 seats plus the chamber's 8 independents and 1 vacancy make exactly 300. Every leader
checked out, including the Democratic Party's **Kim Min-seok**, elected party leader in August 2026.
Two things were missing.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-321 | **S2** | `inExecutive` | **absent** | **`true` on the Democratic Party** | Lee Jae-myung, a DP member, has been **President of South Korea since 4 June 2025**. Korea is a presidential system and the DP holds the executive, not merely a legislative majority |
| PP-322 | **S3** | `timeInPower` | **"2025-present"** | prose naming the presidency and its date | A bare year range does not say *what* the party holds — and in a presidential system that is the whole point |

**A sourcing trap worth recording: "Democratic Party of Korea" is now a disambiguation page.**
Fetching that title returns `Minjudang`, a list of fifteen different Korean parties that have borne
the name since 1945, with no infobox at all. The live article is **`Democratic Party (South Korea,
2015)`**. An audit that trusted the obvious title would have concluded the party had no leader and
no ideology, rather than reading them off the right page — the same class as Iraq's Al-Asas and
Jordan's Umma, where the name in the chamber's list is not the name of the article.

**One party ships with a `noImageReason`** — the Social Democratic Party, which holds a single seat.
The other six carry bundled logos.

**A cross-country observation, recorded rather than acted on here.** Thirty-seven entries across the
dataset give their `logoSourceUrl` as a direct `upload.wikimedia.org` file URL rather than the
`commons.wikimedia.org/wiki/File:` page form the rest use. Both resolve and both point at the real
file, so this is a consistency wrinkle and not the fabricated-citation defect of rule 5a; it is
noted here for a later cross-country pass rather than fixed inside a single country's PR.

---

### 🇰🇼 Kuwait — audited 2026-09-12 — out of scope

**Kuwait is not in the dataset and must not be added.** Two independent reasons, either of which
would be sufficient:

1. **Political parties are not legal in Kuwait.** The National Assembly's own article states it
   plainly — "while political parties are not legal in Kuwait, a number of political factions have
   existed". Candidates contest elections as individuals under a single non-transferable vote, and
   the groupings that form afterwards (the liberal bloc, the Shaabi populist bloc, and others) are
   informal parliamentary factions, not registered parties.
2. **The Assembly has been suspended since 10 May 2024**, for a four-year constitutional
   re-evaluation. Its own infobox gives the term length as "Four years (currently suspended)" and
   the article describes it in the past tense. There is no sitting chamber to hold seats in.

| ID | Sev | Verdict | Evidence |
|---|---|---|---|
| PP-323 | — | **Out of scope — no entry** | No legal parties; chamber suspended since 10 May 2024 |

This is the **Bahrain determination, only stronger**. Bahrain's chamber sits but seats 40
independents because its law permits "political societies" rather than parties; Kuwait's law
permits neither, and its chamber does not currently sit at all. As with Bahrain and Afghanistan,
this is not a judgement that Kuwaiti political life does not exist — it is that the Learn-mode
grid represents *parties holding seats in a functioning chamber*, and neither half of that is
sourceable here.

**Revisit** if the suspension ends and a chamber is returned, or if Kuwait legalises political
parties.

---

### 🇰🇬 Kyrgyzstan — audited 2026-09-12

**Absent entirely.** Kyrgyzstan had no entry in `POLITICAL_PARTIES`, so the Learn-mode Political
parties tab showed nothing for a country whose 90-seat **Supreme Council** (Жогорку Кеңеш) was
elected on **30 November 2025**. Six entries added, covering 84 of the 90 seats.

**PP-324 — the chamber is not the election result, and using the election result would have shown
one party holding 3 seats and nothing else.** The Central Election Commission's return for the
30 November 2025 election records **Yntymak 3 seats, independents 84, and 3 seats cancelled**: all
but three of the 90 seats were won by candidates standing as independents, because Kyrgyzstan's
2021 electoral law elects most of the chamber from single-member constituencies where party
nomination is not required. Building the country's entry from that table would have been literally
accurate and completely uninformative. The seated structure is instead taken from the Supreme
Council's **own published composition**, where those independents have since organised into named
deputy groups: **Mekenchil 19, Ata-Zhurt 18, Eldik 17, Ala-Too 15, Adilet Kyrgyzstan 14, ungrouped
4, vacant 3** — 90 exactly. Both sources are cited on every entry so the distinction is visible to
a reader rather than buried in this ledger.

**PP-325 — two of Eldik's seventeen are Yntymak members, so carrying both figures verbatim would
have double-counted them.** The chamber lists Yntymak's three deputies *inside* other groups: two
sit within the Eldik faction and one among the ungrouped four. Eldik is therefore entered at
**15 = 17 − 2**, Yntymak at its own **3**, and the derivation is cited in the first source line on
Eldik's entry rather than left as an unexplained discrepancy against the chamber's published
table. Seat sum: 19 + 18 + 15 + 15 + 14 + 3 = **84**, with the remaining 6 being the 3 other
ungrouped deputies and the 3 vacancies.

**PP-326 — Mekenchil holds the presidency, and `inPower`/`inExecutive` were therefore both set.**
**Sadyr Japarov**, a Mekenchil member, has been President of Kyrgyzstan since **28 January 2021**,
and the party is the largest group in the chamber. Kyrgyzstan's 2021 constitution is presidential:
the President heads the executive directly, so this is an `inExecutive: true` case, not a
confidence-and-supply one.

**PP-327 — Ala-Too and Adilet Kyrgyzstan have no emblem anywhere, and are listed anyway.** Both are
deputy groups formed after the election rather than long-standing registered parties: neither has
an article of its own on any Wikipedia, neither has a Wikidata item carrying a `P154` logo, and
Commons holds no emblem file under their English, Kyrgyz or Russian names. Under the amended
logo rule they are entered with a `noImageReason` naming what was swept — 29 seats between them,
nearly a third of the chamber, which dropping them for want of a picture would have hidden.

**PP-328 — the four logos that do exist were montage-verified before bundling.** Mekenchil
(МЕКЕНЧИЛ ПАРТИЯСЫ), Ata-Zhurt (АТА-ЖУРТ), Eldik (ЭЛДИК ДЕПУТАТТЫК ТОБУ) and Yntymak (ЫНТЫМАК)
each render as that party's own wordmark emblem; three are non-free files hosted locally on English
Wikipedia and carry a `licenceNote`, Eldik's is on Commons.

**Verified in the running app**: all six cards paint (4 logos loaded, 2 honest "No free image"
cards), Mekenchil carries the In-power badge, no console errors.

### 🇱🇧 Lebanon — audited 2026-09-12

**Absent entirely.** Lebanon had no entry in `POLITICAL_PARTIES`, so the Learn-mode Political
parties tab showed nothing for a 128-seat **Parliament** elected on 15 May 2022 and sitting until
May 2028. Twenty-five entries added, covering **83** of the 128 seats; the remaining 45 are 44
deputies sitting as independents and one casual vacancy, which are not modelled as parties.

**PP-329 — the obvious source reports BLOC seats as PARTY seats, for every one of the six large
parties.** `List of political parties in Lebanon` is the natural place to look and gives a clean
seat column — and it is the alliance-seat defect (the India DMK finding) applied wholesale. Its
figures are the *parliamentary bloc* sizes, which fold in each bloc's independents and its smaller
partners:

| party | the list article | the party's own deputies |
|---|---|---|
| Lebanese Forces | 19 | **14** (Strong Republic = LF 14 + NLP 1 + 4 independents) |
| Hezbollah | 15 | **13** (Loyalty to the Resistance = 13 + 2 independents) |
| Amal Movement | 15 | **11** (Development and Liberation = 11 + National Banner 1 + 3 ind.) |
| Free Patriotic Movement | 13 | **12** (Strong Lebanon = 12 + 1 independent) |
| Progressive Socialist Party | 8 | **6** (Democratic Gathering = 6 + 2 independents) |
| Kataeb | 5 | **4** (Kataeb bloc = 4 + 1 independent) |
| Armenian Revolutionary Federation | 3 | **2** |

Taking the first column would have overstated those seven parties by **14 seats** and left no room
for the independents who actually hold them. Every seat figure in the dataset is instead the
chamber's **own** per-bloc breakdown from `Parliament of Lebanon`, which itemises each bloc into its
member parties and its independents and reconciles to 128 exactly: 83 party + 44 independent +
1 vacancy.

**PP-330 — half the cabinet is non-partisan, so `inExecutive` could not be read off bloc
membership.** The **Cabinet of Nawaf Salam** (formed 8 February 2025, under President Joseph Aoun)
is a specialist cabinet: of its 24 ministers **12 are independents**, including the Prime Minister
and Deputy Prime Minister. Only six parties hold portfolios — Lebanese Forces 4, Amal 2, Hezbollah 2,
PSP 2, Kataeb 1, Tashnag/ARF 1 — and those six carry `inExecutive: true`. The other two parties in
the 64-seat government bloc, the **National Liberal Party** and the **National Banner Party**,
support the cabinet but hold nothing, so they are `inPower: true` / `inExecutive: false`. Reading
`inExecutive` from the bloc would have put ministers in the hands of two parties that have none.

**PP-331 — a 46-seat confidence-and-supply group, modelled on the Cyprus DIKO pattern.** The
chamber's own composition separates a **"Supported by (46)"** group from the 64-seat government bloc
and links it explicitly to confidence and supply. Its thirteen parties therefore take
`inPower: true` / `inExecutive: false`, the same modelling this audit has used for Cyprus's DIKO,
Israel's Shas, Iraq's non-cabinet bloc and Japan's Ishin. Only three parties are opposition — the
**Free Patriotic Movement** (12 seats; Bassil announced in October 2024 that it was no longer
allied with Hezbollah), **ReLebanon** and the **Islamic Group of Lebanon**.

**PP-332 — the Islamic Group's Wikidata `P154` is the MUSLIM BROTHERHOOD's flag.** The
country-constrained Wikidata sweep returned `Flag of the Muslim Brotherhood.png` for the Islamic
Group, which is the transnational organisation's emblem, not the Lebanese party's. It was rejected
in favour of the party's own logo, whose English-Wikipedia file page cites the party's own site
(al-jamaa.org) as its source. The sweep's other two Lebanese offers were likewise wrong in kind —
`FLCross.jpg` for the Lebanese Forces and `Flag of the Amal Movement.svg` for Amal are flags where
both parties have a proper logo file. This is the collision class the P17 constraint is meant to
catch and does not: the item was right, the *picture on it* was not.

**PP-333 — two parties are shown with their own FLAG, because no logo exists, and one of those
files is tagged by Commons as imprecise.** The **Union Party** and the **Popular Nasserist
Organization** have no logo file anywhere; each has a Commons flag bearing the party's emblem, and
those are used — the same precedent as the Indian and Iraqi parties already in the dataset whose
`logoSourceUrl` is a flag. The PNO's SVG carries a Commons `cleanup image` tag noting a different
font and missing text at the bottom of the seal; it is bundled anyway because it is unambiguously
the PNO's flag and no alternative exists, and the imprecision is recorded here rather than hidden.

**PP-334 — six parties have no emblem anywhere and are listed with a `noImageReason`.** Watani
Alliance, Mada Party, Khatt Ahmar, ReLebanon, Sanad Movement and Project Watan (2 seats) hold
**seven seats** between them. None has an article of its own; each is attested only by the chamber's
composition, the Lebanese parties list, and in three cases its MP's own infobox (Ashraf Rifi → Sanad
Movement, Waddah Sadek → Khatt Ahmar, Neemat Frem → Project Watan). Under the amended logo rule they
are entered without images rather than dropped. Judgement call recorded: **Watani Alliance** is named
as an alliance but is listed as a party, with a leader, in the Lebanese parties table and is the
affiliation the chamber records for its deputy, so it is entered as a party.

**PP-335 — the chamber's own bloc subtotal is off by one, and it falls entirely outside the party
figures.** The composition's "Supported by (**46**)" header does not match its itemised blocs, which
sum to 47 — the `National Moderation` bloc is given as 6 while its note lists only 5 members. The
discrepancy sits wholly in the independent count (44 or 43), never in a party's seats, so no entry
is affected; it is disclosed here rather than silently reconciled.

**Verified in the running app**: all 25 cards paint (19 logos loaded, 6 honest "No free image"
cards), the three opposition parties carry no In-power badge while the other 22 do, no console
errors.

### 🇲🇻 Maldives — audited 2026-09-12

**Absent entirely.** The Maldives had no entry in `POLITICAL_PARTIES`, so the Learn-mode Political
parties tab showed nothing for the 93-seat **People's Majlis** elected on 21 April 2024. Five
entries added, covering 91 of the 93 seats; the other two are independents.

**PP-336 — a clean chamber, and it reconciles exactly.** PNC 74, MDP 13, MDA 2, Jumhooree Party 1,
MNP 1, independents 2 = 93. The People's National Congress holds a **supermajority** of 74 seats —
the largest single-party share of any chamber this audit has entered so far.

**PP-337 — the MDP ships with NO leader, because naming one would state something the source does
not.** The Maldivian Democratic Party's infobox records its **presidency as vacant**; its interim
chairpersonship is itself the subject of a no-confidence petition, and its most recent officer
changes are dismissals rather than elections. The only named officer is a Vice President. Rather
than promote a vice-president to "leader" or ship a contested interim name, the entry carries no
`leader` at all and its source line says why — the same discipline that stopped three wrong leaders
shipping for Iran (PP-303), including one dead since 2017. `leader` is a SHOULD, and an honest blank
beats a name the source will not support.

**PP-338 — presidential system, so `inExecutive` follows the presidency, not a coalition.** The
Maldives is a presidential republic in which the President appoints and heads the cabinet.
**Mohamed Muizzu** — the PNC's own party President — has been President of the Maldives since
**17 November 2023**, so the PNC alone carries `inPower: true` / `inExecutive: true`, and the other
four parties carry neither. There is no confidence-and-supply case here.

**Verified in the running app**: all five cards paint their logos, the PNC carries the In-power
badge and the other four do not, no console errors.

### 🇲🇳 Mongolia — audited 2026-09-12

**Absent entirely.** Mongolia had no entry in `POLITICAL_PARTIES`, so the Learn-mode Political
parties tab showed nothing for the **State Great Khural**, enlarged to **126 seats** at the
28 June 2024 election. Five entries added, covering 125 of the 126 seats; the remaining one is an
independent.

**PP-339 — the government has changed twice since the election, and the current one is five months
old.** An entry built from the 2024 result — or from any snapshot taken before this year — would
name the wrong prime minister. **Nyam-Osoryn Uchral** took office on **30 March 2026** and his
cabinet, Mongolia's **22nd government**, was formed on **4 April 2026**, succeeding Zandanshatar's,
which had itself succeeded Oyun-Erdene's after the 2025 political crisis. `timeInPower` and every
`inExecutive` flag are read from that cabinet, not from the election.

**PP-340 — it is a three-party coalition, and all three are genuinely in the executive.** The
Uchral cabinet is an MPP–HUN–National Coalition government holding **79 of 126** seats, and each of
the three supplies a **deputy prime minister** — so all three carry `inExecutive: true` rather than
the confidence-and-supply modelling used for Lebanon and Cyprus. The Democratic Party (42) and the
Civil Will–Green Party (4) are opposition.

**PP-341 — HUN won 8 seats and now holds 7.** The chamber's current composition is used, not the
election return; the difference is disclosed in HUN's own source line rather than left as an
unexplained mismatch against the 2024 table.

**PP-342 — the National Coalition's four seats cannot be split, so it is entered as one group.**
The National Coalition is an alliance of the **Mongolian Green Party**, the **Mongolian National
Democratic Party** and the **Mongolian Liberal Democratic Party** (which joined in May 2024), and it
won all four of its seats on a single proportional list. No source splits those four between the
three members: the Green Party's own infobox claims **one**, the National Democratic Party's claims
**none**, and the Liberal Democratic Party has no article at all. Entering three component parties
would have meant inventing a split; entering the Green Party alone would have dropped three seats.
The coalition is therefore entered as one group of four with its membership named in its sources —
the same judgement recorded for Lebanon's Watani Alliance (PP-334).

**PP-343 — the Democratic Party redesigned its emblem in 2026.** Its bundled logo is
`Democratic Party of Mongolia emblem since 2026.svg`, the file the party's own infobox now carries;
the older emblem would have been the obvious pick from a stale search.

**Verified in the running app**: all five cards paint their logos, the MPP, HUN and National
Coalition carry the In-power badge while the Democratic Party and Civil Will–Green do not, no
console errors.

### 🇳🇵 Nepal — audited 2026-09-12

**Absent entirely.** Nepal had no entry in `POLITICAL_PARTIES`, so the Learn-mode Political parties
tab showed nothing for the 275-seat **House of Representatives**. Six entries added, covering 274
of the 275 seats; the remaining one is an independent who sits with the government.

**PP-344 — the chamber was replaced wholesale seven months ago, and any pre-2026 snapshot of Nepal
is now worthless.** A general election was held on **5 March 2026**, following the September 2025
protests, and it did not merely reshuffle the old order — it displaced it. The **Rastriya Swatantra
Party**, founded in 2022 and holding 20 seats in the previous House, won **182 of 275** and formed a
majority government; its candidate **Balen Shah** became Prime Minister on **27 March 2026** and
heads Nepal's 38th Council of Ministers. The Nepali Congress, the largest party of the old chamber,
is now the official opposition on 38 seats. An entry written from anything but the current chamber
would have named the wrong government, the wrong prime minister and, for two parties, parties that
did not exist.

**PP-345 — two of the six parties are younger than this audit's own start date.** The **Nepali
Communist Party** was founded on **5 November 2025** and holds 17 seats; the **Shram Sanskriti
Party** was founded on **28 September 2025** and holds 7. Both are entered from their own articles,
with their founding dates, rather than folded into their predecessors.

**PP-346 — two parties carry TWO leadership offices, and the party office is the one used.** Both
the Rastriya Swatantra Party and the Nepali Congress list a party *president* and a separate
*leader* in their infoboxes, and in both cases the second is the parliamentary role, not the party's
head: the RSP's is **Balen Shah**, who is Prime Minister, and the Nepali Congress's is **Bhishma
Raj Angdembe**, whom the cabinet article names Leader of the Opposition. The entries therefore carry
the party presidents — **Rabi Lamichhane** (elected unopposed in June 2026, after an acting
presidency covering his 2024 arrest) and **Gagan Thapa** — and each source line states the
parliamentary role separately so neither reading is lost.

**PP-347 — a name collision one letter wide.** The **Nepali Communist Party** (2025, 17 seats) is
not the **Nepal Communist Party** (2018–2021), the short-lived UML–Maoist Centre merger. The
distinction is recorded in the entry's own source line, because a later editor searching by name
will land on the wrong article — the same collision class as Paraguay's Misiones.

**Verified in the running app**: all six cards paint their logos, the Rastriya Swatantra Party
carries the In-power badge and the other five do not, no console errors.

### 🇴🇲 Oman — audited 2026-09-12 — out of scope

**Oman is not in the dataset and must not be added.** It is the cleanest out-of-scope case this
audit has met — cleaner than Kuwait (PP-322), which at least has organised parliamentary factions,
and cleaner than Bahrain, whose law permits "political societies".

**PP-348 — parties are not permitted, and the chamber records it.** Oman's own politics article
states plainly that "the Sultanate has neither political parties nor legislature" in the party sense
and that "Oman does not allow political parties"; the **Consultative Assembly** (Majlis al-Shura)
article adds that "only non-partisans have been elected". The Assembly's published composition is a
single line — **Non-partisan (90)** of 90, from the election of **29 October 2023**. There is no
party to enter, no seat to attribute and no `noImageReason` to write: the Learn-mode Political
parties tab correctly shows nothing.

The upper house, the Council of State (Majlis al-Dawla), is appointed by the Sultan and is likewise
non-partisan; the two together form the 169-member Council of Oman.

**Revisit** only if Oman legalises political parties and a party-affiliated member is returned to
the Consultative Assembly.

### 🇵🇰 Pakistan — audited 2026-09-14

Pakistan **was** in the dataset, and that made it worse than an absence: the tab showed two cards
and looked finished. The **National Assembly** elected on **8 February 2024** seats **17 parties**
across 336 seats, and the entry held **two**. Rewritten in full: 2 → 17 entries, covering **334** of
the 336 seats.

**PP-349 — 15 of 17 parties missing, and 164 party seats with them.** The entry carried only the
PML-N and the PPP. Absent were the **largest opposition party** (PTI, 75 seats), the coalition's
third partner (MQM-P, 22), JUI-F (10), and eleven smaller parties down to the one-seat benches. A
reader could not have seen that Pakistan has an opposition at all.

**PP-350 — `seatsTotal` was 342: the pre-2018 National Assembly.** The chamber was reduced to
**336** seats when the 25th Amendment merged the Federally Administered Tribal Areas into Khyber
Pakhtunkhwa, and it has been elected at that size twice since. The stale figure had survived two
general elections.

**PP-351 — both seat counts were from an older chamber.** PML-N was carried at **116** (now 133) and
the PPP at **54** (now 74). Neither matched the 2024 return or the Assembly's current composition.

**PP-352 — the PPP was marked OUT of power while sitting in the governing coalition — and the
correction is finer than a flipped boolean.** The chamber lists the PPP's 74 seats inside the
government bloc, and it is the coalition's second-largest partner. But the cabinet tells a second
story that a naive flip would have got wrong: the **Second Shehbaz Sharif government** has **no PPP
federal minister at all** — its federal ministers are PML-N 26, IPP 2, MQM-P 2, BAP 1 and one
independent — and exactly **one PPP minister of state** (National Food Security and Research). The
entry therefore carries `inPower: true` / `inExecutive: true`, with its `timeInPower` stating
plainly that the party declined the full ministries it was offered and holds a single junior post.
Reading the bloc alone would have credited the PPP with a share of the cabinet it does not have;
reading the federal-minister list alone would have denied it the executive seat it does.

**PP-353 — PML-N's founding year was wrong.** The entry said **1997**; the party's own infobox gives
**18 July 1992**.

**PP-354 — `inExecutive` was never set on either party**, the same omission found in Japan, South
Korea, India, Israel, Iraq and Iran. Nine parties now carry `inPower`, of which five hold cabinet
posts (PML-N, PPP, MQM-P, IPP, BAP) and four support the government without one (PML-Q, PML-Z, NP,
PTI-P).

**PP-355 — twelve correct logos were already bundled for parties that had no entry.** `public/party-logos/pk/`
held emblems for JUI-F, MQM-P, PML-Q, PML-Z, BAP, NP, PkMAP, PkNAP, MWM, IPP and others — images a
previous pass sourced and the data never used. All twelve are byte-identical to the files re-resolved
in this audit and are now wired to real entries. One file was genuinely dead and is removed:
**`sic.png`** (Sunni Ittehad Council), the vehicle PTI-backed independents joined in 2024, which the
Assembly's current composition no longer lists.

**PP-356 — the chamber's own bloc subtotals do not add up, and the party figures are used instead.**
The composition's headers read "Government (199)" and "Opposition (90)" while its itemised parties
sum to **242** and **92**. Every seat figure in the dataset is the per-party line, which totals 334 of
336; the two-seat remainder and the header discrepancy are disclosed here rather than reconciled by
guesswork. Same pattern as Lebanon (PP-335).

**PP-357 — two one-seat parties with nearly the same name.** The **Pashtunkhwa National Awami
Party** (founded 2022) and the **Pashtunkhwa Milli Awami Party** (founded 1989) are separate parties
holding one seat each. The distinction is written into both entries' sources, because a later editor
searching by name will land on the wrong one.

**PP-358 — the Grand Democratic Alliance is an alliance, entered as one group.** The chamber records
its single seat to the alliance without naming a component party, so no split was invented for it —
the same judgement as Lebanon's Watani Alliance (PP-334) and Mongolia's National Coalition (PP-342).

**Verified in the running app**: all 17 cards paint their logos, the nine government-bloc parties
carry the In-power badge and the eight opposition parties do not, no console errors.

### 🇵🇸 Palestine — audited 2026-09-14

**Absent entirely.** Palestine had no entry in `POLITICAL_PARTIES`, so the Learn-mode tab did not
exist for it at all. Seven entries added, covering **128** of the **Palestinian Legislative
Council**'s 132 seats; the other four are independents.

**PP-359 — the chamber is real, published and twenty years old, and every entry says so.** The 2nd
Council was elected on **25 January 2006** and has **not functioned since the 2007 Fatah–Hamas
split**, with laws made by presidential decree since. That is not a reason to omit Palestine — the
composition is published, the parties are legal and named, and the article on the forthcoming
election still cites these figures as each party's *current* seats. It is a reason to state the
position on every entry, which the shared source line does.

**PP-360 — the Prime Minister is an INDEPENDENT, and the obvious source says Fatah.** The 2026
election article's infobox records `before_party = Fatah` for **Mohammad Mustafa**, Prime Minister
since 31 March 2024. His own article records his party as **Independent**, and describes him as an
independent member of the PLO Executive Committee. Fatah's `inExecutive` therefore rests on the
**presidency** — Mahmoud Abbas, the party's own Chairman, has been President since **15 January
2005** — and its `timeInPower` states in terms that the Prime Minister is not a Fatah member. Taking
the election infobox at face value would have credited Fatah with a premiership it does not hold:
the same class of wrong attribution as Iran's three mis-sourced leaders (PP-303).

**PP-361 — the largest bloc holds no executive office.** Hamas won 74 of 132 seats, a clear
majority, and carries `inPower: false`: the Palestinian Authority executive has been the presidency
alone since 2007, and Hamas holds no post in it. A seat count is not an executive share, and this is
the starkest example of that in the dataset so far.

**PP-362 — two leaders the sources themselves qualify, kept rather than blanked.** The PFLP's
General Secretary **Ahmad Sa'adat** is recorded as imprisoned, and the DFLP's **Nayef Hawatmeh** as
living in exile. Both remain their parties' office-holders, so both are entered as `leader`, with the
qualification carried in the entry's own source line — the honest middle between dropping a real
office-holder and presenting one without the circumstance the source states.

**PP-363 — this entry has a known expiry date.** A fresh election is scheduled for **28 November
2026** to elect a 3rd Council of **200** seats, up from 132. When it is held, both the seat figures
and `seatsTotal` need refreshing; the schedule is cited on every entry so a later auditor meets it.

**Verification note for the next auditor:** Palestine's Learn page labels its drill-in button
**"Learn more"**, not "Explore more flags" as most countries do. A verification script keyed on the
usual label reports the Political-parties tab as missing when it is simply behind a differently
labelled button — worth knowing before concluding a country has no surface for this data.

**Verified in the running app**: all seven cards paint their logos, Fatah alone carries the In-power
badge, and the tab appears with its count of 7; no console errors.

### 🇶🇦 Qatar — audited 2026-09-14 — out of scope

**Qatar is not in the dataset and must not be added.** It is the strongest out-of-scope case this
audit has met — stronger than Oman (PP-348), which at least elects 90 members albeit non-partisan,
and stronger than Kuwait (PP-322).

**PP-364 — three independent grounds, each sufficient on its own.**

1. **The law permits no political bodies.** Qatar's human-rights article states plainly that
   "Qatari law does not permit the establishment of political bodies or trade unions."
2. **The chamber's own composition records no party and no elected member.** The **Shura Council**'s
   published composition is a single line — **"Appointed by Emir (45)"** of 45.
3. **Elections were abolished outright, and recently.** The Council was designed in the 2003
   constitution to seat 30 elected members and 15 appointees; those elections were delayed for
   eighteen years, held once on **2 October 2021**, and then **abolished by a constitutional
   referendum in November 2024** — reported as carried with 89% support — returning the Council to a
   fully appointed body. The Emir's own statement announcing the referendum was that "the Shura
   Council is not a representative parliament in a democratic system, and its status and powers will
   not be" changed by it.

There is no party to enter, no seat to attribute and no `noImageReason` to write: the Learn-mode
Political parties tab correctly shows nothing for Qatar.

**Revisit** only if Qatar legalises political bodies and a party-affiliated member sits in the Shura
Council. The 2024 referendum makes that materially less likely than when this sweep began, which is
itself worth recording: this determination is not a gap awaiting data, it is the current settled
position.

### 🇸🇦 Saudi Arabia — audited 2026-09-14 — out of scope

**Saudi Arabia is not in the dataset and must not be added.** The grounds are the same shape as
Qatar's (PP-364) and rest on an explicit constitutional prohibition.

**PP-365 — the Basic Law bans political parties, and the chamber is appointed and non-partisan.**

1. **An explicit constitutional ban.** Saudi Arabia's politics article states that "the country's
   Basic Law bans the formation of political parties and sanctions sedition and condemnation of the
   king with long jail terms."
2. **The chamber records no party at all.** The **Consultative Assembly** (Majlis ash-Shura) seats
   **150** members, all appointed by the king, and its published composition is a single line:
   **"Nonpartisan (150)"**. Its own article classifies it as an **advisory body**, not a legislature
   — it has no role in forming the budget.
3. **The only Saudi party is in exile and holds nothing.** A group of dissidents abroad announced a
   political party in opposition to the king on **24 September 2020**. It is banned domestically,
   holds no seat, and is not a seated party in any chamber — so it falls outside what this dataset
   models, exactly as an unseated party does anywhere else.

There is no party to enter, no seat to attribute and no `noImageReason` to write: the Learn-mode
Political parties tab correctly shows nothing for Saudi Arabia.

**Revisit** only if the Basic Law's prohibition is lifted and a party-affiliated member sits in the
Consultative Assembly.

### 🇱🇰 Sri Lanka — audited 2026-09-14

**Absent entirely.** Sri Lanka had no entry in `POLITICAL_PARTIES`, so the Learn-mode Political
parties tab did not exist for it. Twelve entries added, covering **224** of the 225-seat
**Parliament** elected on **14 November 2024**; the remaining seat is an independent.

**PP-366 — a landslide, and eleven parties behind it.** The **National People's Power** holds **159**
of 225 — the second-largest single-party share this audit has entered, after the Maldives' PNC. Its
leader **Anura Kumara Dissanayake** has been President since **23 September 2024** and **Harini
Amarasuriya** Prime Minister since **24 September 2024**, so the NPP alone carries `inPower` and
`inExecutive`. The other eleven parties, from the 40-seat Samagi Jana Balawegaya down to six
one-seat benches, are all opposition.

**PP-367 — the NPP is an alliance, entered as one group.** It is led by the Janatha Vimukthi
Peramuna, and the chamber records all 159 seats to the alliance without splitting them between its
member parties. No split was invented — the same judgement as Lebanon's Watani Alliance (PP-334),
Mongolia's National Coalition (PP-342) and Pakistan's GDA (PP-358).

**PP-368 — one man leads two parties that sit separately.** **Ranil Wickremesinghe** is leader of
both the **United National Party** (1 seat — Sri Lanka's oldest party, founded 1946 and reduced to a
single bench in 2024) and the **New Democratic Front** (5 seats), which the chamber lists as two
distinct opposition parties. Both are entered, and each entry's source line names the other, so the
duplication reads as the fact it is rather than as an error.

**PP-369 — the DTNA's only matching file is DAIMLER TRUCK NORTH AMERICA's logo.** Searching Commons
for the **Democratic Tamil National Alliance** returns `DTNA Logo.png`, whose file description reads
"Logo von Daimler Truck North America", sourced from `daimler-trucksnorthamerica.com`. Bundling on
the acronym alone would have put a truck manufacturer's wordmark on a Tamil nationalist party's
card — and it would have passed every mechanical check, because the file exists, hashes, and is a
real image. It was caught by reading the file description before downloading, which is exactly what
rule 5a ("never write a `logoSourceUrl` you have not resolved") exists for. The DTNA takes a
`noImageReason` naming the rejection.

**PP-370 — a ballot symbol traced by a volunteer is not a party's emblem.** Sri Lankan parties are
identified on the ballot by a symbol (the UNP's elephant, the SJB's telephone, the NPP's compass),
and Commons carries monochrome line traces of several, uploaded as **own work** under CC0 / CC BY-SA.
Those were rejected: they are a Commons user's drawing, not the party's published emblem, and
bundling one would be the hand-drawn-logo failure this repo already found in `bd/bkm.svg`. The
distinction is visible in the **SLMC**'s case, where both exist — its real party flag (green field,
crescent, tree, wordmark) is bundled, while the plain traced tree glyph is not. The **SJB** (40
seats, the main opposition) and **Sarvajana Balaya** therefore ship with a `noImageReason` naming the
traced-symbol rejection rather than a picture that is not theirs.

Five of the twelve carry a `noImageReason`: SJB and Sarvajana Balaya (traced ballot symbols only),
DTNA (the Daimler collision), and the All Ceylon Makkal Congress and Sri Lanka Labour Party (no file
under any of their English, Tamil or Sinhala names).

**Verified in the running app**: all twelve cards render — seven logos painted, five honest "No free
image" cards — the NPP alone carries the In-power badge, no console errors.

### 🇸🇾 Syria — audited 2026-09-14 — out of scope for now

**Syria is not in the dataset, and cannot be until a party holds a seat.** The reason is different
from Qatar's and Saudi Arabia's: nothing is banned here. The chamber simply contains no party.

**PP-371 — the post-Assad Assembly is 205 independents and 5 vacancies.** After the fall of the
Assad regime on **8 December 2024**, Syria became a unitary presidential republic under a provisional
government, operating since **13 March 2025** under a Constitutional Declaration, with President
**Ahmed al-Sharaa** appointing the transitional cabinet. The old People's Assembly was suspended in
December 2024 and **dissolved on 29 January 2025**; the Ba'ath Party suspended its own work
indefinitely.

The new 210-seat **People's Assembly** was constituted between **5 October 2025 and 24 May 2026**
through a temporary electoral-college system — 126 members elected, 14 more in by-elections, and
**70 appointed directly by the President**. Its published composition is two lines and no party
appears in either:

> *De jure:* Independent (**205**) · Vacant (**5**)

So there is no seat to attribute to any party, and no `noImageReason` to write for a party that holds
none — the same outcome as Oman (PP-348) reached by an entirely different route. Entering Syria's
historic parties with zero seats would be the defect found in Georgia (unseated parties carried as
seated), and entering the dissolved Ba'athist chamber would be the defect found in Kazakhstan (a
superseded chamber shown as current).

**Revisit** when Syria's transitional period produces party-affiliated members — this is the entry in
the whole sweep most likely to change, and it should be re-checked rather than assumed settled.

### 🇹🇯 Tajikistan — audited 2026-09-14

**Absent entirely.** Tajikistan had no entry in `POLITICAL_PARTIES`, so the Learn-mode Political
parties tab did not exist for it. Five entries added, covering **all 63** seats of the **Assembly of
Representatives** elected on **2 March 2025**.

**PP-372 — an exact reconciliation, with no independents at all.** People's Democratic Party 49,
Agrarian Party 7, Party of Economic Reforms 5, Socialist Party 1, Democratic Party 1 = **63 of 63**.
It joins Cyprus, Israel and Kazakhstan as a chamber this audit closes exactly, and is the only one so
far with no independent and no vacancy to account for.

**PP-373 — the longest tenure in the dataset.** **Emomali Rahmon**, the People's Democratic Party's
own leader, has been President of Tajikistan since **16 November 1994** — longer than any other
office-holder any entry in this dataset records. Tajikistan is a presidential republic, so the PDPT
alone carries `inPower` / `inExecutive`; the chamber itself labels the PDPT's 49 seats "Government"
and the remaining 14 "Others", and those four parties take neither flag.

All five logos are locally-hosted English-Wikipedia files under non-free-content criteria and carry a
`licenceNote`; each was montage-verified as a distinct Tajik party emblem before bundling.

**Verified in the running app**: all five cards paint their logos, the PDPT alone carries the
In-power badge, no console errors.

### 🇹🇲 Turkmenistan — audited 2026-09-14

**Absent entirely.** Turkmenistan had no entry in `POLITICAL_PARTIES`. Three entries added, covering
**107** of the 125-seat **Assembly** elected on **26 March 2023**; the remaining 18 are independents.

**PP-374 — every party here is pro-government, and the chamber still distinguishes them.** The easy
error would be to mark all three as governing, since Turkmenistan has no opposition party. But the
Assembly's own composition does not say that: it separates the **Democratic Party**'s 65 seats as
**"Government"** from a **"Supported by"** group of 60 holding the **Party of Industrialists and
Entrepreneurs** (24), the **Agrarian Party** (18) and the 18 independents. The entries follow the
chamber: the TDP carries `inPower` / `inExecutive`, and the other two carry `inPower` without
`inExecutive` — the confidence-and-supply modelling used for Lebanon (PP-331) and Cyprus, applied
here to a one-party state rather than a competitive one.

**PP-375 — the presidency is sourced from the office-holder's own article, not inferred.** **Serdar
Berdimuhamedow** has been President since **19 March 2022**, and his own article records his party as
the TDP. That link is what carries the TDP's `inExecutive`; it is stated rather than assumed, because
"the ruling party of a one-party state must hold the presidency" is exactly the kind of inference
that produced Palestine's wrong premiership attribution (PP-360).

**Verified in the running app**: all three cards paint their logos, no console errors.

### 🇹🇷 Türkiye — audited 2026-09-14

**This is the largest staleness the sweep has found.** Türkiye was in the dataset with **four**
parties, and the four were not merely out of date — they described a party system that no longer
exists. Rewritten in full: **4 → 15** entries, covering **579** of the 600-seat **Grand National
Assembly**; the remainder is 13 independents and 8 vacancies.

**PP-376 — the main opposition party was missing, and the party the data called the opposition has
lost three-quarters of its bench.** The old entry gave the **CHP 169 seats**. The chamber now records
**44** for it (45 counting one deputy sitting in the New Path group). In its place, as the Assembly's
**Main Opposition**, sits the **YENİ Party on 91 seats** — a party that did not appear in the dataset
at all. Roughly **125 seats** moved between the data and reality.

**PP-377 — the cause, sourced.** The **New Party** (YENİ Parti) was founded on **24 July 2026** by
**Özgür Özel**, following his removal as CHP chairman by a judicial ruling in **May 2026**. It is a
CHP splinter, social-democratic and Kemalist, and most of the CHP's former parliamentary bench went
with him. No amount of care about the four existing entries would have surfaced this — only
re-reading the chamber's current composition did.

**PP-378 — the CHP's leadership entry was a bare surname over a contested office.** The old entry
said `"Kılıçdaroğlu"`. The party's infobox records **"Kemal Kılıçdaroğlu (acting, appointed)"** — the
right person, but holding the post on an acting, appointed basis after the same judicial ruling. The
new entry gives the full name, the title **Acting Leader**, and the circumstance in its source line.

**PP-379 — a wrong founding year.** The old DEM Party entry said **2024**; the Peoples' Equality and
Democracy Party was founded **15 October 2023**.

**PP-380 — `inExecutive` was never set, and the chamber distinguishes three levels.** The composition
separates **Government (280)** — the AK Party, forming the 67th cabinet under President Erdoğan, who
is also its leader — from a **"Supported by" (51)** group holding the **MHP** (46), **HÜDA PAR** (4)
and **DSP** (1). Those three take `inPower` without `inExecutive`; the eleven opposition parties take
neither. The running app renders the distinction as separate "Hold executive power" and "Hold
legislative power" badges.

**PP-381 — three parties have deputies split across parliamentary groups, and each entry totals the
party.** The CHP (44 + 1), SAADET (8 + 1) and YRP (3 + 1) each have a deputy sitting inside the
**New Path** group rather than with their own party. Every entry carries the party's own total
wherever its deputies sit, with the split stated in its source line — the alternative would have
understated three parties to match a group label.

**PP-382 — TİP ships with no leader.** The Workers' Party of Turkey's infobox names only a
vice-president, Doğan Ergün, not the party's chair. Rather than promote a vice-president, the entry
carries no `leader` and says why — the Maldives discipline (PP-337).

**Verified in the running app**: all fifteen cards paint their logos; the AK Party shows both
"Hold executive power" and "Hold legislative power" while the MHP, HÜDA PAR and DSP show only the
legislative badge; no console errors.

### 🇦🇪 United Arab Emirates — audited 2026-09-14 — THREE FABRICATED PARTIES REMOVED

**This is the most serious data defect the sweep has found.** It is not staleness, a wrong seat count
or a mis-sourced leader: the dataset carried **three political parties that do not exist**, with
invented leaders, invented founding years, invented ideologies and invented seat counts, citing a
source that does not exist. They shipped to production.

**PP-383 — what was in the dataset, and why every part of it is false.**

| entry | seats | "leader" | "founded" |
|---|---|---|---|
| UAE National Awakening | 8 | Noura Al Kaabi | 2011 |
| People of Determination | 6 | Mariam Al Mansoori | 2015 |
| Emirati Awwal | 5 | Amal Al Qubaisi | 2019 |

Three independent checks, each fatal on its own:

1. **None of the three parties exists.** No English Wikipedia article, no Wikidata item, no Commons
   presence. Searching each name returns unrelated results — an oil company, a secondary school, the
   article on self-determination. "**People of Determination**" is not a party at all: it is the
   UAE's official term for people with disabilities.
2. **The cited source does not exist.** All three entries cited exactly one source, *"2023 United
   Arab Emirates Federal National Council elections"*. There is no such article. This is the
   fabricated-citation pattern of rule 5a — the same failure that produced 101 saved error pages
   as logos — reaching the `sources` field rather than `logoSourceUrl`.
3. **The UAE has no political parties to carry.** The **Federal National Council**'s own published
   composition is a single line — **Independent (40)** of 40. Twenty members are elected by an
   electoral college and twenty appointed by the emirates' rulers, none under a party label. The
   country's only organised party, **Al Islah**, has been federally banned since **2011** and
   designated a terrorist group since **2014**.

**All three entries are deleted, and the UAE is out of scope** on the Qatar/Saudi Arabia grounds. The
Learn-mode Political parties tab no longer appears for the UAE, which is correct.

**PP-384 — the near-miss that should have caught it earlier, and why it did not.** The 2026-09-12
cross-country logo audit *did* touch these three entries: it found their bundled "logos" were saved
Wikimedia error pages and replaced them with a `noImageReason`. One of those reasons even records the
doubt — "the United Arab Emirates permits no political parties, so this entry's own identity is
questionable and is flagged for the UAE's country audit". But that pass was scoped to images, so it
fixed the picture and left the fabricated party standing, with a carefully-worded explanation of why
it had no emblem. **A well-sourced account of a missing image on an entry that should not exist is
worse than a broken image**, because it reads as diligence. The lesson for the rest of the sweep: when
a logo cannot be found *and the country is one where parties are illegal*, question the entry before
writing its `noImageReason`.

**Verified in the running app**: the UAE's Learn page now shows National symbols, Sub-national
divisions, Capital cities and Hierarchy — and no Political parties tab. No console errors.

### 🌍 Cross-country: 104 party logos were not images at all — 2026-09-12

Found while auditing Ireland, whose three logo files turned out to be Wikimedia error pages
(**PP-199**). Sweeping the class, as the repo's own rule requires, found the same defect on a scale
no single country's audit would have surfaced.

**104 of 619 bundled files were not images.** 101 were Wikimedia "page not found" **HTML** saved
under an `.svg` extension; three were the media CDN's plain-text
`File not found: /v1/AUTH_mw/…` body. They covered **33 countries** — for every one of them, *every
party card in the grid was a broken image in production*.

| | |
|---|---|
| Countries affected | AD AE AF AG AL AM AO AT AZ BA BB BE BF BG BH BI BJ BS BT BW BZ CM CR CZ DZ EE FI GE HU IE IL IS LT LU MT RO |
| Party entries showing a broken image | **104** |
| Recorded `logoSourceUrl`s pointing at a Commons file **that does not exist** | **97 of 101** |
| Orphan broken files, referenced by nothing | 4 (`at/fpo.svg`, `at/oevp.svg`, `at/spo.svg`, `be/mr.svg`) |
| Stray `.sha256` text files shipping as part of the site | 6 (`at/`, `be/`) |

**The root cause was a fabricated citation, not a sourcing impossibility.** The filenames were
invented from a plausible pattern — `Barbados_Labour_Party_logo.svg`, `FLN_Algeria_logo.svg`,
`Bhutan_Kuen_Nyam_Party_logo.svg` — rather than read off the party's own article. The fetch wrote
the 404 body to disk and the entry recorded *its* sha256, so **every existing check passed**: the
path existed, the bytes hashed, the URL looked right. A sha256 proves a file has not *changed*; it
can never prove it was ever right. And the real files mostly existed — Barbados Labour Party's logo
is `Barbados Labour Party logo.png`, the same stem under a different extension.

| ID | Sev | What | Evidence |
|---|---|---|---|
| PP-215 | **S1** | 101 logos were HTML error pages; 3 were plain-text CDN 404 bodies | Read the bundled bytes: they begin `<!DOCTYPE html>` / `File not found: /v1/AUTH_mw/…` |
| PP-216 | **S1** | 97 of 101 recorded `logoSourceUrl`s resolve to a **missing** Commons/Wikipedia file page | Queried each one's `action=query&prop=imageinfo`; only 4 returned an image |
| PP-217 | **S2** | 4 Indian logos were **PNG data under a `.svg` extension** (`in/bjp`, `in/inc`, `in/dmk`, `in/tmc`) | Magic-number sniff; files renamed to `.png` and the entries re-pointed |
| PP-218 | **S4** | 4 orphan broken files and 6 stray `.sha256` text files shipping to users | Same hygiene defect already fixed in Chile, Colombia, the Netherlands and Denmark |
| PP-219 | **S1** | **The gate could not see any of it.** `check-political-parties.mjs` now sniffs the bytes | `imageKind()` fails the build on HTML, on an unrecognisable body, and on image data contradicting its extension |

**83 of the 104 were re-sourced and montage-verified**; the other 21 became honest
`noImageReason` gaps. Resolution ran in three passes, each stricter than the last:

1. **Wikidata, constrained by P17 (country), exact name/alias match only** — 40 hits. Fuzzy matches
   were discarded, the discipline that removed every collision in the 2026-09-12 backfill.
2. **The party's own English Wikipedia article**, accepted only when the infobox `country` matched
   *and* the article's title or infobox name matched the party's own name — 29 more.
3. **A hand-curated title list** for parties whose stored `nameEn` differs from their article title
   (Finland's "National Coalition" → *National Coalition Party*, Afghanistan's "Islamic Society of
   Afghanistan" → *Jamiat-e Islami*) — 15 more, minus two rejected below.

**A first attempt at pass 2 silently resolved nothing** because its country guard compared against
`COUNTRY_FACTS`, which carries `nameOfficial` but no common name: every comparison fell back to the
ISO code and rejected every correct hit. Worth recording because it failed *quietly* — 0 matches
reads exactly like "no logos exist".

**Three picks were rejected on identity, two of them only by eye.** The montage is what caught the
first; the other two were caught by comparing names:

- **Georgia's Coalition for Change** resolved to `Ahali Party Logo.svg` — the logo of one **member**
  party. The article's infobox carries it, so every mechanical check passed; bundling it would have
  captioned Ahali's emblem as the alliance's. Left as a gap, with that reason recorded in the entry.
- **Antigua's "Democratic Movement for Change"** resolved to the *Democratic National Alliance* (DNA)
  and **Andorra's "Democratic Party of Andorra"** to *Democrats for Andorra* (DA). Near-miss
  identities, which is the wrong-logo class this sweep exists to remove. Both left as gaps.

**A tooling bug this pass created and fixed.** `patch.mjs` located a country block's end by scanning
for a `"\n  ],\n"` line — but some blocks in this file end with the next country opening on the
**same** line (`  ],  "AD": [`). The scan skipped past it and **deleted the whole of Andorra**. It
now finds the closing bracket by counting brackets, ignoring those inside strings.

Coverage after this pass: **531 parties carry a real, verified logo; 42 carry an honest gap.**

---

## Queue — all 195 countries in the owner's priority order

Tick a box only when that country's fix is **merged and live**.

### Phase 1 — Australia, Malaysia, Brazil (3)

- [x] `AU` Australia — merged
- [x] `MY` Malaysia — merged
- [x] `BR` Brazil — merged

### Phase 2 — rest of Southeast Asia (10)

- [x] `MM` Myanmar — audited, deliberately out of scope
- [x] `TH` Thailand — merged
- [x] `VN` Vietnam — merged
- [x] `ID` Indonesia — merged
- [x] `PH` Philippines — merged
- [x] `SG` Singapore — merged
- [x] `KH` Cambodia — merged
- [x] `LA` Laos — merged
- [x] `BN` Brunei — audited, removed as out of scope
- [x] `TL` Timor-Leste — merged

### Phase 3 — rest of South America (11)

- [x] `AR` Argentina — merged
- [x] `CL` Chile — merged
- [x] `CO` Colombia — merged
- [x] `PE` Peru — merged
- [x] `VE` Venezuela — merged
- [x] `EC` Ecuador — merged
- [x] `BO` Bolivia — merged
- [x] `PY` Paraguay — merged
- [x] `UY` Uruguay — merged
- [x] `GY` Guyana — merged
- [x] `SR` Suriname — merged

### Phase 4 — United Kingdom, United States, Canada (3)

- [x] `GB` United Kingdom — merged
- [x] `US` United States — merged
- [x] `CA` Canada — merged

### Phase 5 — Europe (45)

- [x] `IE` Ireland — merged
- [x] `FR` France — merged
- [x] `DE` Germany — merged
- [x] `ES` Spain — merged
- [x] `PT` Portugal — merged
- [x] `IT` Italy — merged
- [x] `NL` Netherlands — merged
- [x] `BE` Belgium — merged
- [x] `LU` Luxembourg — merged
- [x] `CH` Switzerland — merged
- [x] `AT` Austria — merged
- [x] `PL` Poland — merged
- [x] `CZ` Czechia — merged
- [ ] `SK` Slovakia
- [ ] `HU` Hungary
- [ ] `RO` Romania
- [ ] `BG` Bulgaria
- [ ] `GR` Greece
- [ ] `HR` Croatia
- [ ] `SI` Slovenia
- [ ] `RS` Serbia
- [ ] `BA` Bosnia and Herzegovina
- [ ] `ME` Montenegro
- [ ] `MK` North Macedonia
- [ ] `AL` Albania
- [x] `TR` Türkiye — merged
- [ ] `UA` Ukraine
- [ ] `BY` Belarus
- [ ] `MD` Moldova
- [ ] `RU` Russia
- [ ] `LT` Lithuania
- [ ] `LV` Latvia
- [ ] `EE` Estonia
- [ ] `FI` Finland
- [x] `SE` Sweden — merged
- [x] `NO` Norway — merged
- [x] `DK` Denmark — merged
- [ ] `IS` Iceland
- [x] `CY` Cyprus — merged
- [ ] `MT` Malta
- [ ] `LI` Liechtenstein
- [ ] `MC` Monaco
- [ ] `SM` San Marino
- [ ] `AD` Andorra
- [ ] `VA` Vatican City

### Phase 6 — rest of the world (123)

- [x] `AF` Afghanistan — audited, deliberately out of scope
- [ ] `DZ` Algeria
- [ ] `AO` Angola
- [ ] `AG` Antigua and Barbuda
- [x] `AM` Armenia — merged
- [x] `AZ` Azerbaijan — merged
- [ ] `BS` Bahamas
- [x] `BH` Bahrain — audited, deliberately out of scope
- [x] `BD` Bangladesh — merged
- [ ] `BB` Barbados
- [ ] `BZ` Belize
- [ ] `BJ` Benin
- [x] `BT` Bhutan — merged
- [ ] `BW` Botswana
- [ ] `BF` Burkina Faso
- [ ] `BI` Burundi
- [ ] `CV` Cabo Verde
- [ ] `CM` Cameroon
- [ ] `CF` Central African Republic
- [ ] `TD` Chad
- [x] `CN` China — merged
- [ ] `KM` Comoros
- [ ] `CG` Congo
- [ ] `CD` Congo (DRC)
- [ ] `CR` Costa Rica
- [ ] `CI` Côte d’Ivoire
- [ ] `CU` Cuba
- [ ] `DJ` Djibouti
- [ ] `DM` Dominica
- [ ] `DO` Dominican Republic
- [ ] `EG` Egypt
- [ ] `SV` El Salvador
- [ ] `GQ` Equatorial Guinea
- [ ] `ER` Eritrea
- [ ] `SZ` Eswatini
- [ ] `ET` Ethiopia
- [ ] `FJ` Fiji
- [ ] `GA` Gabon
- [ ] `GM` Gambia
- [x] `GE` Georgia — merged
- [ ] `GH` Ghana
- [ ] `GD` Grenada
- [ ] `GT` Guatemala
- [ ] `GN` Guinea
- [ ] `GW` Guinea-Bissau
- [ ] `HT` Haiti
- [ ] `HN` Honduras
- [x] `IN` India — merged
- [x] `IR` Iran — merged
- [x] `IQ` Iraq — merged
- [x] `IL` Israel — merged
- [ ] `JM` Jamaica
- [x] `JP` Japan — merged
- [x] `JO` Jordan — merged
- [x] `KZ` Kazakhstan — merged
- [ ] `KE` Kenya
- [ ] `KI` Kiribati
- [ ] `KP` North Korea
- [x] `KR` South Korea — merged
- [x] `KW` Kuwait — merged (out of scope)
- [x] `KG` Kyrgyzstan — merged
- [x] `LB` Lebanon — merged
- [ ] `LS` Lesotho
- [ ] `LR` Liberia
- [ ] `LY` Libya
- [ ] `MG` Madagascar
- [ ] `MW` Malawi
- [x] `MV` Maldives — merged
- [ ] `ML` Mali
- [ ] `MH` Marshall Islands
- [ ] `MR` Mauritania
- [ ] `MU` Mauritius
- [ ] `MX` Mexico
- [ ] `FM` Micronesia
- [x] `MN` Mongolia — merged
- [ ] `MA` Morocco
- [ ] `MZ` Mozambique
- [ ] `NA` Namibia
- [ ] `NR` Naoero
- [x] `NP` Nepal — merged
- [ ] `NZ` New Zealand — partial fix only, NOT the full country audit (27 Sep 2026, Opus, under Learn-claim findings F87–F89): Labour 36→34, ACT 8→11, seatsTotal 120→123 (54th Parliament: 123 MPs, both at the 2023 Port Waikato by-election and as of Nov 2025); Green leader James Shaw → co-leaders Marama Davidson; Chlöe Swarbrick (Swarbrick since Mar 2024); National grouping right → centre-right (to match its positionRaw and Wikipedia). National's 48 and Green's 15 are left unchanged because sources conflict (Wikipedia and Parliament's overview give National 49; Hansard gives 48). Still open: NZ First (8) and Te Pāti Māori are missing.
- [ ] `NI` Nicaragua
- [ ] `NE` Niger
- [ ] `NG` Nigeria
- [x] `OM` Oman — merged (out of scope)
- [x] `PK` Pakistan — merged
- [ ] `PW` Palau
- [ ] `PA` Panama
- [ ] `PG` Papua New Guinea
- [x] `QA` Qatar — merged (out of scope)
- [ ] `RW` Rwanda
- [ ] `KN` Saint Kitts and Nevis
- [ ] `LC` Saint Lucia
- [ ] `VC` Saint Vincent and the Grenadines
- [ ] `WS` Samoa
- [ ] `ST` São Tomé and Príncipe
- [x] `SA` Saudi Arabia — merged (out of scope)
- [ ] `SN` Senegal
- [ ] `SC` Seychelles
- [ ] `SL` Sierra Leone
- [ ] `SB` Solomon Islands
- [ ] `SO` Somalia
- [ ] `ZA` South Africa
- [ ] `SS` South Sudan
- [x] `LK` Sri Lanka — merged
- [ ] `SD` Sudan
- [x] `SY` Syria — merged (out of scope for now)
- [x] `TJ` Tajikistan — merged
- [ ] `TZ` Tanzania
- [ ] `TG` Togo
- [ ] `TO` Tonga
- [ ] `TT` Trinidad and Tobago
- [ ] `TN` Tunisia
- [x] `TM` Turkmenistan — merged
- [ ] `TV` Tuvalu
- [ ] `UG` Uganda
- [x] `AE` United Arab Emirates — merged (fabrications removed; out of scope)
- [ ] `UZ` Uzbekistan
- [ ] `VU` Vanuatu
- [ ] `YE` Yemen
- [ ] `ZM` Zambia
- [ ] `ZW` Zimbabwe
- [x] `PS` Palestine — merged

