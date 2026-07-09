export type GameType = "quiz" | "chronology" | "memory";

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  points: number;
  game: GameType;
}
