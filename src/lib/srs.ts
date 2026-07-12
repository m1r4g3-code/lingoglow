import type { SrsGrade, SrsState } from "../types";

const DEFAULT_STATE: SrsState = {
  interval: 0,
  ease: 2.5,
  reps: 0,
  dueDate: new Date().toISOString(),
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

  return { interval, ease, reps, dueDate: dueDate.toISOString() };
}
