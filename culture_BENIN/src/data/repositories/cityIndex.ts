import { apiFetchList } from "@/infrastructure/api/httpClient";

interface RawCityRef {
  id: string;
  name: string;
  media?: { url: string }[];
}

export interface CityRef {
  name: string;
  image: string;
}

// Google Drive share links aren't direct image URLs — drop them, they never render.
function isDisplayableImage(url: string): boolean {
  return !url.includes("drive.google.com");
}

let cityIndexPromise: Promise<Map<string, CityRef>> | null = null;

// Annuaire id → { nom, première image } des villes, partagé par les
// repositories dont l'API ne renvoie que l'id de ville (stories, traditions,
// events). Une seule requête /cities, mémoïsée pour la session.
export function getCityIndex(): Promise<Map<string, CityRef>> {
  if (!cityIndexPromise) {
    cityIndexPromise = apiFetchList<RawCityRef>("/cities")
      .then(
        (cities) =>
          new Map(
            cities.map((city) => [
              city.id,
              {
                name: city.name,
                image:
                  (city.media ?? [])
                    .map((m) => m.url)
                    .filter(isDisplayableImage)[0] ?? "",
              },
            ]),
          ),
      )
      .catch((error: unknown) => {
        // Ne mémoïse pas un échec : la prochaine requête retentera.
        cityIndexPromise = null;
        throw error;
      });
  }
  return cityIndexPromise;
}
