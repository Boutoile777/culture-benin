interface SectionHeadingProps {
  kicker: string;
  title: string;
}

export function SectionHeading({ kicker, title }: SectionHeadingProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        <span className="h-1.5 w-1.5 rounded-full bg-culture-terracotta" />
        {kicker}
      </div>
      <h2 className="font-display text-[34px] font-medium text-culture-ink">
        {title}
      </h2>
    </div>
  );
}
