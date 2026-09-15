"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const ORDER = ["light", "dark", "system"] as const
type ThemeName = (typeof ORDER)[number]

const LABEL: Record<ThemeName, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
}

const ICON: Record<ThemeName, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

/**
 * Cycle toggle: light -> dark -> system -> light. No dropdown, no menu.
 *
 * Two things this has to get right, both from DESIGN.md §3 ("visibility of
 * system status" is the binding NN/g heuristic for this site):
 *
 * 1. The state lives in the accessible name. An `aria-label` overrides element
 *    content in the accessible name computation, so the previous `sr-only` span
 *    describing the current theme was never announced by anything.
 * 2. There are three states, so there are three icons. The old Sun/Moon pair was
 *    driven by the `dark:` variant, which reflects the *resolved* theme — that
 *    made "system" indistinguishable from whichever theme it resolved to.
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current: ThemeName = ORDER.includes(theme as ThemeName)
    ? (theme as ThemeName)
    : "system"
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]

  // `theme` is undefined until next-themes reads storage, so the server render and
  // the first client render must both show the neutral fallback or React complains.
  const Icon = mounted ? ICON[current] : Sun

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={
        mounted
          ? `Theme: ${LABEL[current]}. Switch to ${LABEL[next]}.`
          : "Toggle theme"
      }
      className="relative border-2 border-foreground shadow-brutal-sm transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal"
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" aria-hidden />
    </Button>
  )
}
