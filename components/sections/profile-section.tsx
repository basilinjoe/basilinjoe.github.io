import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, scaleUp, slideIn } from "@/lib/animations"
import { MapPin, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InteractiveHero } from "@/components/interactive-hero"
import { DynamicGreeting, Tagline } from "@/components/dynamic-greeting"
import { SocialLinks } from "./social-links"

export function ProfileSection() {
  return (
    <motion.div 
      variants={fadeInUp} 
      className="flex flex-col items-start gap-4 px-4 sm:px-6 md:px-0"
    >
      <div className="flex flex-col md:flex-row-reverse md:items-start md:justify-between">
        <motion.div
          variants={scaleUp}
          className="flex justify-center mb-6 md:mb-0 md:ml-8 relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary-300/20 to-blue-400/20 rounded-full blur-md"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Image
            className="rounded-full ring-2 ring-white dark:ring-zinc-800 ring-offset-2 ring-offset-background relative z-10 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            src="/avatar.webp"
            alt={`Photo of ${siteConfig.name}`}
            width={160}
            height={160}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 208px"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '160px',
              maxHeight: '160px',
            }}
            priority
          />
        </motion.div>
        <motion.div variants={slideIn} className="flex-1">
          <DynamicGreeting />
          <div className="inline-block">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2">
              {siteConfig.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg sm:text-xl leading-tight tracking-tighter">
              {siteConfig.position}
            </h2>
            <a href={`mailto:${siteConfig.email}?subject=Work Opportunity`}>
              <Badge variant="featured" className="font-normal cursor-pointer hover:bg-primary/90 transition-colors">
                <span className="relative flex h-2 w-2 mr-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for work
              </Badge>
            </a>
          </div>
          <Tagline text={siteConfig.tagline} />
          <div className="mt-3 mb-2">
            <InteractiveHero />
          </div>
          <p className="max-w-full text-sm sm:text-md text-foreground pt-2">
            {siteConfig.aboutMe}
          </p>
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-4 text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
              <span className="text-sm">{siteConfig.location}</span>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center hover:text-primary transition-colors group"
            >
              <Mail className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
              <span className="text-sm group-hover:underline">{siteConfig.email}</span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <Button asChild size="lg" className="gap-2 shadow-md hover:shadow-lg transition-shadow">
              <a href={`mailto:${siteConfig.email}?subject=Hello from your website`}>
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-4">
            <SocialLinks />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}