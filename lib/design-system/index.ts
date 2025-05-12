// Design system exports
export * from './animations';
export * from './badges';
export * from './hover';

// Design tokens (can be expanded in the future)
export const designTokens = {
  // Standard spacing values
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',   // 48px
  },

  // Standard animation durations
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
  
  // Standard animation easing functions
  easing: {
    standard: [0.4, 0.0, 0.2, 1],
    emphasized: [0.0, 0.0, 0.2, 1],
    decelerated: [0.0, 0.0, 0.2, 1],
    accelerated: [0.4, 0.0, 1, 1],
  },
  
  // Standard border radius values
  borderRadius: {
    xs: '0.125rem', // 2px
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '1rem',     // 16px
    xl: '1.5rem',   // 24px
    full: '9999px', // Full rounded (circles)
  },
  
  // Standard shadow values
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }
};
