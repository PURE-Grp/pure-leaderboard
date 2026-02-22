"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeUpDelayed } from "@/lib/animations";
import PodiumCard from "./PodiumCard";
import type { LeaderboardEntry } from "@/lib/types";

interface PodiumProps {
  entries: LeaderboardEntry[];
  unit: string;
}

export default function Podium({ entries, unit }: PodiumProps) {
  const top3 = entries.slice(0, 3);

  return (
    <motion.div
      variants={fadeUpDelayed}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border"
    >
      <AnimatePresence mode="popLayout">
        {top3.map((entry, i) => (
          <PodiumCard
            key={entry.name}
            entry={entry}
            rank={(i + 1) as 1 | 2 | 3}
            unit={unit}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
