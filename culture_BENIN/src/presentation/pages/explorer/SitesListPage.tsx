import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { SiteCard } from "@/presentation/components/ui/SiteCard";
import type { City } from "@/domain/entities/City";
import type { Site } from "@/domain/entities/Site";
import { cityRepository, siteRepository } from "@/infrastructure/config/repositories";

export function SitesListPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([cityRepository.getAll(), siteRepository.getAll()]).then(
      ([cityResult, siteResult]) => {
        if (!cancelled) {
          setCities(cityResult);
          setSites(siteResult);
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

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <SectionHeading
            kicker="Explorer · Patrimoine bâti"
            title="Sites historiques en vedette"
          />
          <p className="mb-8 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Palais royaux, temples, mémoriaux et musées — cliquez sur un lieu
            pour ouvrir sa fiche complète : histoire, galerie et visite
            immersive quand elle est disponible.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sites.map((site) => (
              <SiteCard key={site.id} site={site} cityName={cityNameById.get(site.cityId)} />
            ))}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
