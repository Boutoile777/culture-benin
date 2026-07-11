import type { City } from "@/domain/entities/City";
import type { CityRepository } from "@/domain/repositories/CityRepository";
import { apiFetch, ApiError } from "@/infrastructure/api/httpClient";

interface RawMedia {
  url: string;
}

interface RawCity {
  id: string;
  name: string;
  description: string;
  history: string;
  location: { address: string; latitude: number; longitude: number };
  media?: RawMedia[];
}

function firstSentence(text: string): string {
  const index = text.indexOf(". ");
  return index === -1 ? text : text.slice(0, index + 1);
}

// Google Drive share links aren't direct image URLs — drop them, they never render.
function isDisplayableImage(url: string): boolean {
  return !url.includes("drive.google.com");
}

function mapCity(raw: RawCity, order: number): City {
  const image = (raw.media ?? []).map((m) => m.url).filter(isDisplayableImage)[0] ?? "";
  return {
    id: raw.id,
    name: raw.name,
    region: raw.location?.address ?? "",
    theme: "",
    nickname: "",
    tagline: firstSentence(raw.description),
    heroImage: image,
    cardImage: image,
    introduction: raw.description,
    history: raw.history,
    order,
  };
}

export class CityRepositoryImpl implements CityRepository {
  async getAll(): Promise<City[]> {
    const raw = await apiFetch<RawCity[]>("/cities");
    return raw.map((city, index) => mapCity(city, index));
  }

  async getById(id: string): Promise<City | null> {
    try {
      const raw = await apiFetch<RawCity>(`/cities/${id}`);
      return mapCity(raw, 0);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  }

  async search(query: string): Promise<City[]> {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const all = await this.getAll();
    return all.filter((city) => city.name.toLowerCase().includes(normalized));
  }
}
