import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from '@/components/site-header'
import { GoogleAnalytics } from '@/components/google-analytics'
import { PersonJsonLd, WebsiteJsonLd } from '@/components/json-ld'
import { SkipNav } from '@/components/skip-nav'
import { ScrollToTop } from '@/components/scroll-to-top'
import { CommandPaletteProvider } from '@/components/command-palette'
import { Toaster } from '@/components/ui/sonner'
// import { ThemeSwitcher } from '@/components/theme-switcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.openGraph.siteName}`
  },
  description: siteConfig.description,
  keywords: ["Technology Lead", "Azure", "AWS", "Cloud Solutions", "Full Stack", "DevOps", "Software Engineer", "Basilin Joe", "React", "TypeScript"],
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
    <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CommandPaletteProvider>
              <SkipNav />
              <div vaul-drawer-wrapper="">
                <div className="relative flex min-h-screen flex-col bg-background">
                  <SiteHeader />
                  <main id="main-content" className="flex-1">{children}</main>
                </div>
              </div>
              <ScrollToTop />
              <Toaster />
            </CommandPaletteProvider>
          </ThemeProvider>
          {/* <ThemeSwitcher /> */}
          <GoogleAnalytics gaId={siteConfig.gaid}/>
          <PersonJsonLd />
          <WebsiteJsonLd />
        </body>
      </html>
  )
}