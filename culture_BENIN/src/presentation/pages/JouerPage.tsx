import { useEffect, useState } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { QuizGame } from "@/presentation/components/games/QuizGame";
import { ChronologyGame } from "@/presentation/components/games/ChronologyGame";
import { MemoryGame } from "@/presentation/components/games/MemoryGame";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useGameScores } from "@/presentation/hooks/useGameScores";
import type { GameType, LeaderboardEntry } from "@/domain/entities/LeaderboardEntry";
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

export function JouerPage() {
  const { user, openLogin } = useAuth();
  const [activeGame, setActiveGame] = useState<GameType>("quiz");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { scores, recordScore } = useGameScores();

  useEffect(() => {
    let cancelled = false;
    leaderboardRepository.getTop(activeGame, 5).then((result) => {
      if (!cancelled) setLeaderboard(result);
    });
    return () => {
      cancelled = true;
    };
  }, [activeGame]);

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
              <div className="mb-6 flex flex-wrap gap-2">
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

              <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[18px] border border-gray-200 bg-white p-8">
                  {activeGame === "quiz" && (
                    <QuizGame
                      key="quiz"
                      onFinish={(score, total) => recordScore("quiz", (score / total) * 100)}
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
                      key="memory"
                      onFinish={(score, total) => recordScore("memory", (score / total) * 100)}
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
                    <div className="flex flex-col gap-2.5">
                      {GAME_TABS.map((tab) => (
                        <div
                          key={tab.key}
                          className="flex justify-between text-[13.5px]"
                        >
                          <span className="text-gray-500">{tab.label}</span>
                          <span className="font-bold text-culture-green">
                            {scores[tab.key] !== undefined
                              ? `${Math.round(scores[tab.key] ?? 0)}%`
                              : "—"}
                          </span>
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
