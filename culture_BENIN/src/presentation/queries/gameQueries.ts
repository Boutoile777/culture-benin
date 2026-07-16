import { useQuery } from "@tanstack/react-query";
import type { Difficulty } from "@/domain/entities/Difficulty";
import type { GameType } from "@/domain/entities/LeaderboardEntry";
import {
  chronologyRepository,
  leaderboardRepository,
  memoryRepository,
  quizRepository,
} from "@/infrastructure/config/repositories";

export const gameKeys = {
  quiz: (difficulty: Difficulty) => ["quiz", difficulty] as const,
  memory: (difficulty: Difficulty) => ["memory", difficulty] as const,
  chronology: ["chronology"] as const,
  leaderboard: (game: GameType, limit: number) =>
    ["leaderboard", game, limit] as const,
};

export function useQuizQuestions(
  token: string | null | undefined,
  difficulty: Difficulty,
) {
  return useQuery({
    queryKey: gameKeys.quiz(difficulty),
    queryFn: () => quizRepository.getQuestions(token!, difficulty),
    enabled: Boolean(token),
  });
}

export function useMemoryItems(
  token: string | null | undefined,
  difficulty: Difficulty,
) {
  return useQuery({
    queryKey: gameKeys.memory(difficulty),
    queryFn: () => memoryRepository.getItems(token!, difficulty),
    enabled: Boolean(token),
  });
}

export function useChronologyItems() {
  return useQuery({
    queryKey: gameKeys.chronology,
    queryFn: () => chronologyRepository.getItems(),
  });
}

export function useLeaderboard(
  game: GameType,
  limit: number,
  token?: string | null,
) {
  return useQuery({
    queryKey: gameKeys.leaderboard(game, limit),
    queryFn: () => leaderboardRepository.getTop(game, limit, token ?? undefined),
  });
}
