import { useEffect, useState } from "react";
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
        <div className="glow-card rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold">{stats?.totalUsers ?? "…"}</p>
          <p className="mt-1 text-xs text-muted-foreground">Total users</p>
        </div>
        <div className="glow-card rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold">{stats?.totalXp ?? "…"}</p>
          <p className="mt-1 text-xs text-muted-foreground">Total XP earned</p>
        </div>
      </div>

      <h2 className="mt-8 mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Users ({users.length})
      </h2>
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between bg-card px-5 py-3">
            <span className="text-sm font-medium">{u.username}</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground capitalize">
              {u.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  return <AdminDashboardInner />;
}
