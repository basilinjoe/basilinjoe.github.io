"use client"

import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog"
import BlogPostCard from "@/components/blog/blog-post-card"
import { fadeInUp } from "@/lib/animations"

interface BlogPostsGridProps {
  posts: BlogPost[];
  onTagClick: (tag: string) => void;
  selectedTag?: string;
}

export default function BlogPostsGrid({ posts, onTagClick, selectedTag }: BlogPostsGridProps) {
  return (
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
          <p className="text-muted-foreground">No posts found. {selectedTag && "Try a different tag."}</p>
        </motion.div>
      )}
    </div>
  );
}
