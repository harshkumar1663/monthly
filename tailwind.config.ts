import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pastel palette
        "pixel-pink": "#FFB6C1",
        "pixel-dark-pink": "#FF69B4",
        "pixel-lavender": "#E6B3E1",
        "pixel-light-lavender": "#F0D9F7",
        "pixel-blue": "#ADD8E6",
        "pixel-light-blue": "#B0E0E6",
        "pixel-cream": "#FFFDD0",
        "pixel-white": "#FFF8F0",
        "pixel-peach": "#FFDAB9",
        "pixel-mint": "#C1FFC1",
        "pixel-yellow": "#FFFFE0",
        "pixel-light-gray": "#F5F5F5",
        "pixel-dark": "#4A4A4A",
      },
      fontFamily: {
        "pixel": ["var(--font-press-start)", "cursive"],
        "pixel-body": ["var(--font-pixelify)", "sans-serif"],
      },
      borderRadius: {
        "pixel": "0.5rem",
        "lg": "0.75rem",
      },
      boxShadow: {
        "pixel": "4px 4px 0px rgba(0, 0, 0, 0.15)",
        "pixel-lg": "6px 6px 0px rgba(0, 0, 0, 0.2)",
        "pixel-inner": "inset 2px 2px 0px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
        "pulse-heart": "pulse-heart 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-heart": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
