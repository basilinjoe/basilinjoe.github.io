"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

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
          <nav className="flex flex-col gap-5">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground font-bold" : "text-foreground/60"
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">Connect</p>
              <div className="flex gap-4">
                {Object.entries(siteConfig.links).map(([key, url]) => (
                  <a 
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}