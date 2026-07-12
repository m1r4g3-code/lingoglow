export function isTTSSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, lang: string) {
  if (!isTTSSupported()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
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

function normalize(text: string): string {
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
