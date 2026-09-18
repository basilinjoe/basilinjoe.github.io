"use client"

import { useEffect, useSyncExternalStore } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

/**
 * Cursor-parallax editorial blob background.
 *
 * Three big blurred shapes in the accent trio (electric blue, hot orange,
 * acid lime) drift with the cursor. Kept quiet in opacity so it reads as
 * mood, not decoration. Respects prefers-reduced-motion.
 */
export function HeroAnimation() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 120 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Server render has no matchMedia, so the prerendered HTML starts at
  // `false` and React re-checks on hydration.
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  )

  useEffect(() => {
    if (reduced) return
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth - 0.5) * 30)
      mouseY.set((clientY / innerHeight - 0.5) * 30)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, reduced])

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Big electric blue */}
      <motion.div
        className="absolute -top-10 left-[10%] h-[28rem] w-[28rem]"
        style={{ x, y }}
      >
        <div className="h-full w-full rounded-full bg-primary opacity-15 blur-3xl dark:opacity-20" />
      </motion.div>

      {/* Hot orange, counter-parallax */}
      <motion.div
        className="absolute right-[8%] top-[24%] h-72 w-72"
        style={{
          x: useTransform(x, (v) => v * -0.6),
          y: useTransform(y, (v) => v * -0.6),
        }}
      >
        <div className="h-full w-full rounded-full bg-accent-hot opacity-25 blur-3xl dark:opacity-30" />
      </motion.div>

      {/* Acid lime, low-frequency */}
      <motion.div
        className="absolute bottom-[12%] left-[35%] h-80 w-80"
        style={{
          x: useTransform(x, (v) => v * 0.35),
          y: useTransform(y, (v) => v * 0.35),
        }}
      >
        <div className="h-full w-full rounded-full bg-accent-lime opacity-30 blur-3xl dark:opacity-25" />
      </motion.div>

      {/* Newsprint dot pattern overlay for texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  )
}
