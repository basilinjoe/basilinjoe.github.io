import Link from "next/link"
import { BlogPost } from "@/lib/blog"

interface RelatedPostsProps {
  currentPostId: string
  currentTags: string[]
  allPosts: BlogPost[]
}

export function RelatedPosts({
  currentPostId,
  currentTags,
  allPosts,
}: RelatedPostsProps) {
  const related = allPosts
    .filter((p) => p.id !== currentPostId)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map(({ post }) => post)

  if (related.length === 0) return null

  return (
    <section
      aria-labelledby="related-heading"
      className="mt-16 border-t-2 border-foreground pt-8"
    >
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-serif text-4xl italic text-accent-hot">§</span>
        <h2
          id="related-heading"
          className="font-serif text-2xl leading-tight md:text-3xl"
        >
          Related dispatches
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {related.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="card-brutal group flex flex-col gap-2 p-5"
          >
            <span className="font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
              0{i + 1} · {post.readingTime}
            </span>
            <h3 className="font-serif text-lg leading-tight transition-colors group-hover:text-accent-hot md:text-xl">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {post.excerpt}
            </p>
            <span className="mt-auto font-mono text-micro uppercase tracking-widest text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
