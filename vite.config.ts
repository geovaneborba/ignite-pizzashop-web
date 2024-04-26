import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import type { UserConfig } from "vite"
import type { InlineConfig } from "vitest"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup.ts"],
  },
} as UserConfig & {
  test: InlineConfig
})
