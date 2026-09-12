"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export function ReadingProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      // Sits below the sticky header (ticker 30px + main 64px = ~94px on desktop, 64px on mobile)
      className="fixed left-0 right-0 top-[64px] z-[60] h-1 origin-left bg-foreground/10 sm:top-[94px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-full origin-left bg-accent-hot"
        style={{ scaleX }}
      />
    </motion.div>
  )
}
