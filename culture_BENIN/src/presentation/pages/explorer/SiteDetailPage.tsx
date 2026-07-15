import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { TestimonySection } from "@/presentation/components/testimony/TestimonySection";
import { PhotoGallery } from "@/presentation/components/gallery/PhotoGallery";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";
import { DetailPageSkeleton } from "@/presentation/components/ui/Skeleton";
import { useFavorites, FAVORITES_STORAGE_KEYS } from "@/presentation/hooks/useFavorites";
import type { City } from "@/domain/entities/City";
import type { Site } from "@/domain/entities/Site";
import { cityRepository, siteRepository } from "@/infrastructure/config/repositories";

const ImmersiveTourViewer = lazy(() =>
  import("@/presentation/components/immersive/ImmersiveTourViewer").then((m) => ({
    default: m.ImmersiveTourViewer,
  })),
);
const Immersive3DViewer = lazy(() =>
  import("@/presentation/components/immersive/Immersive3DViewer").then((m) => ({
    default: m.Immersive3DViewer,
  })),
);

const OUIDAH_DEMO_TOUR = {
  imageId: "888939035048535",
  title: "Porte du Non-Retour — Ouidah",
  caption: "Photographie sphérique 360° · Mapillary, CC BY-SA · anebophil, 2018",
};

const ABOMEY_DEMO_3D_TOUR = {
  modelUrl: "/models/ancient_shrine.glb",
  title: "Palais royaux d'Abomey",
  caption: "Modélisation 3D — reconstitution de démonstration",
};

export function SiteDetailPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const [site, setSite] = useState<Site | null | undefined>(undefined);
  const [city, setCity] = useState<City | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [is3DTourOpen, setIs3DTourOpen] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavorites(FAVORITES_STORAGE_KEYS.sites);

  useEffect(() => {
    if (!siteId) return;
    let cancelled = false;
    setSite(undefined);
    siteRepository.getById(siteId).then(async (result) => {
      if (cancelled) return;
      setSite(result);
      if (result?.cityId) {
        const relatedCity = await cityRepository.getById(result.cityId);
        if (!cancelled) setCity(relatedCity);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [siteId]);

  if (site === undefined) {
    return (
      <MainLayout>
        <DetailPageSkeleton />
      </MainLayout>
    );
  }

  if (site === null) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <p className="text-[15px] text-gray-500">
            Ce site n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/explorer/sites"
            className="mt-4 inline-block text-[13.5px] font-semibold text-culture-green hover:text-culture-terracotta"
          >
            ← Retour aux sites historiques
          </Link>
        </div>
      </MainLayout>
    );
  }

  const hasImmersiveTour = site.name === "La Porte du Non-Retour";
  const has3DTour = site.name === "Palais royal d'Abomey";
  const isFavorite = favoriteIds.has(site.id);

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        {site.image ? (
          <div className="relative h-[280px] overflow-hidden sm:h-[380px]">
            <ImageWithSkeleton
              src={site.image}
              alt={site.name}
              eager
              fallbackLabel={site.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-3xl flex-col gap-2 px-4 pb-8 sm:px-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                {site.category}
                {city ? ` · ${city.name}` : ""}
              </span>
              <h1 className="font-display text-[30px] font-semibold text-white sm:text-[38px]">
                {site.name}
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex h-[220px] flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-100 to-[#e6e3da] sm:h-[280px]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              {site.category}
              {city ? ` · ${city.name}` : ""}
            </span>
            <h1 className="font-display text-[28px] font-semibold text-culture-ink sm:text-[34px]">
              {site.name}
            </h1>
            <span className="text-xs text-gray-400">photo à venir</span>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
          <Link
            to="/explorer/sites"
            className="mb-6 inline-block text-[12.5px] font-semibold text-gray-500 hover:text-culture-green"
          >
            ← Retour aux sites historiques
          </Link>

          <div className="mb-8 flex flex-wrap gap-2.5">
            {hasImmersiveTour && (
              <button
                type="button"
                onClick={() => setIsTourOpen(true)}
                className="rounded-full bg-culture-green px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                ▶ Visiter
              </button>
            )}
            {has3DTour && (
              <button
                type="button"
                onClick={() => setIs3DTourOpen(true)}
                className="rounded-full bg-culture-green px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                ⛬ Visite 3D
              </button>
            )}
            <Link
              to={`/carte?point=${site.id}`}
              className="rounded-full border border-gray-300 px-5 py-2.5 text-[13px] font-semibold text-culture-ink transition-colors duration-200 hover:border-culture-green hover:text-culture-green"
            >
              Voir sur la carte
            </Link>
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
              onClick={() => toggleFavorite(site.id)}
              className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                isFavorite
                  ? "border-culture-terracotta text-culture-terracotta"
                  : "border-gray-300 text-culture-ink hover:border-culture-green hover:text-culture-green"
              }`}
            >
              {isFavorite ? "♥ Favori" : "♡ Ajouter aux favoris"}
            </button>
          </div>

          <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
            {site.description}
          </p>
          {site.narrative && (
            <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-gray-600">
              {site.narrative}
            </p>
          )}

          {site.testimonies && site.testimonies.length > 0 && (
            <div className="mt-10">
              <TestimonySection testimonies={site.testimonies} />
            </div>
          )}

          <PhotoGallery images={site.gallery ?? []} alt={site.name} />
        </div>
      </main>

      {isTourOpen && (
        <Suspense fallback={null}>
          <ImmersiveTourViewer
            imageId={OUIDAH_DEMO_TOUR.imageId}
            title={OUIDAH_DEMO_TOUR.title}
            caption={OUIDAH_DEMO_TOUR.caption}
            onClose={() => setIsTourOpen(false)}
          />
        </Suspense>
      )}

      {is3DTourOpen && (
        <Suspense fallback={null}>
          <Immersive3DViewer
            modelUrl={ABOMEY_DEMO_3D_TOUR.modelUrl}
            title={ABOMEY_DEMO_3D_TOUR.title}
            caption={ABOMEY_DEMO_3D_TOUR.caption}
            onClose={() => setIs3DTourOpen(false)}
          />
        </Suspense>
      )}
    </MainLayout>
  );
}
