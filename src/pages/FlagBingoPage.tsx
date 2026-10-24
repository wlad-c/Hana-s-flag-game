import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MascotAvatar } from "../components/MascotAvatar";
import { useProfile } from "../context/ProfileContext";
import { DEFAULT_AVATAR_ID } from "../lib/avatars";
import {
  BINGO_CELLS,
  BINGO_POOL_SIZE,
  countryNameForCode,
  findBingoLine,
  flagPathForCode,
  isValidRoomCode,
  markedMask,
  normalizeRoomCode,
} from "../lib/flagBingo";
import {
  createBingoRoom,
  joinBingoRoom,
  leaveBingoRoom,
  setBingoReady,
  startBingoGame,
  subscribeBingoRoom,
  type BingoPlayer,
  type BingoRoomSnapshot,
} from "../lib/bingoRoom";
import "./FlagBingoPage.css";

type Phase = "home" | "room";

function seatFromProfile(
  activeProfile: { displayName: string; avatarId: string } | null,
): { displayName: string; avatarId: string } {
  return {
    displayName: activeProfile?.displayName?.trim() || "Guest",
    avatarId: activeProfile?.avatarId || DEFAULT_AVATAR_ID,
  };
}

export default function FlagBingoPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeProfile, uid } = useProfile();

  const roomFromUrl = normalizeRoomCode(searchParams.get("room") ?? "");
  const [phase, setPhase] = useState<Phase>(roomFromUrl ? "room" : "home");
  const [joinInput, setJoinInput] = useState(roomFromUrl);
  const [roomCode, setRoomCode] = useState(roomFromUrl);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [snap, setSnap] = useState<BingoRoomSnapshot | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoJoinAttempted, setAutoJoinAttempted] = useState(false);

  const seat = useMemo(() => seatFromProfile(activeProfile), [activeProfile]);

  // Subscribe while in a room.
  useEffect(() => {
    if (phase !== "room" || !roomCode || !isValidRoomCode(roomCode)) return;
    setError(null);
    const unsub = subscribeBingoRoom(
      roomCode,
      (next) => setSnap(next),
      (err) => setError(err.message || "Could not sync this room"),
    );
    return unsub;
  }, [phase, roomCode]);

  // Keep the shareable ?room= param in sync.
  useEffect(() => {
    if (phase === "room" && roomCode) {
      setSearchParams({ room: roomCode }, { replace: true });
    }
  }, [phase, roomCode, setSearchParams]);

  // Resolve our player id once we have a snapshot (covers refresh / deep link).
  useEffect(() => {
    if (!snap || playerId || autoJoinAttempted) return;
    const preferred = uid;
    if (preferred && snap.players.some((p) => p.id === preferred)) {
      setPlayerId(preferred);
      return;
    }
    // Deep-link into a lobby: auto-join with the active seat.
    if (snap.room.status !== "lobby") {
      setError("That game has already started — ask the host for a new room.");
      setAutoJoinAttempted(true);
      return;
    }
    let cancelled = false;
    setAutoJoinAttempted(true);
    (async () => {
      try {
        setBusy(true);
        const joined = await joinBingoRoom(snap.room.code, seat);
        if (!cancelled) {
          setPlayerId(joined.playerId);
          setRoomCode(joined.code);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not join room");
        }
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [snap, playerId, uid, seat, autoJoinAttempted]);

  const me: BingoPlayer | undefined = snap?.players.find((p) => p.id === playerId);
  const isHost = !!(snap && playerId && snap.room.hostId === playerId);
  const lastDrawn = snap?.room.drawnCodes[snap.room.drawnCodes.length - 1] ?? null;
  const marks = me?.board.length === BINGO_CELLS
    ? markedMask(me.board, snap?.room.drawnCodes ?? [])
    : [];
  const winLine = me && snap
    ? findBingoLine(me.board, snap.room.drawnCodes)
    : null;
  const readyCount = snap?.players.filter((p) => p.ready).length ?? 0;
  const playerCount = snap?.players.length ?? 0;

  const handleCreate = useCallback(async () => {
    setError(null);
    setBusy(true);
    try {
      const created = await createBingoRoom(seat);
      setPlayerId(created.playerId);
      setRoomCode(created.code);
      setPhase("room");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create a room");
    } finally {
      setBusy(false);
    }
  }, [seat]);

  const handleJoin = useCallback(async () => {
    setError(null);
    const code = normalizeRoomCode(joinInput);
    if (!isValidRoomCode(code)) {
      setError("Enter a 6-character room code");
      return;
    }
    setBusy(true);
    try {
      const joined = await joinBingoRoom(code, seat);
      setPlayerId(joined.playerId);
      setRoomCode(joined.code);
      setPhase("room");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join room");
    } finally {
      setBusy(false);
    }
  }, [joinInput, seat]);

  const handleStart = useCallback(async () => {
    if (!roomCode || !playerId) return;
    setError(null);
    setBusy(true);
    try {
      await startBingoGame(roomCode, playerId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start");
    } finally {
      setBusy(false);
    }
  }, [roomCode, playerId]);

  const handleReady = useCallback(async () => {
    if (!roomCode || !playerId || me?.ready) return;
    setError(null);
    setBusy(true);
    try {
      await setBingoReady(roomCode, playerId, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not ready up");
    } finally {
      setBusy(false);
    }
  }, [roomCode, playerId, me?.ready]);

  const handleLeave = useCallback(async () => {
    if (roomCode && playerId) {
      try {
        await leaveBingoRoom(roomCode, playerId);
      } catch {
        /* leave is best-effort */
      }
    }
    setSnap(null);
    setPlayerId(null);
    setRoomCode("");
    setJoinInput("");
    setAutoJoinAttempted(false);
    setPhase("home");
    setSearchParams({}, { replace: true });
  }, [roomCode, playerId, setSearchParams]);

  const copyCode = useCallback(async () => {
    if (!roomCode) return;
    const url = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/multiplayer/bingo?room=${roomCode}`;
    try {
      await navigator.clipboard.writeText(`${roomCode} — ${url}`);
    } catch {
      window.prompt("Share this room code / link:", `${roomCode}\n${url}`);
    }
  }, [roomCode]);

  return (
    <div className="bingo">
      <div className="bingo__shell">
        <header className="bingo__header">
          <div>
            <h1 className="bingo__title">
              Flag <span>Bingo</span>
            </h1>
            <p className="bingo__lede">
              Personal 5×5 boards from all {BINGO_POOL_SIZE} UN country flags.
              When everyone is ready, one flag is drawn. First to five in a row
              wins.
            </p>
          </div>
          <button
            type="button"
            className="bingo__btn bingo__btn--ghost"
            onClick={() => navigate("/multiplayer")}
          >
            All multiplayer
          </button>
        </header>

        {phase === "home" && (
          <>
            <section className="bingo__panel" aria-labelledby="bingo-create-title">
              <h2 id="bingo-create-title" className="bingo__panel-title">
                Start a room
              </h2>
              <p className="bingo__hint" style={{ marginTop: 0 }}>
                Playing as <strong>{seat.displayName}</strong>
                {activeProfile ? "" : " (pick a profile in the bar below anytime)"}.
              </p>
              <div className="bingo__actions" style={{ marginTop: "0.85rem" }}>
                <button
                  type="button"
                  className="bingo__btn bingo__btn--coral"
                  disabled={busy}
                  onClick={handleCreate}
                >
                  Create room
                </button>
              </div>
            </section>

            <section className="bingo__panel" aria-labelledby="bingo-join-title">
              <h2 id="bingo-join-title" className="bingo__panel-title">
                Join a room
              </h2>
              <div className="bingo__actions">
                <div className="bingo__field">
                  <label htmlFor="bingo-room-code">Room code</label>
                  <input
                    id="bingo-room-code"
                    value={joinInput}
                    onChange={(e) => setJoinInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") void handleJoin();
                    }}
                    placeholder="ABC123"
                    maxLength={6}
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
                <button
                  type="button"
                  className="bingo__btn bingo__btn--sky"
                  disabled={busy}
                  onClick={handleJoin}
                  style={{ alignSelf: "flex-end" }}
                >
                  Join
                </button>
              </div>
            </section>

            <section className="bingo__panel">
              <h2 className="bingo__panel-title">How it works</h2>
              <ol className="bingo__rules">
                <li>Create a room and share the 6-character code (or link).</li>
                <li>Each player gets a random board of 25 different country flags.</li>
                <li>Tap <strong>Ready for next flag</strong> when you are set.</li>
                <li>When every player is ready, the system draws one flag from the 195.</li>
                <li>Matching cells on your board mark automatically.</li>
                <li>First to complete a row, column, or diagonal wins.</li>
              </ol>
            </section>
          </>
        )}

        {phase === "room" && (
          <>
            <section className="bingo__panel">
              <div className="bingo__roombar">
                <div>
                  <span className="bingo__code-label">Room code</span>
                  <div className="bingo__code">{roomCode || "……"}</div>
                  {snap?.local && (
                    <p className="bingo__local-note">
                      Local room (Firebase offline) — open another tab on this
                      device to play together.
                    </p>
                  )}
                </div>
                <div className="bingo__actions">
                  <button
                    type="button"
                    className="bingo__btn bingo__btn--mustard"
                    onClick={copyCode}
                    disabled={!roomCode}
                  >
                    Copy code / link
                  </button>
                  <button
                    type="button"
                    className="bingo__btn bingo__btn--ghost"
                    onClick={handleLeave}
                  >
                    Leave
                  </button>
                </div>
              </div>
            </section>

            <section className="bingo__panel" aria-labelledby="bingo-players-title">
              <h2 id="bingo-players-title" className="bingo__panel-title">
                Players ({playerCount})
              </h2>
              <ul className="bingo__players">
                {(snap?.players ?? []).map((p) => (
                  <li key={p.id} className="bingo__player">
                    <MascotAvatar avatarId={p.avatarId} size={36} alt="" />
                    <span className="bingo__player-name">{p.displayName}</span>
                    {p.id === playerId && (
                      <span className="bingo__player-tag bingo__player-tag--you">You</span>
                    )}
                    {snap?.room.hostId === p.id && (
                      <span className="bingo__player-tag">Host</span>
                    )}
                    {snap?.room.status === "playing" && (
                      <span
                        className={
                          p.ready
                            ? "bingo__player-tag bingo__player-tag--ready"
                            : "bingo__player-tag"
                        }
                      >
                        {p.ready ? "Ready" : "Waiting"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {snap?.room.status === "lobby" && (
                <div className="bingo__actions" style={{ marginTop: "1rem" }}>
                  {isHost ? (
                    <button
                      type="button"
                      className="bingo__btn bingo__btn--lime"
                      disabled={busy || playerCount < 1}
                      onClick={handleStart}
                    >
                      Start game
                    </button>
                  ) : (
                    <p className="bingo__status-line">Waiting for the host to start…</p>
                  )}
                </div>
              )}
            </section>

            {snap?.room.status === "playing" && (
              <>
                <section className="bingo__panel">
                  <div className="bingo__draw">
                    {lastDrawn ? (
                      <>
                        <img
                          className="bingo__draw-flag"
                          src={flagPathForCode(lastDrawn)}
                          alt={`Flag of ${countryNameForCode(lastDrawn)}`}
                        />
                        <div className="bingo__draw-meta">
                          <p className="bingo__draw-label">Just drawn</p>
                          <p className="bingo__draw-name">{countryNameForCode(lastDrawn)}</p>
                          <p className="bingo__draw-count">
                            Draw {snap.room.drawnCodes.length} of {BINGO_POOL_SIZE}
                            {" · "}
                            Ready {readyCount}/{playerCount}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="bingo__draw-meta">
                        <p className="bingo__draw-label">First draw</p>
                        <p className="bingo__draw-name">Everyone ready?</p>
                        <p className="bingo__draw-count">
                          Ready {readyCount}/{playerCount} — the first flag appears when
                          all players tap ready.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bingo__actions" style={{ marginTop: "1rem" }}>
                    <button
                      type="button"
                      className="bingo__btn bingo__btn--coral"
                      disabled={busy || !!me?.ready || !me}
                      onClick={handleReady}
                    >
                      {me?.ready ? "Waiting for others…" : "Ready for next flag"}
                    </button>
                  </div>
                </section>

                <section className="bingo__panel bingo__board-wrap">
                  <div>
                    <h2 className="bingo__panel-title">Your board</h2>
                    {me?.board.length === BINGO_CELLS ? (
                      <div className="bingo__board" role="grid" aria-label="Your bingo board">
                        {me.board.map((code, i) => {
                          const marked = marks[i];
                          const inLine = winLine?.includes(i);
                          return (
                            <div
                              key={`${code}-${i}`}
                              role="gridcell"
                              className={[
                                "bingo__cell",
                                marked ? "bingo__cell--marked" : "",
                                inLine ? "bingo__cell--line" : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              title={countryNameForCode(code)}
                            >
                              <img
                                src={flagPathForCode(code)}
                                alt={countryNameForCode(code)}
                              />
                              <span className="bingo__cell-code">{code}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="bingo__hint">Dealing your board…</p>
                    )}
                  </div>
                  <aside className="bingo__sidebar">
                    <h2 className="bingo__panel-title">Drawn so far</h2>
                    {snap.room.drawnCodes.length === 0 ? (
                      <p className="bingo__hint">None yet</p>
                    ) : (
                      <ul className="bingo__history">
                        {[...snap.room.drawnCodes].reverse().map((code) => (
                          <li key={code} className="bingo__history-item" title={countryNameForCode(code)}>
                            <img src={flagPathForCode(code)} alt={countryNameForCode(code)} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </aside>
                </section>
              </>
            )}

            {snap?.room.status === "finished" && (
              <section className="bingo__panel bingo__win">
                <h2>Bingo!</h2>
                <p>
                  {snap.room.winnerId === playerId
                    ? "You won!"
                    : `${snap.room.winnerName ?? "Someone"} completed a line first.`}
                </p>
                {me?.board.length === BINGO_CELLS && (
                  <div className="bingo__board" style={{ maxWidth: 420, margin: "0 auto 1rem" }}>
                    {me.board.map((code, i) => {
                      const marked = marks[i];
                      const inLine = winLine?.includes(i);
                      return (
                        <div
                          key={`end-${code}-${i}`}
                          className={[
                            "bingo__cell",
                            marked ? "bingo__cell--marked" : "",
                            inLine ? "bingo__cell--line" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <img src={flagPathForCode(code)} alt={countryNameForCode(code)} />
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="bingo__actions" style={{ justifyContent: "center" }}>
                  <button
                    type="button"
                    className="bingo__btn bingo__btn--sky"
                    onClick={handleLeave}
                  >
                    Back to lobby
                  </button>
                </div>
              </section>
            )}
          </>
        )}

        {error && <p className="bingo__error" role="alert">{error}</p>}
      </div>
    </div>
  );
}
