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
} from "./flagBingo";
import { DEFAULT_AVATAR_ID } from "./avatars";

export type BingoRoomStatus = "lobby" | "playing" | "finished";

export type BingoPlayer = {
  id: string;
  displayName: string;
  avatarId: string;
  /** 25 country codes once the game has started; empty in lobby. */
  board: string[];
  ready: boolean;
  joinedAt: number;
};

export type BingoRoom = {
  code: string;
  status: BingoRoomStatus;
  hostId: string;
  playerIds: string[];
  drawnCodes: string[];
  winnerId: string | null;
  winnerName: string | null;
  createdAt: number;
  updatedAt: number;
};

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
const MAX_PLAYERS = 8;

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
      ready: false,
      joinedAt: now,
    };
    const room: BingoRoom = {
      code,
      status: "lobby",
      hostId: playerId,
      playerIds: [playerId],
      drawnCodes: [],
      winnerId: null,
      winnerName: null,
      createdAt: now,
      updatedAt: now,
    };
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

      const room: BingoRoom = {
        code,
        status: "lobby",
        hostId: playerId,
        playerIds: [playerId],
        drawnCodes: [],
        winnerId: null,
        winnerName: null,
        createdAt: now,
        updatedAt: now,
      };
      await setDoc(roomRef, room);
      await setDoc(doc(db, COLLECTION, code, "players", playerId), player);
      return { code, playerId, local: false };
    }
  } catch (err) {
    console.warn("Firestore bingo create failed; using local room.", err);
    for (let i = 0; i < 5 && localRooms.has(code); i++) code = generateRoomCode();
    const room: BingoRoom = {
      code,
      status: "lobby",
      hostId: playerId,
      playerIds: [playerId],
      drawnCodes: [],
      winnerId: null,
      winnerName: null,
      createdAt: now,
      updatedAt: now,
    };
    localRooms.set(code, { room, players: new Map([[playerId, player]]) });
    getLocalChannel();
    broadcastLocal(code);
    return { code, playerId, local: true };
  }
  throw new Error("Could not allocate a free room code — try again");
}

export async function joinBingoRoom(
  rawCode: string,
  seat: BingoSeat,
): Promise<{ code: string; playerId: string; local: boolean }> {
  const code = normalizeRoomCode(rawCode);
  if (!isValidRoomCode(code)) throw new Error("Room codes are 6 letters or numbers");

  const { id: playerId, local } = await resolvePlayerId();
  const now = Date.now();
  const player: BingoPlayer = {
    id: playerId,
    displayName: seat.displayName.slice(0, 48) || "Player",
    avatarId: seat.avatarId || DEFAULT_AVATAR_ID,
    board: [],
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
      throw new Error("This room is full (8 players max)");
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
      throw new Error("This room is full (8 players max)");
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

export async function startBingoGame(code: string, hostId: string): Promise<void> {
  const normalized = normalizeRoomCode(code);

  if (localRooms.has(normalized)) {
    mutateLocal(normalized, (s) => {
      if (s.room.hostId !== hostId) throw new Error("Only the host can start the game");
      if (s.room.status !== "lobby") throw new Error("Game already started");
      if (s.room.playerIds.length < 1) throw new Error("Need at least one player");
      s.room.status = "playing";
      s.room.drawnCodes = [];
      s.room.winnerId = null;
      s.room.winnerName = null;
      for (const id of s.room.playerIds) {
        const p = s.players.get(id);
        if (!p) continue;
        s.players.set(id, {
          ...p,
          board: generateBingoBoard(),
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
    if (room.hostId !== hostId) throw new Error("Only the host can start the game");
    if (room.status !== "lobby") throw new Error("Game already started");
    if (room.playerIds.length < 1) throw new Error("Need at least one player");

    tx.update(roomRef, {
      status: "playing",
      drawnCodes: [],
      winnerId: null,
      winnerName: null,
      updatedAt: Date.now(),
    });

    for (const pid of room.playerIds) {
      const pref = doc(db, COLLECTION, normalized, "players", pid);
      tx.update(pref, { board: generateBingoBoard(), ready: false });
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

      const next = pickNextDraw(s.room.drawnCodes);
      if (!next) return;
      s.room.drawnCodes = [...s.room.drawnCodes, next];
      for (const id of s.room.playerIds) {
        const p = s.players.get(id);
        if (!p) continue;
        s.players.set(id, { ...p, ready: false });
      }

      // Auto-finish if someone already has bingo after this draw.
      for (const id of s.room.playerIds) {
        const p = s.players.get(id);
        if (p && hasBingo(p.board, s.room.drawnCodes)) {
          s.room.status = "finished";
          s.room.winnerId = p.id;
          s.room.winnerName = p.displayName;
          break;
        }
      }
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

    const next = pickNextDraw(room.drawnCodes);
    if (!next) return;

    const drawnCodes = [...room.drawnCodes, next];
    let winnerId: string | null = null;
    let winnerName: string | null = null;
    let status: BingoRoomStatus = "playing";
    for (const p of players) {
      if (hasBingo(p.board, drawnCodes)) {
        winnerId = p.id;
        winnerName = p.displayName;
        status = "finished";
        break;
      }
    }

    tx.update(roomRef, {
      drawnCodes,
      status,
      winnerId,
      winnerName,
      updatedAt: Date.now(),
    });
    for (const pid of room.playerIds) {
      tx.update(doc(db, COLLECTION, normalized, "players", pid), { ready: false });
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
