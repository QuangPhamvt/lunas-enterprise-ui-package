import z from 'zod';

import { OrientationField, RoundingField, TextFieldDataType } from './constants';

const nameSchema = z.object({
  name: z.string().trim().nonempty(),
  camelCaseName: z.string().trim().nonempty(),
});

const uiSchema = z.object({
  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
});

const uiHelpersSchema = z.object({
  orientation: z.enum(OrientationField).default(OrientationField.RESPONSIVE),
  tooltip: z.string().optional(),
  helperText: z.string().optional(),
  showErrorMessage: z.boolean().optional(),
});

export const TanStackFormTextFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('text-field'),

  // Identifiers in form data
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,

  // UI Helpers
  counter: z.boolean().optional(),
  showClearButton: z.boolean().optional(),
  ...uiHelpersSchema.shape,

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
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,

  // UI Helpers
  counter: z.boolean().optional(),
  ...uiHelpersSchema.shape,

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
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,

  defaultValue: z.number().optional(),

  // UI Helpers
  rounding: z.enum(RoundingField).default(RoundingField.NONE),
  decimalPlaces: z.number().int().min(0).optional(),
  percision: z.number().int().min(0).optional(),
  unit: z.string().optional(),
  ...uiHelpersSchema.shape,

  rules: z
    .object({
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

export const TanStackFormEmailFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('email-field'),

  // Identifiers in form data
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,

  // UI Helpers
  ...uiHelpersSchema.shape,

  rules: z.object({
    maxLength: z.number().optional(),
    minLength: z.number().optional(),
  }),
});

export const TanStackFormPasswordFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('password-field'),

  // Identifiers in form data
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,

  // UI Helpers
  showClearButton: z.boolean().optional(),
  ...uiHelpersSchema.shape,
});
