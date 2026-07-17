import type {
  SearchResult,
  SearchResultType,
} from "@/domain/entities/SearchResult";
import type { SearchRepository } from "@/domain/repositories/SearchRepository";
import { apiFetch } from "@/infrastructure/api/httpClient";

interface RawSearchResult {
  type: SearchResultType;
  id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
}

interface RawSearchResponse {
  query: string;
  results: RawSearchResult[];
}

export class SearchRepositoryImpl implements SearchRepository {
  async search(
    query: string,
    limit = 8,
    types?: SearchResultType[],
  ): Promise<SearchResult[]> {
    const params = new URLSearchParams({ q: query, limit: String(limit) });
    if (types?.length) params.set("types", types.join(","));
    const response = await apiFetch<RawSearchResponse>(`/search?${params}`);
    return response.results.map((raw) => ({
      type: raw.type,
      id: raw.id,
      title: raw.title,
      description: raw.description ?? "",
      image: raw.image ?? "",
      category: raw.category ?? "",
    }));
  }
}
