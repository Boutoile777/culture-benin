import { useMemo, useRef } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { HeroCarousel, type HeroSlide } from "@/presentation/components/home/HeroCarousel";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { SiteCard } from "@/presentation/components/ui/SiteCard";
import { StoryCard } from "@/presentation/components/ui/StoryCard";
import { QuickLinkCard } from "@/presentation/components/ui/QuickLinkCard";
import { StatTile } from "@/presentation/components/ui/StatTile";
import { TestimonialRow } from "@/presentation/components/ui/TestimonialRow";
import { Skeleton, CardGridSkeleton } from "@/presentation/components/ui/Skeleton";
import {
  useCities,
  useFeaturedStories,
  usePlatformStats,
  useRecentTestimonials,
  useSites,
} from "@/presentation/queries";
import { HERO_HIGHLIGHTS_MOCK } from "@/data/datasources/local/heroHighlights.mock";
import {
  QUICK_LINKS,
  type CollectionStat,
} from "@/shared/constants/homeStaticContent";

const HERO_CITY_NAMES = ["Ouidah", "Porto-Novo", "Abomey"];

// Chaque section s'affiche dès que SA requête répond (rendu progressif) :
// le hero n'attend pas les contributions, et inversement.
export function HomePage() {
  const citiesQuery = useCities();
  const sitesQuery = useSites();
  const storiesQuery = useFeaturedStories(4);
  const testimonialsQuery = useRecentTestimonials(3);
  const { data: stats } = usePlatformStats();
  const citiesSectionRef = useRef<HTMLDivElement>(null);

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

  const cityNameById = useMemo(() => {
    const map = new Map<string, string>();
    (cities ?? []).forEach((city) => map.set(city.id, city.name));
    return map;
  }, [cities]);

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

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        {citiesQuery.isPending ? (
          <Skeleton className="h-[420px] w-full rounded-none sm:h-[520px]" />
        ) : (
          <HeroCarousel
            slides={heroSlides}
            onExploreClick={() =>
              citiesSectionRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
        )}

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
          {sitesQuery.isPending ? (
            <CardGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(sitesQuery.data ?? []).slice(0, 8).map((site) => (
                <SiteCard key={site.id} site={site} cityName={cityNameById.get(site.cityId)} />
              ))}
            </div>
          )}
        </section>

        <section className="border-y border-gray-200 bg-[#fafaf8] py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-7">
              <SectionHeading kicker="Récits & transmission" title="Histoires remarquables" />
            </div>
            {storiesQuery.isPending ? (
              <CardGridSkeleton />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(storiesQuery.data ?? []).map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            )}
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
              {testimonialsQuery.isPending ? (
                <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-[72px] w-full rounded-2xl" />
                  ))}
                </div>
              ) : (testimonialsQuery.data ?? []).length === 0 ? (
                <p className="border-t border-gray-200 pt-4 text-[13.5px] text-gray-500">
                  Aucune contribution publiée pour le moment.
                </p>
              ) : (
                <div className="flex flex-col border-t border-gray-200">
                  {(testimonialsQuery.data ?? []).map((testimonial) => (
                    <TestimonialRow key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
