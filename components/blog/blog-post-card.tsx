"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { siteConfig } from "@/config/site"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  onTagClick: (tag: string) => void;
  searchQuery?: string;
  featured?: boolean;
}

// Highlight matching text in search results
function Highlight({ text, query }: { text: string; query?: string }) {
  if (!query || !query.trim()) return <>{text}</>

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5 not-italic">{part}</mark>
          : part
      )}
    </>
  )
}

// Gradient fallback colours keyed by tags
function getGradientClass(tags: string[]): string {
  const tagStr = tags.join(' ').toLowerCase()
  if (tagStr.includes('react') || tagStr.includes('javascript') || tagStr.includes('typescript') || tagStr.includes('web'))
    return "from-blue-500/15 via-primary/10 to-background"
  if (tagStr.includes('ai') || tagStr.includes('machine learning') || tagStr.includes('artificial intelligence'))
    return "from-violet-500/15 via-fuchsia-500/10 to-background"
  if (tagStr.includes('devops') || tagStr.includes('cloud') || tagStr.includes('azure') || tagStr.includes('aws'))
    return "from-sky-500/15 via-cyan-500/10 to-background"
  if (tagStr.includes('career') || tagStr.includes('productivity'))
    return "from-emerald-500/15 via-teal-500/10 to-background"
  return "from-primary/10 via-primary/5 to-background"
}

export default function BlogPostCard({ post, index, onTagClick, searchQuery, featured = false }: BlogPostCardProps) {
  const gradientClass = getGradientClass(post.tags ?? [])

  if (featured) {
    return (
      <motion.article
        variants={fadeInUp}
        transition={{ delay: 0 }}
        className="group relative rounded-xl border border-border/60 overflow-hidden
          col-span-1 sm:col-span-2 flex flex-col sm:flex-row
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40"
      >
        {/* Cover image */}
        <Link
          href={`/blog/${post.id}`}
          className="block relative overflow-hidden flex-shrink-0 sm:w-[52%]"
          style={{ minHeight: '220px', height: '260px' }}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent sm:bg-gradient-to-r" />

          {/* Featured label */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="text-xs bg-primary text-primary-foreground">
              Featured
            </Badge>
            {post.tags && post.tags.length > 0 && (
              <Badge variant="tech" className="text-xs backdrop-blur-sm">
                {post.tags[0]}
              </Badge>
            )}
          </div>
        </Link>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 sm:p-7 justify-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.id}`} className="line-clamp-3">
              <Highlight text={post.title} query={searchQuery} />
            </Link>
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-3">
            <Highlight text={post.excerpt} query={searchQuery} />
          </p>

          {/* Extra tags */}
          {post.tags && post.tags.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(1, 5).map(tag => (
                <Badge
                  key={tag}
                  variant="tech"
                  className="text-xs cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    onTagClick(tag);
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Meta + CTA */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/30">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
            <div className="ml-auto">
              <Link
                href={`/blog/${post.id}`}
                className={buttonVariants({
                  size: "sm",
                  className: "gap-1.5 h-8 text-xs"
                })}
              >
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={fadeInUp}
      transition={{ delay: index * 0.07 }}
      className="group relative rounded-xl border border-border/60 overflow-hidden flex flex-col
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40"
    >
      {/* Cover image / gradient banner */}
      <Link href={`/blog/${post.id}`} className="block relative overflow-hidden" style={{ height: '160px' }}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

        {/* Category badge on the image */}
        {post.tags && post.tags.length > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="tech" className="text-xs backdrop-blur-sm">
              {post.tags[0]}
            </Badge>
          </div>
        )}
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold mb-2 leading-snug group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.id}`} className="line-clamp-2">
            <Highlight text={post.title} query={searchQuery} />
          </Link>
        </h2>

        {/* Excerpt — 2 lines */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          <Highlight text={post.excerpt} query={searchQuery} />
        </p>

        {/* Tags (skip first — already shown as category badge) */}
        {post.tags && post.tags.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(1, 4).map(tag => (
              <Badge
                key={tag}
                variant="tech"
                className="text-xs cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick(tag);
                }}
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs">+{post.tags.length - 4}</Badge>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="mt-auto space-y-3">
          {/* Author + metadata row */}
          <div className="flex items-center gap-2 pt-3 border-t border-border/30">
            {/* Avatar placeholder */}
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
              {siteConfig.name.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground truncate flex-1">{siteConfig.name}</span>
            <time className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
              <Calendar className="h-3 w-3" />
              {new Date(post.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
          </div>

          {/* Read time + CTA */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
            <Link
              href={`/blog/${post.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-7 text-xs border-primary/30 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
              })}
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
