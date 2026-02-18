"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Mail, MapPin, Linkedin, Github, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

// --- Types ---
interface FormFields {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

type FormErrors = Partial<Record<keyof Omit<FormFields, 'honeypot'>, string>>

// --- Validation ---
function validate(fields: Omit<FormFields, 'honeypot'>): FormErrors {
  const errors: FormErrors = {}
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters'
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Please enter a valid email address'
  if (!fields.subject.trim() || fields.subject.trim().length < 5)
    errors.subject = 'Subject must be at least 5 characters'
  if (!fields.message.trim() || fields.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters'
  if (fields.message.trim().length > 500)
    errors.message = 'Message must be 500 characters or less'
  return errors
}

// --- Info item component ---
function InfoItem({ icon, label, value, href }: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <span className={`text-sm ${href ? 'text-primary hover:underline' : 'text-foreground'}`}>
      {value}
    </span>
  )

  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5 p-2 rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        {href ? <Link href={href} target="_blank" rel="noreferrer">{content}</Link> : content}
      </div>
    </div>
  )
}

// --- Input field wrapper ---
function Field({ label, error, children, required }: {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

// --- Main component ---
export function ContactPage() {
  const [fields, setFields] = useState<FormFields>({
    name: '', email: '', subject: '', message: '', honeypot: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, honeypot }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Message sent!", {
          description: "Thanks for reaching out. I'll get back to you soon."
        })
        setFields({ name: '', email: '', subject: '', message: '', honeypot: '' })
        setErrors({})
        setSubmitted(true)
      } else {
        toast.error("Failed to send", { description: data.error || "Please try again." })
      }
    } catch {
      toast.error("Network error", { description: "Please check your connection and try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const charCount = fields.message.length

  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10" />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container grid items-start gap-8 pb-12 pt-8 md:py-10 px-4 sm:px-6 md:px-8"
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-3">
            Get In Touch
          </h1>
          <div className="h-1 w-20 bg-primary/50 rounded-full mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have a project in mind, a question, or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-5">

          {/* Left: Contact Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-border/60 bg-gradient-to-br from-primary/5 to-background p-6 space-y-5">
              <h2 className="font-semibold text-base">Contact Information</h2>

              <InfoItem
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={siteConfig.location}
              />
              <InfoItem
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <InfoItem
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                value="basilinjoe"
                href={siteConfig.links.linkedin}
              />
              <InfoItem
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                value="basilinjoe"
                href={siteConfig.links.github}
              />
            </div>

            <div className="rounded-lg border border-border/60 bg-gradient-to-br from-emerald-500/5 to-background p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Available for work</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Open to freelance projects, consulting, and full-time opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-border/60 bg-background p-6 space-y-5">
              {/* Honeypot — hidden from real users */}
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

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" error={errors.name} required>
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    className={`w-full rounded-md border px-3 py-2 text-sm bg-background
                      placeholder:text-muted-foreground transition-colors
                      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${errors.name ? 'border-destructive' : 'border-border/60 hover:border-border'}`}
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
                    className={`w-full rounded-md border px-3 py-2 text-sm bg-background
                      placeholder:text-muted-foreground transition-colors
                      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${errors.email ? 'border-destructive' : 'border-border/60 hover:border-border'}`}
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
                  className={`w-full rounded-md border px-3 py-2 text-sm bg-background
                    placeholder:text-muted-foreground transition-colors
                    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.subject ? 'border-destructive' : 'border-border/60 hover:border-border'}`}
                />
              </Field>

              <Field label="Message" error={errors.message} required>
                <div className="relative">
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Write your message here… (20–500 characters)"
                    rows={5}
                    disabled={isSubmitting}
                    className={`w-full rounded-md border px-3 py-2 text-sm bg-background
                      placeholder:text-muted-foreground transition-colors resize-none
                      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${errors.message ? 'border-destructive' : 'border-border/60 hover:border-border'}`}
                  />
                  <span className={`absolute bottom-2 right-2 text-xs ${charCount > 500 ? 'text-destructive' : 'text-muted-foreground/60'}`}>
                    {charCount}/500
                  </span>
                </div>
              </Field>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              {submitted && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  Message sent! I&apos;ll be in touch shortly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
