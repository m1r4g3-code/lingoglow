import type { SrsGrade, SrsState } from "../types";

const DEFAULT_STATE: SrsState = {
  interval: 0,
  ease: 2.5,
  reps: 0,
  dueDate: new Date().toISOString(),
  isFavorite: false,
};

export function newCardState(): SrsState {
  return { ...DEFAULT_STATE, dueDate: new Date().toISOString() };
}

export function isDue(state: SrsState | undefined): boolean {
  if (!state) return true;
  return new Date(state.dueDate).getTime() <= Date.now();
}

// Simplified SM-2 algorithm.
export function nextState(state: SrsState | undefined, grade: SrsGrade): SrsState {
  const current = state ?? newCardState();
  let { interval, ease, reps } = current;

  if (grade === "again") {
    reps = 0;
    interval = 0; // due again today (later this session)
    ease = Math.max(1.3, ease - 0.2);
  } else {
    reps += 1;
    if (grade === "hard") ease = Math.max(1.3, ease - 0.15);
    if (grade === "easy") ease = ease + 0.15;

    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 3;
    else interval = Math.round(interval * ease);
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + Math.max(interval, grade === "again" ? 0 : 1));

  return { interval, ease, reps, dueDate: dueDate.toISOString(), isFavorite: current.isFavorite };
}

/** 0-100 mastery estimate from review history: more reps and a longer
 * interval (proven long-term retention) push the score up. */
export function masteryScore(state: SrsState | undefined): number {
  if (!state) return 0;
  const raw = state.reps * 12 + Math.min(state.interval, 60) * 1.2;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

/** Cards the learner has reviewed at least once but keeps missing. */
export function isDifficult(state: SrsState | undefined): boolean {
  if (!state) return false;
  return state.reps > 0 && state.ease <= 2.0;
}
