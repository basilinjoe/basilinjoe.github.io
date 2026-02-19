import type { Config } from 'tailwindcss'

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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(var(--primary-rgb)/0.15)',
      },
      colors: {
        'primary-50': 'hsl(var(--primary-50))',
        'primary-100': 'hsl(var(--primary-100))',
        'primary-200': 'hsl(var(--primary-200))',
        'primary-300': 'hsl(var(--primary-300))',
        'primary-400': 'hsl(var(--primary-400))',
        'primary-500': 'hsl(var(--primary-500))',
        'primary-600': 'hsl(var(--primary-600))',
        'primary-700': 'hsl(var(--primary-700))',
        'primary-800': 'hsl(var(--primary-800))',
        'primary-900': 'hsl(var(--primary-900))',
      },
      perspective: {
        'DEFAULT': '800px',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

export default config
