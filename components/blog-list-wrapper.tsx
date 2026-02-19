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
    <div className="relative overflow-x-hidden">
      {/* Background elements for visual consistency */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
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
        
        {/* Bento posts grid skeleton */}
        <div className="grid gap-4 sm:gap-5 px-4 sm:px-6 md:px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured card — spans 2 cols */}
          <div className="col-span-1 sm:col-span-2 rounded-xl border border-border/60 overflow-hidden animate-pulse flex flex-col sm:flex-row" style={{ minHeight: '220px' }}>
            <div className="bg-muted sm:w-[52%] flex-shrink-0" style={{ minHeight: '220px' }} />
            <div className="flex flex-col flex-1 p-5 sm:p-7 gap-3 justify-center">
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-8 w-28 mt-2" />
            </div>
          </div>
          {/* Regular cards */}
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={`post-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}