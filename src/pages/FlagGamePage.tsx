import { UiIcon } from "../components/UiIcon";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LeaveGameDialog } from "../components/LeaveGameDialog";
import { useNavigationGuard } from "../context/NavigationGuardContext";
import { useGame } from "../hooks/useGame";
import { useLeaderboard } from "../context/LeaderboardContext";
import { useProfile } from "../context/ProfileContext";
import { gameAudio } from "../lib/gameAudio";
import type { LeaderboardFilter } from "../context/LeaderboardContext";
import { buildLeaderboardEntryFromGame } from "../lib/buildLeaderboardEntryFromGame";
import { FlagCard } from "../components/FlagCard";
import { CountryDropdown } from "../components/CountryDropdown";
import { AnswerOptions, shouldUseButtons } from "../components/AnswerOptions";
import { ScoreBoard } from "../components/ScoreBoard";
import { Feedback } from "../components/Feedback";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { GameClock } from "../components/GameClock";
import { GameResultsFlags } from "../components/GameResultsFlags";
import { AnswerBurst } from "../components/AnswerBurst";
import { GameFinishCelebration } from "../components/GameFinishCelebration";
import { FlagUnlockModal } from "../components/FlagUnlockModal";
import { addLearnedCode, getDailyFlagCode } from "../lib/learnedFlags";
import { addCodeToStoredSelection } from "../lib/countrySelection";
import { fetchCountries, type Country } from "../api/countries";
import { SubnationalGamePage } from "./SubnationalGamePage";
import { DisputedTerritoriesGamePage } from "./DisputedTerritoriesGamePage";
import {
  TERRITORY_NAME,
  DISPUTED_TERRITORY_CODES,
  UNDISPUTED_TERRITORY_PARENT,
} from "../lib/territoryParentMap";
import {
  gameConfigToParams,
  hasGameMode,
  paramsToGameConfig,
  type GameConfig,
} from "../lib/gameShareUrl";
import { HistoricalFlagGamePage } from "./HistoricalFlagGamePage";
import {
  QUIZ_SYMBOL_LABELS,
  QUIZ_SYMBOL_NOUNS,
  QUIZ_SYMBOL_NOUNS_PLURAL,
  QUIZ_SYMBOL_PROMPTS,
  QUIZ_SYMBOL_SLUGS,
  answersAreFlags,
} from "../lib/quizSymbols";
import "../App.css";

type QuizState = {
  flagCount: number;
};

/** Answer buttons shown per question in the "Match the pair" deck. */
const MATCH_PAIR_OPTIONS = 6;

/**
 * Resolve the game config from router state (set when launched in-app) or,
 * failing that, from the URL query string (a shared/bookmarked link). This is
 * what makes `/game?mode=…` deep-links reproduce the right game.
 */
function useResolvedGameConfig(): GameConfig {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navState = location.state as GameConfig | null;
  if (hasGameMode(navState)) return navState;
  return paramsToGameConfig(searchParams) ?? {};
}

/**
 * Keep the address bar in lock-step with the active game config so the
 * topbar Share button (and a copied URL) always reopen this same mode —
 * even when the game was launched with router state alone.
 */
function useSyncGameShareUrl(config: GameConfig) {
  const [searchParams, setSearchParams] = useSearchParams();
  const desired = gameConfigToParams(config).toString();
  useEffect(() => {
    if (desired === searchParams.toString()) return;
    setSearchParams(new URLSearchParams(desired), { replace: true });
  }, [desired, searchParams, setSearchParams]);
}

export default function FlagGamePage() {
  const config = useResolvedGameConfig();
  useSyncGameShareUrl(config);

  // The two historical decks answer with a ruling power or a period, not a
  // country, so they get their own component tree (hooks are never conditional).
  if (config.historical) {
    return (
      <HistoricalFlagGamePage
        ask={config.historical.ask}
        questionCount={config.historical.questionCount}
      />
    );
  }

  // Disputed territories game: separate component tree so hooks aren't conditional
  if (config.disputedTerritories) {
    return <DisputedTerritoriesGamePage />;
  }

  // Subnational game: completely separate component tree so hooks aren't conditional
  if (config.subnational) {
    return (
      <SubnationalGamePage
        countryCode={config.subnational.countryCode}
        countryName={config.subnational.countryName}
        includeDivisions={config.subnational.includeDivisions !== false}
        includeCapitals={config.subnational.includeCapitals === true}
      />
    );
  }

  // Bumping this remounts FlagGameInner, which re-runs useGame with the same
  // config — the cleanest reset for the "Play again" CTA in Hana's Game.
  return <FlagGamePageInner config={config} />;
}

function FlagGamePageInner({ config }: { config: GameConfig }) {
  const [playAgainNonce, setPlayAgainNonce] = useState(0);
  return (
    <FlagGameInner
      key={playAgainNonce}
      config={config}
      onPlayAgain={() => setPlayAgainNonce((n) => n + 1)}
    />
  );
}

function FlagGameInner({
  config,
  onPlayAgain,
}: {
  config: GameConfig;
  onPlayAgain: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const filterCodes =
    Array.isArray(config.codes) && config.codes.length > 0
      ? config.codes
      : config.groupGame?.groupCodes && config.groupGame.groupCodes.length > 0
        ? config.groupGame.groupCodes
        : null;
  const quiz: QuizState | null = config.quiz ?? null;
  const groupGame = config.groupGame ?? null;
  const isCustomGame = filterCodes !== null && quiz === null && groupGame === null;
  const isQuickQuiz = quiz !== null;
  const isGroupGame = groupGame !== null;
  // Everything this page hosts that isn't Quick Quiz or a Custom Game is a
  // Flag Master mode: the group games (continent / sub-continent / similarity)
  // and the empty-config default (All 195 World Flags). Flag Master answers
  // are always chosen from the dropdown, never a button grid (owner rule).
  const isFlagMaster = !isQuickQuiz && !isCustomGame;
  const symbol = config.symbol ?? "flag";
  const isSymbolGame = symbol !== "flag";
  const game = useGame({
    filterCodes,
    allowRetry: isCustomGame || isQuickQuiz,
    flagCount: quiz?.flagCount ?? null,
    // optionCount matches flagCount so the answer choices scale with the quiz size.
    // "Match the pair" always needs a bounded, visible set: its answers are flag
    // images, which the search dropdown cannot render, so it is the one Flag
    // Master deck that answers with buttons.
    optionCount: quiz?.flagCount ?? (answersAreFlags(symbol) ? MATCH_PAIR_OPTIONS : null),
    maxAttemptsPerFlag: isQuickQuiz ? 1 : Infinity,
    useFullAlternatives: isGroupGame && groupGame.hardcore,
    symbol,
  });
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const { activeProfile } = useProfile();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">("idle");

  // Pre-fill the leaderboard name from the active profile so a signed-in player
  // never has to retype it. Only seeds when the field is still empty, so a
  // Guest's manual entry (or a hand-edited name) is never overwritten.
  useEffect(() => {
    if (activeProfile && !playerName) setPlayerName(activeProfile.displayName);
  }, [activeProfile, playerName]);

  const gameIsActive = game.phase === "guessing" || game.phase === "revealed";

  const { setGuard } = useNavigationGuard();
  const [pendingNavigate, setPendingNavigate] = useState<(() => void) | null>(null);

  const guardFn = useCallback((proceed: () => void) => {
    setPendingNavigate(() => proceed);
  }, []);

  useEffect(() => {
    if (gameIsActive) {
      setGuard(guardFn);
    } else {
      setGuard(null);
    }
    return () => setGuard(null);
  }, [gameIsActive, setGuard, guardFn]);

  useEffect(() => {
    if (!gameIsActive) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [gameIsActive]);

  // Derive a stable game mode string used for leaderboard filtering.
  const gameMode = useMemo((): string => {
    // A symbol round and a flag round are not comparable scores, so each pack
    // gets its own board rather than mixing into the flag one.
    const packSuffix = isSymbolGame ? `-${QUIZ_SYMBOL_SLUGS[symbol]}` : "";
    if (isQuickQuiz && quiz) return `quiz-${quiz.flagCount}${packSuffix}`;
    if (isCustomGame) return `hana${packSuffix}`;
    if (isGroupGame && groupGame) {
      const slug = groupGame.groupLabel
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return `group${groupGame.hardcore ? "-hardcore" : ""}-${slug}${packSuffix}`;
    }
    return `all-195${packSuffix}`;
  }, [isQuickQuiz, isCustomGame, isGroupGame, quiz, groupGame, isSymbolGame, symbol]);

  const leaderboardFilter = useMemo((): LeaderboardFilter => {
    let label: string;
    if (isQuickQuiz && quiz) {
      label = `Quick Quiz · ${game.totalFlags} flags`;
    } else if (isCustomGame) {
      label = `Hana's Game · ${game.totalFlags} flags`;
    } else if (isGroupGame && groupGame) {
      label = `${groupGame.hardcore ? "Hardcore" : groupGame.modeLabel} — ${groupGame.groupLabel} · ${game.totalFlags} flags`;
    } else {
      label = "Flag Master";
    }
    if (isSymbolGame) label = `${label} · ${QUIZ_SYMBOL_LABELS[symbol]}`;
    return { gameMode, totalFlags: game.totalFlags, label };
  }, [
    gameMode,
    game.totalFlags,
    isQuickQuiz,
    isCustomGame,
    isGroupGame,
    quiz,
    groupGame,
    isSymbolGame,
    symbol,
  ]);

  // Show the big finish celebration overlay when the game ends, until the
  // player dismisses it. Reset if the player somehow ends up back in the
  // guessing phase (defensive — current code paths don't do that).
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);
  useEffect(() => {
    if (game.phase !== "finished") {
      setCelebrationDismissed(false);
      setSaveHint("idle");
      setPlayerName("");
    }
  }, [game.phase]);

  // Sound: correct / wrong guess. attemptNonce increments on every confirm().
  useEffect(() => {
    if (game.attemptNonce === 0 || game.wasCorrect === null) return;
    if (game.wasCorrect) gameAudio.playCorrect();
    else gameAudio.playWrong();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.attemptNonce]);

  // Sound: game complete celebration.
  const prevPhaseRef = useRef(game.phase);
  useEffect(() => {
    if (game.phase === "finished" && prevPhaseRef.current !== "finished") {
      gameAudio.playGameComplete();
    }
    prevPhaseRef.current = game.phase;
  }, [game.phase]);

  // --- Daily learn-a-new-flag offer (Hana's Game only) ---
  // Every completed Hana's Game offers the player today's daily flag.
  // The daily flag is deterministic per local calendar date, so multiple
  // games in the same day will show the same flag — the unlock modal
  // adapts ("already in your list ⭐") if the player has already learned
  // it from an earlier run. Other game modes never trigger the offer.
  const [unlockTarget, setUnlockTarget] = useState<Country | null>(null);
  // Full 195-country UN list, fetched once so the unlock flow can resolve a
  // freshly-picked code to a Country (flag URL, name, continent) even when
  // that country isn't in the active game pool.
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetchCountries()
      .then((list) => {
        if (!cancelled) setAllCountries(list);
      })
      .catch(() => {
        // Non-blocking — the unlock CTA falls back to a flagcdn-only Country
        // shell if this list isn't available when the player clicks.
      });
    return () => {
      cancelled = true;
    };
  }, []);
  // A game "counts" for the unlock offer when it's a Hana's Game that
  // played through every flag. Ending early or playing a different mode
  // doesn't trigger it. Derived purely from game state, so the CTA
  // appears on every qualifying completion without any persistent gate.
  const completedHanasGame =
    game.phase === "finished" &&
    isCustomGame &&
    game.totalAnswered >= game.totalFlags &&
    game.totalFlags > 0;

  const handleUnlockFlag = () => {
    if (!completedHanasGame) return;
    // Today's flag is deterministic — every player on the same local
    // calendar date sees the same flag, regardless of game history.
    // The unlock modal handles the "you've already learned this one"
    // case gracefully so we don't need to filter it out here.
    const code = getDailyFlagCode();
    // Resolve to a full Country object from the in-memory list (loaded
    // on mount for this purpose). If the fetch hasn't returned yet,
    // synthesise a minimal shell so the flag image and map highlight
    // still work from the code alone.
    const fromAll = allCountries.find((c) => c.code === code);
    if (fromAll) {
      setUnlockTarget(fromAll);
      return;
    }
    // Fallback shell — REST Countries hasn't returned yet (or failed). The
    // flag image and map highlight still work from the static code alone;
    // the name + continent will populate on subsequent unlocks.
    setUnlockTarget({
      code,
      name: code,
      flagSvg: `https://flagcdn.com/${code.toLowerCase()}.svg`,
      continent: "Africa",
    });
  };

  const handleFlagLearned = () => {
    if (!unlockTarget) return;
    addLearnedCode(unlockTarget.code);
    const nextCodes = addCodeToStoredSelection(unlockTarget.code);
    setUnlockTarget(null);

    // Update current history state so that subsequent rounds (e.g. Play again)
    // in this session will include the newly unlocked flag.
    navigate(".", {
      replace: true,
      state: {
        ...(location.state || {}),
        codes: nextCodes,
      },
    });
  };

  const saveRun = useCallback(
    (name: string) => {
      saveGameToLeaderboard(
        buildLeaderboardEntryFromGame(game, name, gameMode, activeProfile ?? undefined),
      );
      // Reflect the name actually saved so the "Saved as …" message always
      // shows it — the auto-save path saves under the profile name before the
      // prefill effect populates playerName, which otherwise left it blank.
      setPlayerName(name.trim().slice(0, 48));
      setSaveHint("saved");
    },
    [saveGameToLeaderboard, game, gameMode, activeProfile],
  );

  const handleSave = () => {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    saveRun(playerName);
  };

  const handleSaveFromPage = () => {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    saveRun(playerName);
  };

  // Auto-save the run for a signed-in profile: a profile player's scores go to
  // the leaderboard automatically (under their name + mascot), exactly once per
  // finished game. Guests still save manually via the name field. The ref guard
  // survives re-renders (and StrictMode's double-invoke); it resets when a new
  // game starts.
  const autoSavedRef = useRef(false);
  useEffect(() => {
    if (game.phase !== "finished") {
      autoSavedRef.current = false;
      return;
    }
    if (autoSavedRef.current || !activeProfile) return;
    autoSavedRef.current = true;
    saveRun(activeProfile.displayName);
  }, [game.phase, activeProfile, saveRun]);

  // Reset scroll to the top whenever a new flag is shown — both on initial
  // landing (current goes null → flag) and after a correct guess advances
  // the game to the next round (current.code changes). Keeps the flag image
  // and dropdown in view without the user having to scroll up manually.
  const currentCode = game.current?.code;
  useEffect(() => {
    if (currentCode) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentCode]);

  // The dropdown and map work off the per-question alternatives. For
  // All-Flags and Custom Game modes this is the full pool (questionAlternatives
  // falls back to countries). For Quick Quiz it's the per-question subset.
  const alternatives = game.questionAlternatives;
  const countryCodes = useMemo(
    () => new Set(alternatives.map((c) => c.code)),
    [alternatives],
  );
  const countryNames = useMemo(
    () => new Map<string, string>([
      ...alternatives.map((c) => [c.code, c.name] as [string, string]),
      // Territory names for hover tooltips; disputed territories excluded so
      // they never appear as selectable on the world map.
      ...Object.entries(TERRITORY_NAME).filter(
        ([code]) => !DISPUTED_TERRITORY_CODES.has(code),
      ),
    ]),
    [alternatives],
  );
  const codeToCountry = useMemo(
    () => new Map(alternatives.map((c) => [c.code, c])),
    [alternatives],
  );

  if (game.phase === "error") {
    return (
      <div className="app app--center">
        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          continentBreakdown={game.continentBreakdown}
        />
        <main className="card card--error">
          <h1>Guess the Flag</h1>
          <p className="error-message">{game.error ?? "Something went wrong."}</p>
          <p className="hint">Check your connection and refresh the page.</p>
          <p className="game-home-link">
            <Link to="/"><UiIcon name="back" /> Back to home</Link>
          </p>
        </main>
      </div>
    );
  }

  const isRevealed = game.phase === "revealed";
  const isFinished = game.phase === "finished";
  const playedAllFlags =
    isFinished && game.totalAnswered >= game.totalFlags;
  const feedbackPhase: "guessing" | "revealed" =
    game.phase === "guessing" ? "guessing" : "revealed";
  const primaryDisabled =
    game.phase === "loading" ||
    game.phase === "finished" ||
    (game.phase === "guessing" && !game.selected);

  const elapsedMs =
    game.gameStartedAtMs != null && game.gameEndedAtMs != null
      ? game.gameEndedAtMs - game.gameStartedAtMs
      : null;

  const alreadySaved = saveHint === "saved";

  return (
    <div className="app">
      {pendingNavigate && (
        <LeaveGameDialog
          onConfirm={() => { pendingNavigate(); setPendingNavigate(null); }}
          onCancel={() => setPendingNavigate(null)}
        />
      )}
      {isFinished && !celebrationDismissed && !unlockTarget && (
        <GameFinishCelebration
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          playedAllFlags={playedAllFlags}
          itemNoun={QUIZ_SYMBOL_NOUNS[symbol]}
          itemNounPlural={QUIZ_SYMBOL_NOUNS_PLURAL[symbol]}
          elapsedMs={elapsedMs}
          playerName={playerName}
          onPlayerNameChange={(name) => {
            setPlayerName(name);
            setSaveHint("idle");
          }}
          saveHint={saveHint}
          onSave={handleSave}
          onContinue={() => setCelebrationDismissed(true)}
          onUnlockFlag={completedHanasGame ? handleUnlockFlag : undefined}
          onPlayAgain={isCustomGame ? onPlayAgain : undefined}
        />
      )}
      {unlockTarget && (
        <FlagUnlockModal
          country={unlockTarget}
          onLearned={handleFlagLearned}
          onClose={() => setUnlockTarget(null)}
        />
      )}
      {/* The burst is position:fixed/centered, so it always appears in the
          user's viewport — even when they're scrolled down at the score
          board or world map. Active in every game mode (was previously
          gated to Hana's Game only). */}
      <AnswerBurst
        nonce={game.attemptNonce}
        wasCorrect={game.wasCorrect}
        active={!isFinished}
        correctCountry={!isCustomGame ? game.current : undefined}
      />
      <GameClock
        startedAt={game.gameStartedAtMs}
        endedAt={game.gameEndedAtMs}
        meanAnswerMs={game.meanAnswerMs}
        totalAnswered={game.totalAnswered}
        totalFlags={game.totalFlags}
      />
      <main className="card">
        <header className="card-header">
          <h1>
            {isSymbolGame ? "Guess the Country" : "Guess the Flag"}{" "}
            {isCustomGame && <span className="card-header__chip">Hana's Game</span>}
            {isQuickQuiz && (
              <span className="card-header__chip">Quick Quiz</span>
            )}
            {isGroupGame && (
              <span className="card-header__chip">
                {groupGame.hardcore ? "Hardcore" : groupGame.modeLabel}
              </span>
            )}
            {isSymbolGame && (
              <span className="card-header__chip card-header__chip--symbol">
                {QUIZ_SYMBOL_LABELS[symbol]}
              </span>
            )}
          </h1>
          <p className="tagline">
            {isSymbolGame && !isFinished
              ? QUIZ_SYMBOL_PROMPTS[symbol]
              : isFinished
              ? playedAllFlags
                ? "All flags played. Game complete."
                : "Game ended early."
              : isQuickQuiz && quiz
              ? `${game.totalFlags} choices · 1 try per flag.`
              : isGroupGame
              ? groupGame.hardcore
                ? `${groupGame.groupLabel} · all 195 in dropdown · one guess per flag.`
                : `${groupGame.groupLabel} · ${game.totalFlags} flags · one guess per flag.`
              : isCustomGame
              ? game.retryAttempts > 0
                ? `Try again — keep going until you get it right!`
                : "Pick the country, then confirm. You can keep trying until you nail it."
              : "Pick the country, then confirm your answer."}
          </p>
        </header>

        <FlagCard country={game.current} phase={game.phase} />

        {/* Flag Master games (All-195 and the group modes) always answer
            via the search dropdown — never the multiple-choice button
            grid (owner rule, 2026-07). Hana's Game (Custom Game) always
            shows the multiple-choice buttons instead — the options must be
            visible directly below the flag, never hidden behind a dropdown
            the player has to open (owner rule, 2026-07). Quick Quiz keeps
            the buttons only when the per-question pool is small enough that
            ALL choices fit on screen, falling back to the dropdown for
            larger pools. The Confirm button stays in every layout so the
            wrong-guess / retry flow is unchanged. */}
        {(answersAreFlags(symbol) || !isFlagMaster) &&
        (answersAreFlags(symbol) ||
          isCustomGame ||
          shouldUseButtons(alternatives.length)) ? (
          <div className="answer-row answer-row--buttons">
            <AnswerOptions
              countries={alternatives}
              value={game.selected}
              onChange={game.setSelected}
              disabled={isRevealed || isFinished || game.phase === "loading"}
              label="Your answer"
              imageFor={
                answersAreFlags(symbol)
                  ? (c) => c.nationalFlagSvg ?? c.flagSvg
                  : undefined
              }
            />
            {!isFinished && !isRevealed && (
              <button
                type="button"
                className="btn btn-primary answer-row__confirm"
                disabled={primaryDisabled}
                onClick={game.confirm}
              >
                Confirm
              </button>
            )}
          </div>
        ) : (
          <div className="answer-row">
            <CountryDropdown
              countries={alternatives}
              value={game.selected}
              onChange={game.setSelected}
              disabled={isRevealed || isFinished || game.phase === "loading"}
              label="Your answer"
            />
            {!isFinished && !isRevealed && (
              <button
                type="button"
                className="btn btn-primary answer-row__confirm"
                disabled={primaryDisabled}
                onClick={game.confirm}
              >
                Confirm
              </button>
            )}
          </div>
        )}

        {game.phase !== "loading" && (
          <Feedback
            phase={feedbackPhase}
            current={game.current}
            wasCorrect={game.wasCorrect}
          />
        )}

        <WorldProgressMap
          countryResults={game.countryResults}
          selectedCode={game.selected?.code ?? null}
          disabled={game.phase !== "guessing"}
          selectable={{
            codes: countryCodes,
            names: countryNames,
            onSelect: (code) => {
              // WorldProgressMap resolves territory codes to parent country
              // codes before calling onSelect, so code is always a country code.
              const country = codeToCountry.get(code);
              if (country) game.setSelected(country);
            },
            onConfirm: game.confirm,
            // Rule #2: UNDISPUTED only — disputed territories must not be
            // clickable on the map (see territoryParentMap.ts Rule #2 comment).
            territoryParent: UNDISPUTED_TERRITORY_PARENT,
          }}
        />

        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          continentBreakdown={game.continentBreakdown}
        />

        {isFinished && (
          <div className="game-complete">
            <p className="game-complete__title">Game over</p>
            <p className="game-complete__text">
              {playedAllFlags
                ? `You answered all ${game.totalFlags} ${QUIZ_SYMBOL_NOUNS_PLURAL[symbol]} in this run.`
                : `You ended the game after ${game.totalAnswered} of ${game.totalFlags} ${QUIZ_SYMBOL_NOUNS_PLURAL[symbol]}.`}
            </p>
          </div>
        )}

        {isFinished && (
          <div className="post-game-leaderboard">
            {alreadySaved ? (
              <>
                <p className="post-game-leaderboard__feedback" role="status">
                  ✓ Saved to the leaderboard as <strong>{playerName}</strong>.
                </p>
                <div className="post-game-leaderboard__actions">
                  <button
                    type="button"
                    className="btn btn-leaderboard"
                    onClick={() => openLeaderboard(leaderboardFilter)}
                  >
                    View leaderboard
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="post-game-leaderboard__prompt">
                  Enter your name to save this run to the leaderboard.
                </p>
                <div className="post-game-leaderboard__row">
                  <label className="visually-hidden" htmlFor="leaderboard-name">
                    Your name
                  </label>
                  <input
                    id="leaderboard-name"
                    type="text"
                    className="post-game-leaderboard__input"
                    placeholder="Your name"
                    maxLength={48}
                    value={playerName}
                    autoComplete="nickname"
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                      setSaveHint("idle");
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary post-game-leaderboard__save"
                    disabled={!playerName.trim()}
                    onClick={handleSaveFromPage}
                  >
                    Save to leaderboard
                  </button>
                </div>
                {saveHint === "need-name" && (
                  <p className="post-game-leaderboard__feedback post-game-leaderboard__feedback--warn">
                    Please enter a name before saving.
                  </p>
                )}
                <div className="post-game-leaderboard__actions">
                  <button
                    type="button"
                    className="btn btn-leaderboard"
                    onClick={() => openLeaderboard(leaderboardFilter)}
                  >
                    Leaderboard
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {isFinished && (
          <GameResultsFlags
            countries={game.countries}
            countryResults={game.countryResults}
          />
        )}

        {!isFinished && game.phase !== "loading" && (
          <div className="end-game">
            <button
              type="button"
              className="btn btn-end-game"
              onClick={game.endGameEarly}
            >
              End game
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
