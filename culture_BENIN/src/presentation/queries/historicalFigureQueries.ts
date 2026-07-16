import { useQuery } from "@tanstack/react-query";
import { historicalFigureRepository } from "@/infrastructure/config/repositories";

export const historicalFigureKeys = {
  all: ["historicalFigures"] as const,
  byCity: (cityId: string) => ["historicalFigures", "city", cityId] as const,
  detail: (figureId: string) => ["historicalFigures", figureId] as const,
};

export function useHistoricalFigures() {
  return useQuery({
    queryKey: historicalFigureKeys.all,
    queryFn: () => historicalFigureRepository.getAll(),
  });
}

export function useHistoricalFiguresByCity(cityId: string | undefined) {
  return useQuery({
    queryKey: historicalFigureKeys.byCity(cityId ?? ""),
    queryFn: () => historicalFigureRepository.getByCityId(cityId!),
    enabled: Boolean(cityId),
  });
}

export function useHistoricalFigure(figureId: string | undefined) {
  return useQuery({
    queryKey: historicalFigureKeys.detail(figureId ?? ""),
    queryFn: () => historicalFigureRepository.getById(figureId!),
    enabled: Boolean(figureId),
  });
}
