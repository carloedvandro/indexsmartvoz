
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
      keyframes: {
        ...animations.keyframes,
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
      },
      animation: {
        ...animations.animation,
        gradient: "gradient 8s linear infinite",
      },
      maxWidth: {
        'sm': '384px',
        'custom': '320px',
        'mobile': '320px',
        'network-filter': '340px'
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
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
