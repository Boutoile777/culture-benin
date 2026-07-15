import { useEffect, useState } from "react";
import type { City } from "@/domain/entities/City";
import type { Site } from "@/domain/entities/Site";
import type { Story } from "@/domain/entities/Story";
import type { Contribution } from "@/domain/entities/Contribution";
import type { HeroSlide } from "@/presentation/components/home/HeroCarousel";
import {
  cityRepository,
  siteRepository,
  storyRepository,
  contributionRepository,
} from "@/infrastructure/config/repositories";
import { HERO_HIGHLIGHTS_MOCK } from "@/data/datasources/local/heroHighlights.mock";

interface HomeContent {
  cities: City[];
  sites: Site[];
  stories: Story[];
  recentContributions: Contribution[];
  heroSlides: HeroSlide[];
}

export function useHomeContent() {
  const [content, setContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      cityRepository.getAll(),
      siteRepository.getAll(),
      storyRepository.getFeatured(4),
      contributionRepository.getRecent(3),
    ]).then(([cities, sites, stories, recentContributions]) => {
      if (!cancelled) {
        const HERO_CITY_NAMES = ["Ouidah", "Porto-Novo", "Abomey"];
        const heroSlides: HeroSlide[] = [
          ...cities
            .filter((city) => HERO_CITY_NAMES.includes(city.name))
            .map((city) => ({
              id: city.id,
              image: city.heroImage,
              title: city.name,
              subtitle: city.region,
            })),
          ...HERO_HIGHLIGHTS_MOCK,
        ];
        setContent({ cities, sites, stories, recentContributions, heroSlides });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, isLoading: content === null };
}
