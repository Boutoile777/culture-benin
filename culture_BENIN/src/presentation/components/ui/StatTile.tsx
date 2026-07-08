import type { CollectionStat } from "@/shared/constants/homeStaticContent";

interface StatTileProps {
  stat: CollectionStat;
}

export function StatTile({ stat }: StatTileProps) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-gray-50 p-5 transition-colors duration-300 hover:bg-[#eef4ef]">
      <span className="font-display text-[30px] font-semibold text-culture-green">
        {stat.value}
      </span>
      <span className="text-[13.5px] font-semibold text-culture-ink">
        {stat.label}
      </span>
      <span className="text-[12.5px] text-gray-500">{stat.description}</span>
    </div>
  );
}
