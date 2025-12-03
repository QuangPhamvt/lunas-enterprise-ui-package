import type z from 'zod';

import type { TanStackFormSectionSchema } from '../tanstack-form/schema';

export type LunasFormFormSection = z.input<typeof TanStackFormSectionSchema>;

export type LunasFormFormSchema = {
  sections: LunasFormFormSection[];
};

export type LunasFormProps = {
  initialValues?: Record<string, unknown>;
  changeDebounce?: LunasFormChangeDebounce;
  formSchema: LunasFormFormSchema;

  // handlers
  onCreate?: (values: Record<string, unknown>) => Promise<void> | void;
  onUpdate?: (values: Record<string, unknown>) => Promise<void> | void;
  onDebounceUpdate?: (values: Record<string, unknown>) => Promise<void> | void;
};

export type LunasFormFormMeta = {
  submitAction: null | 'update' | 'create' | 'debounce_update';
};

export type LunasFormChangeDebounce = 500 | 1000 | 2000;
