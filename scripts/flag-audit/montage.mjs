#!/usr/bin/env node
/**
 * Side-by-side contact sheets for comparing flags by eye — the step every
 * audit decision rests on. A filename, a hash or a pixel score is never enough
 * on its own: the 2026-09 audit caught Italian city "flags" that were plain
 * colour fields, a Damascus logo recorded as used "until 2024" and a province
 * flag missing its arms only by looking.
 *
 *   node scripts/flag-audit/montage.mjs list.json /tmp/sheet
 *
 * list.json is an array of rows, each { "label": "IT-TR: ours | Commons | FOTW",
 * "sub": "optional second line", "imgs": ["path", …] }. Paths may be SVG, PNG,
 * JPEG, GIF or WebP; an unreadable file shows as a magenta tile. Pages are
 * written as <prefix>_01.png, <prefix>_02.png, …
 * Env: MW/MH tile size (210×140), PR rows per line (2), RW lines per page (6).
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
const items = JSON.parse(readFileSync(process.argv[2], "utf8"));
const prefix = process.argv[3];
const W = +(process.env.MW||210), H = +(process.env.MH||140), LAB = 34, PER_ROW = +(process.env.PR||2), ROWS = +(process.env.RW||6);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
async function tile(path) {
  try {
    const buf = await sharp(path, { density: 96, limitInputPixels: false }).resize(W - 10, H - 10, { fit: "contain", background: "#dddddd" }).flatten({ background: "#dddddd" }).png().toBuffer();
    return buf;
  } catch (e) {
    return sharp({ create: { width: W - 10, height: H - 10, channels: 3, background: "#ff00ff" } }).png().toBuffer();
  }
}
const perPage = PER_ROW * ROWS;
for (let p = 0; p * perPage < items.length; p++) {
  const page = items.slice(p * perPage, (p + 1) * perPage);
  const maxImgs = Math.max(...page.map((x) => x.imgs.length));
  const cellW = maxImgs * W + 10, cellH = H + LAB;
  const comps = [];
  for (let k = 0; k < page.length; k++) {
    const it = page[k];
    const x0 = (k % PER_ROW) * cellW, y0 = Math.floor(k / PER_ROW) * cellH;
    const svg = `<svg width="${cellW}" height="${LAB}"><rect width="100%" height="100%" fill="#fff"/><text x="4" y="14" font-size="13" font-family="sans-serif" fill="#000">${esc(it.label.slice(0, 70))}</text><text x="4" y="29" font-size="11" font-family="sans-serif" fill="#555">${esc((it.sub || "").slice(0, 90))}</text></svg>`;
    comps.push({ input: Buffer.from(svg), left: x0, top: y0 });
    for (let i = 0; i < it.imgs.length; i++) comps.push({ input: await tile(it.imgs[i]), left: x0 + i * W + 5, top: y0 + LAB + 5 });
  }
  const out = `${prefix}_${String(p + 1).padStart(2, "0")}.png`;
  await sharp({ create: { width: PER_ROW * cellW, height: ROWS * cellH, channels: 3, background: "#ffffff" } }).composite(comps).png().toFile(out);
  console.log(out);
}
