export type TestimonyType = "audio" | "video";

export interface Testimony {
  id: string;
  type: TestimonyType;
  title: string;
  speaker: string;
  image: string;
  transcript?: string;
  duration?: string;
  mediaUrl?: string;
}
