import type { SrsState } from "../types";

const SRS_KEY = "lingoglow:srs";
const THEME_KEY = "lingoglow:theme";

type SrsStore = Record<string, SrsState>;

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

export function getCardState(cardId: string): SrsState | undefined {
  return readSrsStore()[cardId];
}

export function setCardState(cardId: string, state: SrsState) {
  const store = readSrsStore();
  store[cardId] = state;
  writeSrsStore(store);
}

export function getAllCardStates(): SrsStore {
  return readSrsStore();
}

export function getTheme(): "light" | "dark" | null {
  const value = localStorage.getItem(THEME_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export function setTheme(theme: "light" | "dark") {
  localStorage.setItem(THEME_KEY, theme);
}
