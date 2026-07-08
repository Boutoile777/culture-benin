import type { ContentCategory } from "@/domain/entities/ContentCategory";

export type ContributionType =
  | "historical_text"
  | "image"
  | "video"
  | "audio"
  | "testimony"
  | "cultural_document";

export type ContributionStatus = "pending" | "approved" | "rejected";

export interface Contribution {
  id: string;
  authorId: string;
  authorName: string;
  type: ContributionType;
  cityId: string;
  category: ContentCategory;
  title: string;
  description: string;
  attachmentUrls: string[];
  status: ContributionStatus;
  submittedAt: string;
}
