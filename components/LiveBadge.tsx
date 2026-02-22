"use client";

export default function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 justify-end">
      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-live-pulse" />
      <span className="text-[0.55rem] tracking-[0.35em] text-accent uppercase">
        Live Rankings
      </span>
    </div>
  );
}
