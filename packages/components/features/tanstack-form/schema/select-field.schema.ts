import z from 'zod';

import { OrientationField } from './constants';

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
});

export const TanStackFormSelectFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('select-field'),

  // Identifiers in form data
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,
  defaultValue: z.string().optional(),

  // Options
  options: z.array(
    z.object({
      label: z.string().trim().nonempty(),
      value: z.string().trim().nonempty(),
    })
  ),

  // UI Helpers
  ...uiHelpersSchema.shape,
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
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,
  defaultValue: z.string().optional(), // ISO date string

  // UI Helpers
  ...uiHelpersSchema.shape,
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

export const TanStackFormSwitchFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('switch-field'),

  // Identifiers in form data
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,
  defaultValue: z.boolean().optional(),

  // UI Helpers
  helperText: z.string().optional(),
});

export const TanStackFormRadioGroupFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('radio-group-field'),

  // Identifiers in form data
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,
  defaultValue: z.string().optional(),

  // Options
  options: z.array(
    z.object({
      label: z.string().trim().nonempty(),
      value: z.string().trim().nonempty(),
      description: z.string().optional(),
    })
  ),

  // UI Helpers
  ...uiHelpersSchema.shape,
});

export const TanStackFormCheckboxGroupFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('checkbox-group-field'),

  // Identifiers in form data
  ...nameSchema.shape,

  // UI
  ...uiSchema.shape,
  defaultValue: z.array(z.string()).optional(),

  // Options
  options: z.array(
    z.object({
      label: z.string().trim().nonempty(),
      value: z.string().trim().nonempty(),
    })
  ),

  // UI Helpers
  ...uiHelpersSchema.shape,
});
