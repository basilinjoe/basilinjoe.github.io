import AboutPage from "@/components/about-page"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "About & Experience",
  description: `${siteConfig.name}'s professional experience, skills, and work history as a ${siteConfig.position}`,
  openGraph: {
    title: `About ${siteConfig.name} - Professional Experience`,
    description: `${siteConfig.name}'s professional experience, skills, and work history as a ${siteConfig.position}`,
    url: `${siteConfig.url}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: `About ${siteConfig.name} - Professional Experience`,
    description: `${siteConfig.name}'s professional experience, skills, and work history as a ${siteConfig.position}`,
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  keywords: ["professional experience", "resume", "CV", "work history", "skills", ...siteConfig.skills.map(s => s.name)],
}

export default function About() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "About & Experience", url: `${siteConfig.url}/about` },
        ]}
      />
      <AboutPage />
    </>
  );
}
