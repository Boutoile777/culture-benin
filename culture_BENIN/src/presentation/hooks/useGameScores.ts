import { useCallback, useEffect, useState } from "react";
import type { GameType } from "@/domain/entities/LeaderboardEntry";

const STORAGE_KEY = "culture-benin:game-scores";

type ScoresState = Partial<Record<GameType, number>>;

function readStoredScores(): ScoresState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScoresState) : {};
  } catch {
    return {};
  }
}

export function useGameScores() {
  const [scores, setScores] = useState<ScoresState>(() => readStoredScores());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  const recordScore = useCallback((game: GameType, score: number) => {
    setScores((current) => {
      const best = current[game] ?? 0;
      if (score <= best) return current;
      return { ...current, [game]: score };
    });
  }, []);

  return { scores, recordScore };
}
