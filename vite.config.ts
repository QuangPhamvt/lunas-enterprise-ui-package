// https://vite.dev/config/
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset({ target: "19" })] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": new URL("./packages", import.meta.url).pathname,
    },
  },
});
