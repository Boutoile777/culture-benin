import { useEffect, useState } from "react";
import type { ChronologyItem } from "@/domain/entities/ChronologyItem";
import { chronologyRepository } from "@/infrastructure/config/repositories";

interface ChronologyGameProps {
  onFinish: (score: number, total: number) => void;
}

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function ChronologyGame({ onFinish }: ChronologyGameProps) {
  const [items, setItems] = useState<ChronologyItem[]>([]);
  const [order, setOrder] = useState<ChronologyItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let cancelled = false;
    chronologyRepository.getItems().then((result) => {
      if (!cancelled) {
        setItems(result);
        setOrder(shuffle(result));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) {
    return <p className="text-sm text-gray-400">Chargement…</p>;
  }

  const correctOrder = [...items].sort((a, b) => a.year - b.year);

  const moveItem = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= order.length) return;
    setOrder((current) => {
      const next = [...current];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const handleSubmit = () => {
    const correctCount = order.filter((item, index) => item.id === correctOrder[index].id).length;
    setScore(correctCount);
    setIsSubmitted(true);
    onFinish(correctCount, order.length);
  };

  const handleRestart = () => {
    setOrder(shuffle(items));
    setIsSubmitted(false);
    setScore(0);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-2.5 py-5 text-center">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-culture-terracotta">
          Chronologie terminée
        </span>
        <span className="font-display text-[54px] font-semibold leading-none text-culture-green">
          {score}/{order.length}
        </span>
        <span className="max-w-[360px] text-[14.5px] leading-relaxed text-gray-500">
          {score === order.length
            ? "Ordre parfait ! Vous maîtrisez la chronologie du Danxomè."
            : "Consultez l'ordre correct ci-dessous et rejouez pour vous améliorer."}
        </span>

        <div className="mt-4 flex w-full flex-col gap-2 text-left">
          {order.map((item, index) => {
            const isCorrect = item.id === correctOrder[index].id;
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between gap-3 rounded-xl border-[1.5px] px-4 py-3 ${
                  isCorrect
                    ? "border-culture-green bg-[#eef4ef]"
                    : "border-culture-terracotta bg-[#fbeae1]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-5 text-[13px] font-bold text-gray-400">{index + 1}</span>
                  <span className="text-[14px] font-semibold text-culture-ink">{item.label}</span>
                  <span className="text-[12px] text-gray-500">{item.role}</span>
                </span>
                <span className="text-[13px] font-semibold text-culture-ink">{item.year}</span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="mt-4 rounded-full border border-gray-300 px-6 py-2.5 text-[13.5px] font-semibold text-culture-green transition-colors duration-200 hover:bg-gray-50"
        >
          Rejouer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-culture-terracotta">
          Chronologie du Danxomè
        </span>
      </div>
      <p className="mb-6 font-display text-[20px] font-medium leading-snug text-culture-ink">
        Remettez ces souverains dans l'ordre chronologique de leur règne, du
        plus ancien au plus récent.
      </p>

      <div className="flex flex-col gap-2.5">
        {order.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl border-[1.5px] border-gray-300 bg-white px-4 py-3.5"
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-[13px] font-bold text-gray-400">{index + 1}</span>
              <span className="flex flex-col">
                <span className="text-[14.5px] font-semibold text-culture-ink">
                  {item.label}
                </span>
                <span className="text-[12px] text-gray-500">{item.role}</span>
              </span>
            </span>
            <span className="flex gap-1.5">
              <button
                type="button"
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                aria-label="Monter"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-culture-ink transition-colors hover:bg-gray-50 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === order.length - 1}
                aria-label="Descendre"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-culture-ink transition-colors hover:bg-gray-50 disabled:opacity-30"
              >
                ↓
              </button>
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 rounded-full bg-culture-green px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
      >
        Valider l'ordre
      </button>
    </div>
  );
}
