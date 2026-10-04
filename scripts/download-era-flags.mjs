// Download the curated period flags used by the Learn-mode historical eras.
//
// Every file under public/historical-flags/ must come from an authoritative source —
// same rule as every other flag in this repo ("never generate, invent or approximate
// flag SVG content"). This script is the provenance record for the SVG-format era flags:
// scripts/data/era-flag-sources.json maps each local file to the exact Wikimedia Commons
// filename it was fetched from, with the fetch date and a sha256 of the bytes, so any
// bundled era flag can be traced back and re-verified later.
//
// (The older PNG era flags were fetched by scripts/download_historical_flags.py, which
// rasterises to 320×192. New flags are bundled as SVG instead: no rasteriser dependency,
// and the file keeps its real aspect ratio.)
//
//   node scripts/download-era-flags.mjs            → fetch anything missing
//   node scripts/download-era-flags.mjs --force    → re-fetch everything
//   node scripts/download-era-flags.mjs --check     → verify bundled bytes match the
//                                                     recorded sha256, fetch nothing

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const MANIFEST = R("data/era-flag-sources.json");
const UA = "HanaFlagGame/1.0 (historical-era flag audit; https://github.com/wlad-c/hana-s-flag-game)";

const force = process.argv.includes("--force");
const checkOnly = process.argv.includes("--check");
const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

/** Direct upload.wikimedia.org URL for a Commons filename (md5 path sharding). */
function commonsUrl(filename) {
  const name = filename.replace(/ /g, "_");
  const md5 = createHash("md5").update(name, "utf8").digest("hex");
  return `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(name)}`;
}

let failed = 0;
let fetched = 0;
let verified = 0;

for (const [local, entry] of Object.entries(manifest.files)) {
  const dest = R(`../public/historical-flags/${local}`);
  const have = existsSync(dest);

  if (have && !force) {
    const digest = sha(readFileSync(dest));
    if (entry.sha256 && digest !== entry.sha256) {
      console.error(`✗ ${local}: sha256 mismatch — bundled bytes differ from the recorded source.`);
      failed++;
    } else {
      verified++;
    }
    continue;
  }
  if (checkOnly) {
    console.error(`✗ ${local}: not bundled (manifest expects it from "${entry.commons}").`);
    failed++;
    continue;
  }

  const url = commonsUrl(entry.commons);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    console.error(`✗ ${local}: HTTP ${res.status} for ${entry.commons}`);
    failed++;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const isPng = local.endsWith(".png");
  const looksSvg = buf.slice(0, 400).toString("utf8").includes("<svg");
  const looksPng = buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (isPng ? !looksPng : !looksSvg) {
    console.error(`✗ ${local}: fetched bytes are not ${isPng ? "a PNG" : "an SVG"}.`);
    failed++;
    continue;
  }
  writeFileSync(dest, buf);
  entry.sha256 = sha(buf);
  entry.fetched = new Date().toISOString().slice(0, 10);
  fetched++;
  console.log(`✓ ${local}  ←  ${entry.commons}`);
  await new Promise((r) => setTimeout(r, 400));
}

if (fetched > 0) {
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(`\n${fetched} fetched, ${verified} verified, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
