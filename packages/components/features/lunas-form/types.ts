import type z from 'zod';

import type { TanStackFormTextFieldSchema, TanStackFormTitleFieldSchema } from '../tanstack-form/schema';

type LunasFormFormSection = {
  name: string;
  fields: Array<z.input<typeof TanStackFormTitleFieldSchema> | z.input<typeof TanStackFormTextFieldSchema>>;
};

type LunasFormFormSchema = {
  sections: LunasFormFormSection[];
};
export type LunasFormProps = {
  formSchema: LunasFormFormSchema;
};
