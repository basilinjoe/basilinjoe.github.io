"use client"

import { Suspense } from "react"
import BlogList from "./blog-list"
import { BlogPost } from "@/lib/blog"
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton"

interface BlogListWrapperProps {
  allPosts: BlogPost[]
  allTags: string[]
}

export default function BlogListWrapper({ allPosts, allTags }: BlogListWrapperProps) {
  return (
    <Suspense fallback={<BlogListFallback />}>
      <BlogList allPosts={allPosts} allTags={allTags} />
    </Suspense>
  )
}

/**
 * Loading state for the blog index.
 *
 * This is a real user-facing surface, so it follows the editorial-tech system
 * rather than the soft gradient language it shipped with: 2px borders, hard
 * offset shadows, square corners. Its block sizes mirror the real layout so the
 * page does not jump when the list arrives.
 */
function BlogListFallback() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="container grid grid-cols-1 gap-6 pb-12 pt-8 md:py-10">
        {/* Breadcrumb */}
        <div className="px-4 sm:px-6 md:px-0">
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Header */}
        <div className="flex max-w-[980px] flex-col items-start gap-3 px-4 sm:px-6 md:px-0">
          <Skeleton className="h-12 w-56" />
          <div className="h-[2px] w-20 bg-foreground/20" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>

        {/* Search */}
        <div className="max-w-md px-4 sm:px-6 md:px-0">
          <Skeleton className="h-10 w-full border-2 border-foreground/20" />
        </div>

        {/* Tag filter row */}
        <div className="flex flex-wrap gap-2 px-4 sm:px-6 md:px-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={`tag-${i}`} className="h-7 w-16" />
          ))}
        </div>

        {/* Post grid — featured card spans two columns, matching the real grid */}
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-5 sm:px-6 lg:grid-cols-3 md:px-0">
          <div className="col-span-1 flex min-h-[220px] flex-col border-2 border-foreground bg-card shadow-brutal-sm sm:col-span-2 sm:flex-row">
            <div className="min-h-[220px] flex-shrink-0 animate-pulse border-b-2 border-foreground bg-muted sm:w-[52%] sm:border-b-0 sm:border-r-2" />
            <div className="flex flex-1 flex-col justify-center gap-3 p-5 sm:p-7">
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="mt-2 h-8 w-28" />
            </div>
          </div>

          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={`post-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
