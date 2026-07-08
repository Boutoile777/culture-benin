export type MediaType = "photo" | "video" | "audio" | "panorama360";

export interface GalleryItem {
  id: string;
  cityId: string;
  title: string;
  image: string;
  type: MediaType;
}
