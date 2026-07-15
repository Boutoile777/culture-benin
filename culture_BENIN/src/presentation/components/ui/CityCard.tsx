import { Link } from "react-router-dom";
import type { City } from "@/domain/entities/City";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";

interface CityCardProps {
  city: City;
  isFavorite: boolean;
  onToggleFavorite: (cityId: string) => void;
}

export function CityCard({ city, isFavorite, onToggleFavorite }: CityCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]">
      <div className="relative overflow-hidden">
        <ImageWithSkeleton
          src={city.cardImage}
          alt={city.name}
          fallbackLabel={`photo à venir — ${city.name}`}
          className="h-[210px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
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
        <Link
          to={`/explorer/${city.id}`}
          className="mt-1.5 self-start text-[12.5px] font-semibold text-culture-green transition-colors hover:text-culture-terracotta"
        >
          Voir plus →
        </Link>
      </div>
    </div>
  );
}
