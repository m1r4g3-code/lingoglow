import { useState } from "react";
import type { VocabCard } from "../types";
import { isSTTSupported, isSpeechMatch, isTTSSupported, listenOnce, speak } from "../lib/speech";

interface VocabRowProps {
  card: VocabCard;
  speechLang: string;
  sttSupported: boolean;
}

type PracticeState = "idle" | "listening" | "correct" | "incorrect";

export function VocabRow({ card, speechLang, sttSupported }: VocabRowProps) {
  const [practiceState, setPracticeState] = useState<PracticeState>("idle");
  const [heard, setHeard] = useState("");

  const ttsAvailable = isTTSSupported();
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

  return (
    <div className="flex items-center justify-between gap-3 bg-white px-5 py-3 dark:bg-slate-900">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium">{card.front}</span>
          {ttsAvailable && (
            <button
              type="button"
              onClick={handleListen}
              aria-label={`Listen to ${card.front}`}
              className="glow-ring rounded-full p-1 text-slate-400 hover:text-sky-500 dark:text-slate-500 dark:hover:text-sky-300"
            >
              🔊
            </button>
          )}
          {sttAvailable && (
            <button
              type="button"
              onClick={handlePractice}
              aria-label={`Practice speaking ${card.front}`}
              className="glow-ring rounded-full p-1 text-slate-400 hover:text-emerald-500 dark:text-slate-500 dark:hover:text-emerald-300"
            >
              {practiceState === "listening" ? "🎙️" : "🎤"}
            </button>
          )}
          {practiceState === "correct" && <span className="text-xs font-semibold text-emerald-500">✓ nice!</span>}
          {practiceState === "incorrect" && (
            <span className="text-xs font-semibold text-rose-500" title={`Heard: "${heard}"`}>
              ✗ try again
            </span>
          )}
        </div>
        {card.notes && <p className="text-xs text-slate-400 dark:text-slate-500">{card.notes}</p>}
      </div>
      <span className="shrink-0 text-slate-500 dark:text-slate-400">{card.back}</span>
    </div>
  );
}
