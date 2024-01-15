import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Github, InstagramIcon, Linkedin, Mail, MapPin, Rss } from "lucide-react"
import { Badge } from "@/components/ui/badge"


export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <div className="flex flex-row">
          <div className="flex basis-1/4">
            <img className="rounded-full w-52 h-52" src="avatar.jpg" alt="image description" />
          </div>
          <div className="basis">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
              {siteConfig.name}
            </h1>
            <h2 className="text-xl leading-tight tracking-tighter">
              {siteConfig.position}</h2>
            <p className="max-w-[700px] text-md text-muted-foreground">
              {siteConfig.aboutMe}
            </p>
            <div className="flex flex-row">
              <MapPin className="mt-1 mr-1 h-5 w-5" />
              <p className="mt-1 mr-5" >{siteConfig.location}</p>
              <Mail className="mt-1 mr-1 h-5 w-5" />
              <p className="mt-1 mr-1" >{siteConfig.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.linkedin}
          className={buttonVariants({ variant: "outline" })}>
          <Linkedin className="mr-2 h-4 w-4" /> Linkedin
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.medium}
          className={buttonVariants({ variant: "outline" })}
        >
          <Rss className="mr-2 h-4 w-4" /> Medium
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.instagram}
          className={buttonVariants({ variant: "outline" })}
        >
          <InstagramIcon className="mr-2 h-4 w-4" /> Instagram
        </Link>
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl mb-5 font-extrabold leading-tight tracking-tighter md:text-4xl">
          Skills
        </h1>
        <div className="max-w-[800px]">
          {siteConfig.skills.map((skill, index) => (
            <Badge key={index} className="text-sm mr-1" variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl mb-5 font-extrabold leading-tight tracking-tighter md:text-4xl">
          Tools
        </h1>
        <div className="max-w-[800px]">
          {siteConfig.tools.map((tool, i) => (
            <Badge key={i} className="text-sm mr-1" variant="outline">{tool}</Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
