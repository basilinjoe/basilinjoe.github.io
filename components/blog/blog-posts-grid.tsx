"use client"

import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog"
import BlogPostCard from "@/components/blog/blog-post-card"
import { fadeInUp } from "@/lib/animations"

interface BlogPostsGridProps {
  posts: BlogPost[]
  onTagClick: (tag: string) => void
  selectedTag?: string
  searchQuery?: string
  totalResults?: number
  showFeatured?: boolean
}

export default function BlogPostsGrid({
  posts,
  onTagClick,
  selectedTag,
  searchQuery,
  totalResults,
  showFeatured = false,
}: BlogPostsGridProps) {
  const featuredPost = showFeatured && posts.length > 0 ? posts[0] : null
  const remainingPosts = featuredPost ? posts.slice(1) : posts

  return (
    <div className="space-y-6">
      {/* Results summary */}
      {(searchQuery || selectedTag) && totalResults !== undefined && (
        <motion.p
          variants={fadeInUp}
          className="border-2 border-foreground bg-accent-lime px-4 py-2 font-mono text-micro font-bold uppercase tracking-widest text-accent-lime-foreground"
        >
          {searchQuery && selectedTag && (
            <>
              {totalResults} {totalResults === 1 ? "post" : "posts"} tagged
              &quot;{selectedTag}&quot; matching &quot;{searchQuery}&quot;
            </>
          )}
          {searchQuery && !selectedTag && (
            <>
              {totalResults} {totalResults === 1 ? "post" : "posts"} matching
              &quot;{searchQuery}&quot;
            </>
          )}
          {!searchQuery && selectedTag && (
            <>
              {totalResults} {totalResults === 1 ? "post" : "posts"} tagged
              &quot;{selectedTag}&quot;
            </>
          )}
        </motion.p>
      )}

      {/* Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPost && (
            <BlogPostCard
              key={featuredPost.id}
              post={featuredPost}
              index={0}
              onTagClick={onTagClick}
              searchQuery={searchQuery}
              featured
            />
          )}
          {remainingPosts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              index={featuredPost ? index + 1 : index}
              onTagClick={onTagClick}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={fadeInUp}
          className="border-2 border-dashed border-foreground/40 py-16 text-center"
        >
          <p className="font-serif text-2xl italic text-muted-foreground">
            {searchQuery
              ? `Nothing filed under "${searchQuery}"`
              : selectedTag
                ? `No posts tagged "${selectedTag}"`
                : "The archive is empty for now."}
          </p>
        </motion.div>
      )}
    </div>
  )
}
