import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Separate from vite.config.ts so tests don't pull in vite-plugin-pwa's
// manifest/service-worker generation, which has no role in a test run.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    env: {
      VITE_SUPABASE_URL: 'https://test.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'test-anon-key',
    },
  },
})
