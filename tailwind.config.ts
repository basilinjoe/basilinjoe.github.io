import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      fontSize: {
        // Ultra-tiny for editorial captions and metadata pins
        micro: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
        // Extreme display sizes for hero moments (maximalism relies on scale range)
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "11xl": ["12rem", { lineHeight: "0.88" }],
        "12xl": ["16rem", { lineHeight: "0.86" }],
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Newsprint / paper texture using layered radial gradients
        'paper-noise':
          "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.03) 0, transparent 60%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.02) 0, transparent 50%)",
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
        'ticker': 'marquee 24s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(var(--primary-rgb)/0.15)',
        // Brutalist offset shadows: hard, no blur, big offset.
        'brutal-sm': '3px 3px 0 0 hsl(var(--foreground))',
        'brutal': '6px 6px 0 0 hsl(var(--foreground))',
        'brutal-lg': '10px 10px 0 0 hsl(var(--foreground))',
        'brutal-accent': '6px 6px 0 0 hsl(var(--accent-hot))',
        'brutal-lime': '6px 6px 0 0 hsl(var(--accent-lime))',
        'brutal-primary': '6px 6px 0 0 hsl(var(--primary))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          hot: 'hsl(var(--accent-hot))',
          'hot-foreground': 'hsl(var(--accent-hot-foreground))',
          lime: 'hsl(var(--accent-lime))',
          'lime-foreground': 'hsl(var(--accent-lime-foreground))',
          pink: 'hsl(var(--accent-pink))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        paper: 'hsl(var(--paper))',
        ink: 'hsl(var(--ink))',
      },
      perspective: {
        'DEFAULT': '800px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}

export default config
