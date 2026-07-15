import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  listFriendships,
  removeFriendship,
  respondToFriendRequest,
  searchUsers,
  sendFriendRequest,
} from "../lib/social";
import type { FriendEntry, PublicProfile } from "../types";

export function FriendsPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<FriendEntry[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PublicProfile[]>([]);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = () => {
    if (!user) return;
    listFriendships(user.id).then(setEntries);
  };

  useEffect(refresh, [user]);

  const handleSearch = async () => {
    if (!user || !query.trim()) return;
    setSearching(true);
    const found = await searchUsers(query, user.id);
    setResults(found);
    setSearching(false);
  };

  const handleAdd = async (targetId: string) => {
    if (!user) return;
    const { error } = await sendFriendRequest(user.id, targetId);
    setMessage(error ? error : "Friend request sent!");
    setResults((r) => r.filter((p) => p.id !== targetId));
    refresh();
  };

  const friends = entries.filter((e) => e.status === "accepted");
  const incoming = entries.filter((e) => e.status === "pending" && e.direction === "incoming");
  const outgoing = entries.filter((e) => e.status === "pending" && e.direction === "outgoing");
  const knownIds = new Set(entries.map((e) => e.profile.id));

  return (
    <div>
      <h1 className="glow-text text-2xl font-bold">Friends</h1>

      <div className="mt-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by username..."
          className="glow-ring flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching || !query.trim()}
          className="rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          Search
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{message}</p>}

      {results.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {results.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="text-sm font-medium">{p.username}</span>
              {knownIds.has(p.id) ? (
                <span className="text-xs text-slate-400">Already connected</span>
              ) : (
                <button type="button" onClick={() => handleAdd(p.id)} className="text-sm text-violet-500 hover:underline">
                  Add friend
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {incoming.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Requests ({incoming.length})
          </h2>
          <div className="flex flex-col gap-2">
            {incoming.map((e) => (
              <div
                key={e.friendshipId}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="text-sm font-medium">{e.profile.username}</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => respondToFriendRequest(e.friendshipId, true).then(refresh)}
                    className="text-sm text-emerald-500 hover:underline"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => respondToFriendRequest(e.friendshipId, false).then(refresh)}
                    className="text-sm text-slate-400 hover:underline"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
          Friends ({friends.length})
        </h2>
        {friends.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No friends yet — search for someone above to send a request.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {friends.map((e) => (
              <div
                key={e.friendshipId}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="text-sm font-medium">{e.profile.username}</span>
                <button
                  type="button"
                  onClick={() => removeFriendship(e.friendshipId).then(refresh)}
                  className="text-sm text-slate-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {outgoing.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Sent Requests ({outgoing.length})
          </h2>
          <div className="flex flex-col gap-2">
            {outgoing.map((e) => (
              <div
                key={e.friendshipId}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="text-sm font-medium">{e.profile.username}</span>
                <button
                  type="button"
                  onClick={() => removeFriendship(e.friendshipId).then(refresh)}
                  className="text-sm text-slate-400 hover:underline"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
