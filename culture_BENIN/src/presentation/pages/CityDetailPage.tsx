import { lazy, Suspense, useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { StoryCard } from "@/presentation/components/ui/StoryCard";
import { SiteCard } from "@/presentation/components/ui/SiteCard";
import { PhotoGallery } from "@/presentation/components/gallery/PhotoGallery";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";
import { DetailPageSkeleton } from "@/presentation/components/ui/Skeleton";
import { useFavorites } from "@/presentation/hooks/useFavorites";

const ImmersiveTourViewer = lazy(() =>
  import("@/presentation/components/immersive/ImmersiveTourViewer").then((m) => ({
    default: m.ImmersiveTourViewer,
  })),
);
import {
  useCity,
  useCulturalEventsByCity,
  useHistoricalFiguresByCity,
  useSitesByCity,
  useStories,
  useTraditionsByCity,
} from "@/presentation/queries";

const OUIDAH_DEMO_TOUR = {
  imageId: "888939035048535",
  title: "Porte du Non-Retour — Ouidah",
  caption: "Photographie sphérique 360° · Mapillary, CC BY-SA · anebophil, 2018",
};

const FEATURED_COUNT = 3;

function NumberedSection({
  index,
  title,
  description,
  action,
  children,
}: {
  index: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
      <div className="font-display text-[22px] font-semibold text-culture-ink">
        <span className="mb-1.5 block font-sans text-[13px] font-semibold text-culture-terracotta">
          {index}
        </span>
        {title}
      </div>
      <div>
        {(description || action) && (
          <div className="mb-5 flex items-end justify-between gap-3">
            {description ? (
              <p className="text-[13px] text-gray-500">{description}</p>
            ) : (
              <span />
            )}
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function SeeAllLink({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="whitespace-nowrap text-[13px] font-semibold text-culture-green hover:text-culture-terracotta"
    >
      Voir tout →
    </Link>
  );
}

function formatEventDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString("fr-FR", { month: "short" }),
  };
}

export function CityDetailPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const cityQuery = useCity(cityId);
  const city = cityQuery.data;

  // Requêtes dépendantes : ne partent qu'une fois la ville trouvée.
  const storiesQuery = useStories();
  const sitesQuery = useSitesByCity(city?.id);
  const eventsQuery = useCulturalEventsByCity(city?.name);
  const traditionsQuery = useTraditionsByCity(city?.name);
  const figuresQuery = useHistoricalFiguresByCity(city?.id);

  const [isTourOpen, setIsTourOpen] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavorites();

  const relatedStories = useMemo(
    () =>
      city && storiesQuery.data
        ? storiesQuery.data
            .filter((story) => story.cityName === city.name)
            .slice(0, FEATURED_COUNT)
        : [],
    [storiesQuery.data, city],
  );
  const citySites = sitesQuery.data ?? [];
  const cityTraditions = traditionsQuery.data ?? [];
  const cityFigures = figuresQuery.data ?? [];

  const sortedEvents = useMemo(
    () => [...(eventsQuery.data ?? [])].sort((a, b) => a.date.localeCompare(b.date)),
    [eventsQuery.data],
  );

  const cityGalleryImages = useMemo(() => {
    const images = [
      ...citySites.flatMap((site) =>
        site.gallery?.length ? site.gallery : site.image ? [site.image] : [],
      ),
      ...cityFigures.flatMap((figure) =>
        figure.gallery?.length ? figure.gallery : figure.portrait ? [figure.portrait] : [],
      ),
      ...cityTraditions.flatMap((tradition) => tradition.gallery ?? []),
      ...sortedEvents.flatMap((event) => event.gallery ?? []),
      ...relatedStories.flatMap((story) => (story.gallery?.length ? story.gallery : [story.image])),
    ];
    return Array.from(new Set(images)).slice(0, 12);
  }, [citySites, cityFigures, cityTraditions, sortedEvents, relatedStories]);

  if (city === undefined) {
    return (
      <MainLayout>
        <DetailPageSkeleton />
      </MainLayout>
    );
  }

  if (city === null) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <p className="text-[15px] text-gray-500">
            Cette ville n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/explorer"
            className="mt-4 inline-block text-[13.5px] font-semibold text-culture-green hover:text-culture-terracotta"
          >
            ← Retour à Explorer
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isFavorite = favoriteIds.has(city.id);
  const hasImmersiveTour = city.id === "ouidah";

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="relative h-[320px] overflow-hidden sm:h-[440px]">
          <ImageWithSkeleton
            src={city.heroImage}
            alt={city.name}
            eager
            fallbackLabel={city.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-8 sm:px-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              {city.region}
            </span>
            <div>
              <h1 className="font-display text-[34px] font-semibold leading-tight text-white sm:text-[48px]">
                {city.name}
              </h1>
              <span className="text-[14px] italic text-white/80 sm:text-[16px]">
                {city.nickname}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2.5">
              {hasImmersiveTour && (
                <button
                  type="button"
                  onClick={() => setIsTourOpen(true)}
                  className="rounded-full bg-white px-5 py-2.5 text-[13.5px] font-semibold text-culture-ink transition-colors duration-200 hover:bg-gray-100"
                >
                  ▶ Démarrer la visite immersive
                </button>
              )}
              <Link
                to={`/carte`}
                className="rounded-full border border-white/50 bg-white/15 px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors duration-200 hover:bg-white/25"
              >
                Voir sur la carte
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-10 sm:px-6 lg:py-16">
          <div className="flex items-center justify-between">
            <Link
              to="/explorer"
              className="text-[12.5px] font-semibold text-gray-500 hover:text-culture-green"
            >
              ← Retour à Explorer
            </Link>
            <button
              type="button"
              onClick={() => toggleFavorite(city.id)}
              className={`rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors duration-200 ${
                isFavorite
                  ? "border-culture-terracotta text-culture-terracotta"
                  : "border-gray-300 text-culture-ink hover:border-culture-green hover:text-culture-green"
              }`}
            >
              {isFavorite ? "♥ Retirer des favoris" : "♡ Ajouter aux favoris"}
            </button>
          </div>

          <NumberedSection index="01" title="Description">
            <p className="font-display text-[17px] leading-relaxed text-culture-ink">
              {city.introduction}
            </p>
          </NumberedSection>

          <NumberedSection index="02" title="Historique">
            <p className="text-[14.5px] leading-relaxed text-gray-600 lg:columns-2 lg:gap-10">
              {city.history}
            </p>
          </NumberedSection>

          {citySites.length > 0 && (
            <NumberedSection
              index="03"
              title="Sites & lieux importants"
              description="Cliquez sur un lieu pour ouvrir sa fiche complète."
              action={<SeeAllLink to={`/explorer/sites?city=${city.id}`} />}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {citySites.slice(0, FEATURED_COUNT).map((site) => (
                  <SiteCard key={site.id} site={site} />
                ))}
              </div>
            </NumberedSection>
          )}

          {cityFigures.length > 0 && (
            <NumberedSection
              index="04"
              title="Personnalités historiques"
              action={<SeeAllLink to={`/explorer/personnalites?city=${city.id}`} />}
            >
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {cityFigures.slice(0, FEATURED_COUNT).map((figure) => (
                  <Link
                    key={figure.id}
                    to={`/explorer/personnalites/${figure.id}`}
                    className="flex items-center gap-3.5 rounded-2xl border border-transparent bg-gray-50 p-4 transition-colors duration-200 hover:border-gray-300 hover:bg-white"
                  >
                    <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-full bg-culture-green font-display text-[17px] font-semibold text-white">
                      {figure.initials}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-[15px] font-semibold text-culture-ink">
                        {figure.name}
                      </span>
                      <span className="text-[12.5px] leading-snug text-gray-500">
                        {figure.role}
                      </span>
                      <span className="mt-0.5 text-[12px] font-semibold text-culture-green">
                        Sa biographie →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </NumberedSection>
          )}

          {relatedStories.length > 0 && (
            <NumberedSection
              index="05"
              title="Récits"
              action={<SeeAllLink to={`/explorer/recits?city=${encodeURIComponent(city.name)}`} />}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </NumberedSection>
          )}

          {cityTraditions.length > 0 && (
            <NumberedSection
              index="06"
              title="Traditions"
              action={<SeeAllLink to={`/explorer/traditions?city=${encodeURIComponent(city.name)}`} />}
            >
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {cityTraditions.slice(0, FEATURED_COUNT).map((tradition) => (
                  <Link
                    key={tradition.id}
                    to={`/explorer/traditions/${tradition.id}`}
                    className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(32,33,36,0.1)]"
                  >
                    <span className="font-display text-[16px] font-semibold text-culture-ink">
                      {tradition.name}
                    </span>
                    <span className="text-[13px] leading-relaxed text-gray-500">
                      {tradition.description}
                    </span>
                  </Link>
                ))}
              </div>
            </NumberedSection>
          )}

          {sortedEvents.length > 0 && (
            <NumberedSection
              index="07"
              title="Événements"
              action={<SeeAllLink to={`/explorer/evenements?city=${encodeURIComponent(city.name)}`} />}
            >
              <div className="flex flex-col gap-3">
                {sortedEvents.slice(0, FEATURED_COUNT).map((event) => {
                  const { day, month } = formatEventDate(event.date);
                  return (
                    <Link
                      key={event.id}
                      to={`/explorer/evenements/${event.id}`}
                      className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-[0_6px_20px_rgba(32,33,36,0.1)]"
                    >
                      <span className="flex w-[64px] flex-none flex-col items-center rounded-xl bg-[#eef4ef] py-2 text-culture-green">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
                          {month}
                        </span>
                        <span className="font-display text-[18px] font-semibold leading-none">
                          {day}
                        </span>
                      </span>
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="font-display text-[17px] font-semibold text-culture-ink">
                          {event.name}
                        </span>
                        <span className="text-[13px] leading-relaxed text-gray-500">
                          {event.description}
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-[12.5px] font-semibold text-culture-green">
                        Découvrir →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </NumberedSection>
          )}

          <PhotoGallery images={cityGalleryImages} alt={city.name} />
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
    </MainLayout>
  );
}
