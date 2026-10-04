/**
 * Download subdivision-capital city flags from Wikimedia Commons and bundle them
 * locally, then emit src/data/capitalFlags.ts.
 *
 * Run (after scripts/build-capital-details.mjs, which writes the source manifest):
 *   node scripts/download-capital-flags.mjs
 *
 * Reads scripts/data/capital-flag-sources.json (code → Commons flag filename,
 * produced by the details generator), fetches each file via Commons
 * Special:FilePath (which redirects to upload.wikimedia.org), and saves it to
 * public/capital-flags/{code}.{ext}. Then writes src/data/capitalFlags.ts mapping
 * each code to its bundled BASE-relative path — containing ONLY files that
 * actually downloaded, so the app never references a missing asset.
 *
 * WHY A SEPARATE public/capital-flags/ DIRECTORY (not public/flags/): city /
 * municipal flags are a distinct category from national and subdivision flags.
 * The strict national/subdivision flag CI (npm run flags:check — proportions,
 * parent-collision, image-quality, transparency) scans public/flags/ recursively
 * and is calibrated for those flags' real-world proportions and sourcing rules.
 * Keeping capital flags out of that tree avoids entangling them with checks
 * written for a different flag class, while still bundling them locally (the
 * "all flag files must be bundled — no remote runtime URLs" hard rule is met).
 *
 * SOURCING: every file is the authoritative Commons original (never a
 * CDN-standardised 4:3 copy). Files whose viewBox is the standardised 640×480
 * (4:3) placeholder are skipped so a wrong-ratio flag is never bundled. (512×512
 * is NOT skipped — it is a genuine 1:1 square, the real ratio of many municipal /
 * cantonal flags.) The script only downloads existing authoritative files — it
 * never invents flag content.
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync, rmSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MANIFEST = join(__dirname, "data", "capital-flag-sources.json");
const OUT_DIR = join(ROOT, "public", "capital-flags");
const OUTPUT_TS = join(ROOT, "src", "data", "capitalFlags.ts");

// Commons first; some flags are hosted LOCALLY on en.wikipedia (Commons
// Special:FilePath 404s for them — e.g. several US state-capital flags), so fall
// back to the en.wikipedia file host.
const FILE_HOSTS = [
  "https://commons.wikimedia.org/wiki/Special:FilePath",
  "https://en.wikipedia.org/wiki/Special:FilePath",
];
const USER_AGENT =
  "HanaFlagGame-capital-flags/1.0 (https://github.com/wlad-c/Hana-s-flag-game)";
// Some authoritative city flags are extremely detailed heraldic vectors (Venice's
// Lion of St Mark SVG is ~4.5 MB; Luxembourg's a 15 MB raster). Bundling those as
// the original would bloat the app badly, so any file over this size is replaced
// with a Commons-rendered raster thumbnail (Special:FilePath ?width=…) — the SAME
// authoritative image, just downscaled; never a different or invented flag.
const MAX_BYTES = 400_000;
const THUMB_WIDTH = 1000;
// Only 640×480 (4:3) reliably marks a CDN-standardised copy for these flags.
// 512×512 is a genuine 1:1 SQUARE — the real ratio of many municipal/cantonal
// flags (Swiss cantons, heraldic banners) — so it must NOT be treated as a
// placeholder here; skipping it would drop legitimately-square city flags.
const FORBIDDEN_VIEWBOX = [/viewBox\s*=\s*["']0 0 640 480["']/i];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extOf(filename) {
  const m = filename.toLowerCase().match(/\.(svg|png|jpe?g|gif)$/);
  return m ? (m[1] === "jpeg" ? "jpg" : m[1]) : null;
}

const extFromContentType = (ct) =>
  /svg/.test(ct) ? "svg" : /png/.test(ct) ? "png" : /jpe?g/.test(ct) ? "jpg" : /gif/.test(ct) ? "gif" : null;

async function downloadFrom(host, filename, width = null, attempt = 0) {
  let url = `${host}/${encodeURIComponent(filename)}`;
  if (width) url += `?width=${width}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT }, redirect: "follow" });
    if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    return { buf, contentType: res.headers.get("content-type") || "" };
  } catch (e) {
    if (attempt < 6) {
      // Back off with jitter so concurrent workers don't retry in lockstep and
      // re-trip the rate limiter (HTTP 429).
      await sleep(1500 * 2 ** attempt + Math.random() * 1500);
      return downloadFrom(host, filename, width, attempt + 1);
    }
    return { error: e.message };
  }
}

async function download(filename, width = null) {
  let last = { error: "no host" };
  for (const host of FILE_HOSTS) {
    const r = await downloadFrom(host, filename, width);
    if (!r.error && r.buf?.length) return r;
    last = r;
  }
  return last;
}

/**
 * Fetch a capital flag, capping the bundled size: if the original is over
 * MAX_BYTES, re-fetch a Commons-rendered thumbnail (same image, downscaled) and
 * return it with the extension matching the rendered content-type.
 */
async function downloadCapped(filename, originalExt) {
  const first = await download(filename);
  if (first.error) return first;
  if (first.buf.length <= MAX_BYTES) return { buf: first.buf, ext: originalExt };
  const thumb = await download(filename, THUMB_WIDTH);
  if (thumb.error || !thumb.buf || thumb.buf.length === 0) {
    // Rendering failed — fall back to the original rather than dropping the flag.
    return { buf: first.buf, ext: originalExt };
  }
  const ext = extFromContentType(thumb.contentType) ?? "png";
  return { buf: thumb.buf, ext, rendered: true };
}

async function main() {
  if (!existsSync(MANIFEST)) {
    console.error(`Missing ${MANIFEST}. Run: node scripts/build-capital-details.mjs first.`);
    process.exit(1);
  }
  const sources = JSON.parse(readFileSync(MANIFEST, "utf8"));
  const codes = Object.keys(sources).sort();
  console.log(`${codes.length} capital flag source(s) in the manifest.`);

  // Rebuild the directory from scratch so a removed/renamed source can't leave a
  // stale file behind (the emitted TS is the single source of truth). Skip
  // subdirectories: public/capital-flags/national/ belongs to the separate
  // NATIONAL-capital-flag feature (src/data/nationalCapitalFlags.ts), not this
  // subdivision-capital manifest — deleting it here would destroy an unrelated,
  // untracked-by-this-script asset tree.
  if (existsSync(OUT_DIR)) {
    for (const f of readdirSync(OUT_DIR)) {
      const p = join(OUT_DIR, f);
      if (statSync(p).isDirectory()) continue;
      rmSync(p);
    }
  } else {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  const bundled = {}; // code -> "capital-flags/xx.ext"
  let ok = 0,
    skipped = 0,
    failed = 0,
    done = 0;

  // Each Special:FilePath fetch incurs a redirect, so process a pool of codes
  // concurrently to keep the total wall time reasonable for ~1000+ files.
  const CONCURRENCY = 4;
  const queue = [...codes];

  async function worker() {
    while (queue.length) {
      const code = queue.shift();
      await sleep(60 + Math.random() * 80); // gentle stagger to stay under rate limits
      const filename = sources[code];
      const ext = extOf(filename);
      done++;
      if (!ext) {
        console.log(`[${done}/${codes.length}] ${code} → skip (unsupported: ${filename})`);
        skipped++;
        continue;
      }
      const { buf, ext: finalExt, error } = await downloadCapped(filename, ext);
      if (error || !buf || buf.length === 0) {
        console.log(`[${done}/${codes.length}] ${code} → FAILED (${error ?? "empty"})`);
        failed++;
        continue;
      }
      if (finalExt === "svg") {
        const head = buf.slice(0, 4000).toString("utf8");
        if (FORBIDDEN_VIEWBOX.some((re) => re.test(head))) {
          console.log(`[${done}/${codes.length}] ${code} → skip (standardised viewBox)`);
          skipped++;
          continue;
        }
      }
      const rel = `capital-flags/${code.toLowerCase()}.${finalExt}`;
      writeFileSync(join(ROOT, "public", rel), buf);
      bundled[code] = rel;
      ok++;
      if (done % 50 === 0) console.log(`[${done}/${codes.length}] … ${ok} bundled so far`);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  writeOutput(bundled);
  console.log(`\nDone: ${ok} bundled, ${skipped} skipped, ${failed} failed.`);
}

function writeOutput(bundled) {
  const byCountry = new Map();
  for (const code of Object.keys(bundled).sort()) {
    const cc = code.split("-")[0];
    if (!byCountry.has(cc)) byCountry.set(cc, []);
    byCountry.get(cc).push(code);
  }
  let body = "";
  for (const cc of [...byCountry.keys()].sort()) {
    body += `\n  // ── ${cc} ──\n`;
    for (const code of byCountry.get(cc)) {
      body += `  ${JSON.stringify(code)}: ${JSON.stringify(bundled[code])},\n`;
    }
  }
  const ts = `// Auto-generated by scripts/download-capital-flags.mjs — DO NOT EDIT MANUALLY
// Maps an ISO 3166-2 subdivision code to its capital city's bundled flag
// (public/capital-flags/*), downloaded from Wikimedia Commons (the authoritative
// original file, keyed via the capital's Wikidata P41). Only codes whose flag
// actually downloaded appear here, so the app never references a missing asset.
// The path is BASE-relative; resolve with import.meta.env.BASE_URL.
//
// To refresh: node scripts/build-capital-details.mjs && node scripts/download-capital-flags.mjs
// (needs egress to query.wikidata.org + commons.wikimedia.org).

/** Keyed by ISO 3166-2 subdivision code → BASE-relative bundled flag path. */
export const CAPITAL_FLAGS: Readonly<Record<string, string>> = {${body}};
`;
  writeFileSync(OUTPUT_TS, ts);
  console.log(`\nWrote ${OUTPUT_TS} (${Object.keys(bundled).length} bundled capital flags)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
