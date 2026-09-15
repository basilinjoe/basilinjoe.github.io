import type { Metadata, Viewport } from 'next'
import './globals.css'
import { fontSans, fontMono, fontSerif } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GoogleAnalytics } from '@/components/google-analytics'
import { PersonJsonLd, WebsiteJsonLd } from '@/components/json-ld'
import { SkipNav } from '@/components/skip-nav'
import { ScrollToTop } from '@/components/scroll-to-top'
import { CommandPaletteProvider } from '@/components/command-palette'
import { Toaster } from '@/components/ui/sonner'
// import { ThemeSwitcher } from '@/components/theme-switcher'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.openGraph.siteName}`
  },
  description: siteConfig.description,
  keywords: ["Associate Technical Architect", "AI Agents", "Azure AI Foundry", "MCP", "Azure", "Cloud Architecture", "Enterprise Integration", "Multi-tenant SaaS", "Basilin Joe", "Next.js", "TypeScript"],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontMono.variable, fontSerif.variable)}
    >
        <head>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
        </head>
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MotionProvider>
              <CommandPaletteProvider>
                <SkipNav />
                <div vaul-drawer-wrapper="">
                  <div className="relative flex min-h-screen flex-col bg-background">
                    <SiteHeader />
                    <main id="main-content" className="flex-1">{children}</main>
                    <SiteFooter />
                  </div>
                </div>
                <ScrollToTop />
                <Toaster />
              </CommandPaletteProvider>
            </MotionProvider>
          </ThemeProvider>
          {/* <ThemeSwitcher /> */}
          <GoogleAnalytics gaId={siteConfig.gaid}/>
          <PersonJsonLd />
          <WebsiteJsonLd />
        </body>
      </html>
  )
}