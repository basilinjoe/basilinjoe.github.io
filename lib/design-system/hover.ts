// Library of standardized hover behaviors
import { Variants } from "framer-motion";

// Hover animation variants for consistent hover effects
export const hoverEffects = {
  // Scale effect for interactive elements that should appear clickable
  scale: {
    whileHover: { scale: 1.05, transition: { duration: 0.2 } },
    whileTap: { scale: 0.95 }
  },
  
  // Subtle scale effect for smaller elements
  subtleScale: {
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 }
  },
  
  // Color shift effect (no scale) for text links and similar elements
  colorShift: {
    whileHover: { color: "var(--color-primary)", transition: { duration: 0.2 } }
  },
  
  // Combined effect for cards and larger interactive elements
  card: {
    whileHover: { 
      scale: 1.02, 
      borderColor: "var(--color-primary)",
      transition: { duration: 0.2 } 
    },
    whileTap: { scale: 0.98 }
  }
};

// Framer motion variants for hover effects
export const hoverScaleVariant: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

// Utility classes for applying hover effects consistently
export const hoverClasses = {
  // For links and text elements
  link: "transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  
  // For cards and container elements
  card: "transition-all hover:border-primary/70 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  
  // For buttons that aren't using the Button component
  button: "transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  
  // For icon buttons
  iconButton: "transition-transform hover:text-primary/90 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
};
