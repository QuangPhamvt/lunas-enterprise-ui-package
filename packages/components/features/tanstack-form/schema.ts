import z from 'zod/v4';

export const TextFieldDataType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  URL: 'url',
} as const;

export const OrientationField = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  RESPONSIVE: 'responsive',
} as const;

export const RoundingField = {
  UP: 'up',
  DOWN: 'down',
  NEAREST: 'nearest',
  NONE: 'none',
} as const;

export const TanStackFormTitleFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('title-field'),

  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  helperText: z.string().optional(),
});

export const TanStackFormTextFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('text-field'),

  // Identifiers in form data
  name: z.string().trim().nonempty(),
  camelCaseName: z.string().trim().nonempty(),

  // UI
  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  placeholder: z.string().optional(),

  // UI Helpers
  counter: z
    .object({
      enabled: z.boolean().default(false),
      max: z.number().int().optional(),
    })
    .optional(),
  tooltip: z.string().optional(),
  helperText: z.string().optional(),
  orientation: z.enum(OrientationField).default(OrientationField.RESPONSIVE),
  showClearButton: z.boolean().optional(),
  showErrorMessage: z.boolean().optional(),

  // Data
  dataType: z.enum(TextFieldDataType).default(TextFieldDataType.TEXT),

  rules: z
    .object({
      required: z.boolean().optional(),
      maxLength: z.number().optional(),
      minLength: z.number().optional(),
      exactLength: z.number().optional(),
    })
    .optional(),

  visibilityConditions: z
    .object({
      when: z.string(),
      is: z.any(),
      show: z.boolean().default(true),
    })
    .optional(),
});

export const TanStackFormTextAreaFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('textarea-field'),

  // Identifiers in form data
  name: z.string().trim().nonempty(),
  camelCaseName: z.string().trim().nonempty(),

  // UI
  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  placeholder: z.string().optional(),

  // UI Helpers
  counter: z
    .object({
      enabled: z.boolean().default(false),
      max: z.number().int().optional(),
    })
    .optional(),
  tooltip: z.string().optional(),
  helperText: z.string().optional(),
  orientation: z.enum(OrientationField).default(OrientationField.RESPONSIVE),
  showErrorMessage: z.boolean().optional(),

  rules: z
    .object({
      required: z.boolean().optional(),
      maxLength: z.number().optional(),
      minLength: z.number().optional(),
      exactLength: z.number().optional(),
    })
    .optional(),

  visibilityConditions: z
    .object({
      when: z.string(),
      is: z.any(),
      show: z.boolean().default(true),
    })
    .optional(),
});

export const TanStackFormNumberFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('number-field'),

  // Identifiers in form data
  name: z.string().trim().nonempty(),
  camelCaseName: z.string().trim().nonempty(),

  // UI
  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  defaultValue: z.number().optional(),

  // UI Helpers
  tooltip: z.string().optional(),
  helperText: z.string().optional(),
  orientation: z.enum(OrientationField).default(OrientationField.RESPONSIVE),
  showErrorMessage: z.boolean().optional(),
  rounding: z.enum(RoundingField).default(RoundingField.NONE),
  decimalPlaces: z.number().int().min(0).optional(),
  percision: z.number().int().min(0).optional(),
  unit: z.string().optional(),

  rules: z.object({
    required: z.boolean().optional(),
    min: z
      .object({
        value: z.number(),
        inclusive: z.boolean().default(true),
      })
      .optional(),
    max: z
      .object({
        value: z.number(),
        inclusive: z.boolean().default(true),
      })
      .optional(),
    integerOnly: z.boolean().optional(),
    positiveOnly: z.boolean().optional(),
    exactDigits: z.number().optional(),
  }),

  visibilityConditions: z
    .object({
      when: z.string(),
      is: z.any(),
      show: z.boolean().default(true),
    })
    .optional(),
});

export const TanStackFormSelectFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('select-field'),

  // Identifiers in form data
  name: z.string().trim().nonempty(),
  camelCaseName: z.string().trim().nonempty(),

  // UI
  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),

  // Options
  options: z.array(
    z.object({
      label: z.string().trim().nonempty(),
      value: z.string().trim().nonempty(),
    })
  ),

  // UI Helpers
  tooltip: z.string().optional(),
  helperText: z.string().optional(),
  orientation: z.enum(OrientationField).default(OrientationField.RESPONSIVE),
  clearable: z.boolean().default(false),

  //Rules
  rules: z
    .object({
      required: z.boolean().optional(),
    })
    .optional(),

  visibilityConditions: z
    .object({
      when: z.string(),
      is: z.any(),
      show: z.boolean().default(true),
    })
    .optional(),
});

export const TanStackFormDateFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('date-field'),

  // Identifiers in form data
  name: z.string().trim().nonempty(),
  camelCaseName: z.string().trim().nonempty(),

  // UI
  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(), // ISO date string

  // UI Helpers
  tooltip: z.string().optional(),
  helperText: z.string().optional(),
  orientation: z.enum(OrientationField).default(OrientationField.RESPONSIVE),
  showErrorMessage: z.boolean().optional(),

  // Rules
  rules: z
    .object({
      required: z.boolean().optional(),
      minDate: z.date().optional(), // ISO date string
      maxDate: z.date().optional(), // ISO date string
    })
    .optional(),
});

export const TanStackFormSectionSchema = z.object({
  name: z.string().trim().nonempty(),
  fields: z.array(
    z.union([
      TanStackFormTitleFieldSchema,
      TanStackFormTextFieldSchema,
      TanStackFormTextAreaFieldSchema,
      TanStackFormNumberFieldSchema,
      TanStackFormSelectFieldSchema,
      TanStackFormDateFieldSchema,
    ])
  ),
});

export const TanStackFormSchema = z.object({});
