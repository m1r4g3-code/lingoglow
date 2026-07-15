import { useState, type FormEvent } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLanguage } from "../data/languages";
import { sendChatMessage, type ChatMessage } from "../lib/ai";

export function AiTutorPage() {
  const { languageId = "" } = useParams();
  const language = getLanguage(languageId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!language) return <Navigate to="/" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;
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
    setMessages((m) => [...m, { role: "assistant", content: result.reply ?? "" }]);
  };

  return (
    <div>
      <Link to={`/language/${language.id}`} className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← {language.name}
      </Link>

      <h1 className="glow-text mt-3 text-2xl font-bold">AI Conversation Partner</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Practice a casual chat in {language.name}. Mistakes get gently corrected.
      </p>

      {notConfigured ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          The AI tutor isn't turned on yet — the site owner needs to add an Anthropic API key. Everything else still
          works!
        </div>
      ) : (
        <>
          <div className="mt-6 flex min-h-[300px] flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            {messages.length === 0 && (
              <p className="text-sm text-slate-400 dark:text-slate-500">Say hello to get started…</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-sky-500 text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && <p className="text-sm text-slate-400 dark:text-slate-500">Thinking…</p>}
          </div>

          {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type in ${language.name}...`}
              className="glow-ring flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}
