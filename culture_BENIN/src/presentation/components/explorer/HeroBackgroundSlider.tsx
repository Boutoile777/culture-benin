import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

interface HeroBackgroundSliderProps {
  images: string[];
}

// Diaporama d'arrière-plan purement décoratif (fondu enchaîné, autoplay,
// aucune interaction) — le contenu de la section reste au-dessus du voile.
export function HeroBackgroundSlider({ images }: HeroBackgroundSliderProps) {
  if (images.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        speed={1500}
        loop={images.length > 1}
        allowTouchMove={false}
        className="h-full w-full"
      >
        {images.map((src) => (
          <SwiperSlide key={src}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Voile sombre pour la lisibilité du texte par-dessus les photos */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />
    </div>
  );
}
