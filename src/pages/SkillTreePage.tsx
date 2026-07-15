import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage, getLesson } from "../data/languages";
import { getSkillTree } from "../data/skillTree";
import { getAllCardStates } from "../lib/storage";
import { isLessonCleared } from "../lib/progress";
import { SkillTreeNode } from "../components/SkillTreeNode";

export function SkillTreePage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  if (!language) return <Navigate to="/" replace />;

  const nodes = getSkillTree(languageId);
  const states = getAllCardStates();
  const clearedSkillIds = new Set<string>();

  for (const node of nodes) {
    const lesson = getLesson(languageId, node.lessonId);
    if (lesson && isLessonCleared(lesson, states)) clearedSkillIds.add(node.id);
  }

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">Skill Tree</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Work through lessons in order. Review most of a lesson's words to unlock the next.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {nodes.map((node) => {
          const lesson = getLesson(languageId, node.lessonId);
          if (!lesson) return null;
          const cleared = clearedSkillIds.has(node.id);
          const unlocked = node.prerequisiteIds.every((id) => clearedSkillIds.has(id));
          const status = cleared ? "cleared" : unlocked ? "unlocked" : "locked";
          return (
            <SkillTreeNode
              key={node.id}
              lesson={lesson}
              languageId={languageId}
              glowColor={language.glowColor}
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
}
