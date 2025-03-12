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
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, ideas, and experiences.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="group relative rounded-lg border p-6 hover:shadow-md transition-all animate-pulse h-64"
          />
        ))}
      </div>
    </div>
  )
}