"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { slideIn } from "@/lib/animations"

export function MainNav() {
  const pathname = usePathname()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideIn}
      className="mr-4 flex"
    >
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icons.logo className="h-6 w-6" />
        </motion.div>
        <motion.span
          className="hidden font-bold sm:inline-block"
          variants={slideIn}
        >
          {siteConfig.name}
        </motion.span>
      </Link>

      <nav className="hidden md:flex items-center gap-1 text-sm">
        {siteConfig.mainNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-1.5 rounded-md transition-colors select-none",
                isActive
                  ? "text-foreground font-medium"
                  : "text-foreground/60 hover:text-foreground/80"
              )}
            >
              {/* Animated background pill for active item */}
              {isActive && (
                <motion.span
                  layoutId="navActivePill"
                  className="absolute inset-0 rounded-md bg-accent"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {/* Animated underline dot */}
              <span className="relative flex flex-col items-center gap-0.5">
                <span>{item.title}</span>
                {isActive && (
                  <motion.span
                    layoutId="navActiveDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </span>
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}
