import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Loading placeholders in the editorial-tech system: sharp corners, flat muted
 * fill, no gradients or large radii.
 *
 * `animate-pulse` is deliberately left running under `prefers-reduced-motion`
 * (see the note in the reduced-motion block in globals.css): it is opacity-only,
 * and it is the only signal that content is loading.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-none bg-muted", className)}
      {...props}
    />
  )
}

/**
 * Card-shaped placeholder. Matches `.card-brutal`'s footprint — 2px border and a
 * hard offset shadow — so the layout does not shift when the real card arrives.
 */
export function SkeletonCard() {
  return (
    <div className="flex h-64 flex-col gap-3 border-2 border-foreground bg-card p-5 shadow-brutal-sm sm:p-6">
      <Skeleton className="h-7 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-14" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="mt-auto">
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-4/5" : "w-full"
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonHeading({ className }: { className?: string }) {
  return <Skeleton className={cn("h-8 w-48", className)} />
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10 w-32", className)} />
}
