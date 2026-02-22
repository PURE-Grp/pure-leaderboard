"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ThemeKey, ChallengeState } from "@/lib/types";
import { FITNESS_INITIAL, YOGA_INITIAL } from "@/lib/data";
import Header from "@/components/Header";
import Podium from "@/components/Podium";
import RankingsList from "@/components/RankingsList";
import Sidebar from "@/components/Sidebar";
import EditPanel from "@/components/EditPanel";
import ThemeToggle from "@/components/ThemeToggle";

const INITIAL_DATA: Record<ThemeKey, ChallengeState> = {
  fitness: FITNESS_INITIAL,
  yoga: YOGA_INITIAL,
};

export default function LeaderboardPage() {
  const [theme, setTheme] = useState<ThemeKey>("fitness");
  const [state, setState] = useState<ChallengeState>(FITNESS_INITIAL);
  const [highlightedName, setHighlightedName] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Theme switching
  const handleThemeChange = useCallback((newTheme: ThemeKey) => {
    setTheme(newTheme);
    setState(INITIAL_DATA[newTheme]);
    setHighlightedName(null);
  }, []);

  // Live simulation — bumps a random score every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        // 30% chance of no update
        if (Math.random() <= 0.3) return prev;

        const idx = Math.floor(Math.random() * prev.entries.length);
        const newEntries = prev.entries.map((e, i) =>
          i === idx ? { ...e, score: e.score + 1, change: 1 } : e
        );
        newEntries.sort((a, b) => b.score - a.score);

        const updatedName = prev.entries[idx].name;

        // Flash highlight
        if (highlightTimer.current) clearTimeout(highlightTimer.current);
        setHighlightedName(updatedName);
        highlightTimer.current = setTimeout(() => setHighlightedName(null), 1500);

        const newActivities = [
          { name: updatedName, detail: "Completed class", pts: "+1" },
          ...prev.activities.slice(0, 7),
        ];

        return {
          ...prev,
          entries: newEntries,
          totalClasses: prev.totalClasses + 1,
          todayCount: prev.todayCount + 1,
          activities: newActivities,
        };
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
    };
  }, []);

  // Edit panel apply
  const handleApply = useCallback((updates: Partial<ChallengeState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <div data-theme={theme} className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] grid-rows-[auto_1fr] min-h-screen max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <Header
          eventName={state.eventName}
          eventLabel={state.eventLabel}
          subtitle={state.subtitle}
          region={state.region}
        />

        {/* Main content */}
        <main className="px-6 lg:px-10 py-8 flex flex-col gap-8">
          <Podium entries={state.entries} unit={state.unit} />
          <RankingsList
            entries={state.entries}
            unit={state.unit}
            highlightedName={highlightedName}
          />
        </main>

        {/* Sidebar */}
        <Sidebar state={state} />

        {/* Edit bar */}
        <div className="col-span-full border-t border-border px-6 lg:px-10 py-3">
          <div className="flex items-center gap-4">
            <ThemeToggle current={theme} onChange={handleThemeChange} />
            <div className="flex-1" />
            <EditPanel state={state} onApply={handleApply} />
          </div>
        </div>
      </div>
    </div>
  );
}
