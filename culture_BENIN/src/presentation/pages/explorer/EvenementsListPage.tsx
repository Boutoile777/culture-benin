import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import type { City } from "@/domain/entities/City";
import type { CulturalEvent } from "@/domain/entities/CulturalEvent";
import type { Tradition } from "@/domain/entities/Tradition";
import {
  cityRepository,
  culturalEventRepository,
  traditionRepository,
} from "@/infrastructure/config/repositories";

function formatEventDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface EventRowProps {
  event: CulturalEvent;
  cityName: string;
  isPast?: boolean;
}

function EventRow({ event, cityName, isPast }: EventRowProps) {
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
          {cityName} · {formatEventDate(event.date)}
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

interface TraditionCardProps {
  tradition: Tradition;
  cityName: string;
}

function TraditionCard({ tradition, cityName }: TraditionCardProps) {
  return (
    <Link
      to={`/explorer/traditions/${tradition.id}`}
      className="flex flex-col gap-1.5 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]"
    >
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
        {cityName}
      </span>
      <span className="font-display text-[18px] font-medium leading-tight text-culture-ink">
        {tradition.name}
      </span>
      <span className="text-[13px] leading-relaxed text-gray-500">
        {tradition.description}
      </span>
      <span className="mt-1.5 text-[12.5px] font-semibold text-culture-green">
        Découvrir →
      </span>
    </Link>
  );
}

export function EvenementsListPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [traditions, setTraditions] = useState<Tradition[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      cityRepository.getAll(),
      culturalEventRepository.getAll(),
      traditionRepository.getAll(),
    ]).then(([cityResult, eventResult, traditionResult]) => {
      if (!cancelled) {
        setCities(cityResult);
        setEvents(eventResult);
        setTraditions(traditionResult);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const cityNameById = useMemo(() => {
    const map = new Map<string, string>();
    cities.forEach((city) => map.set(city.id, city.name));
    return map;
  }, [cities]);

  const { upcoming, past } = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      upcoming: events.filter((event) => event.date >= today),
      past: events.filter((event) => event.date < today).reverse(),
    };
  }, [events]);

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <SectionHeading
            kicker="Explorer · Agenda & traditions"
            title="Événements & traditions"
          />
          <p className="mb-10 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Festivals datés et traditions vivantes du Bénin — chaque fiche
            détaille son origine et sa galerie.
          </p>

          <section className="mb-14">
            <h2 className="mb-5 font-display text-[22px] font-semibold text-culture-ink">
              Traditions vivantes
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {traditions.map((tradition) => (
                <TraditionCard
                  key={tradition.id}
                  tradition={tradition}
                  cityName={cityNameById.get(tradition.cityId) ?? ""}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-display text-[22px] font-semibold text-culture-ink">
              Agenda des événements
            </h2>
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
                      <EventRow
                        key={event.id}
                        event={event}
                        cityName={cityNameById.get(event.cityId) ?? ""}
                      />
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
                      <EventRow
                        key={event.id}
                        event={event}
                        cityName={cityNameById.get(event.cityId) ?? ""}
                        isPast
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
