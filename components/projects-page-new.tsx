"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Github, Star, GitFork, Eye, CodeSquare, Calendar } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Repository } from "@/lib/github"
import { SkeletonCard } from "@/components/ui/skeleton"

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Function to determine repo category based on topics
const getRepoCategory = (topics: string[] = []) => {
  const topicStr = topics.join(' ').toLowerCase();

  if (topicStr.includes('react') || topicStr.includes('frontend') || topicStr.includes('ui') ||
      topicStr.includes('website') || topicStr.includes('web')) {
    return 'frontend';
  } else if (topicStr.includes('backend') || topicStr.includes('api') || topicStr.includes('server')) {
    return 'backend';
  } else if (topicStr.includes('tool') || topicStr.includes('utility') || topicStr.includes('plugin')) {
    return 'tool';
  } else {
    return 'general';
  }
};

// Category-based gradient backgrounds
const categoryBackgrounds = {
  frontend: 'from-primary/5 to-blue-500/5',
  backend: 'from-emerald-500/5 to-teal-500/5',
  tool: 'from-amber-500/5 to-orange-500/5',
  general: 'from-zinc-500/5 to-background'
};

interface ProjectsPageProps {
  repos: Repository[];
}

export function ProjectsPage({ repos }: ProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  // Collect all unique topics, sorted by frequency
  const allTopics = useMemo(() => {
    const topicCounts = new Map<string, number>()
    for (const repo of repos) {
      for (const topic of (repo.topics || [])) {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
      }
    }
    return Array.from(topicCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([topic]) => topic)
  }, [repos])

  const filteredRepos = useMemo(() => {
    if (activeFilter === 'All') return repos
    return repos.filter((repo) =>
      repo.topics?.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
    )
  }, [repos, activeFilter])

  return (
    <div className="relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container grid items-center gap-6 sm:gap-8 pb-12 pt-8 md:py-10 px-4 sm:px-6 md:px-8"
      >
        <motion.div variants={fadeInUp} className="mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-3">
            Projects
          </h1>
          <div className="h-1 w-20 bg-primary/50 rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            My featured projects and open source contributions.
            Check out my <Link href={siteConfig.links.github} className="text-primary hover:underline">GitHub profile</Link> for more.
          </p>
        </motion.div>

        {/* Filter chips */}
        {allTopics.length > 0 && (
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${activeFilter === 'All'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
            >
              All
              <span className="ml-1.5 text-xs opacity-70">({repos.length})</span>
            </button>
            {allTopics.map((topic) => {
              const count = repos.filter((r) => r.topics?.includes(topic)).length
              return (
                <button
                  key={topic}
                  onClick={() => setActiveFilter(topic)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${activeFilter === topic
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                >
                  {topic}
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </button>
              )
            })}
          </motion.div>
        )}

        {filteredRepos.length === 0 ? (
          <motion.div variants={fadeInUp} className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No projects found for &quot;{activeFilter}&quot;.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-2 text-primary text-sm hover:underline"
            >
              Clear filter
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            {filteredRepos.map((repo) => {
              const category = getRepoCategory(repo.topics);

              return (
                <motion.div
                  key={repo.name}
                  variants={fadeInUp}
                  className={`group flex flex-col rounded-lg border border-border/60 p-5 sm:p-6
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40
                    bg-gradient-to-br ${categoryBackgrounds[category]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="mr-2">
                      <h2 className="font-semibold text-base sm:text-lg break-words line-clamp-1 group-hover:text-primary transition-colors">
                        <Link href={repo.html_url} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1.5"
                        >
                          <CodeSquare className="h-4 w-4 text-primary/70 flex-shrink-0" />
                          {repo.name}
                        </Link>
                      </h2>
                      <p className="mt-1.5 sm:mt-2 text-sm text-muted-foreground line-clamp-2">
                        {repo.description || "No description available"}
                      </p>
                    </div>
                    <Link href={repo.html_url} target="_blank" rel="noreferrer" className="flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10">
                        <Github className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2 overflow-x-auto max-w-full">
                    {repo.topics?.slice(0, 5).map((topic) => (
                      <Badge
                        key={topic}
                        variant="tech"
                        className="whitespace-nowrap text-xs cursor-pointer"
                        onClick={() => setActiveFilter(topic)}
                      >
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics && repo.topics.length > 5 && (
                      <span className="text-xs text-muted-foreground">+{repo.topics.length - 5} more</span>
                    )}
                  </div>

                  <div className="mt-4 sm:mt-5 pt-3 border-t border-border/30 flex flex-wrap items-center gap-3 sm:gap-4">
                    {repo.language && (
                      <span className="flex items-center gap-1 whitespace-nowrap text-xs">
                        <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
                        <span className="text-muted-foreground">{repo.language}</span>
                      </span>
                    )}

                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 whitespace-nowrap text-xs">
                        <Star className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-muted-foreground">{repo.stargazers_count.toLocaleString()}</span>
                      </span>
                    )}

                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 whitespace-nowrap text-xs">
                        <GitFork className="h-3.5 w-3.5 text-blue-500" />
                        <span className="text-muted-foreground">{repo.forks_count.toLocaleString()}</span>
                      </span>
                    )}

                    {repo.watchers_count > 0 && (
                      <span className="flex items-center gap-1 whitespace-nowrap text-xs">
                        <Eye className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-muted-foreground">{repo.watchers_count.toLocaleString()}</span>
                      </span>
                    )}

                    {repo.updated_at && (
                      <span className="flex items-center gap-1 whitespace-nowrap text-xs ml-auto">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span className="text-muted-foreground/60">{formatDate(repo.updated_at)}</span>
                      </span>
                    )}
                  </div>

                  {repo.homepage && (
                    <Link
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center"
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
              );
            })}
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-60 right-10 w-16 h-16 border border-primary/10 rounded-full animate-pulse-slow opacity-30 hidden md:block"></div>
        <div className="absolute bottom-40 left-10 w-10 h-10 border border-primary/10 rounded-full animate-float opacity-30 hidden md:block"></div>
      </motion.section>
    </div>
  );
}
