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

/**
 * Company header for the CV timeline — big initials tile, bold company name,
 * date range in mono. Reads as a section masthead.
 */
export function CompanyCard({
  company,
  logo,
  link,
  current,
  dateRange,
}: CompanyCardProps) {
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
      className="flex items-center gap-4 border-b-2 border-foreground pb-4"
    >
      {/* Initials tile */}
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center border-2 border-foreground bg-accent-lime shadow-brutal-sm">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={company}
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <span className="font-serif text-2xl text-accent-lime-foreground">
            {initials}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-3">
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-serif text-3xl leading-tight text-foreground transition-colors hover:text-accent-hot md:text-4xl"
          >
            {company}
            <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-70" />
          </Link>
          {current && (
            <span className="sticker-hot">Present</span>
          )}
        </div>
        <p className="mt-1 font-mono text-micro uppercase tracking-widest text-muted-foreground">
          {dateRange}
        </p>
      </div>
    </motion.div>
  )
}
