import type z from 'zod';

import type {
  TanStackFormNumberFieldSchema,
  TanStackFormTextAreaFieldSchema,
  TanStackFormTextFieldSchema,
  TanStackFormTitleFieldSchema,
} from '../tanstack-form/schema';

type LunasFormFormSection = {
  name: string;
  fields: Array<
    | z.input<typeof TanStackFormTitleFieldSchema>
    | z.input<typeof TanStackFormTextFieldSchema>
    | z.input<typeof TanStackFormTextAreaFieldSchema>
    | z.input<typeof TanStackFormNumberFieldSchema>
  >;
};

type LunasFormFormSchema = {
  sections: LunasFormFormSection[];
};
export type LunasFormProps = {
  formSchema: LunasFormFormSchema;
};
