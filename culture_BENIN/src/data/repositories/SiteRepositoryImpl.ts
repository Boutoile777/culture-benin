import type { Site } from "@/domain/entities/Site";
import type { Testimony } from "@/domain/entities/Testimony";
import type { SiteRepository } from "@/domain/repositories/SiteRepository";
import { apiFetch, apiFetchList, ApiError } from "@/infrastructure/api/httpClient";
import { SITES_MOCK } from "@/data/datasources/local/sites.mock";

interface RawMedia {
  url: string;
  type?: string;
  name?: string;
  description?: string;
}

interface RawSite {
  id: string;
  name: string;
  description: string;
  history?: string;
  city: string;
  media?: RawMedia[];
}

// Sites without a dedicated backend "récit" — hidden from the site listings.
const EXCLUDED_SITE_NAMES = new Set(["Vodun Day - Fête Nationale du Vodoun"]);

// The API has no testimonies concept yet: reuse the matching mock content by name.
const MOCK_TESTIMONIES_BY_NAME: Record<string, string> = {
  "La Porte du Non-Retour": "porte",
  "Le Temple des Pythons": "pythons",
  "Forêt Sacrée de Kpassè": "kpasse",
  "Palais royal d'Abomey": "palais",
  "Grande Mosquée de Porto-Novo": "mosquee",
  "Ganvié, cité lacustre": "ganvie",
};

// Testimonies for the remaining sites that have no equivalent in the mock.
// The thumbnail reuses each site's own first gallery image (set below).
const EXTRA_TESTIMONIES_BY_NAME: Record<
  string,
  Omit<Testimony, "id" | "image">
> = {
  "Basilique Notre-Dame de l'Immaculée Conception": {
    type: "audio",
    title: "Un lieu de coexistence religieuse",
    speaker: "Paroissien, Basilique Notre-Dame de Ouidah",
    transcript:
      "Notre basilique fait face au Temple des Pythons, de l'autre côté de la rue. On dit souvent que c'est le symbole de Ouidah : ici, les religions cohabitent depuis toujours, sans jamais s'effacer l'une l'autre.",
    duration: "1 min 40",
  },
  "Fort Portugais - Musée d'Histoire de Ouidah": {
    type: "audio",
    title: "Un fort devenu lieu de mémoire",
    speaker: "Guide, Musée d'Histoire de Ouidah",
    transcript:
      "Ce fort a changé de mains plusieurs fois, mais il est resté portugais jusqu'en 1961 — une enclave étrange en plein Bénin indépendant. Aujourd'hui, ses salles racontent le royaume de Xwéda et la traite, pour que cette histoire ne soit pas oubliée.",
    duration: "2 min 05",
  },
  "Place Chacha": {
    type: "audio",
    title: "La place où tout commençait",
    speaker: "Historien local, Ouidah",
    transcript:
      "C'est ici, place Chacha, que les captifs étaient rassemblés et vendus avant de prendre la Route des Esclaves. Le nom vient de Francisco Félix de Souza, le Chacha, qui contrôlait une grande partie de ce commerce.",
    duration: "1 min 50",
  },
  "Case Zomaï": {
    type: "audio",
    title: "La case de l'obscurité",
    speaker: "Guide mémoriel, Route des Esclaves",
    transcript:
      "Zomaï signifie « où le feu n'existe pas ». Les captifs y étaient enfermés dans le noir total avant l'embarquement, pour briser leur repère du temps et de l'espace. C'est l'une des étapes les plus dures de la Route des Esclaves.",
    duration: "1 min 35",
  },
  "L'Arbre de l'Oubli": {
    type: "audio",
    title: "Tourner sept fois autour de l'arbre",
    speaker: "Conteur, Route des Esclaves",
    transcript:
      "On faisait tourner les captifs autour de cet arbre — sept fois pour les hommes, neuf pour les femmes — pour qu'ils oublient leur identité avant le départ. Aujourd'hui, on vient plutôt s'y souvenir.",
    duration: "1 min 20",
  },
  "Musée Historique d'Aomey": {
    type: "audio",
    title: "Les trésors royaux, entre mémoire et restitution",
    speaker: "Conservateur, Musée historique d'Abomey",
    transcript:
      "Ce musée occupe une partie de l'ancien palais royal. Depuis le retour des trésors royaux en 2021, nous accueillons un public nouveau, souvent des descendants de la famille royale, venus voir ce que leurs ancêtres avaient créé.",
    duration: "2 min 20",
  },
  "Place GOHO": {
    type: "audio",
    title: "La statue qui garde l'entrée de la ville",
    speaker: "Habitant d'Abomey",
    transcript:
      "La statue de Béhanzin, à l'entrée de la ville, le représente sous les traits du requin — son emblème de force. Pour nous, elle rappelle qu'il n'a jamais accepté la défaite, même en exil.",
    duration: "1 min 30",
  },
  "Musée Honmè": {
    type: "audio",
    title: "L'ancien palais du roi Toffa",
    speaker: "Guide, Musée Honmè",
    transcript:
      "Ce palais a appartenu au roi Toffa Ier, celui qui a signé le traité de protectorat en 1882. Aujourd'hui, on y conserve les régalia royaux et les tissus de la cour de Hogbonou.",
    duration: "1 min 45",
  },
  "Jardin des Plantes et de la Nature": {
    type: "audio",
    title: "Un jardin pour transmettre les savoirs des plantes",
    speaker: "Botaniste, Jardin des Plantes et de la Nature",
    transcript:
      "Nous recevons beaucoup de groupes scolaires ici. L'idée, c'est de transmettre aux enfants de Porto-Novo les usages traditionnels des plantes médicinales, avant que ce savoir ne se perde.",
    duration: "1 min 55",
  },
};

// Lets a specific site promote a better gallery image to the front, without
// deleting the rest of the gallery (the API has no explicit ordering).
const PREFERRED_IMAGE_KEYWORD_BY_SITE_NAME: Record<string, string> = {
  "Place GOHO": "Gbehanzin statue in Abomey",
};

// These two flagship sites already have real audio/video media attached in the
// backend — surface them as testimonies instead of the generic text-only mock.
const REAL_MEDIA_TESTIMONY_SITE_NAMES = new Set([
  "La Porte du Non-Retour",
  "Palais royal d'Abomey",
]);

const DURATION_BY_URL_KEYWORD: Record<string, string> = {
  "Blekete%20rhythm": "1 min 33",
  "Pythons%20royaux": "0 min 23",
  "Bas-reliefs%20du%20palais": "0 min 39",
  "O%20Z": "2 min 04",
};

function durationFor(url: string): string | undefined {
  const match = Object.keys(DURATION_BY_URL_KEYWORD).find((keyword) => url.includes(keyword));
  return match ? DURATION_BY_URL_KEYWORD[match] : undefined;
}

function buildRealMediaTestimonies(raw: RawSite, fallbackImage: string): Testimony[] {
  return (raw.media ?? [])
    .filter((m) => m.type === "audio" || m.type === "video")
    .map((m) => ({
      id: `${raw.id}-${m.type}`,
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

// Google Drive share links aren't direct image URLs — drop them, they never render.
function isDisplayableImage(url: string): boolean {
  return !url.includes("drive.google.com");
}

function orderImages(name: string, images: string[]): string[] {
  const keyword = PREFERRED_IMAGE_KEYWORD_BY_SITE_NAME[name];
  if (!keyword) return images;
  const preferredIndex = images.findIndex((url) => url.includes(encodeURIComponent(keyword)));
  if (preferredIndex <= 0) return images;
  const preferred = images[preferredIndex];
  return [preferred, ...images.slice(0, preferredIndex), ...images.slice(preferredIndex + 1)];
}

function mapSite(raw: RawSite): Site {
  const images = orderImages(
    raw.name,
    (raw.media ?? []).map((m) => m.url).filter(isDisplayableImage),
  );
  const mockId = MOCK_TESTIMONIES_BY_NAME[raw.name];
  const mockSite = mockId ? SITES_MOCK.find((s) => s.id === mockId) : undefined;
  const extraTestimony = EXTRA_TESTIMONIES_BY_NAME[raw.name];
  const testimonies: Testimony[] = REAL_MEDIA_TESTIMONY_SITE_NAMES.has(raw.name)
    ? buildRealMediaTestimonies(raw, images[0])
    : (mockSite?.testimonies ??
      (extraTestimony && images[0]
        ? [{ id: `${raw.id}-testimony`, image: images[0], ...extraTestimony }]
        : []));
  return {
    id: raw.id,
    cityId: raw.city,
    category: "",
    name: raw.name,
    description: raw.description,
    image: images[0],
    gallery: images.slice(1),
    narrative: raw.history,
    testimonies,
  };
}

export class SiteRepositoryImpl implements SiteRepository {
  async getAll(): Promise<Site[]> {
    const raw = await apiFetchList<RawSite>("/tourist-sites");
    return raw.filter((site) => !EXCLUDED_SITE_NAMES.has(site.name)).map(mapSite);
  }

  async getByCityId(cityId: string): Promise<Site[]> {
    const raw = await apiFetchList<RawSite>(`/tourist-sites?city=${encodeURIComponent(cityId)}`);
    return raw.filter((site) => !EXCLUDED_SITE_NAMES.has(site.name)).map(mapSite);
  }

  async getById(id: string): Promise<Site | null> {
    try {
      const raw = await apiFetch<RawSite>(`/tourist-sites/${id}`);
      return mapSite(raw);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  }
}
