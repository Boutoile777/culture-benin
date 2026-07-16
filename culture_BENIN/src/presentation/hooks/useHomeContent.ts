import { useMemo } from "react";
import type { HeroSlide } from "@/presentation/components/home/HeroCarousel";
import {
  useCities,
  useFeaturedStories,
  useRecentContributions,
  useSites,
} from "@/presentation/queries";
import { HERO_HIGHLIGHTS_MOCK } from "@/data/datasources/local/heroHighlights.mock";

const HERO_CITY_NAMES = ["Ouidah", "Porto-Novo", "Abomey"];

export function useHomeContent() {
  const citiesQuery = useCities();
  const sitesQuery = useSites();
  const storiesQuery = useFeaturedStories(4);
  const contributionsQuery = useRecentContributions(3);

  const queries = [citiesQuery, sitesQuery, storiesQuery, contributionsQuery];
  const isLoading = queries.some((query) => query.isPending);

  const cities = citiesQuery.data;
  const heroSlides = useMemo<HeroSlide[]>(
    () => [
      ...(cities ?? [])
        .filter((city) => HERO_CITY_NAMES.includes(city.name))
        .map((city) => ({
          id: city.id,
          image: city.heroImage,
          title: city.name,
          subtitle: city.region,
        })),
      ...HERO_HIGHLIGHTS_MOCK,
    ],
    [cities],
  );

  const content = isLoading
    ? null
    : {
        cities: cities ?? [],
        sites: sitesQuery.data ?? [],
        stories: storiesQuery.data ?? [],
        recentContributions: contributionsQuery.data ?? [],
        heroSlides,
      };

  return { content, isLoading };
}
