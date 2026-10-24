/**
 * Flag Bingo room sync — Firestore when online, BroadcastChannel local
 * rooms when Firebase auth is unavailable (dev / offline).
 *
 * Room documents never store the future draw pile (only codes already
 * drawn). The next flag is chosen inside a transaction by whichever
 * client advances the round once every seated player is ready.
 */

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { auth, db, ensureAnonymousAuth } from "./firebase";
import {
  generateBingoBoard,
  generateRoomCode,
  hasBingo,
  isValidRoomCode,
  normalizeRoomCode,
  pickNextDraw,
  PUBLIC_BINGO_ROOM,
  selectMatchPool,
} from "./flagBingo";
import { DEFAULT_AVATAR_ID } from "./avatars";

export { PUBLIC_BINGO_ROOM };

export type BingoRoomStatus = "lobby" | "playing" | "finished";

export type BingoPlayer = {
  id: string;
  displayName: string;
  avatarId: string;
  /** 25 country codes once the game has started; empty in lobby. */
  board: string[];
  /**
   * Country codes the player has manually confirmed on their board after
   * those flags were drawn. Educational mode — never auto-mark from draws.
   */
  marked: string[];
  ready: boolean;
  joinedAt: number;
};

export type BingoRoom = {
  code: string;
  status: BingoRoomStatus;
  hostId: string;
  playerIds: string[];
  /**
   * The 64 country codes in play for this match. Empty in lobby; set once
   * at start. Boards and draws are always subsets of this pool.
   */
  poolCodes: string[];
  drawnCodes: string[];
  winnerId: string | null;
  winnerName: string | null;
  createdAt: number;
  updatedAt: number;
};

function emptyRoom(
  code: string,
  hostId: string,
  playerIds: string[],
  now: number,
): BingoRoom {
  return {
    code,
    status: "lobby",
    hostId,
    playerIds,
    poolCodes: [],
    drawnCodes: [],
    winnerId: null,
    winnerName: null,
    createdAt: now,
    updatedAt: now,
  };
}

export type BingoSeat = {
  displayName: string;
  avatarId: string;
};

export type BingoRoomSnapshot = {
  room: BingoRoom;
  players: BingoPlayer[];
  /** True when this client is using the in-tab local fallback, not Firestore. */
  local: boolean;
};

const COLLECTION = "bingoRooms";
/** Open public lobby — anyone on the site can sit here. */
const MAX_PLAYERS = 32;

// ── Local (BroadcastChannel) fallback ──────────────────────────────────

type LocalStore = {
  room: BingoRoom;
  players: Map<string, BingoPlayer>;
};

const localRooms = new Map<string, LocalStore>();
const localListeners = new Map<string, Set<(snap: BingoRoomSnapshot) => void>>();
let localChannel: BroadcastChannel | null = null;

function getLocalChannel(): BroadcastChannel | null {
  if (typeof BroadcastChannel === "undefined") return null;
  if (!localChannel) {
    localChannel = new BroadcastChannel("flag-bingo-rooms");
    localChannel.onmessage = (ev: MessageEvent) => {
      const data = ev.data as { type: string; code: string; store?: SerializedLocal };
      if (!data?.code) return;
      if (data.type === "sync" && data.store) {
        localRooms.set(data.code, deserializeLocal(data.store));
        emitLocal(data.code);
      } else if (data.type === "request" && localRooms.has(data.code)) {
        broadcastLocal(data.code);
      }
    };
  }
  return localChannel;
}

type SerializedLocal = {
  room: BingoRoom;
  players: BingoPlayer[];
};

function serializeLocal(store: LocalStore): SerializedLocal {
  return { room: store.room, players: [...store.players.values()] };
}

function deserializeLocal(data: SerializedLocal): LocalStore {
  return {
    room: data.room,
    players: new Map(data.players.map((p) => [p.id, p])),
  };
}

function emitLocal(code: string) {
  const store = localRooms.get(code);
  const listeners = localListeners.get(code);
  if (!store || !listeners) return;
  const snap: BingoRoomSnapshot = {
    room: store.room,
    players: store.room.playerIds
      .map((id) => store.players.get(id))
      .filter((p): p is BingoPlayer => !!p),
    local: true,
  };
  for (const cb of listeners) cb(snap);
}

function broadcastLocal(code: string) {
  const store = localRooms.get(code);
  const ch = getLocalChannel();
  if (!store || !ch) return;
  ch.postMessage({ type: "sync", code, store: serializeLocal(store) });
}

function mutateLocal(code: string, fn: (store: LocalStore) => void) {
  const store = localRooms.get(code);
  if (!store) throw new Error(`Room ${code} not found`);
  fn(store);
  store.room = { ...store.room, updatedAt: Date.now() };
  localRooms.set(code, store);
  broadcastLocal(code);
  emitLocal(code);
}

function subscribeLocal(
  code: string,
  onUpdate: (snap: BingoRoomSnapshot) => void,
): Unsubscribe {
  getLocalChannel()?.postMessage({ type: "request", code });
  let set = localListeners.get(code);
  if (!set) {
    set = new Set();
    localListeners.set(code, set);
  }
  set.add(onUpdate);
  if (localRooms.has(code)) emitLocal(code);
  return () => {
    set!.delete(onUpdate);
    if (set!.size === 0) localListeners.delete(code);
  };
}

/** Stable-enough guest id for the local/offline path (per browser tab). */
function localClientId(): string {
  const key = "flagBingo.localClientId";
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const id = `local-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return `local-${Math.random().toString(36).slice(2, 10)}`;
  }
}

async function resolvePlayerId(): Promise<{ id: string; local: boolean }> {
  const uid = await ensureAnonymousAuth();
  if (uid && auth?.currentUser) return { id: uid, local: false };
  return { id: localClientId(), local: true };
}

// ── Public API ─────────────────────────────────────────────────────────

export async function createBingoRoom(seat: BingoSeat): Promise<{
  code: string;
  playerId: string;
  local: boolean;
}> {
  const { id: playerId, local } = await resolvePlayerId();
  const now = Date.now();
  let code = generateRoomCode();

  if (local) {
    // Avoid colliding with an in-memory room still open in another tab.
    for (let i = 0; i < 5 && localRooms.has(code); i++) code = generateRoomCode();
    const player: BingoPlayer = {
      id: playerId,
      displayName: seat.displayName.slice(0, 48) || "Player",
      avatarId: seat.avatarId || DEFAULT_AVATAR_ID,
      board: [],
      marked: [],
      ready: false,
      joinedAt: now,
    };
    const room = emptyRoom(code, playerId, [playerId], now);
    localRooms.set(code, { room, players: new Map([[playerId, player]]) });
    getLocalChannel();
    broadcastLocal(code);
    return { code, playerId, local: true };
  }

  const player: BingoPlayer = {
    id: playerId,
    displayName: seat.displayName.slice(0, 48) || "Player",
    avatarId: seat.avatarId || DEFAULT_AVATAR_ID,
    board: [],
    marked: [],
    ready: false,
    joinedAt: now,
  };

  // Try a few codes in case of collision. If Firestore rejects the write
  // (rules not deployed yet, offline, etc.) fall back to a local room so
  // the section still works in this browser.
  try {
    for (let attempt = 0; attempt < 6; attempt++) {
      code = attempt === 0 ? code : generateRoomCode();
      const roomRef = doc(db, COLLECTION, code);
      const existing = await getDoc(roomRef);
      if (existing.exists()) continue;

      const room = emptyRoom(code, playerId, [playerId], now);
      await setDoc(roomRef, room);
      await setDoc(doc(db, COLLECTION, code, "players", playerId), player);
      return { code, playerId, local: false };
    }
  } catch (err) {
    console.warn("Firestore bingo create failed; using local room.", err);
    for (let i = 0; i < 5 && localRooms.has(code); i++) code = generateRoomCode();
    const room = emptyRoom(code, playerId, [playerId], now);
    localRooms.set(code, { room, players: new Map([[playerId, player]]) });
    getLocalChannel();
    broadcastLocal(code);
    return { code, playerId, local: true };
  }
  throw new Error("Could not allocate a free room code — try again");
}

/**
 * Open Flag Bingo: join the single shared lobby (creating it if needed).
 * No room code — everyone who opens the section lands here.
 */
export async function joinOpenBingoLobby(seat: BingoSeat): Promise<{
  code: string;
  playerId: string;
  local: boolean;
}> {
  const code = PUBLIC_BINGO_ROOM;
  const { id: playerId, local } = await resolvePlayerId();
  const now = Date.now();

  const buildPlayer = (
    status: BingoRoomStatus,
    poolCodes: readonly string[] = [],
  ): BingoPlayer => ({
    id: playerId,
    displayName: seat.displayName.slice(0, 48) || "Player",
    avatarId: seat.avatarId || DEFAULT_AVATAR_ID,
    // Mid-game joiners get a board from THIS match's 64-flag pool.
    board:
      status === "playing" && poolCodes.length > 0
        ? generateBingoBoard(poolCodes)
        : [],
    marked: [],
    ready: false,
    joinedAt: now,
  });

  const ensureLocal = () => {
    if (!localRooms.has(code)) {
      localRooms.set(code, {
        room: emptyRoom(code, playerId, [], now),
        players: new Map(),
      });
      getLocalChannel();
    }
    mutateLocal(code, (s) => {
      if (!s.players.has(playerId) && s.room.playerIds.length >= MAX_PLAYERS) {
        throw new Error(`This lobby is full (${MAX_PLAYERS} players max)`);
      }
      const status =
        s.room.status === "finished" ? "lobby" : s.room.status;
      const player = buildPlayer(status, s.room.poolCodes ?? []);
      // Finished open lobby: late arrivals wait for the next round.
      if (s.room.status === "finished") {
        player.board = [];
      }
      const isNew = !s.players.has(playerId);
      if (isNew) {
        s.players.set(playerId, player);
        s.room.playerIds = [...s.room.playerIds, playerId];
        if (!s.room.hostId) s.room.hostId = playerId;
        // Mid-game join: clear ready so the next draw waits for everyone,
        // including the newcomer who still needs to catch up on drawn flags.
        if (s.room.status === "playing") {
          for (const id of s.room.playerIds) {
            const p = s.players.get(id);
            if (!p) continue;
            s.players.set(id, { ...p, ready: false });
          }
        }
      } else {
        const prev = s.players.get(playerId)!;
        s.players.set(playerId, {
          ...prev,
          displayName: player.displayName,
          avatarId: player.avatarId,
          board:
            prev.board.length === 25
              ? prev.board
              : player.board,
        });
      }
    });
    broadcastLocal(code);
    return { code, playerId, local: true as const };
  };

  if (local) return ensureLocal();

  try {
    const roomRef = doc(db, COLLECTION, code);
    await runTransaction(db, async (tx) => {
      const roomSnap = await tx.get(roomRef);
      const playerRef = doc(db, COLLECTION, code, "players", playerId);

      if (!roomSnap.exists()) {
        const room = emptyRoom(code, playerId, [playerId], now);
        tx.set(roomRef, room);
        tx.set(playerRef, buildPlayer("lobby"));
        return;
      }

      const room = roomSnap.data() as BingoRoom;
      // Older room docs (pre-pool) may lack poolCodes — treat as empty.
      if (!Array.isArray(room.poolCodes)) room.poolCodes = [];
      const existingPlayer = await tx.get(playerRef);
      const statusForBoard: BingoRoomStatus =
        room.status === "playing" ? "playing" : "lobby";
      const player = buildPlayer(statusForBoard, room.poolCodes);

      if (!existingPlayer.exists()) {
        if (room.playerIds.length >= MAX_PLAYERS) {
          throw new Error(`This lobby is full (${MAX_PLAYERS} players max)`);
        }
        tx.set(playerRef, player);
        tx.update(roomRef, {
          playerIds: [...room.playerIds, playerId],
          updatedAt: Date.now(),
        });
        // Mid-game join: reset ready on every seat so the next draw waits
        // for the newcomer too. They share the same drawnCodes / poolCodes.
        if (room.status === "playing") {
          for (const pid of room.playerIds) {
            tx.update(doc(db, COLLECTION, code, "players", pid), {
              ready: false,
            });
          }
        }
      } else {
        const prev = existingPlayer.data() as BingoPlayer;
        tx.update(playerRef, {
          displayName: player.displayName,
          avatarId: player.avatarId,
          ...(prev.board?.length === 25
            ? {}
            : { board: player.board, marked: [], ready: false }),
        });
      }
    });
    return { code, playerId, local: false };
  } catch (err) {
    console.warn("Firestore open bingo lobby failed; using local lobby.", err);
    return ensureLocal();
  }
}

export async function joinBingoRoom(
  rawCode: string,
  seat: BingoSeat,
): Promise<{ code: string; playerId: string; local: boolean }> {
  const code = normalizeRoomCode(rawCode);
  if (code === PUBLIC_BINGO_ROOM) return joinOpenBingoLobby(seat);
  if (!isValidRoomCode(code)) throw new Error("Room codes are 6 letters or numbers");

  const { id: playerId, local } = await resolvePlayerId();
  const now = Date.now();
  const player: BingoPlayer = {
    id: playerId,
    displayName: seat.displayName.slice(0, 48) || "Player",
    avatarId: seat.avatarId || DEFAULT_AVATAR_ID,
    board: [],
    marked: [],
    ready: false,
    joinedAt: now,
  };

  if (local || localRooms.has(code)) {
    // Ask peers for the room, then wait briefly for a sync.
    getLocalChannel()?.postMessage({ type: "request", code });
    await new Promise((r) => setTimeout(r, 120));
    const store = localRooms.get(code);
    if (!store) throw new Error("Room not found. Check the code and try again.");
    if (store.room.status !== "lobby") {
      // Allow re-join of an in-progress room if this seat already exists.
      if (!store.players.has(playerId)) {
        throw new Error("That game has already started");
      }
      return { code, playerId, local: true };
    }
    if (!store.players.has(playerId) && store.room.playerIds.length >= MAX_PLAYERS) {
      throw new Error(`This room is full (${MAX_PLAYERS} players max)`);
    }
    mutateLocal(code, (s) => {
      if (!s.players.has(playerId)) {
        s.players.set(playerId, player);
        s.room.playerIds = [...s.room.playerIds, playerId];
      } else {
        const prev = s.players.get(playerId)!;
        s.players.set(playerId, {
          ...prev,
          displayName: player.displayName,
          avatarId: player.avatarId,
        });
      }
    });
    return { code, playerId, local: true };
  }

  const roomRef = doc(db, COLLECTION, code);
  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) throw new Error("Room not found. Check the code and try again.");
    const room = roomSnap.data() as BingoRoom;
    const playerRef = doc(db, COLLECTION, code, "players", playerId);
    const existingPlayer = await tx.get(playerRef);

    if (room.status !== "lobby" && !existingPlayer.exists()) {
      throw new Error("That game has already started");
    }
    if (!existingPlayer.exists() && room.playerIds.length >= MAX_PLAYERS) {
      throw new Error(`This room is full (${MAX_PLAYERS} players max)`);
    }

    if (!existingPlayer.exists()) {
      tx.set(playerRef, player);
      tx.update(roomRef, {
        playerIds: [...room.playerIds, playerId],
        updatedAt: Date.now(),
      });
    } else {
      tx.update(playerRef, {
        displayName: player.displayName,
        avatarId: player.avatarId,
      });
    }
  });

  return { code, playerId, local: false };
}

export function subscribeBingoRoom(
  code: string,
  onUpdate: (snap: BingoRoomSnapshot) => void,
  onError: (err: Error) => void,
): Unsubscribe {
  const normalized = normalizeRoomCode(code);
  if (localRooms.has(normalized)) {
    return subscribeLocal(normalized, onUpdate);
  }

  // Prefer Firestore; if the room doc never appears and a local room arrives
  // via BroadcastChannel, flip to local.
  let unsubRoom: Unsubscribe | null = null;
  let unsubPlayers: Unsubscribe | null = null;
  let unsubLocal: Unsubscribe | null = null;
  let latestRoom: BingoRoom | null = null;
  let latestPlayers: BingoPlayer[] = [];
  let usingLocal = false;

  const emit = () => {
    if (!latestRoom) return;
    onUpdate({ room: latestRoom, players: latestPlayers, local: false });
  };

  try {
    unsubRoom = onSnapshot(
      doc(db, COLLECTION, normalized),
      (snap) => {
        if (!snap.exists()) {
          // Maybe it's a local room from another tab — try local subscribe.
          if (!usingLocal) {
            usingLocal = true;
            unsubLocal = subscribeLocal(normalized, onUpdate);
            getLocalChannel()?.postMessage({ type: "request", code: normalized });
          }
          return;
        }
        latestRoom = snap.data() as BingoRoom;
        emit();
      },
      (err) => onError(err),
    );
    unsubPlayers = onSnapshot(
      collection(db, COLLECTION, normalized, "players"),
      (snap) => {
        latestPlayers = snap.docs.map((d) => d.data() as BingoPlayer);
        // Keep lobby order from room.playerIds when available.
        if (latestRoom) {
          const order = new Map(latestRoom.playerIds.map((id, i) => [id, i]));
          latestPlayers.sort(
            (a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999),
          );
        }
        emit();
      },
      (err) => onError(err),
    );
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
  }

  return () => {
    unsubRoom?.();
    unsubPlayers?.();
    unsubLocal?.();
  };
}

export async function startBingoGame(code: string, playerId: string): Promise<void> {
  const normalized = normalizeRoomCode(code);
  const isOpenLobby = normalized === PUBLIC_BINGO_ROOM;

  if (localRooms.has(normalized)) {
    mutateLocal(normalized, (s) => {
      if (!isOpenLobby && s.room.hostId !== playerId) {
        throw new Error("Only the host can start the game");
      }
      if (!s.players.has(playerId)) throw new Error("You are not in this lobby");
      if (s.room.status !== "lobby") throw new Error("Game already started");
      if (s.room.playerIds.length < 1) throw new Error("Need at least one player");
      const pool = selectMatchPool();
      s.room.status = "playing";
      s.room.poolCodes = pool;
      s.room.drawnCodes = [];
      s.room.winnerId = null;
      s.room.winnerName = null;
      for (const id of s.room.playerIds) {
        const p = s.players.get(id);
        if (!p) continue;
        s.players.set(id, {
          ...p,
          board: generateBingoBoard(pool),
          marked: [],
          ready: false,
        });
      }
    });
    return;
  }

  const roomRef = doc(db, COLLECTION, normalized);
  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) throw new Error("Room not found");
    const room = roomSnap.data() as BingoRoom;
    if (!isOpenLobby && room.hostId !== playerId) {
      throw new Error("Only the host can start the game");
    }
    if (!room.playerIds.includes(playerId)) throw new Error("You are not in this lobby");
    if (room.status !== "lobby") throw new Error("Game already started");
    if (room.playerIds.length < 1) throw new Error("Need at least one player");

    const pool = selectMatchPool();
    tx.update(roomRef, {
      status: "playing",
      poolCodes: pool,
      drawnCodes: [],
      winnerId: null,
      winnerName: null,
      updatedAt: Date.now(),
    });

    for (const pid of room.playerIds) {
      const pref = doc(db, COLLECTION, normalized, "players", pid);
      tx.update(pref, {
        board: generateBingoBoard(pool),
        marked: [],
        ready: false,
      });
    }
  });
}

/** Reset a finished (or stuck) open lobby back to waiting for the next round. */
export async function resetBingoLobby(code: string, playerId: string): Promise<void> {
  const normalized = normalizeRoomCode(code);

  if (localRooms.has(normalized)) {
    mutateLocal(normalized, (s) => {
      if (!s.players.has(playerId)) throw new Error("You are not in this lobby");
      s.room.status = "lobby";
      s.room.poolCodes = [];
      s.room.drawnCodes = [];
      s.room.winnerId = null;
      s.room.winnerName = null;
      for (const id of s.room.playerIds) {
        const p = s.players.get(id);
        if (!p) continue;
        s.players.set(id, { ...p, board: [], marked: [], ready: false });
      }
    });
    return;
  }

  const roomRef = doc(db, COLLECTION, normalized);
  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) throw new Error("Room not found");
    const room = roomSnap.data() as BingoRoom;
    if (!room.playerIds.includes(playerId)) throw new Error("You are not in this lobby");

    tx.update(roomRef, {
      status: "lobby",
      poolCodes: [],
      drawnCodes: [],
      winnerId: null,
      winnerName: null,
      updatedAt: Date.now(),
    });
    for (const pid of room.playerIds) {
      tx.update(doc(db, COLLECTION, normalized, "players", pid), {
        board: [],
        marked: [],
        ready: false,
      });
    }
  });
}

/**
 * Mark this player ready for the next draw. If every seated player is
 * ready, atomically draw the next flag and clear ready flags.
 */
export async function setBingoReady(
  code: string,
  playerId: string,
  ready = true,
): Promise<void> {
  const normalized = normalizeRoomCode(code);

  if (localRooms.has(normalized)) {
    mutateLocal(normalized, (s) => {
      if (s.room.status !== "playing") throw new Error("Game is not in progress");
      const me = s.players.get(playerId);
      if (!me) throw new Error("You are not in this room");
      s.players.set(playerId, { ...me, ready });

      if (!ready) return;
      const allReady = s.room.playerIds.every((id) => s.players.get(id)?.ready);
      if (!allReady) return;

      const pool =
        s.room.poolCodes && s.room.poolCodes.length > 0
          ? s.room.poolCodes
          : selectMatchPool();
      if (!s.room.poolCodes?.length) s.room.poolCodes = pool;
      const next = pickNextDraw(s.room.drawnCodes, pool);
      if (!next) return;
      s.room.drawnCodes = [...s.room.drawnCodes, next];
      for (const id of s.room.playerIds) {
        const p = s.players.get(id);
        if (!p) continue;
        s.players.set(id, { ...p, ready: false });
      }
      // Do NOT auto-mark or auto-finish — players tap matching cells themselves.
    });
    return;
  }

  const roomRef = doc(db, COLLECTION, normalized);
  const playerRef = doc(db, COLLECTION, normalized, "players", playerId);

  // Optimistic ready flag first so the lobby updates quickly, then a
  // transaction that may advance the draw.
  await updateDoc(playerRef, { ready });
  if (!ready) return;

  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) throw new Error("Room not found");
    const room = roomSnap.data() as BingoRoom;
    if (room.status !== "playing") return;
    if (!Array.isArray(room.poolCodes)) room.poolCodes = [];

    const playerSnaps = await Promise.all(
      room.playerIds.map((pid) => tx.get(doc(db, COLLECTION, normalized, "players", pid))),
    );
    const players = playerSnaps.map((ps) => {
      if (!ps.exists()) throw new Error("Player seat missing");
      return ps.data() as BingoPlayer;
    });

    // All seats must already show ready (set by the updateDoc above).
    // On contention the loser retries, sees ready flags cleared by the
    // winner's draw, and exits without drawing a second flag.
    if (!players.every((p) => p.ready)) return;

    const pool =
      room.poolCodes.length > 0 ? room.poolCodes : selectMatchPool();
    const next = pickNextDraw(room.drawnCodes, pool);
    if (!next) return;

    // Draw only — marking and bingo claims are player-driven (educational).
    // Persist a recovered pool if an older room doc lacked one.
    tx.update(
      roomRef,
      room.poolCodes.length
        ? {
            drawnCodes: [...room.drawnCodes, next],
            updatedAt: Date.now(),
          }
        : {
            drawnCodes: [...room.drawnCodes, next],
            poolCodes: pool,
            updatedAt: Date.now(),
          },
    );
    for (const pid of room.playerIds) {
      tx.update(doc(db, COLLECTION, normalized, "players", pid), { ready: false });
    }
  });
}

/**
 * Player confirms a drawn flag on their board. Only codes that appear both
 * on the board and in drawnCodes may be marked. Completing a line wins.
 */
export async function markBingoCell(
  code: string,
  playerId: string,
  countryCode: string,
): Promise<void> {
  const normalized = normalizeRoomCode(code);
  const cc = countryCode.toUpperCase();

  if (localRooms.has(normalized)) {
    mutateLocal(normalized, (s) => {
      if (s.room.status !== "playing") throw new Error("Game is not in progress");
      const me = s.players.get(playerId);
      if (!me) throw new Error("You are not in this lobby");
      if (!me.board.includes(cc)) throw new Error("That flag is not on your board");
      if (!s.room.drawnCodes.includes(cc)) {
        throw new Error("That flag has not been drawn yet");
      }
      const marked = me.marked ?? [];
      if (marked.includes(cc)) return;
      const nextMarked = [...marked, cc];
      s.players.set(playerId, { ...me, marked: nextMarked });
      if (hasBingo(me.board, nextMarked)) {
        s.room.status = "finished";
        s.room.winnerId = me.id;
        s.room.winnerName = me.displayName;
      }
    });
    return;
  }

  const roomRef = doc(db, COLLECTION, normalized);
  const playerRef = doc(db, COLLECTION, normalized, "players", playerId);

  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) throw new Error("Room not found");
    const room = roomSnap.data() as BingoRoom;
    if (room.status !== "playing") throw new Error("Game is not in progress");

    const playerSnap = await tx.get(playerRef);
    if (!playerSnap.exists()) throw new Error("You are not in this lobby");
    const me = playerSnap.data() as BingoPlayer;
    if (!me.board.includes(cc)) throw new Error("That flag is not on your board");
    if (!room.drawnCodes.includes(cc)) {
      throw new Error("That flag has not been drawn yet");
    }
    const marked = me.marked ?? [];
    if (marked.includes(cc)) return;
    const nextMarked = [...marked, cc];
    tx.update(playerRef, { marked: nextMarked });
    if (hasBingo(me.board, nextMarked)) {
      tx.update(roomRef, {
        status: "finished",
        winnerId: me.id,
        winnerName: me.displayName,
        updatedAt: Date.now(),
      });
    }
  });
}

export async function leaveBingoRoom(code: string, playerId: string): Promise<void> {
  const normalized = normalizeRoomCode(code);

  if (localRooms.has(normalized)) {
    mutateLocal(normalized, (s) => {
      s.players.delete(playerId);
      s.room.playerIds = s.room.playerIds.filter((id) => id !== playerId);
      if (s.room.hostId === playerId && s.room.playerIds.length > 0) {
        s.room.hostId = s.room.playerIds[0]!;
      }
    });
    return;
  }

  const roomRef = doc(db, COLLECTION, normalized);
  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) return;
    const room = roomSnap.data() as BingoRoom;
    const playerRef = doc(db, COLLECTION, normalized, "players", playerId);
    tx.delete(playerRef);
    const playerIds = room.playerIds.filter((id) => id !== playerId);
    const patch: Partial<BingoRoom> = {
      playerIds,
      updatedAt: Date.now(),
    };
    if (room.hostId === playerId && playerIds.length > 0) {
      patch.hostId = playerIds[0]!;
    }
    tx.update(roomRef, patch);
  });
}

export { MAX_PLAYERS as BINGO_MAX_PLAYERS };
