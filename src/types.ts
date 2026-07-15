export interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string; // short badge label, e.g. "ES"
  glowColor: string; // rgba() used for dark-mode glow accent
  speechLang: string; // BCP47 code for TTS, e.g. "es-ES"
  sttSupported: boolean; // whether speech-recognition practice is offered for this language
}

export interface VocabCard {
  id: string;
  front: string;
  back: string;
  notes?: string;
}

export type CefrLevel = "A1" | "A2" | "B1";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: CefrLevel;
  vocab: VocabCard[];
}

export interface SrsState {
  interval: number; // days until next review
  ease: number; // ease factor, starts at 2.5
  reps: number;
  dueDate: string; // ISO date string
}

export type SrsGrade = "again" | "hard" | "good" | "easy";

export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface Profile {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  hasClaimedLocal: boolean;
}
