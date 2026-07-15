import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import type { City } from "@/domain/entities/City";
import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";
import { cityRepository, historicalFigureRepository } from "@/infrastructure/config/repositories";

export function PersonalitiesListPage() {
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");
  const [cities, setCities] = useState<City[]>([]);
  const [figures, setFigures] = useState<HistoricalFigure[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([cityRepository.getAll(), historicalFigureRepository.getAll()]).then(
      ([cityResult, figureResult]) => {
        if (!cancelled) {
          setCities(cityResult);
          setFigures(figureResult);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const cityNameById = useMemo(() => {
    const map = new Map<string, string>();
    cities.forEach((city) => map.set(city.id, city.name));
    return map;
  }, [cities]);

  const filteredFigures = useMemo(
    () => (cityFilter ? figures.filter((figure) => figure.cityId === cityFilter) : figures),
    [figures, cityFilter],
  );

  const filteredCityName = cityFilter ? cityNameById.get(cityFilter) : undefined;

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <SectionHeading
            kicker="Explorer · Mémoire vivante"
            title={
              filteredCityName ? `Personnalités historiques — ${filteredCityName}` : "Personnalités historiques"
            }
          />
          <p className="mb-8 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Rois, reines et figures marquantes qui ont façonné l'histoire du
            Bénin — cliquez sur un nom pour découvrir sa biographie.
          </p>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFigures.map((figure) => (
              <Link
                key={figure.id}
                to={`/explorer/personnalites/${figure.id}`}
                className="flex items-center gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(32,33,36,0.1)]"
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
                  <span className="text-[11.5px] text-culture-terracotta">
                    {cityNameById.get(figure.cityId) ?? ""}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
