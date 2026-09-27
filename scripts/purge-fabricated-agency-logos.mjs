#!/usr/bin/env node
/**
 * Strip news-agency logo fields that point at missing / fabricated files
 * (shared newspaper-logos/ tree purged of rect+text placeholders).
 * Adds noImageReason instead.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA = resolve(ROOT, "src/data/nationalNewsAgencies.ts");

const NO_IMAGE_REASON =
  "No verified emblem image is available in the app for this agency yet, so it is listed without one rather than with an invented logo.";

function isFabricatedOrMissing(rel) {
  const abs = resolve(ROOT, "public", rel.replace(/^\//, ""));
  if (!existsSync(abs)) return true;
  if (extname(abs).toLowerCase() !== ".svg") return false;
  const size = statSync(abs).size;
  const text = readFileSync(abs, "utf8");
  const hasText = /<text[\s>]/i.test(text);
  const hasRect = /<rect[\s>]/i.test(text);
  const pathCount = (text.match(/<path[\s>]/gi) || []).length;
  if (size < 2500 && hasText && hasRect && pathCount <= 2) return true;
  if (size < 1500 && hasText) return true;
  return false;
}

let src = readFileSync(DATA, "utf8");
const idRe = /"id":\s*"([^"]+)"/g;
const ids = [];
let m;
while ((m = idRe.exec(src))) ids.push({ id: m[1], index: m.index });

let stripped = 0;
let kept = 0;

for (let i = ids.length - 1; i >= 0; i--) {
  const { index } = ids[i];
  const end = i + 1 < ids.length ? ids[i + 1].index : src.length;
  const block = src.slice(index, end);
  const logoMatch = block.match(/"logo":\s*"([^"]+)"/);
  if (!logoMatch) {
    if (!/"noImageReason":/.test(block)) {
      const newBlock = block.replace(
        /("sources":)/,
        `"noImageReason": ${JSON.stringify(NO_IMAGE_REASON)},\n      $1`,
      );
      src = src.slice(0, index) + newBlock + src.slice(end);
      stripped++;
    }
    continue;
  }
  const logoRel = logoMatch[1];
  if (!isFabricatedOrMissing(logoRel)) {
    kept++;
    continue;
  }
  let newBlock = block;
  newBlock = newBlock.replace(/\s*"logo":\s*"[^"]*",?/g, "");
  newBlock = newBlock.replace(/\s*"logoExplainer":\s*"[^"]*",?/g, "");
  newBlock = newBlock.replace(/\s*"licenceNote":\s*"[^"]*",?/g, "");
  if (!/"noImageReason":/.test(newBlock)) {
    newBlock = newBlock.replace(
      /("sources":)/,
      `"noImageReason": ${JSON.stringify(NO_IMAGE_REASON)},\n      $1`,
    );
  }
  src = src.slice(0, index) + newBlock + src.slice(end);
  stripped++;
}

writeFileSync(DATA, src);
console.log(JSON.stringify({ kept, stripped }));
