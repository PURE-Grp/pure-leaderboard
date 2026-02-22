"use client";

import { motion, AnimatePresence } from "framer-motion";
import { rowStagger } from "@/lib/animations";
import RankingRow from "./RankingRow";
import type { LeaderboardEntry } from "@/lib/types";

interface RankingsListProps {
  entries: LeaderboardEntry[];
  unit: string;
  highlightedName: string | null;
}

export default function RankingsList({ entries, unit, highlightedName }: RankingsListProps) {
  return (
    <div>
      <div className="text-[0.55rem] tracking-[0.5em] text-ink-muted uppercase pb-2 border-b border-border">
        Full Rankings
      </div>

      <motion.div
        variants={rowStagger}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        <AnimatePresence mode="popLayout">
          {entries.map((entry, i) => (
            <RankingRow
              key={entry.name}
              entry={entry}
              rank={i + 1}
              unit={unit}
              isHighlighted={entry.name === highlightedName}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
