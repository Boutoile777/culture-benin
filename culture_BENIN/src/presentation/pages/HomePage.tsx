import { useMemo, useRef } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { useHomeContent } from "@/presentation/hooks/useHomeContent";
import { HeroCarousel } from "@/presentation/components/home/HeroCarousel";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { SiteCard } from "@/presentation/components/ui/SiteCard";
import { StoryCard } from "@/presentation/components/ui/StoryCard";
import { QuickLinkCard } from "@/presentation/components/ui/QuickLinkCard";
import { StatTile } from "@/presentation/components/ui/StatTile";
import { ContributionRow } from "@/presentation/components/ui/ContributionRow";
import { Skeleton, CardGridSkeleton } from "@/presentation/components/ui/Skeleton";
import { usePlatformStats } from "@/presentation/queries";
import {
  QUICK_LINKS,
  type CollectionStat,
} from "@/shared/constants/homeStaticContent";

export function HomePage() {
  const { content, isLoading } = useHomeContent();
  const { data: stats } = usePlatformStats();
  const citiesSectionRef = useRef<HTMLDivElement>(null);

  const collectionStats = useMemo<CollectionStat[]>(() => {
    const format = (count: number | undefined) =>
      count === undefined ? "—" : count.toLocaleString("fr-FR");
    return [
      {
        value: format(stats?.media.image),
        label: "Photographies",
        description: "Sites, rites et vie quotidienne",
      },
      {
        value: format(stats?.media.video),
        label: "Vidéos & visites 360°",
        description: "Immersions et documentaires",
      },
      {
        value: format(stats?.media.audio),
        label: "Archives sonores",
        description: "Chants, contes et récits oraux",
      },
      {
        value: format(
          stats ? stats.content.stories + stats.content.testimonials : undefined,
        ),
        label: "Récits & témoignages",
        description: "Mémoires écrites et orales",
      },
    ];
  }, [stats]);

  const cityNameById = useMemo(() => {
    const map = new Map<string, string>();
    content?.cities.forEach((city) => map.set(city.id, city.name));
    return map;
  }, [content]);

  if (isLoading || !content) {
    return (
      <MainLayout>
        <div>
          <Skeleton className="h-[420px] w-full rounded-none sm:h-[520px]" />
          <section className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:pt-14">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-[88px] w-full rounded-2xl" />
              ))}
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
            <Skeleton className="mb-6 h-8 w-64" />
            <CardGridSkeleton />
          </section>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <HeroCarousel
          slides={content.heroSlides}
          onExploreClick={() =>
            citiesSectionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <section className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:pt-14">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <QuickLinkCard key={link.title} link={link} />
            ))}
          </div>
        </section>

        <section ref={citiesSectionRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="mb-6">
            <SectionHeading
              kicker="Découvrez le Bénin autrement"
              title="Lieux culturels à explorer"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.sites.slice(0, 8).map((site) => (
              <SiteCard key={site.id} site={site} cityName={cityNameById.get(site.cityId)} />
            ))}
          </div>
        </section>

        <section className="border-y border-gray-200 bg-[#fafaf8] py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-7">
              <SectionHeading kicker="Récits & transmission" title="Histoires remarquables" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-6">
                <SectionHeading kicker="Archives vivantes" title="Collections multimédias" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {collectionStats.map((stat) => (
                  <StatTile key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-6">
                <SectionHeading kicker="Communauté" title="Dernières contributions" />
              </div>
              <div className="flex flex-col border-t border-gray-200">
                {content.recentContributions.map((contribution) => (
                  <ContributionRow
                    key={contribution.id}
                    contribution={contribution}
                    cityName={cityNameById.get(contribution.cityId) ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
