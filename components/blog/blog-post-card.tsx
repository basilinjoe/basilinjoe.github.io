"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  onTagClick: (tag: string) => void;
}

export default function BlogPostCard({ post, index, onTagClick }: BlogPostCardProps) {
  // Determine a gradient background based on tags
  let gradientClass = "from-primary/5 to-background";
  if (post.tags && post.tags.length > 0) {
    const tagStr = post.tags.join(' ').toLowerCase();
    if (tagStr.includes('react') || tagStr.includes('javascript') || tagStr.includes('typescript')) {
      gradientClass = "from-blue-500/5 to-primary/5";
    } else if (tagStr.includes('ai') || tagStr.includes('machine learning') || tagStr.includes('artificial intelligence')) {
      gradientClass = "from-violet-500/5 to-fuchsia-500/5";
    } else if (tagStr.includes('career') || tagStr.includes('productivity')) {
      gradientClass = "from-emerald-500/5 to-teal-500/5";
    } else if (tagStr.includes('tools') || tagStr.includes('software')) {
      gradientClass = "from-amber-500/5 to-orange-500/5";
    }
  }
  
  return (
    <motion.article
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      className={`group relative rounded-lg border border-border/60 p-5 sm:p-6 
        hover:shadow-md transition-all flex flex-col
        bg-gradient-to-br ${gradientClass}`}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
        <Link
          href={`/blog/${post.id}`}
          className="line-clamp-2 hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-2">
        <time className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span>•</span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {post.readingTime}
        </span>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 mb-1">
          {post.tags.slice(0, 3).map(tag => (
            <Badge 
              key={tag} 
              variant="tech" 
              className="text-xs cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onTagClick(tag);
              }}
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">+{post.tags.length - 3}</Badge>
          )}
        </div>
      )}
      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      <div className="mt-auto pt-5">
        <Link
          href={`/blog/${post.id}`}
          className={buttonVariants({ 
            variant: "outline", 
            size: "sm",
            className: "border-primary/30 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
          })}
        >
          Read more
        </Link>
      </div>
    </motion.article>
  );
}
