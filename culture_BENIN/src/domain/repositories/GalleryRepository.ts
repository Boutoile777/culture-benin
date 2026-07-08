import type { GalleryItem } from "@/domain/entities/GalleryItem";

export interface GalleryRepository {
  getByCityId(cityId: string): Promise<GalleryItem[]>;
}
