import { getAllPosts, getAllTags } from "@/lib/blog"
import BlogList from "@/components/blog-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Basil's Digital Garden",
  description: "Articles on web development, AI, and technology",
  openGraph: {
    title: "Blog | Basil's Digital Garden",
    description: "Articles on web development, AI, and technology",
    type: "website",
  },
}

export default async function BlogPage() {
  // Get all posts and tags at build time
  const allPosts = await getAllPosts();
  const allTags = getAllTags();
  
  // Pass all data to the client component, filtering will happen on the client
  return <BlogList allPosts={allPosts} allTags={allTags} />;
}
