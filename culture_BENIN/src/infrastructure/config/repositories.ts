import type { CityRepository } from "@/domain/repositories/CityRepository";
import type { StoryRepository } from "@/domain/repositories/StoryRepository";
import type { ContributionRepository } from "@/domain/repositories/ContributionRepository";
import type { MapRepository } from "@/domain/repositories/MapRepository";
import { CityRepositoryImpl } from "@/data/repositories/CityRepositoryImpl";
import { StoryRepositoryImpl } from "@/data/repositories/StoryRepositoryImpl";
import { ContributionRepositoryImpl } from "@/data/repositories/ContributionRepositoryImpl";
import { MapRepositoryImpl } from "@/data/repositories/MapRepositoryImpl";

export const cityRepository: CityRepository = new CityRepositoryImpl();
export const storyRepository: StoryRepository = new StoryRepositoryImpl();
export const contributionRepository: ContributionRepository =
  new ContributionRepositoryImpl();
export const mapRepository: MapRepository = new MapRepositoryImpl();
