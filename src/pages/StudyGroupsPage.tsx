import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createGroup, listMyGroups, listPublicGroups } from "../lib/social";
import type { StudyGroup } from "../types";

export function StudyGroupsPage() {
  const { user } = useAuth();
  const [publicGroups, setPublicGroups] = useState<StudyGroup[]>([]);
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [creating, setCreating] = useState(false);

  const refresh = () => {
    listPublicGroups().then(setPublicGroups);
    if (user) listMyGroups(user.id).then(setMyGroups);
  };

  useEffect(refresh, [user]);

  const handleCreate = async () => {
    if (!user || !name.trim()) return;
    setCreating(true);
    const { error } = await createGroup(user.id, name.trim(), description.trim(), isPublic);
    setCreating(false);
    if (!error) {
      setName("");
      setDescription("");
      setShowCreate(false);
      refresh();
    }
  };

  const myGroupIds = new Set(myGroups.map((g) => g.id));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="glow-text text-2xl font-bold">Study Groups</h1>
        <button
          type="button"
          onClick={() => setShowCreate((s) => !s)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {showCreate ? "Cancel" : "Create Group"}
        </button>
      </div>

      {showCreate && (
        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Group name"
            className="glow-ring rounded-lg border border-border bg-secondary px-4 py-2 text-sm outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
            className="glow-ring rounded-lg border border-border bg-secondary px-4 py-2 text-sm outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            Public (anyone can find and join)
          </label>
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

      {myGroups.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            My Groups
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {myGroups.map((g) => (
              <Link
                key={g.id}
                to={`/groups/${g.id}`}
                className="glow-card rounded-xl border border-border bg-card p-4"
                style={{ ["--glow-color" as string]: "rgba(56, 189, 248, 0.35)" }}
              >
                <h3 className="font-semibold">{g.name}</h3>
                {g.description && <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Discover
        </h2>
        {publicGroups.length === 0 ? (
          <p className="text-sm text-muted-foreground">No public groups yet — be the first to create one.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {publicGroups
              .filter((g) => !myGroupIds.has(g.id))
              .map((g) => (
                <Link
                  key={g.id}
                  to={`/groups/${g.id}`}
                  className="glow-card rounded-xl border border-border bg-card p-4"
                  style={{ ["--glow-color" as string]: "rgba(56, 189, 248, 0.35)" }}
                >
                  <h3 className="font-semibold">{g.name}</h3>
                  {g.description && <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
