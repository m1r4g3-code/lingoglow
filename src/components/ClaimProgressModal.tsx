import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { claimLocalProgress, hasLocalProgress } from "../lib/storage";
import { supabase } from "../lib/supabaseClient";

export function ClaimProgressModal() {
  const { user, profile, refreshProfile } = useAuth();
  const [visible, setVisible] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimedCount, setClaimedCount] = useState<number | null>(null);

  useEffect(() => {
    if (user && profile && !profile.hasClaimedLocal && hasLocalProgress()) {
      setVisible(true);
    }
  }, [user, profile]);

  if (!visible || !user) return null;

  const handleAccept = async () => {
    setClaiming(true);
    const count = await claimLocalProgress(user.id);
    await supabase.from("profiles").update({ has_claimed_local: true }).eq("id", user.id);
    await refreshProfile();
    setClaimedCount(count);
    setClaiming(false);
  };

  const handleDismiss = async () => {
    await supabase.from("profiles").update({ has_claimed_local: true }).eq("id", user.id);
    await refreshProfile();
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
      <div className="glow-card w-full max-w-sm rounded-2xl border border-border bg-card p-6">
        {claimedCount === null ? (
          <>
            <h2 className="text-lg font-semibold">Save your progress?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We found review progress saved on this device. Sync it to your account so it's not lost?
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={handleAccept}
                disabled={claiming}
                className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {claiming ? "Syncing…" : "Yes, sync it"}
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-lg border border-border px-4 py-2.5 text-sm"
              >
                Skip
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Synced 🎉</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {claimedCount} card{claimedCount === 1 ? "" : "s"} of progress saved to your account.
            </p>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}
