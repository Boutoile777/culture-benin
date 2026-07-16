import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import { BackLink } from "@/presentation/components/common/BackLink";
import { StoryCard } from "@/presentation/components/ui/StoryCard";
import { useStories } from "@/presentation/queries";

const ALL_CATEGORY = "Tout";

const RECIT_TABS: { label: string; value: string }[] = [
  { label: "Tout", value: ALL_CATEGORY },
  { label: "Résistances", value: "Résistance" },
  { label: "Spiritualités", value: "Spiritualité" },
  { label: "Histoires contemporaines", value: "Histoire contemporaine" },
  { label: "Contes", value: "Conte" },
];

export function RecitsListPage() {
  const [searchParams] = useSearchParams();
  const { data: stories } = useStories();
  const activeCategory = searchParams.get("categorie") ?? ALL_CATEGORY;
  const cityFilter = searchParams.get("city");

  const filteredStories = useMemo(
    () =>
      (stories ?? []).filter(
        (story) =>
          (activeCategory === ALL_CATEGORY || story.category === activeCategory) &&
          (!cityFilter || story.cityName === cityFilter),
      ),
    [stories, activeCategory, cityFilter],
  );

  const filteredCityName = cityFilter ?? undefined;

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <BackLink to="/explorer" label="Retour à Explorer" className="mb-4" />
          <SectionHeading
            kicker="Explorer · Récits & transmission"
            title={
              filteredCityName
                ? `Récits — ${filteredCityName}`
                : activeCategory === ALL_CATEGORY
                  ? "Récits historiques du Bénin"
                  : `Récits — ${activeCategory}`
            }
          />
          <p className="mb-8 mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-gray-500">
            Résistance, mémoire, spiritualité, ingéniosité, contes — chaque
            récit a sa page dédiée avec des images explicatives.
          </p>

          <nav className="mb-10 flex flex-wrap gap-2.5">
            {RECIT_TABS.map((tab) => {
              const isActive = activeCategory === tab.value;
              const to =
                tab.value === ALL_CATEGORY
                  ? "/explorer/recits"
                  : `/explorer/recits?categorie=${encodeURIComponent(tab.value)}`;
              return (
                <Link
                  key={tab.value}
                  to={to}
                  className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                    isActive
                      ? "border-culture-green bg-culture-green text-white"
                      : "border-gray-300 text-culture-ink hover:border-culture-green hover:text-culture-green"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {filteredStories.length === 0 ? (
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
