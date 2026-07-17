import type { SearchResult, SearchResultType } from "@/domain/entities/SearchResult";

export interface SearchRepository {
  search(
    query: string,
    limit?: number,
    types?: SearchResultType[],
  ): Promise<SearchResult[]>;
}
