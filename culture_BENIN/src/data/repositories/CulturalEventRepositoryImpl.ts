import type { CulturalEvent } from "@/domain/entities/CulturalEvent";
import type { CulturalEventRepository } from "@/domain/repositories/CulturalEventRepository";
import { apiFetch, apiFetchList, ApiError } from "@/infrastructure/api/httpClient";
import { getCityIndex, type CityRef } from "@/data/repositories/cityIndex";
import { htmlToText } from "@/shared/utils/htmlToText";

interface RawMedia {
  url: string;
  type?: string;
}

interface RawCulturalEvent {
  id: string;
  title: string;
  description: string;
  origin?: string;
  date?: string;
  city?: string;
  media?: RawMedia[];
  galleries?: { media?: RawMedia[] }[];
}

// Google Drive share links aren't direct image URLs — drop them, they never render.
function isDisplayableImage(url: string): boolean {
  return !url.includes("drive.google.com");
}

function mapEvent(
  raw: RawCulturalEvent,
  cityIndex: Map<string, CityRef>,
): CulturalEvent {
  const images = [
    ...(raw.media ?? []),
    ...(raw.galleries ?? []).flatMap((gallery) => gallery.media ?? []),
  ]
    .filter((m) => !m.type || m.type === "image")
    .map((m) => m.url)
    .filter(isDisplayableImage);
  return {
    id: raw.id,
    cityName: raw.city ? (cityIndex.get(raw.city)?.name ?? "") : "",
    name: raw.title,
    description: htmlToText(raw.description),
    // L'API renvoie un ISO complet ; le front attend "YYYY-MM-DD"
    // (formatEventDate lui ajoute "T00:00:00").
    date: raw.date ? raw.date.slice(0, 10) : "",
    origin: htmlToText(raw.origin) || undefined,
    gallery: images.length > 0 ? images : undefined,
  };
}

export class CulturalEventRepositoryImpl implements CulturalEventRepository {
  async getAll(): Promise<CulturalEvent[]> {
    const [raw, cityIndex] = await Promise.all([
      apiFetchList<RawCulturalEvent>("/events?limit=100"),
      getCityIndex(),
    ]);
    return raw
      .map((event) => mapEvent(event, cityIndex))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async getByCityName(cityName: string): Promise<CulturalEvent[]> {
    const all = await this.getAll();
    return all.filter((event) => event.cityName === cityName);
  }

  async getById(id: string): Promise<CulturalEvent | null> {
    try {
      const [raw, cityIndex] = await Promise.all([
        apiFetch<RawCulturalEvent>(`/events/${id}`),
        getCityIndex(),
      ]);
      return mapEvent(raw, cityIndex);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  }
}
