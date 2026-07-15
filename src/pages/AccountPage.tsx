import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { joinClassByCode, listParentLinksAsStudent, respondToParentLink } from "../lib/dashboards";
import type { ParentLinkEntry, UserRole } from "../types";

const ROLES: { value: UserRole; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "parent", label: "Parent" },
];

export function AccountPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [pendingLinks, setPendingLinks] = useState<ParentLinkEntry[]>([]);
  const [classCode, setClassCode] = useState("");
  const [joinMessage, setJoinMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    listParentLinksAsStudent(user.id).then((links) => setPendingLinks(links.filter((l) => l.status === "pending")));
  }, [user]);

  if (!user || !profile) return null;

  const handleRoleChange = async (role: UserRole) => {
    await supabase.from("profiles").update({ role }).eq("id", user.id);
    await refreshProfile();
  };

  const handleTogglePremium = async () => {
    const nextTier = profile.tier === "premium" ? "free" : "premium";
    await supabase.from("profiles").update({ tier: nextTier }).eq("id", user.id);
    await refreshProfile();
  };

  const handleJoinClass = async () => {
    if (!classCode.trim()) return;
    const result = await joinClassByCode(user.id, classCode.trim());
    setJoinMessage(result.error ?? `Joined ${result.className}!`);
    if (!result.error) setClassCode("");
  };

  const handleRespondLink = async (link: ParentLinkEntry, accept: boolean) => {
    await respondToParentLink(link.parentId, link.studentId, accept);
    setPendingLinks((links) => links.filter((l) => l.linkId !== link.linkId));
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="glow-text text-2xl font-bold">Account</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">{profile.username}</p>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
          Account type
        </h2>
        <div className="flex gap-2">
          {ROLES.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => handleRoleChange(r.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                profile.role === r.value
                  ? "bg-violet-500 text-white"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        {profile.role === "teacher" && (
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            Head to the <a href="/teacher" className="text-violet-500 hover:underline">Teacher dashboard</a> to create a class.
          </p>
        )}
        {profile.role === "parent" && (
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            Head to the <a href="/parent" className="text-violet-500 hover:underline">Parent dashboard</a> to link a student.
          </p>
        )}
      </div>

      {pendingLinks.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Parent link requests
          </h2>
          <div className="flex flex-col gap-2">
            {pendingLinks.map((link) => (
              <div
                key={link.linkId}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="text-sm">{link.otherProfile.username} wants to link as your parent</span>
                <div className="flex gap-3">
                  <button type="button" onClick={() => handleRespondLink(link, true)} className="text-sm text-emerald-500 hover:underline">
                    Accept
                  </button>
                  <button type="button" onClick={() => handleRespondLink(link, false)} className="text-sm text-slate-400 hover:underline">
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
          Join a class
        </h2>
        <div className="flex gap-2">
          <input
            value={classCode}
            onChange={(e) => setClassCode(e.target.value.toUpperCase())}
            placeholder="Class code"
            className="glow-ring flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          />
          <button type="button" onClick={handleJoinClass} className="rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white">
            Join
          </button>
        </div>
        {joinMessage && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{joinMessage}</p>}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
          Premium
        </h2>
        <div className="glow-card rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm">
            You're on the <span className="font-semibold">{profile.tier === "premium" ? "Premium" : "Free"}</span> plan.
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Demo toggle only — no real payment is processed. Premium removes the daily cap on AI tutor/writing messages.
          </p>
          <button
            type="button"
            onClick={handleTogglePremium}
            className="mt-3 rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white"
          >
            {profile.tier === "premium" ? "Downgrade to Free" : "Upgrade to Premium (demo)"}
          </button>
        </div>
      </div>
    </div>
  );
}
