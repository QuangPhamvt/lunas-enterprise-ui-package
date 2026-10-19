'use client';

import { createFormHookContexts } from '@tanstack/react-form';

/**
 * Shared field/form contexts, split out from `tanstack-form.tsx` so that field and form
 * components can depend on them directly instead of importing back through the file that
 * lazy-loads those same components (which would reintroduce a circular import).
 */
const contexts = createFormHookContexts();

/** Field context consumed by `createFormHook` — internal wiring. */
export const fieldContext = contexts.fieldContext;
/** Form context consumed by `createFormHook` — internal wiring. */
export const formContext = contexts.formContext;

/**
 * Returns the TanStack `FieldApi` of the surrounding `form.AppField` — use it to build a custom
 * field component that behaves like the built-in ones (`field.state.value`, `field.handleChange`,
 * `field.state.meta.errors`, …).
 *
 * @example
 * ```tsx
 * function RatingField({ label }: { label: string }) {
 *   const field = useTanStackFieldContext<number | null>();
 *   return <StarRating label={label} value={field.state.value} onChange={field.handleChange} />;
 * }
 * ```
 */
export const useTanStackFieldContext = contexts.useFieldContext;

/**
 * Returns the form instance of the surrounding `form.AppForm` — use it in custom form chrome
 * (submit bars, dirty-state banners) that is rendered inside `AppForm`.
 */
export const useTanStackFormContext = contexts.useFormContext;
