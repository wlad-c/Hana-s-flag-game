/**
 * Flag Bingo — pure game logic (no I/O).
 *
 * Rules (v1):
 *  - Each match picks a random pool of 64 flags from the 195 UN member /
 *    permanent-observer states. Every player's board and every draw comes
 *    from that match pool only.
 *  - Each player gets a personal 5×5 board of 25 distinct flags from the
 *    match pool. There is no free centre square — every cell is a real flag.
 *  - The system draws one country at a time from the match pool (no repeats).
 *  - A cell is marked only when the player taps it after it has been drawn
 *    (educational mode — never auto-mark).
 *  - First player to mark five in a row (row, column, or either diagonal)
 *    wins. Only one line is required.
 */

import { ALL_COUNTRY_OPTIONS } from "./countrySelection";

export const BINGO_SIZE = 5;
export const BINGO_CELLS = BINGO_SIZE * BINGO_SIZE; // 25
/** Full UN catalogue size — source of the per-match pool. */
export const BINGO_UN_POOL_SIZE = ALL_COUNTRY_OPTIONS.length; // 195
/** How many flags are in play for a single match. */
export const BINGO_MATCH_POOL_SIZE = 64;
/** @deprecated Prefer BINGO_MATCH_POOL_SIZE; kept for older copy references. */
export const BINGO_POOL_SIZE = BINGO_MATCH_POOL_SIZE;

/** All UN country codes (195). */
export function allBingoCountryCodes(): string[] {
  return ALL_COUNTRY_OPTIONS.map((c) => c.code);
}

/** Winning lines on a 5×5 board (row-major indices 0..24). */
export const BINGO_LINES: readonly (readonly number[])[] = (() => {
  const lines: number[][] = [];
  for (let r = 0; r < BINGO_SIZE; r++) {
    lines.push(Array.from({ length: BINGO_SIZE }, (_, c) => r * BINGO_SIZE + c));
  }
  for (let c = 0; c < BINGO_SIZE; c++) {
    lines.push(Array.from({ length: BINGO_SIZE }, (_, r) => r * BINGO_SIZE + c));
  }
  lines.push(Array.from({ length: BINGO_SIZE }, (_, i) => i * BINGO_SIZE + i));
  lines.push(
    Array.from({ length: BINGO_SIZE }, (_, i) => i * BINGO_SIZE + (BINGO_SIZE - 1 - i)),
  );
  return lines;
})();

/** Fisher–Yates shuffle; does not mutate the input. */
export function shuffleCodes<T>(items: readonly T[], random = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}

/**
 * Pick the 64-flag match pool from the full UN list. Every board and every
 * draw for that match must come from this set.
 */
export function selectMatchPool(
  random = Math.random,
  size = BINGO_MATCH_POOL_SIZE,
): string[] {
  const all = allBingoCountryCodes();
  if (all.length < size) {
    throw new Error(`Need at least ${size} countries for a bingo match pool`);
  }
  if (size < BINGO_CELLS) {
    throw new Error(`Match pool must be at least ${BINGO_CELLS} (one board)`);
  }
  return shuffleCodes(all, random).slice(0, size);
}

/**
 * Build a personal 5×5 board: 25 unique country codes from the match pool.
 * Live games always pass the room's `poolCodes`; omitting the pool falls
 * back to the full UN list (tests / legacy callers only).
 */
export function generateBingoBoard(
  pool: readonly string[] = allBingoCountryCodes(),
  random = Math.random,
): string[] {
  if (pool.length < BINGO_CELLS) {
    throw new Error(`Need at least ${BINGO_CELLS} countries to build a bingo board`);
  }
  return shuffleCodes(pool, random).slice(0, BINGO_CELLS);
}

/**
 * Pick the next draw from the match pool, excluding already-drawn codes.
 * Omitting the pool falls back to the full UN list (tests / legacy only).
 */
export function pickNextDraw(
  drawnCodes: readonly string[],
  pool: readonly string[] = allBingoCountryCodes(),
  random = Math.random,
): string | null {
  const drawn = new Set(drawnCodes);
  const remaining = pool.filter((c) => !drawn.has(c));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(random() * remaining.length)]!;
}

/** Whether each board cell is marked, given the player's confirmed set. */
export function markedMask(
  board: readonly string[],
  markedCodes: readonly string[],
): boolean[] {
  const marked = new Set(markedCodes);
  return board.map((code) => marked.has(code));
}

/** Indices of a completed bingo line, or null if none. */
export function findBingoLine(
  board: readonly string[],
  markedCodes: readonly string[],
): number[] | null {
  if (board.length !== BINGO_CELLS) return null;
  const marked = markedMask(board, markedCodes);
  for (const line of BINGO_LINES) {
    if (line.every((i) => marked[i])) return [...line];
  }
  return null;
}

export function hasBingo(board: readonly string[], markedCodes: readonly string[]): boolean {
  return findBingoLine(board, markedCodes) !== null;
}

/**
 * Single open lobby everyone joins when they open Flag Bingo — no room
 * codes, no create/join step. Kept as a 6-char id so it fits the existing
 * Firestore document id shape.
 */
export const PUBLIC_BINGO_ROOM = "PUBLIC";

/** Short room codes: 6 chars, unambiguous alphabet (no 0/O/1/I). */
const ROOM_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateRoomCode(random = Math.random): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ROOM_ALPHABET[Math.floor(random() * ROOM_ALPHABET.length)]!;
  }
  return code;
}

export function normalizeRoomCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

export function isValidRoomCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code);
}

export function countryNameForCode(code: string): string {
  return ALL_COUNTRY_OPTIONS.find((c) => c.code === code)?.name ?? code;
}

export function flagPathForCode(code: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}flags/${code.toLowerCase()}.svg`;
}
