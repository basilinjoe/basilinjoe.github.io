"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Sunrise, Sunset } from "lucide-react"

interface GreetingData {
  text: string
  icon: React.ReactNode
}

export function DynamicGreeting() {
  const [greeting, setGreeting] = useState<GreetingData>({
    text: "Welcome",
    icon: <Sun className="h-5 w-5" />
  })

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let greetingData: GreetingData

      if (hour >= 5 && hour < 12) {
        greetingData = {
          text: "Good morning",
          icon: <Sunrise className="h-5 w-5" />
        }
      } else if (hour >= 12 && hour < 17) {
        greetingData = {
          text: "Good afternoon",
          icon: <Sun className="h-5 w-5" />
        }
      } else if (hour >= 17 && hour < 21) {
        greetingData = {
          text: "Good evening",
          icon: <Sunset className="h-5 w-5" />
        }
      } else {
        greetingData = {
          text: "Good night",
          icon: <Moon className="h-5 w-5" />
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
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-2.5 py-1 font-mono text-micro font-bold uppercase tracking-widest text-foreground shadow-brutal-sm"
    >
      <motion.span
        className="text-accent-hot"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden
      >
        {greeting.icon}
      </motion.span>
      <span>{greeting.text}</span>
    </motion.div>
  )
}
