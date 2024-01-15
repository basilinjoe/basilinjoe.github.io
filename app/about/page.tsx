import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {siteConfig.experience.map((exp) => (
        <>
          <div className="flex flex-row">
            <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{exp.company}</h2>
            {exp.current && <span className="flex w-3 h-3 m-3 me-3 bg-green-500 rounded-full"></span>}
          </div>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {exp.roles.map(role => (
              <>
                <li className="ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{role.startDate}</time>
                  <div className="flex flex-row">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                    {role.current && <span className="flex w-2 h-2 m-2 me-3 bg-green-500 rounded-full"></span>}
                  </div>
                  <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {role.responsibilities.map((res, i) => (
                      <li key={i} className="ms-4 list-disc">{res}</li>
                    ))}
                  </ul>
                </li>
                <li className="mb-5 ms-4">
                  {role.skills.map((skill,i) => (
                    <Badge key={i} className="mr-1" variant="outline">{skill}</Badge>
                  ))}
                </li>
              </>
            ))}
          </ol>
        </>
      ))}

      {/* <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Vyooha Technologies</h2>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        <li className="ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2022</time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technology Lead</h3>
            <ul className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li className="ms-4 list-disc"> Designed and developed robust MEAN stack web applications, ensuring dynamic and efficient solutions.</li>
              <li className="ms-4 list-disc"> Wrote secure and scalable code adhering to industry best practices and coding standards.</li>
              <li className="ms-4 list-disc"> Conducted thorough testing and debugging for optimal functionality and user experience.</li>
              <li className="ms-4 list-disc"> Successfully deployed web applications to production environments, ensuring seamless operations.</li>
              <li className="ms-4 list-disc"> Collaborated with developers and stakeholders to translate user requirements into actionable tasks.</li>
              <li className="ms-4 list-disc"> Actively participated in meetings, providing insights to enhance web application usability and effectiveness.</li>
            </ul>
        </li>
      </ol> */}
    </section>
  )
}
