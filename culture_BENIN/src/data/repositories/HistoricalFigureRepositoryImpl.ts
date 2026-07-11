import type { HistoricalFigure } from "@/domain/entities/HistoricalFigure";
import type { Testimony } from "@/domain/entities/Testimony";
import type { HistoricalFigureRepository } from "@/domain/repositories/HistoricalFigureRepository";
import { apiFetch, ApiError } from "@/infrastructure/api/httpClient";

interface RawMedia {
  url: string;
  type?: string;
  name?: string;
  description?: string;
}

interface RawHistoricalFigure {
  id: string;
  name: string;
  description: string;
  biography?: string;
  city: string;
  media?: RawMedia[];
}

function initialsFromName(name: string): string {
  const words = name.replace(/\(.*?\)/g, "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

// Google Drive share links aren't direct image URLs — drop them, they never render.
function isDisplayableImage(url: string): boolean {
  return !url.includes("drive.google.com");
}

const DURATION_BY_URL_KEYWORD: Record<string, string> = {
  "Blekete%20rhythm": "1 min 33",
  "Vaudou%20%C3%A0%20Ouidah": "0 min 53",
  "Bas-reliefs%20du%20palais": "0 min 39",
  "O%20Z": "2 min 04",
};

function durationFor(url: string): string | undefined {
  const match = Object.keys(DURATION_BY_URL_KEYWORD).find((keyword) => url.includes(keyword));
  return match ? DURATION_BY_URL_KEYWORD[match] : undefined;
}

function buildTestimonies(media: RawMedia[], fallbackImage?: string): Testimony[] {
  if (!fallbackImage) return [];
  return media
    .filter((m) => m.type === "audio" || m.type === "video")
    .map((m) => ({
      id: `${m.url}-testimony`,
      type: m.type as "audio" | "video",
      title: m.name ?? (m.type === "audio" ? "Extrait audio" : "Extrait vidéo"),
      speaker:
        m.type === "audio"
          ? "Extrait audio libre de droits — Wikimedia Commons"
          : "Extrait vidéo libre de droits — Wikimedia Commons",
      image: fallbackImage,
      transcript: m.description,
      duration: durationFor(m.url),
      mediaUrl: m.url,
    }));
}

function mapHistoricalFigure(raw: RawHistoricalFigure): HistoricalFigure {
  const media = raw.media ?? [];
  const images = media
    .filter((m) => (m.type ?? "image") === "image")
    .map((m) => m.url)
    .filter(isDisplayableImage);
  return {
    id: raw.id,
    cityId: raw.city,
    name: raw.name,
    role: raw.description,
    initials: initialsFromName(raw.name),
    biography: raw.biography ? raw.biography.split("\n\n") : [],
    portrait: images[0],
    gallery: images.slice(1),
    testimonies: buildTestimonies(media, images[0]),
  };
}

export class HistoricalFigureRepositoryImpl implements HistoricalFigureRepository {
  async getAll(): Promise<HistoricalFigure[]> {
    const raw = await apiFetch<RawHistoricalFigure[]>("/historical-figures");
    return raw.map(mapHistoricalFigure);
  }

  async getByCityId(cityId: string): Promise<HistoricalFigure[]> {
    const raw = await apiFetch<RawHistoricalFigure[]>(
      `/historical-figures?city=${encodeURIComponent(cityId)}`,
    );
    return raw.map(mapHistoricalFigure);
  }

  async getById(id: string): Promise<HistoricalFigure | null> {
    try {
      const raw = await apiFetch<RawHistoricalFigure>(`/historical-figures/${id}`);
      return mapHistoricalFigure(raw);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  }
}
