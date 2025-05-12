import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { badgeVariants as designSystemBadgeVariants } from "@/lib/design-system/badges"

// Re-export the badge variants from our design system
const badgeVariants = designSystemBadgeVariants;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  // Add size prop support from our design system
  size?: "sm" | "md" | "lg";
  // Add animation option
  animate?: boolean;
}

function Badge({ className, variant, size, animate = false, ...props }: BadgeProps) {
  const Component = animate ? motion.div : "div";
  
  return (
    <Component 
      className={cn(badgeVariants({ variant, size }), className)} 
      {...(animate && { 
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { duration: 0.2 }
      })}
      {...props} 
    />
  )
}

export { Badge, badgeVariants }
