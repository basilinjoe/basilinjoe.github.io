"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
  role: {
    name: string
    startDate: string
    endDate?: string
    responsibilities: string[]
    skills: string[]
    current?: boolean
  }
  index: number
  isLast: boolean
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "Present"
  const [, month, year] = dateStr.split("/")
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

/**
 * A single role on the CV timeline. Left rail hosts a numbered marker with
 * a connector line running down. Right side is a brutalist card with role,
 * dates, responsibilities, and skill stickers.
 */
export function TimelineItem({ role, index, isLast }: TimelineItemProps) {
  const start = formatDate(role.startDate)
  const end = role.endDate ? formatDate(role.endDate) : "Present"

  return (
    <div className="relative flex gap-4 md:gap-6">
      {/* Rail */}
      <div className="flex flex-col items-center">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            delay: index * 0.05,
          }}
          className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-foreground bg-background font-mono text-xs font-bold text-foreground shadow-brutal-sm"
        >
          {String(index + 1).padStart(2, "0")}
          {role.current && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-success" />
          )}
        </motion.span>
        {!isLast && (
          <div className="mt-1 w-[2px] flex-1 bg-foreground/30" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
          delay: index * 0.08,
        }}
        className="flex-1 pb-10 last:pb-0"
      >
        <article className="card-brutal p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-serif text-2xl leading-tight md:text-3xl">
              {role.name}
            </h3>
            <span className="font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
              {start} — {end}
            </span>
          </div>

          <ul className="mb-4 space-y-2">
            {role.responsibilities.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 text-sm text-muted-foreground md:text-base"
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-1 w-1 shrink-0 bg-accent-hot"
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 border-t-2 border-foreground/10 pt-3">
            {role.skills.map((skill) => (
              <span key={skill} className="sticker">
                {skill}
              </span>
            ))}
          </div>
        </article>
      </motion.div>
    </div>
  )
}
