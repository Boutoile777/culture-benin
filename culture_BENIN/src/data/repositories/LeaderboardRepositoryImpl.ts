import type { GameType, LeaderboardEntry } from "@/domain/entities/LeaderboardEntry";
import type { LeaderboardRepository } from "@/domain/repositories/LeaderboardRepository";
import { LEADERBOARD_MOCK } from "@/data/datasources/local/leaderboard.mock";
import { apiFetch } from "@/infrastructure/api/httpClient";

const DIFFICULTIES = ["facile", "intermediaire", "expert"] as const;

interface RawUser {
  firstname: string;
  lastname: string;
}

interface RawQuizLeaderboardEntry {
  user: RawUser;
  bestScore: number;
  bestTotal: number;
}

interface RawMemoryLeaderboardEntry {
  user: RawUser;
  bestScore: number;
}

function userName(user: RawUser): string {
  return `${user.firstname} ${user.lastname}`.trim();
}

function rank(entries: LeaderboardEntry[], limit: number): LeaderboardEntry[] {
  return entries
    .sort((a, b) => b.points - a.points)
    .slice(0, limit)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

export class LeaderboardRepositoryImpl implements LeaderboardRepository {
  async getTop(game: GameType, limit: number, token?: string): Promise<LeaderboardEntry[]> {
    if (game === "chronology") {
      return LEADERBOARD_MOCK.filter((entry) => entry.game === "chronology")
        .sort((a, b) => b.points - a.points)
        .slice(0, limit);
    }

    if (!token) return [];

    if (game === "quiz") {
      const batches = await Promise.all(
        DIFFICULTIES.map((difficulty) =>
          apiFetch<RawQuizLeaderboardEntry[]>(`/quiz/leaderboard?difficulty=${difficulty}`, {
            token,
          }),
        ),
      );
      const byUser = new Map<string, LeaderboardEntry>();
      for (const entry of batches.flat()) {
        const name = userName(entry.user);
        const points = entry.bestTotal > 0 ? Math.round((entry.bestScore / entry.bestTotal) * 100) : 0;
        const existing = byUser.get(name);
        if (!existing || points > existing.points) {
          byUser.set(name, { rank: 0, userName: name, points, game: "quiz" });
        }
      }
      return rank([...byUser.values()], limit);
    }

    const raw = await apiFetch<RawMemoryLeaderboardEntry[]>(`/memory/leaderboard?limit=${limit}`, {
      token,
    });
    return rank(
      raw.map((entry) => ({
        rank: 0,
        userName: userName(entry.user),
        points: entry.bestScore,
        game: "memory" as const,
      })),
      limit,
    );
  }
}
