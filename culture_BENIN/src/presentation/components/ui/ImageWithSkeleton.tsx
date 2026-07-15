import { useState, type ImgHTMLAttributes } from "react";
import { Skeleton } from "@/presentation/components/ui/Skeleton";

interface ImageWithSkeletonProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onError" | "onLoad" | "loading"> {
  fallbackLabel?: string;
  // Above-the-fold images (hero banners, first carousel slide) should stay eager to avoid hurting LCP.
  eager?: boolean;
}

export function ImageWithSkeleton({
  className,
  fallbackLabel,
  eager = false,
  alt,
  ...imgProps
}: ImageWithSkeletonProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "errored">("loading");

  if (status === "errored") {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-[#e6e3da] text-xs text-gray-400 ${className ?? ""}`}
      >
        {fallbackLabel ?? "Image indisponible"}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {status === "loading" && <Skeleton className={`absolute inset-0 ${className ?? ""}`} />}
      <img
        {...imgProps}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("errored")}
        className={className}
      />
    </div>
  );
}
