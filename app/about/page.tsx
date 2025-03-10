import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {siteConfig.experience.map((exp, index) => (
        <div key={`exp-${index}`}>
          <div className="flex flex-row">
            <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{exp.company}</h2>
            {exp.current && <span className="flex w-3 h-3 m-3 me-3 bg-green-500 rounded-full"></span>}
          </div>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {exp.roles.map((role, roleIndex) => (
              <div key={`role-${roleIndex}`}>
                <li className="ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{role.startDate}</time>
                  <div className="flex flex-row">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                    {role.current && <span className="flex w-2 h-2 m-2 me-3 bg-green-500 rounded-full"></span>}
                  </div>
                  <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {role.responsibilities.map((res, i) => (
                      <li key={`resp-${roleIndex}-${i}`} className="ms-4 list-disc">{res}</li>
                    ))}
                  </ul>
                </li>
                <li className="mb-5 ms-4">
                  {role.skills.map((skill, i) => (
                    <Badge key={`skill-${roleIndex}-${i}`} className="mr-1" variant="outline">{skill}</Badge>
                  ))}
                </li>
              </div>
            ))}
          </ol>
        </div>
      ))}
    </section>
  )
}
