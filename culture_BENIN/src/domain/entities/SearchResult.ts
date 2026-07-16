export type SearchResultType =
  | "city"
  | "touristSite"
  | "historicalFigure"
  | "story"
  | "tradition"
  | "event";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  image: string;
  category: string;
}
