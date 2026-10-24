/**
 * Flag Bingo — pure-logic gate (no Firebase, no browser APIs).
 *
 * Inlines the board/line/pool helpers so we do not import countrySelection.ts
 * (which pulls localStorage via profile sync). Asserts the UI's promised
 * UN catalogue (195) and per-match pool (64).
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
const pageCss = fs.readFileSync(path.join(root, "src/pages/FlagBingoPage.css"), "utf8");
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
assert.match(flagBingoSrc, /BINGO_MATCH_POOL_SIZE = 64/);
assert.match(flagBingoSrc, /BINGO_UN_POOL_SIZE/);
assert.match(flagBingoSrc, /selectMatchPool/);
assert.match(flagBingoSrc, /generateBingoBoard/);
assert.match(flagBingoSrc, /findBingoLine/);
assert.match(flagBingoSrc, /pickNextDraw/);
assert.match(flagBingoSrc, /BINGO_LINES/);
assert.match(flagBingoSrc, /ALL_COUNTRY_OPTIONS/);

assert.match(bingoRoomSrc, /bingoRooms/);
assert.match(bingoRoomSrc, /poolCodes/);
assert.match(bingoRoomSrc, /selectMatchPool/);
assert.match(bingoRoomSrc, /setBingoReady/);
assert.match(bingoRoomSrc, /pickNextDraw/);
assert.match(bingoRoomSrc, /hasBingo/);
assert.match(pageSrc, /Ready for next flag/);
assert.match(pageSrc, /bingo__cell-tick/);
assert.match(pageSrc, /inspectCode/);
assert.match(pageSrc, /BINGO_MATCH_POOL_SIZE/);
assert.match(pageSrc, /Joined mid-game/);
assert.match(pageSrc, /winNotice/);
assert.match(pageSrc, /alertdialog/);
assert.match(pageCss, /bingo__cell-tick/);
assert.match(pageCss, /grayscale/);
assert.match(pageCss, /bingo__modal/);
assert.match(pageCss, /bingo__catchup/);
assert.match(pageCss, /bingo__modal--win/);
assert.match(bingoRoomSrc, /Mid-game join|otherSnaps|online Flag Bingo lobby/);
assert.match(bingoRoomSrc, /useLocalStore/);
assert.match(bingoRoomSrc, /Could not join the online Flag Bingo lobby/);
assert.match(pageSrc, /Online shared lobby|pagehide/);
assert.match(appSrc, /path="\/multiplayer"/);
assert.match(appSrc, /path="\/multiplayer\/bingo"/);
assert.match(rulesSrc, /match \/bingoRooms\/\{roomId\}/);
assert.match(rulesSrc, /poolCodes/);

// ── Inlined pure helpers (mirrors src/lib/flagBingo.ts) ───────────────
const BINGO_SIZE = 5;
const BINGO_CELLS = 25;
const BINGO_MATCH_POOL_SIZE = 64;
const poolAll = [...optionCodes];

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

function selectMatchPool(random, size = BINGO_MATCH_POOL_SIZE) {
  return shuffleCodes(poolAll, random).slice(0, size);
}

function generateBingoBoard(pool, random) {
  return shuffleCodes(pool, random).slice(0, BINGO_CELLS);
}

function pickNextDraw(drawnCodes, pool, random) {
  const drawn = new Set(drawnCodes);
  const remaining = pool.filter((c) => !drawn.has(c));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(random() * remaining.length)];
}

function hasBingo(board, markedCodes) {
  const marked = new Set(markedCodes);
  const mask = board.map((c) => marked.has(c));
  return BINGO_LINES.some((line) => line.every((i) => mask[i]));
}

const matchPool = selectMatchPool(() => 0.37);
assert.equal(matchPool.length, 64);
assert.equal(new Set(matchPool).size, 64);
for (const c of matchPool) assert.ok(optionCodes.has(c));

const board = generateBingoBoard(matchPool, () => 0.42);
assert.equal(board.length, 25);
assert.equal(new Set(board).size, 25);
for (const c of board) assert.ok(matchPool.includes(c), `${c} not in match pool`);

assert.equal(hasBingo(board, board.slice(0, 5)), true);
assert.equal(hasBingo(board, board.slice(0, 4)), false);
assert.equal(
  hasBingo(board, [board[0], board[6], board[12], board[18], board[24]]),
  true,
);

const drawn = [];
const seen = new Set();
for (let i = 0; i < 64; i++) {
  const next = pickNextDraw(drawn, matchPool, () => 0.1);
  assert.ok(next, `exhausted early at ${i}`);
  assert.equal(seen.has(next), false, `repeat ${next}`);
  assert.ok(matchPool.includes(next), `draw ${next} outside match pool`);
  seen.add(next);
  drawn.push(next);
}
assert.equal(pickNextDraw(drawn, matchPool, () => 0), null);

// A second match must be able to pick a different pool (not forced identical).
const poolB = selectMatchPool(() => 0.91);
assert.equal(poolB.length, 64);
assert.notDeepEqual(matchPool, poolB);

console.log("flag-bingo checks passed");
