import type { RecentTestimonial } from "@/domain/entities/RecentTestimonial";

export interface TestimonialRepository {
  getRecent(limit: number): Promise<RecentTestimonial[]>;
}
