import { useEffect, useState } from "react";

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  onExploreClick: () => void;
}

export function HeroCarousel({ slides, onExploreClick }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[index];
  if (!current) return null;

  const goPrev = () =>
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((current) => (current + 1) % slides.length);

  return (
    <section className="relative h-[480px] overflow-hidden bg-culture-ink sm:h-[540px] lg:h-[620px]">
      {slides.map((slide, i) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/75" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-14">
          <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:mb-4 sm:text-[11.5px] sm:tracking-[0.22em]">
            Le musée vivant du patrimoine béninois
          </div>
          <h1 className="mb-3 max-w-[720px] font-display text-[32px] font-medium leading-[1.1] text-white sm:mb-4 sm:text-[42px] lg:text-[58px] lg:leading-[1.06]">
            La mémoire vivante du Bénin
          </h1>
          <p className="mb-5 max-w-[540px] text-[14px] leading-relaxed text-white/85 sm:mb-6 sm:text-[16.5px]">
            Villes, royaumes, cascades et cavaliers — explorez librement le
            patrimoine matériel et immatériel du Bénin, sans inscription.
          </p>
          <button
            type="button"
            onClick={onExploreClick}
            className="rounded-full bg-white px-[22px] py-[11px] text-[13.5px] font-semibold text-culture-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gray-100 sm:px-[26px] sm:py-[13px] sm:text-[14.5px]"
          >
            Explorer une ville
          </button>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between sm:inset-x-auto sm:bottom-6 sm:right-6 sm:flex-col sm:items-end sm:justify-start sm:gap-3">
        <span className="hidden items-center gap-2.5 rounded-full border border-white/30 bg-black/55 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm sm:flex">
          {current.title}
          <span className="text-white/70">{current.subtitle}</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Diapositive précédente"
            className="hidden h-[38px] w-[38px] items-center justify-center rounded-full border border-white/40 bg-white/15 text-white hover:bg-white/30 sm:flex"
          >
            ←
          </button>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Aller à ${slide.title}`}
              onClick={() => setIndex(i)}
              className="h-[7px] rounded-full transition-all"
              style={{
                width: i === index ? "24px" : "8px",
                background: i === index ? "#fff" : "rgba(255,255,255,.45)",
              }}
            />
          ))}
          <button
            type="button"
            onClick={goNext}
            aria-label="Diapositive suivante"
            className="hidden h-[38px] w-[38px] items-center justify-center rounded-full border border-white/40 bg-white/15 text-white hover:bg-white/30 sm:flex"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
