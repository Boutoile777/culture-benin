import type { Story } from "@/domain/entities/Story";
import type { StoryRepository } from "@/domain/repositories/StoryRepository";
import { apiFetch, apiFetchList, ApiError } from "@/infrastructure/api/httpClient";
import { getCityIndex, type CityRef } from "@/data/repositories/cityIndex";
import { htmlToText } from "@/shared/utils/htmlToText";

interface RawMedia {
  url: string;
  type?: string;
}

interface RawStory {
  id: string;
  title: string;
  description: string;
  body: string;
  category: string;
  city?: string;
  media?: RawMedia[];
  galleries?: { media?: RawMedia[] }[];
}

// Slugs de l'enum backend StoryCategory → libellés affichés (filtres,
// badges et GALLERY_CATEGORIES de StoryDetailPage).
const CATEGORY_LABELS: Record<string, string> = {
  resistance: "Résistance",
  spiritualite: "Spiritualité",
  "histoire-contemporaine": "Histoire contemporaine",
  conte: "Conte",
};

// Google Drive share links aren't direct image URLs — drop them, they never render.
function isDisplayableImage(url: string): boolean {
  return !url.includes("drive.google.com");
}

function collectImages(raw: {
  media?: RawMedia[];
  galleries?: { media?: RawMedia[] }[];
}): string[] {
  return [
    ...(raw.media ?? []),
    ...(raw.galleries ?? []).flatMap((gallery) => gallery.media ?? []),
  ]
    .filter((m) => !m.type || m.type === "image")
    .map((m) => m.url)
    .filter(isDisplayableImage);
}

function mapStory(raw: RawStory, cityIndex: Map<string, CityRef>): Story {
  const cityRef = raw.city ? cityIndex.get(raw.city) : undefined;
  const images = collectImages(raw);
  return {
    id: raw.id,
    cityName: cityRef?.name,
    category: CATEGORY_LABELS[raw.category] ?? raw.category,
    title: raw.title,
    excerpt: htmlToText(raw.description),
    content: htmlToText(raw.body),
    // Beaucoup de récits n'ont pas encore de média : on retombe sur l'image
    // de leur ville pour que les cartes restent illustrées.
    image: images[0] ?? cityRef?.image ?? "",
    gallery: images.length > 1 ? images.slice(1) : undefined,
  };
}

export class StoryRepositoryImpl implements StoryRepository {
  async getAll(): Promise<Story[]> {
    const [raw, cityIndex] = await Promise.all([
      apiFetchList<RawStory>("/stories?limit=100"),
      getCityIndex(),
    ]);
    return raw.map((story) => mapStory(story, cityIndex));
  }

  async getFeatured(limit: number): Promise<Story[]> {
    const all = await this.getAll();
    return all.slice(0, limit);
  }

  async getById(id: string): Promise<Story | null> {
    try {
      const [raw, cityIndex] = await Promise.all([
        apiFetch<RawStory>(`/stories/${id}`),
        getCityIndex(),
      ]);
      return mapStory(raw, cityIndex);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  }
}
