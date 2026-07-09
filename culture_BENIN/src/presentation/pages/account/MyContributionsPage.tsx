import { useEffect, useMemo, useState } from "react";
import type { City } from "@/domain/entities/City";
import type { Contribution, ContributionStatus } from "@/domain/entities/Contribution";
import { CONTRIBUTION_TYPE_LABELS } from "@/shared/constants/contributionLabels";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { cityRepository, contributionRepository } from "@/infrastructure/config/repositories";

const STATUS_LABELS: Record<ContributionStatus, string> = {
  pending: "En attente de modération",
  approved: "Publiée",
  rejected: "Refusée",
};

const STATUS_STYLES: Record<ContributionStatus, string> = {
  pending: "bg-gray-100 text-gray-500",
  approved: "bg-[#eef4ef] text-culture-green",
  rejected: "bg-[#fbeae1] text-culture-terracotta",
};

export function MyContributionsPage() {
  const { user } = useAuth();
  const [cities, setCities] = useState<City[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    Promise.all([
      cityRepository.getAll(),
      contributionRepository.getByUserId(user.id),
    ]).then(([cityResult, contributionResult]) => {
      if (!cancelled) {
        setCities(cityResult);
        setContributions(contributionResult);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const cityNameById = useMemo(() => {
    const map = new Map<string, string>();
    cities.forEach((city) => map.set(city.id, city.name));
    return map;
  }, [cities]);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[13.5px] leading-relaxed text-gray-500">
        Chaque contribution soumise depuis la page « Contribuer » est relue
        par nos modérateurs avant publication — suivez son statut ici.
      </p>

      {contributions.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-gray-300 p-8 text-center text-[13.5px] leading-relaxed text-gray-500">
          Vous n'avez pas encore soumis de contribution. Rendez-vous sur la
          page « Contribuer » pour partager un récit, une image ou un
          témoignage.
        </div>
      ) : (
        <div className="flex flex-col rounded-[18px] border border-gray-200 bg-white">
          {contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="flex items-center justify-between gap-4 border-b border-gray-100 p-5 last:border-b-0"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[14.5px] font-semibold text-culture-ink">
                  {contribution.title}
                </span>
                <span className="text-[12.5px] text-gray-500">
                  {cityNameById.get(contribution.cityId) ?? ""} ·{" "}
                  {CONTRIBUTION_TYPE_LABELS[contribution.type]} · soumis le{" "}
                  {contribution.submittedAt}
                </span>
              </div>
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] ${STATUS_STYLES[contribution.status]}`}
              >
                {STATUS_LABELS[contribution.status]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
