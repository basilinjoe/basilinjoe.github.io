"use client"

import { SocialShare } from "@/components/blog-share"

interface BlogPostSharingSectionProps {
  title: string
  url: string
}

export function BlogPostSharingSection({ title, url }: BlogPostSharingSectionProps) {
  return (
    <div className="mt-12 pt-8 border-t border-border/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-wrap">
        <span className="text-sm font-medium text-primary">Share this post:</span>
        <SocialShare 
          title={title} 
          url={url} 
        />
      </div>
    </div>
  )
}
