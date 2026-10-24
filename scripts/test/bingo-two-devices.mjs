// Two-device Flag Bingo end-to-end test against the Firestore + Auth
// emulators, using the real `src/lib/bingoRoom.ts` and `firestore.rules`.
//
//   npx firebase-tools emulators:start --only firestore,auth --project demo-bingo
//   node scripts/test/bingo-two-devices.mjs
//
// Seeds the live-lobby state that blocked real devices (seats from older
// builds with no `marked`/`lastSeen`, a "playing" room with no pool), then
// plays a full match between two clients plus a late joiner.
import { build } from "esbuild";
import { mkdirSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../..", import.meta.url));
const shim = join(root, "scripts/test/bingo-emulator-shim.ts");
// Inside the repo so the external `firebase/*` imports resolve.
mkdirSync(join(root, "node_modules/.cache"), { recursive: true });
const outDir = mkdtempSync(join(root, "node_modules/.cache/bingo-e2e-"));
const outfile = join(outDir, "bingoRoom.mjs");

await build({
  entryPoints: [join(root, "src/lib/bingoRoom.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  external: ["firebase/*"],
  nodePaths: [join(root, "node_modules")],
  logLevel: "error",
  plugins: [
    {
      name: "firebase-shim",
      setup(b) {
        b.onResolve({ filter: /^\.\/firebase$/ }, () => ({ path: shim }));
      },
    },
  ],
});
const FS = "http://127.0.0.1:8080/v1/projects/demo-bingo/databases/(default)/documents";
const owner = { Authorization: "Bearer owner", "Content-Type": "application/json" };

function toValue(v) {
  if (v === null) return { nullValue: null };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") {
    return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  }
  throw new Error(`unsupported ${typeof v}`);
}
async function ownerSet(path, data) {
  const fields = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, toValue(v)]));
  const res = await fetch(`${FS}/${path}`, { method: "PATCH", headers: owner, body: JSON.stringify({ fields }) });
  if (!res.ok) throw new Error(`seed ${path}: ${res.status} ${await res.text()}`);
}
async function ownerGet(path) {
  const res = await fetch(`${FS}/${path}`, { headers: owner });
  return res.ok ? res.json() : null;
}
await fetch("http://127.0.0.1:8080/emulator/v1/projects/demo-bingo/databases/(default)/documents", {
  method: "DELETE",
});

let failures = 0;
function check(cond, label) {
  console.log(`${cond ? "PASS" : "FAIL"}  ${label}`);
  if (!cond) failures++;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Legacy lobby exactly as observed in production (2026-10-25) ──────────
const ghostA = "ghostSeatFromOldBuildA";
const ghostB = "ghostSeatFromOldBuildB";
const old = Date.now() - 30 * 60_000;
await ownerSet("bingoRooms/PUBLIC", {
  code: "PUBLIC", status: "playing", hostId: ghostA, playerIds: [ghostA, ghostB],
  drawnCodes: ["FR", "BR", "JP", "DE", "IT", "ES", "MX"], winnerId: null, winnerName: null,
  createdAt: old, updatedAt: old,
});
for (const id of [ghostA, ghostB]) {
  await ownerSet(`bingoRooms/PUBLIC/players/${id}`, {
    id, displayName: "Ghost", avatarId: "12", ready: false, joinedAt: old,
    board: ["FR", "BR", "JP", "DE", "IT", "ES", "MX", "CA", "US", "AU", "NZ", "IN", "CN", "KR", "TH", "VN", "PH", "ID", "MY", "SG", "EG", "KE", "NG", "ZA", "MA"],
  });
}

const A = await import(pathToFileURL(outfile).href + "?device=A");
const B = await import(pathToFileURL(outfile).href + "?device=B");

function watch(mod, label) {
  const state = { snap: null, err: null };
  mod.subscribeBingoRoom("PUBLIC", (s) => (state.snap = s), (e) => (state.err = `${label}: ${e.message}`));
  return state;
}
async function until(fn, label, ms = 8000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (fn()) return true;
    await sleep(50);
  }
  check(false, `timed out: ${label}`);
  return false;
}

// 1. Both devices join the stuck legacy lobby.
const a = await A.joinOpenBingoLobby({ displayName: "iPad", avatarId: "13" }).catch((e) => e);
check(!(a instanceof Error), `device A joins legacy lobby (${a instanceof Error ? a.message : "ok"})`);
const b = await B.joinOpenBingoLobby({ displayName: "Phone", avatarId: "12" }).catch((e) => e);
check(!(b instanceof Error), `device B joins (${b instanceof Error ? b.message : "ok"})`);
if (a instanceof Error || b instanceof Error) process.exit(1);
check(a.local === false && b.local === false, "both joined the ONLINE lobby (not local fallback)");

const wa = watch(A, "A");
const wb = watch(B, "B");
await until(() => wa.snap?.players.length === 2 && wb.snap?.players.length === 2, "both see 2 players");
check(wa.snap.room.status === "lobby", "stuck legacy match reset to lobby");
check(!(await ownerGet(`bingoRooms/PUBLIC/players/${ghostA}`)), "ghost seats removed");
check(
  JSON.stringify(wa.snap.room.playerIds.sort()) === JSON.stringify([a.playerId, b.playerId].sort()),
  "room lists exactly the two devices",
);

// 2. Start: both dealt boards from the same 64-flag pool.
await A.startBingoGame("PUBLIC", a.playerId);
await until(
  () => wb.snap?.room.status === "playing" && wb.snap.players.every((p) => p.board.length === 25),
  "B sees playing + boards",
);
const pool = new Set(wb.snap.room.poolCodes);
check(pool.size === 64, "match pool is 64 flags");
check(wb.snap.players.every((p) => p.board.every((c) => pool.has(c))), "both boards drawn from the pool");

// 3. Ready sync: one draw per round, seen by both.
async function round(n) {
  await Promise.all([A.setBingoReady("PUBLIC", a.playerId, true), B.setBingoReady("PUBLIC", b.playerId, true)]);
  await until(() => wa.snap.room.drawnCodes.length === n && wb.snap.room.drawnCodes.length === n, `draw ${n} on both`);
}
await A.setBingoReady("PUBLIC", a.playerId, true);
await sleep(300);
check(wb.snap.room.drawnCodes.length === 0, "no draw until B is ready too");
await B.setBingoReady("PUBLIC", b.playerId, true);
await until(() => wa.snap.room.drawnCodes.length === 1 && wb.snap.room.drawnCodes.length === 1, "first draw on both");
check(wa.snap.players.every((p) => !p.ready), "ready flags cleared after draw");
for (let n = 2; n <= 4; n++) await round(n);
check(wa.snap.room.drawnCodes.length === 4 && new Set(wa.snap.room.drawnCodes).size === 4, "4 unique draws, no doubles from simultaneous ready");

// 4. Late joiner C sees all draws and gets a pool board.
const C = await import(pathToFileURL(outfile).href + "?device=C");
const c = await C.joinOpenBingoLobby({ displayName: "Laptop", avatarId: "11" });
const wc = watch(C, "C");
await until(() => wc.snap?.players.length === 3, "C sees 3 players");
const cSeat = wc.snap.players.find((p) => p.id === c.playerId);
check(wc.snap.room.drawnCodes.length === 4, "late joiner sees the 4 drawn flags");
check(cSeat.board.length === 25 && cSeat.board.every((x) => pool.has(x)), "late joiner board from the same pool");

// 5. C closes the tab without leaving (stops heartbeating). Draws must not stall.
await ownerSet(`bingoRooms/PUBLIC/players/${c.playerId}?updateMask.fieldPaths=lastSeen`, { lastSeen: Date.now() - 120_000 });
await round(5);
check(true, "draw continued with a stale seat present");

// 6. Manual marking + win, notice reaches the other device.
const aBoard = () => wa.snap.players.find((p) => p.id === a.playerId).board;
let n = 5;
while (wa.snap.room.status === "playing" && n < 64) {
  for (const code of wa.snap.room.drawnCodes) {
    if (aBoard().includes(code)) await A.markBingoCell("PUBLIC", a.playerId, code).catch(() => {});
  }
  await sleep(150);
  if (wa.snap.room.status !== "playing") break;
  n++;
  await round(n);
}
await until(() => wb.snap.room.status === "finished", "B sees finished");
check(wb.snap.room.winnerId === a.playerId && wb.snap.room.winnerName === "iPad", "B is told iPad won");
const bSeat = wb.snap.players.find((p) => p.id === b.playerId);
check((bSeat.marked ?? []).length === 0, "B's board was not auto-marked");

// 7. Play again resets both.
await B.resetBingoLobby("PUBLIC", b.playerId);
await until(() => wa.snap.room.status === "lobby", "A sees lobby after play again");

check(!wa.err && !wb.err && !wc.err, `no subscription errors ${wa.err ?? ""}${wb.err ?? ""}${wc.err ?? ""}`);
console.log(failures ? `\n${failures} failure(s)` : "\nall two-device checks passed");
process.exit(failures ? 1 : 0);
