import { z } from 'zod';

import { TanStackFormTextFieldSchema, TanStackFormTitleFieldSchema } from '../tanstack-form/schema';

const formBuilderBaseFieldSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().trim().nonempty(),
  camelCaseName: z.string().trim().nonempty(),
  label: z.string().trim().nonempty(),
  description: z.string().optional(),
});

export const formBuilderTextFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('text-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),

  placeholder: z.string().optional(),

  showCharacterCount: z.boolean(),
  showClearButton: z.boolean(),
  showErrorMessage: z.boolean(),

  rules: z.object({
    maxLength: z.number().nullable(),
    minLength: z.number().nullable(),
  }),
});

export const formBuilderTextAreaFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('textarea-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),

  placeholder: z.string().optional(),
  rows: z.number().optional(),

  showCharacterCount: z.boolean(),
  showErrorMessage: z.boolean(),

  rules: z.object({
    maxLength: z.number().nullable(),
    minLength: z.number().nullable(),
  }),
});
export const formBuilderNumberFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('number-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),

  placeholder: z.string().optional(),
  showErrorMessage: z.boolean(),

  rules: z.object({
    greaterThan: z.number().nullable(),
    greaterThanOrEqualTo: z.number().nullable(),

    lessThan: z.number().nullable(),
    lessThanOrEqualTo: z.number().nullable(),

    positive: z.boolean().optional(),
    negative: z.boolean().optional(),
  }),

  unitText: z.string().optional(),
});
export const formBuilderDateFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('date-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),

  placeholder: z.string().optional(),
});
export const formBuilderSwitchFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('switch-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),

  options: z.array(
    z.object({
      name: z.string().trim().nonempty(),
      camelCaseName: z.string().trim().nonempty(),
      label: z.string().trim().nonempty(),
      description: z.string().optional(),
    })
  ),
});
export const formBuilderRadioGroupFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('radio-group-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),

  options: z.array(
    z.object({
      label: z.string().trim().nonempty(),
      description: z.string().optional(),
      value: z.string().trim().nonempty(),
    })
  ),
});
export const formBuilderSelectFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('select-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),

  placeholder: z.string().optional(),

  options: z.array(
    z.object({
      label: z.string().trim().nonempty(),
      value: z.string().trim().nonempty(),
    })
  ),
});
export const formBuilderComboboxFieldSchema = z.object({
  ...formBuilderBaseFieldSchema.shape,

  type: z.literal('combobox-field'),
  orientation: z.enum(['horizontal', 'vertical', 'responsive']),
  placeholder: z.string().optional(),

  options: z.array(
    z.object({
      label: z.string().trim().nonempty(),
      value: z.string().trim().nonempty(),
    })
  ),
});

export const formBuilderArrayFieldSchema: z.ZodType<
  z.output<typeof formBuilderBaseFieldSchema> & {
    type: 'array-field';
    description?: string;
    fields: Array<
      | z.output<typeof formBuilderTextFieldSchema>
      | z.output<typeof formBuilderTextAreaFieldSchema>
      | z.output<typeof formBuilderNumberFieldSchema>
      | z.output<typeof formBuilderDateFieldSchema>
      | z.output<typeof formBuilderSwitchFieldSchema>
      | z.output<typeof formBuilderRadioGroupFieldSchema>
      | z.output<typeof formBuilderSelectFieldSchema>
      | z.output<typeof formBuilderComboboxFieldSchema>
      | z.output<typeof formBuilderArrayFieldSchema>
    >;
  }
> = z.object({
  ...formBuilderBaseFieldSchema.shape,
  type: z.literal('array-field'),
  description: z.string().optional(),
  fields: z.lazy(() =>
    z
      .union([
        formBuilderTextFieldSchema,
        formBuilderTextAreaFieldSchema,
        formBuilderNumberFieldSchema,
        formBuilderDateFieldSchema,
        formBuilderSwitchFieldSchema,
        formBuilderRadioGroupFieldSchema,
        formBuilderSelectFieldSchema,
        formBuilderComboboxFieldSchema,
        formBuilderArrayFieldSchema,
      ])
      .array()
  ),
});

export const formBuilderEmptyFieldSchema = z
  .object({
    ...formBuilderBaseFieldSchema.shape,
    type: z.literal('empty'),
  })
  .omit({ label: true, description: true });

export const formBuilderSectionSchema = z.object({
  name: z.string().trim().nonempty(),
  fields: z.array(
    z.union([
      TanStackFormTitleFieldSchema,

      // formBuilderTextFieldSchema,
      TanStackFormTextFieldSchema,
      formBuilderTextAreaFieldSchema,
      formBuilderNumberFieldSchema,
      formBuilderSelectFieldSchema,
      formBuilderDateFieldSchema,
      // formBuilderSwitchFieldSchema,
      // formBuilderRadioGroupFieldSchema,
      // formBuilderComboboxFieldSchema,
      // formBuilderArrayFieldSchema,

      formBuilderEmptyFieldSchema,
    ])
  ),
});

export const formBuilderSchema = z.object({
  sections: z.array(formBuilderSectionSchema).refine(
    value => {
      const names = value.map(section => section.name);
      const uniqueNames = new Set(names);
      return names.length === uniqueNames.size;
    },
    { message: 'Section names must be unique' }
  ),
});

export type TFormBuilderBaseFieldSchema = z.infer<typeof formBuilderBaseFieldSchema>;

export type TFormBuilderTitleFieldSchema = z.infer<typeof TanStackFormTitleFieldSchema>;
export type TFormBuilderTextFieldSchema = z.infer<typeof TanStackFormTextFieldSchema>;
export type TFormBuilderTextAreaFieldSchema = z.infer<typeof formBuilderTextAreaFieldSchema>;
export type TFormBuilderNumberFieldSchema = z.infer<typeof formBuilderNumberFieldSchema>;
export type TFormBuilderSelectFieldSchema = z.infer<typeof formBuilderSelectFieldSchema>;
export type TFormBuilderDateFieldSchema = z.infer<typeof formBuilderDateFieldSchema>;

export type TFormBuilderSwitchFieldSchema = z.infer<typeof formBuilderSwitchFieldSchema>;
export type TFormBuilderRadioGroupFieldSchema = z.infer<typeof formBuilderRadioGroupFieldSchema>;
export type TFormBuilderComboboxFieldSchema = z.infer<typeof formBuilderComboboxFieldSchema>;
export type TFormBuilderArrayFieldSchema = TFormBuilderBaseFieldSchema & {
  type: 'array-field';
  description?: string;
  fields: Array<
    | TFormBuilderTextFieldSchema
    | TFormBuilderTextAreaFieldSchema
    | TFormBuilderNumberFieldSchema
    | TFormBuilderDateFieldSchema
    | TFormBuilderSwitchFieldSchema
    | TFormBuilderRadioGroupFieldSchema
    | TFormBuilderSelectFieldSchema
    | TFormBuilderComboboxFieldSchema
    | TFormBuilderArrayFieldSchema
  >;
};
export type TFormBuilderEmptyFieldSchema = z.infer<typeof formBuilderEmptyFieldSchema>;

export type TFormBuilderSectionSchema = {
  name: string;
  fields: Array<
    | TFormBuilderTitleFieldSchema
    | TFormBuilderTextFieldSchema
    | TFormBuilderTextAreaFieldSchema
    | TFormBuilderNumberFieldSchema
    | TFormBuilderDateFieldSchema
    | TFormBuilderSwitchFieldSchema
    | TFormBuilderRadioGroupFieldSchema
    | TFormBuilderSelectFieldSchema
    | TFormBuilderComboboxFieldSchema
    // | TFormBuilderArrayFieldSchema
    | TFormBuilderEmptyFieldSchema
  >;
};

export type TFormBuilderSchema = {
  sections: TFormBuilderSectionSchema[];
};
