import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MapPointFilter } from "@/domain/repositories/MapRepository";
import { mapRepository } from "@/infrastructure/config/repositories";

export const mapKeys = {
  points: (filter?: MapPointFilter) =>
    ["mapPoints", filter?.query ?? ""] as const,
};

export function useMapPoints(filter?: MapPointFilter) {
  return useQuery({
    queryKey: mapKeys.points(filter),
    queryFn: () => mapRepository.getPoints(filter),
    // Garde les points affichés pendant la saisie d'une recherche.
    placeholderData: keepPreviousData,
  });
}
