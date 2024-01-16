import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './mdx.css'
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from '@/components/site-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: siteConfig.openGraph,
  robots: "index, follow",
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
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
  )
}