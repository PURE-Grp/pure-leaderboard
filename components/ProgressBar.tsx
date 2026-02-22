"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div ref={ref} className={`relative w-full h-[3px] ${className ?? ""}`}>
      <div className="absolute inset-0 bg-border rounded-full" />
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-accent"
        initial={{ width: "0%" }}
        animate={isInView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      />
    </div>
  );
}
