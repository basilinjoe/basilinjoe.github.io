import { getAllPosts } from "@/lib/blog"
import { getGithubRepos } from "@/lib/github"
import { siteConfig } from "@/config/site"
import HomePage from "../components/home-page"

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const username = siteConfig.links.github.split('/').pop() || '';
  const repos = await getGithubRepos(username);

  return <HomePage posts={featuredPosts} projects={repos} />;
}
