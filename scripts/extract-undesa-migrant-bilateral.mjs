#!/usr/bin/env node
/**
 * Re-extract scripts/data/undesa-ims-2024-bilateral-iso2.csv from the official
 * UN DESA International Migrant Stock 2024 destination-and-origin workbook.
 *
 * Usage:
 *   node scripts/extract-undesa-migrant-bilateral.mjs [path/to.xlsx]
 *
 * If no path is given, downloads the official workbook to /tmp and extracts.
 * Requires python3 + openpyxl (`pip install openpyxl`).
 *
 * Mapping M49 location codes → ISO alpha-2 uses the committed
 * scripts/data/iso3166-m49.json (lukes/ISO-3166-Countries-with-Regional-Codes).
 * Only the game's 195 UN members / permanent observers are kept.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CSV_OUT = resolve(__dirname, "data/undesa-ims-2024-bilateral-iso2.csv");
const M49 = resolve(__dirname, "data/iso3166-m49.json");
const UN_CODES_FILE = resolve(ROOT, "src/lib/unMemberStates.ts");

const WORKBOOK_URL =
  "https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/undesa_pd_2024_ims_stock_by_sex_destination_and_origin.xlsx";

const xlsxArg = process.argv[2];
let xlsxPath = xlsxArg ? resolve(xlsxArg) : "/tmp/undesa_pd_2024_ims_stock_by_sex_destination_and_origin.xlsx";

if (!existsSync(xlsxPath)) {
  console.log(`Downloading ${WORKBOOK_URL}`);
  const curl = spawnSync(
    "curl",
    ["-sL", "-A", "Mozilla/5.0", "-o", xlsxPath, WORKBOOK_URL],
    { encoding: "utf8" },
  );
  if (curl.status !== 0 || !existsSync(xlsxPath)) {
    console.error("Failed to download workbook:", curl.stderr || curl.error);
    process.exit(1);
  }
}

const py = `
import csv, json, re, sys
from openpyxl import load_workbook

xlsx, m49_path, un_path, out_path = sys.argv[1:5]
m49 = {row["m49"]: row["alpha2"] for row in json.load(open(m49_path))}
src = open(un_path).read()
m = re.search(r'UN_MEMBER_CODES[\\s\\S]*?=\\s*new Set\\(\\[([\\s\\S]*?)\\]\\)', src)
un = set(re.findall(r'"([A-Z]{2})"', m.group(1)))
wb = load_workbook(xlsx, read_only=True, data_only=True)
ws = wb["Table 1"]
pairs = []
for row in ws.iter_rows(min_row=12, values_only=True):
    dest_code, orig_code, val = row[4], row[6], row[14]
    if not isinstance(dest_code, int) or not isinstance(orig_code, int):
        continue
    if dest_code >= 900 or orig_code >= 900 or dest_code == 2003 or orig_code == 2003:
        continue
    d = m49.get(dest_code)
    o = m49.get(orig_code)
    if d is None or o is None or d not in un or o not in un or d == o:
        continue
    if val is None:
        continue
    stock = int(round(float(val)))
    if stock < 0:
        raise SystemExit(f"Negative stock {d}←{o}: {val}")
    pairs.append((d, o, stock))
wb.close()
pairs.sort()
# Deduplicate — Table 1 should be unique; refuse collisions.
seen = {}
for d, o, s in pairs:
    key = (d, o)
    if key in seen and seen[key] != s:
        raise SystemExit(f"Conflicting values for {d}←{o}: {seen[key]} vs {s}")
    seen[key] = s
with open(out_path, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["destination", "origin", "stock_2024"])
    for (d, o), s in sorted(seen.items()):
        w.writerow([d, o, s])
print(f"Wrote {len(seen)} pairs to {out_path}")
`;

const result = spawnSync(
  "python3",
  ["-c", py, xlsxPath, M49, UN_CODES_FILE, CSV_OUT],
  { encoding: "utf8" },
);
if (result.status !== 0) {
  console.error(result.stdout);
  console.error(result.stderr);
  process.exit(result.status || 1);
}
console.log(result.stdout.trim());
const sha = createHash("sha256").update(readFileSync(CSV_OUT)).digest("hex");
console.log(`sha256 ${sha}`);
console.log("Next: node scripts/build-migrant-origins.mjs");
