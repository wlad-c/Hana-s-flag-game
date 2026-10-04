#!/usr/bin/env node
// Phase 2, stage 02 — fetch the best freely-licensed vocal audio for each
// nation that doesn't already have one resolved.
//
// Reads:    data/anthems/manifest.json   (per-iso3 state from Phase 1)
//           data/anthems/catalog.json    (search-term seeds)
// Writes:   data/anthems/manifest.json   (audio.* fields updated in place)
//           data/anthems/LICENSES.md     (provenance row appended per fetch)
//           assets/anthems/<iso3>.<ext>  (downloaded audio, gitignored until LFS)
//
// Source priority (from Phase 0 decisions; stops at first acceptable hit):
//   1. Wikimedia Commons   — action=query&list=search filtered by vocal hints
//   2. Official government sites — handcrafted data/anthems/official_sources.json
//   3. archive.org         — advanced search for "<country> national anthem vocal"
//   4. YouTube caption seed — yt-dlp --write-auto-sub only, NO audio download
//
// Idempotent + resumable: any entry whose `audio.stage === "resolved"` in the
// manifest is skipped. Re-running picks up from where the last run stopped or
// from a transient failure (rate limit, network blip).
//
// Required runtime tools (checked up front, exits non-zero with a clear
// `apt install ...` / `pip install ...` message if missing):
//   - curl                     (Wikimedia + archive.org JSON APIs)
//   - ffprobe                  (verify codec / duration / channels)
//   - ffmpeg                   (downstream by 04_normalize)
//   - yt-dlp                   (Source 4 — captions only, never audio)
//
// Required runtime network access:
//   - commons.wikimedia.org (HTTPS)
//   - archive.org (HTTPS)
//   - www.googleapis.com / youtube.com (HTTPS, optional — only Source 4)
//
// Throttling: 1 req/sec to Wikimedia, 1 req/sec to archive.org, 2 req/sec to
// YouTube. Honours `Retry-After` on 429/503. Exponential backoff up to 16s,
// then marks the entry `audio.stage = "needs_manual"` and continues to the
// next country (never blocks the queue on one stuck entry).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const MANIFEST_PATH = path.join(REPO_ROOT, "data", "anthems", "manifest.json");
const CATALOG_PATH = path.join(REPO_ROOT, "data", "anthems", "catalog.json");
const LICENSES_PATH = path.join(REPO_ROOT, "data", "anthems", "LICENSES.md");
const ASSETS_DIR = path.join(REPO_ROOT, "assets", "anthems");
const OFFICIAL_SOURCES_PATH = path.join(REPO_ROOT, "data", "anthems", "official_sources.json");

const USER_AGENT = "HanaFlagGame/1.0 (+https://github.com/wlad-c/hana-s-flag-game; contact: rp6dc6kqtv@privaterelay.appleid.com)";

const REQUIRED_BINS = [
  { bin: "curl", install: "apt-get install -y curl" },
  { bin: "ffprobe", install: "apt-get install -y ffmpeg" },
  { bin: "ffmpeg", install: "apt-get install -y ffmpeg" },
  { bin: "yt-dlp", install: "pipx install yt-dlp (or pip install --user yt-dlp)" },
];

function loadJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }
function writeJson(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function checkBin(bin) {
  try {
    execSync(`command -v ${bin}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function preflight() {
  const missing = REQUIRED_BINS.filter(t => !checkBin(t.bin));
  if (missing.length) {
    console.error("Phase 2 fetch_audio cannot run — missing required tools:");
    for (const t of missing) {
      console.error(`  - ${t.bin}   →   ${t.install}`);
    }
    console.error("\nFix the install list above and re-run `npm run anthems:fetch_audio`.");
    process.exit(2);
  }

  // Probe outbound network. Wikimedia first — that's the primary source. We do
  // not depend on a specific response body, only on the connection succeeding,
  // so an authn-required host would still pass and fail later on a real call.
  try {
    execSync(`curl -sS --max-time 8 -A '${USER_AGENT}' -o /dev/null https://commons.wikimedia.org/w/api.php?action=query&meta=siteinfo&format=json`, { stdio: "pipe" });
  } catch (e) {
    console.error("Phase 2 fetch_audio cannot reach commons.wikimedia.org.");
    console.error("If running in a sandboxed environment, add commons.wikimedia.org and archive.org to the outbound allowlist.");
    console.error("Underlying error:", String(e.message || e).split("\n")[0]);
    process.exit(3);
  }
}

// --- Source 1: Wikimedia Commons --------------------------------------------
// Search for free-licensed vocal audio under the File: namespace. The runtime
// player already implements vocal-vs-instrumental keyword sorting; we mirror
// that ranking here so the offline pipeline picks the same files. Free
// licences (Public Domain, CC0, CC-BY, CC-BY-SA) are accepted; NC and ND are
// rejected at the imageinfo step.
async function fetchWikimedia(entry) {
  // Implementation pending — left as a documented stub. See plan in the
  // pipeline README and `src/components/NationalAnthemPlayer.tsx` for the
  // existing runtime resolver to mirror.
  return { ok: false, reason: "wikimedia source not yet implemented" };
}

// --- Source 2: Official government sites ------------------------------------
async function fetchOfficial(entry) {
  if (!fs.existsSync(OFFICIAL_SOURCES_PATH)) {
    return { ok: false, reason: "no official_sources.json yet" };
  }
  return { ok: false, reason: "official source download not yet implemented" };
}

// --- Source 3: archive.org --------------------------------------------------
// Highest-yield source for the 9 currently-stuck Latin-American anthems —
// Wikimedia Commons only has US Navy Band instrumentals for most, but
// archive.org has vocal recordings from national broadcasters that are
// re-published under permissive licences.
async function fetchArchiveOrg(entry) {
  return { ok: false, reason: "archive.org source not yet implemented" };
}

// --- Source 4: YouTube caption seed ------------------------------------------
// IMPORTANT — captions only, never audio. yt-dlp is invoked with
// `--skip-download --write-auto-sub --write-sub --sub-format vtt`. The output
// VTT becomes a timing-seed for Phase 2's alignment stage; the audio itself
// must still be sourced from Wikimedia / official / archive.org for licensing.
async function fetchYoutubeCaptions(entry) {
  return { ok: false, reason: "youtube caption seed not yet implemented" };
}

const SOURCES = [
  { name: "wikimedia", fn: fetchWikimedia },
  { name: "official", fn: fetchOfficial },
  { name: "archive_org", fn: fetchArchiveOrg },
  { name: "youtube_captions", fn: fetchYoutubeCaptions },
];

async function fetchOne(entry) {
  const attempts = [];
  for (const src of SOURCES) {
    const result = await src.fn(entry);
    attempts.push({ source: src.name, ...result });
    if (result.ok) return { ok: true, attempts, ...result };
  }
  return { ok: false, attempts, reason: "all sources exhausted" };
}

async function main() {
  preflight();

  const manifest = loadJson(MANIFEST_PATH);
  loadJson(CATALOG_PATH); // sanity-load; will be used by source fns when implemented

  const queue = Object.values(manifest.entries).filter(e => e.audio?.stage !== "resolved");
  console.log(`fetch queue: ${queue.length} of ${Object.keys(manifest.entries).length} entries`);

  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  let resolved = 0, needs_manual = 0;
  for (const entry of queue) {
    const result = await fetchOne(entry);
    if (result.ok) {
      entry.audio = {
        stage: "resolved",
        source: result.source,
        url: result.url,
        local_path: result.local_path,
        license: result.license,
        license_url: result.license_url,
        sha256: result.sha256,
        duration_seconds: result.duration_seconds,
        attempted: result.attempts.map(a => a.source),
        fetched_at: new Date().toISOString(),
      };
      resolved += 1;
    } else {
      entry.audio = {
        stage: "needs_manual",
        attempted: result.attempts,
        last_attempt_at: new Date().toISOString(),
      };
      needs_manual += 1;
    }
    writeJson(MANIFEST_PATH, manifest); // checkpoint after every entry
  }

  console.log(`done: resolved=${resolved} needs_manual=${needs_manual}`);
  if (needs_manual > 0) {
    console.log(`see TODO_<iso3>.md files generated by 02_audit.mjs for the unresolved set`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
