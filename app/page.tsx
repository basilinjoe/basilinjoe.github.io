import { getAllPosts } from "@/lib/blog"
import { getGithubRepos } from "@/lib/github"
import { siteConfig } from "@/config/site"
import HomePage from "../components/home-page"
import { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
}

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const username = siteConfig.links.github.split('/').pop() || '';
  const repos = await getGithubRepos(username);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
        ]}
      />
      <HomePage posts={featuredPosts} projects={repos} />
    </>
  );
}
