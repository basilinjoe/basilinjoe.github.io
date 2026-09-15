"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * Editorial main nav.
 *
 * Logotype pattern: "JOE." wordmark in serif italic, followed by a role tag.
 * Nav items are mono uppercase with an underline-slide hover and a heavy
 * bar under the active item — proximity + alignment principle in one gesture.
 */
export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-8">
      <Link
        href="/"
        aria-label={`${siteConfig.name} — Home`}
        className="group flex items-center gap-2.5"
      >
        {/* Wordmark tile — brutalist square with initials */}
        <motion.span
          whileHover={{ rotate: -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="flex h-9 min-w-9 items-center justify-center border-2 border-foreground bg-accent-lime px-2 font-serif text-lg italic text-accent-lime-foreground shadow-brutal-sm"
        >
          JOE
        </motion.span>
        <span className="hidden flex-col leading-none sm:flex">
          <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-foreground">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
            {siteConfig.role}
          </span>
        </span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {siteConfig.mainNav.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-widest transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative">
                {item.title}
                {/* Underline slide, thick when active, thin on hover */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-foreground transition-all duration-200",
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </span>
              {isActive && (
                <motion.span
                  layoutId="navActiveDot"
                  className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-hot"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
