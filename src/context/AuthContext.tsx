import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import { hydrateFromSupabase, setSyncUserId } from "../lib/storage";
import type { Profile } from "../types";

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isHydrated: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function rowToProfile(row: {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  role: Profile["role"];
  has_claimed_local: boolean;
}): Profile {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    role: row.role,
    hasClaimedLocal: row.has_claimed_local,
  };
}

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error || !data) return null;
  return rowToProfile(data);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  async function handleSession(session: Session | null) {
    const nextUser = session?.user ?? null;
    setUser(nextUser);
    setSyncUserId(nextUser?.id ?? null);

    if (nextUser) {
      const [profileResult] = await Promise.all([fetchProfile(nextUser.id), hydrateFromSupabase(nextUser.id)]);
      setProfile(profileResult);
      setIsHydrated(true);
    } else {
      setProfile(null);
      setIsHydrated(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => handleSession(data.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void handleSession(session);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null, needsEmailConfirmation: !error && !data.session };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    if (!user) return;
    const next = await fetchProfile(user.id);
    setProfile(next);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isHydrated, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
