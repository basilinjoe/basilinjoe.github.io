"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Github, InstagramIcon, Linkedin, Mail, MapPin, Rss, CalendarIcon, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/lib/blog"
import { fadeInUp, staggerContainer, scaleUp, slideIn } from "@/lib/animations"

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
      {/* Profile Section */}
      <motion.div variants={fadeInUp} className="flex max-w-[980px] flex-col items-start gap-2">
        <div className="flex flex-col md:flex-row">
          <motion.div 
            variants={scaleUp}
            className="flex basis mr-5 justify-center"
          >
            <Image
              className="rounded-full"
              src="/avatar.webp"
              alt="Profile Picture"
              width={208}
              height={208}
              priority
            />
          </motion.div>
          <motion.div variants={slideIn} className="basis">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
              {siteConfig.name}
            </h1>
            <h2 className="text-xl leading-tight tracking-tighter">
              {siteConfig.position}</h2>
            <p className="max-w-[700px] text-md text-muted-foreground">
              {siteConfig.aboutMe}
            </p>
            <div className="flex flex-col md:flex-row">
              <div className="flex">
                <MapPin className="mt-1 mr-1 h-5 w-5" />
                <p className="mt-1 mr-5">{siteConfig.location}</p>
              </div>
              <div className="flex">
                <Mail className="mt-1 mr-1 h-5 w-5" />
                <p className="mt-1 mr-1">{siteConfig.email}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div variants={fadeInUp} className="flex gap-4 flex-col md:flex-row">
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.linkedin}
          className={buttonVariants({ variant: "outline" })}>
          <Linkedin className="mr-2 h-4 w-4" /> Linkedin
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.medium}
          className={buttonVariants({ variant: "outline" })}
        >
          <Rss className="mr-2 h-4 w-4" /> Medium
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.instagram}
          className={buttonVariants({ variant: "outline" })}
        >
          <InstagramIcon className="mr-2 h-4 w-4" /> Instagram
        </Link>
      </motion.div>

      {/* Featured Blog Posts */}
      {featuredPosts.length > 0 && (
        <motion.div variants={fadeInUp} className="flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Featured Posts
            </h1>
            <Link href="/blog" className="text-sm flex items-center hover:text-primary">
              View all posts <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`} className="group">
                  <div className="flex flex-col space-y-2 p-4 border rounded-lg transition-all hover:border-primary">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Work Highlights */}
      <motion.div variants={fadeInUp} className="flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Work Highlights
          </h1>
          <Link href="/about" className="text-sm flex items-center hover:text-primary">
            View full experience <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.experience[0].roles.slice(0, 2).map((role, index) => (
            <motion.div
              key={index}
              variants={scaleUp}
              transition={{ delay: index * 0.2 }}
              className="p-4 border rounded-lg"
            >
              <h3 className="font-semibold">{role.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {role.startDate} - {role.current ? 'Present' : ''}
              </p>
              <div className="space-y-2">
                {role.responsibilities.slice(0, 2).map((resp, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    • {resp}
                  </p>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {role.skills.slice(0, 4).map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills Section */}
      <motion.div variants={fadeInUp} className="flex flex-col">
        <h1 className="text-3xl mb-5 font-extrabold leading-tight tracking-tighter md:text-4xl">
          Skills
        </h1>
        <div className="max-w-[800px]">
          {siteConfig.skills.map((skill, index) => (
            <Badge key={index} className="text-sm mr-1 mb-1" variant="outline">{skill}</Badge>
          ))}
        </div>
      </motion.div>

      {/* Tools Section */}
      <motion.div variants={fadeInUp} className="flex flex-col">
        <h1 className="text-3xl mb-5 font-extrabold leading-tight tracking-tighter md:text-4xl">
          Tools
        </h1>
        <div className="max-w-[800px]">
          {siteConfig.tools.map((tool, i) => (
            <Badge key={i} className="text-sm mr-1 mb-1" variant="outline">{tool}</Badge>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}