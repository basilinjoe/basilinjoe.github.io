import { getAllPosts, getAllTags } from "@/lib/blog"
import BlogList from "@/components/blog-list"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on cloud architecture, web development, AI, and technology by Basilin Joe",
  openGraph: {
    title: "Basilin Joe's Blog",
    description: "Articles on cloud architecture, web development, AI, and technology by Basilin Joe",
    type: "website",
    url: `${siteConfig.url}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Basilin Joe's Blog",
    description: "Articles on cloud architecture, web development, AI, and technology",
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  keywords: ["blog", "tech blog", "web development", "cloud architecture", "Azure", "AWS", "React", "TypeScript", "Basilin Joe"],
}

export default async function BlogPage() {
  // Get all posts and tags at build time
  const allPosts = await getAllPosts();
  const allTags = getAllTags();
  
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
        ]}
      />
      <BlogList allPosts={allPosts} allTags={allTags} />
    </>
  );
}
