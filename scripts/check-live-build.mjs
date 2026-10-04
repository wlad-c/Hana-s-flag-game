// Is the work the user can actually SEE the work we merged?
//
// "Merged" is not "shipped". This repo's deploy runs in a `concurrency: pages` group with
// `cancel-in-progress: false`, so a single stuck run blocks every later deploy — and on
// 2026-08-07 that is exactly what happened: two merges sat on main with green CI while the
// live site served a build from the previous afternoon. The PR-workflow rule said to verify
// the work was live; reporting "merged ✓" and treating the queued deploy as someone else's
// problem is how that got missed. This script makes the check mechanical.
//
// It fetches the live site, reads the build commit and timestamp that vite.config.ts injects
// into the bundle as __BUILD_COMMIT__ / __BUILD_ISO__, and compares them against the commit
// you expect. Exits non-zero when the live build does not contain that commit.
//
//   node scripts/check-live-build.mjs                  → compare against origin/main HEAD
//   node scripts/check-live-build.mjs <sha>            → compare against a specific commit
//   node scripts/check-live-build.mjs --print          → just report what is live
//
// A network failure is reported as INCONCLUSIVE (exit 2), never as success: "I could not
// check" must never read like "it is live".

import { execSync } from "node:child_process";

const SITE = "https://wlad-c.github.io/Hana-s-flag-game/";
const args = process.argv.slice(2);
const printOnly = args.includes("--print");
const wanted = args.find((a) => !a.startsWith("--"));

function git(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "hana-live-build-check" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

let html;
try {
  html = await fetchText(SITE);
} catch (err) {
  console.error(`INCONCLUSIVE — could not reach ${SITE}: ${err.message}`);
  console.error("This is NOT a pass. Report that the live check could not run, and say so.");
  process.exit(2);
}

// The SPA shell references one hashed entry bundle; the build constants live inside it.
const bundle = html.match(/assets\/index-[A-Za-z0-9_-]+\.js/);
if (!bundle) {
  console.error("INCONCLUSIVE — no assets/index-*.js in the served HTML; the site shape changed.");
  process.exit(2);
}

let js;
try {
  js = await fetchText(new URL(bundle[0], SITE).href);
} catch (err) {
  console.error(`INCONCLUSIVE — could not fetch the bundle: ${err.message}`);
  process.exit(2);
}

// vite.config.ts defines these as JSON string literals, so they appear verbatim in the bundle.
// The commit is the first standalone short-or-full sha near the ISO timestamp.
const iso = js.match(/"(20\d\d-\d\d-\d\dT[\d:.]+Z?)"/);
const liveIso = iso?.[1] ?? null;

// __BUILD_COMMIT__ and __BUILD_ISO__ are emitted next to each other, so the commit is the
// sha-shaped literal immediately before the timestamp. Anchoring on the timestamp is what makes
// an ALL-DIGIT short sha findable: a bare `/[a-f]/` filter used to discard those, which reported
// a perfectly live site as behind roughly one deploy in thirty (commit 2493456 hit it).
const near = liveIso ? js.slice(Math.max(0, js.indexOf(liveIso) - 200), js.indexOf(liveIso)) : "";
const nearShas = [...near.matchAll(/"([0-9a-f]{7,40})"/g)].map((m) => m[1]);
const isShaLength = (s) => s.length === 7 || s.length === 8 || s.length === 40;
const liveSha =
  nearShas.reverse().find(isShaLength) ??
  // fall back to a whole-bundle scan, still preferring a letter-bearing literal to reduce
  // the chance of matching an unrelated numeric string.
  [...js.matchAll(/"([0-9a-f]{7,40})"/g)].map((m) => m[1]).filter((s) => /[a-f]/.test(s)).find(isShaLength) ??
  null;

console.log(`live bundle : ${bundle[0]}`);
console.log(`live build  : ${liveSha ?? "(commit not found in bundle)"}  ${liveIso ?? ""}`);

if (printOnly) process.exit(0);

const target = wanted ?? git("git rev-parse origin/main");
if (!target) {
  console.error("Could not determine the commit to compare against; pass one explicitly.");
  process.exit(2);
}
const targetShort = target.slice(0, 7);
console.log(`expected    : ${targetShort} (${wanted ? "given" : "origin/main"})`);

// The live build contains `target` if its commit IS target, or if target is an ancestor of it.
let contains = false;
if (liveSha) {
  if (target.startsWith(liveSha) || liveSha.startsWith(targetShort)) {
    contains = true;
  } else {
    // merge-base --is-ancestor exits 0 when target is an ancestor of the live commit.
    try {
      execSync(`git merge-base --is-ancestor ${target} ${liveSha}`, { stdio: "ignore" });
      contains = true;
    } catch {
      contains = false;
    }
  }
}

if (contains) {
  console.log(`\n✓ the live site serves ${targetShort} (or a later build) — users can see it.`);
  process.exit(0);
}

console.error(
  `\n✗ THE LIVE SITE IS BEHIND. It serves ${liveSha ?? "an unknown build"}` +
    `${liveIso ? ` from ${liveIso}` : ""}, which does not contain ${targetShort}.`,
);
console.error(
  "Merged is not shipped. Drive the deploy: find the Deploy run for the merge commit, and if it is\n" +
    "`pending` or `waiting`, find what is blocking the `pages` concurrency group — a stale run in\n" +
    "`waiting` holds up every later deploy. Cancel or approve it, or re-run the queued deploy. If the\n" +
    "agent's token cannot (cancelling needs `actions: write`), say so in the report AS THE HEADLINE,\n" +
    "with the run URL and the exact click-path, not as a footnote under a green merge.",
);
process.exit(1);
