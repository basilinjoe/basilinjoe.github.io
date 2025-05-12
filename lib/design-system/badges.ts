// Standard badge configuration
import { cva } from "class-variance-authority";

// Define standard badge variants for consistent styling across the application
export const badgeVariants = cva(
  // Base styles that apply to all badges
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300",
  {
    variants: {
      // Badge variants by purpose
      variant: {
        // Primary badges for main categories
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80",
        
        // Secondary badges for sub-categories
        secondary:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80",
          
        // Skills and tools badges with outline style
        skill:
          "border border-border bg-transparent text-foreground hover:border-primary/50 hover:text-primary dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-primary/50 dark:hover:text-primary",
        
        // For projects and technology categories
        tech:
          "border-transparent bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",

        // For featured or highlighted items
        featured:
          "border-transparent bg-primary/20 text-primary hover:bg-primary/30 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30",
      },
      
      // Size variants for different contexts
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    },
  }
);

// Constants for badge category colors
export const BADGE_CATEGORIES = {
  // Skills categories
  FRONTEND: "tech",
  BACKEND: "tech",
  CLOUD: "tech",
  DEVOPS: "tech",
  DATA: "tech",
  
  // Content categories
  BLOG: "featured",
  PROJECT: "featured",
  
  // Misc
  DEFAULT: "default",
  SECONDARY: "secondary",
  SKILL: "skill"
};
