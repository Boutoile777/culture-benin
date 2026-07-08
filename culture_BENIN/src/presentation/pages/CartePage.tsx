import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import type { City } from "@/domain/entities/City";
import type { MapPoint } from "@/domain/entities/MapPoint";
import { MAP_FILTERS } from "@/shared/constants/mapFilters";
import { cityRepository, mapRepository } from "@/infrastructure/config/repositories";

export function CartePage() {
  const [searchValue, setSearchValue] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [activeFilter, setActiveFilter] = useState("Tout");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([cityRepository.getAll(), mapRepository.getPoints()]).then(
      ([cityResult, pointResult]) => {
        if (!cancelled) {
          setCities(cityResult);
          setPoints(pointResult);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    mapRepository
      .getPoints({ category: activeFilter, query: searchValue })
      .then((result) => {
        if (!cancelled) setPoints(result);
      });
    return () => {
      cancelled = true;
    };
  }, [activeFilter, searchValue]);

  const cityNameById = useMemo(() => {
    const map = new Map<string, string>();
    cities.forEach((city) => map.set(city.id, city.name));
    return map;
  }, [cities]);

  const selected = points.find((point) => point.id === selectedId) ?? null;

  const mapSrc = selected
    ? `https://maps.google.com/maps?q=${selected.latitude},${selected.longitude}&z=15&hl=fr&output=embed`
    : "https://maps.google.com/maps?q=B%C3%A9nin&z=7&hl=fr&output=embed";

  const itineraryUrl = selected
    ? `https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`
    : "#";

  return (
    <MainLayout searchValue={searchValue} onSearchChange={setSearchValue}>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <SectionHeading
            kicker="Orientation culturelle"
            title="La carte culturelle du Bénin"
          />
          <p className="mb-8 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Sélectionnez un lieu pour le situer sur Google Maps et obtenir
            l'itinéraire depuis votre position actuelle.
          </p>

          <div className="grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[380px_1fr]">
            <div className="flex flex-col gap-4">
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Rechercher un lieu…"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-culture-ink focus:outline-none focus:ring-2 focus:ring-culture-green"
              />

              <div className="flex flex-wrap gap-2">
                {MAP_FILTERS.map((filter) => {
                  const isActive = filter === activeFilter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
                        isActive
                          ? "border-culture-ink bg-culture-ink text-white"
                          : "border-gray-300 bg-white text-culture-ink hover:bg-gray-50"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div className="flex max-h-[430px] flex-col overflow-y-auto rounded-2xl border border-gray-200">
                {points.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">
                    Aucun lieu ne correspond à cette recherche.
                  </p>
                ) : (
                  points.map((point) => {
                    const isSelected = point.id === selectedId;
                    return (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => setSelectedId(point.id)}
                        className={`flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3.5 text-left transition-colors last:border-b-0 ${
                          isSelected ? "bg-[#eef4ef]" : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span
                            className={`text-sm ${isSelected ? "font-bold text-culture-ink" : "font-semibold text-culture-ink"}`}
                          >
                            {point.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {cityNameById.get(point.cityId) ?? ""} · {point.category}
                          </span>
                        </span>
                        <span
                          className={`h-2 w-2 flex-none rounded-full ${
                            isSelected ? "bg-culture-green" : "bg-gray-300"
                          }`}
                        />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-[430px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                <iframe
                  src={mapSrc}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Carte Google Maps"
                />
              </div>

              {selected ? (
                <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-xl font-semibold text-culture-ink">
                      {selected.name}
                    </span>
                    <span className="text-[13px] leading-relaxed text-gray-500">
                      {selected.description}
                    </span>
                  </div>
                  <div className="flex flex-none flex-wrap gap-2.5">
                    <a
                      href={itineraryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap rounded-full bg-culture-green px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
                    >
                      Itinéraire depuis ma position ↗
                    </a>
                    <span className="whitespace-nowrap rounded-full border border-gray-300 px-5 py-2.5 text-[13.5px] font-semibold text-gray-400">
                      Page Explorer
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 p-5 text-[13.5px] leading-relaxed text-gray-500">
                  Choisissez un lieu dans la liste — la carte se centre dessus
                  et le bouton itinéraire utilise votre position actuelle via
                  Google Maps.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
