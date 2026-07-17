import type {
  RecentTestimonial,
  TestimonialSubjectType,
} from "@/domain/entities/RecentTestimonial";

const SUBJECT_TYPE_LABELS: Record<TestimonialSubjectType, string> = {
  City: "Commune",
  TouristSite: "Site",
  HistoricalFigure: "Personnalité",
  Story: "Récit",
  Tradition: "Tradition",
  Event: "Événement",
};

interface TestimonialRowProps {
  testimonial: RecentTestimonial;
}

export function TestimonialRow({ testimonial }: TestimonialRowProps) {
  const context = [
    SUBJECT_TYPE_LABELS[testimonial.subjectType],
    testimonial.subjectName,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-4 transition-colors duration-200 hover:bg-gray-50">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[14.5px] font-semibold text-culture-ink">
          {testimonial.title}
        </span>
        {context && (
          <span className="truncate text-[12.5px] text-gray-500">{context}</span>
        )}
      </div>
      <span className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-culture-green">
        Témoignage
      </span>
    </div>
  );
}
