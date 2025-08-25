// https://vite.dev/config/
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { fileURLToPath } from "node:url";
import path from "path";
import { defineConfig } from "vite";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./packages"),
    },
  },
});
