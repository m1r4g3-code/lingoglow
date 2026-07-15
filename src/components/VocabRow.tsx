import { useState } from "react";
import { Check, Mic, Star, Volume2, X } from "lucide-react";
import type { VocabCard } from "../types";
import { isSTTSupported, isSpeechMatch, isTTSSupported, listenOnce, speak } from "../lib/speech";
import { getCardState, toggleFavorite } from "../lib/storage";
import { useVoiceAvailable } from "../hooks/useVoiceAvailable";

interface VocabRowProps {
  card: VocabCard;
  speechLang: string;
  sttSupported: boolean;
}

type PracticeState = "idle" | "listening" | "correct" | "incorrect";

export function VocabRow({ card, speechLang, sttSupported }: VocabRowProps) {
  const [practiceState, setPracticeState] = useState<PracticeState>("idle");
  const [heard, setHeard] = useState("");
  const [isFavorite, setIsFavorite] = useState(() => getCardState(card.id)?.isFavorite ?? false);

  const voiceAvailable = useVoiceAvailable(speechLang);
  const ttsAvailable = isTTSSupported() && voiceAvailable;
  const sttAvailable = sttSupported && isSTTSupported();

  const handleListen = () => speak(card.front, speechLang);

  const handlePractice = async () => {
    setPracticeState("listening");
    try {
      const transcript = await listenOnce(speechLang);
      setHeard(transcript);
      setPracticeState(isSpeechMatch(transcript, card.front) ? "correct" : "incorrect");
    } catch {
      setPracticeState("idle");
    }
  };

  const handleToggleFavorite = () => {
    const next = toggleFavorite(card.id);
    setIsFavorite(next.isFavorite ?? false);
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-white px-5 py-3 dark:bg-slate-900">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? `Unfavorite ${card.front}` : `Favorite ${card.front}`}
            className={`glow-ring rounded-full p-1 ${
              isFavorite ? "text-amber-400" : "text-slate-300 hover:text-amber-400 dark:text-slate-600"
            }`}
          >
            <Star className="h-4 w-4" strokeWidth={1.75} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <span className="font-medium">{card.front}</span>
          {ttsAvailable && (
            <button
              type="button"
              onClick={handleListen}
              aria-label={`Listen to ${card.front}`}
              className="glow-ring rounded-full p-1 text-slate-400 hover:text-violet-500 dark:text-slate-500 dark:hover:text-violet-300"
            >
              <Volume2 className="h-4 w-4" strokeWidth={1.75} />
            </button>
          )}
          {sttAvailable && (
            <button
              type="button"
              onClick={handlePractice}
              aria-label={`Practice speaking ${card.front}`}
              className={`glow-ring rounded-full p-1 text-slate-400 hover:text-emerald-500 dark:text-slate-500 dark:hover:text-emerald-300 ${
                practiceState === "listening" ? "text-emerald-500 dark:text-emerald-300" : ""
              }`}
            >
              <Mic className="h-4 w-4" strokeWidth={1.75} />
            </button>
          )}
          {practiceState === "correct" && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-500">
              <Check className="h-3.5 w-3.5" strokeWidth={2} /> nice!
            </span>
          )}
          {practiceState === "incorrect" && (
            <span
              className="inline-flex items-center gap-0.5 text-xs font-semibold text-rose-500"
              title={`Heard: "${heard}"`}
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} /> try again
            </span>
          )}
        </div>
        {card.notes && <p className="text-xs text-slate-400 dark:text-slate-500">{card.notes}</p>}
      </div>
      <span className="shrink-0 text-slate-500 dark:text-slate-400">{card.back}</span>
    </div>
  );
}
