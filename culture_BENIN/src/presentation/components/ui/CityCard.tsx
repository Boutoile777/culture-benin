import { useState } from "react";
import type { City } from "@/domain/entities/City";

interface CityCardProps {
  city: City;
  isFavorite: boolean;
  onToggleFavorite: (cityId: string) => void;
}

export function CityCard({ city, isFavorite, onToggleFavorite }: CityCardProps) {
  const [imageErrored, setImageErrored] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]">
      <div className="relative overflow-hidden">
        {imageErrored ? (
          <div className="flex h-[210px] items-center justify-center bg-gradient-to-br from-gray-100 to-[#e6e3da] text-xs text-gray-400">
            photo à venir — {city.name}
          </div>
        ) : (
          <img
            src={city.cardImage}
            alt={city.name}
            onError={() => setImageErrored(true)}
            className="h-[210px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <button
          type="button"
          onClick={() => onToggleFavorite(city.id)}
          title="Ajouter aux favoris"
          className="absolute right-3 top-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/95 text-base transition-transform duration-200 hover:scale-110"
          style={{ color: isFavorite ? "#B4622D" : "#5f6368" }}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-[18px]">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gray-500">
          {city.region}
        </span>
        <span className="font-display text-[22px] font-semibold text-culture-ink">
          {city.name}
        </span>
        <span className="text-[13px] leading-relaxed text-gray-500">
          {city.tagline}
        </span>
        {expanded && (
          <p className="mt-1 border-t border-gray-100 pt-2.5 text-[13px] leading-relaxed text-gray-500">
            {city.introduction}
          </p>
        )}
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-1.5 self-start text-[12.5px] font-semibold text-culture-green transition-colors hover:text-culture-terracotta"
        >
          {expanded ? "Voir moins ↑" : "Voir plus ↓"}
        </button>
      </div>
    </div>
  );
}
