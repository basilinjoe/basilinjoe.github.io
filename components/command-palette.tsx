"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  User,
  FolderGit2,
  BookOpen,
  Github,
  Linkedin,
  Twitter,
  Moon,
  Sun,
  Monitor,
  ExternalLink,
  Search,
  ArrowRight,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────

type CommandGroup = {
  id: string
  label: string
  commands: Command[]
}

type Command = {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  action: () => void
  keywords?: string[]
}

// ── Context ────────────────────────────────────────────────────────────────

type CommandPaletteContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue>({
  open: false,
  setOpen: () => {},
})

export function useCommandPalette() {
  return React.useContext(CommandPaletteContext)
}

// ── Provider ───────────────────────────────────────────────────────────────

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPalette />
    </CommandPaletteContext.Provider>
  )
}

// ── Palette ────────────────────────────────────────────────────────────────

function CommandPalette() {
  const { open, setOpen } = useCommandPalette()
  const router = useRouter()
  const { setTheme } = useTheme()
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const navigate = React.useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router, setOpen]
  )

  const openExternal = React.useCallback(
    (url: string) => {
      setOpen(false)
      window.open(url, "_blank", "noopener,noreferrer")
    },
    [setOpen]
  )

  const groups: CommandGroup[] = React.useMemo(
    () => [
      {
        id: "navigation",
        label: "Navigation",
        commands: [
          {
            id: "home",
            label: "Home",
            description: "Go to the home page",
            icon: <Home className="h-4 w-4" />,
            action: () => navigate("/"),
            keywords: ["home", "start", "index"],
          },
          {
            id: "experience",
            label: "Experience",
            description: "Work history & skills",
            icon: <User className="h-4 w-4" />,
            action: () => navigate("/about"),
            keywords: ["about", "experience", "work", "skills", "career"],
          },
          {
            id: "projects",
            label: "Projects",
            description: "Open source & side projects",
            icon: <FolderGit2 className="h-4 w-4" />,
            action: () => navigate("/projects"),
            keywords: ["projects", "portfolio", "code", "github"],
          },
          {
            id: "blog",
            label: "Blog",
            description: "Articles & technical writing",
            icon: <BookOpen className="h-4 w-4" />,
            action: () => navigate("/blog"),
            keywords: ["blog", "articles", "writing", "posts"],
          },
        ],
      },
      {
        id: "social",
        label: "Social",
        commands: [
          {
            id: "github",
            label: "GitHub",
            description: siteConfig.links.github,
            icon: <Github className="h-4 w-4" />,
            action: () => openExternal(siteConfig.links.github),
            keywords: ["github", "code", "repos", "open source"],
          },
          {
            id: "linkedin",
            label: "LinkedIn",
            description: "Professional profile",
            icon: <Linkedin className="h-4 w-4" />,
            action: () => openExternal(siteConfig.links.linkedin),
            keywords: ["linkedin", "professional", "network"],
          },
          {
            id: "twitter",
            label: "Twitter / X",
            description: "@BasilinJoe",
            icon: <Twitter className="h-4 w-4" />,
            action: () => openExternal(siteConfig.links.twitter),
            keywords: ["twitter", "x", "tweet", "social"],
          },
        ],
      },
      {
        id: "theme",
        label: "Theme",
        commands: [
          {
            id: "theme-light",
            label: "Light mode",
            icon: <Sun className="h-4 w-4" />,
            action: () => { setTheme("light"); setOpen(false) },
            keywords: ["light", "theme", "bright"],
          },
          {
            id: "theme-dark",
            label: "Dark mode",
            icon: <Moon className="h-4 w-4" />,
            action: () => { setTheme("dark"); setOpen(false) },
            keywords: ["dark", "theme", "night"],
          },
          {
            id: "theme-system",
            label: "System theme",
            icon: <Monitor className="h-4 w-4" />,
            action: () => { setTheme("system"); setOpen(false) },
            keywords: ["system", "auto", "theme", "default"],
          },
        ],
      },
    ],
    [navigate, openExternal, setTheme, setOpen]
  )

  // Filter commands across all groups
  const filteredGroups = React.useMemo(() => {
    if (!query.trim()) return groups
    const q = query.toLowerCase()
    return groups
      .map((group) => ({
        ...group,
        commands: group.commands.filter(
          (cmd) =>
            cmd.label.toLowerCase().includes(q) ||
            cmd.description?.toLowerCase().includes(q) ||
            cmd.keywords?.some((k) => k.includes(q))
        ),
      }))
      .filter((g) => g.commands.length > 0)
  }, [query, groups])

  // Flat list for keyboard navigation
  const allCommands = React.useMemo(
    () => filteredGroups.flatMap((g) => g.commands),
    [filteredGroups]
  )

  // Reset state on open
  React.useEffect(() => {
    if (open) {
      setQuery("")
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  // Clamp active index
  React.useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(allCommands.length - 1, 0)))
  }, [allCommands.length])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % allCommands.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + allCommands.length) % allCommands.length)
        break
      case "Enter":
        e.preventDefault()
        if (allCommands[activeIndex]) allCommands[activeIndex].action()
        break
      case "Escape":
        setOpen(false)
        break
    }
  }

  // Track which flat index each group starts at (for active highlighting)
  let flatIndex = 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "p-0 gap-0 overflow-hidden",
          "max-w-[560px] top-[30%] translate-y-[-30%]",
          "border border-border/60 shadow-2xl"
        )}
        aria-label="Command palette"
      >
        {/* Visually hidden title for screen readers */}
        <DialogTitle className="sr-only">Command palette</DialogTitle>

        {/* Search input */}
        <div className="flex items-center border-b border-border/60 px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands…"
            className={cn(
              "flex h-12 w-full bg-transparent text-sm outline-none",
              "placeholder:text-muted-foreground"
            )}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto overscroll-contain py-2">
          <AnimatePresence mode="wait">
            {filteredGroups.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center text-sm text-muted-foreground"
              >
                No results for &ldquo;{query}&rdquo;
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredGroups.map((group) => {
                  const groupStartIndex = flatIndex
                  const rendered = (
                    <div key={group.id} className="px-2 pb-1">
                      <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                        {group.label}
                      </p>
                      {group.commands.map((cmd, i) => {
                        const idx = groupStartIndex + i
                        const isActive = idx === activeIndex
                        return (
                          <CommandItem
                            key={cmd.id}
                            cmd={cmd}
                            isActive={isActive}
                            onHover={() => setActiveIndex(idx)}
                            isExternal={group.id === "social"}
                          />
                        )
                      })}
                    </div>
                  )
                  flatIndex += group.commands.length
                  return rendered
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-border/60 px-3 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1 font-mono">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1 font-mono">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1 font-mono">⌘K</kbd>
            toggle
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Command item ───────────────────────────────────────────────────────────

function CommandItem({
  cmd,
  isActive,
  onHover,
  isExternal,
}: {
  cmd: Command
  isActive: boolean
  onHover: () => void
  isExternal: boolean
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  // Scroll into view when keyboard-activated
  React.useEffect(() => {
    if (isActive) ref.current?.scrollIntoView({ block: "nearest" })
  }, [isActive])

  return (
    <button
      ref={ref}
      onClick={cmd.action}
      onMouseEnter={onHover}
      className={cn(
        "relative flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-left transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-foreground/80 hover:bg-accent/50"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="commandActive"
          className="absolute inset-0 rounded-md bg-accent"
          style={{ zIndex: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className={cn("shrink-0", isActive ? "text-foreground" : "text-muted-foreground")}>
        {cmd.icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium leading-none">{cmd.label}</span>
        {cmd.description && (
          <span className="mt-0.5 truncate text-[11px] text-muted-foreground">
            {cmd.description}
          </span>
        )}
      </span>
      {isExternal ? (
        <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
      ) : (
        isActive && <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
      )}
    </button>
  )
}
