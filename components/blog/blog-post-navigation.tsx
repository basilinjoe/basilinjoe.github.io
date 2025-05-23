import Link from "next/link"
import { BlogPost } from "@/lib/blog"

interface BlogPostNavigationProps {
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}

export function BlogPostNavigation({ previousPost, nextPost }: BlogPostNavigationProps) {
  if (!previousPost && !nextPost) return null;
  
  return (
    <div className="mt-16 pt-8 border-t grid grid-cols-2 gap-4">
      {previousPost && (
        <div className="col-start-1 p-4 rounded-lg border border-border/60 bg-gradient-to-br from-background to-primary-50/5 dark:from-background dark:to-primary-900/5 hover:shadow-md transition-all">
          <span className="text-sm text-primary/70 block mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Post
          </span>
          <Link 
            href={`/blog/${previousPost.id}`} 
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            {previousPost.title}
          </Link>
        </div>
      )}
      
      {nextPost && (
        <div className={`${previousPost ? 'col-start-2 text-right' : 'col-start-1 col-span-2'} p-4 rounded-lg border border-border/60 bg-gradient-to-br from-background to-blue-500/5 dark:from-background dark:to-blue-900/5 hover:shadow-md transition-all`}>
          <span className="text-sm text-primary/70 block mb-2 flex items-center justify-end">
            Next Post
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <Link 
            href={`/blog/${nextPost.id}`} 
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            {nextPost.title}
          </Link>
        </div>
      )}
    </div>
  )
}
