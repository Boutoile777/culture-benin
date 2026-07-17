import type {
  RecentTestimonial,
  TestimonialSubjectType,
} from "@/domain/entities/RecentTestimonial";
import type { TestimonialRepository } from "@/domain/repositories/TestimonialRepository";
import { apiFetchList } from "@/infrastructure/api/httpClient";

// `subject` est peuplé par le backend (name pour ville/site/personnalité,
// title pour récit/tradition/événement) — sinon c'est l'id brut.
interface RawSubject {
  name?: string;
  title?: string;
}

interface RawTestimonial {
  id: string;
  title: string;
  subjectType: TestimonialSubjectType;
  subject?: RawSubject | string;
}

function subjectName(subject: RawTestimonial["subject"]): string {
  if (!subject || typeof subject === "string") return "";
  return subject.name ?? subject.title ?? "";
}

export class TestimonialRepositoryImpl implements TestimonialRepository {
  async getRecent(limit: number): Promise<RecentTestimonial[]> {
    const raw = await apiFetchList<RawTestimonial>(
      `/testimonials?limit=${limit}`,
    );
    return raw.map((testimonial) => ({
      id: testimonial.id,
      title: testimonial.title,
      subjectName: subjectName(testimonial.subject),
      subjectType: testimonial.subjectType,
    }));
  }
}
