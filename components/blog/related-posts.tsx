import Link from "next/link"
import { BlogPost } from "@/lib/blog"
import { CalendarIcon, Clock, ArrowRight } from "lucide-react"

interface RelatedPostsProps {
  currentPostId: string
  currentTags: string[]
  allPosts: BlogPost[]
}

export function RelatedPosts({ currentPostId, currentTags, allPosts }: RelatedPostsProps) {
  const related = allPosts
    .filter(p => p.id !== currentPostId)
    .map(p => ({
      post: p,
      shared: p.tags.filter(t => currentTags.includes(t)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map(({ post }) => post)

  if (related.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-border/50">
      <h2 className="text-xl font-bold mb-6">Related Posts</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group flex flex-col p-4 border border-border/50 rounded-lg hover:border-primary hover:shadow-sm transition-all"
          >
            <h3 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3 text-primary/70" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary/70" />
                  {post.readingTime}
                </span>
              )}
            </div>
            <span className="flex items-center text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Read post <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
