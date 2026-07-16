import { useQuery } from "@tanstack/react-query";
import { traditionRepository } from "@/infrastructure/config/repositories";

export const traditionKeys = {
  all: ["traditions"] as const,
  byCity: (cityName: string) => ["traditions", "city", cityName] as const,
  detail: (traditionId: string) => ["traditions", traditionId] as const,
};

export function useTraditions() {
  return useQuery({
    queryKey: traditionKeys.all,
    queryFn: () => traditionRepository.getAll(),
  });
}

export function useTraditionsByCity(cityName: string | undefined) {
  return useQuery({
    queryKey: traditionKeys.byCity(cityName ?? ""),
    queryFn: () => traditionRepository.getByCityName(cityName!),
    enabled: Boolean(cityName),
  });
}

export function useTradition(traditionId: string | undefined) {
  return useQuery({
    queryKey: traditionKeys.detail(traditionId ?? ""),
    queryFn: () => traditionRepository.getById(traditionId!),
    enabled: Boolean(traditionId),
  });
}
