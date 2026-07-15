import { useRef, useState, type MouseEvent } from "react";
import type { Testimony } from "@/domain/entities/Testimony";
import { ImageWithSkeleton } from "@/presentation/components/ui/ImageWithSkeleton";

interface AudioTestimonyDialogProps {
  testimony: Testimony;
  onClose: () => void;
}

function EqualizerBars({ isPlaying }: { isPlaying: boolean }) {
  const bars = [6, 14, 9, 18, 7, 12, 5, 16, 8, 11];
  return (
    <div className="flex h-6 items-end gap-[3px]">
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-[3px] rounded-full bg-culture-green"
          style={{
            height: isPlaying ? `${height}px` : "4px",
            opacity: isPlaying ? 1 : 0.35,
            transition: "height 0.3s ease, opacity 0.3s ease",
            animation: isPlaying ? `eq 0.9s ease-in-out ${index * 0.07}s infinite` : "none",
          }}
        />
      ))}
    </div>
  );
}

export function AudioTestimonyDialog({ testimony, onClose }: AudioTestimonyDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  const togglePlayback = () => {
    if (!testimony.mediaUrl) {
      setIsPlaying((current) => !current);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <style>{`@keyframes eq { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }`}</style>
      <div
        onClick={stopPropagation}
        className="relative grid w-full max-w-[720px] grid-cols-1 overflow-hidden rounded-[20px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-culture-ink transition-colors hover:bg-white"
        >
          ✕
        </button>

        <div className="h-[220px] sm:h-full">
          <ImageWithSkeleton
            src={testimony.image}
            alt={testimony.title}
            eager
            fallbackLabel={testimony.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-culture-terracotta">
              Témoignage audio
            </span>
            <h3 className="mt-1.5 font-display text-[22px] font-semibold leading-tight text-culture-ink">
              {testimony.title}
            </h3>
            <span className="mt-1 block text-[13px] text-gray-500">
              {testimony.speaker}
            </span>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Mettre en pause" : "Lire"}
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-culture-green text-white transition-colors hover:bg-culture-green-dark"
            >
              {isPlaying ? "❙❙" : "▶"}
            </button>
            <div className="flex flex-1 flex-col gap-1">
              <EqualizerBars isPlaying={isPlaying} />
              {testimony.duration && (
                <span className="text-[11px] text-gray-500">{testimony.duration}</span>
              )}
            </div>
          </div>

          {testimony.mediaUrl && (
            <audio
              ref={audioRef}
              src={testimony.mediaUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          )}

          {testimony.transcript && (
            <div className="border-t border-gray-100 pt-4">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                Transcription
              </span>
              <p className="max-h-[180px] overflow-y-auto text-[13.5px] italic leading-relaxed text-gray-600">
                « {testimony.transcript} »
              </p>
            </div>
          )}

          <p className="text-[11px] text-gray-400">
            Multilingue à venir — transcription disponible en français pour le
            moment.
          </p>
        </div>
      </div>
    </div>
  );
}
