import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"

export function SkillsAndTools() {
  return (
    <>
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
    </>
  )
}