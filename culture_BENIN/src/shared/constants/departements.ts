export const OTHER_DEPARTEMENT = "Autres villes";

export const BENIN_DEPARTEMENTS: string[] = [
  "Alibori",
  "Atacora",
  "Atlantique",
  "Borgou",
  "Collines",
  "Couffo",
  "Donga",
  "Littoral",
  "Mono",
  "Ouémé",
  "Plateau",
  "Zou",
];

// Real backend cities only expose a free-text address, no département field —
// this is a best-effort fallback used by CityRepositoryImpl for API-sourced cities.
const CITY_NAME_TO_DEPARTEMENT: Record<string, string> = {
  "ouidah": "Atlantique",
  "abomey": "Zou",
  "porto-novo": "Ouémé",
  "ganvié": "Atlantique",
  "cotonou": "Littoral",
  "natitingou": "Atacora",
  "parakou": "Borgou",
  "grand-popo": "Mono",
};

export function departementForCityName(name: string): string {
  return CITY_NAME_TO_DEPARTEMENT[name.trim().toLowerCase()] ?? OTHER_DEPARTEMENT;
}
