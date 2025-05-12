// Standardized card component with consistent hover behavior
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { hoverEffects } from "@/lib/design-system/hover"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Whether to apply hover effects (scale + border color change)
  interactive?: boolean;
  // Whether to use Framer Motion for animations
  animate?: boolean;
  // Animation variants to apply
  variants?: any;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, animate = false, variants, children, ...props }, ref) => {
    const Component = animate ? motion.div : "div";
    const interactiveClass = interactive 
      ? "transition-all hover:border-primary/70 hover:shadow-sm" 
      : "";
    
    return (
      <Component
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
          interactiveClass,
          className
        )}
        {...(animate && interactive && hoverEffects.card)}
        {...(animate && variants && { variants })}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pt-0 sm:p-6 sm:pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-4 pt-0 sm:p-6 sm:pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
