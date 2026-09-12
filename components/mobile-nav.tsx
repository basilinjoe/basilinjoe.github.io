"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Icons } from "@/components/icons"

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Icons.linkedin,
  github: Icons.gitHub,
  twitter: Icons.twitter,
  instagram: Icons.instagram,
  medium: Icons.medium,
}

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-2 border-foreground shadow-brutal-sm md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full border-l-2 border-foreground bg-background p-0 sm:w-[420px]"
      >
        {/* Header strip */}
        <div className="border-b-2 border-foreground bg-accent-hot px-6 py-3 text-accent-hot-foreground">
          <p className="font-mono text-micro font-bold uppercase tracking-widest">
            Navigation
          </p>
        </div>

        <div className="flex h-full flex-col px-6 py-6">
          {/* Big serif nav items — one hero moment per link */}
          <nav className="flex flex-col gap-1">
            {siteConfig.mainNav.map((item, index) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-baseline gap-4 border-b-2 border-foreground/10 py-3 transition-colors hover:border-accent-hot",
                    isActive && "border-accent-hot"
                  )}
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      "font-serif text-4xl italic leading-none transition-transform group-hover:translate-x-1",
                      isActive ? "text-accent-hot" : "text-foreground"
                    )}
                  >
                    {item.title}
                  </span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="ml-auto self-center font-mono text-micro font-bold uppercase tracking-widest text-accent-hot"
                    >
                      Here
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Socials */}
          <div className="mt-auto pt-8">
            <p className="mb-3 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </p>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(siteConfig.links).map(([key, url]) => {
                const IconComponent = socialIcons[key]
                if (!IconComponent) return null
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex aspect-square items-center justify-center border-2 border-foreground bg-background text-foreground transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-lime hover:shadow-brutal-sm"
                    aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            <p className="mt-6 font-mono text-micro uppercase tracking-widest text-muted-foreground">
              {siteConfig.email}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
