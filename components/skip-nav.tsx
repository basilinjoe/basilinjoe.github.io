"use client"

import { cn } from "@/lib/utils"

export function SkipNav() {
  return (
    <>
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "absolute top-4 left-4 z-50",
          "bg-primary text-primary-foreground",
          "px-4 py-2 rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "transform -translate-y-16 focus:translate-y-0",
          "transition-transform duration-200"
        )}
      >
        Skip to main content
      </a>
      <a
        href="#main-navigation"
        className={cn(
          "sr-only focus:not-sr-only",
          "absolute top-4 left-44 z-50",
          "bg-primary text-primary-foreground",
          "px-4 py-2 rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "transform -translate-y-16 focus:translate-y-0",
          "transition-transform duration-200"
        )}
      >
        Skip to navigation
      </a>
    </>
  )
}