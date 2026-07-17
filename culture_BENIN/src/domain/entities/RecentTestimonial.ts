export type TestimonialSubjectType =
  | "City"
  | "TouristSite"
  | "HistoricalFigure"
  | "Story"
  | "Tradition"
  | "Event";

export interface RecentTestimonial {
  id: string;
  title: string;
  // Nom de l'entité dont parle le témoignage (ville, site, personnalité…).
  subjectName: string;
  subjectType: TestimonialSubjectType;
}
