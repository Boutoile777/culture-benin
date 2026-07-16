import { CityCard } from "@/presentation/components/ui/CityCard";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { useCities } from "@/presentation/queries";

export function FavoritesPage() {
  const { data: cities } = useCities();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const favoriteCities = (cities ?? []).filter((city) => favoriteIds.has(city.id));

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[13.5px] leading-relaxed text-gray-500">
        Les villes que vous mettez en favori depuis « Explorer » ou
        l'accueil apparaissent ici, sauvegardées sur cet appareil.
      </p>

      {favoriteCities.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-gray-300 p-8 text-center text-[13.5px] leading-relaxed text-gray-500">
          Vous n'avez pas encore de ville favorite. Ajoutez-en depuis la page
          d'accueil ou « Explorer » en cliquant sur le cœur d'une carte ville.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {favoriteCities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              isFavorite
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
