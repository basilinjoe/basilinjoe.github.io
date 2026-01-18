"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Briefcase, FolderGit2, BookOpen } from "lucide-react"
import { Icons } from "@/components/icons"

// Map nav items to icons
const navIcons: Record<string, React.ReactNode> = {
  "/": <Home className="h-4 w-4" />,
  "/about": <Briefcase className="h-4 w-4" />,
  "/projects": <FolderGit2 className="h-4 w-4" />,
  "/blog": <BookOpen className="h-4 w-4" />,
}

// Map social links to icons
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
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="flex flex-col gap-6 px-2">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
          <nav className="flex flex-col gap-2">
            {siteConfig.mainNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground/60 hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <span className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {navIcons[item.href]}
                  </span>
                  {item.title}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="mt-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-muted-foreground">Connect</p>
              <div className="flex gap-3">
                {Object.entries(siteConfig.links).map(([key, url]) => {
                  const IconComponent = socialIcons[key]
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted/50 text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                    >
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}