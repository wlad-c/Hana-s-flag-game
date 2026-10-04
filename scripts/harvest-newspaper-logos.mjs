#!/usr/bin/env node
/**
 * Harvest candidate masthead/logo images for newspapers & news agencies.
 *
 * Strategy (in order; ranked, first usable wins):
 *  1. Official site HTML: JSON-LD logo, <img> logo/masthead, og/twitter image
 *  2. Common brand-asset path guesses on the official host
 *  3. Wikimedia Commons — ONLY when the filename clearly names THIS outlet
 *     (strict token match + leftover-token collision guard; never fuzzy)
 *  4. Clearbit Logo API for the official host (last resort brand mark)
 *
 * NEVER invents SVG. Downloads raw bytes only. Rejects HTML error pages,
 * tiny favicons (< 2 KB unless SVG), likely news photos, and route-map SVGs.
 *
 * Usage:
 *   node scripts/harvest-newspaper-logos.mjs [--limit N] [--kind newspaper|agency] [--cc AE,GB]
 *   node scripts/harvest-newspaper-logos.mjs --ids ae-the-national,ae-gulf-news
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "tmp/logo-harvest");
const UA =
  "HanasFlagGameLogoHarvester/1.0 (+https://github.com/wlad-c/Hana-s-flag-game; educational)";

function loadConst(path, marker) {
  const src = readFileSync(path, "utf8");
  const start = src.indexOf(marker);
  const eq = src.indexOf("= {", start);
  const open = src.indexOf("{", eq);
  let depth = 0,
    i = open,
    inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") {
        i++;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      i = src.indexOf("\n", i);
      if (i < 0) break;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  return Function(`"use strict"; return (${src.slice(open, i)});`)();
}

function sniff(buf) {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return "png";
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("latin1") === "RIFF" &&
    buf.subarray(8, 12).toString("latin1") === "WEBP"
  )
    return "webp";
  if (buf.length >= 6 && buf.subarray(0, 6).toString("latin1") === "GIF87a") return "gif";
  if (buf.length >= 6 && buf.subarray(0, 6).toString("latin1") === "GIF89a") return "gif";
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^\uFEFF/, "").trimStart().toLowerCase();
  if (head.startsWith("<!doctype html") || head.startsWith("<html")) return "html";
  const stripped = head
    .replace(/^<\?xml[^>]*\?>\s*/, "")
    .replace(/^(<!--[\s\S]*?-->|<!doctype svg[^>]*>|\s)+/, "");
  if (stripped.startsWith("<svg") || head.includes("<svg")) return "svg";
  return null;
}

async function fetchBuf(url, { timeoutMs = 20000, maxBytes = 2_000_000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "image/*,application/xhtml+xml,text/html,*/*" },
      redirect: "follow",
    });
    if (!res.ok) return { ok: false, status: res.status, url: res.url };
    const ab = await res.arrayBuffer();
    if (ab.byteLength > maxBytes) return { ok: false, status: res.status, url: res.url, err: "too-large" };
    const buf = Buffer.from(ab);
    return { ok: true, status: res.status, url: res.url, buf, ctype: res.headers.get("content-type") || "" };
  } catch (e) {
    return { ok: false, err: String(e?.message || e) };
  } finally {
    clearTimeout(t);
  }
}

function absUrl(base, href) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function extractLogoCandidatesFromHtml(html, pageUrl) {
  const out = [];
  const push = (u, why) => {
    if (!u) return;
    const abs = absUrl(pageUrl, u);
    if (!abs || !/^https?:\/\//i.test(abs)) return;
    // skip obvious non-logos
    if (/\.(mp4|webm|pdf)(\?|$)/i.test(abs)) return;
    out.push({ url: abs, why });
  };

  // meta images
  for (const re of [
    /property=["']og:image["'][^>]*content=["']([^"']+)["']/gi,
    /content=["']([^"']+)["'][^>]*property=["']og:image["']/gi,
    /name=["']twitter:image["'][^>]*content=["']([^"']+)["']/gi,
    /content=["']([^"']+)["'][^>]*name=["']twitter:image["']/gi,
  ]) {
    let m;
    while ((m = re.exec(html))) push(m[1], "meta-og/twitter");
  }

  // link rel icons (usually small — kept as last-resort)
  for (const re of [
    /rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/gi,
    /href=["']([^"']+)["'][^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["']/gi,
  ]) {
    let m;
    while ((m = re.exec(html))) push(m[1], "link-icon");
  }

  // <img> / <source> with logo/masthead/brand in attrs or nearby class
  const imgRe = /<(?:img|source)\b[^>]*>/gi;
  let im;
  while ((im = imgRe.exec(html))) {
    const tag = im[0];
    const attrs = `${tag}`;
    if (!/logo|masthead|brand|wordmark|nameplate|emblem|site-title|navbar-brand|header__logo|custom-logo/i.test(attrs))
      continue;
    const src =
      (attrs.match(/\bsrc=["']([^"']+)["']/i) || [])[1] ||
      (attrs.match(/\bdata-src=["']([^"']+)["']/i) || [])[1] ||
      (attrs.match(/\bdata-lazy-src=["']([^"']+)["']/i) || [])[1] ||
      (attrs.match(/\bsrcset=["']([^"'\s,]+)/i) || [])[1];
    push(src, "img-logo-attr");
  }

  // CSS / inline background-image urls that look like logos
  const bgRe = /background(?:-image)?\s*:\s*url\((['"]?)([^)'"]+)\1\)/gi;
  let bg;
  while ((bg = bgRe.exec(html))) {
    if (/logo|masthead|brand|wordmark/i.test(bg[2])) push(bg[2], "css-bg-logo");
  }

  // JSON-LD logo
  const ldRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let ld;
  while ((ld = ldRe.exec(html))) {
    try {
      const j = JSON.parse(ld[1]);
      const walk = (o) => {
        if (!o || typeof o !== "object") return;
        if (typeof o.logo === "string") push(o.logo, "json-ld-logo");
        if (o.logo && typeof o.logo === "object" && o.logo.url) push(o.logo.url, "json-ld-logo");
        if (Array.isArray(o)) o.forEach(walk);
        else Object.values(o).forEach(walk);
      };
      walk(j);
    } catch {
      /* ignore */
    }
  }

  // de-dupe preserving order
  const seen = new Set();
  return out.filter((c) => {
    if (seen.has(c.url)) return false;
    seen.add(c.url);
    return true;
  });
}

async function commonsSearch(query, limit = 8) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("list", "search");
  api.searchParams.set("srsearch", query);
  api.searchParams.set("srnamespace", "6");
  api.searchParams.set("srlimit", String(limit));
  api.searchParams.set("format", "json");
  const r = await fetchBuf(api.href, { timeoutMs: 15000, maxBytes: 500_000 });
  if (!r.ok) return [];
  try {
    const j = JSON.parse(r.buf.toString("utf8"));
    return (j.query?.search || []).map((x) => x.title);
  } catch {
    return [];
  }
}

async function commonsFileUrl(title) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("titles", title);
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|size|mime|sha1");
  api.searchParams.set("format", "json");
  const r = await fetchBuf(api.href, { timeoutMs: 15000, maxBytes: 500_000 });
  if (!r.ok) return null;
  try {
    const j = JSON.parse(r.buf.toString("utf8"));
    const page = Object.values(j.query?.pages || {})[0];
    if (!page || page.missing || !page.imageinfo?.[0]) return null;
    const ii = page.imageinfo[0];
    return { url: ii.url, size: ii.size, mime: ii.mime, sha1: ii.sha1, title };
  } catch {
    return null;
  }
}

function isUsableImage(buf, kind, why) {
  if (!kind || kind === "html") return false;
  // reject tiny favicon-ish rasters from link-icon unless decent size
  if (why === "link-icon" && kind !== "svg" && buf.length < 4000) return false;
  if (kind !== "svg" && buf.length < 1500) return false;
  if (kind === "svg") {
    const t = buf.toString("utf8");
    if ((t.match(/<title/gi) || []).length > 5) return false;
    if (/geoEqualearth|projection|latitud|longitude|countries in which/i.test(t)) return false;
    // reject fabricated fingerprint
    const hasText = /<text[\s>]/i.test(t);
    const hasRect = /<rect[\s>]/i.test(t);
    const pathCount = (t.match(/<path[\s>]/gi) || []).length;
    if (buf.length < 2500 && hasText && hasRect && pathCount <= 2) return false;
    if (buf.length < 1500 && hasText) return false;
  }
  return true;
}

function extFor(kind) {
  return kind === "jpeg" ? ".jpg" : kind === "svg" ? ".svg" : `.${kind}`;
}

function parseArgs(argv) {
  const opts = { limit: Infinity, kind: null, cc: null, ids: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit") opts.limit = Number(argv[++i]);
    else if (a === "--kind") opts.kind = argv[++i];
    else if (a === "--cc") opts.cc = new Set(argv[++i].split(",").map((s) => s.trim().toUpperCase()));
    else if (a === "--ids") opts.ids = new Set(argv[++i].split(",").map((s) => s.trim()));
  }
  return opts;
}

function collectGaps(opts) {
  const papers = loadConst(resolve(ROOT, "src/data/nationalNewspapers.ts"), "export const NATIONAL_NEWSPAPERS");
  const agencies = loadConst(
    resolve(ROOT, "src/data/nationalNewsAgencies.ts"),
    "export const NATIONAL_NEWS_AGENCIES",
  );
  const out = [];
  const add = (kind, data) => {
    for (const [cc, list] of Object.entries(data)) {
      for (const p of list) {
        if (p.logo) continue;
        if (opts.kind && opts.kind !== kind) continue;
        if (opts.cc && !opts.cc.has(cc)) continue;
        if (opts.ids && !opts.ids.has(p.id)) continue;
        const site = (p.sources || []).find((s) => /^https?:\/\//.test(s) && !/wikipedia|wikidata|wikimedia/i.test(s));
        out.push({
          kind,
          cc,
          id: p.id,
          name: p.name,
          nativeName: p.nativeName || null,
          site: site || null,
          slug: p.id.replace(/^[a-z]{2}-/, ""),
        });
      }
    }
  };
  add("newspaper", papers);
  add("agency", agencies);
  return out.slice(0, opts.limit);
}

const STOP_NAME = new Set([
  "the", "and", "for", "del", "der", "die", "das", "les", "los", "las", "el", "la", "de", "di", "da", "do",
  "van", "von", "des", "den", "het", "een", "und", "of", "y", "e", "i", "a", "al", "le", "du",
]);
const LOGO_WORDS = new Set([
  "logo", "logos", "masthead", "wordmark", "logotipo", "emblem", "nameplate", "brand", "marca",
  "official", "oficial", "nuevo", "new", "black", "white", "bianco", "blanco", "noir", "weiss",
  "schwarz", "red", "blue", "svg", "png", "jpg", "jpeg", "webp", "vector", "icon", "symbol",
]);

function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOP_NAME.has(t));
}

/** Require Commons filename to clearly name THIS newspaper (collision guard). */
function commonsTitleMatchesEntry(title, entry) {
  const bare = title.replace(/^File:/i, "").replace(/\.[a-z0-9]+$/i, "");
  const hay = bare
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const nameTokens = normalizeName(entry.name);
  const nativeTokens = entry.nativeName ? normalizeName(entry.nativeName) : [];
  const significant = nameTokens.filter((t) => t.length >= 4);
  const looksLikeLogo = /logo|masthead|wordmark|logotipo|emblem|nameplate/i.test(bare);

  // Short / ambiguous titles (ABC, VG, Stuff, NRC) MUST say logo AND include every token
  if (significant.length === 0) {
    if (!looksLikeLogo) return false;
    if (!nameTokens.every((t) => hay.includes(t))) return false;
  } else {
    // Every significant name token must appear (prevents "Gulf News" → "Gulf Daily News",
    // "The National" → "Brazilian government", "El Mundo" → "Cooperatives Day")
    const nameCovered = significant.every((t) => hay.includes(t));
    const nativeSig = nativeTokens.filter((t) => t.length >= 4);
    const nativeCovered = nativeSig.length > 0 && nativeSig.every((t) => hay.includes(t));
    if (!nameCovered && !nativeCovered) return false;
  }

  // Leftover significant words in the Commons title that are NOT in the entry name
  // are almost always a different entity ("Chile", "Daily", "Revolucionaria", "INAIL"…)
  const known = new Set([...nameTokens, ...nativeTokens, ...LOGO_WORDS]);
  const leftover = hay
    .split(/\s+/)
    .filter((t) => t.length >= 3)
    .filter((t) => !/^\d{2,4}$/.test(t))
    .filter((t) => !known.has(t))
    .filter((t) => ![...known].some((k) => k.length >= 4 && (k.includes(t) || t.includes(k))));
  if (leftover.length > 0) return false;

  // Hard denylist for known false friends that slipped through earlier harvests
  if (
    /\b(chile|brazil|brasil|bahrain|revolucionaria|cooperativ|inail|crzz|lockss|mundial|silma|governo|government)\b/i.test(
      bare,
    )
  ) {
    const blob = `${entry.name} ${entry.nativeName || ""} ${entry.cc}`.toLowerCase();
    if (!/\b(chile|brazil|brasil|bahrain)\b/.test(blob)) return false;
  }
  return true;
}

async function harvestOne(entry) {
  const candidates = [];

  // 1) Official site FIRST — collision-safe
  if (entry.site) {
    const page = await fetchBuf(entry.site, { timeoutMs: 25000, maxBytes: 1_500_000 });
    if (page.ok && sniff(page.buf) === "html") {
      const html = page.buf.toString("utf8");
      const fromHtml = extractLogoCandidatesFromHtml(html, page.url);
      for (const c of fromHtml.slice(0, 15)) candidates.push({ url: c.url, why: `site:${c.why}` });
    }
    try {
      const u = new URL(entry.site);
      for (const g of [
        "/logo.svg",
        "/logo.png",
        "/images/logo.svg",
        "/images/logo.png",
        "/assets/logo.svg",
        "/assets/images/logo.svg",
        "/static/logo.svg",
        "/wp-content/uploads/logo.png",
      ]) {
        candidates.push({ url: `${u.origin}${g}`, why: "path-guess" });
      }
    } catch {
      /* ignore */
    }
  }

  // 2) Commons — strict title match only
  const queries = [
    `intitle:"${entry.name}" logo`,
    entry.nativeName ? `intitle:"${entry.nativeName}" logo` : null,
    `"${entry.name}" masthead`,
    `File:${entry.name} logo`,
  ].filter(Boolean);

  for (const q of queries) {
    const titles = await commonsSearch(q, 10);
    for (const title of titles) {
      if (!commonsTitleMatchesEntry(title, entry)) continue;
      const info = await commonsFileUrl(title);
      if (!info) continue;
      candidates.push({ ...info, why: `commons:${title}` });
    }
  }

  // 3) Clearbit brand mark for the official host (last resort)
  if (entry.site) {
    try {
      const host = new URL(entry.site).hostname.replace(/^www\./, "");
      candidates.push({ url: `https://logo.clearbit.com/${host}`, why: "clearbit" });
    } catch {
      /* ignore */
    }
  }

  // Prefer site hits before commons / path-guess / clearbit when ranking
  const rank = (why) => {
    if (why.startsWith("site:json-ld")) return 0;
    if (why.startsWith("site:img-logo")) return 1;
    if (why.startsWith("site:css-bg")) return 2;
    if (why.startsWith("site:meta")) return 3;
    if (why.startsWith("commons:")) return 4;
    if (why === "path-guess") return 5;
    if (why === "clearbit") return 6;
    if (why.startsWith("site:link-icon")) return 7;
    return 8;
  };
  candidates.sort((a, b) => rank(a.why) - rank(b.why));

  // de-dupe by url
  const seen = new Set();
  const unique = candidates.filter((c) => {
    if (!c.url || seen.has(c.url)) return false;
    seen.add(c.url);
    return true;
  });

  const tried = [];
  let best = null;
  for (const c of unique.slice(0, 25)) {
    const r = await fetchBuf(c.url, { timeoutMs: 20000 });
    if (!r.ok || !r.buf) {
      tried.push({ url: c.url, why: c.why, ok: false, err: r.err || r.status });
      continue;
    }
    const kind = sniff(r.buf);
    const whyShort = c.why.replace(/^site:/, "");
    if (!isUsableImage(r.buf, kind, whyShort)) {
      tried.push({ url: c.url, why: c.why, ok: false, kind, size: r.buf.length, reject: "filter" });
      continue;
    }
    // Reject og:image that is clearly a news photo (large jpeg with no logo in url)
    if (
      c.why.includes("meta-og") &&
      (kind === "jpeg" || kind === "png" || kind === "webp") &&
      !/logo|masthead|brand|wordmark|emblem/i.test(c.url) &&
      r.buf.length > 80_000
    ) {
      tried.push({ url: c.url, why: c.why, ok: false, kind, size: r.buf.length, reject: "likely-photo" });
      continue;
    }
    const sha = createHash("sha256").update(r.buf).digest("hex");
    const dir = join(OUT_DIR, entry.cc.toLowerCase());
    mkdirSync(dir, { recursive: true });
    // Keep multiple candidates per entry for visual review
    const n = tried.filter((t) => t.ok).length;
    const file = n === 0 ? `${entry.slug}${extFor(kind)}` : `${entry.slug}-alt${n}${extFor(kind)}`;
    const abs = join(dir, file);
    writeFileSync(abs, r.buf);
    const rel = `tmp/logo-harvest/${entry.cc.toLowerCase()}/${file}`;
    const hit = {
      url: r.url || c.url,
      why: c.why,
      ok: true,
      kind,
      size: r.buf.length,
      sha256: sha,
      path: rel,
    };
    tried.push(hit);
    if (!best || rank(c.why) < rank(best.why) || (rank(c.why) === rank(best.why) && kind === "svg" && best.kind !== "svg")) {
      best = hit;
    }
    // Early stop once we have a strong site logo (svg or named logo asset)
    if (
      (c.why.startsWith("site:img-logo") || c.why.startsWith("site:json-ld")) &&
      (kind === "svg" || r.buf.length >= 3000)
    ) {
      break;
    }
    if (c.why.startsWith("commons:") && kind === "svg") break;
  }
  return { entry, hit: best, tried };
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const opts = parseArgs(process.argv);
  const gaps = collectGaps(opts);
  console.log(`Harvesting ${gaps.length} entries…`);
  const results = [];
  let i = 0;
  for (const g of gaps) {
    i++;
    process.stdout.write(`[${i}/${gaps.length}] ${g.id} … `);
    try {
      const r = await harvestOne(g);
      results.push(r);
      console.log(r.hit ? `OK ${r.hit.kind} ${r.hit.size}b via ${r.hit.why}` : "MISS");
    } catch (e) {
      console.log("ERR", e.message || e);
      results.push({ entry: g, hit: null, tried: [], err: String(e) });
    }
  }
  const summary = {
    at: new Date().toISOString(),
    total: results.length,
    hits: results.filter((r) => r.hit).length,
    misses: results.filter((r) => !r.hit).length,
    results,
  };
  writeFileSync(join(OUT_DIR, "harvest-report.json"), JSON.stringify(summary, null, 2));
  console.log(`\nDone. hits=${summary.hits} misses=${summary.misses}`);
  console.log(`Report: tmp/logo-harvest/harvest-report.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
