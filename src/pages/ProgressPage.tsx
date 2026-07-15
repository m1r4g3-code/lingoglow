import { Link } from "react-router-dom";
import { getUserProgress, getEarnedBadges } from "../lib/storage";
import { levelForXp } from "../lib/gamification";
import { BADGES } from "../data/badges";

export function ProgressPage() {
  const progress = getUserProgress();
  const level = levelForXp(progress.xp);
  const earnedCodes = new Set(getEarnedBadges());
  const earnedBadges = BADGES.filter((b) => earnedCodes.has(b.code));

  const tiles = [
    { label: "XP", value: progress.xp },
    { label: "Level", value: level },
    { label: "Coins", value: progress.coins },
    { label: "Current streak", value: `${progress.streakCurrent} 🔥` },
    { label: "Longest streak", value: progress.streakLongest },
    { label: "Words reviewed", value: progress.totalReviews },
  ];

  return (
    <div>
      <h1 className="glow-text text-2xl font-bold">Your Progress</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="glow-card rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900"
            style={{ ["--glow-color" as string]: "rgba(56, 189, 248, 0.35)" }}
          >
            <p className="text-2xl font-bold">{tile.value}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tile.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
          Badges ({earnedBadges.length}/{BADGES.length})
        </h2>
        <Link to="/badges" className="text-sm text-violet-500 hover:underline">
          View all
        </Link>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {earnedBadges.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No badges yet — start reviewing to earn some.</p>
        ) : (
          earnedBadges.map((b) => (
            <span
              key={b.code}
              title={b.description}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-sm dark:bg-slate-800"
            >
              {b.icon} {b.name}
            </span>
          ))
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/missions" className="text-sm text-violet-500 hover:underline">
          View missions →
        </Link>
        <Link to="/leaderboard" className="text-sm text-violet-500 hover:underline">
          View leaderboard →
        </Link>
        <Link to="/friends" className="text-sm text-violet-500 hover:underline">
          Friends →
        </Link>
        <Link to="/groups" className="text-sm text-violet-500 hover:underline">
          Study groups →
        </Link>
      </div>
    </div>
  );
}
