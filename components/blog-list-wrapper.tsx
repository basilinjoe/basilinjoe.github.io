"use client"

import { Suspense } from "react"
import BlogList from "./blog-list"
import { BlogPost } from "@/lib/blog"

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
      {/* Background elements for visual consistency */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <div className="container grid items-center gap-8 pb-12 pt-8 md:py-10">
        {/* Header skeleton */}
        <div className="flex max-w-[980px] flex-col items-start gap-2 px-4 sm:px-6 md:px-0">
          <div className="h-10 w-32 bg-muted/60 rounded-md animate-pulse"></div>
          <div className="h-1 w-20 bg-primary/30 rounded-full mb-2"></div>
          <div className="h-6 w-96 bg-muted/60 rounded-md animate-pulse"></div>
        </div>
        
        {/* Tag filter skeleton */}
        <div className="flex flex-wrap gap-2 mb-6 px-4 sm:px-6 md:px-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={`tag-${i}`}
              className="h-7 w-16 bg-muted/60 rounded-full animate-pulse"
            />
          ))}
        </div>
        
        {/* Posts grid skeleton */}
        <div className="grid gap-5 sm:gap-6 px-4 sm:px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={`post-${i}`}
              className="group relative rounded-lg border border-border/60 p-5 sm:p-6 
                bg-gradient-to-br from-primary/5 to-background
                animate-pulse flex flex-col gap-3 h-64"
            >
              <div className="h-7 w-3/4 bg-muted/60 rounded-md"></div>
              <div className="flex gap-2">
                <div className="h-4 w-20 bg-muted/60 rounded-sm"></div>
                <div className="h-4 w-4 bg-muted/60 rounded-full"></div>
                <div className="h-4 w-20 bg-muted/60 rounded-sm"></div>
              </div>
              <div className="flex gap-1">
                <div className="h-5 w-12 bg-muted/60 rounded-full"></div>
                <div className="h-5 w-14 bg-muted/60 rounded-full"></div>
              </div>
              <div className="h-12 w-full bg-muted/60 rounded-md"></div>
              <div className="mt-auto">
                <div className="h-8 w-24 bg-muted/60 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}