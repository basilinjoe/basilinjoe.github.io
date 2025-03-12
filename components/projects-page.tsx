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
      className="container grid items-center gap-6 sm:gap-8 pb-8 pt-6 md:py-10 px-4 sm:px-6 md:px-8"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Here are some of my featured projects and open source contributions.
          Check out my <Link href={siteConfig.links.github} className="underline">GitHub profile</Link> for more.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {repos.map((repo) => (
          <motion.div
            key={repo.name}
            variants={fadeInUp}
            className="flex flex-col rounded-lg border p-4 sm:p-5 md:p-6 hover:bg-accent transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="mr-2">
                <h2 className="font-semibold text-base sm:text-lg break-words line-clamp-1">
                  <Link href={repo.html_url} target="_blank" rel="noreferrer" className="hover:underline">
                    {repo.name}
                  </Link>
                </h2>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {repo.description || "No description available"}
                </p>
              </div>
              <Link href={repo.html_url} target="_blank" rel="noreferrer" className="flex-shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 overflow-x-auto max-w-full">
              {repo.topics?.slice(0, 5).map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary whitespace-nowrap"
                >
                  {topic}
                </span>
              ))}
              {repo.topics && repo.topics.length > 5 && (
                <span className="text-xs text-muted-foreground">+{repo.topics.length - 5} more</span>
              )}
            </div>

            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              {repo.language && (
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                  {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count && repo.forks_count > 0 && (
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <GitFork className="h-3 w-3 sm:h-4 sm:w-4" />
                  {repo.forks_count}
                </span>
              )}
              {repo.watchers_count && repo.watchers_count > 0 && (
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  {repo.watchers_count}
                </span>
              )}
            </div>

            {repo.homepage && (
              <Link
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="mt-3 sm:mt-4 text-xs sm:text-sm text-primary hover:underline inline-flex items-center"
              >
                View Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-3 w-3"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17L17 7" />
                </svg>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}