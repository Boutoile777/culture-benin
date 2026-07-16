import { useQuery } from "@tanstack/react-query";
import { siteRepository } from "@/infrastructure/config/repositories";

export const siteKeys = {
  all: ["sites"] as const,
  byCity: (cityId: string) => ["sites", "city", cityId] as const,
  detail: (siteId: string) => ["sites", siteId] as const,
};

export function useSites() {
  return useQuery({
    queryKey: siteKeys.all,
    queryFn: () => siteRepository.getAll(),
  });
}

export function useSitesByCity(cityId: string | undefined) {
  return useQuery({
    queryKey: siteKeys.byCity(cityId ?? ""),
    queryFn: () => siteRepository.getByCityId(cityId!),
    enabled: Boolean(cityId),
  });
}

export function useSite(siteId: string | undefined) {
  return useQuery({
    queryKey: siteKeys.detail(siteId ?? ""),
    queryFn: () => siteRepository.getById(siteId!),
    enabled: Boolean(siteId),
  });
}
