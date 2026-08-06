import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ClaimProgressModal } from "./ClaimProgressModal";
import { RewardToast } from "./RewardToast";
import { XpBar } from "./XpBar";
import { StreakBadge } from "./StreakBadge";
import { buttonVariants } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { setSyncErrorHandler } from "../lib/storage";

// These point at anchors on the home page (see Home.tsx section ids).
// Plain <a> tags rather than router <Link>s so clicking from another
// page does a normal navigation-plus-hash-scroll, and clicking while
// already on "/" does a native same-page scroll — no custom scroll
// logic needed for either case.
const MARKETING_NAV_LINKS = [
  { href: "/#languages", label: "Languages" },
  { href: "/#features", label: "Features" },
  { href: "/#community", label: "Community" },
];

export function Layout() {
  const { user, profile, signOut, isHydrated } = useAuth();
  const location = useLocation();
  const { pushError } = useToast();

  useEffect(() => {
    setSyncErrorHandler(pushError);
    return () => setSyncErrorHandler(null);
  }, [pushError]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-1.5 text-xl font-bold tracking-tight">
            <Sparkles className="brand-icon h-5 w-5" strokeWidth={1.75} />
            <span className="brand-gradient-text">Aether</span>
          </Link>

          {!user && (
            <nav className="hidden items-center gap-6 md:flex">
              {MARKETING_NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              ))}
            </nav>
          )}

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
                    className="hidden text-muted-foreground hover:underline sm:inline"
                  >
                    Dashboard
                  </Link>
                )}
                <Link to="/account" className="hidden text-muted-foreground hover:underline sm:inline">
                  {profile?.username ?? user.email}
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="text-muted-foreground hover:underline"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  Log in
                </Link>
                <Link to="/login" className={buttonVariants({ size: "sm" })}>
                  Get Started
                </Link>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div key={location.pathname} className="anim-fade-in">
          <Outlet />
        </div>
      </main>
      <ClaimProgressModal />
      <RewardToast />
    </div>
  );
}
