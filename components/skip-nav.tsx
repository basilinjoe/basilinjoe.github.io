"use client"

import { cn } from "@/lib/utils"

/**
 * Keyboard-accessible skip links. Hidden by default, revealed on focus with
 * a loud brutalist chip so a keyboard user knows exactly where the focus is.
 */
export function SkipNav() {
  const base = cn(
    "sr-only focus:not-sr-only",
    "absolute left-4 z-[100]",
    "border-2 border-foreground bg-accent-hot px-4 py-2",
    "font-mono text-micro font-bold uppercase tracking-widest text-accent-hot-foreground",
    "shadow-brutal-sm",
    "-translate-y-24 focus:translate-y-0",
    "transition-transform duration-200",
    "focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
  )
  // Both links sit at left-4 and stack vertically on narrow screens. Side by side
  // they ran past a 390px viewport, which is the width DESIGN.md §7 requires every
  // page to hold. From `sm` up there is room to put them on one row.
  return (
    <>
      <a href="#main-content" className={cn(base, "top-4")}>
        Skip to main content
      </a>
      <a href="#main-navigation" className={cn(base, "top-16 sm:left-52 sm:top-4")}>
        Skip to navigation
      </a>
    </>
  )
}
