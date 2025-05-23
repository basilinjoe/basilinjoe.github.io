import { getAllPosts, getPostById } from "@/lib/blog"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostNavigation } from "@/components/blog/blog-post-navigation"
import { BlogPostSharingSection } from "@/components/blog/blog-post-sharing-section"
import { BlogPostLayout } from "@/components/blog/blog-post-layout"

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostById(resolvedParams.slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    }
  }
  
  const url = `${siteConfig.url}/blog/${resolvedParams.slug}`;
  
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
    <BlogPostLayout
      title={post.title}
      description={post.excerpt}
      date={post.date}
      url={postUrl}
      tags={post.tags}
      readingTime={post.readingTime}
      breadcrumbs={[
        { name: "Home", url: siteConfig.url },
        { name: "Blog", url: `${siteConfig.url}/blog` },
        { name: post.title, url: postUrl },
      ]}
    >
      <BlogPostHeader post={post} />
      <BlogPostContent post={post} />
      <BlogPostSharingSection title={post.title} url={postUrl} />
      <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />
    </BlogPostLayout>
  )
}