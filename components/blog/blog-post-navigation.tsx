import Link from "next/link"
import { BlogPost } from "@/lib/blog"

interface BlogPostNavigationProps {
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}

export function BlogPostNavigation({
  previousPost,
  nextPost,
}: BlogPostNavigationProps) {
  if (!previousPost && !nextPost) return null

  return (
    <nav
      aria-label="Adjacent posts"
      className="mt-16 grid grid-cols-1 gap-4 border-t-2 border-foreground pt-8 md:grid-cols-2"
    >
      {previousPost && (
        <Link
          href={`/blog/${previousPost.id}`}
          className="card-brutal group flex flex-col gap-2 p-5"
        >
          <span className="flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Previous post
          </span>
          <span className="font-serif text-xl leading-tight md:text-2xl">
            {previousPost.title}
          </span>
        </Link>
      )}

      {nextPost && (
        <Link
          href={`/blog/${nextPost.id}`}
          className={
            "card-brutal group flex flex-col gap-2 p-5 " +
            (previousPost ? "md:text-right" : "md:col-span-2")
          }
        >
          <span
            className={
              "flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground " +
              (previousPost ? "md:justify-end" : "")
            }
          >
            Next post
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
          <span className="font-serif text-xl leading-tight md:text-2xl">
            {nextPost.title}
          </span>
        </Link>
      )}
    </nav>
  )
}
