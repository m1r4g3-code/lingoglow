import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { getWritingFeedback } from "../lib/ai";
import { useAuth } from "../context/AuthContext";
import { canUseAi, FREE_AI_DAILY_LIMIT, getAiUsageToday, incrementAiUsage } from "../lib/premium";

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
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">AI Writing Feedback</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Write a few sentences in {language.name} and get feedback on grammar and vocabulary.
      </p>
      {profile.tier === "free" && (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {usage}/{FREE_AI_DAILY_LIMIT} free messages used today (shared with AI Conversation) ·{" "}
          <Link to="/account" className="text-sky-500 hover:underline">
            Upgrade for unlimited
          </Link>
        </p>
      )}

      {notConfigured ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          AI writing feedback isn't turned on yet — the site owner needs to add an Anthropic API key. Everything else
          still works!
        </div>
      ) : capped ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          You've used today's {FREE_AI_DAILY_LIMIT} free AI messages.{" "}
          <Link to="/account" className="text-sky-500 hover:underline">
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
            className="glow-ring mt-6 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !text.trim()}
            className="mt-3 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {submitting ? "Reviewing…" : "Get feedback"}
          </button>

          {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}

          {feedback && (
            <div
              className="glow-card mt-5 rounded-xl border border-slate-200 bg-white p-5 text-sm whitespace-pre-wrap dark:border-slate-800 dark:bg-slate-900"
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
