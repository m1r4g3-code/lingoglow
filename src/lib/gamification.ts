import type { MissionType, SrsGrade, UserProgress } from "../types";
import { MISSIONS } from "../data/missions";
import { BADGES } from "../data/badges";
import { addEarnedBadge, getEarnedBadges, getMissionState, getUserProgress, setMissionState, setUserProgress } from "./storage";

export function xpForGrade(grade: SrsGrade): number {
  switch (grade) {
    case "again":
      return 1;
    case "hard":
      return 3;
    case "good":
      return 5;
    case "easy":
      return 8;
  }
}

export function coinsForReview(): number {
  return 1;
}

export function levelForXp(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

function dailyKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function weeklyKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function periodKeyFor(type: MissionType): string {
  return type === "daily" ? dailyKey() : weeklyKey();
}

export interface RewardEvent {
  type: "xp" | "levelup" | "mission" | "badge";
  message: string;
}

/** Orchestrates every gamification side-effect of a single review grade:
 * XP/coins, streak calculation, mission progress, and badge unlocks. A
 * no-op for guests (userId null) — gamification requires an account since
 * leaderboards/missions only make sense tied to a real profile. */
export function awardReviewXp(userId: string | null, grade: SrsGrade): RewardEvent[] {
  if (!userId) return [];
  const events: RewardEvent[] = [];

  const progress = getUserProgress();
  const xpGained = xpForGrade(grade);
  const coinsGained = coinsForReview();
  const today = dailyKey();

  let streakCurrent = progress.streakCurrent;
  let streakLongest = progress.streakLongest;
  if (progress.lastStudyDate !== today) {
    const yesterday = dailyKey(new Date(Date.now() - 86400000));
    streakCurrent = progress.lastStudyDate === yesterday ? streakCurrent + 1 : 1;
    streakLongest = Math.max(streakLongest, streakCurrent);
  }

  const newXp = progress.xp + xpGained;
  const newLevel = levelForXp(newXp);
  const leveledUp = newLevel > progress.level;

  const updated: UserProgress = {
    xp: newXp,
    coins: progress.coins + coinsGained,
    level: newLevel,
    streakCurrent,
    streakLongest,
    lastStudyDate: today,
    totalReviews: progress.totalReviews + 1,
  };
  setUserProgress(updated);
  events.push({ type: "xp", message: `+${xpGained} XP` });
  if (leveledUp) events.push({ type: "levelup", message: `Level ${newLevel}!` });

  for (const mission of MISSIONS) {
    const periodKey = periodKeyFor(mission.type);
    const state = getMissionState(mission.code);
    const samePeriod = state?.periodKey === periodKey;
    let missionProgress = samePeriod ? state.progress : 0;
    let completedAt = samePeriod ? state.completedAt : null;
    if (completedAt) continue;

    missionProgress += mission.targetType === "reviews" ? 1 : xpGained;

    if (missionProgress >= mission.targetCount) {
      completedAt = new Date().toISOString();
      const bonus = getUserProgress();
      const bonusXp = bonus.xp + mission.xpReward;
      setUserProgress({ ...bonus, xp: bonusXp, coins: bonus.coins + mission.coinReward, level: levelForXp(bonusXp) });
      events.push({ type: "mission", message: `Mission complete: ${mission.title} (+${mission.xpReward} XP)` });
    }
    setMissionState(mission.code, { progress: missionProgress, periodKey, completedAt });
  }

  const finalProgress = getUserProgress();
  const earned = new Set(getEarnedBadges());
  for (const badge of BADGES) {
    if (earned.has(badge.code)) continue;
    const value =
      badge.criteriaType === "totalReviews"
        ? finalProgress.totalReviews
        : badge.criteriaType === "streakLongest"
          ? finalProgress.streakLongest
          : finalProgress.xp;
    if (value >= badge.threshold) {
      addEarnedBadge(badge.code);
      events.push({ type: "badge", message: `Badge unlocked: ${badge.icon} ${badge.name}` });
    }
  }

  return events;
}

export function currentPeriodKey(type: MissionType): string {
  return periodKeyFor(type);
}
