"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { useCommandPalette } from "@/components/command-palette"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const tickerLines = [
  "ASSOCIATE TECHNICAL ARCHITECT",
  siteConfig.location.toUpperCase(),
  "AZURE / AI / .NET / KUBERNETES",
  "AVAILABLE FOR CONVERSATION",
  "SHIPPING SINCE 2015",
]

/** Editorial ticker bar. Uses a duplicated track so the -50% keyframe loops. */
function TickerBar() {
  const items = [...tickerLines, ...tickerLines, ...tickerLines]
  return (
    <div className="hidden overflow-hidden border-b-2 border-foreground bg-accent-hot text-accent-hot-foreground sm:block">
      <div className="animate-marquee flex whitespace-nowrap py-1.5">
        {items.map((line, i) => (
          <span
            key={`${line}-${i}`}
            className="mx-6 font-mono text-micro font-semibold tracking-widest"
          >
            {line}
            <span aria-hidden className="mx-6 opacity-60">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CommandPaletteButton() {
  const { setOpen } = useCommandPalette()
  return (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        "hidden items-center gap-2 border-2 border-foreground bg-background px-3 py-1.5",
        "font-mono text-micro uppercase tracking-widest text-foreground",
        "transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal-sm",
        "sm:flex"
      )}
      aria-label="Open command palette"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden lg:inline">Search</span>
      <kbd className="flex items-center gap-0.5 border border-foreground/30 px-1 font-mono text-[10px]">
        ⌘K
      </kbd>
    </button>
  )
}

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"
    >
      <TickerBar />
      <div className="border-b-2 border-foreground">
        <div className="container flex h-16 max-w-screen-2xl items-center gap-4">
          <MainNav />
          <div className="flex flex-1 items-center justify-end gap-2">
            <nav id="main-navigation" className="flex items-center gap-2">
              <CommandPaletteButton />
              <ModeToggle />
              <MobileNav />
            </nav>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
