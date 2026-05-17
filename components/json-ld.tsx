import { siteConfig } from "@/config/site"

const SITE_URL = siteConfig.url
const OG_IMAGE = `${SITE_URL}/images/og-default.png`

// Person structured data
export function PersonJsonLd() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.position,
    url: SITE_URL,
    image: OG_IMAGE,
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.medium,
      siteConfig.links.instagram
    ],
    worksFor: {
      "@type": "Organization",
      name: "Experion Technologies",
      url: "https://experionglobal.com/"
    },
    description: siteConfig.aboutMe,
    knowsAbout: siteConfig.skills.join(", ")
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  )
}

// WebSite structured data
export function WebsiteJsonLd() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: SITE_URL,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
    />
  )
}

// BlogPosting structured data
export function BlogPostJsonLd({
  title,
  description,
  date,
  modified,
  url,
  tags,
  readingTime,
  image
}: {
  title: string;
  description: string;
  date: string;
  modified?: string;
  url: string;
  tags?: string[];
  readingTime?: string;
  image?: string;
}) {
  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image || OG_IMAGE,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL
    },
    datePublished: date,
    dateModified: modified || date,
    url: url,
    keywords: tags?.join(", ") || "",
    timeRequired: readingTime,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: OG_IMAGE
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
    />
  )
}

// ProfilePage structured data for the homepage
export function ProfilePageJsonLd() {
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.position,
      url: SITE_URL,
      image: OG_IMAGE,
      sameAs: [
        siteConfig.links.linkedin,
        siteConfig.links.github,
        siteConfig.links.twitter,
        siteConfig.links.medium,
      ],
      description: siteConfig.aboutMe,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
    />
  )
}

// BreadcrumbList structured data
export function BreadcrumbJsonLd({
  items
}: {
  items: { name: string; url: string }[]
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  )
}
