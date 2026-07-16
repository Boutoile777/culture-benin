import type { SearchResult } from "@/domain/entities/SearchResult";

export interface SearchRepository {
  search(query: string, limit?: number): Promise<SearchResult[]>;
}
