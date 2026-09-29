import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchMergedSubdivisionGeo } from "../api/subdivisions";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import { DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";
import { CITY_TERRITORY_CODES } from "../data/cityTerritories";
import { answerKey, identicalFlagTwins, parseAnswerKey } from "../data/identicalSubdivisionFlags";
import {
  getPlayableCapitalSubdivisions,
  getPlayableSubdivisions,
  playableCapitalName,
  sharedFlagCodes,
} from "../lib/playableSubdivisions";
import type { SubdivisionMeta } from "../types/subdivision";
import type { SubdivisionFeatureCollection } from "../types/subdivision";

export type SubdivGamePhase = "loading" | "error" | "guessing" | "revealed" | "finished";

/** What a question asks for: the division's own flag, or its capital city's flag. */
export type SubdivQuestionKind = "division" | "capital";

/**
 * A selectable answer row. Capital rows carry `answerKind: "capital"` so that
 * in a mixed deck — where the dropdown offers divisions AND capitals together,
 * and a division row can share its ISO code with its capital's row — the game
 * knows WHICH entity the player picked.
 */
export type SubdivAnswerOption = SubdivisionMeta & {
  answerKind?: SubdivQuestionKind;
};

type SubdivQuestion = {
  division: SubdivisionMeta;
  kind: SubdivQuestionKind;
};

export type SubdivisionGameOptions = {
  /** Quiz the divisions' own flags. Default true (the original game). */
  includeDivisions?: boolean;
  /** Quiz the divisions' capital-city flags. Default false. */
  includeCapitals?: boolean;
};

export type UseSubdivisionGameResult = {
  phase: SubdivGamePhase;
  error: string | null;
  current: SubdivisionMeta | null;
  /** Whether the current flag is the division's or its capital city's. */
  currentKind: SubdivQuestionKind;
  /** The name the current question asks for (division name, or capital name). */
  currentAnswerName: string | null;
  /** Extra teaching line for the reveal ("capital of Johor", shared-flag note). */
  revealNote: string | null;
  selected: SubdivAnswerOption | null;
  setSelected: (d: SubdivAnswerOption | null) => void;
  confirm: () => void;
  wasCorrect: boolean | null;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalAnswered: number;
  totalQuestions: number;
  attemptNonce: number;
  /** Division-flag question results, keyed by code (feeds the results grid). */
  divisionResults: Record<string, "correct" | "wrong">;
  /** Capital-flag question results, keyed by code (feeds the results grid). */
  capitalResults: Record<string, "correct" | "wrong">;
  /** Per-division colouring for the map: division results, plus capital results
   *  for codes that have no division question in this deck. */
  mapResults: Record<string, "correct" | "wrong">;
  /** Divisions quizzed on their own flag in this deck. */
  divisions: SubdivisionMeta[];
  /** Divisions quizzed on their capital's flag in this deck. */
  capitalDivisions: SubdivisionMeta[];
  /** Answer space for capital questions: every capital of the country with a
   *  sourced name (flagged or not), as division-shaped rows named by capital. */
  capitalAnswerOptions: SubdivAnswerOption[];
  geoData: SubdivisionFeatureCollection | null;
  countryCode: string;
  countryName: string;
  pluralLabel: string;
  includeDivisions: boolean;
  includeCapitals: boolean;
  endGameEarly: () => void;
  gameStartedAtMs: number | null;
  gameEndedAtMs: number | null;
  meanAnswerMs: number | null;
};

const questionKey = (q: SubdivQuestion) => `${q.kind}:${q.division.code}`;

export function useSubdivisionGame(
  countryCode: string,
  countryName: string,
  options?: SubdivisionGameOptions,
): UseSubdivisionGameResult {
  const includeDivisions = options?.includeDivisions !== false;
  const includeCapitals = options?.includeCapitals === true;

  const [phase, setPhase] = useState<SubdivGamePhase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<SubdivisionFeatureCollection | null>(null);
  const [divisions, setDivisions] = useState<SubdivisionMeta[]>([]);
  const [capitalDivisions, setCapitalDivisions] = useState<SubdivisionMeta[]>([]);
  const [current, setCurrent] = useState<SubdivQuestion | null>(null);
  const [selected, setSelected] = useState<SubdivAnswerOption | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [divisionResults, setDivisionResults] = useState<Record<string, "correct" | "wrong">>({});
  const [capitalResults, setCapitalResults] = useState<Record<string, "correct" | "wrong">>({});
  const [attemptNonce, setAttemptNonce] = useState(0);
  const [gameStartedAtMs, setGameStartedAtMs] = useState<number | null>(null);
  const [gameEndedAtMs, setGameEndedAtMs] = useState<number | null>(null);
  const [answerDurationsMs, setAnswerDurationsMs] = useState<number[]>([]);

  // Refs for stable callbacks
  const askedRef = useRef<Set<string>>(new Set());
  const gameStartedAtRef = useRef<number | null>(null);
  const roundStartedAtRef = useRef<number>(0);
  const deckRef = useRef<SubdivQuestion[]>([]);
  const sharedRef = useRef<Set<string>>(new Set());
  const startRoundRef = useRef<(list: SubdivQuestion[]) => void>(() => {});

  const meta = SUBDIVISION_META[countryCode.toUpperCase()];
  const pluralLabel = meta?.pluralLabel ?? "Divisions";

  // Capital questions are answered from the country's FULL capital list (every
  // capital with a sourced name, flagged or not) so even a small deck is a
  // genuine search, not a giveaway. Rows are division-shaped but named by the
  // capital, so selection still resolves to the division's code.
  const capitalAnswerOptions = useMemo<SubdivAnswerOption[]>(() => {
    const m = SUBDIVISION_META[countryCode.toUpperCase()];
    if (!m) return [];
    const seen = new Set<string>();
    const out: SubdivAnswerOption[] = [];
    for (const d of m.divisions) {
      if (d.code in DISPUTED_TERRITORY_HIERARCHY) continue;
      // A city-territory is a division, not a subdivision's capital, so it is
      // never a capital-question answer.
      if (CITY_TERRITORY_CODES.has(d.code)) continue;
      const name = playableCapitalName(d.code);
      if (!name || seen.has(d.code)) continue;
      seen.add(d.code);
      out.push({ ...d, name, answerKind: "capital" });
    }
    return out;
  }, [countryCode]);

  const startRound = useCallback((list: SubdivQuestion[]) => {
    if (list.length === 0) return;
    if (gameStartedAtRef.current === null) {
      const t = Date.now();
      gameStartedAtRef.current = t;
      setGameStartedAtMs(t);
    }
    if (askedRef.current.size >= list.length) {
      setGameEndedAtMs(Date.now());
      setPhase("finished");
      return;
    }
    const pool = list.filter((q) => !askedRef.current.has(questionKey(q)));
    if (pool.length === 0) {
      // Safety net: all unique questions already asked, end the game.
      setGameEndedAtMs(Date.now());
      setPhase("finished");
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)]!;
    askedRef.current.add(questionKey(pick));
    roundStartedAtRef.current = Date.now();
    setCurrent(pick);
    setSelected(null);
    setPhase("guessing");
    setWasCorrect(null);
  }, []);

  startRoundRef.current = startRound;

  // Load data on mount
  useEffect(() => {
    let cancelled = false;
    setPhase("loading");
    setError(null);

    (async () => {
      try {
        const geo = await fetchMergedSubdivisionGeo(countryCode);
        if (cancelled) return;

        const metaEntry = SUBDIVISION_META[countryCode.toUpperCase()];
        if (!metaEntry || metaEntry.divisions.length === 0) {
          setError(`No sub-national data available for ${countryName}.`);
          setPhase("error");
          return;
        }

        setGeoData(geo);
        // Both sets come from the shared playable helpers (the same ones the
        // Flag Master menu counts with) so the menu numbers always equal the
        // number of questions actually asked.
        const divs = includeDivisions ? getPlayableSubdivisions(countryCode) : [];
        const shared =
          includeDivisions && includeCapitals ? sharedFlagCodes(countryCode) : new Set<string>();
        // A flag shared by a division and its capital (e.g. Kuala Lumpur) is
        // asked ONCE in a mixed deck — as the division question — so the same
        // image never carries two different expected answers.
        const caps = includeCapitals
          ? getPlayableCapitalSubdivisions(countryCode).filter((d) => !shared.has(d.code))
          : [];

        const deck: SubdivQuestion[] = [
          ...divs.map((d): SubdivQuestion => ({ division: d, kind: "division" })),
          ...caps.map((d): SubdivQuestion => ({ division: d, kind: "capital" })),
        ];
        if (deck.length === 0) {
          setError(`No flags available for ${countryName} with the chosen sets.`);
          setPhase("error");
          return;
        }
        setDivisions(divs);
        setCapitalDivisions(caps);
        deckRef.current = deck;
        sharedRef.current = shared;

        // Reset game state
        askedRef.current = new Set();
        setScore(0);
        setCorrectCount(0);
        setWrongCount(0);
        setDivisionResults({});
        setCapitalResults({});
        setAnswerDurationsMs([]);
        gameStartedAtRef.current = null;
        setGameStartedAtMs(null);
        setGameEndedAtMs(null);

        startRoundRef.current(deck);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load subdivision data.");
        setPhase("error");
      }
    })();

    return () => { cancelled = true; };
  // Only run on mount / when the game definition changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, includeDivisions, includeCapitals]);

  const confirm = useCallback(() => {
    if (phase !== "guessing" || !current || !selected) return;
    // In a mixed deck the dropdown offers division AND capital rows together
    // (owner rule: a combined pool makes random guessing harder), so a row can
    // share its code with the other kind — same-name pairs are disambiguated
    // in the dropdown with a "(Type)" suffix. Correct means the picked ENTITY
    // matches (code + kind) — except when the division and its capital share
    // the exact same flag (owner rule): the flag on screen belongs to both, so
    // either row is accepted. The same goes for any two answers that fly an
    // identical flag (Ajman and Dubai; Kyiv the city and Kyiv as the capital of
    // Kyiv Oblast): each one's flag is the other's too.
    const selectedKind: SubdivQuestionKind =
      selected.answerKind === "capital" ? "capital" : "division";
    const questionKey = answerKey(current.division.code, current.kind);
    const selectedKey = answerKey(selected.code, selectedKind);
    const correct =
      identicalFlagTwins(questionKey).includes(selectedKey) ||
      (selected.code === current.division.code &&
        (selectedKind === current.kind || sharedRef.current.has(current.division.code)));
    setWasCorrect(correct);
    setAttemptNonce((n) => n + 1);
    setScore((s) => (correct ? s + 1 : s - 1));
    if (correct) setCorrectCount((c) => c + 1);
    else setWrongCount((c) => c + 1);

    const setResult = current.kind === "division" ? setDivisionResults : setCapitalResults;
    setResult((prev) => ({
      ...prev,
      [current.division.code]: correct ? "correct" : "wrong",
    }));

    const answerMs = Date.now() - roundStartedAtRef.current;
    setAnswerDurationsMs((prev) => [...prev, answerMs]);

    const list = deckRef.current;
    const allAsked = askedRef.current.size >= list.length;
    if (allAsked) {
      setGameEndedAtMs(Date.now());
      setPhase("finished");
    } else {
      setPhase("revealed");
    }
  }, [phase, current, selected]);

  // Auto-advance in "revealed" phase. Correct answers advance quickly (1.5s);
  // wrong answers hold for 6s so the fixed answer-reveal burst (5.6s) can be
  // read before the next question replaces it.
  useEffect(() => {
    if (phase !== "revealed" || deckRef.current.length === 0) return;
    const timer = window.setTimeout(() => {
      startRound(deckRef.current);
    }, wasCorrect ? 1500 : 6000);
    return () => window.clearTimeout(timer);
  }, [phase, startRound, wasCorrect]);

  const endGameEarly = useCallback(() => {
    if (phase === "loading" || phase === "error" || phase === "finished") return;
    setGameEndedAtMs((prev) => (prev != null ? prev : Date.now()));
    setPhase("finished");
  }, [phase]);

  const meanAnswerMs = useMemo(() => {
    if (answerDurationsMs.length === 0) return null;
    const sum = answerDurationsMs.reduce((a, b) => a + b, 0);
    return sum / answerDurationsMs.length;
  }, [answerDurationsMs]);

  // Map colouring: division results own the polygon; a capital result colours
  // it only when that code has no division question in this deck (capitals-only
  // games still paint progress).
  const mapResults = useMemo(() => {
    if (!includeCapitals) return divisionResults;
    const divisionCodes = new Set(divisions.map((d) => d.code));
    const merged: Record<string, "correct" | "wrong"> = { ...divisionResults };
    for (const [code, r] of Object.entries(capitalResults)) {
      if (!divisionCodes.has(code) && merged[code] === undefined) merged[code] = r;
    }
    return merged;
  }, [divisionResults, capitalResults, divisions, includeCapitals]);

  const currentKind: SubdivQuestionKind = current?.kind ?? "division";
  const currentAnswerName = current
    ? current.kind === "capital"
      ? playableCapitalName(current.division.code)
      : current.division.name
    : null;
  // Name every other answer in this deck that flies the same flag. A twin of
  // the kind the deck leaves out is not an option, so it is not named.
  const twinNames = current
    ? identicalFlagTwins(answerKey(current.division.code, current.kind))
        .map(parseAnswerKey)
        .map(({ code, kind }) => {
          if (kind === "capital") {
            const cap = includeCapitals ? playableCapitalName(code) : null;
            const of = SUBDIVISION_META[code.split("-")[0]]?.divisions.find((d) => d.code === code)?.name;
            return cap && of ? `${cap} (capital of ${of})` : null;
          }
          return includeDivisions ? divisions.find((d) => d.code === code)?.name ?? null : null;
        })
        .filter((name): name is string => !!name)
    : [];
  const twinList = twinNames.length > 1
    ? `${twinNames.slice(0, -1).join(", ")} and ${twinNames[twinNames.length - 1]}`
    : twinNames[0];
  const twinNote = twinNames.length > 0
    ? twinNames.length > 1
      ? `${twinList} fly the same flag — any of these answers counts`
      : `${twinList} flies the same flag — either answer counts`
    : null;
  const revealNote = current
    ? current.kind === "capital"
      ? [`capital of ${current.division.name}`, twinNote].filter(Boolean).join("; ")
      : sharedRef.current.has(current.division.code)
      ? `also flown by its capital, ${playableCapitalName(current.division.code) ?? ""} — either answer counts`
      : twinNote
    : null;

  return useMemo(() => ({
    phase,
    error,
    current: current?.division ?? null,
    currentKind,
    currentAnswerName,
    revealNote,
    selected,
    setSelected,
    confirm,
    wasCorrect,
    score,
    correctCount,
    wrongCount,
    totalAnswered: correctCount + wrongCount,
    totalQuestions: divisions.length + capitalDivisions.length,
    attemptNonce,
    divisionResults,
    capitalResults,
    mapResults,
    divisions,
    capitalDivisions,
    capitalAnswerOptions,
    geoData,
    countryCode,
    countryName,
    pluralLabel,
    includeDivisions,
    includeCapitals,
    endGameEarly,
    gameStartedAtMs,
    gameEndedAtMs,
    meanAnswerMs,
  }), [
    phase, error, current, currentKind, currentAnswerName, revealNote, selected, confirm,
    wasCorrect, score, correctCount, wrongCount, divisions, capitalDivisions,
    capitalAnswerOptions, attemptNonce, divisionResults, capitalResults, mapResults,
    geoData, countryCode, countryName, pluralLabel, includeDivisions, includeCapitals,
    endGameEarly, gameStartedAtMs, gameEndedAtMs, meanAnswerMs,
  ]);
}
