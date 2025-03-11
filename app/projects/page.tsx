import { getGithubRepos } from "@/lib/github"
import { ProjectsPage } from "@/components/projects-page"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects - " + siteConfig.title,
  description: "Featured projects and open source contributions"
}

export default async function Projects() {
  const username = siteConfig.links.github.split('/').pop() || '';
  const repos = await getGithubRepos(username, 8); // Show more projects on the dedicated page

  return <ProjectsPage repos={repos} />;
}