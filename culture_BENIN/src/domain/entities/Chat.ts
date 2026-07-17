export type ChatSourceType =
  | "TouristSite"
  | "HistoricalFigure"
  | "City"
  | "Memory"
  | "Testimonial"
  | "Gallery";

export interface ChatSource {
  sourceId: string;
  sourceType: ChatSourceType;
  sourceTitle: string;
  mediaUrls: string[];
}

export interface ChatMessage {
  id: string;
  author: "user" | "bot";
  text: string;
  sources?: ChatSource[];
  isError?: boolean;
}
