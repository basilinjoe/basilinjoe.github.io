"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp } from "@/lib/animations"
import { SectionHeading } from "./featured-posts"

const categoryOrder = [
  { key: "cloud", label: "Cloud & DevOps", accent: "bg-primary text-primary-foreground" },
  { key: "backend", label: "Backend", accent: "bg-accent-hot text-accent-hot-foreground" },
  { key: "frontend", label: "Frontend", accent: "bg-accent-lime text-accent-lime-foreground" },
] as const

function proficiencyMark(p: number): string {
  if (p >= 90) return "EXPERT"
  if (p >= 75) return "ADVANCED"
  return "PROFICIENT"
}

/**
 * Skills as a "credits page" — each category is a heading, then a big
 * uppercase run of skill names with mono proficiency labels. Feels like
 * the back cover of an album or a magazine masthead.
 */
export function SkillsAndTools() {
  return (
    <motion.section
      variants={fadeInUp}
      aria-labelledby="skills-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        numeral="06"
        eyebrow="Working with"
        title="Skills & tools"
      />

      <div className="mt-10 space-y-10">
        {categoryOrder.map((cat, idx) => {
          const skills = siteConfig.skills.filter((s) => s.category === cat.key)
          if (skills.length === 0) return null
          return (
            <motion.div
              key={cat.key}
              variants={fadeInUp}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`inline-flex items-center border-2 border-foreground px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-widest ${cat.accent}`}
                >
                  {cat.label}
                </span>
                <span className="h-px flex-1 bg-foreground/20" />
                <span className="font-mono text-micro uppercase tracking-widest text-muted-foreground">
                  {skills.length} items
                </span>
              </div>

              <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline justify-between gap-3 border-b border-foreground/10 py-1.5"
                  >
                    <span className="font-serif text-xl leading-tight">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                      {proficiencyMark(skill.proficiency)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}

        {/* Tools row */}
        <motion.div variants={fadeInUp}>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex items-center border-2 border-foreground bg-foreground px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-widest text-background">
              Daily tooling
            </span>
            <span className="h-px flex-1 bg-foreground/20" />
          </div>
          <div className="flex flex-wrap gap-2">
            {siteConfig.tools.map((tool) => (
              <span key={tool} className="sticker">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
