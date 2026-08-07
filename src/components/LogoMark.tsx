/** LingoGlow's mark: a speech bubble (conversation) containing a globe
 * (languages of the world) — recognizable on its own, without the
 * wordmark next to it. Uses the brand gradient via CSS variables so it
 * stays in sync with index.css if the palette ever changes. */
export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 9.5A6.5 6.5 0 0 1 10.5 3h11A6.5 6.5 0 0 1 28 9.5v8A6.5 6.5 0 0 1 21.5 24H13l-6.5 5v-5.7A6.5 6.5 0 0 1 4 17.5v-8Z"
        fill="url(#logomark-gradient)"
      />
      <circle cx="16" cy="13.5" r="6" stroke="white" strokeWidth="1.3" strokeOpacity="0.95" />
      <path d="M10 13.5h12" stroke="white" strokeWidth="1.3" strokeOpacity="0.95" strokeLinecap="round" />
      <path d="M16 7.5c-2.3 1.9-2.3 10.1 0 12" stroke="white" strokeWidth="1.3" strokeOpacity="0.95" strokeLinecap="round" />
      <defs>
        <linearGradient id="logomark-gradient" x1="4" y1="3" x2="28" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--brand-from)" />
          <stop offset="100%" stopColor="var(--brand-to)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
