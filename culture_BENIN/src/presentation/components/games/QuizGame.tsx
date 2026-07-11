import { useEffect, useState } from "react";
import type { Difficulty } from "@/domain/entities/Difficulty";
import type { QuizQuestion } from "@/domain/entities/QuizQuestion";
import { quizRepository } from "@/infrastructure/config/repositories";
import { useAuth } from "@/presentation/contexts/AuthContext";

interface QuizGameProps {
  difficulty: Difficulty;
  onFinish: (score: number, total: number) => void;
}

export function QuizGame({ difficulty, onFinish }: QuizGameProps) {
  const { token } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    quizRepository.getQuestions(token, difficulty).then((result) => {
      if (!cancelled) setQuestions(result);
    });
    return () => {
      cancelled = true;
    };
  }, [token, difficulty]);

  if (questions.length === 0) {
    return <p className="text-sm text-gray-400">Chargement du quiz…</p>;
  }

  if (isDone) {
    const verdict =
      score === questions.length
        ? "Score parfait ! Vous connaissez le Bénin sur le bout des doigts."
        : score >= questions.length / 2
          ? "Belle performance — encore quelques récits à approfondir."
          : "Rejouez pour mémoriser ces pans d'histoire du Bénin.";

    return (
      <div className="flex flex-col items-center gap-2.5 py-5 text-center">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-culture-terracotta">
          Quiz terminé
        </span>
        <span className="font-display text-[54px] font-semibold leading-none text-culture-green">
          {score}/{questions.length}
        </span>
        <span className="max-w-[360px] text-[14.5px] leading-relaxed text-gray-500">
          {verdict}
        </span>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setScore(0);
            setPickedId(null);
            setIsDone(false);
          }}
          className="mt-2 rounded-full border border-gray-300 px-6 py-2.5 text-[13.5px] font-semibold text-culture-green transition-colors duration-200 hover:bg-gray-50"
        >
          Rejouer
        </button>
      </div>
    );
  }

  const question = questions[index];

  const handlePick = (optionId: string) => {
    if (pickedId) return;
    setPickedId(optionId);
    const option = question.options.find((o) => o.id === optionId);
    if (option?.isCorrect) setScore((current) => current + 1);
  };

  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex((current) => current + 1);
      setPickedId(null);
    } else {
      setIsDone(true);
      onFinish(score, questions.length);
    }
  };

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-culture-terracotta">
          Quiz historique
        </span>
        <span className="text-[13px] text-gray-500">
          {index + 1} / {questions.length}
        </span>
      </div>
      <div className="mb-6 h-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-culture-green transition-all duration-300"
          style={{ width: `${((index + (pickedId ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <p className="mb-6 font-display text-[24px] font-medium leading-snug text-culture-ink">
        {question.question}
      </p>

      <div className="flex flex-col gap-2.5">
        {question.options.map((option) => {
          const isPicked = option.id === pickedId;
          const showResult = Boolean(pickedId);
          const isCorrectOption = option.isCorrect;

          let stateClasses = "border-gray-300 bg-white text-culture-ink hover:bg-gray-50";
          if (showResult && isCorrectOption) {
            stateClasses = "border-culture-green bg-[#eef4ef] text-culture-green";
          } else if (showResult && isPicked && !isCorrectOption) {
            stateClasses = "border-culture-terracotta bg-[#fbeae1] text-culture-terracotta";
          } else if (showResult) {
            stateClasses = "border-gray-200 bg-white text-gray-400";
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handlePick(option.id)}
              disabled={showResult}
              className={`flex items-center justify-between gap-3 rounded-xl border-[1.5px] px-4 py-3.5 text-left text-[14.5px] font-medium transition-colors duration-200 ${stateClasses}`}
            >
              <span>{option.label}</span>
              {showResult && isCorrectOption && <span className="font-bold">✓</span>}
              {showResult && isPicked && !isCorrectOption && <span className="font-bold">✗</span>}
            </button>
          );
        })}
      </div>

      {pickedId && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-display text-[13.5px] italic leading-relaxed text-gray-600">
            {question.feedback}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="whitespace-nowrap rounded-full bg-culture-green px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
          >
            {index + 1 < questions.length ? "Suivant" : "Voir mon score"}
          </button>
        </div>
      )}
    </div>
  );
}
