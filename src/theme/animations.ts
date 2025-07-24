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
    "gradient-opacity": {
      "0%, 100%": { opacity: "0.8" },
      "50%": { opacity: "0.6" },
    },
    pulse: {
      "0%, 100%": { transform: "scale(1)", opacity: "1" },
      "50%": { transform: "scale(1.1)", opacity: "0.7" }
    },
    blink: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.3" }
    },
    "scan-line": {
      "0%": { top: "0%" },
      "100%": { top: "100%" }
    },
    "laser-scan": {
      "0%": { top: "0%" },
      "100%": { top: "100%" }
    },
    "progress-circle": {
      "0%": { "stroke-dashoffset": "100%" },
      "100%": { "stroke-dashoffset": "0%" }
    },
    "gradient": {
      "0%": { "background-position": "0% 50%" },
      "50%": { "background-position": "100% 50%" },
      "100%": { "background-position": "0% 50%" }
    }
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    "rainbow": "rainbow var(--speed, 2s) infinite linear",
    "gradient-opacity": "gradient-opacity 8s ease-in-out infinite",
    "pulse": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "blink": "blink 1.5s ease-in-out infinite",
    "scan-line": "scan-line 1.2s linear infinite",
    "laser-scan": "laser-scan 1.2s linear infinite",
    "progress-circle": "progress-circle 3s linear forwards",
    "gradient": "gradient var(--animation-duration, 8s) linear infinite"
  },
};
