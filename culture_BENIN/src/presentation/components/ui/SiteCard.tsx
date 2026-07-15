import { Link } from "react-router-dom";
import type { Site } from "@/domain/entities/Site";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";

interface SiteCardProps {
  site: Site;
  cityName?: string;
}

export function SiteCard({ site, cityName }: SiteCardProps) {
  return (
    <Link
      to={`/explorer/sites/${site.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(32,33,36,0.16)]"
    >
      <div className="overflow-hidden">
        {site.image ? (
          <ImageWithSkeleton
            src={site.image}
            alt={site.name}
            fallbackLabel={`photo à venir — ${site.name}`}
            className="h-[150px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-[150px] items-center justify-center bg-gradient-to-br from-gray-100 to-[#e6e3da] text-xs text-gray-400">
            photo à venir — {site.name}
          </div>
        )}
      </div>
      <div className="flex h-[190px] flex-col gap-1.5 p-[18px]">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
          {site.category}
          {cityName ? ` · ${cityName}` : ""}
        </span>
        <span className="line-clamp-2 font-display text-[18px] font-medium leading-tight text-culture-ink">
          {site.name}
        </span>
        <span className="line-clamp-3 text-[13px] leading-relaxed text-gray-500">
          {site.description}
        </span>
        <span className="mt-auto text-[12.5px] font-semibold text-culture-green">
          Lire son histoire →
        </span>
      </div>
    </Link>
  );
}
