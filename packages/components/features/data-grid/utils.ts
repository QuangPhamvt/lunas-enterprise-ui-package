import z from 'zod';

import type { DataGridNumberField, DataGridTextField } from './types';

export const textFieldValidation = (label: string, field: DataGridTextField) => {
  const { rules } = field;
  if (!rules) return undefined;

  return z
    .string()
    .nullable()
    .refine(val => {
      if (val === null) return true;
      if (rules.required) return val.trim().length > 0;
      return true;
    }, `${label} is required.`)
    .refine(
      val => {
        if (val === null) return true;
        if (field.type === 'text-field' && rules.maxLength !== undefined) {
          return val.length <= rules.maxLength;
        }
        return true;
      },
      `${label} must be at most ${'maxLength' in rules ? rules.maxLength : ''} characters.`
    )
    .refine(
      val => {
        if (val === null) return true;
        if (field.type === 'text-field' && rules.minLength !== undefined) {
          return val.length >= rules.minLength;
        }
        return true;
      },
      `${label} must be at least ${'minLength' in rules ? rules.minLength : ''} characters.`
    )
    .refine(
      val => {
        if (val === null) return true;
        if (field.type === 'text-field' && rules.exactLength !== undefined) {
          return val.length === rules.exactLength;
        }
        return true;
      },
      `${label} must be exactly ${'exactLength' in rules ? rules.exactLength : ''} characters.`
    );
};

export const numberFieldValidation = (label: string, field: DataGridNumberField) => {
  const { rules } = field;
  if (!rules) return undefined;

  return z
    .number()
    .nullable()
    .refine(val => {
      if (rules.required) {
        if (val === null) return true;
        if (Number.isNaN(val)) return false;
      }
      return true;
    }, `${label} is required.`)
    .refine(
      val => {
        if (val === null) return true;
        if (field.type === 'number-field' && rules.maxValue !== undefined) {
          return val <= rules.maxValue;
        }
        return true;
      },
      `${label} must be at most ${'maxValue' in rules ? rules.maxValue : ''}.`
    )
    .refine(
      val => {
        if (val === null) return true;
        if (field.type === 'number-field' && rules.minValue !== undefined) {
          return val >= rules.minValue;
        }
        return true;
      },
      `${label} must be at least ${'minValue' in rules ? rules.minValue : ''}.`
    )
    .refine(val => {
      if (val === null) return true;
      if (field.type === 'number-field' && rules.integerOnly) {
        return Number.isInteger(val);
      }
      return true;
    }, `${label} must be an integer.`)
    .refine(val => {
      if (val === null) return true;
      if (field.type === 'number-field' && rules.positiveOnly) {
        return val > 0;
      }
      return true;
    }, `${label} must be a positive number.`)
    .refine(
      val => {
        if (val === null) return true;
        if (field.type === 'number-field' && rules.exactDigits !== undefined) {
          const digits = val.toString().replace('.', '').length;
          return digits === rules.exactDigits;
        }
        return true;
      },
      `${label} must have exactly ${'exactDigits' in rules ? rules.exactDigits : ''} digits.`
    );
};
