"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export default function BlogHeader() {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col gap-6 border-b-2 border-foreground pb-10"
    >
      <div className="flex items-baseline gap-4">
        <span className="column-numeral">01</span>
        <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
          Dispatch · Writing
        </span>
      </div>

      <h1 className="font-serif text-6xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl">
        Writing<span className="text-accent-hot">.</span>
      </h1>

      <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
        Field notes on cloud architecture, DevOps, AI, and the messier parts
        of building software at scale. Filed here first, cross-posted rarely.
      </p>
    </motion.div>
  )
}
