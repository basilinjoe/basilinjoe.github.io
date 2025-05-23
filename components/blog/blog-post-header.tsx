"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BlogPost } from "@/lib/blog"

interface BlogPostHeaderProps {
  post: BlogPost
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="mb-4 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
        {post.title}
      </h1>
      
      <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2 mt-4">
        <time dateTime={post.date} className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>•</span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {post.readingTime}
        </span>
      </div>
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {post.tags.map(tag => {
            // Determine tag category based on content
            const tagLower = tag.toLowerCase();
            let variant: "tech" | "featured" | "secondary" | "skill" | "default" = "tech";
            
            if (tagLower.includes('react') || tagLower.includes('javascript') || tagLower.includes('frontend')) {
              variant = "featured";
            } else if (tagLower.includes('career') || tagLower.includes('productivity')) {
              variant = "secondary";
            } else if (tagLower.includes('ai') || tagLower.includes('machine learning')) {
              variant = "skill";
            }
            
            return (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge variant={variant} className="hover:bg-opacity-90 transition-all">
                  {tag}
                </Badge>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  )
}
