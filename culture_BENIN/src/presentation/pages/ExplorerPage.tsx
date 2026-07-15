import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { FormField, formInputClass } from "@/presentation/components/ui/FormField";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";
import { Skeleton } from "@/presentation/components/ui/Skeleton";
import type { City } from "@/domain/entities/City";
import { cityRepository } from "@/infrastructure/config/repositories";
import { getFeaturedCity } from "@/shared/utils/featuredCity";

export function ExplorerPage() {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[] | null>(null);
  const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  useEffect(() => {
    let cancelled = false;
    cityRepository.getAll().then((result) => {
      if (!cancelled) setCities(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredCity = useMemo(() => getFeaturedCity(cities ?? []), [cities]);

  const departementOptions = useMemo(
    () =>
      Array.from(new Set((cities ?? []).map((city) => city.departement))).sort((a, b) =>
        a.localeCompare(b, "fr"),
      ),
    [cities],
  );

  const communeOptions = useMemo(
    () =>
      (cities ?? [])
        .filter((city) => city.departement === selectedDepartement)
        .sort((a, b) => a.name.localeCompare(b.name, "fr")),
    [cities, selectedDepartement],
  );

  const handleDepartementChange = (value: string) => {
    setSelectedDepartement(value);
    setSelectedCityId("");
  };

  const handleCommuneChange = (cityId: string) => {
    setSelectedCityId(cityId);
    if (cityId) navigate(`/explorer/${cityId}`);
  };

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
              Chaque ville a sa propre fiche : histoire, sites, personnalités,
              récits, traditions, événements et galerie. Choisissez un
              département puis une commune pour commencer.
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:py-16">
          <section>
            <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-culture-terracotta" />
              Choisir une ville
            </div>
            <div className="grid grid-cols-1 gap-5 rounded-[24px] border border-gray-200 bg-white p-6 sm:grid-cols-2 sm:p-8">
              <FormField label="Département">
                <select
                  value={selectedDepartement}
                  onChange={(event) => handleDepartementChange(event.target.value)}
                  className={formInputClass}
                >
                  <option value="">Tous les départements</option>
                  {departementOptions.map((departement) => (
                    <option key={departement} value={departement}>
                      {departement}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Ville (commune)">
                <select
                  value={selectedCityId}
                  onChange={(event) => handleCommuneChange(event.target.value)}
                  disabled={!selectedDepartement}
                  className={`${formInputClass} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <option value="">
                    {selectedDepartement
                      ? "Choisir une commune"
                      : "Sélectionnez d'abord un département"}
                  </option>
                  {communeOptions.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-culture-terracotta" />
              Ville en vedette du jour
            </div>

            {cities === null ? (
              <Skeleton className="h-[280px] w-full rounded-[24px] sm:h-[360px]" />
            ) : featuredCity ? (
              <Link
                to={`/explorer/${featuredCity.id}`}
                className="group relative block h-[280px] overflow-hidden rounded-[24px] sm:h-[360px]"
              >
                <ImageWithSkeleton
                  src={featuredCity.heroImage}
                  alt={featuredCity.name}
                  eager
                  fallbackLabel={featuredCity.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    {featuredCity.region}
                  </span>
                  <h2 className="font-display text-[30px] font-semibold leading-tight text-white sm:text-[40px]">
                    {featuredCity.name}
                  </h2>
                  <p className="max-w-[540px] text-[13.5px] leading-relaxed text-white/85 sm:text-[14.5px]">
                    {featuredCity.tagline}
                  </p>
                  <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-semibold text-culture-ink transition-colors duration-200 group-hover:bg-gray-100">
                    Découvrir {featuredCity.name} →
                  </span>
                </div>
              </Link>
            ) : null}
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
