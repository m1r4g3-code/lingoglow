import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { LanguagePage } from "./pages/LanguagePage";
import { LessonPage } from "./pages/LessonPage";
import { ReviewPage } from "./pages/ReviewPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/language/:languageId" element={<LanguagePage />} />
        <Route path="/language/:languageId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/language/:languageId/review" element={<ReviewPage />} />
      </Route>
    </Routes>
  );
}
