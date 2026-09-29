#!/usr/bin/env node
/**
 * Extract scripts/data/diaspora-migrant-stock-2020-wb.csv from the World Bank
 * Global Bilateral Migration Matrix 1960–2020 (WDR 2023 release).
 *
 * Usage:
 *   node scripts/extract-diaspora-wb.mjs /path/to/WBMM_1960_2020.xlsx
 *
 * Requires: openpyxl via `python3` (xlsx is large; ExcelJS not bundled).
 * Never invents stocks — only positive male+female sums for year 2020.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const xlsxPath = process.argv[2];
if (!xlsxPath) {
  console.error("Usage: node scripts/extract-diaspora-wb.mjs /path/to/WBMM_1960_2020.xlsx");
  process.exit(1);
}
if (!existsSync(xlsxPath)) {
  console.error("File not found:", xlsxPath);
  process.exit(1);
}

const OUT_CSV = resolve(__dirname, "data/diaspora-migrant-stock-2020-wb.csv");
const OUT_META = resolve(__dirname, "data/diaspora-migrant-stock-2020-wb.meta.json");
const M49 = resolve("/tmp/migrant/m49.csv");
const UN = resolve(ROOT, "src/lib/unMemberStates.ts");

const py = `
import csv, json, sys, openpyxl, re
from collections import defaultdict
from hashlib import sha256

xlsx = sys.argv[1]
m49_path = sys.argv[2]
un_path = sys.argv[3]
out_csv = sys.argv[4]

a2_to_a3 = {}
a3_to_a2 = {}
with open(m49_path) as f:
    for row in csv.DictReader(f):
        a2, a3 = row["alpha-2"], row["alpha-3"]
        if a2 and a3:
            a2_to_a3[a2] = a3
            a3_to_a2[a3] = a2

# World Bank matrix keeps a few legacy ISO3 codes.
WB_A3_ALIAS = {
    "ROM": "RO",   # Romania (modern ROU)
    "ZAR": "CD",   # DR Congo (modern COD)
    "YUG": "RS",   # Serbia (matrix label)
    "TMP": "TL",   # Timor-Leste (modern TLS)
}

src = open(un_path).read()
m = re.search(r"UN_MEMBER_CODES[\\s\\S]*?new Set\\(\\[([\\s\\S]*?)\\]\\)", src)
if not m:
    raise SystemExit("Could not parse UN_MEMBER_CODES")
un2 = set(re.findall(r'"([A-Z]{2})"', m.group(1)))
assert len(un2) == 195, len(un2)

def to_a2(a3):
    if a3 in WB_A3_ALIAS:
        return WB_A3_ALIAS[a3]
    return a3_to_a2.get(a3)

stocks = defaultdict(int)
wb = openpyxl.load_workbook(xlsx, read_only=True, data_only=True)
for row in wb["Data"].iter_rows(min_row=2, values_only=True):
    isoo, isod, year, mig = row[0], row[2], row[7], row[8]
    if year != 2020:
        continue
    if not isinstance(mig, (int, float)) or mig <= 0:
        continue
    o2, d2 = to_a2(isoo), to_a2(isod)
    if o2 is None or d2 is None:
        continue
    if o2 not in un2 or d2 not in un2:
        continue
    if o2 == d2:
        continue
    stocks[(o2, d2)] += int(round(mig))

pairs = sorted(stocks.items())
with open(out_csv, "w", newline="") as f:
    f.write("origin,destination,stock\\n")
    for (o, d), n in pairs:
        if n > 0:
            f.write(f"{o},{d},{n}\\n")

origins = {o for (o, _), n in pairs if n > 0}
missing = sorted(un2 - origins)
print(json.dumps({
    "pairCount": sum(1 for _, n in pairs if n > 0),
    "originCount": len(origins),
    "missingOrigins": missing,
}))
`;

const r = spawnSync(
  "python3",
  ["-c", py, xlsxPath, M49, UN, OUT_CSV],
  { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);
if (r.status !== 0) {
  console.error(r.stderr || r.stdout);
  process.exit(r.status || 1);
}
const summary = JSON.parse(r.stdout.trim().split("\n").pop());
const xlsxBytes = readFileSync(xlsxPath);
const xlsxSha = createHash("sha256").update(xlsxBytes).digest("hex");
const csvBytes = readFileSync(OUT_CSV);
const csvSha = createHash("sha256").update(csvBytes).digest("hex");

const meta = {
  sourceName:
    "World Bank Global Bilateral Migration Matrix 1960–2020 (World Development Report 2023)",
  sourceUrl: "https://www.worldbank.org/en/publication/wdr2023/data",
  fileUrl:
    "https://thedocs.worldbank.org/en/doc/00700f3fc0f4eb17bdc08a372a4a2a13-0050062023/original/Global-Migration-Matrix-1960-2020.zip",
  fileName: "WBMM_1960_2020.xlsx",
  sheet: "Data",
  measure:
    "Number of people born in origin and residing in destination (male + female, year 2020)",
  year: 2020,
  license: "World Bank open data (WDR 2023 Migration Database)",
  xlsxSha256: xlsxSha,
  zipSha256: "736ad1d89f2c830930e65e5aa48cce3487ab56cfc633a8ef14b38698ce33db61",
  csvSha256: csvSha,
  pairCount: summary.pairCount,
  originCount: summary.originCount,
  missingOrigins: summary.missingOrigins,
  notes:
    "Positive stocks only for the game's 195 UN members/observers. Male+female summed for 2020. Legacy ISO3 aliases mapped: ROM→RO, ZAR→CD, YUG→RS, TMP→TL. Montenegro (ME) and Vatican City (VA) have no country codes in this matrix — left without origin rows (honest gap). Zeros omitted — never fabricated. Prefer this matrix over UN DESA IMS 2024 Table 1 for diaspora mapping because DESA omits many real corridors (e.g. AU→US/FR/DE/TH/KR).",
};

writeFileSync(OUT_META, JSON.stringify(meta, null, 2) + "\n");
console.log("Wrote", OUT_CSV);
console.log("Wrote", OUT_META);
console.log(summary);
