import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button variants tuned for the editorial-tech maximalist system.
 *
 * The default is a brutalist bordered chip with an offset shadow that snaps
 * on hover. Variants map to the accent trio (electric blue, hot orange,
 * acid lime) and to shadcn-standard semantic slots.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hot focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        // Solid ink button — the workhorse. Snaps toward you on hover.
        default:
          "border-2 border-foreground bg-foreground text-background shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal",
        // Hot orange, high-emphasis actions
        hot:
          "border-2 border-foreground bg-accent-hot text-accent-hot-foreground shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal",
        // Acid lime, positive / confirm actions
        lime:
          "border-2 border-foreground bg-accent-lime text-accent-lime-foreground shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal",
        destructive:
          "border-2 border-foreground bg-destructive text-destructive-foreground shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal",
        outline:
          "border-2 border-foreground bg-background text-foreground hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-lime hover:text-accent-lime-foreground hover:shadow-brutal-sm",
        secondary:
          "border-2 border-foreground bg-secondary text-secondary-foreground hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal-sm",
        ghost:
          "text-foreground hover:bg-accent-lime/40",
        link:
          "text-primary underline decoration-primary decoration-2 underline-offset-4 hover:text-accent-hot hover:decoration-accent-hot",
      },
      size: {
        default: "h-10 px-4 py-2 text-micro",
        sm: "h-8 px-3 text-micro",
        lg: "h-12 px-6 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
