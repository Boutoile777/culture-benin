import { useQuery } from "@tanstack/react-query";
import { storyRepository } from "@/infrastructure/config/repositories";

export const storyKeys = {
  all: ["stories"] as const,
  featured: (limit: number) => ["stories", "featured", limit] as const,
  detail: (storyId: string) => ["stories", storyId] as const,
};

export function useStories() {
  return useQuery({
    queryKey: storyKeys.all,
    queryFn: () => storyRepository.getAll(),
  });
}

export function useFeaturedStories(limit: number) {
  return useQuery({
    queryKey: storyKeys.featured(limit),
    queryFn: () => storyRepository.getFeatured(limit),
  });
}

export function useStory(storyId: string | undefined) {
  return useQuery({
    queryKey: storyKeys.detail(storyId ?? ""),
    queryFn: () => storyRepository.getById(storyId!),
    enabled: Boolean(storyId),
  });
}
