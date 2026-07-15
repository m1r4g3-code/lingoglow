import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { RequireRole } from "../components/RequireRole";
import { getClass, getClassRoster } from "../lib/dashboards";
import type { RosterStudent, TeacherClass } from "../types";

function TeacherClassDetailInner() {
  const { classId = "" } = useParams();
  const [cls, setCls] = useState<TeacherClass | null | undefined>(undefined);
  const [roster, setRoster] = useState<RosterStudent[]>([]);

  useEffect(() => {
    getClass(classId).then(setCls);
    getClassRoster(classId).then(setRoster);
  }, [classId]);

  if (cls === null) return <Navigate to="/teacher" replace />;
  if (cls === undefined) return null;

  return (
    <div>
      <Link to="/teacher" className="text-sm text-slate-500 hover:underline dark:text-slate-400">
        ← Teacher Dashboard
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h1 className="glow-text text-2xl font-bold">{cls.name}</h1>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-mono dark:bg-slate-800">
          Code: {cls.joinCode}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Share this code with students so they can join from their Account page.
      </p>

      <h2 className="mt-8 mb-3 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        Roster ({roster.length})
      </h2>
      {roster.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No students have joined yet.</p>
      ) : (
        <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {roster.map((s) => (
            <div key={s.profile.id} className="flex items-center justify-between bg-white px-5 py-3 dark:bg-slate-900">
              <span className="font-medium">{s.profile.username}</span>
              <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>Lv {s.level}</span>
                <span>{s.xp} XP</span>
                <span>🔥 {s.streakCurrent}</span>
                <span>{s.totalReviews} reviews</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TeacherClassDetailPage() {
  return (
    <RequireRole role="teacher">
      <TeacherClassDetailInner />
    </RequireRole>
  );
}
