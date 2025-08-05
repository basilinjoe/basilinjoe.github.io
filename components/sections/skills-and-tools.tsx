import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Globe, Laptop, LineChart, Server } from "lucide-react"

// Skill categorization functions for colorful display
const getSkillCategory = (skill: string) => {
  const s = skill.toLowerCase();
  
  // Frontend skills
  if (s.includes('react') || s.includes('typescript') || s.includes('javascript') || 
      s.includes('html') || s.includes('css') || s.includes('ui') || 
      s.includes('ux') || s.includes('angular') || s.includes('vue')) {
    return {
      variant: 'featured' as const,
      icon: <Code className="w-3 h-3" />
    };
  } 
  // Backend skills
  else if (s.includes('node') || s.includes('.net') || s.includes('c#') || 
           s.includes('java') || s.includes('python') || s.includes('api') || s.includes('graphql')) {
    return {
      variant: 'secondary' as const,
      icon: <Server className="w-3 h-3" />
    };
  }
  // Cloud & DevOps
  else if (s.includes('cloud') || s.includes('azure') || s.includes('aws') || 
           s.includes('devops') || s.includes('docker') || s.includes('kubernetes')) {
    return {
      variant: 'tech' as const,
      icon: <Globe className="w-3 h-3" />
    };
  }
  // Data & ML
  else if (s.includes('data') || s.includes('ml') || s.includes('ai') || 
           s.includes('analytics') || s.includes('machine learning')) {
    return {
      variant: 'skill' as const,
      icon: <LineChart className="w-3 h-3" />
    };
  }
  // Default case
  else {
    return {
      variant: 'skill' as const,
      icon: <Laptop className="w-3 h-3" />
    };
  }
};

const getToolCategory = (tool: string) => {
  const t = tool.toLowerCase();
  
  // Development tools
  if (t.includes('visual studio') || t.includes('vscode') || t.includes('intellij') || 
      t.includes('sublime') || t.includes('git') || t.includes('eclipse')) {
    return 'tech';
  } 
  // Cloud tools
  else if (t.includes('azure') || t.includes('aws') || t.includes('gcp') || 
           t.includes('firebase') || t.includes('netlify')) {
    return 'featured';
  }
  // Data tools
  else if (t.includes('sql') || t.includes('mongodb') || t.includes('postgres') || 
           t.includes('dynamo') || t.includes('cosmos')) {
    return 'secondary';
  }
  // Default
  else {
    return 'skill';
  }
};

export function SkillsAndTools() {
  return (
    <>
      <motion.div 
        variants={fadeInUp} 
        className="flex flex-col p-6 rounded-lg bg-gradient-to-br from-background to-primary-50/10 dark:from-background dark:to-primary-900/10 border border-border/50"
      >
        <div className="flex items-center mb-5">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl relative">
            Skills
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
          </h1>
          <div className="flex ml-auto gap-2">
            <div className="flex items-center text-xs px-2 py-1 rounded-full bg-primary-200/20 dark:bg-primary-800/20 text-primary-700 dark:text-primary-300">
              <Code className="w-3 h-3 mr-1" /> Frontend
            </div>
            <div className="flex items-center text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground/80">
              <Server className="w-3 h-3 mr-1" /> Backend
            </div>
            <div className="flex items-center text-xs px-2 py-1 rounded-full bg-blue-100/30 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              <Globe className="w-3 h-3 mr-1" /> Cloud
            </div>
          </div>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          className="max-w-[800px]"
        >
          {siteConfig.skills.map((skill, index) => {
            const category = getSkillCategory(skill);
            return (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="inline-block mr-2 mb-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant={category.variant}
                  className="text-sm px-3 hover:shadow-md transition-all cursor-default group relative overflow-hidden" 
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                  <span className="mr-1 text-primary/70 group-hover:rotate-12 transition-transform duration-300">{category.icon}</span> 
                  <span className="relative z-10">{skill}</span>
                </Badge>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div 
        variants={fadeInUp} 
        className="flex flex-col p-6 rounded-lg mt-6 bg-gradient-to-tr from-background to-primary-50/5 dark:from-background dark:to-primary-900/5 border border-border/50"
      >
        <div className="flex items-center mb-5">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl relative">
            Tools
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
          </h1>
          <div className="flex ml-auto gap-2">
            <div className="flex items-center text-xs px-2 py-1 rounded-full bg-emerald-100/30 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
              <Laptop className="w-3 h-3 mr-1" /> Dev
            </div>
            <div className="flex items-center text-xs px-2 py-1 rounded-full bg-amber-100/30 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              <Database className="w-3 h-3 mr-1" /> Data
            </div>
          </div>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          className="max-w-[800px]"
        >
          {siteConfig.tools.map((tool, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="inline-block mr-2 mb-2"
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ rotate: { duration: 0.3 } }}
            >
              <Badge 
                variant={getToolCategory(tool) as any} 
                className="text-sm px-3 hover:shadow-md transition-all cursor-default group relative overflow-hidden"
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                <span className="relative z-10">{tool}</span>
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  )
}