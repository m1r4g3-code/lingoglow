import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

export function RequireRole({ role, children }: { role: UserRole; children: ReactNode }) {
  const { profile, loading } = useAuth();

  if (loading || !profile) return null;

  if (profile.role !== role) {
    // Admin has no self-serve path (blocked server-side, see
    // supabase/migrations/*_phase5_admin_guard.sql) — pointing at the
    // account page here would promise a toggle that doesn't exist.
    if (role === "admin") {
      return (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Admin access is granted manually and isn't available to switch to from your account. Contact the site owner
          if you believe you should have access.
        </div>
      );
    }
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        This page is for {role} accounts. You're currently a {profile.role}.{" "}
        <Link to="/account" className="text-violet-500 hover:underline">
          Update your account →
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
