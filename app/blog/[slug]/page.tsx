import { getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { resolveAssetUrl } from "@/lib/utils"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostNavigation } from "@/components/blog/blog-post-navigation"
import { BlogPostSharingSection } from "@/components/blog/blog-post-sharing-section"
import { BlogPostLayout } from "@/components/blog/blog-post-layout"
import { RelatedPosts } from "@/components/blog/related-posts"

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.id }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params
  const post = getAllPosts().find((p) => p.id === slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    }
  }

  const url = `${siteConfig.url}/blog/${slug}`

  // `images` is deliberately omitted from openGraph/twitter so Next's file-based
  // convention takes over: app/blog/[slug]/opengraph-image.tsx renders a distinct
  // card per post with its title, excerpt and tags. Setting `images` here would
  // override that generator, and because several posts share a coverImage it used
  // to collapse their social previews onto one duplicate picture.
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      url,
      tags: post.tags,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
    keywords: [...(post.tags || []), "blog", "article", siteConfig.name],
  }
}

export default async function BlogPostPage({ params }: any) {
  const { slug } = await params
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.id === slug)
  const post = currentIndex === -1 ? null : allPosts[currentIndex]

  if (!post) notFound()

  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const postUrl = `${siteConfig.url}/blog/${post.id}`

  return (
    <BlogPostLayout
      title={post.title}
      description={post.excerpt}
      date={post.date}
      modified={post.modified}
      url={postUrl}
      tags={post.tags}
      readingTime={post.readingTime}
      coverImage={post.coverImage ? resolveAssetUrl(post.coverImage) : undefined}
      breadcrumbs={[
        { name: "Home", url: siteConfig.url },
        { name: "Blog", url: `${siteConfig.url}/blog` },
        { name: post.title, url: postUrl },
      ]}
    >
      <BlogPostHeader post={post} />
      <BlogPostContent post={post} />
      <RelatedPosts currentPostId={post.id} currentTags={post.tags} allPosts={allPosts} />
      <BlogPostSharingSection title={post.title} url={postUrl} />
      <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />
    </BlogPostLayout>
  )
}
