import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { StoryCard } from "@/presentation/components/ui/StoryCard";
import type { Story } from "@/domain/entities/Story";
import { storyRepository } from "@/infrastructure/config/repositories";

const ALL_CATEGORY = "Tout";

export function RecitsListPage() {
  const [searchParams] = useSearchParams();
  const [stories, setStories] = useState<Story[]>([]);
  const activeCategory = searchParams.get("categorie") ?? ALL_CATEGORY;

  useEffect(() => {
    let cancelled = false;
    storyRepository.getAll().then((result) => {
      if (!cancelled) setStories(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const rubriques = useMemo(() => {
    const groups = new Map<string, Story[]>();
    for (const story of stories) {
      const group = groups.get(story.category) ?? [];
      group.push(story);
      groups.set(story.category, group);
    }
    return Array.from(groups.entries());
  }, [stories]);

  const filteredStories = useMemo(
    () =>
      stories.filter(
        (story) => activeCategory === ALL_CATEGORY || story.category === activeCategory,
      ),
    [stories, activeCategory],
  );

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <SectionHeading
            kicker="Explorer · Récits & transmission"
            title={
              activeCategory === ALL_CATEGORY
                ? "Récits historiques du Bénin"
                : `Récits — ${activeCategory}`
            }
          />
          <p className="mb-10 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Résistance, mémoire, spiritualité, ingéniosité, contes — chaque
            récit a sa page dédiée avec des images explicatives.
          </p>

          {activeCategory === ALL_CATEGORY ? (
            <div className="flex flex-col gap-12">
              {rubriques.map(([category, categoryStories]) => (
                <section key={category}>
                  <h2 className="mb-4 font-display text-[20px] font-semibold text-culture-ink">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categoryStories.map((story) => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : filteredStories.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucun récit dans cette rubrique pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
