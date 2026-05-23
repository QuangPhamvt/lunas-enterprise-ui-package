# AGENTS guide for `lunas-ui`

This file defines how AI coding agents should work in this repository.

## Project overview

- Package: `@customafk/lunas-ui`
- Type: published React + TypeScript component library
- Source: `packages/`
- Build output: `dist/`
- Shared CSS assets: `styles/`
- Main docs/dev surface: Storybook (`.storybook/*`, `packages/stories/**`)

## Setup and common commands

Use Node.js `>=22`.

```bash
npm install
npm run build
npm run typecheck
npm run lint
npm run format
npm run storybook
npm run build-storybook
```

Notes:
- There is currently no `test` script.
- `vitest` exists; if tests are added, run `npx vitest run`.

## Architecture and API surface

- Components are organized by layer under `packages/components/*`:
  - `ui/*` (foundational primitives)
  - `features/*` (composed feature modules)
  - `cards`, `dialogs`, `layouts`, `data-display`, `typography`, `pages`, `systems`
- Keep public API in sync in both places:
  1. `tsdown.config.ts` `entry` list
  2. `package.json` `exports` map

## Coding conventions

- Prefer named exports (avoid default exports unless existing file already does).
- Most component modules are client-side (`'use client'`).
- Reuse existing patterns and utilities (especially `cn` from `@customafk/react-toolkit/utils`).
- Follow Biome formatting/lint rules (single quotes, organized imports, 2-space indentation).
- Preserve existing `data-slot` patterns and variant patterns (`*.variants.ts` + `VariantProps`).

## Change rules for agents

- Make focused, surgical edits; avoid unrelated refactors.
- Do not break existing exports or entry points.
- If adding a public component, update:
  1. source file exports
  2. `tsdown.config.ts`
  3. `package.json` `exports`
  4. Storybook story (when appropriate)
- Prefer explicit error handling; do not silently swallow failures.

## MCP context

- Storybook MCP addon is configured in `.storybook/main.ts` via `@storybook/addon-mcp`.
- Copilot MCP server config is in `.copilot/mcp-config.json` (`http://localhost:6006/mcp` by default).
- Keep both configurations aligned when changing MCP behavior.
