import { useEffect, useState } from "react";
import type { Difficulty } from "@/domain/entities/Difficulty";
import type { MemoryItem } from "@/domain/entities/MemoryItem";
import { memoryRepository } from "@/infrastructure/config/repositories";
import { useAuth } from "@/presentation/contexts/AuthContext";

interface MemoryGameProps {
  difficulty: Difficulty;
  onFinish: (score: number, total: number) => void;
}

interface MemoryCard {
  uid: string;
  pairId: string;
  type: "image" | "name";
  item: MemoryItem;
}

function buildShuffledDeck(items: MemoryItem[]): MemoryCard[] {
  const deck: MemoryCard[] = items.flatMap((item) => [
    { uid: `${item.id}-image`, pairId: item.id, type: "image", item },
    { uid: `${item.id}-name`, pairId: item.id, type: "name", item },
  ]);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function MemoryGame({ difficulty, onFinish }: MemoryGameProps) {
  const { token } = useAuth();
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [flips, setFlips] = useState(0);
  const [isResolving, setIsResolving] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    memoryRepository.getItems(token, difficulty).then((result) => {
      if (!cancelled) {
        setItems(result);
        setCards(buildShuffledDeck(result));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [token, difficulty]);

  const totalPairs = items.length;
  const isComplete = totalPairs > 0 && matchedPairIds.size === totalPairs;

  useEffect(() => {
    if (isComplete && !hasFinished) {
      const score = Math.min(100, Math.round(((totalPairs * 2) / flips) * 100));
      setHasFinished(true);
      onFinish(score, 100);
    }
  }, [isComplete, hasFinished, flips, totalPairs, onFinish]);

  if (items.length === 0) {
    return <p className="text-sm text-gray-400">Chargement…</p>;
  }

  const handleRestart = () => {
    setCards(buildShuffledDeck(items));
    setFlippedIndices([]);
    setMatchedPairIds(new Set());
    setFlips(0);
    setIsResolving(false);
    setHasFinished(false);
  };

  if (isComplete) {
    const score = Math.min(100, Math.round(((totalPairs * 2) / flips) * 100));
    return (
      <div className="flex flex-col items-center gap-2.5 py-5 text-center">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-culture-terracotta">
          Memory terminé
        </span>
        <span className="font-display text-[54px] font-semibold leading-none text-culture-green">
          {score}%
        </span>
        <span className="max-w-[360px] text-[14.5px] leading-relaxed text-gray-500">
          Terminé en {flips} coups pour {totalPairs} paires.
        </span>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-2 rounded-full border border-gray-300 px-6 py-2.5 text-[13.5px] font-semibold text-culture-green transition-colors duration-200 hover:bg-gray-50"
        >
          Rejouer
        </button>
      </div>
    );
  }

  const handleCardClick = (index: number) => {
    if (isResolving) return;
    if (flippedIndices.includes(index)) return;
    if (matchedPairIds.has(cards[index].pairId)) return;

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setFlips((current) => current + 1);
      setIsResolving(true);
      const [firstIndex, secondIndex] = nextFlipped;
      const isMatch = cards[firstIndex].pairId === cards[secondIndex].pairId;

      window.setTimeout(
        () => {
          if (isMatch) {
            setMatchedPairIds((current) => new Set(current).add(cards[firstIndex].pairId));
          }
          setFlippedIndices([]);
          setIsResolving(false);
        },
        isMatch ? 500 : 900,
      );
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-culture-terracotta">
          Memory culturel
        </span>
        <span className="text-[13px] text-gray-500">
          {matchedPairIds.size} / {totalPairs} paires · {flips} coups
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index) || matchedPairIds.has(card.pairId);
          const isMatched = matchedPairIds.has(card.pairId);

          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => handleCardClick(index)}
              disabled={isFlipped}
              className={`flex h-[100px] items-center justify-center overflow-hidden rounded-xl border-[1.5px] p-1.5 text-center transition-all duration-200 sm:h-[120px] ${
                isMatched
                  ? "border-culture-green bg-[#eef4ef]"
                  : isFlipped
                    ? "border-culture-ink bg-white"
                    : "border-gray-300 bg-culture-green hover:bg-culture-green-dark"
              }`}
            >
              {isFlipped ? (
                card.type === "image" ? (
                  <img
                    src={card.item.image}
                    alt={card.item.name}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-[12.5px] font-semibold leading-tight text-culture-ink">
                    {card.item.name}
                  </span>
                )
              ) : (
                <span className="text-lg text-white/70">?</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
