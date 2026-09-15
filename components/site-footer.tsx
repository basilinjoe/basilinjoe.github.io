import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Marquee } from "@/components/marquee"

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Icons.linkedin,
  github: Icons.gitHub,
  twitter: Icons.twitter,
  instagram: Icons.instagram,
  medium: Icons.medium,
}

const footerColumns = [
  {
    label: "Site",
    links: [
      { title: "Home", href: "/" },
      { title: "Experience", href: "/about" },
      { title: "Projects", href: "/projects" },
      { title: "Writing", href: "/blog" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Reading",
    links: [
      { title: "AKS + Bicep IaC", href: "/blog/deploying-aks-with-bicep" },
      { title: "AI Coding Assistants", href: "/blog/efficient-use-of-ai-coding-assistants" },
      { title: "Autonomous Agents", href: "/blog/autonomous-agents" },
      { title: "Generative AI Intro", href: "/blog/generative-ai-introduction" },
      { title: "RSS Feed", href: "/feed.xml" },
    ],
  },
]

const marqueeWord = "AVAILABLE FOR CONVERSATION"

export function SiteFooter() {
  const marqueeItems = Array.from({ length: 12 }, () => marqueeWord)
  return (
    <footer className="mt-24 border-t-2 border-foreground bg-background text-foreground">
      {/* Big marquee — the "let's talk" pull */}
      <Marquee
        animation="animate-marquee-slow"
        label="the scrolling footer banner"
        className="border-b-2 border-foreground/20 py-8"
        trackClassName="ticker-track"
        controlClassName="mr-3 h-8 w-8 border-foreground bg-background text-foreground"
      >
        {marqueeItems.map((word, i) => (
          <span key={i} className="mx-6 font-serif text-6xl italic md:text-8xl">
            {word}
            <span aria-hidden className="mx-6 text-accent-hot">
              ✦
            </span>
          </span>
        ))}
      </Marquee>

      {/* Grid content */}
      <div className="container max-w-screen-2xl py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <p className="font-mono text-micro font-bold uppercase tracking-widest text-accent-hot">
              Say hello
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Building cloud-native systems from{" "}
              <span className="italic text-accent-hot">{siteConfig.location.split(",")[0]}</span>.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Open to conversations about cloud architecture, DevOps, and
              engineering leadership. Reach me directly or via the socials.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 inline-flex items-center gap-2 border-2 border-foreground bg-accent-lime px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest text-accent-lime-foreground shadow-brutal-sm transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal"
            >
              {siteConfig.email}
              <span aria-hidden>↗</span>
            </a>
          </div>

          {/* Columns */}
          {footerColumns.map((col) => (
            <nav
              key={col.label}
              aria-label={col.label}
              className="md:col-span-3"
            >
              <p className="mb-4 font-mono text-micro font-bold uppercase tracking-widest text-accent-hot">
                {col.label}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-baseline gap-2 text-base text-foreground transition-colors hover:text-accent-hot"
                    >
                      <span className="inline-block w-3 opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                      <span className="border-b border-transparent transition-colors group-hover:border-accent-hot">
                        {link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Socials + legal */}
        <div className="mt-12 flex flex-col gap-6 border-t border-foreground/20 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(siteConfig.links).map(([key, url]) => {
              const IconComponent = socialIcons[key]
              if (!IconComponent) return null
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-background text-foreground transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-foreground hover:text-background hover:shadow-brutal-sm"
                >
                  <IconComponent className="h-4 w-4" />
                </a>
              )
            })}
          </div>

          <div className="font-mono text-micro uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name} · Built with Next.js
            · Hosted on GitHub Pages
          </div>
        </div>
      </div>
    </footer>
  )
}
