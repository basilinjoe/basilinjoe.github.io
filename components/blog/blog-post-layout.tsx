import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { ReactNode } from "react"

interface BlogPostLayoutProps {
  title: string
  description: string
  date: string
  url: string
  tags?: string[]
  readingTime?: string
  breadcrumbs: Array<{
    name: string
    url: string
  }>
  children: ReactNode
}

export function BlogPostLayout({ 
  title,
  description,
  date,
  url,
  tags,
  readingTime,
  breadcrumbs,
  children 
}: BlogPostLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <ReadingProgress />
      
      {/* Colorful background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <div className="container mx-auto py-8">
        <BlogPostJsonLd
          title={title}
          description={description}
          date={date}
          url={url}
          tags={tags}
          readingTime={readingTime}
        />
        <BreadcrumbJsonLd
          items={breadcrumbs}
        />
        <div className="max-w-4xl mx-auto">
          <BlogBreadcrumb postTitle={title} />
          <Link 
            href="/blog" 
            className="flex items-center text-sm text-primary hover:text-primary/80 mb-8 group transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to all posts
          </Link>
          
          <article>
            {children}
          </article>
          
          {/* Decorative elements */}
          <div className="absolute top-40 right-10 w-16 h-16 border border-primary/10 rounded-full animate-pulse-slow opacity-30 hidden md:block"></div>
          <div className="absolute bottom-60 left-10 w-10 h-10 border border-primary/10 rounded-full animate-float opacity-30 hidden md:block"></div>
        </div>
      </div>
    </div>
  )
}
