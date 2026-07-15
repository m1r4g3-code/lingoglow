import { MISSIONS } from "../data/missions";
import { getMissionState } from "../lib/storage";
import { currentPeriodKey } from "../lib/gamification";

export function MissionsPage() {
  return (
    <div>
      <h1 className="glow-text text-2xl font-bold">Missions</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Complete missions to earn bonus XP and coins.</p>

      <div className="mt-6 flex flex-col gap-3">
        {MISSIONS.map((mission) => {
          const periodKey = currentPeriodKey(mission.type);
          const state = getMissionState(mission.code);
          const progress = state?.periodKey === periodKey ? state.progress : 0;
          const completed = state?.periodKey === periodKey && !!state.completedAt;
          const pct = Math.min(100, Math.round((progress / mission.targetCount) * 100));

          return (
            <div
              key={mission.code}
              className="glow-card rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              style={{ ["--glow-color" as string]: completed ? "rgba(52, 211, 153, 0.4)" : "rgba(56, 189, 248, 0.35)" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {completed ? "✅ " : ""}
                  {mission.title}
                </h3>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
                  {mission.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{mission.description}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${completed ? "bg-emerald-500" : "bg-sky-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                {Math.min(progress, mission.targetCount)} / {mission.targetCount} · +{mission.xpReward} XP, +
                {mission.coinReward} coins
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
