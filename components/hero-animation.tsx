"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function HeroAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Interactive gradient orbs that follow mouse */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96"
        style={{ x, y }}
      >
        <div className="w-full h-full bg-primary/5 rounded-full filter blur-3xl opacity-50" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 w-72 h-72"
        style={{ 
          x: useTransform(x, (value) => value * -0.5),
          y: useTransform(y, (value) => value * -0.5)
        }}
      >
        <div className="w-full h-full bg-blue-500/5 rounded-full filter blur-3xl opacity-50" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80"
        style={{ 
          x: useTransform(x, (value) => value * 0.3),
          y: useTransform(y, (value) => value * 0.3)
        }}
      >
        <div className="w-full h-full bg-primary/5 rounded-full filter blur-3xl opacity-50" />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles />
    </div>
  )
}

function FloatingParticles() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    initialX: number
    initialY: number
    animateX: number[]
    animateY: number[]
    duration: number
  }>>([])

  useEffect(() => {
    setMounted(true)
    
    // Generate particles only on client side
    const width = window.innerWidth
    const height = window.innerHeight
    
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * width,
      initialY: Math.random() * height,
      animateX: [
        Math.random() * width,
        Math.random() * width,
        Math.random() * width,
      ],
      animateY: [
        Math.random() * height,
        Math.random() * height,
        Math.random() * height,
      ],
      duration: Math.random() * 20 + 20,
    }))
    
    setParticles(newParticles)
  }, [])

  if (!mounted) return null

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
          }}
          animate={{
            x: particle.animateX,
            y: particle.animateY,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  )
}