export type GameType = "quiz" | "riddles" | "placeGuess" | "trueFalse";

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  points: number;
  game: GameType;
}
