# Skills

1. Build and modify components in `packages/components/*`.
2. Follow existing project patterns (`'use client'`, named exports, `*.variants.ts`, `data-slot` attributes).
3. Reuse `cn` from `@customafk/react-toolkit/utils`.
4. Keep styling aligned with existing design tokens and semantic classes.
5. If a component is public, update both:
   - `tsdown.config.ts` `entry`
   - `package.json` `exports`
6. Add or update Storybook stories when the component is part of the public UI surface.
7. Keep edits focused and surgical.
8. Avoid unrelated refactors.
9. Do not introduce silent error-swallowing behavior.
10. Preserve existing API compatibility unless explicitly requested.
11. Scaffold new components end-to-end: create component files, wire exports, and align Storybook usage patterns.
