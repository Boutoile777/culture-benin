import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import type { MapPoint } from "@/domain/entities/MapPoint";
import type { Site } from "@/domain/entities/Site";
import { mapRepository, siteRepository } from "@/infrastructure/config/repositories";

type GeoStatus = "idle" | "locating" | "error";

export function CartePage() {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(
    searchParams.get("point"),
  );
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");

  useEffect(() => {
    let cancelled = false;
    Promise.all([mapRepository.getPoints(), siteRepository.getAll()]).then(
      ([pointResult, siteResult]) => {
        if (!cancelled) {
          setPoints(pointResult);
          setSites(siteResult);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    mapRepository.getPoints({ query: searchValue }).then((result) => {
      if (!cancelled) setPoints(result);
    });
    return () => {
      cancelled = true;
    };
  }, [searchValue]);

  const siteByName = useMemo(() => {
    const map = new Map<string, Site>();
    sites.forEach((site) => map.set(site.name, site));
    return map;
  }, [sites]);

  const selected = points.find((point) => point.id === selectedId) ?? null;
  const selectedSite = selected ? siteByName.get(selected.siteName) : undefined;

  const mapSrc = (() => {
    if (selected && origin) {
      return `https://maps.google.com/maps?saddr=${origin.lat},${origin.lng}&daddr=${selected.latitude},${selected.longitude}&hl=fr&output=embed`;
    }
    if (selected) {
      return `https://maps.google.com/maps?q=${selected.latitude},${selected.longitude}&z=15&hl=fr&output=embed`;
    }
    return "https://maps.google.com/maps?q=B%C3%A9nin&z=7&hl=fr&output=embed";
  })();

  const handleShowItinerary = () => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
        setGeoStatus("idle");
      },
      () => setGeoStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <SectionHeading
            kicker="Orientation culturelle"
            title="La carte culturelle du Bénin"
          />
          <p className="mb-8 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Sélectionnez un lieu pour le situer sur la carte et afficher
            l'itinéraire depuis votre position, sans quitter le site.
          </p>

          <div className="grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[380px_1fr]">
            <div className="flex flex-col gap-4">
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Rechercher un lieu…"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-culture-ink focus:outline-none focus:ring-2 focus:ring-culture-green"
              />

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
                        onClick={() => {
                          setSelectedId(point.id);
                          setOrigin(null);
                          setGeoStatus("idle");
                        }}
                        className={`flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 ${
                          isSelected ? "bg-[#eef4ef]" : "hover:bg-gray-50"
                        }`}
                      >
                        <img
                          src={point.image}
                          alt=""
                          className="h-11 w-11 flex-none rounded-lg object-cover"
                        />
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span
                            className={`text-sm ${isSelected ? "font-bold text-culture-ink" : "font-semibold text-culture-ink"}`}
                          >
                            {point.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {point.cityName} · {point.category}
                          </span>
                        </span>
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
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="font-display text-xl font-semibold text-culture-ink">
                        {selected.name}
                      </span>
                      <span className="text-[13px] leading-relaxed text-gray-500">
                        {selected.description}
                      </span>
                    </div>
                    <div className="flex flex-none flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={handleShowItinerary}
                        disabled={geoStatus === "locating"}
                        className="whitespace-nowrap rounded-full bg-culture-green px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark disabled:opacity-60"
                      >
                        {geoStatus === "locating"
                          ? "Localisation…"
                          : origin
                            ? "Itinéraire affiché"
                            : "Itinéraire depuis ma position"}
                      </button>
                      {selectedSite && (
                        <Link
                          to={`/explorer/sites/${selectedSite.id}`}
                          className="whitespace-nowrap rounded-full border border-gray-300 px-5 py-2.5 text-[13.5px] font-semibold text-culture-ink transition-colors duration-200 hover:border-culture-green hover:text-culture-green"
                        >
                          Ouvrir sa fiche
                        </Link>
                      )}
                    </div>
                  </div>
                  {geoStatus === "error" && (
                    <p className="text-[12.5px] text-culture-terracotta">
                      Impossible d'accéder à votre position — vérifiez que la
                      localisation est autorisée pour ce site.
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 p-5 text-[13.5px] leading-relaxed text-gray-500">
                  Choisissez un lieu dans la liste — la carte se centre dessus,
                  et le bouton itinéraire affiche le trajet depuis votre
                  position directement ici, sans ouvrir un autre onglet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
