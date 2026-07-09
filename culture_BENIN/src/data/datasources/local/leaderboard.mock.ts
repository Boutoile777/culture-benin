import type { GameType, LeaderboardEntry } from "@/domain/entities/LeaderboardEntry";

const PLAYER_NAMES = [
  "Aïcha D.",
  "Kokou A.",
  "Fatima B.",
  "Yèkinni S.",
  "Chantal H.",
  "Rachidi T.",
];

function buildEntries(game: GameType, basePoints: number): LeaderboardEntry[] {
  return PLAYER_NAMES.map((userName, index) => ({
    rank: index + 1,
    userName,
    points: basePoints - index * 8,
    game,
  }));
}

export const LEADERBOARD_MOCK: LeaderboardEntry[] = [
  ...buildEntries("quiz", 96),
  ...buildEntries("chronology", 90),
  ...buildEntries("memory", 94),
];
