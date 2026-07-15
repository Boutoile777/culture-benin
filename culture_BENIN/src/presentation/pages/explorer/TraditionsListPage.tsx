import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import type { Tradition } from "@/domain/entities/Tradition";
import { traditionRepository } from "@/infrastructure/config/repositories";

function TraditionCard({ tradition }: { tradition: Tradition }) {
  return (
    <Link
      to={`/explorer/traditions/${tradition.id}`}
      className="flex flex-col gap-1.5 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]"
    >
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
        {tradition.cityName}
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

export function TraditionsListPage() {
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");
  const [traditions, setTraditions] = useState<Tradition[]>([]);

  useEffect(() => {
    let cancelled = false;
    traditionRepository.getAll().then((result) => {
      if (!cancelled) setTraditions(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTraditions = useMemo(
    () =>
      cityFilter ? traditions.filter((tradition) => tradition.cityName === cityFilter) : traditions,
    [traditions, cityFilter],
  );

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <SectionHeading
            kicker="Explorer · Traditions vivantes"
            title={cityFilter ? `Traditions — ${cityFilter}` : "Traditions vivantes"}
          />
          <p className="mb-10 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Savoir-faire, rites et pratiques transmis de génération en
            génération à travers le Bénin.
          </p>

          {filteredTraditions.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune tradition dans cette rubrique pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredTraditions.map((tradition) => (
                <TraditionCard key={tradition.id} tradition={tradition} />
              ))}
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
