"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { useCommandPalette } from "@/components/command-palette"
import { slideIn } from "@/lib/animations"
import { cn } from "@/lib/utils"

function CommandPaletteButton() {
  const { setOpen } = useCommandPalette()
  return (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        "hidden sm:flex items-center gap-2 rounded-md border border-border/60",
        "bg-background/80 px-2.5 py-1.5 text-sm text-muted-foreground",
        "hover:border-border hover:text-foreground transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label="Open command palette"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden lg:inline text-xs">Search…</span>
      <kbd className="hidden lg:flex items-center gap-0.5 rounded border border-border bg-muted px-1 text-[10px] font-mono">
        <span>⌘</span>K
      </kbd>
      <kbd className="flex lg:hidden items-center gap-0.5 rounded border border-border bg-muted px-1 text-[10px] font-mono">
        ⌘K
      </kbd>
    </button>
  )
}

export function SiteHeader() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={slideIn}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav id="main-navigation" className="flex items-center space-x-2">
            <CommandPaletteButton />
            <ModeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
