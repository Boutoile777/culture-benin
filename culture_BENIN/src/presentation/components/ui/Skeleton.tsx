interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />;
}

export function DetailPageSkeleton() {
  return (
    <div>
      <Skeleton className="h-[320px] w-full rounded-none sm:h-[440px]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:py-16">
        <Skeleton className="h-4 w-40" />
        {[0, 1, 2].map((row) => (
          <div key={row} className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CardGridSkeletonProps {
  count?: number;
}

export function CardGridSkeleton({ count = 4 }: CardGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-[18px]"
        >
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
