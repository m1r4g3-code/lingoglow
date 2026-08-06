import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createClass, listMyClasses } from "../lib/dashboards";
import { languages } from "../data/languages";
import type { TeacherClass } from "../types";

function TeacherDashboardInner() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [languageId, setLanguageId] = useState(languages[0]?.id ?? "");
  const [creating, setCreating] = useState(false);

  const refresh = () => {
    if (user) listMyClasses(user.id).then(setClasses);
  };

  useEffect(refresh, [user]);

  const handleCreate = async () => {
    if (!user || !name.trim()) return;
    setCreating(true);
    const { error } = await createClass(user.id, name.trim(), languageId);
    setCreating(false);
    if (!error) {
      setName("");
      setShowCreate(false);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="glow-text text-2xl font-bold">Teacher Dashboard</h1>
        <button type="button" onClick={() => setShowCreate((s) => !s)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          {showCreate ? "Cancel" : "New Class"}
        </button>
      </div>

      {showCreate && (
        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Class name"
            className="glow-ring rounded-lg border border-border bg-secondary px-4 py-2 text-sm outline-none"
          />
          <select
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
            className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm"
          >
            {languages.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleCreate}
            disabled={creating || !name.trim()}
            className="mt-1 self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Create
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {classes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No classes yet — create one above.</p>
        ) : (
          classes.map((c) => (
            <Link
              key={c.id}
              to={`/teacher/classes/${c.id}`}
              className="glow-card flex items-center justify-between rounded-xl border border-border bg-card p-4"
              style={{ ["--glow-color" as string]: "rgba(56, 189, 248, 0.35)" }}
            >
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.languageId.toUpperCase()}</p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-mono">{c.joinCode}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export function TeacherDashboardPage() {
  return <TeacherDashboardInner />;
}
