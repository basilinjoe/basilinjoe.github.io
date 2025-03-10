import { getAllPosts } from "@/lib/blog"
import BlogList from "@/components/blog-list"

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogList posts={posts} />;
}
