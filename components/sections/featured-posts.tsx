import Link from "next/link"
import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog"
import { fadeInUp } from "@/lib/animations"
import { ArrowRight, CalendarIcon } from "lucide-react"

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <motion.div variants={fadeInUp} className="flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Featured Posts
        </h1>
        <Link href="/blog" className="text-sm flex items-center hover:text-primary">
          View all posts <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.id}`} className="group">
              <div className="flex flex-col space-y-2 p-4 border rounded-lg transition-all hover:border-primary">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}