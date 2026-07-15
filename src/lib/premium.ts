import type { UserTier } from "../types";

export const FREE_AI_DAILY_LIMIT = 5;

const USAGE_KEY = "lingoglow:ai-usage";

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function readUsage(): { date: string; count: number } {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw) as { date: string; count: number };
    return parsed.date === todayKey() ? parsed : { date: todayKey(), count: 0 };
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

export function getAiUsageToday(): number {
  return readUsage().count;
}

export function incrementAiUsage(): void {
  const usage = readUsage();
  localStorage.setItem(USAGE_KEY, JSON.stringify({ date: usage.date, count: usage.count + 1 }));
}

export function canUseAi(tier: UserTier): boolean {
  if (tier === "premium") return true;
  return getAiUsageToday() < FREE_AI_DAILY_LIMIT;
}
