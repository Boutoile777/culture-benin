import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { SearchResultType } from "@/domain/entities/SearchResult";
import { searchRepository } from "@/infrastructure/config/repositories";

// Le backend (SearchQueryDto) exige au moins 2 caractères.
export const SEARCH_MIN_QUERY_LENGTH = 2;

export const searchKeys = {
  global: (query: string, limit: number, types?: SearchResultType[]) =>
    ["search", query, limit, types?.join(",") ?? "all"] as const,
};

export function useGlobalSearch(
  query: string,
  limit = 8,
  types?: SearchResultType[],
) {
  const normalized = query.trim();
  return useQuery({
    queryKey: searchKeys.global(normalized.toLowerCase(), limit, types),
    queryFn: () => searchRepository.search(normalized, limit, types),
    enabled: normalized.length >= SEARCH_MIN_QUERY_LENGTH,
    // Garde les résultats affichés pendant la frappe (la clé change à chaque saisie).
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}
