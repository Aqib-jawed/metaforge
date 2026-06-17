import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          0:   "#0a0a1a",
          1:   "#0d0d20",
          2:   "#111128",
        },
        moss: {
          400: "#86b696",
          500: "#6fa37a",
          600: "#3f6b54",
          700: "#24453a",
          900: "#0f1713",
        },
        amber: {
          500: "#cd8a4b",
          600: "#a86930",
        },
        cream: {
          100: "#f5f0e8",
          200: "#ede5d4",
        },
        sky: {
          300: "#7dd3fc",
        },
      },
      animation: {
        "float-y":   "floatY 7s ease-in-out infinite",
        "float-x":   "floatX 9s ease-in-out infinite",
        "blob":      "blob-morph 18s ease-in-out infinite",
        "slide-up":  "slide-up 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "fade-in":   "fade-in 0.5s ease both",
        "pulse-dot": "pulse-dot 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
        "pulse-ring":"pulse-ring 2s cubic-bezier(0.2,0.7,0.2,1) infinite",
        "marquee":   "marquee 60s linear infinite",
        "spin-slow": "spin 16s linear infinite",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":      { transform: "translateY(-18px) rotate(1deg)" },
          "66%":      { transform: "translateY(-8px) rotate(-0.5deg)" },
        },
        floatX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%":      { transform: "translateX(12px)" },
        },
        "blob-morph": {
          "0%, 100%": { borderRadius: "42% 58% 52% 48% / 48% 44% 56% 52%" },
          "33%":      { borderRadius: "58% 42% 38% 62% / 42% 58% 42% 58%" },
          "66%":      { borderRadius: "48% 52% 62% 38% / 58% 42% 58% 42%" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.35", transform: "scale(0.7)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(0.85)", opacity: "0.55" },
          "100%": { transform: "scale(1.7)",  opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
