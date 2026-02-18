"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, scaleUp, staggerContainer } from "@/lib/animations"
import { MapPin, Mail, Briefcase, Code2, Cloud, Rocket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DynamicGreeting } from "@/components/dynamic-greeting"
import { SocialLinks } from "./social-links"
import { TerminalAnimation } from "@/components/terminal-animation"

function getYearsOfExperience(): number {
  // Earliest role: Vyooha Technologies, Aug 2015
  const startYear = 2015
  return new Date().getFullYear() - startYear
}

const metrics = [
  {
    icon: Briefcase,
    value: `${getYearsOfExperience()}+`,
    label: "Years Experience",
    color: "text-blue-500",
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    border: "border-blue-500/20",
  },
  {
    icon: Cloud,
    value: "2",
    label: "Cloud Platforms",
    color: "text-purple-500",
    bg: "bg-purple-500/10 dark:bg-purple-500/15",
    border: "border-purple-500/20",
  },
  {
    icon: Code2,
    value: `${siteConfig.skills.length}+`,
    label: "Technologies",
    color: "text-green-500",
    bg: "bg-green-500/10 dark:bg-green-500/15",
    border: "border-green-500/20",
  },
  {
    icon: Rocket,
    value: "50+",
    label: "Projects Shipped",
    color: "text-orange-500",
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    border: "border-orange-500/20",
  },
]

export function HeroBentoGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {/* ── Profile Card (2 cols) ───────────────────────────────── */}
      <motion.div
        variants={fadeInUp}
        className="
          sm:col-span-2 xl:col-span-2
          bg-card border border-border rounded-2xl p-6
          flex flex-col gap-4
        "
      >
        <DynamicGreeting />

        {/* Avatar + name row */}
        <div className="flex items-start gap-4">
          <motion.div
            variants={scaleUp}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex-shrink-0"
          >
            {/* Animated glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-blue-500/30 blur-md"
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/avatar.webp"
              alt="Basilin Joe"
              width={80}
              height={80}
              priority
              className="rounded-full ring-2 ring-white dark:ring-zinc-800 ring-offset-2 ring-offset-background relative z-10 shadow-lg"
              style={{ width: "80px", height: "80px" }}
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {siteConfig.name}
              </h1>
              <Badge variant="featured" className="text-[10px] px-2">
                Available
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {siteConfig.position}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 flex-shrink-0 text-primary" />
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3 flex-shrink-0 text-primary" />
                {siteConfig.email}
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {siteConfig.aboutMe}
        </p>

        <SocialLinks />
      </motion.div>

      {/* ── Terminal Card (2 cols) ──────────────────────────────── */}
      <motion.div
        variants={fadeInUp}
        className="sm:col-span-2 xl:col-span-2 rounded-2xl overflow-hidden min-h-[260px]"
      >
        <TerminalAnimation />
      </motion.div>

      {/* ── Metric Cards (4 × 1 col) ───────────────────────────── */}
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          variants={fadeInUp}
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`
            bg-card border ${m.border} border-border rounded-2xl p-5
            flex flex-col items-center justify-center gap-2 text-center
            cursor-default
          `}
        >
          <div className={`${m.bg} ${m.color} p-2.5 rounded-xl`}>
            <m.icon className="h-5 w-5" />
          </div>
          <motion.div
            className={`text-4xl font-black ${m.color}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
          >
            {m.value}
          </motion.div>
          <div className="text-xs font-medium text-muted-foreground">{m.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
