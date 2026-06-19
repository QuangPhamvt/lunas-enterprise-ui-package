import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./packages/test-setup.ts'],
    include: ['packages/**/*.test.{ts,tsx}'],
    exclude: ['packages/stories/**', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['packages/components/**/*.{ts,tsx}'],
      exclude: [
        'packages/components/**/*.stories.{ts,tsx}',
        'packages/stories/**',
        'packages/components/**/*.variants.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': new URL('./packages', import.meta.url).pathname,
    },
  },
})
