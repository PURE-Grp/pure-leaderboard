import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#F5F3EF" },
        ink: {
          DEFAULT: "#0E0E0F",
          muted: "#B0ADA8",
        },
        border: { DEFAULT: "#E4E1DC" },
        accent: {
          DEFAULT: "var(--accent)",
        },
        gold: { DEFAULT: "#B8960C" },
        silver: { DEFAULT: "#909090" },
        bronze: { DEFAULT: "#8C4A1E" },
        change: {
          up: "#1a9e4a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1" }],
        "3xs": ["0.5rem", { lineHeight: "1" }],
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.6)" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
