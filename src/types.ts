export interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string; // short badge label, e.g. "ES"
  flag: string; // flag emoji for quick visual scanning, e.g. "🇪🇸"
  glowColor: string; // rgba() used for dark-mode glow accent
  speechLang: string; // BCP47 code for TTS, e.g. "es-ES"
  sttSupported: boolean; // whether speech-recognition practice is offered for this language
}

export type VocabCategory = "idiom" | "slang" | "business" | "travel" | "medical" | "general";

export interface VocabCard {
  id: string;
  front: string;
  back: string;
  notes?: string;
  partOfSpeech?: string;
  frequencyRank?: number;
  category?: VocabCategory;
  exampleSentence?: string;
}

export type CefrLevel = "A1" | "A2" | "B1";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: CefrLevel;
  vocab: VocabCard[];
  skillId?: string;
  grammarNotes?: string;
}

export interface SrsState {
  interval: number; // days until next review
  ease: number; // ease factor, starts at 2.5
  reps: number;
  dueDate: string; // ISO date string
  isFavorite?: boolean;
}

export type SrsGrade = "again" | "hard" | "good" | "easy";

export type UserRole = "student" | "teacher" | "parent" | "admin";
export type UserTier = "free" | "premium";

export interface Profile {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  hasClaimedLocal: boolean;
  tier: UserTier;
}

// ───────────────────────── Phase 1: pedagogy features ─────────────────────────

export interface SkillNode {
  id: string;
  languageId: string;
  lessonId: string;
  level: CefrLevel;
  prerequisiteIds: string[];
}

export interface GrammarSection {
  heading: string;
  body: string;
  examples: string[];
}

export interface GrammarSheet {
  id: string;
  languageId: string;
  level: CefrLevel;
  title: string;
  sections: GrammarSection[];
}

export interface SentenceExercise {
  id: string;
  languageId: string;
  level: CefrLevel;
  prompt: string; // English prompt to translate/build
  tokens: string[]; // shuffled word bank
  correctOrder: string[]; // tokens in correct order
}

export interface ConjugationForm {
  pronoun: string;
  form: string;
}

export interface ConjugationEntry {
  infinitive: string;
  translation: string;
  tense: string;
  forms: ConjugationForm[];
}

export interface ComprehensionQuestion {
  prompt: string;
  choices: string[];
  correctIndex: number;
}

export interface ComprehensionPassage {
  id: string;
  languageId: string;
  level: CefrLevel;
  title: string;
  text: string;
  questions: ComprehensionQuestion[];
}

// ───────────────────────── Phase 2: gamification ─────────────────────────

export interface UserProgress {
  xp: number;
  coins: number;
  level: number;
  streakCurrent: number;
  streakLongest: number;
  lastStudyDate: string | null; // "YYYY-MM-DD"
  totalReviews: number;
}

export type MissionType = "daily" | "weekly";
export type MissionTargetType = "reviews" | "xp";

export interface Mission {
  code: string;
  title: string;
  description: string;
  type: MissionType;
  targetType: MissionTargetType;
  targetCount: number;
  xpReward: number;
  coinReward: number;
}

export interface MissionState {
  progress: number;
  periodKey: string;
  completedAt: string | null;
}

export type BadgeCriteriaType = "totalReviews" | "streakLongest" | "xp";

export interface Badge {
  code: string;
  name: string;
  description: string;
  icon: string;
  criteriaType: BadgeCriteriaType;
  threshold: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl: string | null;
  xp: number;
  level: number;
}

// ───────────────────────── Phase 4: social ─────────────────────────

export interface PublicProfile {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
}

export type FriendshipStatus = "pending" | "accepted" | "blocked";

export interface FriendEntry {
  friendshipId: string;
  profile: PublicProfile;
  status: FriendshipStatus;
  direction: "incoming" | "outgoing";
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  isPublic: boolean;
  createdAt: string;
  memberCount?: number;
}

export interface GroupPost {
  id: string;
  groupId: string;
  authorId: string;
  authorUsername: string;
  body: string;
  createdAt: string;
}

// ───────────────────────── Phase 5: teacher/parent/admin ─────────────────────────

export interface TeacherClass {
  id: string;
  name: string;
  teacherId: string;
  languageId: string;
  joinCode: string;
  createdAt: string;
  studentCount?: number;
}

export interface RosterStudent {
  profile: PublicProfile;
  xp: number;
  level: number;
  streakCurrent: number;
  totalReviews: number;
}

export type ParentLinkStatus = "pending" | "accepted";

export interface ParentLinkEntry {
  linkId: string;
  parentId: string;
  studentId: string;
  status: ParentLinkStatus;
  otherProfile: PublicProfile;
}

