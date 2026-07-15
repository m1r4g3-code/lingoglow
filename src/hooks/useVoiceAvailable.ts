import { useEffect, useState } from "react";
import { hasVoiceFor } from "../lib/speech";

// Optimistic true while checking, so the button doesn't flash away for the
// common case (a voice is available) and only hides once we know for sure.
export function useVoiceAvailable(speechLang: string): boolean {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;
    hasVoiceFor(speechLang).then((result) => {
      if (!cancelled) setAvailable(result);
    });
    return () => {
      cancelled = true;
    };
  }, [speechLang]);

  return available;
}
