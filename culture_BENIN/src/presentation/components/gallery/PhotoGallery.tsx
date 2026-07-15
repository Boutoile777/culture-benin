import { useState } from "react";
import { GalleryLightbox } from "@/presentation/components/gallery/GalleryLightbox";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";

interface PhotoGalleryProps {
  images: string[];
  alt: string;
}

export function PhotoGallery({ images, alt }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <div className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="mb-4 font-display text-[20px] font-medium text-culture-ink">Galerie</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="block overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-culture-green"
          >
            <ImageWithSkeleton
              src={image}
              alt={alt}
              className="h-[130px] w-full object-cover transition-transform duration-200 hover:scale-105 sm:h-[150px]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          images={images}
          initialIndex={openIndex}
          alt={alt}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}
