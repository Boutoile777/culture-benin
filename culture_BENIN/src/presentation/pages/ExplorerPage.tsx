import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { FormField } from "@/presentation/components/ui/FormField";
import { SelectMenu } from "@/presentation/components/ui/SelectMenu";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";
import { Skeleton } from "@/presentation/components/ui/Skeleton";
import { GlobalSearchField } from "@/presentation/components/common/GlobalSearchField";
import { HeroBackgroundSlider } from "@/presentation/components/explorer/HeroBackgroundSlider";
import { CityCard } from "@/presentation/components/ui/CityCard";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { useCities } from "@/presentation/queries";
import { getFeaturedCity } from "@/shared/utils/featuredCity";
import { matchesQuery } from "@/shared/utils/matchesQuery";

// Nombre de communes mises en avant quand aucune recherche n'est en cours.
const FEATURED_COMMUNES_COUNT = 6;

export function ExplorerPage() {
  const navigate = useNavigate();
  const { data: cities, isPending } = useCities();
  const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [communeSearch, setCommuneSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(FEATURED_COMMUNES_COUNT);
  const { favoriteIds, toggleFavorite } = useFavorites();

  const featuredCity = useMemo(() => getFeaturedCity(cities ?? []), [cities]);

  const isSearchingCommunes = communeSearch.trim().length > 0;
  const visibleCommunes = useMemo(() => {
    const allCities = cities ?? [];
    if (!isSearchingCommunes) return allCities.slice(0, visibleCount);
    return allCities.filter((city) =>
      matchesQuery(
        communeSearch,
        city.name,
        city.region,
        city.departement,
        city.tagline,
      ),
    );
  }, [cities, communeSearch, isSearchingCommunes, visibleCount]);

  const remainingCommunes = isSearchingCommunes
    ? 0
    : Math.max(0, (cities ?? []).length - visibleCount);

  const heroImages = useMemo(
    () =>
      (cities ?? [])
        .map((city) => city.heroImage)
        .filter(Boolean)
        .slice(0, 6),
    [cities],
  );
  const hasHeroSlides = heroImages.length > 0;

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
        <div className="relative overflow-hidden border-b border-gray-200 bg-[#fafaf8]">
          <HeroBackgroundSlider images={heroImages} />
          <div className="relative z-20 mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:py-20">
            <div
              className={`mb-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                hasHeroSlides ? "text-white/85" : "text-gray-500"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-culture-terracotta" />
              Explorer
            </div>
            <h1
              className={`font-display text-[36px] font-medium leading-tight sm:text-[44px] ${
                hasHeroSlides ? "text-white" : "text-culture-ink"
              }`}
            >
              Le patrimoine du Bénin, en profondeur
            </h1>
            <p
              className={`mx-auto mt-4 max-w-[520px] text-[14.5px] leading-relaxed ${
                hasHeroSlides ? "text-white/90" : "text-gray-500"
              }`}
            >
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
              Choisir une commune
            </div>
            <div className="grid grid-cols-1 gap-5 rounded-[24px] border border-gray-200 bg-white p-6 sm:grid-cols-2 sm:p-8">
              <FormField label="Département">
                <SelectMenu
                  value={selectedDepartement}
                  onChange={handleDepartementChange}
                  placeholder="Tous les départements"
                  options={[
                    { value: "", label: "Tous les départements" },
                    ...departementOptions.map((departement) => ({
                      value: departement,
                      label: departement,
                    })),
                  ]}
                />
              </FormField>
              <FormField label="Ville (commune)">
                <SelectMenu
                  value={selectedCityId}
                  onChange={handleCommuneChange}
                  disabled={!selectedDepartement}
                  placeholder={
                    selectedDepartement
                      ? "Choisir une commune"
                      : "Sélectionnez d'abord un département"
                  }
                  options={communeOptions.map((city) => ({
                    value: city.id,
                    label: city.name,
                    hint: city.region,
                  }))}
                />
              </FormField>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-culture-terracotta" />
              Ville en vedette du jour
            </div>

            {isPending ? (
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

          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-culture-terracotta" />
                Communes à découvrir
              </div>
              <GlobalSearchField
                dropdown={false}
                onQueryChange={setCommuneSearch}
                placeholder="Rechercher une commune…"
                className="w-full max-w-[340px]"
              />
            </div>

            {isPending ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-[320px] w-full rounded-2xl" />
                ))}
              </div>
            ) : visibleCommunes.length === 0 ? (
              <p className="text-sm text-gray-500">
                Aucune commune ne correspond à « {communeSearch.trim()} ».
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleCommunes.map((city) => (
                  <CityCard
                    key={city.id}
                    city={city}
                    isFavorite={favoriteIds.has(city.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}

            {remainingCommunes > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) => count + FEATURED_COMMUNES_COUNT)
                  }
                  className="rounded-full border border-gray-300 px-6 py-2.5 text-[13.5px] font-semibold text-culture-ink transition-colors duration-200 hover:border-culture-green hover:text-culture-green"
                >
                  Charger plus de communes ({remainingCommunes} restante
                  {remainingCommunes > 1 ? "s" : ""})
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
