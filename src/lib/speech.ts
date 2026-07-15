export function isTTSSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

// Chrome/Edge populate the voice list asynchronously; getVoices() can return
// an empty array on the first call until "voiceschanged" fires.
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  const existing = window.speechSynthesis.getVoices();
  if (existing.length > 0) {
    cachedVoices = existing;
    return Promise.resolve(existing);
  }
  return new Promise((resolve) => {
    const finish = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
    window.speechSynthesis.addEventListener("voiceschanged", finish, { once: true });
    // Some engines never fire voiceschanged if there's truly nothing to load.
    setTimeout(finish, 500);
  });
}

// Without an explicit voice, browsers often fall back to the default
// (usually English) voice and read foreign text with English phonetics —
// e.g. Spanish spoken with an English accent. Selecting a voice whose lang
// actually matches fixes that; if none is installed for the language, we
// still set utterance.lang so the browser has its best shot.
function pickVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  const target = lang.toLowerCase();
  const prefix = target.split("-")[0];
  const exact = voices.find((v) => v.lang.toLowerCase() === target);
  if (exact) return exact;
  const sameLanguage = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  if (sameLanguage.length === 0) return undefined;
  return sameLanguage.find((v) => !v.localService) ?? sameLanguage[0];
}

export async function speak(text: string, lang: string) {
  if (!isTTSSupported()) return;
  window.speechSynthesis.cancel();
  const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
  const voice = pickVoice(voices, lang);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voice?.lang ?? lang;
  if (voice) utterance.voice = voice;
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

type SpeechRecognitionCtor = new () => SpeechRecognition;

function getRecognitionCtor(): SpeechRecognitionCtor | undefined {
  if (typeof window === "undefined") return undefined;
  return (window.SpeechRecognition ?? window.webkitSpeechRecognition) as SpeechRecognitionCtor | undefined;
}

export function isSTTSupported(): boolean {
  return getRecognitionCtor() !== undefined;
}

export function listenOnce(lang: string): Promise<string> {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return Promise.reject(new Error("Speech recognition not supported"));

  return new Promise((resolve, reject) => {
    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.maxAlternatives = 3;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      resolve(transcript);
    };
    recognition.onerror = (event) => {
      reject(new Error(event.error));
    };
    recognition.onend = () => {
      // if onresult never fired, resolve empty rather than hang
      resolve("");
    };

    recognition.start();
  });
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9\s]/g, "") // strip punctuation
    .trim();
}

export function isSpeechMatch(spoken: string, expected: string): boolean {
  const normSpoken = normalize(spoken);
  // expected may contain alternates like "primo / prima" — accept any one
  const alternates = expected.split("/").map((alt) => normalize(alt));
  return alternates.some((alt) => alt.length > 0 && (normSpoken.includes(alt) || alt.includes(normSpoken)));
}

/** Stricter than isSpeechMatch: for typed answers (dictation), require an
 * exact match after normalization rather than substring tolerance. */
export function isTextMatch(input: string, expected: string): boolean {
  const normInput = normalize(input);
  const alternates = expected.split("/").map((alt) => normalize(alt));
  return alternates.some((alt) => alt.length > 0 && alt === normInput);
}
