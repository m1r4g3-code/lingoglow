import { Link, Outlet } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ClaimProgressModal } from "./ClaimProgressModal";
import { RewardToast } from "./RewardToast";
import { XpBar } from "./XpBar";
import { StreakBadge } from "./StreakBadge";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { user, profile, signOut, isHydrated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-1.5 text-xl font-bold tracking-tight">
            <Sparkles className="brand-icon h-5 w-5" strokeWidth={1.75} />
            <span className="brand-gradient-text">Aether</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 text-sm">
                {isHydrated && (
                  <>
                    <StreakBadge />
                    <XpBar />
                  </>
                )}
                {profile && profile.role !== "student" && (
                  <Link
                    to={profile.role === "teacher" ? "/teacher" : profile.role === "parent" ? "/parent" : "/admin"}
                    className="hidden text-slate-500 hover:underline sm:inline dark:text-slate-400"
                  >
                    Dashboard
                  </Link>
                )}
                <Link to="/account" className="hidden text-slate-500 hover:underline sm:inline dark:text-slate-400">
                  {profile?.username ?? user.email}
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="text-slate-500 hover:underline dark:text-slate-400"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm text-slate-500 hover:underline dark:text-slate-400">
                Log in
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </main>
      <ClaimProgressModal />
      <RewardToast />
    </div>
  );
}
