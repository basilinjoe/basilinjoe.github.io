import { getGithubRepos } from "@/lib/github"
import { ProjectsPage } from "@/components/projects-page-new"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Projects & Open Source",
  description: `${siteConfig.name}'s featured projects, open source contributions, and software development portfolio`,
  openGraph: {
    title: `${siteConfig.name}'s Projects & Open Source Work`,
    description: `Featured projects, open source contributions, and software development portfolio by ${siteConfig.name}`,
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}'s Projects & Open Source Work`,
    description: `Featured projects, open source contributions, and software development portfolio by ${siteConfig.name}`,
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  keywords: ["projects", "portfolio", "open source", "github", "software development", ...siteConfig.skills],
}

export default async function Projects() {
  const username = siteConfig.links.github.split('/').pop() || '';
  const repos = await getGithubRepos(username, 8); // Show more projects on the dedicated page

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Projects", url: `${siteConfig.url}/projects` },
        ]}
      />
      <ProjectsPage repos={repos} />
    </>
  );
}