import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { BackLink } from "@/presentation/components/common/BackLink";
import { GlobalSearchField } from "@/presentation/components/common/GlobalSearchField";
import { SiteCard } from "@/presentation/components/ui/SiteCard";
import { useCities, useSites } from "@/presentation/queries";
import { matchesQuery } from "@/shared/utils/matchesQuery";

export function SitesListPage() {
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: cities } = useCities();
  const { data: sites } = useSites();

  const cityNameById = useMemo(() => {
    const map = new Map<string, string>();
    (cities ?? []).forEach((city) => map.set(city.id, city.name));
    return map;
  }, [cities]);

  const filteredSites = useMemo(() => {
    const allSites = sites ?? [];
    return allSites.filter(
      (site) =>
        (!cityFilter || site.cityId === cityFilter) &&
        matchesQuery(
          searchQuery,
          site.name,
          site.description,
          site.category,
          cityNameById.get(site.cityId),
        ),
    );
  }, [sites, cityFilter, searchQuery, cityNameById]);

  const filteredCityName = cityFilter ? cityNameById.get(cityFilter) : undefined;

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <BackLink
            to={cityFilter ? `/explorer/${cityFilter}` : "/explorer"}
            label={filteredCityName ? `Retour à ${filteredCityName}` : "Retour à Explorer"}
            className="mb-4"
          />
          <SectionHeading
            kicker="Explorer · Patrimoine bâti"
            title={
              filteredCityName ? `Sites historiques — ${filteredCityName}` : "Sites historiques en vedette"
            }
          />
          <p className="mb-8 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Palais royaux, temples, mémoriaux et musées — cliquez sur un lieu
            pour ouvrir sa fiche complète : histoire, galerie et visite
            immersive quand elle est disponible.
          </p>

          <GlobalSearchField
            dropdown={false}
            onQueryChange={setSearchQuery}
            placeholder="Filtrer les sites…"
            className="mb-8 w-full max-w-[340px]"
          />

          {filteredSites.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucun site ne correspond à « {searchQuery.trim()} ».
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredSites.map((site) => (
                <SiteCard key={site.id} site={site} cityName={cityNameById.get(site.cityId)} />
              ))}
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
