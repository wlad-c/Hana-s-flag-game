#!/usr/bin/env node
/**
 * Download central-bank logos listed in the Wikidata harvest from Wikimedia
 * Commons into public/central-bank-logos/{cc}/.
 *
 * Sniffs magic bytes — never saves an HTML 404 page as an .svg (same guard as
 * party / airline logo downloads). Filenames that look like national flags /
 * emblems / Fed note seals are skipped (those are not bank brand marks).
 *
 *   node scripts/download-central-bank-logos.mjs
 *   node scripts/download-central-bank-logos.mjs --force
 *   node scripts/download-central-bank-logos.mjs AU BR DE
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { isRejectedLogoFilename } from "./lib/centralBankLogoQuality.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HARVEST = resolve(__dirname, "data/central-banks-harvest.json");
const OUT_DIR = resolve(__dirname, "../public/central-bank-logos");
const UA =
  "HanaFlagGame/1.0 (central-banks; https://github.com/wlad-c/hana-s-flag-game)";

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = new Set(args.filter((a) => /^[A-Z]{2}$/.test(a)));

function commonsUrl(filename) {
  const name = filename.replace(/ /g, "_");
  const md5 = createHash("md5").update(name, "utf8").digest("hex");
  return `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(name)}`;
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
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^\uFEFF/, "").trimStart();
  const lower = head.toLowerCase();
  if (lower.startsWith("<!doctype html") || lower.startsWith("<html")) return "html";
  if (lower.includes("<svg")) return "svg";
  return null;
}

async function fetchWithRetry(url, maxAttempts = 5) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status !== 429 && res.status !== 503) return res;
    await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
  }
  return fetch(url, { headers: { "User-Agent": UA } });
}

function safeStem(filename, id) {
  const slug = id.split("-").slice(1).join("-") || "logo";
  const ext = extname(filename).toLowerCase() || ".svg";
  // Prefer id-based stem so paths are stable across Commons renames
  return `${slug}${ext === ".jpeg" ? ".jpg" : ext}`;
}

const harvest = JSON.parse(readFileSync(HARVEST, "utf8"));
const entries = Object.values(harvest.countries).filter((c) => c.commonsLogo);
console.log(`Harvest lists ${entries.length} Commons logos`);

let ok = 0;
let skip = 0;
let fail = 0;

for (const entry of entries) {
  if (only.size && !only.has(entry.countryCode)) continue;
  const filename = entry.commonsLogo;
  if (isRejectedLogoFilename(filename)) {
    console.log(`✗ ${entry.id}: skip photo/non-brand Commons name "${filename}"`);
    skip++;
    continue;
  }
  // Skip TIFF — browsers won't render Fed seal TIFFs anyway, and they're usually note seals
  if (/\.tiff?$/i.test(filename)) {
    console.log(`✗ ${entry.id}: skip TIFF "${filename}"`);
    skip++;
    continue;
  }

  const cc = entry.countryCode.toLowerCase();
  const destName = safeStem(filename, entry.id);
  const destDir = resolve(OUT_DIR, cc);
  const dest = resolve(destDir, destName);

  if (existsSync(dest) && !force) {
    console.log(`✓ ${entry.id}: already ${destName}`);
    ok++;
    continue;
  }

  const url = commonsUrl(filename);
  try {
    const res = await fetchWithRetry(url);
    if (!res.ok) {
      console.log(`✗ ${entry.id}: HTTP ${res.status} for ${filename}`);
      fail++;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const kind = sniff(buf);
    if (!kind || kind === "html") {
      console.log(`✗ ${entry.id}: body is ${kind || "unknown"} (not an image)`);
      fail++;
      continue;
    }
    // Ensure extension matches bytes
    let finalDest = dest;
    const wantExt =
      kind === "jpeg" ? ".jpg" : kind === "svg" ? ".svg" : `.${kind}`;
    if (!finalDest.toLowerCase().endsWith(wantExt)) {
      finalDest = finalDest.replace(/\.[^.]+$/, wantExt);
    }
    mkdirSync(destDir, { recursive: true });
    writeFileSync(finalDest, buf);
    console.log(
      `↓ ${entry.id}: ${finalDest.split("/").slice(-2).join("/")} (${buf.length} bytes, ${kind})`,
    );
    ok++;
  } catch (e) {
    console.log(`✗ ${entry.id}: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone — ok ${ok}, skipped ${skip}, failed ${fail}`);
