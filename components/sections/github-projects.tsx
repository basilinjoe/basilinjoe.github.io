"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Github, Star, GitFork, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Repository } from "@/lib/github"
import { SkeletonCard } from "@/components/ui/skeleton"

interface ProjectsListProps {
  repos: Repository[];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ProjectCard({ repo }: { repo: Repository }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group flex flex-col rounded-lg border border-border/60 p-5
        bg-gradient-to-br from-primary/5 to-background
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {repo.name}
        </h3>
        <Link href={repo.html_url} target="_blank" rel="noreferrer" className="flex-shrink-0 ml-2">
          <Github className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
        </Link>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
        {repo.description || "No description available"}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {repo.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="tech" className="text-xs">
              {topic}
            </Badge>
          ))}
          {repo.topics.length > 3 && (
            <span className="text-xs text-muted-foreground self-center">+{repo.topics.length - 3}</span>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500" />
            {repo.stargazers_count.toLocaleString()}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3 text-blue-500" />
            {repo.forks_count.toLocaleString()}
          </span>
        )}
      </div>

      {repo.updated_at && (
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground/60">
          <Calendar className="h-3 w-3" />
          Updated {formatDate(repo.updated_at)}
        </div>
      )}
    </motion.div>
  )
}

export function GithubProjects({ repos }: ProjectsListProps) {
  const featuredRepos = repos.slice(0, 3)

  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <div className="h-0.5 w-16 bg-primary/50 rounded-full mt-1"></div>
        </div>
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Github className="h-4 w-4" />
            View All
          </Button>
        </Link>
      </div>

      {featuredRepos.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {featuredRepos.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
