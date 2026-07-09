import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import type { City } from "@/domain/entities/City";
import type { Story } from "@/domain/entities/Story";
import { cityRepository, storyRepository } from "@/infrastructure/config/repositories";

export function StoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null | undefined>(undefined);
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    if (!storyId) return;
    let cancelled = false;
    setStory(undefined);
    storyRepository.getById(storyId).then(async (result) => {
      if (cancelled) return;
      setStory(result);
      if (result?.cityId) {
        const relatedCity = await cityRepository.getById(result.cityId);
        if (!cancelled) setCity(relatedCity);
      } else {
        setCity(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [storyId]);

  if (story === undefined) {
    return (
      <MainLayout>
        <div className="flex h-[400px] items-center justify-center text-gray-400">
          Chargement…
        </div>
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
          <img
            src={story.image}
            alt={story.title}
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

          <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
            {story.excerpt}
          </p>
          <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-gray-600">
            {story.content}
          </p>

          {story.gallery && story.gallery.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h2 className="mb-4 font-display text-[20px] font-medium text-culture-ink">
                Galerie
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {story.gallery.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={story.title}
                    className="h-[130px] w-full rounded-xl object-cover sm:h-[150px]"
                  />
                ))}
              </div>
            </div>
          )}

          {city && (
            <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-[#fafaf8] p-5">
              <span className="text-[13.5px] text-gray-500">
                Ce récit se déroule à <strong className="text-culture-ink">{city.name}</strong>.
              </span>
              <Link
                to={`/explorer/${city.id}`}
                className="whitespace-nowrap rounded-full bg-culture-green px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
              >
                Découvrir {city.name} →
              </Link>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
