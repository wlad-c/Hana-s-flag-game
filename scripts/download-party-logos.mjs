// Download political party logos from Wikimedia Commons.
// Uses the same proven approach as download-national-flags.mjs with MD5 path sharding
// and exponential backoff for rate limiting.
//
//   node scripts/download-party-logos.mjs [CC ...]   → fetch missing logos for countries
//   node scripts/download-party-logos.mjs --force     → re-fetch all
//   node scripts/download-party-logos.mjs --check     → verify bundled sha256

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const PARTIES_FILE = R("../src/data/politicalParties.ts");
const OUT_DIR = R("../public/party-logos");
const UA =
  "HanaFlagGame/1.0 (political-parties; https://github.com/wlad-c/hana-s-flag-game)";

const args = process.argv.slice(2);
const force = args.includes("--force");
const checkOnly = args.includes("--check");
const only = new Set(args.filter((a) => /^[A-Z]{2}$/.test(a)));

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

/** Direct upload.wikimedia.org URL using MD5 path sharding (same as download-national-flags.mjs). */
function commonsUrl(filename) {
  const name = filename.replace(/ /g, "_");
  const md5 = createHash("md5").update(name, "utf8").digest("hex");
  return `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(name)}`;
}

/** Fetch with retry on 429/503, exponential backoff. */
async function fetchWithRetry(url, maxAttempts = 5) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status !== 429 && res.status !== 503) return res;
    const delay = 3000 * (attempt + 1);
    console.log(`  Rate limited (${res.status}), waiting ${delay}ms before retry...`);
    await new Promise((r) => setTimeout(r, delay));
  }
  // Final attempt without retry
  return fetch(url, { headers: { "User-Agent": UA } });
}

// Read the current parties.ts and extract parties with logoSourceUrl starting with commons
const partiesContent = readFileSync(PARTIES_FILE, "utf8");

// Simple regex to find party objects with logoSourceUrl
const partyRegex =
  /{\s*"id":\s*"([^"]+)"[^}]*?"logoSourceUrl":\s*"(https:\/\/commons\.wikimedia\.org\/wiki\/File:([^"]+))"/g;

const parties = [];
let match;
while ((match = partyRegex.exec(partiesContent)) !== null) {
  const [, id, url, filename] = match;
  const cc = id.split("-")[0];
  if (only.size > 0 && !only.has(cc)) continue;
  parties.push({ id, cc, url, filename });
}

console.log(`Found ${parties.length} parties with Commons logos to process.\n`);

let fetched = 0;
let verified = 0;
let failed = 0;

for (const party of parties) {
  const { id, cc, filename } = party;
  const dest = resolve(OUT_DIR, cc, `${filename.split(".")[0]}.svg`);

  if (existsSync(dest) && !force) {
    const digest = sha(readFileSync(dest));
    verified++;
    console.log(`✓ ${id}: already bundled, sha256 ${digest.slice(0, 16)}…`);
    continue;
  }

  if (checkOnly) {
    console.error(`✗ ${id}: not bundled`);
    failed++;
    continue;
  }

  // Use upload.wikimedia.org CDN with MD5 sharding
  const src = commonsUrl(filename);
  const res = await fetchWithRetry(src);

  if (!res.ok) {
    console.error(`✗ ${id}: HTTP ${res.status} fetching "${filename}"`);
    failed++;
    continue;
  }

  const buf = Buffer.from(await res.arrayBuffer());

  // Validate SVG
  if (!buf.slice(0, 4096).toString("utf8").includes("<svg")) {
    console.error(`✗ ${id}: fetched bytes are not valid SVG`);
    failed++;
    continue;
  }

  // Write to disk
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  const digest = sha(buf);

  fetched++;
  console.log(
    `✓ ${id}  ←  ${filename}  (${buf.length} bytes, sha256 ${digest.slice(0, 16)}…)`
  );

  // Delay between requests to avoid rate limiting
  await new Promise((r) => setTimeout(r, 1000));
}

console.log(
  `\n${fetched} fetched, ${verified} verified, ${failed} failed.`
);
process.exit(failed > 0 ? 1 : 0);
