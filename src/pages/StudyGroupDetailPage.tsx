import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createGroupPost,
  getGroup,
  getGroupMembers,
  isGroupMember,
  joinGroup,
  leaveGroup,
  listGroupPosts,
} from "../lib/social";
import type { GroupPost, PublicProfile, StudyGroup } from "../types";

export function StudyGroupDetailPage() {
  const { groupId = "" } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState<StudyGroup | null | undefined>(undefined);
  const [members, setMembers] = useState<PublicProfile[]>([]);
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);

  const refresh = async () => {
    if (!user) return;
    const [g, mem, memberOf] = await Promise.all([
      getGroup(groupId),
      getGroupMembers(groupId),
      isGroupMember(groupId, user.id),
    ]);
    setGroup(g);
    setMembers(mem);
    setIsMember(memberOf);
    if (memberOf || g?.isPublic) {
      listGroupPosts(groupId).then(setPosts);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, user]);

  if (!user) return <Navigate to="/login" replace />;
  if (group === null) return <Navigate to="/groups" replace />;
  if (group === undefined) return null;

  const handleJoin = async () => {
    await joinGroup(groupId, user.id);
    refresh();
  };

  const handleLeave = async () => {
    await leaveGroup(groupId, user.id);
    refresh();
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setPosting(true);
    await createGroupPost(groupId, user.id, newPost.trim());
    setNewPost("");
    setPosting(false);
    refresh();
  };

  return (
    <div>
      <Link to="/groups" className="text-sm text-muted-foreground hover:underline">
        ← Study Groups
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h1 className="glow-text text-2xl font-bold">{group.name}</h1>
          {group.description && <p className="mt-1 text-muted-foreground">{group.description}</p>}
        </div>
        {isMember ? (
          <button
            type="button"
            onClick={handleLeave}
            className="rounded-lg border border-border px-4 py-2 text-sm"
          >
            Leave
          </button>
        ) : (
          <button type="button" onClick={handleJoin} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Join
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {members.length} member{members.length === 1 ? "" : "s"}: {members.map((m) => m.username).join(", ")}
      </p>

      {isMember && (
        <div className="mt-6 flex gap-2">
          <input
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            placeholder="Share something with the group..."
            className="glow-ring flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none"
          />
          <button
            type="button"
            onClick={handlePost}
            disabled={posting || !newPost.trim()}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Post
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{p.authorUsername}</span>
                <span className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{p.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
