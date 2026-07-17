import { Link } from "react-router-dom";
import type { QuickLink, QuickLinkAccent } from "@/shared/constants/homeStaticContent";
import { QuickLinkIconGlyph } from "@/presentation/components/ui/QuickLinkIcons";

const ACCENT_STYLES: Record<
  QuickLinkAccent,
  { badge: string; kicker: string; border: string; arrow: string }
> = {
  green: {
    badge: "bg-culture-green/10 text-culture-green",
    kicker: "text-culture-green",
    border: "hover:border-culture-green/50",
    arrow: "text-culture-green",
  },
  terracotta: {
    badge: "bg-culture-terracotta/10 text-culture-terracotta",
    kicker: "text-culture-terracotta",
    border: "hover:border-culture-terracotta/50",
    arrow: "text-culture-terracotta",
  },
};

interface QuickLinkCardProps {
  link: QuickLink;
}

export function QuickLinkCard({ link }: QuickLinkCardProps) {
  const accent = ACCENT_STYLES[link.accent];

  return (
    <Link
      to={link.path}
      className={`group flex flex-col gap-3.5 rounded-2xl border border-gray-200 bg-white p-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(32,33,36,0.14)] ${accent.border}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${accent.badge}`}
      >
        <QuickLinkIconGlyph icon={link.icon} />
      </div>
      <div className="flex flex-col gap-1.5">
        <span
          className={`text-[10.5px] font-semibold uppercase tracking-[0.16em] ${accent.kicker}`}
        >
          {link.kicker}
        </span>
        <span className="font-display text-xl font-semibold text-culture-ink">
          {link.title}
        </span>
        <span className="text-[13.5px] leading-relaxed text-gray-500">
          {link.description}
        </span>
      </div>
      <span
        className={`mt-auto flex items-center gap-1.5 text-[13px] font-semibold ${accent.arrow}`}
      >
        Découvrir
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </span>
    </Link>
  );
}
