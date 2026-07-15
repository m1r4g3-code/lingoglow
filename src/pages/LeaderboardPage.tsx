import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import type { LeaderboardEntry } from "../types";

type Scope = "global" | "friends";

interface LeaderboardRow {
  user_id: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  level: number;
}

export function LeaderboardPage() {
  const { user } = useAuth();
  const [scope, setScope] = useState<Scope>("global");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .rpc("get_leaderboard", { scope })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("leaderboard fetch failed", error);
          setEntries([]);
        } else {
          setEntries(
            (data as LeaderboardRow[]).map((r) => ({
              userId: r.user_id,
              username: r.username,
              avatarUrl: r.avatar_url,
              xp: r.xp,
              level: r.level,
            }))
          );
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [scope]);

  return (
    <div>
      <h1 className="glow-text text-2xl font-bold">Leaderboard</h1>

      <div className="mt-4 flex gap-2">
        {(["global", "friends"] as Scope[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
              scope === s ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {loading ? (
          <p className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">Loading…</p>
        ) : entries.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {scope === "friends" ? (
              <>
                Add friends to see them here.{" "}
                <Link to="/friends" className="text-sky-500 hover:underline">
                  Find friends →
                </Link>
              </>
            ) : (
              "No one's on the leaderboard yet."
            )}
          </p>
        ) : (
          entries.map((entry, i) => (
            <div
              key={entry.userId}
              className={`flex items-center justify-between px-5 py-3 ${
                entry.userId === user?.id ? "bg-sky-50 dark:bg-sky-500/10" : "bg-white dark:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-sm font-semibold text-slate-400">{i + 1}</span>
                <span className="font-medium">{entry.username}</span>
                {entry.userId === user?.id && <span className="text-xs text-sky-500">(you)</span>}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>Lv {entry.level}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{entry.xp} XP</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
