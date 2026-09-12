"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Github, Star, GitFork } from "lucide-react"
import { Repository } from "@/lib/github"
import { SectionHeading } from "./featured-posts"

interface ProjectsListProps {
  repos: Repository[]
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

function ProjectCard({ repo, index }: { repo: Repository; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      transition={{ delay: index * 0.08 }}
      className="card-brutal flex flex-col gap-3 p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-micro uppercase tracking-widest text-muted-foreground">
            Repo · 0{index + 1}
          </p>
          <h3 className="mt-1 font-serif text-xl leading-tight md:text-2xl">
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-hot"
            >
              {repo.name}
            </Link>
          </h3>
        </div>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${repo.name} on GitHub`}
          className="shrink-0 border-2 border-foreground bg-background p-1.5 transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-lime hover:shadow-brutal-sm"
        >
          <Github className="h-4 w-4" />
        </Link>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3">
        {repo.description || "No description available"}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="sticker">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 border-t-2 border-foreground/10 pt-3 font-mono text-micro uppercase tracking-widest text-muted-foreground">
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
        {repo.updated_at && (
          <span className="ml-auto">Upd. {formatDate(repo.updated_at)}</span>
        )}
      </div>
    </motion.article>
  )
}

export function GithubProjects({ repos }: ProjectsListProps) {
  const featured = repos.slice(0, 3)

  return (
    <motion.section
      variants={fadeInUp}
      aria-labelledby="github-projects-heading"
      className="py-16 md:py-24"
    >
      <SectionHeading
        numeral="05"
        eyebrow="From the workshop"
        title="Open source"
        rightSlot={
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-widest text-foreground hover:text-accent-hot"
          >
            All repos
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        }
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featured.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                aria-hidden
                className="h-56 animate-pulse border-2 border-foreground/20 bg-muted"
              />
            ))
          : featured.map((repo, i) => (
              <ProjectCard key={repo.name} repo={repo} index={i} />
            ))}
      </div>
    </motion.section>
  )
}
