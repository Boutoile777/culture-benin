import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { TestimonySection } from "@/presentation/components/testimony/TestimonySection";
import { useFavorites, FAVORITES_STORAGE_KEYS } from "@/presentation/hooks/useFavorites";
import type { City } from "@/domain/entities/City";
import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";
import { cityRepository, historicalFigureRepository } from "@/infrastructure/config/repositories";

export function HistoricalFigureDetailPage() {
  const { figureId } = useParams<{ figureId: string }>();
  const [figure, setFigure] = useState<HistoricalFigure | null | undefined>(undefined);
  const [city, setCity] = useState<City | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites(FAVORITES_STORAGE_KEYS.figures);

  useEffect(() => {
    if (!figureId) return;
    let cancelled = false;
    setFigure(undefined);
    historicalFigureRepository.getById(figureId).then(async (result) => {
      if (cancelled) return;
      setFigure(result);
      if (result?.cityId) {
        const relatedCity = await cityRepository.getById(result.cityId);
        if (!cancelled) setCity(relatedCity);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [figureId]);

  if (figure === undefined) {
    return (
      <MainLayout>
        <div className="flex h-[400px] items-center justify-center text-gray-400">
          Chargement…
        </div>
      </MainLayout>
    );
  }

  if (figure === null) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <p className="text-[15px] text-gray-500">
            Cette personnalité n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/explorer/personnalites"
            className="mt-4 inline-block text-[13.5px] font-semibold text-culture-green hover:text-culture-terracotta"
          >
            ← Retour aux personnalités
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isFavorite = favoriteIds.has(figure.id);
  const galleryImages = figure.gallery ?? [];

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
          <Link
            to="/explorer/personnalites"
            className="mb-6 inline-block text-[12.5px] font-semibold text-gray-500 hover:text-culture-green"
          >
            ← Retour aux personnalités
          </Link>

          <div className="flex items-center gap-5">
            {figure.portrait ? (
              <img
                src={figure.portrait}
                alt={figure.name}
                className="h-20 w-20 flex-none rounded-full object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-culture-green font-display text-xl font-semibold text-white">
                {figure.initials}
              </span>
            )}
            <div>
              <h1 className="font-display text-[28px] font-semibold leading-tight text-culture-ink sm:text-[32px]">
                {figure.name}
              </h1>
              <span className="text-[13.5px] font-semibold uppercase tracking-[0.08em] text-culture-terracotta">
                {figure.role}
              </span>
            </div>
          </div>

          <div className="mb-8 mt-5 flex flex-wrap gap-2.5">
            {city && (
              <Link
                to={`/explorer/${city.id}`}
                className="rounded-full border border-gray-300 px-5 py-2.5 text-[13px] font-semibold text-culture-ink transition-colors duration-200 hover:border-culture-green hover:text-culture-green"
              >
                Découvrir {city.name}
              </Link>
            )}
            <button
              type="button"
              onClick={() => toggleFavorite(figure.id)}
              className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                isFavorite
                  ? "border-culture-terracotta text-culture-terracotta"
                  : "border-gray-300 text-culture-ink hover:border-culture-green hover:text-culture-green"
              }`}
            >
              {isFavorite ? "♥ Favori" : "♡ Ajouter aux favoris"}
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {figure.biography.map((paragraph, index) => (
              <div key={index} className="flex flex-col gap-6">
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-600">
                  {paragraph}
                </p>
                {galleryImages[index] && (
                  <img
                    src={galleryImages[index]}
                    alt={figure.name}
                    className="h-[220px] w-full rounded-2xl object-cover sm:h-[280px]"
                  />
                )}
              </div>
            ))}
          </div>

          {figure.testimonies && figure.testimonies.length > 0 && (
            <div className="mt-10">
              <TestimonySection testimonies={figure.testimonies} />
            </div>
          )}

          {city && (
            <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-[#fafaf8] p-5">
              <span className="text-[13.5px] text-gray-500">
                Cette figure est liée à l'histoire de <strong className="text-culture-ink">{city.name}</strong>.
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
