"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Code, Cloud, Cpu } from "lucide-react"

const heroWords = [
  { text: "Building", icon: Code, color: "text-blue-500" },
  { text: "Architecting", icon: Cloud, color: "text-purple-500" },
  { text: "Innovating", icon: Sparkles, color: "text-yellow-500" },
  { text: "Optimizing", icon: Cpu, color: "text-green-500" },
]

export function InteractiveHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const currentWord = heroWords[currentWordIndex]
  const Icon = currentWord.icon

  return (
    <div 
      className="relative inline-flex items-center gap-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`h-6 w-6 ${currentWord.color}`} />
          </motion.div>
          <span className={`font-bold ${currentWord.color}`}>
            {currentWord.text}
          </span>
        </motion.div>
      </AnimatePresence>
      <span className="text-foreground">scalable solutions</span>
    </div>
  )
}

export function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className="font-mono">
      {displayedText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>
        |
      </span>
    </span>
  )
}