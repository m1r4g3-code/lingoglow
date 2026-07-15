import { useToast } from "../context/ToastContext";

const ICON_BY_TYPE: Record<string, string> = {
  xp: "✨",
  levelup: "🎉",
  mission: "🎯",
  badge: "🏅",
};

export function RewardToast() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-30 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glow-card rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-lg transition-all dark:border-slate-700 dark:bg-slate-800"
          style={{ ["--glow-color" as string]: "rgba(56, 189, 248, 0.5)" }}
        >
          {ICON_BY_TYPE[toast.type] ?? "✨"} {toast.message}
        </div>
      ))}
    </div>
  );
}
