import type { Contribution } from "@/domain/entities/Contribution";
import { CONTRIBUTION_TYPE_LABELS } from "@/shared/constants/contributionLabels";

interface ContributionRowProps {
  contribution: Contribution;
  cityName: string;
}

export function ContributionRow({ contribution, cityName }: ContributionRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-4 transition-colors duration-200 hover:bg-gray-50">
      <div className="flex flex-col gap-0.5">
        <span className="text-[14.5px] font-semibold text-culture-ink">
          {contribution.title}
        </span>
        <span className="text-[12.5px] text-gray-500">
          {contribution.authorName} · {cityName}
        </span>
      </div>
      <span className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-culture-green">
        {CONTRIBUTION_TYPE_LABELS[contribution.type]}
      </span>
    </div>
  );
}
