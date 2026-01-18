import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"
import { Cloud, Code2, Layers, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Cloud",
    icon: Cloud,
    color: "text-blue-500",
    skills: ["Azure", "AWS", "Kubernetes", "Docker", "Terraform"],
  },
  {
    title: "Languages",
    icon: Code2,
    color: "text-emerald-500",
    skills: ["C#", "TypeScript", "JavaScript", "Python"],
  },
  {
    title: "Frameworks",
    icon: Layers,
    color: "text-purple-500",
    skills: [".NET", "React", "Angular", "Next.js"],
  },
  {
    title: "Tools",
    icon: Wrench,
    color: "text-amber-500",
    skills: ["Azure DevOps", "GitHub", "SQL Server"],
  },
]

export function SkillsAndTools() {
  return (
    <motion.div variants={fadeInUp}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {skillCategories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.title} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${category.color}`} />
                <span className="text-xs font-medium text-muted-foreground">{category.title}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 h-5 font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
