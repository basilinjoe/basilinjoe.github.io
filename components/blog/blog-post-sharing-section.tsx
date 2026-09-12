"use client"

import { SocialShare } from "@/components/blog-share"

interface BlogPostSharingSectionProps {
  title: string
  url: string
}

export function BlogPostSharingSection({
  title,
  url,
}: BlogPostSharingSectionProps) {
  return (
    <div className="mt-12 border-y-2 border-foreground bg-accent-lime/20 px-4 py-5">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-3xl italic text-accent-hot">→</span>
          <span className="font-mono text-micro font-bold uppercase tracking-widest">
            Send this to someone
          </span>
        </div>
        <SocialShare title={title} url={url} />
      </div>
    </div>
  )
}
