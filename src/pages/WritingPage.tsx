import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { getWritingFeedback } from "../lib/ai";
import { useAuth } from "../context/AuthContext";
import { canUseAi, FREE_AI_DAILY_LIMIT, getAiUsageToday, incrementAiUsage } from "../lib/premium";
import { AI_FEATURES_ENABLED } from "../config";

export function WritingPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const { profile } = useAuth();
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
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
          AI Writing Feedback is paused for now. Everything else still works!
        </div>
      </div>
    );
  }

  const capped = !canUseAi(profile.tier);

  const handleSubmit = async () => {
    if (!text.trim() || submitting || capped) return;
    setError(null);
    setFeedback(null);
    setSubmitting(true);

    const result = await getWritingFeedback(language.name, text.trim());
    setSubmitting(false);

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
    setFeedback(result.reply ?? "");
  };

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-muted-foreground hover:underline">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">AI Writing Feedback</h1>
      <p className="mt-1 text-muted-foreground">
        Write a few sentences in {language.name} and get feedback on grammar and vocabulary.
      </p>
      {profile.tier === "free" && (
        <p className="mt-1 text-xs text-muted-foreground">
          {usage}/{FREE_AI_DAILY_LIMIT} free messages used today (shared with AI Conversation) ·{" "}
          <Link to="/account" className="text-primary hover:underline">
            Upgrade for unlimited
          </Link>
        </p>
      )}

      {notConfigured ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          AI writing feedback isn't turned on yet — the site owner needs to add an Anthropic API key. Everything else
          still works!
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
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Write something in ${language.name}...`}
            rows={6}
            className="glow-ring mt-6 w-full rounded-xl border border-border bg-card p-4 text-sm outline-none"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !text.trim()}
            className="mt-3 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {submitting ? "Reviewing…" : "Get feedback"}
          </button>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          {feedback && (
            <div
              className="glow-card mt-5 rounded-xl border border-border bg-card p-5 text-sm whitespace-pre-wrap"
              style={{ ["--glow-color" as string]: language.glowColor }}
            >
              {feedback}
            </div>
          )}
        </>
      )}
    </div>
  );
}
