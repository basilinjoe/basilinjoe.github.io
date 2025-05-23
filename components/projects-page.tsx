"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Github, Star, GitFork, Eye, Code, Briefcase, CodeSquare } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Repository } from "@/lib/github"

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

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
          {repos.map((repo) => {
            const category = getRepoCategory(repo.topics);
            return (
              <motion.div
                key={repo.name}
                variants={fadeInUp}
                className={`flex flex-col rounded-lg border border-border/60 p-5 sm:p-6 
                  transition-all duration-300 hover:shadow-md 
                  bg-gradient-to-br ${categoryBackgrounds[category]}`}
              >
                <div className="flex items-start justify-between">
                  <div className="mr-2">
                    <h2 className="font-semibold text-base sm:text-lg break-words line-clamp-1 group">
                      <Link href={repo.html_url} target="_blank" rel="noreferrer"
                        className="hover:text-primary transition-colors group-hover:underline inline-flex items-center"
                      >
                        <CodeSquare className="mr-1.5 h-4 w-4 text-primary/70" />
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
                  {repo.topics?.slice(0, 5).map((topic) => (<Badge
                    key={topic}
                    variant="tech"
                    className="whitespace-nowrap text-xs"
                  >
                    {topic}
                  </Badge>))}
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
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}