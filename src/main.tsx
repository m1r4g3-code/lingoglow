import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" makes every Framer Motion animation in the
        app a no-op for visitors with prefers-reduced-motion set, without
        each component needing its own check. LazyMotion + domAnimation
        (paired with the `m` component, not `motion`, everywhere in the
        app) trims the animation engine down to the subset actually used
        (no drag/layout animations) — imported statically/synchronously
        on purpose: an async loader here left content stuck at its
        `initial` (invisible) state whenever the chunk hadn't resolved
        yet, which is a much worse failure mode than a larger bundle.
        `strict` throws if any component slips and imports `motion`
        instead of `m`. */}
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
