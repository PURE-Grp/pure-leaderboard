"use client";

import { cn } from "@/lib/utils";
import type { ThemeKey } from "@/lib/types";

interface ThemeToggleProps {
  current: ThemeKey;
  onChange: (theme: ThemeKey) => void;
}

export default function ThemeToggle({ current, onChange }: ThemeToggleProps) {
  return (
    <div className="inline-flex border border-border overflow-hidden">
      <button
        onClick={() => onChange("fitness")}
        className={cn(
          "px-3 py-1 text-[0.5rem] tracking-[0.3em] uppercase font-body transition-all cursor-pointer",
          current === "fitness"
            ? "bg-ink text-bg"
            : "bg-transparent text-ink-muted hover:text-ink"
        )}
      >
        Fitness
      </button>
      <button
        onClick={() => onChange("yoga")}
        className={cn(
          "px-3 py-1 text-[0.5rem] tracking-[0.3em] uppercase font-body transition-all cursor-pointer border-l border-border",
          current === "yoga"
            ? "bg-ink text-bg"
            : "bg-transparent text-ink-muted hover:text-ink"
        )}
      >
        Yoga
      </button>
    </div>
  );
}
