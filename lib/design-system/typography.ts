// Typography design system
import { cva } from "class-variance-authority";

// Heading styles with consistent sizing across the application
export const headingVariants = cva(
  "font-bold tracking-tight text-foreground", 
  {
    variants: {
      // Size variants using a clear type scale
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-3xl md:text-4xl lg:text-5xl",
        h3: "text-2xl md:text-3xl",
        h4: "text-xl md:text-2xl",
        h5: "text-lg md:text-xl",
        h6: "text-base md:text-lg font-semibold",
      },
      // Font weight variants
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      // Visual treatments
      treatment: {
        default: "",
        gradient: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500",
        underlined: "underline decoration-primary/50 underline-offset-2",
      }
    },
    defaultVariants: {
      size: "h3",
      weight: "bold",
      treatment: "default",
    }
  }
);

// Text/paragraph styles with consistent sizing
export const textVariants = cva(
  "text-foreground", 
  {
    variants: {
      // Size variants
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      },
      // Weight variants
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium", 
        semibold: "font-semibold",
        bold: "font-bold"
      },
      // Visual treatment variants
      treatment: {
        default: "",
        muted: "text-muted-foreground",
        subtle: "text-foreground/80",
        accent: "text-primary",
        gradient: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500",
      },
      // Line height variants 
      leading: {
        none: "leading-none",
        tight: "leading-tight",
        snug: "leading-snug",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
      }
    },
    defaultVariants: {
      size: "base",
      weight: "normal",
      treatment: "default",
      leading: "normal"
    }
  }
);

// Font families
export const fontFamilies = {
  sans: "font-sans",
  mono: "font-mono",
  serif: "font-serif",
};

// Standard line heights
export const lineHeights = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

// Letter spacing options
export const letterSpacing = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
};
