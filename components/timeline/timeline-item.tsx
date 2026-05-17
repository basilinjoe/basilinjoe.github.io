"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

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

function getSkillVariant(skill: string): "default" | "secondary" | "skill" | "tech" | "featured" {
  const s = skill.toLowerCase()
  if (s.includes("react") || s.includes("typescript") || s.includes("javascript") || s.includes("angular") || s.includes("html") || s.includes("css") || s.includes("next"))
    return "featured"
  if (s.includes("node") || s.includes(".net") || s.includes("c#") || s.includes("java") || s.includes("python") || s.includes("api") || s.includes("mongo") || s.includes("sql") || s.includes("nest"))
    return "secondary"
  if (s.includes("azure") || s.includes("aws") || s.includes("devops") || s.includes("cloud") || s.includes("docker") || s.includes("kubernetes") || s.includes("k8s") || s.includes("aks"))
    return "tech"
  return "skill"
}

export function TimelineItem({ role, index, isLast }: TimelineItemProps) {
  const start = formatDate(role.startDate)
  const end = role.endDate ? formatDate(role.endDate) : "Present"

  return (
    <div className="relative flex gap-4 md:gap-6">
      {/* Connector line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.05 }}
          className="relative z-10 flex-shrink-0 w-3.5 h-3.5 mt-1.5 rounded-full border-2 border-primary bg-background shadow-sm shadow-primary/20"
        >
          {role.current && (
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          )}
        </motion.div>
        {!isLast && (
          <div className="w-px flex-1 mt-1 bg-gradient-to-b from-primary/40 via-border to-transparent" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 280, damping: 28, delay: index * 0.08 }}
        className="flex-1 pb-8 last:pb-0"
      >
        <div className="rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-4 md:p-5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
          {/* Role header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground text-base md:text-lg">{role.name}</h3>
                {role.current && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{start} — {end}</span>
              </div>
            </div>
          </div>

          {/* Impact bullets */}
          <ul className="space-y-1.5 mb-4">
            {role.responsibilities.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/50" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {role.skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Badge variant={getSkillVariant(skill)} size="sm">{skill}</Badge>
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
