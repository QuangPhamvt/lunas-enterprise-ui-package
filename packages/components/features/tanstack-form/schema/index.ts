import z from 'zod';

import {
  TanStackFormEmailFieldSchema,
  TanStackFormNumberFieldSchema,
  TanStackFormPasswordFieldSchema,
  TanStackFormTextAreaFieldSchema,
  TanStackFormTextFieldSchema,
} from './input-field.schema';
import {
  TanStackFormCheckboxGroupFieldSchema,
  TanStackFormDateFieldSchema,
  TanStackFormRadioGroupFieldSchema,
  TanStackFormSelectFieldSchema,
  TanStackFormSwitchFieldSchema,
} from './select-field.schema';
import { TanStackFormTitleFieldSchema } from './ui.schema';

export * from './constants';
export * from './input-field.schema';
export * from './select-field.schema';
export * from './ui.schema';

export const TanStackFormSectionSchema = z.object({
  name: z.string().trim().nonempty(),
  fields: z.array(
    z.union([
      // Typography
      TanStackFormTitleFieldSchema,

      // Input Fields
      TanStackFormTextFieldSchema,
      TanStackFormTextAreaFieldSchema,
      TanStackFormNumberFieldSchema,
      TanStackFormEmailFieldSchema,
      TanStackFormPasswordFieldSchema,

      // Selection Field
      TanStackFormSelectFieldSchema,
      TanStackFormSwitchFieldSchema,
      TanStackFormRadioGroupFieldSchema,
      TanStackFormCheckboxGroupFieldSchema,
      TanStackFormDateFieldSchema,
    ])
  ),
});

export const TanStackFormSchema = z.object({});
