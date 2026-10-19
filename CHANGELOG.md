# Changelog

## 0.3.0

A packaging, dependency, performance and documentation overhaul. Contains breaking changes — read
**Migrating from 0.2.x** before upgrading a consumer.

### Migrating from 0.2.x

1. **ESM only.** The CommonJS build is gone. Vite apps need no change; anything that `require()`s
   the package must run on Node ≥ 22 (native `require(esm)`) or switch to `import`.
2. **Optional peers must be installed explicitly.** These are now `peerDependenciesMeta.optional`,
   so npm no longer installs them for you. Add the ones for the features you use to your app's own
   `dependencies`:
   - `features/charts`, `ui/chart` → `recharts`
   - `features/text-editor`, `TextEditorField` → `@tiptap/react`, `@tiptap/starter-kit`,
     `@tiptap/extensions`, `@tiptap/extension-bubble-menu`, `@tiptap/extension-code-block-lowlight`,
     `@tiptap/extension-highlight`, `@tiptap/extension-image`, `@tiptap/extension-table`,
     `@tiptap/extension-task-item`, `@tiptap/extension-task-list`, `@tiptap/extension-text-align`,
     `@tiptap/extension-text-style`, `@tiptap/suggestion`, `lowlight`, `highlight.js`, `dompurify`
   - `ui/file-uploader` → `react-dropzone`
   - `ui/input-otp`, `pages/LoginPage`, `pages/VerifyEmailPage` → `input-otp`
   - `pages/LoginPage`, `pages/RegisterPage` → `zod`
   - `ui/carousel` → `embla-carousel-react`
   - `systems/google` → `@react-oauth/google`
3. **Tiptap peers changed.** Add `@tiptap/extensions` and `highlight.js`; drop
   `@tiptap/extension-link`, `-underline`, `-list-keymap`, `-placeholder`, `-character-count` and
   `-color` (StarterKit v3 / `@tiptap/extensions` / `extension-text-style` provide them).
4. **Removed exports** — replace or drop any imports of:
   - `ui/form` (the react-hook-form `Form*` components) — use `features/tanstack-form`.
   - `LinkDialog`, `LinkDialogProps`, `TextEditorToolbar`, `TextEditorToolbarProps` from
     `features/text-editor` and the root barrel — internal to `TextEditor`.
   - From `features/descriptions`: `DescriptionGroupContext`, `DescriptionConfigContext`,
     `DescriptionRowContext`, `DescriptionSearchContext`, `DescriptionSectionScopeContext`,
     `DESCRIPTION_CONFIG_DEFAULT`, `TDescriptionConfig`, `TDescriptionSearch`,
     `TDescriptionSectionScope` and the `description*Variants` class maps.
   - From `dialogs/detail-dialog/components/sidebar`: `SIDEBAR_COOKIE_NAME`,
     `SIDEBAR_COOKIE_MAX_AGE`, `SIDEBAR_WIDTH`, `SIDEBAR_WIDTH_ICON`, `SIDEBAR_KEYBOARD_SHORTCUT`,
     `SidebarContext`, `SidebarContextProps`.
5. **No longer peers:** `react-hook-form`, `@hookform/error-message`, `next-themes`,
   `react-country-flag`, `nanoid`, `@tanstack/react-virtual`, `tailwind-merge`,
   `@tailwindcss/vite`. Remove them from your app if nothing else uses them.

### Changed

- `Toaster` (`ui/sonner`) takes an optional `theme` prop; without it the toasts follow the `.dark`
  class on `<html>` — no `next-themes` provider needed.
- `CountryDisplay` renders inline SVG flags (no CDN request; works on Windows).
- `TextEditor` registers only the 20 code-block languages offered in its picker (~39 KB gzip less
  than lowlight's `common` set). Blocks tagged with another language render unhighlighted.
- `TextEditor` sanitizer keeps only the `style` properties the editor emits and strips
  `url()`/`expression()`; it runs on a private DOMPurify instance.
- `ChartContainer` restricts its `id` to CSS-identifier characters before using it in `<style>`.
- `Combobox`, `MultipleSelector` and the slash-command menu take `ref` as a regular prop (React 19).
- File icons use `currentColor` for their near-black strokes; each icon is its own module.
- `NotificationList` renders a semantic `<ul>`/`<li>` list.
- Accessibility: Biome a11y rules enabled and resolved (button types/labels, keyboard support for a
  clickable `Image`, alt text, no positive `tabIndex`).

### Added

- `./styles/spacing` export.
- `Statistic`, `Badge`, `Status`, `Alert`, `Input`, `Timeline*`, `Paragraph`, `TextEditor`, chart
  and description props are documented with `@default`; every public export has JSDoc
  (`npm run docs:check` enforces it).
- `DateDisplayProps`, `FeatureDevelopingProps`, `FeatureFixingProps`, `NotAuthorizedProps` from the
  root barrel; `SimpleArrayFieldProps` from `features/tanstack-form`.

### Internal

- React Compiler runs in annotation mode (only components marked `'use memo'` are compiled, so
  bundle size is unchanged); output is unminified and nothing from `node_modules` is inlined into
  `dist`.
- `package.json` `exports` is generated from `tsdown.config.ts`; `sideEffects` limited to CSS.
- Typecheck is clean; Storybook tests use a 5 s async timeout to stop lazy-chunk flakiness.
