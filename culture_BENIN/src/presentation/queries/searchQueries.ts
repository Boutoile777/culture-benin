import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchRepository } from "@/infrastructure/config/repositories";

// Le backend (SearchQueryDto) exige au moins 2 caractères.
export const SEARCH_MIN_QUERY_LENGTH = 2;

export const searchKeys = {
  global: (query: string, limit: number) => ["search", query, limit] as const,
};

export function useGlobalSearch(query: string, limit = 8) {
  const normalized = query.trim();
  return useQuery({
    queryKey: searchKeys.global(normalized.toLowerCase(), limit),
    queryFn: () => searchRepository.search(normalized, limit),
    enabled: normalized.length >= SEARCH_MIN_QUERY_LENGTH,
    // Garde les résultats affichés pendant la frappe (la clé change à chaque saisie).
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}
