import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { StoryCard } from "@/presentation/components/ui/StoryCard";
import { SiteCard } from "@/presentation/components/ui/SiteCard";
import { ImmersiveTourViewer } from "@/presentation/components/immersive/ImmersiveTourViewer";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import type { City } from "@/domain/entities/City";
import type { Story } from "@/domain/entities/Story";
import type { Site } from "@/domain/entities/Site";
import type { CulturalEvent } from "@/domain/entities/CulturalEvent";
import type { Tradition } from "@/domain/entities/Tradition";
import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";
import {
  cityRepository,
  storyRepository,
  siteRepository,
  culturalEventRepository,
  traditionRepository,
  historicalFigureRepository,
} from "@/infrastructure/config/repositories";

const OUIDAH_DEMO_TOUR = {
  imageId: "888939035048535",
  title: "Porte du Non-Retour — Ouidah",
  caption: "Photographie sphérique 360° · Mapillary, CC BY-SA · anebophil, 2018",
};

function NumberedSection({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description?: string;
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
        {description && (
          <p className="mb-5 text-[13px] text-gray-500">{description}</p>
        )}
        {children}
      </div>
    </section>
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
  const [city, setCity] = useState<City | null | undefined>(undefined);
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);
  const [citySites, setCitySites] = useState<Site[]>([]);
  const [cityEvents, setCityEvents] = useState<CulturalEvent[]>([]);
  const [cityTraditions, setCityTraditions] = useState<Tradition[]>([]);
  const [cityFigures, setCityFigures] = useState<HistoricalFigure[]>([]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!cityId) return;
    let cancelled = false;
    setCity(undefined);
    Promise.all([
      cityRepository.getById(cityId),
      storyRepository.getAll(),
      siteRepository.getByCityId(cityId),
      culturalEventRepository.getByCityId(cityId),
      traditionRepository.getByCityId(cityId),
      historicalFigureRepository.getByCityId(cityId),
    ]).then(([cityResult, stories, sites, events, traditions, figures]) => {
      if (!cancelled) {
        setCity(cityResult);
        setRelatedStories(stories.filter((story) => story.cityId === cityId));
        setCitySites(sites);
        setCityEvents(events);
        setCityTraditions(traditions);
        setCityFigures(figures);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [cityId]);

  const sortedEvents = useMemo(
    () => [...cityEvents].sort((a, b) => a.date.localeCompare(b.date)),
    [cityEvents],
  );

  if (city === undefined) {
    return (
      <MainLayout>
        <div className="flex h-[400px] items-center justify-center text-gray-400">
          Chargement…
        </div>
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
          <img
            src={city.heroImage}
            alt={city.name}
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

          <NumberedSection index="01" title="Histoire & origine">
            <p className="mb-4 font-display text-[17px] leading-relaxed text-culture-ink">
              {city.introduction}
            </p>
            <p className="text-[14.5px] leading-relaxed text-gray-600 lg:columns-2 lg:gap-10">
              {city.history}
            </p>
          </NumberedSection>

          {citySites.length > 0 && (
            <NumberedSection
              index="02"
              title="Sites & lieux importants"
              description="Cliquez sur un lieu pour ouvrir sa fiche complète."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {citySites.map((site) => (
                  <SiteCard key={site.id} site={site} />
                ))}
              </div>
            </NumberedSection>
          )}

          {cityFigures.length > 0 && (
            <NumberedSection index="03" title="Personnalités historiques">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {cityFigures.map((figure) => (
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

          {(sortedEvents.length > 0 || cityTraditions.length > 0) && (
            <NumberedSection index="04" title="Événements & traditions">
              {cityTraditions.length > 0 && (
                <div className="mb-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {cityTraditions.map((tradition) => (
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
              )}
              <div className="flex flex-col gap-3">
                {sortedEvents.map((event) => {
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

          {relatedStories.length > 0 && (
            <NumberedSection index="05" title="Récits">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </NumberedSection>
          )}
        </div>
      </main>

      {isTourOpen && (
        <ImmersiveTourViewer
          imageId={OUIDAH_DEMO_TOUR.imageId}
          title={OUIDAH_DEMO_TOUR.title}
          caption={OUIDAH_DEMO_TOUR.caption}
          onClose={() => setIsTourOpen(false)}
        />
      )}
    </MainLayout>
  );
}
