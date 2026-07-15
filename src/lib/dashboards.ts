import { supabase } from "./supabaseClient";
import type { ParentLinkEntry, PublicProfile, RosterStudent, TeacherClass } from "../types";

function randomJoinCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function rowToProfile(row: { id: string; username: string; display_name: string | null; avatar_url: string | null }): PublicProfile {
  return { id: row.id, username: row.username, displayName: row.display_name, avatarUrl: row.avatar_url };
}

// ───────────────────────── teacher: classes ─────────────────────────

interface ClassRow {
  id: string;
  name: string;
  teacher_id: string;
  language_id: string;
  join_code: string;
  created_at: string;
}

function rowToClass(row: ClassRow): TeacherClass {
  return {
    id: row.id,
    name: row.name,
    teacherId: row.teacher_id,
    languageId: row.language_id,
    joinCode: row.join_code,
    createdAt: row.created_at,
  };
}

export async function listMyClasses(teacherId: string): Promise<TeacherClass[]> {
  const { data, error } = await supabase.from("classes").select("*").eq("teacher_id", teacherId).order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as ClassRow[]).map(rowToClass);
}

export async function createClass(
  teacherId: string,
  name: string,
  languageId: string
): Promise<{ cls: TeacherClass | null; error: string | null }> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const joinCode = randomJoinCode();
    const { data, error } = await supabase
      .from("classes")
      .insert({ teacher_id: teacherId, name, language_id: languageId, join_code: joinCode })
      .select()
      .single();
    if (!error && data) return { cls: rowToClass(data as ClassRow), error: null };
    if (error && !error.message.includes("duplicate")) return { cls: null, error: error.message };
  }
  return { cls: null, error: "Couldn't generate a unique join code, try again." };
}

export async function getClass(classId: string): Promise<TeacherClass | null> {
  const { data, error } = await supabase.from("classes").select("*").eq("id", classId).single();
  if (error || !data) return null;
  return rowToClass(data as ClassRow);
}

export async function joinClassByCode(userId: string, code: string): Promise<{ error: string | null; className?: string }> {
  const { data: cls, error: findError } = await supabase
    .from("classes")
    .select("*")
    .eq("join_code", code.trim().toUpperCase())
    .maybeSingle();
  if (findError || !cls) return { error: "No class found with that code." };

  const { error } = await supabase.from("class_rosters").insert({ class_id: cls.id, student_id: userId });
  if (error) return { error: error.message.includes("duplicate") ? "You're already in this class." : error.message };
  return { error: null, className: (cls as ClassRow).name };
}

export async function getClassRoster(classId: string): Promise<RosterStudent[]> {
  const { data: rosterRows } = await supabase.from("class_rosters").select("student_id").eq("class_id", classId);
  const studentIds = (rosterRows ?? []).map((r) => r.student_id);
  if (studentIds.length === 0) return [];

  const [{ data: profiles }, { data: progress }] = await Promise.all([
    supabase.from("public_profiles").select("*").in("id", studentIds),
    supabase.from("user_progress").select("*").in("user_id", studentIds),
  ]);

  const progressById = new Map((progress ?? []).map((p) => [p.user_id, p]));

  return (profiles ?? []).map((p) => {
    const prog = progressById.get(p.id);
    return {
      profile: rowToProfile(p),
      xp: prog?.xp ?? 0,
      level: prog?.level ?? 1,
      streakCurrent: prog?.streak_current ?? 0,
      totalReviews: prog?.total_reviews ?? 0,
    };
  });
}

// ───────────────────────── parent links ─────────────────────────

interface ParentLinkRow {
  parent_id: string;
  student_id: string;
  status: "pending" | "accepted";
}

export async function sendParentLinkRequest(parentId: string, studentId: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("parent_links").insert({ parent_id: parentId, student_id: studentId });
  return { error: error?.message ?? null };
}

export async function respondToParentLink(parentId: string, studentId: string, accept: boolean): Promise<{ error: string | null }> {
  if (accept) {
    const { error } = await supabase
      .from("parent_links")
      .update({ status: "accepted" })
      .eq("parent_id", parentId)
      .eq("student_id", studentId);
    return { error: error?.message ?? null };
  }
  const { error } = await supabase.from("parent_links").delete().eq("parent_id", parentId).eq("student_id", studentId);
  return { error: error?.message ?? null };
}

export async function listParentLinksAsParent(parentId: string): Promise<ParentLinkEntry[]> {
  const { data, error } = await supabase.from("parent_links").select("*").eq("parent_id", parentId);
  if (error || !data) return [];
  const rows = data as ParentLinkRow[];
  const studentIds = rows.map((r) => r.student_id);
  if (studentIds.length === 0) return [];
  const { data: profiles } = await supabase.from("public_profiles").select("*").in("id", studentIds);
  const profileById = new Map((profiles ?? []).map((p) => [p.id, rowToProfile(p)]));
  return rows
    .map((r) => {
      const profile = profileById.get(r.student_id);
      if (!profile) return null;
      return { linkId: `${r.parent_id}:${r.student_id}`, parentId: r.parent_id, studentId: r.student_id, status: r.status, otherProfile: profile };
    })
    .filter((x): x is ParentLinkEntry => x !== null);
}

export async function listParentLinksAsStudent(studentId: string): Promise<ParentLinkEntry[]> {
  const { data, error } = await supabase.from("parent_links").select("*").eq("student_id", studentId);
  if (error || !data) return [];
  const rows = data as ParentLinkRow[];
  const parentIds = rows.map((r) => r.parent_id);
  if (parentIds.length === 0) return [];
  const { data: profiles } = await supabase.from("public_profiles").select("*").in("id", parentIds);
  const profileById = new Map((profiles ?? []).map((p) => [p.id, rowToProfile(p)]));
  return rows
    .map((r) => {
      const profile = profileById.get(r.parent_id);
      if (!profile) return null;
      return { linkId: `${r.parent_id}:${r.student_id}`, parentId: r.parent_id, studentId: r.student_id, status: r.status, otherProfile: profile };
    })
    .filter((x): x is ParentLinkEntry => x !== null);
}

export async function getStudentProgressForParent(studentId: string): Promise<RosterStudent | null> {
  const { data: profileRow } = await supabase.from("public_profiles").select("*").eq("id", studentId).single();
  const { data: prog } = await supabase.from("user_progress").select("*").eq("user_id", studentId).maybeSingle();
  if (!profileRow) return null;
  return {
    profile: rowToProfile(profileRow),
    xp: prog?.xp ?? 0,
    level: prog?.level ?? 1,
    streakCurrent: prog?.streak_current ?? 0,
    totalReviews: prog?.total_reviews ?? 0,
  };
}

// ───────────────────────── admin ─────────────────────────

export async function listAllProfiles(): Promise<(PublicProfile & { role: string })[]> {
  const { data, error } = await supabase.from("profiles").select("id, username, display_name, avatar_url, role").order("created_at", { ascending: false }).limit(100);
  if (error || !data) return [];
  return data.map((r) => ({ ...rowToProfile(r), role: r.role as string }));
}

export async function getAdminStats(): Promise<{ totalUsers: number; totalXp: number }> {
  const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { data } = await supabase.from("user_progress").select("xp");
  const totalXp = (data ?? []).reduce((sum, r) => sum + (r.xp ?? 0), 0);
  return { totalUsers: count ?? 0, totalXp };
}
