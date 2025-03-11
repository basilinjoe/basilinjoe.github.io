"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Github, Star, GitFork, Eye } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button } from "./ui/button"
import { Repository } from "@/lib/github"

interface ProjectsPageProps {
  repos: Repository[];
}

export function ProjectsPage({ repos }: ProjectsPageProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="container grid items-center gap-8 pb-8 pt-6 md:py-10"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Here are some of my featured projects and open source contributions.
          Check out my <Link href={siteConfig.links.github} className="underline">GitHub profile</Link> for more.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {repos.map((repo) => (
          <motion.div
            key={repo.name}
            variants={fadeInUp}
            className="flex flex-col rounded-lg border p-6 hover:bg-accent"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold">
                  <Link href={repo.html_url} target="_blank" rel="noreferrer" className="hover:underline">
                    {repo.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{repo.description}</p>
              </div>
              <Link href={repo.html_url} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {repo.topics?.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count && repo.forks_count > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  {repo.forks_count}
                </span>
              )}
              {repo.watchers_count && repo.watchers_count > 0 && (
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {repo.watchers_count}
                </span>
              )}
            </div>

            {repo.homepage && (
              <Link
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-sm text-primary hover:underline"
              >
                View Demo →
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}