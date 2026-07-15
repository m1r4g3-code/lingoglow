import { supabase } from "./supabaseClient";
import type { FriendEntry, GroupPost, PublicProfile, StudyGroup } from "../types";

// ───────────────────────── friends ─────────────────────────

export async function searchUsers(query: string, excludeUserId: string): Promise<PublicProfile[]> {
  if (!query.trim()) return [];
  const { data, error } = await supabase
    .from("public_profiles")
    .select("*")
    .ilike("username", `%${query.trim()}%`)
    .neq("id", excludeUserId)
    .limit(10);
  if (error || !data) return [];
  return data.map(rowToProfile);
}

function rowToProfile(row: { id: string; username: string; display_name: string | null; avatar_url: string | null }): PublicProfile {
  return { id: row.id, username: row.username, displayName: row.display_name, avatarUrl: row.avatar_url };
}

interface FriendshipRow {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: "pending" | "accepted" | "blocked";
}

export async function listFriendships(userId: string): Promise<FriendEntry[]> {
  const { data, error } = await supabase
    .from("friendships")
    .select("*")
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);
  if (error || !data) return [];

  const rows = data as FriendshipRow[];
  const otherIds = rows.map((r) => (r.requester_id === userId ? r.addressee_id : r.requester_id));
  if (otherIds.length === 0) return [];

  const { data: profiles } = await supabase.from("public_profiles").select("*").in("id", otherIds);
  const profileById = new Map((profiles ?? []).map((p) => [p.id, rowToProfile(p)]));

  return rows
    .map((r) => {
      const otherId = r.requester_id === userId ? r.addressee_id : r.requester_id;
      const profile = profileById.get(otherId);
      if (!profile) return null;
      return {
        friendshipId: r.id,
        profile,
        status: r.status,
        direction: r.requester_id === userId ? ("outgoing" as const) : ("incoming" as const),
      };
    })
    .filter((x): x is FriendEntry => x !== null);
}

export async function sendFriendRequest(userId: string, targetId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("friendships").insert({ requester_id: userId, addressee_id: targetId });
  return { error: error?.message ?? null };
}

export async function respondToFriendRequest(friendshipId: string, accept: boolean): Promise<{ error: string | null }> {
  if (accept) {
    const { error } = await supabase.from("friendships").update({ status: "accepted" }).eq("id", friendshipId);
    return { error: error?.message ?? null };
  }
  const { error } = await supabase.from("friendships").delete().eq("id", friendshipId);
  return { error: error?.message ?? null };
}

export async function removeFriendship(friendshipId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("friendships").delete().eq("id", friendshipId);
  return { error: error?.message ?? null };
}

// ───────────────────────── study groups ─────────────────────────

interface GroupRow {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  is_public: boolean;
  created_at: string;
}

function rowToGroup(row: GroupRow): StudyGroup {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    ownerId: row.owner_id,
    isPublic: row.is_public,
    createdAt: row.created_at,
  };
}

export async function listPublicGroups(): Promise<StudyGroup[]> {
  const { data, error } = await supabase.from("study_groups").select("*").eq("is_public", true).order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as GroupRow[]).map(rowToGroup);
}

export async function listMyGroups(userId: string): Promise<StudyGroup[]> {
  const { data: memberships } = await supabase.from("study_group_members").select("group_id").eq("user_id", userId);
  const groupIds = (memberships ?? []).map((m) => m.group_id);
  if (groupIds.length === 0) return [];
  const { data, error } = await supabase.from("study_groups").select("*").in("id", groupIds);
  if (error || !data) return [];
  return (data as GroupRow[]).map(rowToGroup);
}

export async function createGroup(
  ownerId: string,
  name: string,
  description: string,
  isPublic: boolean
): Promise<{ group: StudyGroup | null; error: string | null }> {
  const { data, error } = await supabase
    .from("study_groups")
    .insert({ owner_id: ownerId, name, description, is_public: isPublic })
    .select()
    .single();
  if (error || !data) return { group: null, error: error?.message ?? "Failed to create group" };

  const group = rowToGroup(data as GroupRow);
  await supabase.from("study_group_members").insert({ group_id: group.id, user_id: ownerId, role: "owner" });
  return { group, error: null };
}

export async function getGroup(groupId: string): Promise<StudyGroup | null> {
  const { data, error } = await supabase.from("study_groups").select("*").eq("id", groupId).single();
  if (error || !data) return null;
  return rowToGroup(data as GroupRow);
}

export async function isGroupMember(groupId: string, userId: string): Promise<boolean> {
  const { data } = await supabase.from("study_group_members").select("user_id").eq("group_id", groupId).eq("user_id", userId).maybeSingle();
  return !!data;
}

export async function joinGroup(groupId: string, userId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("study_group_members").insert({ group_id: groupId, user_id: userId });
  return { error: error?.message ?? null };
}

export async function leaveGroup(groupId: string, userId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("study_group_members").delete().eq("group_id", groupId).eq("user_id", userId);
  return { error: error?.message ?? null };
}

export async function getGroupMembers(groupId: string): Promise<PublicProfile[]> {
  const { data: memberships } = await supabase.from("study_group_members").select("user_id").eq("group_id", groupId);
  const ids = (memberships ?? []).map((m) => m.user_id);
  if (ids.length === 0) return [];
  const { data } = await supabase.from("public_profiles").select("*").in("id", ids);
  return (data ?? []).map(rowToProfile);
}

// ───────────────────────── group discussion posts ─────────────────────────

interface PostRow {
  id: string;
  group_id: string;
  author_id: string;
  body: string;
  created_at: string;
}

export async function listGroupPosts(groupId: string): Promise<GroupPost[]> {
  const { data, error } = await supabase
    .from("group_posts")
    .select("*")
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];

  const rows = data as PostRow[];
  const authorIds = [...new Set(rows.map((r) => r.author_id))];
  const { data: profiles } = await supabase.from("public_profiles").select("id, username").in("id", authorIds);
  const usernameById = new Map((profiles ?? []).map((p) => [p.id, p.username as string]));

  return rows.map((r) => ({
    id: r.id,
    groupId: r.group_id,
    authorId: r.author_id,
    authorUsername: usernameById.get(r.author_id) ?? "Unknown",
    body: r.body,
    createdAt: r.created_at,
  }));
}

export async function createGroupPost(groupId: string, authorId: string, body: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("group_posts").insert({ group_id: groupId, author_id: authorId, body });
  return { error: error?.message ?? null };
}
