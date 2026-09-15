"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Star, GitFork, Eye, Calendar } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { siteConfig } from "@/config/site"
import { Repository } from "@/lib/github"
import { cn } from "@/lib/utils"

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

interface ProjectsPageProps {
  repos: Repository[]
}

/**
 * Projects page as a workshop ledger. Each repo is a numbered brutalist
 * card with mono metadata. Filter chips at the top scope the list without
 * losing the editorial rhythm.
 */
export function ProjectsPage({ repos }: ProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All")

  const allTopics = useMemo(() => {
    const counts = new Map<string, number>()
    for (const repo of repos) {
      for (const topic of repo.topics || []) {
        counts.set(topic, (counts.get(topic) || 0) + 1)
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([topic]) => topic)
  }, [repos])

  const filteredRepos = useMemo(() => {
    if (activeFilter === "All") return repos
    return repos.filter((repo) =>
      repo.topics?.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
    )
  }, [repos, activeFilter])

  return (
    <div className="container max-w-screen-2xl">
      {/* Editorial header */}
      <section className="border-b-2 border-foreground py-16 md:py-24">
        <div className="flex items-baseline gap-4">
          <span className="column-numeral">WK</span>
          <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
            From the workshop
          </span>
        </div>
        <h1 className="mt-4 font-serif text-6xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl">
          Projects<span className="text-accent-hot">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          A working ledger of {repos.length} public repositories: personal
          experiments, useful templates, and things that ended up shipping.
          More at my{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline decoration-primary underline-offset-4 hover:text-accent-hot"
          >
            GitHub profile
          </Link>
          .
        </p>
      </section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="py-12 md:py-16"
      >
        {/* Filters */}
        {allTopics.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-8">
            <p className="mb-3 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
              Filter by topic
            </p>
            <div className="scrollbar-hide flex flex-wrap gap-2">
              <FilterChip
                label={`All (${repos.length})`}
                active={activeFilter === "All"}
                onClick={() => setActiveFilter("All")}
              />
              {allTopics.map((topic) => {
                const count = repos.filter((r) => r.topics?.includes(topic)).length
                return (
                  <FilterChip
                    key={topic}
                    label={`${topic} (${count})`}
                    active={activeFilter === topic}
                    onClick={() => setActiveFilter(topic)}
                  />
                )
              })}
            </div>
          </motion.div>
        )}

        {filteredRepos.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            className="border-2 border-dashed border-foreground/40 p-10 text-center"
          >
            <p className="font-mono text-sm text-muted-foreground">
              No projects match &quot;{activeFilter}&quot;.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-3 font-mono text-micro font-bold uppercase tracking-widest text-accent-hot underline"
            >
              Clear filter
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredRepos.map((repo, index) => (
              <motion.article
                key={repo.name}
                variants={fadeInUp}
                className="card-brutal group flex flex-col p-6"
              >
                <div className="flex items-start justify-between gap-2 border-b-2 border-foreground/10 pb-3">
                  <div>
                    <p className="font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
                      Repo · {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl leading-tight md:text-3xl">
                      <Link
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors group-hover:text-accent-hot"
                      >
                        {repo.name}
                      </Link>
                    </h2>
                  </div>
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${repo.name} on GitHub`}
                    className="shrink-0 border-2 border-foreground bg-background p-2 transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-lime hover:shadow-brutal-sm"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </div>

                <p className="mt-3 flex-1 text-sm text-muted-foreground md:text-base">
                  {repo.description || "No description available"}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {repo.topics.slice(0, 5).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setActiveFilter(topic)}
                        className="sticker-button"
                      >
                        {topic}
                      </button>
                    ))}
                    {repo.topics.length > 5 && (
                      <span className="font-mono text-micro text-muted-foreground">
                        +{repo.topics.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t-2 border-foreground/10 pt-3 font-mono text-micro uppercase tracking-widest text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 bg-accent-hot" />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count.toLocaleString()}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks_count.toLocaleString()}
                    </span>
                  )}
                  {repo.watchers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {repo.watchers_count.toLocaleString()}
                    </span>
                  )}
                  {repo.updated_at && (
                    <span className="ml-auto flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Upd. {formatDate(repo.updated_at)}
                    </span>
                  )}
                </div>

                {repo.homepage && (
                  <Link
                    href={repo.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 self-start border-b-2 border-foreground pb-0.5 font-mono text-micro font-bold uppercase tracking-widest hover:text-accent-hot hover:border-accent-hot"
                  >
                    View demo
                    <span aria-hidden>↗</span>
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 border-2 border-foreground px-3 py-1 font-mono text-micro font-bold uppercase tracking-widest transition-all",
        active
          ? "bg-foreground text-background shadow-brutal-sm"
          : "bg-background text-foreground hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-lime hover:text-accent-lime-foreground hover:shadow-brutal-sm"
      )}
    >
      {label}
    </button>
  )
}
