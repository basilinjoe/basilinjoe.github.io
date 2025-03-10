import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, scaleUp, slideIn } from "@/lib/animations"
import { MapPin, Mail } from "lucide-react"

export function ProfileSection() {
  return (
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
  )
}