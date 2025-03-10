import { getAllPosts } from "@/lib/blog"
import HomePage from "../components/home-page"

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);

  return <HomePage posts={featuredPosts} />;
}
