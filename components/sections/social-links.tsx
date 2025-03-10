import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Github, InstagramIcon, Linkedin, Rss } from "lucide-react"
import { fadeInUp } from "@/lib/animations"

export function SocialLinks() {
  return (
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
  )
}