import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { TestimonySection } from "@/presentation/components/testimony/TestimonySection";
import { GalleryLightbox } from "@/presentation/components/gallery/GalleryLightbox";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";
import { DetailPageSkeleton } from "@/presentation/components/ui/Skeleton";
import { useFavorites, FAVORITES_STORAGE_KEYS } from "@/presentation/hooks/useFavorites";
import { useCity, useHistoricalFigure } from "@/presentation/queries";

export function HistoricalFigureDetailPage() {
  const { figureId } = useParams<{ figureId: string }>();
  const figureQuery = useHistoricalFigure(figureId);
  const cityQuery = useCity(figureQuery.data?.cityId);
  const [openGalleryIndex, setOpenGalleryIndex] = useState<number | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites(FAVORITES_STORAGE_KEYS.figures);

  const figure = figureQuery.data;
  const city = cityQuery.data ?? null;

  if (figure === undefined) {
    return (
      <MainLayout>
        <DetailPageSkeleton />
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
              <ImageWithSkeleton
                src={figure.portrait}
                alt={figure.name}
                eager
                fallbackLabel={figure.initials}
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
                  <button
                    type="button"
                    onClick={() => setOpenGalleryIndex(index)}
                    className="block overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-culture-green"
                  >
                    <ImageWithSkeleton
                      src={galleryImages[index]}
                      alt={figure.name}
                      fallbackLabel={figure.name}
                      className="h-[220px] w-full object-cover transition-transform duration-200 hover:scale-105 sm:h-[280px]"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>

          {figure.testimonies && figure.testimonies.length > 0 && (
            <div className="mt-10">
              <TestimonySection testimonies={figure.testimonies} />
            </div>
          )}
        </div>
      </main>

      {openGalleryIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          initialIndex={openGalleryIndex}
          alt={figure.name}
          onClose={() => setOpenGalleryIndex(null)}
        />
      )}
    </MainLayout>
  );
}
