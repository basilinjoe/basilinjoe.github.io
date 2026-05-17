"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface CompanyCardProps {
  company: string
  logo?: string
  link: string
  current: boolean
  dateRange: string
}

export function CompanyCard({ company, logo, link, current, dateRange }: CompanyCardProps) {
  const initials = company
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex items-center gap-4"
    >
      {/* Logo / Letter avatar */}
      <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-border/60 bg-muted flex items-center justify-center shadow-sm">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={company} className="w-full h-full object-contain p-1" />
        ) : (
          <span className="text-lg font-bold text-primary">{initials}</span>
        )}
        {current && (
          <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse border-2 border-background" />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
          >
            {company}
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-70 transition-opacity" />
          </Link>
          {current && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Present
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{dateRange}</p>
      </div>
    </motion.div>
  )
}
