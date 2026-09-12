"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog"
import { fadeInUp } from "@/lib/animations"
import { tagToSlug } from "@/lib/tags"

interface FeaturedPostsProps {
  posts: BlogPost[]
}

/**
 * Editorial "selected writing" section.
 *
 * Big serif headline with an accent brace, then posts listed as
 * numbered editorial rows (not cards). Reads like a magazine's
 * table of contents rather than a Pinterest board.
 */
export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  return (
    <motion.section
      variants={fadeInUp}
      aria-labelledby="featured-posts-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        numeral="03"
        eyebrow="Filed under"
        title="Selected writing"
        rightSlot={
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-widest text-foreground hover:text-accent-hot"
          >
            All posts
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        }
      />

      <ol className="mt-10 divide-y-2 divide-foreground/15 border-y-2 border-foreground">
        {posts.map((post, index) => {
          const primaryTag = post.tags?.[0]
          return (
            <motion.li
              key={post.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.08 }}
              className="group"
            >
              <Link
                href={`/blog/${post.id}`}
                className="grid grid-cols-12 items-baseline gap-4 px-2 py-6 transition-colors hover:bg-accent-lime/20"
              >
                <span className="col-span-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground md:col-span-1">
                  0{index + 1}
                </span>

                <div className="col-span-10 md:col-span-8">
                  <h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-accent-hot sm:text-3xl md:text-4xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                    {post.excerpt}
                  </p>
                </div>

                <div className="col-span-12 flex flex-wrap items-center gap-3 font-mono text-micro uppercase tracking-widest text-muted-foreground md:col-span-3 md:justify-end">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                  {primaryTag && (
                    <span
                      onClick={(e) => e.preventDefault()}
                      className="sticker-lime hidden md:inline-flex"
                    >
                      {primaryTag}
                    </span>
                  )}
                </div>
              </Link>
            </motion.li>
          )
        })}
      </ol>
    </motion.section>
  )
}

function SectionHeading({
  numeral,
  eyebrow,
  title,
  rightSlot,
}: {
  numeral: string
  eyebrow: string
  title: string
  rightSlot?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-baseline gap-4">
          <span className="column-numeral">{numeral}</span>
          <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-3 font-serif text-4xl leading-none tracking-tightest md:text-6xl">
          {title}
        </h2>
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </div>
  )
}

// Re-exported so other sections can share the same heading style.
export { SectionHeading }
