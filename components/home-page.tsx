"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { ProfileSection } from "./sections/profile-section"
import { SocialLinks } from "./sections/social-links"
import { FeaturedPosts } from "./sections/featured-posts"
import { WorkHighlights } from "./sections/work-highlights"
import { SkillsAndTools } from "./sections/skills-and-tools"
import { GithubProjects } from "./sections/github-projects"
import { Repository } from "@/lib/github"

interface HomePageProps {
  posts: BlogPost[];
  projects: Repository[]
}

export default function HomePage({ posts: featuredPosts, projects: githubProjects}: HomePageProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container grid items-center gap-12 pb-12 pt-8 md:py-10 relative z-10"
      >
        <ProfileSection />
        <SocialLinks />
        {/* <GithubProjects repos={githubProjects}/> */}
        <FeaturedPosts posts={featuredPosts} />
        <WorkHighlights />
        <SkillsAndTools />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-5 w-20 h-20 border border-primary/10 rounded-full animate-pulse opacity-30 hidden md:block"></div>
        <div className="absolute bottom-40 left-5 w-12 h-12 border border-primary/10 rounded-full animate-pulse opacity-30 hidden md:block"></div>
        <div className="absolute bottom-96 right-1/4 w-8 h-8 bg-primary/10 rounded-lg rotate-45 animate-spin-slow opacity-30 hidden md:block"></div>
      </motion.section>
    </div>
  )
}