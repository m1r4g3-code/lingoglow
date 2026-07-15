import type { SkillNode } from "../types";
import { getLessons } from "./languages";

/** Derives a linear skill-tree chain from a language's existing lesson
 * order (already authored A1 -> A2 -> B1) — no separate hand-authored data. */
export function getSkillTree(languageId: string): SkillNode[] {
  const lessons = getLessons(languageId);
  return lessons.map((lesson, i) => ({
    id: `skill-${languageId}-${lesson.id}`,
    languageId,
    lessonId: lesson.id,
    level: lesson.level,
    prerequisiteIds: i === 0 ? [] : [`skill-${languageId}-${lessons[i - 1].id}`],
  }));
}
