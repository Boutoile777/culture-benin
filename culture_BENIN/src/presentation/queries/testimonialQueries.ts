import { useQuery } from "@tanstack/react-query";
import { testimonialRepository } from "@/infrastructure/config/repositories";

export const testimonialKeys = {
  recent: (limit: number) => ["testimonials", "recent", limit] as const,
};

export function useRecentTestimonials(limit: number) {
  return useQuery({
    queryKey: testimonialKeys.recent(limit),
    queryFn: () => testimonialRepository.getRecent(limit),
  });
}
