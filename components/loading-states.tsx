import { Skeleton, SkeletonText, SkeletonHeading, SkeletonButton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileSectionSkeleton() {
  return (
    <div className="flex max-w-[980px] flex-col items-start gap-4 px-4 sm:px-6 md:px-0 relative">
      <div className="flex flex-col md:flex-row md:items-start p-6 rounded-xl w-full">
        <div className="flex justify-center mb-6 md:mb-0 md:mr-8">
          <Skeleton className="w-40 h-40 rounded-full" />
        </div>
        <div className="flex-1 space-y-4">
          <SkeletonHeading className="h-12 w-64" />
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
          <SkeletonText lines={3} className="max-w-2xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function WorkHighlightsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="relative overflow-hidden">
          <CardContent className="p-6">
            <Skeleton className="h-12 w-12 rounded-lg mb-4" />
            <SkeletonHeading className="h-6 w-32 mb-2" />
            <SkeletonText lines={2} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <SkeletonHeading className="h-6 w-32 mb-4" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
      <div>
        <SkeletonHeading className="h-6 w-32 mb-4" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <SkeletonHeading className="h-7 w-48" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
        <SkeletonText lines={2} className="mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function BlogPostSkeleton() {
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <SkeletonHeading className="h-12 w-3/4 mb-4" />
        <div className="flex items-center gap-4 text-sm">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <SkeletonText lines={4} className="mb-4" />
        <SkeletonText lines={6} className="mb-4" />
        <SkeletonHeading className="h-8 w-64 mb-4" />
        <SkeletonText lines={5} className="mb-4" />
        <Skeleton className="h-64 w-full rounded-lg mb-4" />
        <SkeletonText lines={4} />
      </div>
    </article>
  )
}