import { ContactPage } from "@/components/contact-page"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — Technology Lead & Cloud Solutions Architect. Available for freelance projects, consulting, and full-time opportunities.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: `Reach out to ${siteConfig.name} for project inquiries, consulting, or just to say hello.`,
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
}

export default function Contact() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Contact", url: `${siteConfig.url}/contact` },
        ]}
      />
      <ContactPage />
    </>
  )
}
