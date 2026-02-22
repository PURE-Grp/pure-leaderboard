"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { rowItem } from "@/lib/animations";
import CountUp from "./CountUp";
import type { LeaderboardEntry } from "@/lib/types";

interface RankingRowProps {
  entry: LeaderboardEntry;
  rank: number;
  unit: string;
  isHighlighted: boolean;
}

export default function RankingRow({ entry, rank, unit, isHighlighted }: RankingRowProps) {
  let changeClass = "text-ink-muted";
  let changeText = "\u2014";
  if (entry.change > 0) {
    changeClass = "text-change-up";
    changeText = `\u2191${entry.change}`;
  } else if (entry.change < 0) {
    changeClass = "text-accent";
    changeText = `\u2193${Math.abs(entry.change)}`;
  }

  return (
    // Outer: handles layout position + staggered entrance via variants
    <motion.div
      layout
      layoutId={`row-${entry.name}`}
      variants={rowItem}
      transition={{ layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      {/* Inner: handles highlight flash independently */}
      <motion.div
        animate={{
          backgroundColor: isHighlighted
            ? [
                "rgba(0,0,0,0)",
                "var(--accent-tint)",
                "var(--accent-tint)",
                "rgba(0,0,0,0)",
              ]
            : "rgba(0,0,0,0)",
        }}
        transition={
          isHighlighted
            ? { duration: 1.5, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }
            : { duration: 0 }
        }
        className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center py-3 border-b border-border gap-3 cursor-default hover:bg-black/[0.02] hover:mx-[-0.5rem] hover:px-2"
      >
        {/* Rank */}
        <div className={cn(
          "font-display text-base tracking-[0.05em] text-center",
          rank <= 3 ? "text-ink" : "text-ink-muted"
        )}>
          {rank}
        </div>

        {/* Name + Location */}
        <div>
          <div className="font-display text-[1.1rem] tracking-[0.04em] text-ink leading-none">
            {entry.name}
          </div>
          <div className="text-[0.52rem] tracking-[0.25em] text-ink-muted uppercase mt-0.5">
            {entry.location}
          </div>
        </div>

        {/* Change */}
        <div className={cn("text-[0.6rem] tracking-[0.1em] min-w-[2rem] text-right", changeClass)}>
          {changeText}
        </div>

        {/* Score */}
        <div className="text-right min-w-[4rem]">
          <CountUp
            target={entry.score}
            className="font-display text-[1.2rem] tracking-[0.03em] text-ink block"
          />
          <span className="text-[0.48rem] tracking-[0.3em] text-ink-muted uppercase block mt-0.5">
            {unit}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
