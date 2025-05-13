import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, scaleUp, slideIn } from "@/lib/animations"
import { MapPin, Mail } from "lucide-react"
import { gradients } from "@/lib/design-system/colors"
import { Badge } from "@/components/ui/badge"

export function ProfileSection() {
  return (
    <motion.div 
      variants={fadeInUp} 
      className="flex max-w-[980px] flex-col items-start gap-4 px-4 sm:px-6 md:px-0 relative"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-100/20 to-background dark:from-primary-900/20 dark:to-background -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-start p-6 rounded-xl">
        <motion.div 
          variants={scaleUp}
          className="flex justify-center mb-6 md:mb-0 md:mr-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 to-blue-400/20 rounded-full blur-md"></div>
          <Image
            className="rounded-full ring-2 ring-white dark:ring-zinc-800 ring-offset-2 ring-offset-background relative z-10 shadow-lg"
            src="/avatar.webp"
            alt="Profile Picture"
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
          <div className="inline-block">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2">
              {siteConfig.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg sm:text-xl leading-tight tracking-tighter">
              {siteConfig.position}
            </h2>
            <Badge variant="featured" animate size="md" className="font-normal">Available for work</Badge>
          </div>
          <p className="max-w-full sm:max-w-[600px] md:max-w-[700px] text-sm sm:text-md text-foreground pt-2">
            {siteConfig.aboutMe}
          </p>
          <div className="flex flex-col sm:flex-row mt-4">
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
              <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
              <p className="text-sm">{siteConfig.location}</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
              <p className="text-sm">{siteConfig.email}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}