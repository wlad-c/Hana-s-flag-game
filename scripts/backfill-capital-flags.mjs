/**
 * Backfill capital-city flags that the P41-only generator MISSED.
 * Run AFTER scripts/build-capital-details.mjs:
 *   node scripts/build-capital-details.mjs && node scripts/download-capital-flags.mjs
 *   node scripts/backfill-capital-flags.mjs
 * (needs egress to query.wikidata.org, en.wikipedia.org, commons.wikimedia.org).
 *
 * WHY: scripts/build-capital-details.mjs sources a capital's flag ONLY from the
 * capital city's Wikidata `P41`. Many real municipal flags are NOT recorded in
 * P41 though they exist and are shown in the city's Wikipedia infobox (Edmonton,
 * Athens, Tunis, dozens of US state capitals, Slovenian/Thai/Philippine/…
 * municipalities). Treating "no P41" as "no flag" under-counts badly — the
 * curation-miss failure mode the audit (2026-07) found. This adds the missing
 * ones from a COLLISION-SAFE source and MERGES them into the manifest +
 * src/data/capitalFlags.ts. build-capital-details.mjs PRESERVES these on a later
 * regen (see loadExistingFlagSources there), so they are durable.
 *
 * COLLISION-SAFE SOURCE: the capital CITY's OWN en.wikipedia infobox
 * `image_flag`/`flag`, resolved via the Wikidata sitelink of the SAME item the
 * panel's capital comes from. Because it reads the exact article ("Liberia,
 * Costa Rica", "Groningen, Suriname"), it can never pick up a same-named
 * country/province flag the way a bare "Flag of {name}.svg" lookup would. An
 * article with no flag field yields nothing — the honest "no flag" outcome.
 *
 * GUARDS (a missing flag always beats a wrong/placeholder one):
 *   - national flag: a fallback equal to the country's national flag is rejected.
 *   - hypothetical/proposed/fictional filenames are rejected (Commons carries
 *     "Hypothetical flag of …" etc.; forbidden like inventing flag content).
 *   - placeholder "flag absent" images (e.g. "Vlag ontbreekt …", "Flag is
 *     missing …") are rejected by filename.
 *   - an SVG missing its `xmlns` won't render in an <img> — rejected.
 *   - the CDN-standardised 640x480 placeholder viewBox is skipped.
 *   - files hosted locally on en.wikipedia (Commons 404s) fall back to the
 *     en.wikipedia file host.
 * Nothing is invented; only authoritative existing files are bundled.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DETAILS = join(ROOT, "src/data/capitalDetails.ts");
const MANIFEST = join(ROOT, "scripts/data/capital-flag-sources.json");
const CAP_TS = join(ROOT, "src/data/capitalFlags.ts");
const UA = "HanaFlagGame-capital-backfill/1.0 (https://github.com/wlad-c/Hana-s-flag-game)";
const SPARQL = "https://query.wikidata.org/sparql";
const HOSTS = ["https://commons.wikimedia.org/wiki/Special:FilePath", "https://en.wikipedia.org/wiki/Special:FilePath"];
const MAX = 400_000, THUMB = 1000;
const ARTS_CACHE = "/tmp/capbf_arts.json";
const IB_CACHE = "/tmp/capbf_ib.json";

const BAD_DESIGN = /hypothetic|proposed|fictional|conceptual|unofficial proposal|fictitious|fantasy/i;
const PLACEHOLDER = /vlag ontbreekt|flag is missing|flag missing|no flag available|geen vlag|sin bandera|bandera ausente|brak flagi|нет флага|нема заставе|puudub lipp/i;

// Flags verified NOT to be the capital's own (a district's, a chiefdom's) — shared
// with build-capital-details.mjs; never propose them again.
const REJECTED = JSON.parse(readFileSync(join(ROOT, "scripts/data/capital-flag-rejected.json"), "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const loadJSON = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : d);

async function sparql(q, a = 0) {
  try {
    const r = await fetch(`${SPARQL}?format=json&query=${encodeURIComponent(q)}`, {
      headers: { "User-Agent": UA, Accept: "application/sparql-results+json" },
    });
    if (r.status === 429 || r.status >= 500) throw new Error("HTTP " + r.status);
    if (!r.ok) throw new Error("HTTP " + r.status);
    return (await r.json()).results.bindings;
  } catch (e) {
    if (a < 4) { await sleep(2000 * 2 ** a); return sparql(q, a + 1); }
    throw e;
  }
}

/** enwiki title + whether the capital already has a P41, per flagless code. */
async function fetchArticles(codes) {
  const out = loadJSON(ARTS_CACHE, {});
  const todo = codes.filter((c) => !(c in out));
  for (let i = 0; i < todo.length; i += 120) {
    const chunk = todo.slice(i, i + 120);
    const q = `SELECT ?code ?enwiki (BOUND(?flag) AS ?hasFlag) WHERE {
      VALUES ?code { ${chunk.map((c) => `"${c}"`).join(" ")} }
      ?s wdt:P300 ?code; wdt:P36 ?c.
      OPTIONAL { ?c wdt:P41 ?flag. }
      OPTIONAL { ?art schema:about ?c; schema:isPartOf <https://en.wikipedia.org/>; schema:name ?enwiki. }
    }`;
    let rows;
    try { rows = await sparql(q); } catch { continue; }
    for (const c of chunk) if (!(c in out)) out[c] = { enwiki: null, hasP41: false };
    for (const r of rows) out[r.code.value] = { enwiki: r.enwiki?.value ?? null, hasP41: r.hasFlag?.value === "true" };
    writeFileSync(ARTS_CACHE, JSON.stringify(out));
    process.stderr.write(`  sitelinks ${Math.min(i + 120, todo.length)}/${todo.length}\r`);
    await sleep(120);
  }
  return out;
}

async function infoboxFlag(title, a = 0) {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&section=0&format=json&redirects=1&page=${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429 || res.status >= 500) throw new Error("HTTP " + res.status);
    if (res.status === 404) return "";
    if (!res.ok) throw new Error("HTTP " + res.status);
    const wt = (await res.json())?.parse?.wikitext?.["*"];
    if (!wt) return "";
    const m =
      wt.match(/\|\s*image_flag\s*=\s*([^\n|}]+)/i) ||
      wt.match(/\|\s*flag_image\s*=\s*([^\n|}]+)/i) ||
      wt.match(/\|\s*flag\s*=\s*([^\n|}]+)/i);
    if (!m) return "";
    let v = m[1].trim();
    const fm = v.match(/(?:File|Image):\s*([^\]|}]+)/i);
    if (fm) v = fm[1].trim();
    v = v.replace(/^_+|_+$/g, "").trim();
    if (!v || !/\.(svg|png|jpe?g|gif)$/i.test(v)) return "";
    return v.replace(/_/g, " ");
  } catch (e) {
    if (a < 5) { await sleep(1000 * 2 ** a); return infoboxFlag(title, a + 1); }
    return null; // transient — caller leaves uncached
  }
}

const extOf = (f) => { const m = f.toLowerCase().match(/\.(svg|png|jpe?g|gif)$/); return m ? (m[1] === "jpeg" ? "jpg" : m[1]) : null; };
const extCT = (ct) => /svg/.test(ct) ? "svg" : /png/.test(ct) ? "png" : /jpe?g/.test(ct) ? "jpg" : /gif/.test(ct) ? "gif" : null;
async function dlHost(host, fn, w, a = 0) {
  let u = `${host}/${encodeURIComponent(fn)}`; if (w) u += `?width=${w}`;
  try {
    const r = await fetch(u, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (r.status === 429 || r.status >= 500) throw new Error("HTTP " + r.status);
    if (!r.ok) return { error: "HTTP " + r.status };
    return { buf: Buffer.from(await r.arrayBuffer()), ct: r.headers.get("content-type") || "" };
  } catch (e) { if (a < 5) { await sleep(1500 * 2 ** a); return dlHost(host, fn, w, a + 1); } return { error: e.message }; }
}
async function dl(fn, w = null) {
  let last = { error: "no host" };
  for (const h of HOSTS) { const r = await dlHost(h, fn, w); if (!r.error && r.buf?.length) return r; last = r; }
  return last;
}
async function capped(fn, ext) {
  const f = await dl(fn); if (f.error) return f;
  if (f.buf.length <= MAX) return { buf: f.buf, ext };
  const t = await dl(fn, THUMB); if (t.error || !t.buf?.length) return { buf: f.buf, ext };
  return { buf: t.buf, ext: extCT(t.ct) ?? "png" };
}

function flaglessCapitals(manifest) {
  const ts = readFileSync(DETAILS, "utf8");
  const codes = [...ts.matchAll(/"([A-Z]{2}-[^"]+)":\s*\{"name"/g)].map((m) => m[1]);
  return codes.filter((c) => !manifest[c]);
}
async function fetchNationalFlags(ccs) {
  const nat = {};
  try {
    const rows = await sparql(`SELECT ?iso ?flag WHERE { VALUES ?iso { ${ccs.map((c) => `"${c}"`).join(" ")} } ?c wdt:P297 ?iso; wdt:P41 ?flag. }`);
    for (const b of rows) {
      const f = decodeURIComponent(b.flag.value.split("Special:FilePath/")[1] || "").replace(/_/g, " ").toLowerCase();
      (nat[b.iso.value] ||= new Set()).add(f);
    }
  } catch { /* guard disabled if it fails */ }
  return nat;
}

function loadPaths() {
  const out = {};
  for (const m of readFileSync(CAP_TS, "utf8").matchAll(/"([^"]+)":\s*"([^"]+)"/g)) out[m[1]] = m[2];
  return out;
}
function persist(manifest, paths) {
  const om = {}; for (const k of Object.keys(manifest).sort()) om[k] = manifest[k];
  writeFileSync(MANIFEST, JSON.stringify(om, null, 0) + "\n");
  const byCC = new Map();
  for (const code of Object.keys(paths).sort()) { const cc = code.split("-")[0]; if (!byCC.has(cc)) byCC.set(cc, []); byCC.get(cc).push(code); }
  let body = "";
  for (const cc of [...byCC.keys()].sort()) { body += `\n  // ── ${cc} ──\n`; for (const code of byCC.get(cc)) body += `  ${JSON.stringify(code)}: ${JSON.stringify(paths[code])},\n`; }
  writeFileSync(CAP_TS, `// Auto-generated by scripts/download-capital-flags.mjs — DO NOT EDIT MANUALLY
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
`);
}

async function main() {
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  const flagless = flaglessCapitals(manifest);
  console.log(`${flagless.length} flagless capitals; resolving en.wiki articles…`);
  const arts = await fetchArticles(flagless);
  process.stderr.write("\n");

  const candidates = flagless.filter((c) => arts[c]?.enwiki && !arts[c]?.hasP41);
  console.log(`${candidates.length} have an en.wiki article to probe.`);

  const ib = loadJSON(IB_CACHE, {});
  const queue = candidates.filter((c) => !(c in ib));
  let probed = 0, save = 0;
  const CONC = 3;
  const q = [...queue];
  async function worker() {
    while (q.length) {
      const code = q.shift();
      await sleep(60 + Math.random() * 60);
      const file = await infoboxFlag(arts[code].enwiki);
      if (file === null) continue; // transient — retry next run
      ib[code] = file;
      if (++save >= 40) { save = 0; writeFileSync(IB_CACHE, JSON.stringify(ib)); process.stderr.write(`  probed ${++probed}/${queue.length}\r`); } else probed++;
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  writeFileSync(IB_CACHE, JSON.stringify(ib));
  process.stderr.write("\n");

  // Build the candidate map, applying filename guards.
  const hits = {};
  for (const [code, file] of Object.entries(ib)) {
    if (!file || manifest[code]) continue;
    if (BAD_DESIGN.test(file)) { console.log(`  ✗ ${code} → ${file} (hypothetical/proposed)`); continue; }
    if (PLACEHOLDER.test(file)) { console.log(`  ✗ ${code} → ${file} (flag-absent placeholder)`); continue; }
    if (REJECTED[code]?.file === file) { console.log(`  ✗ ${code} → ${file} (verified not the capital's own flag)`); continue; }
    hits[code] = file;
  }
  console.log(`${Object.keys(hits).length} candidate flags after name filters.`);

  const nat = await fetchNationalFlags([...new Set(Object.keys(hits).map((c) => c.split("-")[0]))]);
  const paths = loadPaths();
  let ok = 0, natRej = 0, skip = 0, fail = 0, n = 0;
  for (const [code, fn] of Object.entries(hits)) {
    if (manifest[code]) continue;
    const cc = code.split("-")[0];
    if (nat[cc]?.has(fn.toLowerCase())) { natRej++; console.log(`  ✗ ${code} → ${fn} is the national flag`); continue; }
    const ext = extOf(fn); if (!ext) { skip++; continue; }
    const { buf, ext: fe, error } = await capped(fn, ext);
    if (error || !buf?.length) { fail++; console.log(`  FAIL ${code} → ${fn} (${error})`); continue; }
    if (fe === "svg") {
      const head = buf.slice(0, 4000).toString("utf8");
      if (/viewBox\s*=\s*["']0 0 640 480["']/i.test(head)) { skip++; continue; }
      if (!/xmlns\s*=/.test(head)) { console.log(`  ✗ ${code} → ${fn} (SVG has no xmlns; won't render)`); skip++; continue; }
    }
    const rel = `capital-flags/${code.toLowerCase()}.${fe}`;
    writeFileSync(join(ROOT, "public", rel), buf);
    paths[code] = rel; manifest[code] = fn; ok++;
    if (++n % 20 === 0) persist(manifest, paths);
  }
  persist(manifest, paths);
  console.log(`\nDone: ${ok} bundled, ${natRej} national-flag rejects, ${skip} skipped, ${fail} failed.`);
  console.log(`Manifest ${Object.keys(manifest).length}, capitalFlags ${Object.keys(paths).length}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
