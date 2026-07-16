import { useQuery } from "@tanstack/react-query";
import { culturalEventRepository } from "@/infrastructure/config/repositories";

export const culturalEventKeys = {
  all: ["culturalEvents"] as const,
  byCity: (cityName: string) => ["culturalEvents", "city", cityName] as const,
  detail: (eventId: string) => ["culturalEvents", eventId] as const,
};

export function useCulturalEvents() {
  return useQuery({
    queryKey: culturalEventKeys.all,
    queryFn: () => culturalEventRepository.getAll(),
  });
}

export function useCulturalEventsByCity(cityName: string | undefined) {
  return useQuery({
    queryKey: culturalEventKeys.byCity(cityName ?? ""),
    queryFn: () => culturalEventRepository.getByCityName(cityName!),
    enabled: Boolean(cityName),
  });
}

export function useCulturalEvent(eventId: string | undefined) {
  return useQuery({
    queryKey: culturalEventKeys.detail(eventId ?? ""),
    queryFn: () => culturalEventRepository.getById(eventId!),
    enabled: Boolean(eventId),
  });
}
