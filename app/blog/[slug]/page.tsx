import { getAllPosts, getPostById } from "@/lib/blog"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from 'remark-gfm'
import remarkImages from 'remark-images'
import { MarkdownContent } from "@/components/markdown-content"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { SocialShare } from "@/components/blog-share"
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/config/site"

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

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostById(params.slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    }
  }
  
  const url = `${siteConfig.url}/blog/${params.slug}`;
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      url: url,
      images: post.coverImage 
        ? [
            {
              url: `${siteConfig.url}${post.coverImage}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : siteConfig.openGraph.images,
      tags: post.tags,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage 
        ? [`${siteConfig.url}${post.coverImage}`]
        : siteConfig.twitter.images,
    },
    alternates: {
      canonical: url,
    },
    keywords: [...(post.tags || []), "blog", "article", siteConfig.name],
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getPostById(resolvedParams.slug)

  if (!post) {
    notFound()
  }
  
  // Get all posts to find previous and next posts
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const postUrl = `${siteConfig.url}/blog/${post.id}`;

  return (
    <div className="container mx-auto py-6">
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        date={post.date}
        url={postUrl}
        tags={post.tags}
        readingTime={post.readingTime}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blog" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
        
        <article>
          <header className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">{post.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <Badge variant="secondary">{tag}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>
          
          <MarkdownContent className="mt-8">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm, remarkImages]}
            >
              {post.content}
            </ReactMarkdown>
          </MarkdownContent>
          
          {/* Social Sharing */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-6 flex-wrap">
              {/* @ts-expect-error Async Server Component */}
              <SocialShare 
                title={post.title} 
                url={`https://basilinjoe.github.io/blog/${post.id}`} 
              />
            </div>
          </div>
        </article>
        
        {/* Post Navigation */}
        <div className="mt-16 pt-8 border-t grid grid-cols-2 gap-4">
          {previousPost && (
            <div className="col-start-1">
              <span className="text-sm text-muted-foreground block mb-2">Previous Post</span>
              <Link 
                href={`/blog/${previousPost.id}`} 
                className="text-lg font-medium hover:underline"
              >
                {previousPost.title}
              </Link>
            </div>
          )}
          
          {nextPost && (
            <div className={`${previousPost ? 'col-start-2 text-right' : 'col-start-1 col-span-2'}`}>
              <span className="text-sm text-muted-foreground block mb-2">Next Post</span>
              <Link 
                href={`/blog/${nextPost.id}`} 
                className="text-lg font-medium hover:underline"
              >
                {nextPost.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}