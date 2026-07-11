import { useEffect, useState } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { QuizGame } from "@/presentation/components/games/QuizGame";
import { ChronologyGame } from "@/presentation/components/games/ChronologyGame";
import { MemoryGame } from "@/presentation/components/games/MemoryGame";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useGameScores } from "@/presentation/hooks/useGameScores";
import type { GameType, LeaderboardEntry } from "@/domain/entities/LeaderboardEntry";
import { DIFFICULTY_LEVELS, type Difficulty } from "@/domain/entities/Difficulty";
import { leaderboardRepository } from "@/infrastructure/config/repositories";

const GAME_TABS: { key: GameType; label: string }[] = [
  { key: "quiz", label: "Quiz historique" },
  { key: "chronology", label: "Chronologie du Danxomè" },
  { key: "memory", label: "Memory culturel" },
];

const GAME_LABELS: Record<GameType, string> = {
  quiz: "Quiz historique",
  chronology: "Chronologie du Danxomè",
  memory: "Memory culturel",
};

// Chronology only has a handful of items in total, not split by level yet.
const GAMES_WITH_LEVELS: GameType[] = ["quiz", "memory"];

export function JouerPage() {
  const { user, token, openLogin } = useAuth();
  const [activeGame, setActiveGame] = useState<GameType>("quiz");
  const [difficulty, setDifficulty] = useState<Difficulty>("facile");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { scores, recordScore, getScore } = useGameScores();
  const hasLevels = GAMES_WITH_LEVELS.includes(activeGame);

  useEffect(() => {
    let cancelled = false;
    leaderboardRepository.getTop(activeGame, 5, token ?? undefined).then((result) => {
      if (!cancelled) setLeaderboard(result);
    });
    return () => {
      cancelled = true;
    };
  }, [activeGame, token]);

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <SectionHeading kicker="Apprendre en jouant" title="Jeux culturels" />

          {!user ? (
            <div className="mt-8 max-w-[560px] rounded-[18px] border border-gray-200 bg-white p-8">
              <p className="font-display text-2xl font-semibold text-culture-ink">
                Connectez-vous pour jouer
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
                La connexion permet de sauvegarder votre progression, vos
                scores et d'apparaître au classement. L'exploration du
                patrimoine reste libre et sans compte.
              </p>
              <button
                type="button"
                onClick={openLogin}
                className="mt-5 rounded-full bg-culture-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                Se connecter
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                {GAME_TABS.map((tab) => {
                  const isActive = tab.key === activeGame;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveGame(tab.key)}
                      className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
                        isActive
                          ? "border-culture-ink bg-culture-ink text-white"
                          : "border-gray-300 bg-white text-culture-ink hover:bg-gray-50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {hasLevels && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                    Niveau
                  </span>
                  {DIFFICULTY_LEVELS.map((level) => {
                    const isActive = level.value === difficulty;
                    return (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setDifficulty(level.value)}
                        className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
                          isActive
                            ? "border-culture-green bg-culture-green text-white"
                            : "border-gray-300 bg-white text-culture-ink hover:bg-gray-50"
                        }`}
                      >
                        {level.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[18px] border border-gray-200 bg-white p-8">
                  {activeGame === "quiz" && (
                    <QuizGame
                      key={`quiz-${difficulty}`}
                      difficulty={difficulty}
                      onFinish={(score, total) =>
                        recordScore("quiz", (score / total) * 100, difficulty)
                      }
                    />
                  )}
                  {activeGame === "chronology" && (
                    <ChronologyGame
                      key="chronology"
                      onFinish={(score, total) => recordScore("chronology", (score / total) * 100)}
                    />
                  )}
                  {activeGame === "memory" && (
                    <MemoryGame
                      key={`memory-${difficulty}`}
                      difficulty={difficulty}
                      onFinish={(score, total) =>
                        recordScore("memory", (score / total) * 100, difficulty)
                      }
                    />
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-[18px] border border-gray-200 bg-[#fafaf8] p-6">
                    <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Classement · {GAME_LABELS[activeGame]}
                    </span>
                    <div className="flex flex-col">
                      {leaderboard.map((entry) => (
                        <div
                          key={entry.rank}
                          className="flex items-center gap-3 border-b border-gray-200 py-2.5 last:border-b-0"
                        >
                          <span className="w-[22px] text-[13px] font-bold text-culture-terracotta">
                            {entry.rank}
                          </span>
                          <span className="flex-1 text-[13.5px] text-culture-ink">
                            {entry.userName}
                          </span>
                          <span className="text-[13px] text-gray-500">
                            {entry.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-gray-200 bg-white p-6">
                    <span className="mb-3.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Vos scores
                    </span>
                    <div className="flex flex-col gap-3">
                      {GAME_TABS.map((tab) => (
                        <div key={tab.key} className="flex items-center justify-between gap-3">
                          <span className="text-[13.5px] text-gray-500">{tab.label}</span>
                          {GAMES_WITH_LEVELS.includes(tab.key) ? (
                            <div className="flex gap-1.5">
                              {DIFFICULTY_LEVELS.map((level) => {
                                const levelScore = getScore(tab.key, level.value);
                                return (
                                  <span
                                    key={level.value}
                                    title={`${level.label} · ${levelScore !== undefined ? `${Math.round(levelScore)}%` : "pas encore joué"}`}
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[10.5px] font-bold ${
                                      levelScore !== undefined
                                        ? "bg-[#eef4ef] text-culture-green"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                                  >
                                    {level.short}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-[13.5px] font-bold text-culture-green">
                              {scores[tab.key] !== undefined
                                ? `${Math.round(scores[tab.key] ?? 0)}%`
                                : "—"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
