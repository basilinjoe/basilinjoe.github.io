"use client"

import { MotionConfig } from "framer-motion"

/**
 * Applies `prefers-reduced-motion` to every Framer Motion animation on the site.
 *
 * The reduced-motion block in globals.css only reaches CSS animations. Framer
 * drives its motion from JS, so without this every entrance transform in
 * lib/animations.ts (fadeInUp, scaleUp, slideIn), the hero headline, the header
 * slide, and the nav dot spring kept running for users who had asked for less
 * motion.
 *
 * `reducedMotion="user"` is the right setting rather than "always": it follows the
 * OS preference, and it strips transform and layout animation while leaving opacity
 * alone, which is what MDN says `reduce` means — remove motion, not all animation.
 *
 * This is a client boundary, but `children` is passed through as a prop, so server
 * components below it still render on the server.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
