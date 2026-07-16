import type { Tradition } from "@/domain/entities/Tradition";
import type { TraditionRepository } from "@/domain/repositories/TraditionRepository";
import { apiFetch, apiFetchList, ApiError } from "@/infrastructure/api/httpClient";
import { getCityIndex, type CityRef } from "@/data/repositories/cityIndex";
import { htmlToText } from "@/shared/utils/htmlToText";

interface RawMedia {
  url: string;
  type?: string;
}

interface RawTradition {
  id: string;
  title: string;
  description: string;
  origin?: string;
  city?: string;
  media?: RawMedia[];
  galleries?: { media?: RawMedia[] }[];
}

// Google Drive share links aren't direct image URLs — drop them, they never render.
function isDisplayableImage(url: string): boolean {
  return !url.includes("drive.google.com");
}

function mapTradition(
  raw: RawTradition,
  cityIndex: Map<string, CityRef>,
): Tradition {
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
    narrative: htmlToText(raw.origin) || undefined,
    gallery: images.length > 0 ? images : undefined,
  };
}

export class TraditionRepositoryImpl implements TraditionRepository {
  async getAll(): Promise<Tradition[]> {
    const [raw, cityIndex] = await Promise.all([
      apiFetchList<RawTradition>("/traditions?limit=100"),
      getCityIndex(),
    ]);
    return raw.map((tradition) => mapTradition(tradition, cityIndex));
  }

  async getByCityName(cityName: string): Promise<Tradition[]> {
    const all = await this.getAll();
    return all.filter((tradition) => tradition.cityName === cityName);
  }

  async getById(id: string): Promise<Tradition | null> {
    try {
      const [raw, cityIndex] = await Promise.all([
        apiFetch<RawTradition>(`/traditions/${id}`),
        getCityIndex(),
      ]);
      return mapTradition(raw, cityIndex);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  }
}
