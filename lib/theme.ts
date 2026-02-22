import type { ThemeKey, ThemeConfig } from "./types";

export const THEMES: Record<ThemeKey, ThemeConfig> = {
  fitness: {
    key: "fitness",
    accent: "#C8102E",
    accentHover: "#a00e24",
    accentTint: "rgba(200,16,46,0.04)",
    label: "PURE Fitness",
  },
  yoga: {
    key: "yoga",
    accent: "#3A6B4F",
    accentHover: "#2d5840",
    accentTint: "rgba(58,107,79,0.04)",
    label: "PURE Yoga",
  },
};
