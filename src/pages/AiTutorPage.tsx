import { useState, type FormEvent } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { sendChatMessage, type ChatMessage } from "../lib/ai";
import { useAuth } from "../context/AuthContext";
import { canUseAi, FREE_AI_DAILY_LIMIT, getAiUsageToday, incrementAiUsage } from "../lib/premium";
import { AI_FEATURES_ENABLED } from "../config";

export function AiTutorPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const { profile } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState(getAiUsageToday);

  if (!language || !profile) return <Navigate to="/" replace />;

  if (!AI_FEATURES_ENABLED) {
    return (
      <div>
        <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
          ← {language.name}
        </Link>
        <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          AI Conversation is paused for now. Everything else still works!
        </div>
      </div>
    );
  }

  const capped = !canUseAi(profile.tier);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending || capped) return;
    setError(null);

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    const result = await sendChatMessage(language.name, nextMessages);
    setSending(false);

    if (result.notConfigured) {
      setNotConfigured(true);
      return;
    }
    if (result.error) {
      setError(result.error);
      return;
    }
    incrementAiUsage();
    setUsage(getAiUsageToday());
    setMessages((m) => [...m, { role: "assistant", content: result.reply ?? "" }]);
  };

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">AI Conversation Partner</h1>
      <p className="mt-1 text-muted-foreground">
        Practice a casual chat in {language.name}. Mistakes get gently corrected.
      </p>
      {profile.tier === "free" && (
        <p className="mt-1 text-xs text-muted-foreground">
          {usage}/{FREE_AI_DAILY_LIMIT} free messages used today ·{" "}
          <Link to="/account" className="text-primary hover:underline">
            Upgrade for unlimited
          </Link>
        </p>
      )}

      {notConfigured ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          The AI tutor isn't turned on yet — the site owner needs to add an Anthropic API key. Everything else still
          works!
        </div>
      ) : capped ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          You've used today's {FREE_AI_DAILY_LIMIT} free AI messages.{" "}
          <Link to="/account" className="text-primary hover:underline">
            Upgrade to Premium
          </Link>{" "}
          for unlimited access, or come back tomorrow.
        </div>
      ) : (
        <>
          <div className="mt-6 flex min-h-[300px] flex-col gap-3 rounded-2xl border border-border bg-card p-5">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">Say hello to get started…</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && <p className="text-sm text-muted-foreground">Thinking…</p>}
          </div>

          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type in ${language.name}...`}
              className="glow-ring flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}
