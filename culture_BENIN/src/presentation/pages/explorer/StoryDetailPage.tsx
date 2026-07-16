import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { PhotoGallery } from "@/presentation/components/gallery/PhotoGallery";
import { TestimonySection } from "@/presentation/components/testimony/TestimonySection";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";
import { DetailPageSkeleton } from "@/presentation/components/ui/Skeleton";
import { useFavorites, FAVORITES_STORAGE_KEYS } from "@/presentation/hooks/useFavorites";
import { useCityByName, useStory } from "@/presentation/queries";

// Résistance & Spiritualité racontent surtout par l'image (galerie) ; les
// contes et les récits plus factuels (mémoire, ingéniosité...) racontent
// plutôt par le son/l'image animée (multimédia).
const GALLERY_CATEGORIES = new Set(["Résistance", "Spiritualité"]);

export function StoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const storyQuery = useStory(storyId);
  const { favoriteIds, toggleFavorite } = useFavorites(FAVORITES_STORAGE_KEYS.stories);

  const story = storyQuery.data;
  const city = useCityByName(story?.cityName);

  if (story === undefined) {
    return (
      <MainLayout>
        <DetailPageSkeleton />
      </MainLayout>
    );
  }

  if (story === null) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <p className="text-[15px] text-gray-500">
            Ce récit n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/explorer/recits"
            className="mt-4 inline-block text-[13.5px] font-semibold text-culture-green hover:text-culture-terracotta"
          >
            ← Retour aux récits
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="relative h-[280px] overflow-hidden sm:h-[360px]">
          <ImageWithSkeleton
            src={story.image}
            alt={story.title}
            eager
            fallbackLabel={story.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-3xl flex-col gap-2 px-4 pb-8 sm:px-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              {story.category}
              {city ? ` · ${city.name}` : ""}
            </span>
            <h1 className="font-display text-[30px] font-semibold text-white sm:text-[38px]">
              {story.title}
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
          <Link
            to="/explorer/recits"
            className="mb-6 inline-block text-[12.5px] font-semibold text-gray-500 hover:text-culture-green"
          >
            ← Retour aux récits
          </Link>

          <div className="mb-8 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => toggleFavorite(story.id)}
              className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                favoriteIds.has(story.id)
                  ? "border-culture-terracotta text-culture-terracotta"
                  : "border-gray-300 text-culture-ink hover:border-culture-green hover:text-culture-green"
              }`}
            >
              {favoriteIds.has(story.id) ? "♥ Favori" : "♡ Ajouter aux favoris"}
            </button>
            {city && (
              <Link
                to={`/explorer/${city.id}`}
                className="rounded-full border border-gray-300 px-5 py-2.5 text-[13px] font-semibold text-culture-ink transition-colors duration-200 hover:border-culture-green hover:text-culture-green"
              >
                Découvrir {city.name}
              </Link>
            )}
          </div>

          <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
            {story.excerpt}
          </p>
          <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-gray-600">
            {story.content}
          </p>

          {GALLERY_CATEGORIES.has(story.category) ? (
            <PhotoGallery images={story.gallery ?? []} alt={story.title} />
          ) : (
            story.testimonies &&
            story.testimonies.length > 0 && (
              <div className="mt-10">
                <TestimonySection testimonies={story.testimonies} title="Multimédia" />
              </div>
            )
          )}
        </div>
      </main>
    </MainLayout>
  );
}
