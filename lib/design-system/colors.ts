// Color system design
import { cva } from "class-variance-authority";

// Color palette with semantic naming
export const colors = {
  // Primary color and variations
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
    50: "hsl(var(--primary-50))",
    100: "hsl(var(--primary-100))",
    200: "hsl(var(--primary-200))",
    300: "hsl(var(--primary-300))",
    400: "hsl(var(--primary-400))",
    500: "hsl(var(--primary-500))",
    600: "hsl(var(--primary-600))",
    700: "hsl(var(--primary-700))",
    800: "hsl(var(--primary-800))",
    900: "hsl(var(--primary-900))",
  },
  
  // Background colors
  background: {
    DEFAULT: "hsl(var(--background))",
    subtle: "hsl(var(--background-subtle))",
    muted: "hsl(var(--muted))",
    card: "hsl(var(--card))",
  },
  
  // Text colors with semantic naming
  text: {
    DEFAULT: "hsl(var(--foreground))",
    muted: "hsl(var(--muted-foreground))",
    subtle: "hsl(var(--subtle-foreground))",
    accent: "hsl(var(--primary))",
  },
  
  // UI state colors
  state: {
    success: "hsl(var(--success))",
    warning: "hsl(var(--warning))",
    error: "hsl(var(--error))", 
    info: "hsl(var(--info))",
  },
  
  // Border colors
  border: {
    DEFAULT: "hsl(var(--border))",
    subtle: "hsl(var(--border-subtle))",
    accent: "hsl(var(--primary-300))",
  }
};

// Background color variants
export const backgroundVariants = cva(
  "", 
  {
    variants: {
      variant: {
        default: "bg-background",
        muted: "bg-muted",
        subtle: "bg-background-subtle",
        card: "bg-card",
        primary: "bg-primary text-primary-foreground",
        primarySubtle: "bg-primary-100 dark:bg-primary-900 text-foreground",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

// Text color variants
export const textColorVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        subtle: "text-foreground/80",
        accent: "text-primary",
        success: "text-success",
        error: "text-error",
        warning: "text-warning",
        info: "text-info",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

// Border color variants
export const borderColorVariants = cva(
  "border",
  {
    variants: {
      variant: {
        default: "border-border",
        subtle: "border-border/50", 
        accent: "border-primary/70",
        muted: "border-muted",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

// Gradient backgrounds
export const gradients = {
  // Primary gradient for accent elements
  primary: "bg-gradient-to-r from-primary to-blue-500",
  
  // Subtle gradient for backgrounds
  subtle: "bg-gradient-to-br from-background to-muted/50",
  
  // Dark mode accent gradients
  dark: "bg-gradient-to-br from-zinc-800 to-zinc-900",
  
  // Text gradients (use with bg-clip-text text-transparent)
  text: "bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent",
};

// Shadow variants
export const shadowVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "shadow-sm",
        md: "shadow",
        lg: "shadow-md",
        xl: "shadow-lg",
        none: "shadow-none",
      }
    },
    defaultVariants: {
      size: "none"
    }
  }
);
