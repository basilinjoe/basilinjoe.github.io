import { getAllPosts, getPostById } from "@/lib/blog"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from 'remark-gfm'
import remarkImages from 'remark-images'
import { MarkdownContent } from "@/components/markdown-content"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getPostById(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{post.title}</h1>
        <time className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <MarkdownContent className="mt-8">
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm, remarkImages]}
          >
            {post.content}
          </ReactMarkdown>
        </MarkdownContent>
      </div>
    </article>
  )
}