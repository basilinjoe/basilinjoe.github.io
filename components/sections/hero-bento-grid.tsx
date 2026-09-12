"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { DynamicGreeting } from "@/components/dynamic-greeting"

function getYearsOfExperience(): number {
  return new Date().getFullYear() - 2015
}

/**
 * Editorial hero — the "hero moment" of the site.
 *
 * 12-column layout. Left (cols 1-8): oversized display serif headline with
 * column numeral and eyebrow. Right (cols 9-12): metadata sidebar with
 * portrait, location, email, and an availability sticker. Below: two big
 * CTAs. Below that: a scroll cue.
 *
 * Hierarchy: display serif >> body sans >> mono metadata. Range is the point.
 * Alignment: strict 12-col grid, broken only for the headline's tightest
 *   letter-spacing (which is intentional, not accidental).
 * Contrast: display serif italic against uppercase mono runs.
 */
export function HeroBentoGrid() {
  const years = getYearsOfExperience()

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative border-b-2 border-foreground pb-16 pt-8 md:pb-24 md:pt-16"
    >
      {/* Eyebrow row: greeting + tiny meta */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <DynamicGreeting />
        <div className="flex items-center gap-2 font-mono text-micro font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-success" />
          Available for conversation
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
        {/* HEADLINE (cols 1-8) */}
        <div className="md:col-span-8">
          <div className="flex items-start gap-4">
            <span className="column-numeral shrink-0">01</span>
            <p className="mt-2 font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
              File 01 · Technology Lead · Experion
            </p>
          </div>

          <motion.h1
            id="hero-headline"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="mt-4 font-serif text-6xl leading-[0.9] tracking-tightest text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Building
            <br />
            <span className="italic text-accent-hot">cloud-native</span>
            <br />
            systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {siteConfig.aboutMe}
          </motion.p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-background transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal"
            >
              Read the writing
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-2 border-foreground bg-accent-lime px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-accent-lime-foreground transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal"
            >
              Get in touch
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* METADATA SIDEBAR (cols 9-12) */}
        <aside className="md:col-span-4">
          <div className="border-2 border-foreground bg-card shadow-brutal">
            {/* Portrait */}
            <div className="relative border-b-2 border-foreground">
              <Image
                src="/avatar.webp"
                alt="Portrait of Basilin Joe"
                width={400}
                height={400}
                priority
                className="h-full w-full object-cover"
              />
              <span className="sticker-hot absolute right-3 top-3">
                Est. 2015
              </span>
            </div>

            {/* Meta rows */}
            <dl className="divide-y-2 divide-foreground/10 font-mono text-sm">
              <MetaRow label="Role" value={siteConfig.position} />
              <MetaRow label="Based in" value={siteConfig.location} />
              <MetaRow label="Experience" value={`${years}+ years shipping`} />
              <MetaRow
                label="Email"
                value={
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="underline decoration-primary underline-offset-2 hover:text-primary"
                  >
                    {siteConfig.email}
                  </a>
                }
              />
            </dl>
          </div>

          {/* Tiny tag row below */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Azure", ".NET", "K8s", "Bicep", "TypeScript"].map((tag) => (
              <span key={tag} className="sticker">
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {/* Scroll cue */}
      <div className="mt-16 flex items-center gap-4 font-mono text-micro uppercase tracking-widest text-muted-foreground">
        <span className="h-px w-16 bg-foreground" />
        <span>Scroll for selected work</span>
        <span aria-hidden className="animate-bounce">↓</span>
      </div>
    </section>
  )
}

function MetaRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-2.5">
      <dt className="w-20 shrink-0 text-micro uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="flex-1 text-sm text-foreground">{value}</dd>
    </div>
  )
}
