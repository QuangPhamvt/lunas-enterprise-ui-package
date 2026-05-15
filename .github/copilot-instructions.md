# Copilot instructions for `lunas-ui`

## Build, lint, and test commands

Use Node.js `>=22` (from `package.json` engines).

```bash
# install deps
npm install

# build distributable library into dist/ (ESM + CJS, d.ts, sourcemaps, minified)
npm run build

# type-check
npm run typecheck

# lint (Biome check)
npm run lint

# auto-fix lint issues in packages/
npm run lint:fix

# format check / format write
npm run format
npm run format:fix

# Storybook dev + static build
npm run storybook
npm run build-storybook
```

Test status in this repo:

- There is currently **no `test` script** in `package.json` and no `*.test`/`*.spec` files in the source tree.
- `vitest` is present as a dev dependency; if tests are added, run:

```bash
# full suite (once tests exist)
npx vitest run

# single test file (once tests exist)
npx vitest run path/to/file.test.tsx
```

## High-level architecture

- This repository is a **published React component library**. Source lives under `packages/`; publish artifacts live in `dist/`; CSS entry assets live in `styles/`.
- **Public package API is manually curated in two places**:
  1. `tsdown.config.ts` explicit `entry` list (what gets built)
  2. `package.json` `exports` map (what consumers can import)
  Keep these in sync when adding/removing public components.
- Storybook is the main development/documentation surface:
  - Config in `.storybook/*`
  - Stories in `packages/stories/**` and `packages/**/*.stories.*`
- Styling pipeline:
  - `packages/index.css` imports Tailwind v4 + shared styles (`styles/base.css`, `styles/theme.css`, `styles/loader.css`, `styles/typography.css`)
  - Components use design tokens from CSS variables (e.g. `--color-*`, semantic classes like `bg-primary`, `text-text-positive`).
- Component layers:
  - `packages/components/ui/*`: foundational primitives/wrappers (Radix-heavy)
  - `packages/components/features/*`: higher-level composed features (tables, tanstack-form, form builders, etc.)
  - `packages/components/layouts|dialogs|cards|data-display|typography|pages|systems`: domain-specific building blocks
- TypeScript alias `@/*` points to `packages/*` (see `tsconfig.json` and `vite.config.ts`), and stories/components rely on this alias heavily.

## Key conventions in this codebase

- Most React modules in `packages/components` are **client components** (`'use client'`).
- Prefer **named exports** over default exports for components and helpers.
- Variant-heavy UI components split styles into `*.variants.ts` using `class-variance-authority` and export `VariantProps` types from those files.
- `cn` utility is imported from **`@customafk/react-toolkit/utils`** (not a local utility in this repo).
- Many components expose stable hooks for styling/automation via `data-slot` attributes; keep the pattern consistent in new primitives.
- Biome is the source of truth for lint/format/import organization (`biome.json`):
  - single quotes, 2-space indentation
  - custom import grouping via `assist.actions.source.organizeImports`
  - lint scope is primarily `packages/**/*`
- Existing code uses targeted Biome ignore comments for intentional patterns (e.g., memo dependencies, story exports). Preserve this style: keep ignores narrow and explicit.
- For publish-safe changes, verify that new public modules are reflected in:
  1. `tsdown.config.ts` entries
  2. `package.json` `exports`
  3. relevant Storybook stories under `packages/stories/`

## MCP integration notes

- Storybook MCP is enabled via `@storybook/addon-mcp` in `.storybook/main.ts`.
- Local MCP server configuration is defined in `.copilot/mcp-config.json` (currently `http://localhost:6006/mcp`).
- If MCP behavior changes, keep Storybook addon configuration and `.copilot/mcp-config.json` aligned.
