import { Link } from "react-router-dom";
import type { City } from "@/domain/entities/City";

interface CityRowProps {
  city: City;
  isFavorite: boolean;
  onToggleFavorite: (cityId: string) => void;
}

export function CityRow({ city, isFavorite, onToggleFavorite }: CityRowProps) {
  return (
    <Link
      to={`/explorer/${city.id}`}
      className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(32,33,36,0.1)]"
    >
      <img
        src={city.cardImage}
        alt={city.name}
        className="h-16 w-16 flex-none rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-culture-terracotta">
          {city.theme} · {city.region}
        </span>
        <span className="font-display text-[17px] font-semibold text-culture-ink">
          {city.name}
        </span>
        <span className="truncate text-[12.5px] text-gray-500">{city.tagline}</span>
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          onToggleFavorite(city.id);
        }}
        title="Ajouter aux favoris"
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-base transition-transform duration-200 hover:scale-110"
        style={{ color: isFavorite ? "#B4622D" : "#5f6368" }}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </Link>
  );
}
