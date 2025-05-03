
export const animations = {
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
    pulse: {
      "0%, 100%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.3)" }
    },
    "scan-line": {
      "0%": { top: "40%" },
      "100%": { top: "50%" }
    },
    "progress-circle": {
      "0%": { "stroke-dashoffset": "100%" },
      "100%": { "stroke-dashoffset": "0%" }
    },
    ping: {
      "0%": { transform: "scale(1)", opacity: "1" },
      "75%, 100%": { transform: "scale(1.6)", opacity: "0" }
    }
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    "rainbow": "rainbow var(--speed, 2s) infinite linear",
    "gradient": "gradient 8s ease-in-out infinite",
    "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "scan-line": "scan-line 0.5s ease-in-out infinite alternate",
    "progress-circle": "progress-circle 3s linear forwards",
    "ping": "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
  },
};
