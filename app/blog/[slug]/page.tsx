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

// Let Next.js infer the types

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: any): Promise<Metadata> {
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
      images: post.coverImage && typeof post.coverImage === 'string'
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
      images: post.coverImage && typeof post.coverImage === 'string'
        ? [`${siteConfig.url}${post.coverImage}`]
        : siteConfig.twitter.images,
    },
    alternates: {
      canonical: url,
    },
    keywords: [...(post.tags || []), "blog", "article", siteConfig.name],
  }
}

// Let Next.js handle the typing
export default async function BlogPostPage({ params }: any) {
  const post = await getPostById(params.slug)

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
    <div className="relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <div className="container mx-auto py-8">
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
            className="flex items-center text-sm text-primary hover:text-primary/80 mb-8 group transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to all posts
          </Link>
          
          <article>
            <header className="mb-10">
              <h1 className="mb-4 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2 mt-4">
                <time dateTime={post.date} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {post.readingTime}
              </span>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">                {post.tags.map(tag => {
                  // Determine tag category based on content
                  const tagLower = tag.toLowerCase();
                  let variant: "tech" | "featured" | "secondary" | "skill" | "default" = "tech";
                  
                  if (tagLower.includes('react') || tagLower.includes('javascript') || tagLower.includes('frontend')) {
                    variant = "featured";
                  } else if (tagLower.includes('career') || tagLower.includes('productivity')) {
                    variant = "secondary";
                  } else if (tagLower.includes('ai') || tagLower.includes('machine learning')) {
                    variant = "skill";
                  }
                  
                  return (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant={variant} className="hover:bg-opacity-90 transition-all">
                        {tag}
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            )}
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mt-8">
            <div className="bg-gradient-to-br from-background to-muted/20 p-6 rounded-lg border border-border/40 mb-8">
              <p className="text-lg text-muted-foreground">{post.excerpt}</p>
            </div>
            
            <MarkdownContent className="mt-8">
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm, remarkImages]}
              >
                {post.content}
              </ReactMarkdown>
            </MarkdownContent>
          </div>
            {/* Social Sharing */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-wrap">
              <span className="text-sm font-medium text-primary">Share this post:</span>
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
        
        {/* Decorative elements */}
        <div className="absolute top-40 right-10 w-16 h-16 border border-primary/10 rounded-full animate-pulse-slow opacity-30 hidden md:block"></div>
        <div className="absolute bottom-60 left-10 w-10 h-10 border border-primary/10 rounded-full animate-float opacity-30 hidden md:block"></div>
      </div>
    </div>
  )
}