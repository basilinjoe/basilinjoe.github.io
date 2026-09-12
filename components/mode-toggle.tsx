"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

/**
 * Simple cycle toggle: light → dark → system → light. No dropdown, no menu.
 * A brutalist bordered button that swaps the icon on state change.
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const cycle = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycle}
      aria-label="Toggle theme"
      className="relative border-2 border-foreground shadow-brutal-sm transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      {mounted && (
        <span className="sr-only">
          Current theme: {theme}. Click to cycle.
        </span>
      )}
    </Button>
  )
}
