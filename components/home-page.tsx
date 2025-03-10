"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { BlogPost } from "@/lib/blog"
import { ProfileSection } from "./sections/profile-section"
import { SocialLinks } from "./sections/social-links"
import { FeaturedPosts } from "./sections/featured-posts"
import { WorkHighlights } from "./sections/work-highlights"
import { SkillsAndTools } from "./sections/skills-and-tools"

interface HomePageProps {
  posts: BlogPost[];
}

export default function HomePage({ posts: featuredPosts }: HomePageProps) {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="container grid items-center gap-8 pb-8 pt-6 md:py-10"
    >
      <ProfileSection />
      <SocialLinks />
      <FeaturedPosts posts={featuredPosts} />
      <WorkHighlights />
      <SkillsAndTools />
    </motion.section>
  )
}