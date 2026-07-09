import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { TestimonySection } from "@/presentation/components/testimony/TestimonySection";
import { useFavorites, FAVORITES_STORAGE_KEYS } from "@/presentation/hooks/useFavorites";
import type { City } from "@/domain/entities/City";
import type { Tradition } from "@/domain/entities/Tradition";
import { cityRepository, traditionRepository } from "@/infrastructure/config/repositories";

export function TraditionDetailPage() {
  const { traditionId } = useParams<{ traditionId: string }>();
  const [tradition, setTradition] = useState<Tradition | null | undefined>(undefined);
  const [city, setCity] = useState<City | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites(FAVORITES_STORAGE_KEYS.events);

  useEffect(() => {
    if (!traditionId) return;
    let cancelled = false;
    setTradition(undefined);
    traditionRepository.getById(traditionId).then(async (result) => {
      if (cancelled) return;
      setTradition(result);
      if (result?.cityId) {
        const relatedCity = await cityRepository.getById(result.cityId);
        if (!cancelled) setCity(relatedCity);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [traditionId]);

  if (tradition === undefined) {
    return (
      <MainLayout>
        <div className="flex h-[400px] items-center justify-center text-gray-400">
          Chargement…
        </div>
      </MainLayout>
    );
  }

  if (tradition === null) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <p className="text-[15px] text-gray-500">
            Cette tradition n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/explorer/evenements"
            className="mt-4 inline-block text-[13.5px] font-semibold text-culture-green hover:text-culture-terracotta"
          >
            ← Retour aux traditions
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
          <Link
            to="/explorer/evenements"
            className="mb-6 inline-block text-[12.5px] font-semibold text-gray-500 hover:text-culture-green"
          >
            ← Retour aux traditions
          </Link>

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-culture-terracotta">
            {city?.name}
          </span>
          <h1 className="mt-2 font-display text-[30px] font-semibold leading-tight text-culture-ink sm:text-[36px]">
            {tradition.name}
          </h1>

          <div className="mb-6 mt-5 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => toggleFavorite(tradition.id)}
              className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                favoriteIds.has(tradition.id)
                  ? "border-culture-terracotta text-culture-terracotta"
                  : "border-gray-300 text-culture-ink hover:border-culture-green hover:text-culture-green"
              }`}
            >
              {favoriteIds.has(tradition.id) ? "♥ Favori" : "♡ Ajouter aux favoris"}
            </button>
          </div>

          <p className="text-[15px] leading-relaxed text-gray-600">
            {tradition.description}
          </p>

          {tradition.narrative && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="mb-3 font-display text-[20px] font-medium text-culture-ink">
                Origine
              </h2>
              <p className="text-[14.5px] leading-relaxed text-gray-600">
                {tradition.narrative}
              </p>
            </div>
          )}

          {tradition.testimonies && tradition.testimonies.length > 0 && (
            <div className="mt-10">
              <TestimonySection testimonies={tradition.testimonies} />
            </div>
          )}

          {tradition.gallery && tradition.gallery.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h2 className="mb-4 font-display text-[20px] font-medium text-culture-ink">
                Galerie
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {tradition.gallery.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={tradition.name}
                    className="h-[130px] w-full rounded-xl object-cover sm:h-[150px]"
                  />
                ))}
              </div>
            </div>
          )}

          {city && (
            <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-[#fafaf8] p-5">
              <span className="text-[13.5px] text-gray-500">
                Cette tradition est vivante à <strong className="text-culture-ink">{city.name}</strong>.
              </span>
              <Link
                to={`/explorer/${city.id}`}
                className="whitespace-nowrap rounded-full bg-culture-green px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                Découvrir {city.name} →
              </Link>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
