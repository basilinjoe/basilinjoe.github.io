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

function getCompanyDateRange(
  exp: (typeof siteConfig.experience)[number]
): string {
  const sorted = [...exp.roles].sort(
    (a, b) =>
      new Date(a.startDate.split("/").reverse().join("-")).getTime() -
      new Date(b.startDate.split("/").reverse().join("-")).getTime()
  )
  const earliest = formatDateShort(sorted[0].startDate)
  const latest = exp.current
    ? "Present"
    : formatDateShort(sorted[sorted.length - 1].endDate ?? "")
  return `${earliest} — ${latest}`
}

export default function AboutPage() {
  const totalRoles = siteConfig.experience.reduce(
    (sum, e) => sum + e.roles.length,
    0
  )
  const years = new Date().getFullYear() - 2015

  return (
    <div className="container max-w-screen-2xl">
      {/* Page header — editorial hero */}
      <section className="border-b-2 border-foreground py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-baseline gap-4">
              <span className="column-numeral">CV</span>
              <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
                On record · Experience
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 font-serif text-6xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl"
            >
              A working
              <br />
              <span className="italic text-accent-hot">history</span>.
            </motion.h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              {totalRoles} roles across {siteConfig.experience.length} companies
              spanning {years}+ years of shipping cloud infrastructure and
              full-stack systems.
            </p>
          </div>

          {/* Meta sidebar */}
          <aside className="md:col-span-4">
            <div className="border-2 border-foreground p-5 shadow-brutal">
              <dl className="space-y-4 font-mono text-sm">
                <StatRow
                  label="Years shipping"
                  value={`${years}+`}
                />
                <StatRow label="Companies" value={String(siteConfig.experience.length)} />
                <StatRow label="Roles" value={String(totalRoles)} />
                <StatRow label="Based in" value={siteConfig.location} />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="space-y-16">
          {siteConfig.experience.map((exp, expIndex) => (
            <div key={expIndex} className="space-y-6">
              <CompanyCard
                company={exp.company}
                logo={exp.logo}
                link={exp.link}
                current={exp.current}
                dateRange={getCompanyDateRange(exp)}
              />

              <div className="ml-4 space-y-0 md:ml-6">
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

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-foreground/20 pb-2 last:border-0 last:pb-0">
      <dt className="text-micro uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="font-serif text-3xl leading-none tracking-tight text-foreground">
        {value}
      </dd>
    </div>
  )
}
