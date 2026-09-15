"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
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
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Dialog, DialogTitle } from "@/components/ui/dialog"
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
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-foreground/60 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[20%] z-50 w-[calc(100%-2rem)] max-w-[560px] translate-x-[-50%]",
            "grid gap-0 overflow-hidden bg-background",
            "border-2 border-foreground shadow-brutal-lg",
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
          aria-label="Command palette"
        >
          {/* Visually hidden title for screen readers */}
          <DialogTitle className="sr-only">Command palette</DialogTitle>

          {/* Header strip */}
          <div className="flex items-center gap-2 border-b-2 border-foreground bg-foreground px-3 py-2 text-background">
            <span className="font-mono text-micro font-bold uppercase tracking-widest text-accent-hot">
              Cmd · K
            </span>
            <span className="font-mono text-micro font-bold uppercase tracking-widest">
              Quick jump
            </span>
          </div>

          {/* Search input */}
          <div className="flex items-center border-b-2 border-foreground bg-background px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
              onKeyDown={handleKeyDown}
              placeholder="Search commands…"
              className={cn(
                "flex h-12 w-full bg-transparent text-sm text-foreground outline-none",
                "placeholder:text-muted-foreground"
              )}
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="hidden select-none items-center border-2 border-foreground bg-background px-1.5 py-0.5 font-mono text-micro font-bold uppercase text-foreground shadow-brutal-sm sm:flex">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[360px] overflow-y-auto overscroll-contain bg-background py-2">
            {filteredGroups.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <p className="font-mono text-micro font-bold uppercase tracking-widest text-accent-hot">
                  No matches
                </p>
                <p className="mt-2 font-serif text-lg italic text-muted-foreground">
                  Nothing filed under &ldquo;{query}&rdquo;.
                </p>
              </div>
            ) : (
              filteredGroups.map((group) => {
                const groupStartIndex = flatIndex
                const rendered = (
                  <div key={group.id} className="pb-2">
                    <p className="px-3 py-1.5 font-mono text-micro font-bold uppercase tracking-widest text-accent-hot">
                      · {group.label}
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
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-4 border-t-2 border-foreground bg-background px-3 py-2 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <kbd className="border border-foreground bg-background px-1 text-foreground">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="border border-foreground bg-background px-1 text-foreground">↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="border border-foreground bg-background px-1 text-foreground">⌘K</kbd>
              toggle
            </span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
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
        "flex w-full items-center gap-3 border-l-2 px-3 py-2 text-left text-sm transition-colors",
        isActive
          ? // Solid lime with ink on top: 13.90:1 light, 15.22:1 dark.
            // `bg-accent-lime/60` with `text-foreground` measured 2.98:1 in dark —
            // lime is a background-only token and must carry its own foreground.
            "border-accent-hot bg-accent-lime text-accent-lime-foreground"
          : "border-transparent text-foreground/80 hover:bg-accent-lime/20"
      )}
    >
      <span
        className={cn(
          "shrink-0",
          // accent-hot on solid lime is 3.65:1 light / 2.14:1 dark, so the active
          // icon takes the lime foreground and the hot accent stays on the left rail.
          isActive ? "text-accent-lime-foreground" : "text-muted-foreground"
        )}
      >
        {cmd.icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-mono text-micro font-bold uppercase tracking-widest leading-none">
          {cmd.label}
        </span>
        {cmd.description && (
          <span
            className={cn(
              "mt-1 truncate text-[11px]",
              // muted-foreground on solid lime is 1.75:1 in dark.
              isActive ? "text-accent-lime-foreground/75" : "text-muted-foreground"
            )}
          >
            {cmd.description}
          </span>
        )}
      </span>
      {isExternal ? (
        <ExternalLink
          className={cn(
            "ml-auto h-3.5 w-3.5 shrink-0",
            isActive ? "text-accent-lime-foreground/75" : "text-muted-foreground/80"
          )}
        />
      ) : (
        isActive && (
          <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-accent-lime-foreground" />
        )
      )}
    </button>
  )
}
