import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { RewardEvent } from "../lib/gamification";

interface Toast extends RewardEvent {
  id: number;
}

interface ToastContextValue {
  toasts: Toast[];
  pushEvents: (events: RewardEvent[]) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushEvents = useCallback((events: RewardEvent[]) => {
    if (events.length === 0) return;
    const withIds = events.map((e) => ({ ...e, id: nextId++ }));
    setToasts((t) => [...t, ...withIds]);
    withIds.forEach((toast) => {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== toast.id));
      }, 3000);
    });
  }, []);

  return <ToastContext.Provider value={{ toasts, pushEvents }}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
