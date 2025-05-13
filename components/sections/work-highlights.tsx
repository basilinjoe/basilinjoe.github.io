import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, scaleUp } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, Calendar } from "lucide-react"

// Function to get a skill category for colorful display
const getSkillCategory = (skill: string) => {
  skill = skill.toLowerCase();
  
  if (skill.includes('azure') || skill.includes('cloud') || skill.includes('aws')) {
    return 'tech';
  } else if (skill.includes('react') || skill.includes('angular') || skill.includes('vue') || skill.includes('javascript') || skill.includes('frontend')) {
    return 'featured';
  } else if (skill.includes('.net') || skill.includes('c#') || skill.includes('java') || skill.includes('python') || skill.includes('backend')) {
    return 'secondary';
  } else {
    return 'skill';
  }
};

export function WorkHighlights() {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col">      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center flex-wrap gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text">
            Work Highlights
          </h1>
          <div className="bg-primary/10 dark:bg-primary/20 rounded-full px-3 py-1 text-xs font-semibold text-primary dark:text-primary flex items-center shadow-sm">
            <Briefcase className="w-3 h-3 mr-1" />
            Professional experience
          </div>
        </div>
        <Link href="/about" className="text-sm flex items-center hover:text-primary group">
          View full experience <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {siteConfig.experience[0].roles.slice(0, 2).map((role, index) => (
          <motion.div
            key={index}
            variants={scaleUp}
            transition={{ delay: index * 0.2 }}
            className="p-6 border rounded-lg relative overflow-hidden bg-gradient-to-br from-background to-primary-50/10 dark:from-background dark:to-primary-900/10 hover:shadow-md transition-all group"
            whileHover={{ 
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderColor: "var(--primary-300)",
            }}
          >
            {/* Colorful accent corner */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary-400/20 to-blue-500/20 transform rotate-12 rounded-md"></div>
            
            <h3 className="font-semibold text-lg text-foreground/90 group-hover:text-primary transition-colors relative z-10">
              {role.name}
            </h3>
            <div className="flex items-center mb-3 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1 text-primary/60" />
              <span>
                {role.startDate} - {role.current ? 'Present' : ''}
              </span>
            </div>
            <div className="space-y-2 relative z-10">
              {role.responsibilities.slice(0, 2).map((resp, i) => (
                <div key={i} className="flex items-start text-sm text-muted-foreground">
                  <div className="min-w-[6px] h-[6px] mt-[0.4rem] mr-2 rounded-full bg-primary/40"></div>
                  <p>{resp}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 relative z-10">
              {role.skills.slice(0, 4).map((skill, i) => (
                <Badge 
                  key={i} 
                  variant={getSkillCategory(skill) as any} 
                  size="sm" 
                  className="text-xs"
                >
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