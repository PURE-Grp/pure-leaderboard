"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChallengeState } from "@/lib/types";

interface EditPanelProps {
  state: ChallengeState;
  onApply: (updates: Partial<ChallengeState>) => void;
}

export default function EditPanel({ state, onApply }: EditPanelProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(state.eventName);
  const [sub, setSub] = useState(state.subtitle);
  const [day, setDay] = useState(String(state.day));
  const [totalDays, setTotalDays] = useState(String(state.totalDays));
  const [data, setData] = useState(
    state.entries.map((e) => `${e.name}, ${e.score}`).join("\n")
  );

  function handleApply() {
    const lines = data.trim().split("\n");
    const entries = lines
      .map((line, i) => {
        const parts = line.split(",");
        const n = (parts[0] || "").trim();
        const s = parseInt((parts[1] || "0").trim()) || 0;
        return {
          name: n,
          score: s,
          location: i % 2 === 0 ? "Singapore" : "Hong Kong",
          change: 0,
        };
      })
      .filter((e) => e.name)
      .sort((a, b) => b.score - a.score);

    onApply({
      eventName: name.trim(),
      subtitle: sub.trim(),
      day: parseInt(day) || 1,
      totalDays: parseInt(totalDays) || 30,
      entries,
      participants: entries.length + Math.floor(Math.random() * 80) + 50,
      totalClasses: entries.reduce((a, b) => a + b.score, 0) * 3,
    });
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="bg-transparent border border-border text-ink-muted font-body text-[0.55rem] tracking-[0.3em] uppercase px-3.5 py-1.5 cursor-pointer transition-all hover:border-ink hover:text-ink"
      >
        &#9881; Edit Challenge
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex items-end gap-3 flex-wrap mt-3 w-full">
              <FieldGroup label="Challenge Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-input w-[180px]"
                />
              </FieldGroup>
              <FieldGroup label="Subtitle">
                <input
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  className="edit-input w-[180px]"
                />
              </FieldGroup>
              <FieldGroup label="Day / Total Days">
                <input
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="edit-input w-[70px]"
                />
                <input
                  value={totalDays}
                  onChange={(e) => setTotalDays(e.target.value)}
                  className="edit-input w-[70px] mt-0.5"
                />
              </FieldGroup>
              <FieldGroup label="Leaderboard (Name, Score — one per line)">
                <textarea
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="edit-input w-[340px] h-[60px] text-[0.7rem] resize-none"
                />
              </FieldGroup>
              <button
                onClick={handleApply}
                className="bg-accent border-none text-white font-body font-semibold text-[0.6rem] tracking-[0.3em] uppercase px-5 py-2 cursor-pointer self-end transition-colors whitespace-nowrap hover:brightness-90"
              >
                Update Board
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-[0.48rem] tracking-[0.35em] text-ink-muted uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}
