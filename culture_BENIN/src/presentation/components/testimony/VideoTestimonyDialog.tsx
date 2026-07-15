import { useState, type MouseEvent } from "react";
import type { Testimony } from "@/domain/entities/Testimony";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";

interface VideoTestimonyDialogProps {
  testimony: Testimony;
  onClose: () => void;
}

export function VideoTestimonyDialog({ testimony, onClose }: VideoTestimonyDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={stopPropagation}
        className="relative w-full max-w-[640px] overflow-hidden rounded-[20px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-culture-ink transition-colors hover:bg-white"
        >
          ✕
        </button>

        {testimony.mediaUrl ? (
          <video
            src={testimony.mediaUrl}
            poster={testimony.image}
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="block h-[280px] w-full bg-black object-contain sm:h-[360px]"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying((current) => !current)}
            className="relative block h-[280px] w-full sm:h-[360px]"
          >
            <ImageWithSkeleton
              src={testimony.image}
              alt={testimony.title}
              eager
              fallbackLabel={testimony.title}
              className={`h-full w-full object-cover transition-[filter] duration-300 ${isPlaying ? "brightness-50" : "brightness-90"}`}
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-culture-ink">
                {isPlaying ? "❙❙" : "▶"}
              </span>
            </span>
          </button>
        )}

        <div className="flex flex-col gap-2 p-6 sm:p-8">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
            Témoignage vidéo
          </span>
          <h3 className="font-display text-[20px] font-semibold leading-tight text-culture-ink">
            {testimony.title}
          </h3>
          <span className="text-[13px] text-gray-500">
            {testimony.speaker}
            {testimony.duration ? ` · ${testimony.duration}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
