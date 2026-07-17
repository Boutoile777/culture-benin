import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { BackLink } from "@/presentation/components/common/BackLink";
import { GlobalSearchField } from "@/presentation/components/common/GlobalSearchField";
import type { CulturalEvent } from "@/domain/entities/CulturalEvent";
import { useCulturalEvents } from "@/presentation/queries";
import { matchesQuery } from "@/shared/utils/matchesQuery";

function formatEventDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface EventRowProps {
  event: CulturalEvent;
  isPast?: boolean;
}

function EventRow({ event, isPast }: EventRowProps) {
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <Link
      to={`/explorer/evenements/${event.id}`}
      className={`flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 ${
        isPast ? "opacity-60" : "hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]"
      }`}
    >
      <div className="flex h-[62px] w-[62px] flex-none flex-col items-center justify-center rounded-xl bg-[#eef4ef] text-culture-green">
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
          {date.toLocaleDateString("fr-FR", { month: "short" })}
        </span>
        <span className="font-display text-[22px] font-semibold leading-none">
          {date.getDate()}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
          {event.cityName} · {formatEventDate(event.date)}
        </span>
        <span className="font-display text-[18px] font-medium leading-tight text-culture-ink">
          {event.name}
        </span>
        <span className="text-[13px] leading-relaxed text-gray-500">
          {event.description}
        </span>
      </div>
    </Link>
  );
}

export function EvenementsListPage() {
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: events } = useCulturalEvents();

  const filteredEvents = useMemo(() => {
    const allEvents = events ?? [];
    return allEvents.filter(
      (event) =>
        (!cityFilter || event.cityName === cityFilter) &&
        matchesQuery(searchQuery, event.name, event.description, event.cityName),
    );
  }, [events, cityFilter, searchQuery]);

  const { upcoming, past } = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      upcoming: filteredEvents.filter((event) => event.date >= today),
      past: filteredEvents.filter((event) => event.date < today).reverse(),
    };
  }, [filteredEvents]);

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <BackLink to="/explorer" label="Retour à Explorer" className="mb-4" />
          <SectionHeading
            kicker="Explorer · Agenda"
            title={cityFilter ? `Événements — ${cityFilter}` : "Événements"}
          />
          <p className="mb-10 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Festivals et rendez-vous culturels datés du Bénin — chaque fiche
            détaille son origine et sa galerie.
          </p>

          <GlobalSearchField
            dropdown={false}
            onQueryChange={setSearchQuery}
            placeholder="Filtrer les événements…"
            className="-mt-5 mb-10 w-full max-w-[340px]"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-culture-ink">
                À venir
              </h3>
              {upcoming.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun événement à venir.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {upcoming.map((event) => (
                    <EventRow key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Événements passés
              </h3>
              {past.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun événement passé.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {past.map((event) => (
                    <EventRow key={event.id} event={event} isPast />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
