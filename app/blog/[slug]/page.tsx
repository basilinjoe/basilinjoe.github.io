import { getAllPosts, getPostById } from "@/lib/blog"
import { notFound } from "next/navigation"

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
    <article className="container py-6 prose dark:prose-invert max-w-4xl">
      <h1 className="mb-2">{post.title}</h1>
      <time className="text-sm text-muted-foreground">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div 
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}