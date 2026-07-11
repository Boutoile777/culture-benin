import type { GameType, LeaderboardEntry } from "@/domain/entities/LeaderboardEntry";

export interface LeaderboardRepository {
  getTop(game: GameType, limit: number, token?: string): Promise<LeaderboardEntry[]>;
}
