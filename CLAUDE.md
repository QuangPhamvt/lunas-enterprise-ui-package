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
npm test                # unit tests (vitest + jsdom)
npm run test:storybook  # component tests in real browser (Playwright/Chromium)
```

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

## Testing

**All tests live in Storybook stories as `play` functions — never in separate `*.test.tsx` files.**

- Add a `play` function to each story that covers a meaningful interaction or state
- Import test utilities from `storybook/test` (not `@storybook/test`): `expect`, `userEvent`, `waitFor`, `within`
- Query inputs by `getByPlaceholderText` or `getByDisplayValue` — avoid `getByLabelText` (label DOM wraps children in extra spans that break exact-text matching)
- Error containers (`role="alert"`) stay in the DOM after errors clear; assert `.not.toHaveTextContent(msg)` rather than `.not.toBeInTheDocument()`
- Run before committing: `npm run test:storybook`, or invoke `/storybook-test`

## Coding conventions

- Named exports only — no default exports unless the file already uses one
- All client-side component files must have `'use client'` as the first line
- Preserve existing `data-slot` attribute patterns on Radix-based primitives
- Preserve `*.variants.ts` + `VariantProps` pattern for styled variants
- Biome rules: single quotes, 2-space indentation, 100-char line width, LF endings, organized imports

## Skills

All skills live at the workspace root `.claude/skills/<name>/SKILL.md` (no project-scoped skills
here) and can be invoked with `/<name>`:

| Skill | Invocation | Contents |
|---|---|---|
| Contribution Workflow | `/contribution-workflow` | Task-first flow shared with `lunas-cms-v2`/`lunas-enterprise-api`: create/link a GitHub issue before implementing, branch naming, Conventional Commits, PR template. Load before starting any feature/fix/chore |
| React | `/react` | React core API reference: every Hook, built-in component, and top-level API, sourced from react.dev |
| TanStack Form | `/tanstack-form` | Upstream `@tanstack/react-form` v1 API reference: every guide, hook, component, and core class (FormApi/FieldApi), sourced from tanstack.com/form — not this project's own form-component conventions |
| Radix UI | `/radix-ui` | Reference for the 25 Radix primitives this project actually wraps (Dialog, Select, Popover, Tabs, etc.): parts, props, `--radix-*` CSS custom properties, accessibility behavior |
| Recharts | `/recharts` | Reference for the recharts chart types and sub-components this project actually uses (11 chart containers + 22 composable pieces including the series marks — Line, Bar, Pie, etc.) |
| Tiptap | `/tiptap` | Reference for the Tiptap rich text editor's React integration and the 12 extensions this project actually uses (not collaboration/comments/AI Toolkit or the ~40 unused bundled extensions) |
| TanStack Table | `/tanstack-table` | Reference for `@tanstack/react-table` v8 scoped to this project's usage (useReactTable, flexRender, core/expanded/grouped row models — not sorting/filtering/pagination) |
| React Day Picker | `/react-day-picker` | Reference for the `DayPicker` component and its `CustomComponents` override shape, sourced from the installed v9 package's own types |
| Solid Principles | `/solid-principles` | SOLID design principles translated into React hooks/components |
| UI New Component | `/ui-new-component` | Scaffold a new component: file, `tsdown` export, `package.json` exports entry, Storybook story |
| Storybook Test | `/storybook-test` | Start Storybook or run the `play`-function test suite before committing |

## MCP

- Storybook MCP addon is active at `http://localhost:6006/mcp`
- Config is in `.storybook/main.ts` (addon) and `.copilot/mcp-config.json` (client)
- Keep both files aligned when changing MCP behavior
