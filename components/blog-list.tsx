"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="container grid items-center gap-6 pb-8 pt-6 md:py-10"
    >
      <motion.div 
        variants={fadeInUp}
        className="flex max-w-[980px] flex-col items-start gap-2"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, ideas, and experiences.
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-lg border p-6 hover:shadow-md transition-all"
          >
            <h2 className="text-2xl font-bold mb-2">
              <Link
                href={`/blog/${post.id}`}
                className="text-foreground hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <p className="mt-4 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4">
              <Link
                href={`/blog/${post.id}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Read more
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}