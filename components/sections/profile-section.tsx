import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, scaleUp, slideIn } from "@/lib/animations"
import { MapPin, Mail } from "lucide-react"

export function ProfileSection() {
  return (
    <motion.div variants={fadeInUp} className="flex max-w-[980px] flex-col items-start gap-4 px-4 sm:px-6 md:px-0">
      <div className="flex flex-col md:flex-row md:items-start">
        <motion.div 
          variants={scaleUp}
          className="flex justify-center mb-6 md:mb-0 md:mr-8"
        >
          <Image
            className="rounded-full"
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
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
            {siteConfig.name}
          </h1>
          <h2 className="text-lg sm:text-xl leading-tight tracking-tighter pt-1">
            {siteConfig.position}</h2>
          <p className="max-w-full sm:max-w-[600px] md:max-w-[700px] text-sm sm:text-md text-muted-foreground pt-2">
            {siteConfig.aboutMe}
          </p>
          <div className="flex flex-col sm:flex-row mt-4">
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
              <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{siteConfig.location}</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{siteConfig.email}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}