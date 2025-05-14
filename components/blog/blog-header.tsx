"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export default function BlogHeader() {
  return (
    <motion.div 
      variants={fadeInUp}
      className="flex max-w-[980px] flex-col items-start gap-2 px-4 sm:px-6 md:px-0"
    >
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-3">
        Blog
      </h1>
      <div className="h-1 w-20 bg-primary/50 rounded-full mb-4"></div>
      <p className="text-lg text-muted-foreground">
        Thoughts, ideas, and experiences about technology and development.
      </p>
    </motion.div>
  )
}
