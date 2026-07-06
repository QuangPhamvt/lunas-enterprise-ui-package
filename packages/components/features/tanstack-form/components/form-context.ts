'use client';

import { createFormHookContexts } from '@tanstack/react-form';

/**
 * Shared field/form contexts, split out from `tanstack-form.tsx` so that field and form
 * components can depend on them directly instead of importing back through the file that
 * lazy-loads those same components (which would reintroduce a circular import).
 */
export const { fieldContext, formContext, useFieldContext: useTanStackFieldContext, useFormContext: useTanStackFormContext } = createFormHookContexts();
