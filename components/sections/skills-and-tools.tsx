"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp } from "@/lib/animations"
import { Cloud, Code2, Layers, Wrench } from "lucide-react"

type SkillCategory = "cloud" | "backend" | "frontend"

const CATEGORIES: {
  key: SkillCategory | "tools"
  label: string
  icon: React.ReactNode
  gradient: string
  bar: string
  avatar: string
  border: string
}[] = [
  {
    key: "cloud",
    label: "Cloud & DevOps",
    icon: <Cloud className="w-4 h-4" />,
    gradient: "from-sky-500/10 to-blue-500/5",
    bar: "from-sky-500 to-blue-400",
    avatar: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    border: "border-sky-500/20",
  },
  {
    key: "backend",
    label: "Backend",
    icon: <Layers className="w-4 h-4" />,
    gradient: "from-violet-500/10 to-purple-500/5",
    bar: "from-violet-500 to-purple-400",
    avatar: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    border: "border-violet-500/20",
  },
  {
    key: "frontend",
    label: "Frontend",
    icon: <Code2 className="w-4 h-4" />,
    gradient: "from-amber-500/10 to-orange-500/5",
    bar: "from-amber-500 to-orange-400",
    avatar: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
  },
  {
    key: "tools",
    label: "Tools",
    icon: <Wrench className="w-4 h-4" />,
    gradient: "from-emerald-500/10 to-teal-500/5",
    bar: "from-emerald-500 to-teal-400",
    avatar: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
  },
]

function proficiencyLabel(p: number): string {
  if (p >= 90) return "Expert"
  if (p >= 75) return "Advanced"
  return "Proficient"
}

function skillInitials(name: string): string {
  const words = name.split(/[\s.]+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function SkillRow({
  skill,
  index,
  bar,
  avatar,
}: {
  skill: { name: string; proficiency: number }
  index: number
  bar: string
  avatar: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="flex items-center gap-3"
    >
      {/* Letter avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${avatar}`}>
        {skillInitials(skill.name)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground truncate">{skill.name}</span>
          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
            {proficiencyLabel(skill.proficiency)}
          </span>
        </div>
        {/* Animated proficiency bar */}
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${bar}`}
            initial={{ width: "0%" }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 + index * 0.06 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

function ToolChip({ name, avatar, border }: { name: string; avatar: string; border: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${border} bg-background/60 hover:bg-muted/60 transition-colors cursor-default`}
    >
      <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatar}`}>
        {skillInitials(name)}
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </motion.div>
  )
}

export function SkillsAndTools() {
  const skills = siteConfig.skills

  return (
    <motion.div variants={fadeInUp} className="space-y-5">
      {/* Section heading */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight relative inline-block">
          Skills &amp; Tools
          <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full" />
        </h2>
      </div>

      {/* 2×2 grid — stacks to 1 column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, catIdx) => {
          const isTools = cat.key === "tools"

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: catIdx * 0.1, duration: 0.45 }}
              className={`rounded-xl border ${cat.border} bg-gradient-to-br ${cat.gradient} p-5 flex flex-col gap-4`}
            >
              {/* Card header */}
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md ${cat.avatar}`}>{cat.icon}</div>
                <h3 className="font-semibold text-sm text-foreground">{cat.label}</h3>
              </div>

              {isTools ? (
                /* Tools chip grid */
                <div className="flex flex-wrap gap-2">
                  {siteConfig.tools.map((tool) => (
                    <ToolChip key={tool} name={tool} avatar={cat.avatar} border={cat.border} />
                  ))}
                </div>
              ) : (
                /* Skill rows with proficiency bars */
                <div className="space-y-3">
                  {skills
                    .filter((s) => s.category === cat.key)
                    .map((skill, i) => (
                      <SkillRow
                        key={skill.name}
                        skill={skill}
                        index={i}
                        bar={cat.bar}
                        avatar={cat.avatar}
                      />
                    ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
