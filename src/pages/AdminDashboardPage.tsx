import { useEffect, useState } from "react";
import { RequireRole } from "../components/RequireRole";
import { getAdminStats, listAllProfiles } from "../lib/dashboards";
import type { PublicProfile } from "../types";

function AdminDashboardInner() {
  const [stats, setStats] = useState<{ totalUsers: number; totalXp: number } | null>(null);
  const [users, setUsers] = useState<(PublicProfile & { role: string })[]>([]);

  useEffect(() => {
    getAdminStats().then(setStats);
    listAllProfiles().then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="glow-text text-2xl font-bold">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="glow-card rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{stats?.totalUsers ?? "…"}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Total users</p>
        </div>
        <div className="glow-card rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-2xl font-bold">{stats?.totalXp ?? "…"}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Total XP earned</p>
        </div>
      </div>

      <h2 className="mt-8 mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        Users ({users.length})
      </h2>
      <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between bg-white px-5 py-3 dark:bg-slate-900">
            <span className="text-sm font-medium">{u.username}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 capitalize dark:bg-slate-800 dark:text-slate-400">
              {u.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  return (
    <RequireRole role="admin">
      <AdminDashboardInner />
    </RequireRole>
  );
}
