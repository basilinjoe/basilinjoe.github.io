import Link from "next/link"
import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog"
import { fadeInUp } from "@/lib/animations"
import { ArrowRight, CalendarIcon, BookOpen, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FeaturedPostsProps {
  posts: BlogPost[];
}

// Function to assign a category badge style based on post title or content
const getCategoryBadge = (post: BlogPost) => {
  const title = post.title.toLowerCase();

  if (title.includes('ai') || title.includes('ml') || title.includes('machine learning')) {
    return { name: "AI & ML", variant: "tech" as const };
  } else if (title.includes('coding') || title.includes('development')) {
    return { name: "Development", variant: "featured" as const };
  } else if (title.includes('tutorial') || title.includes('how to') || title.includes('guide')) {
    return { name: "Tutorial", variant: "secondary" as const };
  } else {
    return { name: "Article", variant: "skill" as const };
  }
};

// Deterministic rotation based on post id to avoid layout shifts
const getRotation = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return (hash % 200) / 100 - 1; // Returns value between -1 and 1
};

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <motion.div variants={fadeInUp} className="flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center flex-wrap gap-2">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Featured Posts
          </h2>
          <div className="bg-primary/10 dark:bg-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary flex items-center">
            <BookOpen className="w-3 h-3 mr-1" />
            Latest insights
          </div>
        </div>
        <Link href="/blog" className="text-sm flex items-center hover:text-primary group">
          View all posts <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3 perspective">
        {posts.map((post, index) => {
          const category = getCategoryBadge(post);
          const rotation = getRotation(post.id);
          return (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              style={{ transform: `rotate(${rotation}deg)` }}
              whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Link href={`/blog/${post.id}`} className="group block h-full">
                <div className="flex flex-col space-y-3 p-5 border border-border/50 rounded-lg transition-all hover:border-primary hover:shadow-md hover:bg-card h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-lg opacity-30"></div>
                  <div className="relative z-10">
                    <div className="mb-2">
                      <Badge variant={category.variant} size="sm">{category.name}</Badge>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors text-lg">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 border-t border-border/30">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-3 w-3 text-primary/70" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-primary/70" />
                          {post.readingTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  )
}