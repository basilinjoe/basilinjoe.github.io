import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, scaleUp } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function WorkHighlights() {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Work Highlights
        </h1>
        <Link href="/about" className="text-sm flex items-center hover:text-primary">
          View full experience <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {siteConfig.experience[0].roles.slice(0, 2).map((role, index) => (
          <motion.div
            key={index}
            variants={scaleUp}
            transition={{ delay: index * 0.2 }}
            className="p-4 border rounded-lg"
          >
            <h3 className="font-semibold">{role.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {role.startDate} - {role.current ? 'Present' : ''}
            </p>
            <div className="space-y-2">
              {role.responsibilities.slice(0, 2).map((resp, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  • {resp}
                </p>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {role.skills.slice(0, 4).map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}