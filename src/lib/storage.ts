import type { MissionState, SrsState, UserProgress } from "../types";
import { supabase } from "./supabaseClient";
import { newCardState } from "./srs";

const SRS_KEY = "lingoglow:srs";
const THEME_KEY = "lingoglow:theme";
const PROGRESS_KEY = "lingoglow:progress";
const MISSIONS_KEY = "lingoglow:missions";
const BADGES_KEY = "lingoglow:badges";

type SrsStore = Record<string, SrsState>;

let syncUserId: string | null = null;

export function setSyncUserId(userId: string | null) {
  syncUserId = userId;
}

// Lets header UI (XpBar/StreakBadge) live-update as XP is earned mid-session,
// without every consumer needing to be a route that re-renders on navigation.
type Listener = () => void;
const progressListeners = new Set<Listener>();

export function subscribeProgress(listener: Listener): () => void {
  progressListeners.add(listener);
  return () => progressListeners.delete(listener);
}

function notifyProgressListeners() {
  progressListeners.forEach((l) => l());
}

function readSrsStore(): SrsStore {
  try {
    const raw = localStorage.getItem(SRS_KEY);
    return raw ? (JSON.parse(raw) as SrsStore) : {};
  } catch {
    return {};
  }
}

function writeSrsStore(store: SrsStore) {
  localStorage.setItem(SRS_KEY, JSON.stringify(store));
}

function syncCardState(cardId: string, state: SrsState) {
  if (!syncUserId) return;
  void supabase
    .from("srs_states")
    .upsert({
      user_id: syncUserId,
      card_id: cardId,
      interval: state.interval,
      ease: state.ease,
      reps: state.reps,
      due_date: state.dueDate,
      is_favorite: state.isFavorite ?? false,
      updated_at: new Date().toISOString(),
    })
    .then(({ error }) => {
      if (error) console.error("srs_states upsert failed", error);
    });
}

export function getCardState(cardId: string): SrsState | undefined {
  return readSrsStore()[cardId];
}

export function setCardState(cardId: string, state: SrsState) {
  const store = readSrsStore();
  store[cardId] = state;
  writeSrsStore(store);
  syncCardState(cardId, state);
}

export function toggleFavorite(cardId: string): SrsState {
  const store = readSrsStore();
  const current = store[cardId] ?? newCardState();
  const next: SrsState = { ...current, isFavorite: !current.isFavorite };
  store[cardId] = next;
  writeSrsStore(store);
  syncCardState(cardId, next);
  return next;
}

export function getAllCardStates(): SrsStore {
  return readSrsStore();
}

export function hasLocalProgress(): boolean {
  return Object.keys(readSrsStore()).length > 0;
}

interface SrsRow {
  card_id: string;
  interval: number;
  ease: number;
  reps: number;
  due_date: string;
  is_favorite: boolean;
  updated_at: string;
}

function rowToState(row: SrsRow): SrsState {
  return { interval: row.interval, ease: row.ease, reps: row.reps, dueDate: row.due_date, isFavorite: row.is_favorite };
}

/** Pulls this user's server-side SRS state and merges it into localStorage
 * (remote wins on conflict), so every existing sync getter reflects it
 * without needing to change any call site. */
export async function hydrateFromSupabase(userId: string): Promise<void> {
  const { data, error } = await supabase.from("srs_states").select("*").eq("user_id", userId);
  if (error || !data) {
    console.error("hydrateFromSupabase failed", error);
    return;
  }
  const local = readSrsStore();
  for (const row of data as SrsRow[]) {
    local[row.card_id] = rowToState(row);
  }
  writeSrsStore(local);
}

/** One-time migration: pushes local-only progress to the server, letting
 * any existing server row win (protects a further-along second device). */
export async function claimLocalProgress(userId: string): Promise<number> {
  const local = readSrsStore();
  const cardIds = Object.keys(local);
  if (cardIds.length === 0) return 0;

  const rows = cardIds.map((cardId) => ({
    user_id: userId,
    card_id: cardId,
    interval: local[cardId].interval,
    ease: local[cardId].ease,
    reps: local[cardId].reps,
    due_date: local[cardId].dueDate,
    is_favorite: local[cardId].isFavorite ?? false,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("srs_states")
    .upsert(rows, { onConflict: "user_id,card_id", ignoreDuplicates: true });

  if (error) {
    console.error("claimLocalProgress failed", error);
    return 0;
  }
  return cardIds.length;
}

// ───────────────────────── user progress (XP/coins/streaks) ─────────────────────────

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  coins: 0,
  level: 1,
  streakCurrent: 0,
  streakLongest: 0,
  lastStudyDate: null,
  totalReviews: 0,
};

export function getUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? { ...DEFAULT_PROGRESS, ...(JSON.parse(raw) as UserProgress) } : { ...DEFAULT_PROGRESS };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function setUserProgress(progress: UserProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  notifyProgressListeners();
  if (!syncUserId) return;
  void supabase
    .from("user_progress")
    .upsert({
      user_id: syncUserId,
      xp: progress.xp,
      coins: progress.coins,
      level: progress.level,
      streak_current: progress.streakCurrent,
      streak_longest: progress.streakLongest,
      last_study_date: progress.lastStudyDate,
      total_reviews: progress.totalReviews,
      updated_at: new Date().toISOString(),
    })
    .then(({ error }) => {
      if (error) console.error("user_progress upsert failed", error);
    });
}

interface ProgressRow {
  xp: number;
  coins: number;
  level: number;
  streak_current: number;
  streak_longest: number;
  last_study_date: string | null;
  total_reviews: number;
}

export async function hydrateProgressFromSupabase(userId: string): Promise<void> {
  const { data, error } = await supabase.from("user_progress").select("*").eq("user_id", userId).single();
  if (error || !data) return;
  const row = data as ProgressRow;
  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify({
      xp: row.xp,
      coins: row.coins,
      level: row.level,
      streakCurrent: row.streak_current,
      streakLongest: row.streak_longest,
      lastStudyDate: row.last_study_date,
      totalReviews: row.total_reviews,
    } satisfies UserProgress)
  );
  notifyProgressListeners();
}

// ───────────────────────── missions ─────────────────────────

type MissionStore = Record<string, MissionState>;

function readMissionStore(): MissionStore {
  try {
    const raw = localStorage.getItem(MISSIONS_KEY);
    return raw ? (JSON.parse(raw) as MissionStore) : {};
  } catch {
    return {};
  }
}

function writeMissionStore(store: MissionStore) {
  localStorage.setItem(MISSIONS_KEY, JSON.stringify(store));
}

export function getMissionState(code: string): MissionState | undefined {
  return readMissionStore()[code];
}

export function setMissionState(code: string, state: MissionState) {
  const store = readMissionStore();
  store[code] = state;
  writeMissionStore(store);

  if (!syncUserId) return;
  void supabase
    .from("user_missions")
    .upsert({
      user_id: syncUserId,
      mission_code: code,
      progress: state.progress,
      period_key: state.periodKey,
      completed_at: state.completedAt,
      updated_at: new Date().toISOString(),
    })
    .then(({ error }) => {
      if (error) console.error("user_missions upsert failed", error);
    });
}

interface MissionRow {
  mission_code: string;
  progress: number;
  period_key: string;
  completed_at: string | null;
}

export async function hydrateMissionsFromSupabase(userId: string): Promise<void> {
  const { data, error } = await supabase.from("user_missions").select("*").eq("user_id", userId);
  if (error || !data) return;
  const store: MissionStore = {};
  for (const row of data as MissionRow[]) {
    store[row.mission_code] = { progress: row.progress, periodKey: row.period_key, completedAt: row.completed_at };
  }
  writeMissionStore(store);
}

// ───────────────────────── badges ─────────────────────────

export function getEarnedBadges(): string[] {
  try {
    const raw = localStorage.getItem(BADGES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addEarnedBadge(code: string) {
  const earned = new Set(getEarnedBadges());
  if (earned.has(code)) return;
  earned.add(code);
  localStorage.setItem(BADGES_KEY, JSON.stringify([...earned]));

  if (!syncUserId) return;
  void supabase
    .from("user_badges")
    .upsert({ user_id: syncUserId, badge_code: code })
    .then(({ error }) => {
      if (error) console.error("user_badges upsert failed", error);
    });
}

export async function hydrateBadgesFromSupabase(userId: string): Promise<void> {
  const { data, error } = await supabase.from("user_badges").select("badge_code").eq("user_id", userId);
  if (error || !data) return;
  const codes = (data as { badge_code: string }[]).map((r) => r.badge_code);
  localStorage.setItem(BADGES_KEY, JSON.stringify(codes));
}

export function getTheme(): "light" | "dark" | null {
  const value = localStorage.getItem(THEME_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export function setTheme(theme: "light" | "dark") {
  localStorage.setItem(THEME_KEY, theme);
}
