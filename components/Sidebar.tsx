"use client";

import { motion } from "framer-motion";
import { fadeLeftDelayed } from "@/lib/animations";
import { formatNumber } from "@/lib/utils";
import ProgressBar from "./ProgressBar";
import CountUp from "./CountUp";
import ActivityFeed from "./ActivityFeed";
import type { ChallengeState } from "@/lib/types";

interface SidebarProps {
  state: ChallengeState;
}

export default function Sidebar({ state }: SidebarProps) {
  const pct = Math.round((state.day / state.totalDays) * 100);

  return (
    <motion.aside
      variants={fadeLeftDelayed}
      initial="hidden"
      animate="show"
      className="border-t lg:border-t-0 lg:border-l border-border flex flex-col"
    >
      {/* Challenge Progress + Key Stats */}
      <div className="px-7 py-6 border-b border-border">
        <div className="text-3xs tracking-[0.5em] text-ink-muted uppercase mb-3">
          Challenge Progress
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="font-display text-[0.9rem] tracking-[0.08em] text-ink mb-1.5">
            Day {state.day} of {state.totalDays}
          </div>
          <ProgressBar value={state.day} max={state.totalDays} className="mb-1" />
          <div className="flex justify-between text-3xs tracking-[0.25em] text-ink-muted uppercase">
            <span>Start</span>
            <span>{pct}% Complete</span>
            <span>End</span>
          </div>
        </div>

        {/* Key stats */}
        <div className="flex flex-col gap-2.5">
          <StatRow label="Participants">
            <CountUp
              target={state.participants}
              className="font-display text-[1.1rem] tracking-[0.03em] text-accent"
            />
          </StatRow>
          <StatRow label="Classes Logged Today">
            <CountUp
              target={state.todayCount}
              className="font-display text-[1.1rem] tracking-[0.03em] text-ink"
            />
          </StatRow>
          <StatRow label="Total Classes This Challenge">
            <CountUp
              target={state.totalClasses}
              formatter={formatNumber}
              className="font-display text-[1.1rem] tracking-[0.03em] text-ink"
            />
          </StatRow>
          <StatRow label="Current Leader" noBorder>
            <span className="font-display text-[1.1rem] tracking-[0.03em] text-accent">
              {state.entries[0]?.name ?? "\u2014"}
            </span>
          </StatRow>
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed activities={state.activities} />
    </motion.aside>
  );
}

function StatRow({
  label,
  children,
  noBorder,
}: {
  label: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div className={`flex justify-between items-baseline pb-2 ${noBorder ? "" : "border-b border-border"}`}>
      <span className="text-[0.52rem] tracking-[0.3em] text-ink-muted uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}
