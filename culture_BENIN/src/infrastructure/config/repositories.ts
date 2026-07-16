import type { CityRepository } from "@/domain/repositories/CityRepository";
import type { StoryRepository } from "@/domain/repositories/StoryRepository";
import type { ContributionRepository } from "@/domain/repositories/ContributionRepository";
import type { MapRepository } from "@/domain/repositories/MapRepository";
import type { CulturalEventRepository } from "@/domain/repositories/CulturalEventRepository";
import type { QuizRepository } from "@/domain/repositories/QuizRepository";
import type { LeaderboardRepository } from "@/domain/repositories/LeaderboardRepository";
import type { HistoricalFigureRepository } from "@/domain/repositories/HistoricalFigureRepository";
import type { SiteRepository } from "@/domain/repositories/SiteRepository";
import type { TraditionRepository } from "@/domain/repositories/TraditionRepository";
import type { ChronologyRepository } from "@/domain/repositories/ChronologyRepository";
import type { MemoryRepository } from "@/domain/repositories/MemoryRepository";
import type { AuthRepository } from "@/domain/repositories/AuthRepository";
import type { SearchRepository } from "@/domain/repositories/SearchRepository";
import type { StatsRepository } from "@/domain/repositories/StatsRepository";
import { CityRepositoryImpl } from "@/data/repositories/CityRepositoryImpl";
import { StoryRepositoryImpl } from "@/data/repositories/StoryRepositoryImpl";
import { ContributionRepositoryImpl } from "@/data/repositories/ContributionRepositoryImpl";
import { MapRepositoryImpl } from "@/data/repositories/MapRepositoryImpl";
import { CulturalEventRepositoryImpl } from "@/data/repositories/CulturalEventRepositoryImpl";
import { QuizRepositoryImpl } from "@/data/repositories/QuizRepositoryImpl";
import { LeaderboardRepositoryImpl } from "@/data/repositories/LeaderboardRepositoryImpl";
import { HistoricalFigureRepositoryImpl } from "@/data/repositories/HistoricalFigureRepositoryImpl";
import { SiteRepositoryImpl } from "@/data/repositories/SiteRepositoryImpl";
import { TraditionRepositoryImpl } from "@/data/repositories/TraditionRepositoryImpl";
import { ChronologyRepositoryImpl } from "@/data/repositories/ChronologyRepositoryImpl";
import { MemoryRepositoryImpl } from "@/data/repositories/MemoryRepositoryImpl";
import { AuthRepositoryImpl } from "@/data/repositories/AuthRepositoryImpl";
import { SearchRepositoryImpl } from "@/data/repositories/SearchRepositoryImpl";
import { StatsRepositoryImpl } from "@/data/repositories/StatsRepositoryImpl";

export const cityRepository: CityRepository = new CityRepositoryImpl();
export const storyRepository: StoryRepository = new StoryRepositoryImpl();
export const contributionRepository: ContributionRepository =
  new ContributionRepositoryImpl();
export const mapRepository: MapRepository = new MapRepositoryImpl();
export const culturalEventRepository: CulturalEventRepository =
  new CulturalEventRepositoryImpl();
export const quizRepository: QuizRepository = new QuizRepositoryImpl();
export const leaderboardRepository: LeaderboardRepository = new LeaderboardRepositoryImpl();
export const historicalFigureRepository: HistoricalFigureRepository =
  new HistoricalFigureRepositoryImpl();
export const siteRepository: SiteRepository = new SiteRepositoryImpl();
export const traditionRepository: TraditionRepository = new TraditionRepositoryImpl();
export const chronologyRepository: ChronologyRepository = new ChronologyRepositoryImpl();
export const memoryRepository: MemoryRepository = new MemoryRepositoryImpl();
export const authRepository: AuthRepository = new AuthRepositoryImpl();
export const searchRepository: SearchRepository = new SearchRepositoryImpl();
export const statsRepository: StatsRepository = new StatsRepositoryImpl();
