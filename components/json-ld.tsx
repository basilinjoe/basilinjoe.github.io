import { siteConfig } from "@/config/site"

// Person structured data
export function PersonJsonLd() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.position,
    url: siteConfig.url,
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
    knowsAbout: siteConfig.skills.map(s => s.name).join(", ")
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
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name
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
  url, 
  tags,
  readingTime
}: { 
  title: string; 
  description: string; 
  date: string; 
  url: string; 
  tags?: string[];
  readingTime?: string;
}) {
  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url
    },
    datePublished: date,
    dateModified: date,
    url: url,
    keywords: tags?.join(", ") || "",
    timeRequired: readingTime,
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url
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