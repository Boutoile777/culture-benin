import { Link } from "react-router-dom";
import type { City } from "@/domain/entities/City";

interface CityFeatureTileProps {
  city: City;
  isFavorite: boolean;
  onToggleFavorite: (cityId: string) => void;
}

export function CityFeatureTile({ city, isFavorite, onToggleFavorite }: CityFeatureTileProps) {
  return (
    <Link
      to={`/explorer/${city.id}`}
      className="group relative flex h-[380px] w-[280px] flex-none flex-col justify-end overflow-hidden rounded-[22px] sm:w-[300px]"
    >
      <img
        src={city.heroImage}
        alt={city.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          onToggleFavorite(city.id);
        }}
        title="Ajouter aux favoris"
        className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-base transition-transform duration-200 hover:scale-110"
        style={{ color: isFavorite ? "#B4622D" : "#5f6368" }}
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      <div className="relative flex flex-col gap-1.5 p-5 text-white">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/75">
          {city.region}
        </span>
        <span className="font-display text-[24px] font-semibold leading-tight">
          {city.name}
        </span>
        <span className="text-[13px] leading-relaxed text-white/85">
          {city.tagline}
        </span>
      </div>
    </Link>
  );
}
