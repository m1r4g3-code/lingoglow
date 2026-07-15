import type { Lesson, SrsState } from "../types";

/** A lesson counts as "cleared" once you've reviewed most of its words at
 * least once — lenient on purpose so the skill tree doesn't gate on perfect
 * recall, just genuine first-pass engagement. */
export function isLessonCleared(lesson: Lesson, states: Record<string, SrsState>): boolean {
  if (lesson.vocab.length === 0) return false;
  const reviewed = lesson.vocab.filter((card) => (states[card.id]?.reps ?? 0) >= 1).length;
  return reviewed / lesson.vocab.length >= 0.6;
}
