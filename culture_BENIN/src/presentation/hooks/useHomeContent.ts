import { useEffect, useState } from "react";
import type { City } from "@/domain/entities/City";
import type { Story } from "@/domain/entities/Story";
import type { Contribution } from "@/domain/entities/Contribution";
import type { HeroSlide } from "@/presentation/components/home/HeroCarousel";
import {
  cityRepository,
  storyRepository,
  contributionRepository,
} from "@/infrastructure/config/repositories";
import { HERO_HIGHLIGHTS_MOCK } from "@/data/datasources/local/heroHighlights.mock";

interface HomeContent {
  cities: City[];
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
      storyRepository.getFeatured(4),
      contributionRepository.getRecent(3),
    ]).then(([cities, stories, recentContributions]) => {
      if (!cancelled) {
        const heroSlides: HeroSlide[] = [
          ...cities.map((city) => ({
            id: city.id,
            image: city.heroImage,
            title: city.name,
            subtitle: city.region,
          })),
          ...HERO_HIGHLIGHTS_MOCK,
        ];
        setContent({ cities, stories, recentContributions, heroSlides });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, isLoading: content === null };
}
