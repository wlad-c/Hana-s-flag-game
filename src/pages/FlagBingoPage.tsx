import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MascotAvatar } from "../components/MascotAvatar";
import { useProfile } from "../context/ProfileContext";
import { DEFAULT_AVATAR_ID } from "../lib/avatars";
import {
  BINGO_CELLS,
  BINGO_MATCH_POOL_SIZE,
  BINGO_UN_POOL_SIZE,
  countryNameForCode,
  findBingoLine,
  flagPathForCode,
  markedMask,
  PUBLIC_BINGO_ROOM,
} from "../lib/flagBingo";
import {
  joinOpenBingoLobby,
  leaveBingoRoom,
  markBingoCell,
  resetBingoLobby,
  setBingoReady,
  startBingoGame,
  subscribeBingoRoom,
  type BingoPlayer,
  type BingoRoomSnapshot,
} from "../lib/bingoRoom";
import "./FlagBingoPage.css";

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
  const { activeProfile } = useProfile();

  const [playerId, setPlayerId] = useState<string | null>(null);
  const [snap, setSnap] = useState<BingoRoomSnapshot | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(true);
  const [inspectCode, setInspectCode] = useState<string | null>(null);
  /** Interruptive win banner — shown to every seated player when someone wins. */
  const [winNotice, setWinNotice] = useState<{
    winnerId: string;
    winnerName: string;
  } | null>(null);
  /** Once dismissed for this winner, don't re-open until the next match. */
  const [dismissedWinFor, setDismissedWinFor] = useState<string | null>(null);

  const seat = useMemo(() => seatFromProfile(activeProfile), [activeProfile]);

  // Auto-join the shared open lobby — no room code.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setJoining(true);
      setError(null);
      try {
        const joined = await joinOpenBingoLobby(seat);
        if (cancelled) return;
        setPlayerId(joined.playerId);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not join the lobby");
        }
      } finally {
        if (!cancelled) setJoining(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // Re-join when the active profile name/avatar changes so the seat updates.
  }, [seat.displayName, seat.avatarId]);

  useEffect(() => {
    if (!playerId) return;
    const unsub = subscribeBingoRoom(
      PUBLIC_BINGO_ROOM,
      (next) => setSnap(next),
      (err) => setError(err.message || "Could not sync the lobby"),
    );
    return unsub;
  }, [playerId]);

  // Best-effort leave when navigating away.
  useEffect(() => {
    return () => {
      if (playerId) {
        void leaveBingoRoom(PUBLIC_BINGO_ROOM, playerId).catch(() => {});
      }
    };
  }, [playerId]);

  // Close the inspect modal on Escape (not while the win notice is up).
  useEffect(() => {
    if (!inspectCode || winNotice) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setInspectCode(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspectCode, winNotice]);

  // Every seated client gets a win notice when the match finishes.
  useEffect(() => {
    if (!snap) return;
    if (snap.room.status === "finished" && snap.room.winnerId) {
      if (dismissedWinFor === snap.room.winnerId) return;
      setWinNotice({
        winnerId: snap.room.winnerId,
        winnerName: snap.room.winnerName?.trim() || "Someone",
      });
      setInspectCode(null);
    } else {
      setWinNotice(null);
      if (snap.room.status !== "finished") setDismissedWinFor(null);
    }
  }, [
    snap?.room.status,
    snap?.room.winnerId,
    snap?.room.winnerName,
    dismissedWinFor,
  ]);

  const me: BingoPlayer | undefined = snap?.players.find((p) => p.id === playerId);
  const lastDrawn = snap?.room.drawnCodes[snap.room.drawnCodes.length - 1] ?? null;
  const myMarked = me?.marked ?? [];
  const marks =
    me?.board.length === BINGO_CELLS ? markedMask(me.board, myMarked) : [];
  const winLine = me ? findBingoLine(me.board, myMarked) : null;
  const drawnSet = useMemo(
    () => new Set(snap?.room.drawnCodes ?? []),
    [snap?.room.drawnCodes],
  );
  const matchPoolSize =
    snap?.room.poolCodes?.length && snap.room.poolCodes.length > 0
      ? snap.room.poolCodes.length
      : BINGO_MATCH_POOL_SIZE;
  const readyCount = snap?.players.filter((p) => p.ready).length ?? 0;
  const playerCount = snap?.players.length ?? 0;
  /** Flags already drawn that are on this board and not yet marked (catch-up). */
  const catchUpCodes = useMemo(() => {
    if (!me || me.board.length !== BINGO_CELLS) return [] as string[];
    const marked = new Set(myMarked);
    return me.board.filter((code) => drawnSet.has(code) && !marked.has(code));
  }, [me, myMarked, drawnSet]);
  const joinedMidGame =
    snap?.room.status === "playing" &&
    (snap.room.drawnCodes.length > 0) &&
    !!me &&
    me.board.length === BINGO_CELLS;

  const handleStart = useCallback(async () => {
    if (!playerId) return;
    setError(null);
    setBusy(true);
    try {
      await startBingoGame(PUBLIC_BINGO_ROOM, playerId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start");
    } finally {
      setBusy(false);
    }
  }, [playerId]);

  const handleReady = useCallback(async () => {
    if (!playerId || me?.ready) return;
    setError(null);
    setBusy(true);
    try {
      await setBingoReady(PUBLIC_BINGO_ROOM, playerId, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not ready up");
    } finally {
      setBusy(false);
    }
  }, [playerId, me?.ready]);

  const handlePlayAgain = useCallback(async () => {
    if (!playerId) return;
    setError(null);
    setBusy(true);
    try {
      await resetBingoLobby(PUBLIC_BINGO_ROOM, playerId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset");
    } finally {
      setBusy(false);
    }
  }, [playerId]);

  const handleLeave = useCallback(async () => {
    if (playerId) {
      try {
        await leaveBingoRoom(PUBLIC_BINGO_ROOM, playerId);
      } catch {
        /* leave is best-effort */
      }
    }
    navigate("/");
  }, [playerId, navigate]);

  const handleMarkCell = useCallback(
    async (countryCode: string) => {
      if (!playerId || !snap || snap.room.status !== "playing") return;
      if (!drawnSet.has(countryCode)) return;
      if (myMarked.includes(countryCode)) return;
      setError(null);
      try {
        await markBingoCell(PUBLIC_BINGO_ROOM, playerId, countryCode);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not mark that flag");
      }
    },
    [playerId, snap, drawnSet, myMarked],
  );

  return (
    <div className="bingo">
      <div className="bingo__shell">
        <header className="bingo__header">
          <div>
            <h1 className="bingo__title">
              Flag <span>Bingo</span>
            </h1>
            <p className="bingo__lede">
              Open lobby — everyone who opens this page plays together. Each
              match uses {BINGO_MATCH_POOL_SIZE} flags picked at random from
              all {BINGO_UN_POOL_SIZE} UN countries; every board uses only that
              match&apos;s pool. When everyone is ready, one flag is drawn —
              tap matching flags on your board to mark them. First to five in a
              row wins.
            </p>
          </div>
          <button
            type="button"
            className="bingo__btn bingo__btn--ghost"
            onClick={handleLeave}
          >
            Leave
          </button>
        </header>

        {joining && !snap && (
          <section className="bingo__panel">
            <p className="bingo__status-line">Joining the open lobby…</p>
          </section>
        )}

        {snap && (
          <>
            <section className="bingo__panel" aria-labelledby="bingo-players-title">
              <div className="bingo__roombar">
                <div>
                  <h2 id="bingo-players-title" className="bingo__panel-title">
                    Players here ({playerCount})
                  </h2>
                  <p className="bingo__hint" style={{ marginTop: 0 }}>
                    Playing as <strong>{seat.displayName}</strong>
                    {activeProfile ? "" : " (pick a profile below anytime)"}.
                    {snap.local
                      ? " Local lobby (Firebase offline) — open another tab on this device to play together."
                      : " Anyone on the site who opens Flag Bingo joins this lobby."}
                  </p>
                </div>
              </div>
              <ul className="bingo__players">
                {snap.players.map((p) => (
                  <li key={p.id} className="bingo__player">
                    <MascotAvatar avatarId={p.avatarId} size={36} alt="" />
                    <span className="bingo__player-name">{p.displayName}</span>
                    {p.id === playerId && (
                      <span className="bingo__player-tag bingo__player-tag--you">You</span>
                    )}
                    {snap.room.status === "playing" && (
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

              {snap.room.status === "lobby" && (
                <div className="bingo__actions" style={{ marginTop: "1rem" }}>
                  <button
                    type="button"
                    className="bingo__btn bingo__btn--lime"
                    disabled={busy || playerCount < 1 || !playerId}
                    onClick={handleStart}
                  >
                    Start game
                  </button>
                  <p className="bingo__hint" style={{ margin: 0, alignSelf: "center" }}>
                    Anyone here can start when you are ready.
                  </p>
                </div>
              )}
            </section>

            {snap.room.status === "playing" && (
              <>
                {joinedMidGame && (
                  <section
                    className="bingo__panel bingo__catchup"
                    aria-live="polite"
                  >
                    <h2 className="bingo__panel-title">Joined mid-game</h2>
                    <p className="bingo__catchup-text">
                      {snap.room.drawnCodes.length} flag
                      {snap.room.drawnCodes.length === 1 ? "" : "s"} already
                      drawn — they are listed under <strong>Drawn so far</strong>
                      {catchUpCodes.length > 0 ? (
                        <>
                          . You have{" "}
                          <strong>
                            {catchUpCodes.length} matching flag
                            {catchUpCodes.length === 1 ? "" : "s"}
                          </strong>{" "}
                          on your board (highlighted) — tap each to mark it and
                          catch up, just like players who were here from the
                          start.
                        </>
                      ) : (
                        <>
                          . None of those are on your board yet — keep playing;
                          new draws use the same match pool.
                        </>
                      )}
                    </p>
                  </section>
                )}

                <section className="bingo__panel">
                  <div className="bingo__draw">
                    {lastDrawn ? (
                      <>
                        <button
                          type="button"
                          className="bingo__draw-flag-btn"
                          onClick={() => setInspectCode(lastDrawn)}
                          aria-label={`View larger flag of ${countryNameForCode(lastDrawn)}`}
                        >
                          <img
                            key={flagPathForCode(lastDrawn)}
                            className="bingo__draw-flag"
                            src={flagPathForCode(lastDrawn)}
                            alt={`Flag of ${countryNameForCode(lastDrawn)}`}
                          />
                        </button>
                        <div className="bingo__draw-meta">
                          <p className="bingo__draw-label">Just drawn</p>
                          <p className="bingo__draw-name">{countryNameForCode(lastDrawn)}</p>
                          <p className="bingo__draw-count">
                            Draw {snap.room.drawnCodes.length} of {matchPoolSize}
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
                          all players tap ready. This match uses {matchPoolSize} flags.
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
                          const callable =
                            !marked && drawnSet.has(code) && snap.room.status === "playing";
                          const name = countryNameForCode(code);
                          const className = [
                            "bingo__cell",
                            marked ? "bingo__cell--marked" : "",
                            callable ? "bingo__cell--callable" : "",
                            inLine ? "bingo__cell--line" : "",
                          ]
                            .filter(Boolean)
                            .join(" ");
                          const body = (
                            <>
                              <span className="bingo__cell-flag">
                                <img
                                  key={flagPathForCode(code)}
                                  src={flagPathForCode(code)}
                                  alt=""
                                />
                                {marked && (
                                  <span className="bingo__cell-tick" aria-hidden="true">
                                    ✓
                                  </span>
                                )}
                              </span>
                              <span className="bingo__cell-name">{name}</span>
                            </>
                          );
                          if (callable) {
                            return (
                              <button
                                key={`${code}-${i}`}
                                type="button"
                                role="gridcell"
                                className={className}
                                title={`Tap to mark ${name}`}
                                aria-label={`Mark ${name}`}
                                onClick={() => void handleMarkCell(code)}
                              >
                                {body}
                              </button>
                            );
                          }
                          return (
                            <div
                              key={`${code}-${i}`}
                              role="gridcell"
                              className={className}
                              title={name}
                              aria-label={marked ? `${name}, marked` : name}
                            >
                              {body}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="bingo__hint">
                        Dealing your board… Tap a flag after it is drawn to mark it.
                      </p>
                    )}
                  </div>
                  <aside className="bingo__sidebar">
                    <h2 className="bingo__panel-title">
                      Drawn so far ({snap.room.drawnCodes.length})
                    </h2>
                    <p className="bingo__hint" style={{ marginTop: 0 }}>
                      Tap any flag to view it larger. Mid-game joiners see the
                      full list from this match.
                    </p>
                    {snap.room.drawnCodes.length === 0 ? (
                      <p className="bingo__hint">None yet</p>
                    ) : (
                      <ul className="bingo__history">
                        {[...snap.room.drawnCodes].reverse().map((code) => {
                          const name = countryNameForCode(code);
                          const onMyBoard = !!me?.board.includes(code);
                          const marked = myMarked.includes(code);
                          return (
                            <li key={code}>
                              <button
                                type="button"
                                className={[
                                  "bingo__history-item",
                                  onMyBoard && !marked
                                    ? "bingo__history-item--mine"
                                    : "",
                                  marked ? "bingo__history-item--marked" : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                title={
                                  marked
                                    ? `${name} (marked on your board)`
                                    : onMyBoard
                                      ? `${name} (on your board — tap the board cell to mark)`
                                      : `View ${name}`
                                }
                                aria-label={`View larger flag of ${name}`}
                                onClick={() => setInspectCode(code)}
                              >
                                <img
                                  key={flagPathForCode(code)}
                                  src={flagPathForCode(code)}
                                  alt={name}
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </aside>
                </section>
              </>
            )}

            {snap.room.status === "finished" && (
              <section className="bingo__panel bingo__win">
                <h2>Bingo!</h2>
                <p>
                  {snap.room.winnerId === playerId
                    ? "You won!"
                    : `${snap.room.winnerName ?? "Someone"} got Bingo!`}
                </p>
                {me?.board.length === BINGO_CELLS && (
                  <div
                    className="bingo__board"
                    style={{ maxWidth: 420, margin: "0 auto 1rem" }}
                  >
                    {me.board.map((code, i) => {
                      const marked = marks[i];
                      const inLine = winLine?.includes(i);
                      const name = countryNameForCode(code);
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
                          <span className="bingo__cell-flag">
                            <img
                              key={flagPathForCode(code)}
                              src={flagPathForCode(code)}
                              alt=""
                            />
                            {marked && (
                              <span className="bingo__cell-tick" aria-hidden="true">
                                ✓
                              </span>
                            )}
                          </span>
                          <span className="bingo__cell-name">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="bingo__actions" style={{ justifyContent: "center" }}>
                  <button
                    type="button"
                    className="bingo__btn bingo__btn--lime"
                    disabled={busy}
                    onClick={handlePlayAgain}
                  >
                    Play again
                  </button>
                  <button
                    type="button"
                    className="bingo__btn bingo__btn--ghost"
                    onClick={handleLeave}
                  >
                    Home
                  </button>
                </div>
              </section>
            )}
          </>
        )}

        {!joining && !snap && !error && (
          <section className="bingo__panel">
            <h2 className="bingo__panel-title">How it works</h2>
            <ol className="bingo__rules">
              <li>Open this page — you join the shared lobby automatically.</li>
              <li>
                Each match picks {BINGO_MATCH_POOL_SIZE} flags from the{" "}
                {BINGO_UN_POOL_SIZE} UN countries; every player gets a board of
                25 flags from that match pool only.
              </li>
              <li>
                Tap <strong>Ready for next flag</strong> when you are set.
              </li>
              <li>
                When every player is ready, the system draws one flag from the
                match pool.
              </li>
              <li>If that flag is on your board, tap its card to mark it.</li>
              <li>First to complete a row, column, or diagonal wins.</li>
            </ol>
          </section>
        )}

        {error && (
          <p className="bingo__error" role="alert">
            {error}
          </p>
        )}
      </div>

      {inspectCode && !winNotice && (
        <div
          className="bingo__modal-backdrop"
          role="presentation"
          onClick={() => setInspectCode(null)}
        >
          <div
            className="bingo__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bingo-inspect-title"
            onClick={(ev) => ev.stopPropagation()}
          >
            <img
              key={flagPathForCode(inspectCode)}
              className="bingo__modal-flag"
              src={flagPathForCode(inspectCode)}
              alt=""
            />
            <h2 id="bingo-inspect-title" className="bingo__modal-name">
              {countryNameForCode(inspectCode)}
            </h2>
            <button
              type="button"
              className="bingo__btn bingo__btn--ghost"
              onClick={() => setInspectCode(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {winNotice && (
        <div
          className="bingo__modal-backdrop bingo__modal-backdrop--win"
          role="presentation"
        >
          <div
            className="bingo__modal bingo__modal--win"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="bingo-win-title"
            aria-describedby="bingo-win-desc"
          >
            <p className="bingo__win-kicker">Game over</p>
            <h2 id="bingo-win-title" className="bingo__modal-name">
              Bingo!
            </h2>
            <p id="bingo-win-desc" className="bingo__win-notice-text">
              {winNotice.winnerId === playerId
                ? "You completed a line first — you win!"
                : `${winNotice.winnerName} completed a line first and wins this match.`}
            </p>
            <div className="bingo__actions" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="bingo__btn bingo__btn--lime"
                disabled={busy}
                onClick={() => {
                  setDismissedWinFor(winNotice.winnerId);
                  setWinNotice(null);
                  void handlePlayAgain();
                }}
              >
                Play again
              </button>
              <button
                type="button"
                className="bingo__btn bingo__btn--ghost"
                onClick={() => {
                  setDismissedWinFor(winNotice.winnerId);
                  setWinNotice(null);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
