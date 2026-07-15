import type { SrsState } from "../types";
import { supabase } from "./supabaseClient";
import { newCardState } from "./srs";

const SRS_KEY = "lingoglow:srs";
const THEME_KEY = "lingoglow:theme";

type SrsStore = Record<string, SrsState>;

let syncUserId: string | null = null;

export function setSyncUserId(userId: string | null) {
  syncUserId = userId;
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

export function getTheme(): "light" | "dark" | null {
  const value = localStorage.getItem(THEME_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export function setTheme(theme: "light" | "dark") {
  localStorage.setItem(THEME_KEY, theme);
}
