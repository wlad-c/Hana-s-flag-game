/**
 * Flag Bingo — pure game logic (no I/O).
 *
 * Rules (v1):
 *  - Each player gets a personal 5×5 board of 25 distinct flags drawn from
 *    the 195 UN member / permanent-observer states.
 *  - There is no free centre square — every cell is a real flag.
 *  - The system draws one country at a time from the full 195 (no repeats).
 *  - A cell is marked when its country has been drawn (derived, not stored).
 *  - First player to mark five in a row (row, column, or either diagonal)
 *    wins. Only one line is required.
 */

import { ALL_COUNTRY_OPTIONS } from "./countrySelection";

export const BINGO_SIZE = 5;
export const BINGO_CELLS = BINGO_SIZE * BINGO_SIZE; // 25
export const BINGO_POOL_SIZE = ALL_COUNTRY_OPTIONS.length; // 195

/** All winning lines on a 5×5 board (row-major indices 0..24). */
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

/** Build a personal 5×5 board: 25 unique country codes from the UN pool. */
export function generateBingoBoard(random = Math.random): string[] {
  if (BINGO_POOL_SIZE < BINGO_CELLS) {
    throw new Error(`Need at least ${BINGO_CELLS} countries to build a bingo board`);
  }
  const pool = ALL_COUNTRY_OPTIONS.map((c) => c.code);
  return shuffleCodes(pool, random).slice(0, BINGO_CELLS);
}

/** Pick the next draw from the 195, excluding already-drawn codes. */
export function pickNextDraw(
  drawnCodes: readonly string[],
  random = Math.random,
): string | null {
  const drawn = new Set(drawnCodes);
  const remaining = ALL_COUNTRY_OPTIONS.map((c) => c.code).filter((c) => !drawn.has(c));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(random() * remaining.length)]!;
}

/** Whether each board cell is marked, given the drawn set. */
export function markedMask(
  board: readonly string[],
  drawnCodes: readonly string[],
): boolean[] {
  const drawn = new Set(drawnCodes);
  return board.map((code) => drawn.has(code));
}

/** Indices of a completed bingo line, or null if none. */
export function findBingoLine(
  board: readonly string[],
  drawnCodes: readonly string[],
): number[] | null {
  if (board.length !== BINGO_CELLS) return null;
  const marked = markedMask(board, drawnCodes);
  for (const line of BINGO_LINES) {
    if (line.every((i) => marked[i])) return [...line];
  }
  return null;
}

export function hasBingo(board: readonly string[], drawnCodes: readonly string[]): boolean {
  return findBingoLine(board, drawnCodes) !== null;
}

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
