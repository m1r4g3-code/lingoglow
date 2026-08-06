import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserProgress, subscribeProgress } from "../lib/storage";
import { levelForXp } from "../lib/gamification";

export function XpBar() {
  const [progress, setProgress] = useState(getUserProgress);

  useEffect(() => subscribeProgress(() => setProgress(getUserProgress())), []);

  const xpIntoLevel = progress.xp % 100;
  const level = levelForXp(progress.xp);

  return (
    <Link to="/progress" className="glow-ring flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
      <span className="text-muted-foreground">Lv {level}</span>
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
        <span className="block h-full rounded-full bg-primary transition-all" style={{ width: `${xpIntoLevel}%` }} />
      </span>
      <span className="text-muted-foreground">{progress.xp} XP</span>
    </Link>
  );
}
