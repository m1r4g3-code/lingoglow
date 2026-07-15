// Flip this to true once an ANTHROPIC_API_KEY secret is set and you're
// ready to take on AI usage costs. The Edge Function itself already
// degrades gracefully with no key set (zero API calls, zero cost either
// way) — this flag just keeps the feature out of the UI until then.
export const AI_FEATURES_ENABLED = false;
