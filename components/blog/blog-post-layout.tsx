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
  modified?: string
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
  modified,
  url,
  tags,
  readingTime,
  breadcrumbs,
  children
}: BlogPostLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <ReadingProgress />

      <div className="container mx-auto py-8">
        <BlogPostJsonLd
          title={title}
          description={description}
          date={date}
          modified={modified}
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

        </div>
      </div>
    </div>
  )
}
