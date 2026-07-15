import { BADGES } from "../data/badges";
import { getEarnedBadges } from "../lib/storage";

export function BadgesPage() {
  const earned = new Set(getEarnedBadges());

  return (
    <div>
      <h1 className="glow-text text-2xl font-bold">Badges</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        {earned.size} of {BADGES.length} unlocked
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {BADGES.map((badge) => {
          const isEarned = earned.has(badge.code);
          return (
            <div
              key={badge.code}
              className={`glow-card rounded-xl border p-4 text-center ${
                isEarned
                  ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  : "border-slate-200 bg-slate-100 opacity-50 dark:border-slate-800 dark:bg-slate-900/50"
              }`}
              style={isEarned ? { ["--glow-color" as string]: "rgba(250, 204, 21, 0.4)" } : undefined}
            >
              <p className="text-3xl">{isEarned ? badge.icon : "🔒"}</p>
              <p className="mt-2 text-sm font-semibold">{badge.name}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{badge.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
