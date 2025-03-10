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
      <nav className="flex items-center gap-6 text-sm">
        {siteConfig.mainNav.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  )
}
