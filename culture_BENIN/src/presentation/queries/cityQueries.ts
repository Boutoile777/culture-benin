import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { City } from "@/domain/entities/City";
import { cityRepository } from "@/infrastructure/config/repositories";

export const cityKeys = {
  all: ["cities"] as const,
  detail: (cityId: string) => ["cities", cityId] as const,
};

export function useCities() {
  return useQuery({
    queryKey: cityKeys.all,
    queryFn: () => cityRepository.getAll(),
  });
}

export function useCity(cityId: string | undefined) {
  return useQuery({
    queryKey: cityKeys.detail(cityId ?? ""),
    queryFn: () => cityRepository.getById(cityId!),
    enabled: Boolean(cityId),
  });
}

// Réplique cityRepository.search(cityName) + choix du meilleur résultat,
// à partir de la liste des villes déjà en cache. Retourne null tant que
// les villes ne sont pas chargées ou qu'aucune ne correspond.
export function useCityByName(cityName: string | undefined): City | null {
  const { data: cities } = useCities();
  return useMemo(() => {
    if (!cities || !cityName) return null;
    const normalized = cityName.trim().toLowerCase();
    if (!normalized) return null;
    const matches = cities.filter((c) =>
      c.name.toLowerCase().includes(normalized),
    );
    return matches.find((c) => c.name === cityName) ?? matches[0] ?? null;
  }, [cities, cityName]);
}
