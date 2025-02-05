import type { Config } from "tailwindcss";
import { colors } from "./src/theme/colors";
import { animations } from "./src/theme/animations";
import { container } from "./src/theme/container";
import { borderRadius } from "./src/theme/radius";

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
    container,
    extend: {
      colors,
      borderRadius,
      keyframes: animations.keyframes,
      animation: animations.animation,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;