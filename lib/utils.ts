export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function splitEventName(name: string): { prefix: string; highlight: string } {
  const parts = name.split(" ");
  const highlight = parts.pop() || "";
  return { prefix: parts.join(" "), highlight };
}
