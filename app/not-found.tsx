"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, scaleUp } from "@/lib/animations"

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <section className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 max-w-2xl"
        >
          {/* 404 Icon */}
          <motion.div variants={scaleUp} className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
            <FileQuestion className="h-32 w-32 text-primary relative z-10" />
          </motion.div>
          
          {/* Error Code */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tighter sm:text-8xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Page Not Found
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
            </p>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            variants={fadeInUp} 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/blog">
                <Search className="h-4 w-4" />
                Browse Blog
              </Link>
            </Button>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="pt-8 border-t w-full">
            <p className="text-sm text-muted-foreground mb-4">Here are some helpful links:</p>
            <nav className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link 
                href="/" 
                className="text-sm hover:text-primary transition-colors flex items-center gap-1 justify-center"
              >
                <ArrowLeft className="h-3 w-3" />
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-sm hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link 
                href="/projects" 
                className="text-sm hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link 
                href="/blog" 
                className="text-sm hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </nav>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute top-40 right-10 w-16 h-16 border border-primary/10 rounded-full animate-pulse-slow opacity-30 hidden md:block"></div>
          <div className="absolute bottom-60 left-10 w-10 h-10 border border-primary/10 rounded-full animate-float opacity-30 hidden md:block"></div>
        </motion.div>
      </section>
    </div>
  )
}