import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getStudentProgressForParent, listParentLinksAsParent, sendParentLinkRequest } from "../lib/dashboards";
import { searchUsers } from "../lib/social";
import type { ParentLinkEntry, PublicProfile, RosterStudent } from "../types";

function ParentDashboardInner() {
  const { user } = useAuth();
  const [links, setLinks] = useState<ParentLinkEntry[]>([]);
  const [studentStats, setStudentStats] = useState<Record<string, RosterStudent>>({});
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PublicProfile[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = async () => {
    if (!user) return;
    const entries = await listParentLinksAsParent(user.id);
    setLinks(entries);
    const accepted = entries.filter((e) => e.status === "accepted");
    const stats = await Promise.all(accepted.map((e) => getStudentProgressForParent(e.studentId)));
    const map: Record<string, RosterStudent> = {};
    accepted.forEach((e, i) => {
      const s = stats[i];
      if (s) map[e.studentId] = s;
    });
    setStudentStats(map);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSearch = async () => {
    if (!user || !query.trim()) return;
    setResults(await searchUsers(query, user.id));
  };

  const handleRequest = async (targetId: string) => {
    if (!user) return;
    const { error } = await sendParentLinkRequest(user.id, targetId);
    setMessage(error ?? "Link request sent — they need to accept it from their Account page.");
    setResults((r) => r.filter((p) => p.id !== targetId));
    refresh();
  };

  const accepted = links.filter((l) => l.status === "accepted");
  const pending = links.filter((l) => l.status === "pending");
  const knownIds = new Set(links.map((l) => l.studentId));

  return (
    <div>
      <h1 className="glow-text text-2xl font-bold">Parent Dashboard</h1>

      <div className="mt-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search your child's username..."
          className="glow-ring flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none"
        />
        <button type="button" onClick={handleSearch} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Search
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-muted-foreground">{message}</p>}

      {results.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {results.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5">
              <span className="text-sm font-medium">{p.username}</span>
              {knownIds.has(p.id) ? (
                <span className="text-xs text-muted-foreground">Already linked</span>
              ) : (
                <button type="button" onClick={() => handleRequest(p.id)} className="text-sm text-primary hover:underline">
                  Send link request
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {pending.length > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          Waiting on: {pending.map((p) => p.otherProfile.username).join(", ")}
        </p>
      )}

      <h2 className="mt-8 mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Linked Students ({accepted.length})
      </h2>
      {accepted.length === 0 ? (
        <p className="text-sm text-muted-foreground">No linked students yet.</p>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {accepted.map((l) => {
            const stats = studentStats[l.studentId];
            return (
              <div key={l.linkId} className="flex items-center justify-between bg-card px-5 py-3">
                <span className="font-medium">{l.otherProfile.username}</span>
                {stats && (
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Lv {stats.level}</span>
                    <span>{stats.xp} XP</span>
                    <span className="inline-flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
                      {stats.streakCurrent}
                    </span>
                    <span>{stats.totalReviews} reviews</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ParentDashboardPage() {
  return <ParentDashboardInner />;
}
