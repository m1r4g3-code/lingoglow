import { Award, PartyPopper, Sparkles, Target } from "lucide-react";
import { useToast } from "../context/ToastContext";

const ICON_BY_TYPE: Record<string, typeof Sparkles> = {
  xp: Sparkles,
  levelup: PartyPopper,
  mission: Target,
  badge: Award,
};

export function RewardToast() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-30 flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = ICON_BY_TYPE[toast.type] ?? Sparkles;
        return (
          <div
            key={toast.id}
            className="glow-card flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-lg transition-all dark:border-slate-700 dark:bg-slate-800"
            style={{ ["--glow-color" as string]: "var(--brand-glow)" }}
          >
            <Icon className="brand-icon h-4 w-4" strokeWidth={1.75} />
            {toast.message}
          </div>
        );
      })}
    </div>
  );
}
