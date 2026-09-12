"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <section className="container flex min-h-[calc(100vh-14rem)] max-w-screen-2xl flex-col items-start justify-center py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 md:grid-cols-12"
      >
        {/* Big 404 numeral */}
        <div className="md:col-span-7">
          <div className="flex items-baseline gap-4">
            <span className="column-numeral">·</span>
            <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
              Filed missing · Error 404
            </span>
          </div>
          <h1 className="mt-4 select-none font-serif text-8xl leading-none tracking-tightest text-accent-hot md:text-11xl">
            404
          </h1>
          <p className="mt-6 max-w-lg font-serif text-2xl italic text-muted-foreground md:text-3xl">
            Nothing filed under this URL.
          </p>
          <p className="mt-2 max-w-lg text-base text-muted-foreground md:text-lg">
            The page might have been moved, renamed, or never existed. Try
            one of these instead:
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-background shadow-brutal-sm transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal"
            >
              <Home className="h-4 w-4" />
              Homepage
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-accent-lime px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-accent-lime-foreground shadow-brutal-sm transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal"
            >
              <Search className="h-4 w-4" />
              Browse writing
            </Link>
          </div>
        </div>

        {/* Quick-jump card */}
        <aside className="md:col-span-5">
          <div className="border-2 border-foreground bg-card shadow-brutal">
            <div className="border-b-2 border-foreground bg-foreground px-4 py-2 text-background">
              <p className="font-mono text-micro font-bold uppercase tracking-widest">
                Nav · Quick jump
              </p>
            </div>
            <ul className="divide-y-2 divide-foreground/10">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between px-4 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-colors hover:bg-accent-lime hover:text-accent-lime-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowLeft className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
                      {link.label}
                    </span>
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </motion.div>
    </section>
  )
}
