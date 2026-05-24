# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`@customafk/lunas-ui` is a published React + TypeScript component library for Lunas Enterprise applications. Node.js >= 22 is required.

- Source: `packages/`
- Build output: `dist/`
- Shared CSS assets: `styles/`
- Dev/docs surface: Storybook (`.storybook/`, `packages/stories/`)

## Commands

```bash
npm install
npm run build           # build with tsdown (ESM + CJS + DTS)
npm run build:dev       # watch mode
npm run typecheck       # tsc --noEmit
npm run lint            # Biome lint check
npm run lint:fix        # Biome lint + fix (scoped to packages/)
npm run format:fix      # Biome format + write
npm run storybook       # dev server at :6006
npm run build-storybook # static Storybook build
```

There is no `test` script. `vitest` is installed; if tests are added: `npx vitest run`.

## Architecture

### Component layers

Components live under `packages/components/` organized by layer:

- `ui/` — foundational Radix UI-based primitives (Button, Input, Dialog, Table, etc.)
- `features/` — composed feature modules (tables, forms, search-modal, data-grid, descriptions)
- `cards/`, `dialogs/`, `layouts/`, `data-display/`, `typography/`, `pages/`, `systems/`

### Public API sync

Every public component requires entries in **two** places that must stay in sync:

1. `tsdown.config.ts` — `entry` list (controls what gets built)
2. `package.json` — `exports` map (controls what consumers can import)

When adding a new public component, update both files plus add a Storybook story.

### Styling

- TailwindCSS v4 with CSS variables defined in `styles/theme.css`
- Class Variance Authority (`cva`) + `*.variants.ts` files for component variant definitions
- `cn` from `@customafk/react-toolkit/utils` for class name merging
- Dark mode via class-based switching (`.dark` on root element)
- Import order for consumers: `styles/base` → `styles/theme` → (optional) `styles/typography`

### Path alias

`@/*` resolves to `packages/*` in both TypeScript and Vite config.

## Coding conventions

- Named exports only — no default exports unless the file already uses one
- All client-side component files must have `'use client'` as the first line
- Preserve existing `data-slot` attribute patterns on Radix-based primitives
- Preserve `*.variants.ts` + `VariantProps` pattern for styled variants
- Biome rules: single quotes, 2-space indentation, 100-char line width, LF endings, organized imports

## Skills

Project-specific skills live in `.claude/skills/<name>/SKILL.md` and can be invoked with `/<name>`:

| Skill | Invocation | Contents |
|---|---|---|
| React Mechanics | `/react-mechanics` | State, Context, custom hooks, `useEffect` issues, ref forwarding, prop drilling inventory |
| Code Architecture | `/code-architecture` | Folder hierarchy, naming conventions, module boundaries, reusability map |
| Tech Stack | `/tech-stack` | Full peer + dev dependency table with concrete library usage examples |
| Optimization Targets | `/optimization-targets` | 8 refactor targets — sidebar duplication, memory leak, suppressed lint rules, large files, dead code |
| React Pattern | `/react-pattern` | Coding rules: file structure, context, state, effects, styling, props, refs, Radix, performance |

## MCP

- Storybook MCP addon is active at `http://localhost:6006/mcp`
- Config is in `.storybook/main.ts` (addon) and `.copilot/mcp-config.json` (client)
- Keep both files aligned when changing MCP behavior
