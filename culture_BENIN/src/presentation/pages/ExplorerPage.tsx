import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { SiteCard } from "@/presentation/components/ui/SiteCard";
import { StoryCard } from "@/presentation/components/ui/StoryCard";
import type { Site } from "@/domain/entities/Site";
import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";
import type { Story } from "@/domain/entities/Story";
import type { CulturalEvent } from "@/domain/entities/CulturalEvent";
import {
  siteRepository,
  historicalFigureRepository,
  storyRepository,
  culturalEventRepository,
} from "@/infrastructure/config/repositories";

function formatEventDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

export function ExplorerPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [figures, setFigures] = useState<HistoricalFigure[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [events, setEvents] = useState<CulturalEvent[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      siteRepository.getAll(),
      historicalFigureRepository.getAll(),
      storyRepository.getAll(),
      culturalEventRepository.getAll(),
    ]).then(([siteResult, figureResult, storyResult, eventResult]) => {
      if (!cancelled) {
        setSites(siteResult);
        setFigures(figureResult);
        setStories(storyResult);
        setEvents(eventResult);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="border-b border-gray-200 bg-[#fafaf8]">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:py-20">
            <div className="mb-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-culture-terracotta" />
              Explorer
            </div>
            <h1 className="font-display text-[36px] font-medium leading-tight text-culture-ink sm:text-[44px]">
              Le patrimoine du Bénin, en profondeur
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] text-[14.5px] leading-relaxed text-gray-500">
              Sites historiques, personnalités, récits et traditions —
              chaque fiche a sa propre page. Pour trouver une ville en
              particulier, utilisez la recherche en haut de l'écran.
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-12 sm:px-6 lg:py-16">
          <section>
            <div className="mb-6 flex items-end justify-between">
              <SectionHeading kicker="Patrimoine bâti" title="Sites historiques" />
              <Link
                to="/explorer/sites"
                className="whitespace-nowrap text-[13px] font-semibold text-culture-green hover:text-culture-terracotta"
              >
                Voir tous les sites →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sites.slice(0, 4).map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-end justify-between">
              <SectionHeading kicker="Mémoire vivante" title="Personnalités historiques" />
              <Link
                to="/explorer/personnalites"
                className="whitespace-nowrap text-[13px] font-semibold text-culture-green hover:text-culture-terracotta"
              >
                Voir toutes les personnalités →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {figures.slice(0, 4).map((figure) => (
                <Link
                  key={figure.id}
                  to={`/explorer/personnalites/${figure.id}`}
                  className="flex items-center gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(32,33,36,0.1)]"
                >
                  <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-culture-green font-display text-[15px] font-semibold text-white">
                    {figure.initials}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-culture-ink">
                      {figure.name}
                    </span>
                    <span className="truncate text-[11.5px] text-gray-500">
                      {figure.role}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-end justify-between">
              <SectionHeading kicker="Récits & transmission" title="Récits" />
              <Link
                to="/explorer/recits"
                className="whitespace-nowrap text-[13px] font-semibold text-culture-green hover:text-culture-terracotta"
              >
                Voir tous les récits →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stories.slice(0, 4).map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-end justify-between">
              <SectionHeading kicker="Agenda & traditions" title="Événements & traditions" />
              <Link
                to="/explorer/evenements"
                className="whitespace-nowrap text-[13px] font-semibold text-culture-green hover:text-culture-terracotta"
              >
                Voir tout →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {events.slice(0, 3).map((event) => (
                <Link
                  key={event.id}
                  to={`/explorer/evenements/${event.id}`}
                  className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-[0_6px_20px_rgba(32,33,36,0.1)]"
                >
                  <span className="flex-none whitespace-nowrap rounded-full bg-[#eef4ef] px-3 py-1.5 text-[12px] font-semibold text-culture-green">
                    {formatEventDate(event.date)}
                  </span>
                  <span className="flex-1 font-display text-[16px] font-medium text-culture-ink">
                    {event.name}
                  </span>
                  <span className="whitespace-nowrap text-[12.5px] font-semibold text-culture-green">
                    Découvrir →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
