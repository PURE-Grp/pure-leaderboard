export type ThemeKey = "fitness" | "yoga";

export interface LeaderboardEntry {
  name: string;
  score: number;
  location: string;
  change: number;
}

export interface ActivityItem {
  name: string;
  detail: string;
  pts: string;
}

export interface ChallengeState {
  eventName: string;
  eventLabel: string;
  subtitle: string;
  region: string;
  day: number;
  totalDays: number;
  unit: string;
  participants: number;
  todayCount: number;
  totalClasses: number;
  entries: LeaderboardEntry[];
  activities: ActivityItem[];
}

export interface ThemeConfig {
  key: ThemeKey;
  accent: string;
  accentHover: string;
  accentTint: string;
  label: string;
}
