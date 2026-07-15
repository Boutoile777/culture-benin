// Day the featured-city rotation started — Ouidah is the featured city on this
// date, then the loop advances to the next city (in list order) every 24h.
const ROTATION_START = Date.UTC(2026, 6, 15);
const DAY_MS = 24 * 60 * 60 * 1000;

export function getFeaturedCity<T extends { id: string; name: string }>(
  cities: T[],
): T | undefined {
  if (cities.length === 0) return undefined;

  const ouidahIndex = cities.findIndex((city) => city.name === "Ouidah");
  const ordered =
    ouidahIndex > 0
      ? [cities[ouidahIndex], ...cities.slice(0, ouidahIndex), ...cities.slice(ouidahIndex + 1)]
      : cities;

  const daysSinceStart = Math.floor((Date.now() - ROTATION_START) / DAY_MS);
  const index = ((daysSinceStart % ordered.length) + ordered.length) % ordered.length;
  return ordered[index];
}
