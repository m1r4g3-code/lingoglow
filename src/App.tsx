import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { LanguagePage } from "./pages/LanguagePage";
import { LessonPage } from "./pages/LessonPage";
import { ReviewPage } from "./pages/ReviewPage";
import { AuthPage } from "./pages/AuthPage";
import { SkillTreePage } from "./pages/SkillTreePage";
import { GrammarPage } from "./pages/GrammarPage";
import { SentenceBuilderPage } from "./pages/SentenceBuilderPage";
import { ConjugationPage } from "./pages/ConjugationPage";
import { DictationPage } from "./pages/DictationPage";
import { ComprehensionPage } from "./pages/ComprehensionPage";
import { DifficultWordsPage } from "./pages/DifficultWordsPage";
import { FrequencyListPage } from "./pages/FrequencyListPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProgressPage } from "./pages/ProgressPage";
import { MissionsPage } from "./pages/MissionsPage";
import { BadgesPage } from "./pages/BadgesPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { AiTutorPage } from "./pages/AiTutorPage";
import { WritingPage } from "./pages/WritingPage";
import { FriendsPage } from "./pages/FriendsPage";
import { StudyGroupsPage } from "./pages/StudyGroupsPage";
import { StudyGroupDetailPage } from "./pages/StudyGroupDetailPage";
import { RequireAuth } from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/language/:languageId" element={<LanguagePage />} />
        <Route path="/language/:languageId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/language/:languageId/review" element={<ReviewPage />} />
        <Route path="/language/:languageId/skill-tree" element={<SkillTreePage />} />
        <Route path="/language/:languageId/grammar" element={<GrammarPage />} />
        <Route path="/language/:languageId/sentences" element={<SentenceBuilderPage />} />
        <Route path="/language/:languageId/conjugation" element={<ConjugationPage />} />
        <Route path="/language/:languageId/dictation" element={<DictationPage />} />
        <Route path="/language/:languageId/comprehension" element={<ComprehensionPage />} />
        <Route path="/language/:languageId/difficult-words" element={<DifficultWordsPage />} />
        <Route path="/language/:languageId/frequency" element={<FrequencyListPage />} />
        <Route path="/language/:languageId/category/:category" element={<CategoryPage />} />
        <Route
          path="/language/:languageId/ai-tutor"
          element={
            <RequireAuth>
              <AiTutorPage />
            </RequireAuth>
          }
        />
        <Route
          path="/language/:languageId/writing"
          element={
            <RequireAuth>
              <WritingPage />
            </RequireAuth>
          }
        />
        <Route
          path="/progress"
          element={
            <RequireAuth>
              <ProgressPage />
            </RequireAuth>
          }
        />
        <Route
          path="/missions"
          element={
            <RequireAuth>
              <MissionsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/badges"
          element={
            <RequireAuth>
              <BadgesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RequireAuth>
              <LeaderboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/friends"
          element={
            <RequireAuth>
              <FriendsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/groups"
          element={
            <RequireAuth>
              <StudyGroupsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/groups/:groupId"
          element={
            <RequireAuth>
              <StudyGroupDetailPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}
