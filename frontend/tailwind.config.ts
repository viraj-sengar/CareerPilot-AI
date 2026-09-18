import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#070B14",
          900: "#0B1120",
          850: "#0F172A",
          800: "#1E293B",
          700: "#334155",
        },
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
        },
        emerald: {
          400: "#34D399",
          500: "#10B981",
        },
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
