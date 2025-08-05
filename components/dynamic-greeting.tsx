"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Sunrise, Sunset } from "lucide-react"

interface GreetingData {
  text: string
  icon: React.ReactNode
  gradient: string
}

export function DynamicGreeting() {
  const [greeting, setGreeting] = useState<GreetingData>({
    text: "Welcome",
    icon: <Sun className="h-5 w-5" />,
    gradient: "from-yellow-400 to-orange-500"
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let greetingData: GreetingData

      if (hour >= 5 && hour < 12) {
        greetingData = {
          text: "Good morning",
          icon: <Sunrise className="h-5 w-5" />,
          gradient: "from-orange-400 to-yellow-500"
        }
      } else if (hour >= 12 && hour < 17) {
        greetingData = {
          text: "Good afternoon",
          icon: <Sun className="h-5 w-5" />,
          gradient: "from-yellow-400 to-orange-500"
        }
      } else if (hour >= 17 && hour < 21) {
        greetingData = {
          text: "Good evening",
          icon: <Sunset className="h-5 w-5" />,
          gradient: "from-purple-400 to-pink-500"
        }
      } else {
        greetingData = {
          text: "Good night",
          icon: <Moon className="h-5 w-5" />,
          gradient: "from-blue-400 to-purple-500"
        }
      }

      setGreeting(greetingData)
    }

    updateGreeting()
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
    >
      <motion.div
        className={`bg-gradient-to-r ${greeting.gradient} p-1 rounded`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {greeting.icon}
      </motion.div>
      <span className="animate-fade-in">{greeting.text}, I&apos;m glad you&apos;re here!</span>
    </motion.div>
  )
}

export function Tagline({ text }: { text?: string }) {
  const taglines = [
    "Transforming complex challenges into scalable cloud solutions",
    "Building resilient systems that power business growth",
    "Architecting tomorrow's digital infrastructure today",
    "Where innovation meets enterprise-grade reliability"
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Use static text if provided, otherwise rotate through taglines
  const displayText = text || taglines[currentIndex]

  useEffect(() => {
    setMounted(true)
    
    // Only rotate if no static text is provided
    if (!text) {
      const interval = setInterval(() => {
        setIsVisible(false)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % taglines.length)
          setIsVisible(true)
        }, 500)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [text, taglines.length])

  return (
    <motion.p
      key={text ? "static" : currentIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
      transition={{ duration: 0.5 }}
      className="text-lg text-muted-foreground font-medium max-w-2xl"
    >
      {displayText}
    </motion.p>
  )
}