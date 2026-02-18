"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { CompanyCard } from "@/components/timeline/company-card"
import { TimelineItem } from "@/components/timeline/timeline-item"

function formatDateShort(dateStr: string): string {
  if (!dateStr) return "Present"
  const [, month, year] = dateStr.split("/")
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

function getCompanyDateRange(exp: (typeof siteConfig.experience)[number]): string {
  const sorted = [...exp.roles].sort(
    (a, b) => new Date(a.startDate.split("/").reverse().join("-")).getTime() - new Date(b.startDate.split("/").reverse().join("-")).getTime()
  )
  const earliest = formatDateShort(sorted[0].startDate)
  const latest = exp.current ? "Present" : formatDateShort(sorted[sorted.length - 1].endDate ?? "")
  return `${earliest} — ${latest}`
}

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl opacity-40 -z-10" />

      <section className="container grid items-start gap-10 pb-16 pt-8 md:py-12 max-w-3xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-3">
            Experience
          </h1>
          <div className="h-1 w-20 bg-primary/50 rounded-full mb-4" />
          <p className="text-muted-foreground text-lg">
            {siteConfig.experience.reduce((sum, e) => sum + e.roles.length, 0)} roles across{" "}
            {siteConfig.experience.length} companies spanning{" "}
            {new Date().getFullYear() - 2015}+ years.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {siteConfig.experience.map((exp, expIndex) => (
            <div key={expIndex} className="space-y-5">
              {/* Company header */}
              <CompanyCard
                company={exp.company}
                logo={exp.logo}
                link={exp.link}
                current={exp.current}
                dateRange={getCompanyDateRange(exp)}
              />

              {/* Role timeline */}
              <div className="ml-4 md:ml-6 space-y-0">
                {exp.roles.map((role, roleIndex) => (
                  <TimelineItem
                    key={roleIndex}
                    role={role}
                    index={roleIndex}
                    isLast={roleIndex === exp.roles.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
