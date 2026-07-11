import { useCallback, useEffect, useState } from "react";

const DEFAULT_STORAGE_KEY = "culture-benin:favorite-cities";

function readStoredFavorites(storageKey: string): string[] {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites(storageKey: string = DEFAULT_STORAGE_KEY) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() =>
    new Set(readStoredFavorites(storageKey)),
  );

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify([...favoriteIds]));
  }, [storageKey, favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { favoriteIds, toggleFavorite };
}

export const FAVORITES_STORAGE_KEYS = {
  cities: DEFAULT_STORAGE_KEY,
  sites: "culture-benin:favorite-sites",
  figures: "culture-benin:favorite-figures",
  events: "culture-benin:favorite-events",
  stories: "culture-benin:favorite-stories",
  traditions: "culture-benin:favorite-traditions",
} as const;
