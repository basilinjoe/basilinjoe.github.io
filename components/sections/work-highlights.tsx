"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp } from "@/lib/animations"
import { SectionHeading } from "./featured-posts"

/**
 * Work highlights — two current-ish roles rendered as editorial cards
 * with big serif role numeral, sticker-labeled skills, and offset shadow.
 */
export function WorkHighlights() {
  const roles = siteConfig.experience[0].roles.slice(0, 2)

  return (
    <motion.section
      variants={fadeInUp}
      aria-labelledby="work-highlights-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        numeral="04"
        eyebrow="On record"
        title="Work highlights"
        rightSlot={
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-widest text-foreground hover:text-accent-hot"
          >
            Full experience
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        }
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {roles.map((role, index) => (
          <motion.article
            key={role.name}
            variants={fadeInUp}
            transition={{ delay: index * 0.12 }}
            className="card-brutal flex flex-col gap-4 p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-serif text-5xl italic text-accent-hot md:text-6xl">
                0{index + 1}
              </span>
              <span className="font-mono text-micro uppercase tracking-widest text-muted-foreground">
                {role.startDate.split("/").slice(-1)[0]} —{" "}
                {role.current ? "present" : role.endDate?.split("/").slice(-1)[0]}
              </span>
            </div>

            <h3 className="font-serif text-2xl leading-tight tracking-tight md:text-3xl">
              {role.name}
            </h3>

            <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
              {role.responsibilities.slice(0, 2).map((resp, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-accent-hot" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {role.skills.slice(0, 5).map((skill) => (
                <span key={skill} className="sticker">
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
