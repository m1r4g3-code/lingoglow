import { supabase } from "./supabaseClient";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AiResult {
  reply?: string;
  error?: string;
  notConfigured?: boolean;
}

interface AiProxyResponse {
  reply?: string;
  error?: string;
  message?: string;
}

async function callAiProxy(body: Record<string, unknown>): Promise<AiResult> {
  const { data, error } = await supabase.functions.invoke<AiProxyResponse>("ai-proxy", { body });

  if (error) {
    return { error: "Couldn't reach the AI tutor. Try again in a moment." };
  }
  if (data?.error) {
    return {
      error: data.message ?? "AI isn't available right now.",
      notConfigured: data.error === "not_configured",
    };
  }
  return { reply: data?.reply ?? "" };
}

export function sendChatMessage(languageName: string, messages: ChatMessage[]): Promise<AiResult> {
  return callAiProxy({ mode: "chat", languageName, messages });
}

export function getWritingFeedback(languageName: string, text: string): Promise<AiResult> {
  return callAiProxy({ mode: "writing", languageName, text });
}
