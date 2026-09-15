"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, MapPin, Linkedin, Github, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface FormFields {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}
type FormErrors = Partial<Record<keyof Omit<FormFields, "honeypot">, string>>

function validate(fields: Omit<FormFields, "honeypot">): FormErrors {
  const errors: FormErrors = {}
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters"
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Please enter a valid email address"
  if (!fields.subject.trim() || fields.subject.trim().length < 5)
    errors.subject = "Subject must be at least 5 characters"
  if (!fields.message.trim() || fields.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters"
  if (fields.message.trim().length > 500)
    errors.message = "Message must be 500 characters or less"
  return errors
}

/** Brutalist input — thick border, mono placeholder, hot orange invalid state. */
const inputBase =
  "w-full border-2 bg-background px-3 py-2.5 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus-within:shadow-brutal-sm transition-shadow disabled:opacity-50"

export function ContactPage() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { honeypot, ...formData } = fields
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch(
        `https://formspree.io/f/${siteConfig.formspreeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: formData.subject,
            message: formData.message,
            _gotcha: honeypot,
          }),
        }
      )
      const data = await res.json()
      if (res.ok) {
        toast.success("Message sent", {
          description: "Thanks for reaching out. I'll get back to you soon.",
        })
        setFields({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        })
        setErrors({})
        setSubmitted(true)
      } else {
        const errMsg = data?.errors?.[0]?.message ?? "Please try again."
        toast.error("Failed to send", { description: errMsg })
      }
    } catch {
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const charCount = fields.message.length

  return (
    <div className="container max-w-screen-2xl">
      {/* Editorial hero */}
      <section className="border-b-2 border-foreground py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-baseline gap-4">
              <span className="column-numeral">TX</span>
              <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
                Transmission · Contact
              </span>
            </div>
            <h1 className="mt-4 font-serif text-6xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl">
              <span className="italic">Let&apos;s</span>
              <br />
              talk<span className="text-accent-hot">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Have a project in mind, a question, or just want to say hello?
              Fill in the form or drop me a note directly.
            </p>
          </div>

          {/* Contact card */}
          <aside className="md:col-span-4">
            <div className="border-2 border-foreground bg-card shadow-brutal">
              <div className="border-b-2 border-foreground bg-accent-lime px-4 py-2 text-accent-lime-foreground">
                <p className="flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-widest">
                  <span className="h-2 w-2 animate-pulse bg-accent-lime-foreground" />
                  Available for work
                </p>
              </div>
              <dl className="divide-y-2 divide-foreground/10 p-2 font-mono text-sm">
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Based in"
                  value={siteConfig.location}
                />
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={siteConfig.email}
                  href={`mailto:${siteConfig.email}`}
                />
                <ContactRow
                  icon={<Linkedin className="h-4 w-4" />}
                  label="LinkedIn"
                  value="basilinjoe"
                  href={siteConfig.links.linkedin}
                />
                <ContactRow
                  icon={<Github className="h-4 w-4" />}
                  label="GitHub"
                  value="basilinjoe"
                  href={siteConfig.links.github}
                />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Form */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="py-16 md:py-24"
      >
        <div className="mb-8 flex items-baseline gap-4">
          <span className="column-numeral">FR</span>
          <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent-hot">
            Form · Send a message
          </span>
        </div>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-6 border-2 border-foreground bg-card p-6 shadow-brutal md:p-8"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="honeypot"
            value={fields.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            autoComplete="off"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name" error={errors.name} required>
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder="Your name"
                disabled={isSubmitting}
                className={cn(
                  inputBase,
                  errors.name ? "border-destructive" : "border-foreground"
                )}
              />
            </Field>

            <Field label="Email" error={errors.email} required>
              <input
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="you@example.com"
                disabled={isSubmitting}
                className={cn(
                  inputBase,
                  errors.email ? "border-destructive" : "border-foreground"
                )}
              />
            </Field>
          </div>

          <Field label="Subject" error={errors.subject} required>
            <input
              type="text"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              disabled={isSubmitting}
              className={cn(
                inputBase,
                errors.subject ? "border-destructive" : "border-foreground"
              )}
            />
          </Field>

          <Field label="Message" error={errors.message} required>
            <div className="relative">
              <textarea
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="Write your message here… (20-500 characters)"
                rows={6}
                disabled={isSubmitting}
                className={cn(
                  inputBase,
                  "resize-none",
                  errors.message ? "border-destructive" : "border-foreground"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-2 right-3 font-mono text-micro uppercase tracking-widest",
                  charCount > 500
                    ? "text-destructive"
                    : "text-muted-foreground"
                )}
              >
                {charCount}/500
              </span>
            </div>
          </Field>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground/10 pt-4">
            <p className="font-mono text-micro uppercase tracking-widest text-muted-foreground">
              Powered by Formspree · Honeypot spam guard
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 border-2 border-foreground bg-accent-hot px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-accent-hot-foreground shadow-brutal-sm transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send transmission
                </>
              )}
            </button>
          </div>

          {submitted && (
            <p className="flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-widest text-success">
              <span className="inline-block h-2 w-2 bg-success" />
              Message sent. I&apos;ll be in touch shortly.
            </p>
          )}
        </motion.form>
      </motion.section>
    </div>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <span
      className={cn(
        "text-sm",
        href ? "text-foreground hover:text-accent-hot underline decoration-accent-hot decoration-2 underline-offset-2" : "text-foreground"
      )}
    >
      {value}
    </span>
  )
  return (
    <div className="flex items-start gap-3 px-2 py-2.5">
      <span className="mt-0.5 border-2 border-foreground bg-background p-1 text-foreground">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-micro uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        {href ? (
          <Link href={href} target="_blank" rel="noreferrer">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 font-mono text-micro font-bold uppercase tracking-widest">
        {label}
        {required && <span className="text-accent-hot">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 font-mono text-xs text-destructive">
          <span aria-hidden>▲</span>
          {error}
        </p>
      )}
    </div>
  )
}
