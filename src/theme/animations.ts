
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
    "slice-pop": {
      "0%": { transform: "scale(1) translateZ(0px)" },
      "50%": { transform: "scale(1.1) translateZ(15px)" },
      "100%": { transform: "scale(1.05) translateZ(10px)" }
    },
    "fadeIn": {
      "0%": { opacity: "0", transform: "translateY(5px)" },
      "100%": { opacity: "1", transform: "translateY(0)" }
    },
    "fadeOut": {
      "0%": { opacity: "1", transform: "translateY(0)" },
      "100%": { opacity: "0", transform: "translateY(5px)" }
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
    "slice-pop": "slice-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
    "fade-in": "fadeIn 0.3s ease-out forwards",
    "fade-out": "fadeOut 0.3s ease-out forwards"
  },
};
