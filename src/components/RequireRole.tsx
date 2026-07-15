import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

export function RequireRole({ role, children }: { role: UserRole; children: ReactNode }) {
  const { profile, loading } = useAuth();

  if (loading || !profile) return null;

  if (profile.role !== role) {
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
