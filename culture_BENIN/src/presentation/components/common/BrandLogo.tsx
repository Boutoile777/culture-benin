interface BrandLogoProps {
  size?: "md" | "sm";
}

export function BrandLogo({ size = "md" }: BrandLogoProps) {
  const isSmall = size === "sm";

  return (
    <div className="flex items-baseline gap-0.5">
      <span
        className={`font-display font-semibold text-culture-ink ${
          isSmall ? "text-xl" : "text-[22px]"
        }`}
      >
        Culture
      </span>
      <span
        className={`font-display font-semibold text-culture-terracotta ${
          isSmall ? "text-xl" : "text-[22px]"
        }`}
      >
        +
      </span>
      <span className="ml-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
        Bénin
      </span>
    </div>
  );
}
