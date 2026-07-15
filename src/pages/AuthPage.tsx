import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Shown instead of the generic subtitle when RequireAuth bounced the user
// here from a specific gated page, so it doesn't feel like a dead end.
const REASON_BY_PATH: Record<string, string> = {
  "/progress": "Sign in to track your XP, streaks, and badges.",
  "/missions": "Sign in to track your daily and weekly missions.",
  "/leaderboard": "Sign in to see how you rank against friends.",
  "/friends": "Sign in to add friends and learn alongside other people.",
  "/groups": "Sign in to join or create a study group.",
  "/account": "Sign in to manage your account.",
};

export function AuthPage() {
  const { user, signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const reason = from ? REASON_BY_PATH[from] : undefined;
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  if (user) return <Navigate to="/" replace />;

  if (awaitingConfirmation) {
    return (
      <div className="mx-auto max-w-sm text-center">
        <h1 className="glow-text text-2xl font-bold">Check your email</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          We sent a confirmation link to <span className="font-medium">{email}</span>. Click it, then come back and
          log in.
        </p>
        <button
          type="button"
          onClick={() => {
            setAwaitingConfirmation(false);
            setMode("signin");
          }}
          className="mt-5 text-sm text-slate-500 hover:underline dark:text-slate-400"
        >
          Back to log in
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (mode === "signin") {
      const result = await signIn(email, password);
      setSubmitting(false);
      if (result.error) {
        setError(result.error);
        return;
      }
      navigate(from ?? "/");
      return;
    }

    const result = await signUp(email, password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.needsEmailConfirmation) {
      setAwaitingConfirmation(true);
      return;
    }
    navigate(from ?? "/");
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="glow-text text-2xl font-bold">{mode === "signin" ? "Log in" : "Sign up"}</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {mode === "signin"
          ? (reason ?? "Sync your progress across devices.")
          : "Create an account to save your progress."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="glow-ring rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="glow-ring rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
        />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="brand-gradient-bg mt-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 disabled:opacity-50"
        >
          {submitting ? "Please wait…" : mode === "signin" ? "Log in" : "Sign up"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
        className="mt-4 text-sm text-slate-500 hover:underline dark:text-slate-400"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  );
}
