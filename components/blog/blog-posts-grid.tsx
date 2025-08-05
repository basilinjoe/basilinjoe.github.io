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
}

export default function BlogPostsGrid({ 
  posts, 
  onTagClick, 
  selectedTag,
  searchQuery,
  totalResults 
}: BlogPostsGridProps) {
  return (
    <div className="space-y-6">
      {/* Results summary */}
      {(searchQuery || selectedTag) && totalResults !== undefined && (
        <motion.div 
          variants={fadeInUp}
          className="px-4 sm:px-6 md:px-0 text-sm text-muted-foreground"
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
      
      {/* Posts grid */}
      <div className="grid gap-5 sm:gap-6 px-4 sm:px-6 md:px-0 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              index={index}
              onTagClick={onTagClick}
            />
          ))
        ) : (
          <motion.div 
            variants={fadeInUp}
            className="col-span-full text-center py-10"
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
    </div>
  );
}
