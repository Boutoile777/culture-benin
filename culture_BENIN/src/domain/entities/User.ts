import type { GameType } from "@/domain/entities/LeaderboardEntry";

export type GameStats = Record<GameType, number>;

export interface User {
  id: string;
  name: string;
  initials: string;
  favoriteCityIds: string[];
  visitedCityIds: string[];
  gameStats: GameStats;
}
