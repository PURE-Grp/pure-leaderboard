"use client";

import { motion } from "framer-motion";
import { fadeDown } from "@/lib/animations";
import { splitEventName } from "@/lib/utils";
import LiveBadge from "./LiveBadge";

interface HeaderProps {
  eventName: string;
  eventLabel: string;
  subtitle: string;
  region: string;
}

export default function Header({ eventName, eventLabel, subtitle, region }: HeaderProps) {
  const { prefix, highlight } = splitEventName(eventName);

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="show"
      className="col-span-full flex flex-col sm:flex-row justify-between sm:items-end gap-3 px-6 lg:px-10 pt-7 pb-5 border-b-2 border-ink"
    >
      <div>
        <div className="text-[0.55rem] tracking-[0.5em] text-accent uppercase mb-1">
          {eventLabel}
        </div>
        <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] tracking-[0.04em] leading-none text-ink">
          {prefix} <span className="text-accent">{highlight}</span>
        </h1>
      </div>

      <div className="sm:text-right flex flex-col gap-0.5">
        <div className="text-[0.58rem] tracking-[0.35em] text-ink-muted uppercase leading-[1.8]">
          {region}
          <br />
          {subtitle}
        </div>
        <LiveBadge />
      </div>
    </motion.header>
  );
}
