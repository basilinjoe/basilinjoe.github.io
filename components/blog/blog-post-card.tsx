"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"

interface BlogPostCardProps {
  post: BlogPost
  index: number
  onTagClick: (tag: string) => void
  searchQuery?: string
  featured?: boolean
}

/** Highlights matching text inside search results. */
function Highlight({ text, query }: { text: string; query?: string }) {
  if (!query || !query.trim()) return <>{text}</>
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escaped})`, "gi")
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-accent-lime px-0.5 not-italic text-accent-lime-foreground"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Editorial post card — brutalist thick border, offset shadow, sticker
 * metadata row. The featured variant spans two columns and gets a bigger
 * type ramp so it reads as the lede.
 */
export default function BlogPostCard({
  post,
  index,
  onTagClick,
  searchQuery,
  featured = false,
}: BlogPostCardProps) {
  const primaryTag = post.tags?.[0]

  if (featured) {
    return (
      <motion.article
        variants={fadeInUp}
        transition={{ delay: 0 }}
        className="card-brutal group col-span-1 flex flex-col sm:col-span-2"
      >
        {/* Kicker strip */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-foreground bg-accent-hot px-5 py-2 text-accent-hot-foreground">
          <span className="font-mono text-micro font-bold uppercase tracking-widest">
            Lede · 01
          </span>
          <span className="font-mono text-micro font-bold uppercase tracking-widest">
            Featured
          </span>
        </div>

        <div className="flex flex-col gap-3 p-6 md:p-8">
          {primaryTag && (
            <span className="font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
              Filed under {primaryTag}
            </span>
          )}

          <h2 className="font-serif text-3xl leading-[1.05] tracking-tight transition-colors group-hover:text-accent-hot sm:text-4xl md:text-5xl">
            <Link href={`/blog/${post.id}`} className="line-clamp-3">
              <Highlight text={post.title} query={searchQuery} />
            </Link>
          </h2>

          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            <Highlight text={post.excerpt} query={searchQuery} />
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags?.slice(1, 5).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault()
                  onTagClick(tag)
                }}
                className="sticker cursor-pointer transition-colors hover:bg-accent-lime hover:text-accent-lime-foreground"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-foreground/10 pt-4 font-mono text-micro uppercase tracking-widest text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime}</span>
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-3 py-1.5 text-background transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-hot hover:text-accent-hot-foreground hover:shadow-brutal-sm"
            >
              Read
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={fadeInUp}
      transition={{ delay: index * 0.06 }}
      className="card-brutal group flex flex-col"
    >
      <div className="flex items-center justify-between gap-2 border-b-2 border-foreground/70 px-4 py-1.5">
        <span className="font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        {primaryTag && (
          <span className="font-mono text-micro font-bold uppercase tracking-widest text-accent-hot">
            {primaryTag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-xl leading-tight transition-colors group-hover:text-accent-hot sm:text-2xl">
          <Link href={`/blog/${post.id}`} className="line-clamp-3">
            <Highlight text={post.title} query={searchQuery} />
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          <Highlight text={post.excerpt} query={searchQuery} />
        </p>

        {post.tags && post.tags.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(1, 4).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault()
                  onTagClick(tag)
                }}
                className="sticker cursor-pointer transition-colors hover:bg-accent-lime hover:text-accent-lime-foreground"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t-2 border-foreground/10 pt-3 font-mono text-micro uppercase tracking-widest text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </motion.article>
  )
}
