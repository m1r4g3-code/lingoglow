import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className={`glow-ring relative h-8 w-14 shrink-0 rounded-full outline-none transition-colors duration-300 ${
        isDark ? "bg-slate-700" : "bg-slate-300"
      }`}
      style={isDark ? ({ ["--glow-color" as string]: "rgba(56, 189, 248, 0.6)" }) : undefined}
    >
      <span
        className={`absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs transition-transform duration-300 ${
          isDark ? "translate-x-6 shadow-[0_0_12px_2px_rgba(56,189,248,0.8)]" : "translate-x-0 shadow"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
