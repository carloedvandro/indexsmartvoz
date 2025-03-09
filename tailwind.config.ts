
import type { Config } from "tailwindcss";
import { colors } from "./src/theme/colors";
import { animations } from "./src/theme/animations";
import { container } from "./src/theme/container";
import { borderRadius } from "./src/theme/radius";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

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
      padding: "1.5rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors,
      borderRadius,
      height: {
        '8.5': '2.125rem', // 8px (2rem) + 0.5px (0.125rem) = 2.125rem
      },
      keyframes: {
        ...animations.keyframes,
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        "ping-slow": {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "0.25" },
        }
      },
      animation: {
        ...animations.animation,
        gradient: "gradient 8s linear infinite",
        "ping-slow": "ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      maxWidth: {
        'sm': '384px', // Increased from default 24rem (384px)
        'custom': '400px' // Adding custom max-width
      },
      utilities: {
        '.animation-delay-100': {
          'animation-delay': '0.1s',
        },
        '.animation-delay-200': {
          'animation-delay': '0.2s',
        },
        '.animation-delay-300': {
          'animation-delay': '0.3s',
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function({ addUtilities }) {
      const newUtilities = {
        '.animation-delay-100': {
          'animation-delay': '0.1s',
        },
        '.animation-delay-200': {
          'animation-delay': '0.2s',
        },
        '.animation-delay-300': {
          'animation-delay': '0.3s',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
