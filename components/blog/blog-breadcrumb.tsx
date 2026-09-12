"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

interface BlogBreadcrumbProps {
  postTitle?: string
  tag?: string
}

/**
 * Editorial breadcrumb: mono uppercase, thin slashes as separators,
 * current page in accent color. No shadcn Breadcrumb chrome.
 */
export function BlogBreadcrumb({ postTitle, tag }: BlogBreadcrumbProps) {
  const items: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: postTitle || tag ? "/blog" : undefined },
  ]
  if (tag) items.push({ label: tag })
  if (postTitle) items.push({ label: postTitle })

  return (
    <motion.nav
      variants={fadeInUp}
      aria-label="Breadcrumb"
      className="mb-6 font-mono text-micro font-semibold uppercase tracking-widest"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-accent-hot"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="max-w-[220px] truncate text-accent-hot"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <span aria-hidden className="text-muted-foreground/60">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  )
}
