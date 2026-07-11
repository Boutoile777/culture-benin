import { useCallback, useEffect, useState } from "react";
import type { Difficulty } from "@/domain/entities/Difficulty";
import type { GameType } from "@/domain/entities/LeaderboardEntry";

const STORAGE_KEY = "culture-benin:game-scores";

type ScoresState = Partial<Record<string, number>>;

function scoreKey(game: GameType, difficulty?: Difficulty): string {
  return difficulty ? `${game}:${difficulty}` : game;
}

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

  const recordScore = useCallback(
    (game: GameType, score: number, difficulty?: Difficulty) => {
      const key = scoreKey(game, difficulty);
      setScores((current) => {
        const best = current[key] ?? 0;
        if (score <= best) return current;
        return { ...current, [key]: score };
      });
    },
    [],
  );

  const getScore = useCallback(
    (game: GameType, difficulty?: Difficulty) => scores[scoreKey(game, difficulty)],
    [scores],
  );

  return { scores, recordScore, getScore };
}
