import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { LanguagePage } from "./pages/LanguagePage";
import { LessonPage } from "./pages/LessonPage";
import { ReviewPage } from "./pages/ReviewPage";
import { AuthPage } from "./pages/AuthPage";
import { RequireAuth } from "./components/RequireAuth";

// Everything below is visited far less often than the core lesson/review
// flow above, so it's split into its own chunks loaded on demand instead
// of bloating the initial bundle every visitor downloads.
const SkillTreePage = lazy(() => import("./pages/SkillTreePage").then((m) => ({ default: m.SkillTreePage })));
const GrammarPage = lazy(() => import("./pages/GrammarPage").then((m) => ({ default: m.GrammarPage })));
const SentenceBuilderPage = lazy(() => import("./pages/SentenceBuilderPage").then((m) => ({ default: m.SentenceBuilderPage })));
const ConjugationPage = lazy(() => import("./pages/ConjugationPage").then((m) => ({ default: m.ConjugationPage })));
const DictationPage = lazy(() => import("./pages/DictationPage").then((m) => ({ default: m.DictationPage })));
const ComprehensionPage = lazy(() => import("./pages/ComprehensionPage").then((m) => ({ default: m.ComprehensionPage })));
const DifficultWordsPage = lazy(() => import("./pages/DifficultWordsPage").then((m) => ({ default: m.DifficultWordsPage })));
const FrequencyListPage = lazy(() => import("./pages/FrequencyListPage").then((m) => ({ default: m.FrequencyListPage })));
const CategoryPage = lazy(() => import("./pages/CategoryPage").then((m) => ({ default: m.CategoryPage })));
const ProgressPage = lazy(() => import("./pages/ProgressPage").then((m) => ({ default: m.ProgressPage })));
const MissionsPage = lazy(() => import("./pages/MissionsPage").then((m) => ({ default: m.MissionsPage })));
const BadgesPage = lazy(() => import("./pages/BadgesPage").then((m) => ({ default: m.BadgesPage })));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage").then((m) => ({ default: m.LeaderboardPage })));
const AiTutorPage = lazy(() => import("./pages/AiTutorPage").then((m) => ({ default: m.AiTutorPage })));
const WritingPage = lazy(() => import("./pages/WritingPage").then((m) => ({ default: m.WritingPage })));
const FriendsPage = lazy(() => import("./pages/FriendsPage").then((m) => ({ default: m.FriendsPage })));
const StudyGroupsPage = lazy(() => import("./pages/StudyGroupsPage").then((m) => ({ default: m.StudyGroupsPage })));
const StudyGroupDetailPage = lazy(() => import("./pages/StudyGroupDetailPage").then((m) => ({ default: m.StudyGroupDetailPage })));
const AccountPage = lazy(() => import("./pages/AccountPage").then((m) => ({ default: m.AccountPage })));
const TeacherDashboardPage = lazy(() => import("./pages/TeacherDashboardPage").then((m) => ({ default: m.TeacherDashboardPage })));
const TeacherClassDetailPage = lazy(() => import("./pages/TeacherClassDetailPage").then((m) => ({ default: m.TeacherClassDetailPage })));
const ParentDashboardPage = lazy(() => import("./pages/ParentDashboardPage").then((m) => ({ default: m.ParentDashboardPage })));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage })));
const CertificatePage = lazy(() => import("./pages/CertificatePage").then((m) => ({ default: m.CertificatePage })));

function PageFallback() {
  return <div className="py-20 text-center text-sm text-slate-400 dark:text-slate-500">Loading…</div>;
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
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
            path="/language/:languageId/certificate"
            element={
              <RequireAuth>
                <CertificatePage />
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
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
          <Route
            path="/teacher"
            element={
              <RequireAuth>
                <TeacherDashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/teacher/classes/:classId"
            element={
              <RequireAuth>
                <TeacherClassDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/parent"
            element={
              <RequireAuth>
                <ParentDashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboardPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
