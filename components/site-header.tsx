"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { slideIn } from "@/lib/animations"

export function SiteHeader() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={slideIn}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav id="main-navigation" className="flex items-center space-x-2">
            <ModeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
