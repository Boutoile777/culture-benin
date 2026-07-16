import { useQuery } from "@tanstack/react-query";
import { statsRepository } from "@/infrastructure/config/repositories";

export const statsKeys = {
  platform: ["stats"] as const,
};

export function usePlatformStats() {
  return useQuery({
    queryKey: statsKeys.platform,
    queryFn: () => statsRepository.getStats(),
  });
}
