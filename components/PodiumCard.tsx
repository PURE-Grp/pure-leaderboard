"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CountUp from "./CountUp";
import type { LeaderboardEntry } from "@/lib/types";

interface PodiumCardProps {
  entry: LeaderboardEntry;
  rank: 1 | 2 | 3;
  unit: string;
}

const RANK_LABELS = { 1: "Gold", 2: "Silver", 3: "Bronze" } as const;
const RANK_DISPLAY = { 1: "#1", 2: "#2", 3: "#3" } as const;

const barColors = {
  1: "bg-gold",
  2: "bg-silver",
  3: "bg-bronze",
} as const;

const rankTextColors = {
  1: "text-gold",
  2: "text-silver",
  3: "text-bronze",
} as const;

export default function PodiumCard({ entry, rank, unit }: PodiumCardProps) {
  const isFirst = rank === 1;

  return (
    <motion.div
      layout
      layoutId={`podium-${entry.name}`}
      className={cn(
        "relative overflow-hidden flex flex-col px-5 pt-6 pb-5",
        isFirst ? "bg-ink text-bg" : "bg-bg"
      )}
    >
      {/* Rank accent bar */}
      <div className={cn("absolute top-0 left-0 right-0 h-1", barColors[rank])} />

      {/* Rank label */}
      <div className={cn("font-display text-[0.9rem] tracking-[0.15em] mb-4 mt-0.5", rankTextColors[rank])}>
        {RANK_LABELS[rank]}
      </div>

      {/* Score */}
      <div className="flex items-baseline gap-1 mb-0.5">
        <CountUp
          target={entry.score}
          className={cn(
            "font-display text-[clamp(3rem,5vw,4.5rem)] leading-[0.9] tracking-[0.01em]",
            isFirst ? "text-bg" : "text-ink"
          )}
        />
        <span className={cn(
          "text-[0.6rem] tracking-[0.3em] uppercase pb-2",
          isFirst ? "text-bg/40" : "text-ink-muted"
        )}>
          {unit}
        </span>
      </div>

      {/* Name */}
      <div className={cn(
        "font-display text-[1.3rem] tracking-[0.05em] leading-none",
        isFirst ? "text-bg" : "text-ink"
      )}>
        {entry.name}
      </div>

      {/* Location */}
      <div className={cn(
        "text-[0.55rem] tracking-[0.3em] uppercase mt-1",
        isFirst ? "text-bg/40" : "text-ink-muted"
      )}>
        {entry.location}
      </div>

      {/* Decorative background number */}
      <div className={cn(
        "absolute -bottom-2 right-2 font-display text-[8rem] leading-none pointer-events-none tracking-[-0.05em]",
        isFirst ? "text-white/[0.04]" : "text-black/[0.04]"
      )}>
        {RANK_DISPLAY[rank]}
      </div>
    </motion.div>
  );
}
