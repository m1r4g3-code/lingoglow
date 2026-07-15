// Supabase Edge Function: proxies chat/writing-feedback requests to the
// Anthropic API. The API key is a server-side secret (set via
// `supabase secrets set ANTHROPIC_API_KEY=...`) and is never exposed to
// the browser. Supabase's platform already requires a valid user JWT to
// invoke this function (default behavior of supabase.functions.invoke),
// so no separate auth check is needed here.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  mode: "chat" | "writing";
  languageName: string;
  messages?: ChatMessage[];
  text?: string;
}

const MODEL = "claude-sonnet-5";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return json(
      { error: "not_configured", message: "AI isn't set up yet — the site owner needs to add an Anthropic API key." },
      503
    );
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_request", message: "Invalid request body." }, 400);
  }

  const { mode, languageName, messages, text } = body;

  let systemPrompt: string;
  let anthropicMessages: ChatMessage[];

  if (mode === "writing") {
    if (!text || !text.trim()) return json({ error: "bad_request", message: "No text provided." }, 400);
    systemPrompt = `You are a supportive ${languageName} writing tutor for a language learner. The learner will submit a short piece of writing in ${languageName}. Give brief, encouraging feedback: point out 2-4 specific grammar or vocabulary issues (quote the exact phrase, explain the fix, give the corrected version), then note one thing they did well. Keep the whole response under 200 words. If the writing is already excellent, say so honestly and suggest one way to make it more advanced.`;
    anthropicMessages = [{ role: "user", content: text }];
  } else {
    if (!messages || messages.length === 0) return json({ error: "bad_request", message: "No messages provided." }, 400);
    systemPrompt = `You are a friendly, patient ${languageName} conversation partner for a language learner practicing casual conversation. Reply primarily in ${languageName}, using vocabulary and sentence complexity appropriate for a beginner-to-intermediate learner (CEFR A1-B1). Keep replies short (2-4 sentences) and end with a question to keep the conversation going. If the learner makes a significant grammar mistake, gently note the correction in English in square brackets after your ${languageName} reply, e.g. "[Note: you said X, the correct form is Y]" — but only for genuinely significant errors, not every minor slip.`;
    anthropicMessages = messages;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: systemPrompt,
        messages: anthropicMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return json({ error: "upstream_error", message: `AI request failed: ${errText}` }, 502);
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "";
    return json({ reply });
  } catch (e) {
    return json({ error: "server_error", message: String(e) }, 500);
  }
});
