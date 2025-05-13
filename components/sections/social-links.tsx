import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { Github, InstagramIcon, Linkedin, Rss } from "lucide-react"
import { fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

// Social media brand colors
const socialBrands = {
  github: {
    bgLight: "hover:bg-zinc-900 hover:border-zinc-900 hover:text-white",
    bgDark: "dark:hover:bg-white dark:hover:border-white dark:hover:text-zinc-900",
    icon: Github,
  },
  linkedin: {
    bgLight: "hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:text-white",
    bgDark: "dark:hover:bg-[#0a66c2] dark:hover:border-[#0a66c2] dark:hover:text-white",
    icon: Linkedin,
  },
  medium: {
    bgLight: "hover:bg-[#02b875] hover:border-[#02b875] hover:text-white",
    bgDark: "dark:hover:bg-[#02b875] dark:hover:border-[#02b875] dark:hover:text-white",
    icon: Rss,
  },
  instagram: {
    bgLight: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:via-[#dc2743] hover:via-[#cc2366] hover:to-[#bc1888] hover:border-[#dc2743] hover:text-white",
    bgDark: "dark:hover:bg-gradient-to-br dark:hover:from-[#f09433] dark:hover:via-[#e6683c] dark:hover:via-[#dc2743] dark:hover:via-[#cc2366] dark:hover:to-[#bc1888] dark:hover:border-[#dc2743] dark:hover:text-white",
    icon: InstagramIcon,
  }
};

interface SocialLinkProps {
  href: string;
  platform: keyof typeof socialBrands;
  label: string;
}

// A custom SocialLink component with brand styling
function SocialLink({ href, platform, label }: SocialLinkProps) {
  const { bgLight, bgDark, icon: Icon } = socialBrands[platform];
  
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        target="_blank"
        rel="noreferrer"
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          "border border-input hover:shadow-md px-4 py-2",
          bgLight,
          bgDark
        )}
      >
        <Icon className="mr-2 h-4 w-4" /> {label}
      </Link>
    </motion.div>
  );
}

export function SocialLinks() {
  return (
    <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap pt-2">
      <SocialLink
        href={siteConfig.links.github}
        platform="github"
        label="GitHub"
      />
      <SocialLink
        href={siteConfig.links.linkedin}
        platform="linkedin"
        label="LinkedIn"
      />
      <SocialLink
        href={siteConfig.links.medium}
        platform="medium"
        label="Medium"
      />
      <SocialLink
        href={siteConfig.links.instagram}
        platform="instagram"
        label="Instagram"
      />
    </motion.div>
  )
}