import z from 'zod';

import type {
  TanStackFormDateFieldSchema,
  TanStackFormNumberFieldSchema,
  TanStackFormSelectFieldSchema,
  TanStackFormTextAreaFieldSchema,
  TanStackFormTextFieldSchema,
} from '../tanstack-form/schema';

export const textFieldOnSubmitValidation = (label: string, rules: z.input<typeof TanStackFormTextFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .string()
    .nullable()
    .refine(val => {
      if (rules.required) return val !== undefined && val !== null && !!val.trim().length;
      return true;
    }, `${label} is required.`);
};

export const textFieldOnChangeValidation = (label: string, rules: z.input<typeof TanStackFormTextFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .string()
    .nullable()
    .refine(val => {
      if (val === null) return true;
      if (rules.required) return !!val.trim().length;
      return true;
    }, `${label} is required.`)
    .refine(val => {
      if (val === null) return true;
      if (typeof rules.maxLength !== 'undefined') return val.length <= rules.maxLength;
      return true;
    }, `${label} must be at most ${rules.maxLength} characters.`)
    .refine(val => {
      if (val === null) return true;
      if (typeof rules.minLength !== 'undefined') return val.length >= rules.minLength;
      return true;
    }, `${label} must be at least ${rules.minLength} characters.`)
    .refine(val => {
      if (val === null) return true;
      if (typeof rules.exactLength !== 'undefined') return val.length === rules.exactLength;
      return true;
    }, `${label} must be exactly ${rules.exactLength} characters.`);
};

export const textareaFieldOnSubmitValidation = (label: string, rules: z.input<typeof TanStackFormTextAreaFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .string()
    .nullable()
    .refine(val => {
      if (rules.required) return val !== undefined && val !== null && !!val.trim().length;
      return true;
    }, `${label} is required.`);
};

export const textareaFieldOnChangeValidation = (label: string, rules: z.input<typeof TanStackFormTextAreaFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .string()
    .nullable()
    .refine(val => {
      if (val === null) return true;
      if (rules.required) return !!val.trim().length;
      return true;
    }, `${label} is required.`)
    .refine(val => {
      if (val === null) return true;
      if (typeof rules.maxLength !== 'undefined') return val.length <= rules.maxLength;
      return true;
    }, `${label} must be at most ${rules.maxLength} characters.`)
    .refine(val => {
      if (val === null) return true;
      if (typeof rules.minLength !== 'undefined') return val.length >= rules.minLength;
      return true;
    }, `${label} must be at least ${rules.minLength} characters.`)
    .refine(val => {
      if (val === null) return true;
      if (typeof rules.exactLength !== 'undefined') return val.length === rules.exactLength;
      return true;
    }, `${label} must be exactly ${rules.exactLength} characters.`);
};

export const numberFieldOnSubmitValidation = (label: string, rules: z.input<typeof TanStackFormNumberFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .number()
    .nullable()
    .refine(val => {
      if (rules.required) return val !== null && !Number.isNaN(val);
      return true;
    }, `${label} is required.`);
};

export const numberFieldOnChangeValidation = (label: string, rules: z.input<typeof TanStackFormNumberFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .number()
    .nullable()
    .refine(
      val => {
        if (val === null) return true;
        if (typeof rules.min !== 'undefined') {
          if (rules.min.inclusive) {
            return val >= rules.min.value;
          } else {
            return val > rules.min.value;
          }
        }
        return true;
      },
      `${label} must be at ${rules.min?.inclusive ? 'at least' : 'greater than'} ${rules.min?.value}.`
    )
    .refine(
      val => {
        if (val === null) return true;
        if (typeof rules.max !== 'undefined') {
          if (rules.max.inclusive) {
            return val <= rules.max.value;
          } else {
            return val < rules.max.value;
          }
        }
        return true;
      },
      `${label} must be at ${rules.max?.inclusive ? 'at most' : 'less than'} ${rules.max?.value}.`
    )
    .refine(val => {
      if (val === null) return true;
      if (rules.positiveOnly) return val > 0;
      return true;
    }, `${label} must be a positive number.`)
    .refine(val => {
      if (val === null) return true;
      if (rules.integerOnly) return Number.isInteger(val);
      return true;
    }, `${label} must be an integer.`)
    .refine(val => {
      if (val === null) return true;
      if (typeof rules.exactDigits !== 'undefined') {
        const digits = val.toString().replace('.', '').replace('-', '').length;
        return digits === rules.exactDigits;
      }
      return true;
    }, `${label} must be exactly ${rules.exactDigits} digits.`);
};

export const selectFieldOnSubmitValidation = (label: string, rules: z.input<typeof TanStackFormSelectFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .string()
    .nullable()
    .refine(val => {
      if (rules.required) return val !== undefined && val !== null && !!val.trim().length;
      return true;
    }, `${label} is required.`);
};

export const dateFieldOnSubmitValidation = (label: string, rules: z.input<typeof TanStackFormDateFieldSchema>['rules']) => {
  if (!rules) return undefined;
  return z
    .date()
    .nullable()
    .refine(val => {
      if (rules.required) return val !== null;
      return true;
    }, `${label} is required.`);
};
