import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { TestimonySection } from "@/presentation/components/testimony/TestimonySection";
import { PhotoGallery } from "@/presentation/components/gallery/PhotoGallery";
import { DetailPageSkeleton } from "@/presentation/components/ui/Skeleton";
import { useFavorites, FAVORITES_STORAGE_KEYS } from "@/presentation/hooks/useFavorites";
import { useCityByName, useTradition } from "@/presentation/queries";

export function TraditionDetailPage() {
  const { traditionId } = useParams<{ traditionId: string }>();
  const traditionQuery = useTradition(traditionId);
  const { favoriteIds, toggleFavorite } = useFavorites(FAVORITES_STORAGE_KEYS.traditions);

  const tradition = traditionQuery.data;
  const city = useCityByName(tradition?.cityName);

  if (tradition === undefined) {
    return (
      <MainLayout>
        <DetailPageSkeleton />
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
            to="/explorer/traditions"
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
            to="/explorer/traditions"
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
            {city && (
              <Link
                to={`/explorer/${city.id}`}
                className="rounded-full border border-gray-300 px-5 py-2.5 text-[13px] font-semibold text-culture-ink transition-colors duration-200 hover:border-culture-green hover:text-culture-green"
              >
                Découvrir {city.name}
              </Link>
            )}
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

          <PhotoGallery images={tradition.gallery ?? []} alt={tradition.name} />
        </div>
      </main>
    </MainLayout>
  );
}
