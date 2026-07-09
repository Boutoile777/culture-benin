import type { GameType, LeaderboardEntry } from "@/domain/entities/LeaderboardEntry";
import type { LeaderboardRepository } from "@/domain/repositories/LeaderboardRepository";
import { LEADERBOARD_MOCK } from "@/data/datasources/local/leaderboard.mock";

export class LeaderboardRepositoryImpl implements LeaderboardRepository {
  async getTop(game: GameType, limit: number): Promise<LeaderboardEntry[]> {
    return LEADERBOARD_MOCK.filter((entry) => entry.game === game)
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
  }
}
