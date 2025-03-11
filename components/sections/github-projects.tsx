"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { getGithubRepos } from "@/lib/github"
import { Github } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

interface Repository {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
}

interface ProjectsListProps {
    repos: Repository[];
}

function ProjectsList({ repos }: ProjectsListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {repos.map((repo) => (
                <motion.div
                    key={repo.name}
                    variants={fadeInUp}
                    className="rounded-lg border p-4 hover:bg-accent"
                >
                    <Link href={repo.html_url} target="_blank" rel="noreferrer" className="space-y-2">
                        <h3 className="font-semibold">{repo.name}</h3>
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {repo.language && <span>{repo.language}</span>}
                            {repo.stargazers_count > 0 && (
                                <span>★ {repo.stargazers_count}</span>
                            )}
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}

function Header() {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    View All
                </Button>
            </Link>
        </div>
    );
}

export function GithubProjects({ repos }: ProjectsListProps) {

    return (
        <div className="space-y-4">
            <Header />
            <Suspense fallback={<div>Loading projects...</div>}>
                <ProjectsList repos={repos} />
            </Suspense>
        </div>
    );
}