"use client";

import { motion, AnimatePresence } from "framer-motion";
import { feedSlide } from "@/lib/animations";
import type { ActivityItem } from "@/lib/types";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="flex-1 px-7 py-5 overflow-hidden">
      <div className="text-3xs tracking-[0.5em] text-ink-muted uppercase mb-3">
        Recent Activity
      </div>

      <div className="flex flex-col">
        <AnimatePresence initial={false}>
          {activities.slice(0, 6).map((a, i) => (
            <motion.div
              key={`${a.name}-${i}`}
              variants={feedSlide}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, x: -8, transition: { duration: 0.2 } }}
              transition={{ delay: i * 0.06 }}
              className="py-2.5 border-b border-border last:border-b-0"
            >
              <div className="font-display text-[0.9rem] tracking-[0.04em] text-ink leading-none">
                {a.name}
              </div>
              <div className="text-[0.52rem] tracking-[0.2em] text-ink-muted uppercase mt-0.5">
                {a.detail} &middot; <span className="text-accent">{a.pts}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
