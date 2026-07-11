import { useEffect, useState } from "react";

interface GalleryLightboxProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

export function GalleryLightbox({ images, initialIndex, alt, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const hasMultiple = images.length > 1;

  const goPrev = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const goNext = () => setIndex((current) => (current + 1) % images.length);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (hasMultiple && event.key === "ArrowLeft") goPrev();
      if (hasMultiple && event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMultiple, onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-5">
        <span className="text-[12.5px] font-semibold text-white/70">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la galerie"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
        <img
          src={images[index]}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onClick={(event) => event.stopPropagation()}
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:bg-black/70 sm:left-6"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:bg-black/70 sm:right-6"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}
