"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { HeroBentoGrid } from "./sections/hero-bento-grid"
import { FeaturedPosts } from "./sections/featured-posts"
import { WorkHighlights } from "./sections/work-highlights"
import { SkillsAndTools } from "./sections/skills-and-tools"
import { GithubProjects } from "./sections/github-projects"
import { Repository } from "@/lib/github"
import { HeroAnimation } from "./hero-animation"
import { siteConfig } from "@/config/site"

interface HomePageProps {
  posts: BlogPost[]
  projects: Repository[]
}

const metrics = [
  { value: `${new Date().getFullYear() - 2015}+`, label: "Years shipping" },
  { value: "2", label: "Cloud platforms" },
  { value: `${siteConfig.skills.length}+`, label: "Technologies" },
  { value: "15+", label: "Projects delivered" },
]

/**
 * The home page as an editorial front page.
 *
 * Order: hero → manifest metric strip → selected writing → work highlights →
 * open source → skills. The scroll rhythm is deliberate: big serif moments
 * (hero, metric numerals) alternate with dense grids (writing rows,
 * project cards, skills list). This is the "hierarchy + contrast" principle
 * applied at the page level.
 */
export default function HomePage({
  posts: featuredPosts,
  projects: githubProjects,
}: HomePageProps) {
  return (
    <div className="relative overflow-hidden">
      <HeroAnimation />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container relative z-10 max-w-screen-2xl"
      >
        <HeroBentoGrid />
        <ManifestMetricStrip />
        <FeaturedPosts posts={featuredPosts} />
        <WorkHighlights />
        <GithubProjects repos={githubProjects} />
        <SkillsAndTools />
      </motion.div>
    </div>
  )
}

/** A row of oversized numerals — hierarchy applied at extreme scale. */
function ManifestMetricStrip() {
  return (
    <section
      aria-label="Career at a glance"
      className="border-b-2 border-foreground py-16 md:py-24"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <span className="column-numeral">02</span>
          <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
            At a glance
          </span>
        </div>
        <p className="max-w-2xl font-serif text-3xl leading-[1.05] tracking-tight md:text-5xl">
          Over a decade of shipping{" "}
          <span className="italic text-accent-hot">production infrastructure</span>{" "}
          for Azure, AWS, and everything that runs on top.
        </p>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 border-t-2 border-foreground pt-10 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <dt className="order-2 font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
              {m.label}
            </dt>
            <dd className="order-1 font-serif text-6xl leading-none tracking-tightest md:text-8xl lg:text-9xl">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
