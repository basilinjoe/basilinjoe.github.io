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

function BlogListFallback() {
  return (
    <div className="relative overflow-hidden">
      <div className="container grid items-center gap-8 pb-12 pt-8 md:py-10">
        {/* Header skeleton */}
        <div className="flex max-w-[980px] flex-col items-start gap-2 px-4 sm:px-6 md:px-0">
          <Skeleton className="h-10 w-32" />
          <div className="h-1 w-20 bg-primary/30 rounded-full mb-2"></div>
          <Skeleton className="h-6 w-96 max-w-full" />
        </div>
        
        {/* Search skeleton */}
        <div className="mb-6 px-4 sm:px-6 md:px-0 max-w-md">
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* Tag filter skeleton */}
        <div className="flex flex-wrap gap-2 mb-6 px-4 sm:px-6 md:px-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton 
              key={`tag-${i}`}
              className="h-7 w-16 rounded-full"
            />
          ))}
        </div>
        
        {/* Posts grid skeleton */}
        <div className="grid gap-5 sm:gap-6 px-4 sm:px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={`post-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}