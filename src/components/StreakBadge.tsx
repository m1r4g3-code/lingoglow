import { useEffect, useState } from "react";
import { getUserProgress, subscribeProgress } from "../lib/storage";

export function StreakBadge() {
  const [progress, setProgress] = useState(getUserProgress);

  useEffect(() => subscribeProgress(() => setProgress(getUserProgress())), []);

  if (progress.streakCurrent === 0) return null;

  return (
    <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
      🔥 {progress.streakCurrent}
    </span>
  );
}
