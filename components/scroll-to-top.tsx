"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300)
    window.addEventListener("scroll", toggle)
    toggle()
    return () => window.removeEventListener("scroll", toggle)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border-2 border-foreground bg-accent-hot text-accent-hot-foreground shadow-brutal transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
