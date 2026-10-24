/**
 * Flag Bingo — pure-logic gate (no Firebase, no browser APIs).
 *
 * Inlines the board/line helpers so we do not import countrySelection.ts
 * (which pulls localStorage via profile sync). Still asserts the UI's
 * promised pool size (195) against the source lists.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const countrySelection = fs.readFileSync(
  path.join(root, "src/lib/countrySelection.ts"),
  "utf8",
);
const flagBingoSrc = fs.readFileSync(path.join(root, "src/lib/flagBingo.ts"), "utf8");
const unMembers = fs.readFileSync(
  path.join(root, "src/lib/unMemberStates.ts"),
  "utf8",
);
const bingoRoomSrc = fs.readFileSync(path.join(root, "src/lib/bingoRoom.ts"), "utf8");
const pageSrc = fs.readFileSync(path.join(root, "src/pages/FlagBingoPage.tsx"), "utf8");
const appSrc = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const rulesSrc = fs.readFileSync(path.join(root, "firestore.rules"), "utf8");

const optionCodes = new Set();
for (const m of countrySelection.matchAll(/code:\s*"([A-Z]{2})"/g)) {
  optionCodes.add(m[1]);
}

const unCodes = new Set();
let inSet = false;
for (const line of unMembers.split("\n")) {
  if (line.includes("UN_MEMBER_CODES")) inSet = true;
  if (!inSet) continue;
  for (const m of line.matchAll(/"([A-Z]{2})"/g)) unCodes.add(m[1]);
  if (inSet && line.includes("]);")) break;
}

assert.equal(optionCodes.size, 195, `ALL_COUNTRY_OPTIONS should be 195, got ${optionCodes.size}`);
assert.equal(unCodes.size, 195, `UN_MEMBER_CODES should be 195, got ${unCodes.size}`);
for (const code of optionCodes) {
  assert.ok(unCodes.has(code), `countrySelection has ${code} missing from UN_MEMBER_CODES`);
}

assert.match(flagBingoSrc, /BINGO_SIZE = 5/);
assert.match(flagBingoSrc, /BINGO_CELLS = BINGO_SIZE \* BINGO_SIZE/);
assert.match(flagBingoSrc, /generateBingoBoard/);
assert.match(flagBingoSrc, /findBingoLine/);
assert.match(flagBingoSrc, /pickNextDraw/);
assert.match(flagBingoSrc, /BINGO_LINES/);
assert.match(flagBingoSrc, /ALL_COUNTRY_OPTIONS/);

assert.match(bingoRoomSrc, /bingoRooms/);
assert.match(bingoRoomSrc, /setBingoReady/);
assert.match(bingoRoomSrc, /pickNextDraw/);
assert.match(bingoRoomSrc, /hasBingo/);
assert.match(pageSrc, /Ready for next flag/);
assert.match(appSrc, /path="\/multiplayer"/);
assert.match(appSrc, /path="\/multiplayer\/bingo"/);
assert.match(rulesSrc, /match \/bingoRooms\/\{roomId\}/);

// ── Inlined pure helpers (mirrors src/lib/flagBingo.ts) ───────────────
const BINGO_SIZE = 5;
const BINGO_CELLS = 25;
const pool = [...optionCodes];

const BINGO_LINES = [];
for (let r = 0; r < BINGO_SIZE; r++) {
  BINGO_LINES.push(Array.from({ length: BINGO_SIZE }, (_, c) => r * BINGO_SIZE + c));
}
for (let c = 0; c < BINGO_SIZE; c++) {
  BINGO_LINES.push(Array.from({ length: BINGO_SIZE }, (_, r) => r * BINGO_SIZE + c));
}
BINGO_LINES.push(Array.from({ length: BINGO_SIZE }, (_, i) => i * BINGO_SIZE + i));
BINGO_LINES.push(
  Array.from({ length: BINGO_SIZE }, (_, i) => i * BINGO_SIZE + (BINGO_SIZE - 1 - i)),
);
assert.equal(BINGO_LINES.length, 12);

function shuffleCodes(items, random) {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function generateBingoBoard(random) {
  return shuffleCodes(pool, random).slice(0, BINGO_CELLS);
}

function pickNextDraw(drawnCodes, random) {
  const drawn = new Set(drawnCodes);
  const remaining = pool.filter((c) => !drawn.has(c));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(random() * remaining.length)];
}

function hasBingo(board, drawnCodes) {
  const drawn = new Set(drawnCodes);
  const marked = board.map((c) => drawn.has(c));
  return BINGO_LINES.some((line) => line.every((i) => marked[i]));
}

const board = generateBingoBoard(() => 0.42);
assert.equal(board.length, 25);
assert.equal(new Set(board).size, 25);
for (const c of board) assert.ok(optionCodes.has(c));

assert.equal(hasBingo(board, board.slice(0, 5)), true);
assert.equal(hasBingo(board, board.slice(0, 4)), false);
assert.equal(
  hasBingo(board, [board[0], board[6], board[12], board[18], board[24]]),
  true,
);

const drawn = [];
const seen = new Set();
for (let i = 0; i < 195; i++) {
  const next = pickNextDraw(drawn, () => 0.1);
  assert.ok(next, `exhausted early at ${i}`);
  assert.equal(seen.has(next), false, `repeat ${next}`);
  seen.add(next);
  drawn.push(next);
}
assert.equal(pickNextDraw(drawn, () => 0), null);

console.log("flag-bingo checks passed");
