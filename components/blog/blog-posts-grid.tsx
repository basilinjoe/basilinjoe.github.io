"use client"

import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog"
import BlogPostCard from "@/components/blog/blog-post-card"
import { fadeInUp } from "@/lib/animations"

interface BlogPostsGridProps {
  posts: BlogPost[];
  onTagClick: (tag: string) => void;
  selectedTag?: string;
  searchQuery?: string;
  totalResults?: number;
  showFeatured?: boolean;
}

export default function BlogPostsGrid({
  posts,
  onTagClick,
  selectedTag,
  searchQuery,
  totalResults,
  showFeatured = false
}: BlogPostsGridProps) {

  const featuredPost = showFeatured && posts.length > 0 ? posts[0] : null
  const remainingPosts = featuredPost ? posts.slice(1) : posts

  return (
    <div className="space-y-5 px-4 sm:px-6 md:px-0">
      {/* Results summary */}
      {(searchQuery || selectedTag) && totalResults !== undefined && (
        <motion.div
          variants={fadeInUp}
          className="text-sm text-muted-foreground"
        >
          {searchQuery && (
            <span>
              Found {totalResults} {totalResults === 1 ? 'post' : 'posts'}
              {selectedTag && ` tagged &quot;${selectedTag}&quot;`} matching &quot;{searchQuery}&quot;
            </span>
          )}
          {!searchQuery && selectedTag && (
            <span>
              Showing {totalResults} {totalResults === 1 ? 'post' : 'posts'} tagged &quot;{selectedTag}&quot;
            </span>
          )}
        </motion.div>
      )}

      {/* Bento grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Featured card — spans 2 cols on sm+ */}
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

          {/* Remaining cards */}
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
          className="text-center py-10"
        >
          <p className="text-muted-foreground">
            {searchQuery
              ? `No posts found matching "${searchQuery}". Try a different search term.`
              : selectedTag
                ? "No posts found with this tag. Try a different tag."
                : "No posts found."
            }
          </p>
        </motion.div>
      )}
    </div>
  );
}
