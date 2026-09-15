"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  /**
   * The scrolling content. Duplicate it yourself so the -50% keyframe loops
   * seamlessly; this component does not clone children.
   */
  children: React.ReactNode
  /** Animation utility driving the track, e.g. "animate-marquee". */
  animation: string
  /** Classes for the outer clipping container. */
  className?: string
  /** Classes for the animated track. */
  trackClassName?: string
  /**
   * What the control is pausing, used to build the accessible name.
   * e.g. "the status ticker" produces "Pause the status ticker".
   */
  label: string
  /** Positioning/colour overrides for the pause control. */
  controlClassName?: string
}

/**
 * Auto-scrolling marquee with a pause control.
 *
 * WCAG 2.2 SC 2.2.2 Pause, Stop, Hide is **Level A** and requires that any
 * automatically moving content lasting more than five seconds can be paused,
 * stopped, or hidden by the user. These marquees run indefinitely, so the
 * control is mandatory rather than a nicety.
 *
 * The control is hidden under `prefers-reduced-motion` (see the reduced-motion
 * block in globals.css): the animation is already suppressed there, so a pause
 * button would toggle nothing and only confuse.
 */
export function Marquee({
  children,
  animation,
  className,
  trackClassName,
  label,
  controlClassName,
}: MarqueeProps) {
  const [paused, setPaused] = React.useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn("flex whitespace-nowrap", animation, trackClassName)}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? `Resume ${label}` : `Pause ${label}`}
        className={cn(
          "marquee-control absolute right-0 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2",
          "items-center justify-center border-2 border-current bg-inherit",
          "transition-opacity hover:opacity-100 focus-visible:opacity-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1",
          controlClassName
        )}
      >
        {paused ? (
          <Play className="h-3 w-3" aria-hidden />
        ) : (
          <Pause className="h-3 w-3" aria-hidden />
        )}
      </button>
    </div>
  )
}
