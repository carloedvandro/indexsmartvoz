import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5f0889",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#9b87f5",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#6E59A5",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1A1F2C",
        },
        sidebar: {
          DEFAULT: "#ffffff",
          foreground: "#1A1F2C",
          border: "#e2e8f0",
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
        scanner: {
          primary: "#8B5CF6",
          secondary: "#D946EF",
          accent: "#F97316",
          highlight: "#0EA5E9",
          core: "#1EAEDB",
          glow: "#33C3F0",
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
        gradient: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "0.6" },
        },
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "0.6" }
        },
        "scanner-progress": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "49%": { transform: "scaleX(1)", transformOrigin: "left" },
          "50%": { transform: "scaleX(1)", transformOrigin: "right" },
          "100%": { transform: "scaleX(0)", transformOrigin: "right" }
        },
        "hologram": {
          "0%, 100%": { opacity: "0.8", transform: "translateY(0)" },
          "50%": { opacity: "0.6", transform: "translateY(-2px)" }
        },
        "particle-flow": {
          "0%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.1)" },
          "100%": { transform: "translateY(-20px) scale(0)" }
        },
        "core-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.1)", opacity: "1" }
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rainbow": "rainbow var(--speed, 2s) infinite linear",
        "gradient": "gradient 8s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanner-progress": "scanner-progress 2s linear infinite",
        "hologram": "hologram 2s ease-in-out infinite",
        "particle-flow": "particle-flow 3s ease-out infinite",
        "core-pulse": "core-pulse 2s ease-in-out infinite",
        "scan-line": "scan-line 2s linear infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
