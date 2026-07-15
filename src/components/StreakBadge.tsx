import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { getUserProgress, subscribeProgress } from "../lib/storage";

export function StreakBadge() {
  const [progress, setProgress] = useState(getUserProgress);

  useEffect(() => subscribeProgress(() => setProgress(getUserProgress())), []);

  if (progress.streakCurrent === 0) return null;

  return (
    <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
      <Flame className="h-3.5 w-3.5" strokeWidth={2} fill="currentColor" fillOpacity={0.15} />
      {progress.streakCurrent}
    </span>
  );
}
