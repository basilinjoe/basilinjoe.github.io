"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fadeInUp, staggerContainer, slideIn } from "@/lib/animations"
import { Building, Calendar, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container grid items-center gap-8 pb-12 pt-8 md:py-10"
      >
        <motion.div variants={fadeInUp} className="mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-3">
            About Me
          </h1>
          <div className="h-1 w-20 bg-primary/50 rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            My professional journey and experience building software solutions.
          </p>
        </motion.div>
        
        {siteConfig.experience.map((exp, index) => (
          <motion.div 
            key={`exp-${index}`}
            variants={fadeInUp}
            transition={{ delay: index * 0.2 }}
            className="p-6 rounded-lg border border-border/50 bg-gradient-to-br from-background to-primary-50/5 dark:from-background dark:to-primary-900/5 hover:shadow-md transition-all"
          >
            <div className="flex flex-row items-center mb-4">
              <Building className="mr-2 h-5 w-5 text-primary" />
              <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text">{exp.company}</h2>
              {exp.current && <span className="flex w-3 h-3 ml-3 bg-green-500 rounded-full shadow-glow animate-pulse"></span>}
            </div>
            <ol className="relative border-s border-primary-300/30 dark:border-primary-800/30 space-y-8 ml-3">
              {exp.roles.map((role, roleIndex) => (
                <motion.div 
                  key={`role-${roleIndex}`}
                  variants={slideIn}
                  transition={{ delay: roleIndex * 0.1 }}
                >
                  <li className="ms-6">
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full mt-1.5 -start-2 border-2 border-primary/40 dark:border-primary/60"></div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-primary/70" />
                      <time className="mb-1 text-sm font-normal text-muted-foreground">{role.startDate}</time>
                    </div>
                    <div className="flex flex-row items-center">
                      <h3 className="text-lg font-semibold text-foreground">{role.name}</h3>
                      {role.current && <Badge variant="featured" size="sm" className="ml-3">Current</Badge>}
                    </div>                    <ul className="mt-3 mb-4 space-y-2 text-muted-foreground">
                      {role.responsibilities.map((res, i) => (
                        <motion.li 
                          key={`resp-${roleIndex}-${i}`} 
                          variants={fadeInUp}
                          className="flex items-start"
                        >
                          <div className="min-w-[6px] h-[6px] mt-[0.5rem] mr-2 rounded-full bg-primary/40"></div>
                          <span>{res}</span>
                        </motion.li>
                      ))}
                    </ul>
                </li>
                <li className="mb-5 ms-4">
                  {role.skills.map((skill, i) => {
                    // Determine skill category based on content
                    const skillLower = skill.toLowerCase();
                    let variant = "skill";
                    
                    // Frontend skills
                    if (skillLower.includes('react') || skillLower.includes('typescript') || 
                        skillLower.includes('javascript') || skillLower.includes('html') || 
                        skillLower.includes('css') || skillLower.includes('ui')) {
                      variant = "featured";
                    } 
                    // Backend skills
                    else if (skillLower.includes('node') || skillLower.includes('.net') || 
                             skillLower.includes('c#') || skillLower.includes('java') || 
                             skillLower.includes('python') || skillLower.includes('api')) {
                      variant = "secondary";
                    }
                    // DevOps/Cloud skills
                    else if (skillLower.includes('cloud') || skillLower.includes('azure') || 
                             skillLower.includes('aws') || skillLower.includes('devops')) {
                      variant = "tech";
                    }
                    
                    return (
                      <motion.span
                        key={`skill-${roleIndex}-${i}`}
                        variants={fadeInUp}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Badge className="mr-1.5 mb-1.5" variant={variant}>{skill}</Badge>
                      </motion.span>
                    );
                  })}                </li>
              </motion.div>
            ))}
          </ol>
        </motion.div>
      ))}
      
      {/* Additional decorative elements */}
      <div className="absolute top-40 right-10 w-16 h-16 border border-primary/10 rounded-full animate-pulse-slow opacity-30 hidden md:block"></div>
      <div className="absolute bottom-60 left-10 w-10 h-10 border border-primary/10 rounded-full animate-float opacity-30 hidden md:block"></div>
    </motion.section>
    </div>
  )
}