"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fadeInUp, staggerContainer, slideIn } from "@/lib/animations"

export default function AboutPage() {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="container grid items-center gap-6 pb-8 pt-6 md:py-10"
    >
      {siteConfig.experience.map((exp, index) => (
        <motion.div 
          key={`exp-${index}`}
          variants={fadeInUp}
          transition={{ delay: index * 0.2 }}
        >
          <div className="flex flex-row">
            <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{exp.company}</h2>
            {exp.current && <span className="flex w-3 h-3 m-3 me-3 bg-green-500 rounded-full"></span>}
          </div>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {exp.roles.map((role, roleIndex) => (
              <motion.div 
                key={`role-${roleIndex}`}
                variants={slideIn}
                transition={{ delay: roleIndex * 0.1 }}
              >
                <li className="ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{role.startDate}</time>
                  <div className="flex flex-row">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                    {role.current && <span className="flex w-2 h-2 m-2 me-3 bg-green-500 rounded-full"></span>}
                  </div>
                  <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {role.responsibilities.map((res, i) => (
                      <motion.li 
                        key={`resp-${roleIndex}-${i}`} 
                        variants={fadeInUp}
                        className="ms-4 list-disc"
                      >
                        {res}
                      </motion.li>
                    ))}
                  </ul>
                </li>
                <li className="mb-5 ms-4">
                  {role.skills.map((skill, i) => (
                    <motion.span
                      key={`skill-${roleIndex}-${i}`}
                      variants={fadeInUp}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Badge className="mr-1" variant="outline">{skill}</Badge>
                    </motion.span>
                  ))}
                </li>
              </motion.div>
            ))}
          </ol>
        </motion.div>
      ))}
    </motion.section>
  )
}