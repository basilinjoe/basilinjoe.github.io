// Standardized animation system
import { Variants } from "framer-motion";

// Core animation variants
export const animations = {
  // Fade in animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  },
  
  // Fade in with upward movement
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },
  
  // Fade in with downward movement
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },
  
  // Scaling animations
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },
  
  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  },
  
  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  },
  
  // Container for staggered animations of children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },
  
  // Page transition animation
  pageTransition: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  },
  
  // List item animation for consistent list animations
  listItem: {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  }
};

// Export individual variants for direct use
export const fadeInUp: Variants = animations.fadeInUp;
export const fadeInDown: Variants = animations.fadeInDown;
export const scaleUp: Variants = animations.scaleUp;
export const slideInLeft: Variants = animations.slideInLeft;
export const slideInRight: Variants = animations.slideInRight;
export const staggerContainer: Variants = animations.staggerContainer;
export const listItem: Variants = animations.listItem;
export const pageTransition: Variants = animations.pageTransition;

// Animation preset combinations for common use cases
export const animationPresets = {
  // For cards and interactive elements
  card: animations.scaleUp,
  
  // For page sections
  section: animations.fadeInUp,
  
  // For navigation items
  navItem: animations.slideInLeft,
  
  // For modal/dialog content
  modal: animations.scaleUp,
  
  // For lists
  list: animations.staggerContainer,
  listItem: animations.listItem,
  
  // For page transitions
  page: animations.pageTransition
};
