"use client"

import Image from "next/image"
import Link from "next/link"
import { BlogPost } from "@/lib/blog"
import { tagToSlug } from "@/lib/tags"
import { siteConfig } from "@/config/site"

interface BlogPostHeaderProps {
  post: BlogPost
}

/**
 * Editorial post header — big serif title, byline strip with mono metadata,
 * sticker tag row. Reads like a longform-magazine kicker.
 */
export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="mb-10 border-b-2 border-foreground pb-8">
      {/* Kicker: file-number style label */}
      <p className="mb-4 font-mono text-micro font-bold uppercase tracking-widest text-accent-hot">
        Field notes ·{" "}
        {post.tags?.[0] ? (
          <Link
            href={`/blog/tag/${tagToSlug(post.tags[0])}`}
            className="hover:text-foreground"
          >
            {post.tags[0]}
          </Link>
        ) : (
          "Writing"
        )}
      </p>

      <h1 className="font-serif text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        {post.title}
      </h1>

      {/* Byline strip */}
      <div className="mt-8 flex flex-wrap items-center gap-4 border-y-2 border-foreground py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/avatar.webp"
            alt={siteConfig.name}
            width={40}
            height={40}
            className="border-2 border-foreground"
          />
          <div>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-bold uppercase tracking-wider hover:text-accent-hot"
            >
              {siteConfig.name}
            </Link>
            <p className="font-mono text-micro uppercase tracking-widest text-muted-foreground">
              {siteConfig.position}
            </p>
          </div>
        </div>

        <span aria-hidden className="hidden h-8 w-px bg-foreground/20 md:block" />

        <dl className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-micro uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Published</dt>
            <dd>
              <time dateTime={post.date}>{dateLabel}</time>
            </dd>
          </div>
          {post.modified && post.modified !== post.date && (
            <div className="flex items-center gap-1.5">
              <dt>Updated</dt>
              <dd>
                <time dateTime={post.modified}>
                  {new Date(post.modified).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </dd>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Reading time</dt>
            <dd>{post.readingTime}</dd>
          </div>
        </dl>
      </div>

      {/* Tag stickers */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tagToSlug(tag)}`}>
              <span className="sticker transition-colors hover:bg-accent-lime hover:text-accent-lime-foreground">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
