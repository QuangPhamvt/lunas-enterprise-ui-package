import { useMemo } from 'react';

import { z } from 'zod/v4';

import type { FormBuilderField } from '../types';

export const useGenerateValidate = (fields: FormBuilderField[]) => {
  const schema = useMemo(() => {
    const shapeArr = fields
      .map(field => {
        if (field.type === 'text-field') {
          return z.object({
            [field.camelCaseName]: z
              .string()
              .refine(
                val => {
                  if (field.rules?.minLength && val.length < field.rules.minLength) {
                    return false;
                  }
                  return true;
                },
                { error: `Minimum length is ${field.rules?.minLength}` }
              )
              .refine(
                val => {
                  if (field.rules?.maxLength && val.length > field.rules.maxLength) {
                    return false;
                  }
                  return true;
                },
                { error: `Maximum length is ${field.rules?.maxLength}` }
              )
              .trim(),
          }).shape;
        }
        if (field.type === 'textarea-field') {
          return z.object({
            [field.camelCaseName]: z
              .string()
              .refine(
                val => {
                  if (field.rules?.minLength && val.length < field.rules.minLength) {
                    return false;
                  }
                  return true;
                },
                { message: `Minimum length is ${field.rules?.minLength}` }
              )
              .refine(
                val => {
                  if (field.rules?.maxLength && val.length > field.rules.maxLength) {
                    return false;
                  }
                  return true;
                },
                { message: `Maximum length is ${field.rules?.maxLength}` }
              )
              .trim(),
          }).shape;
        }
        if (field.type === 'number-field') {
          return z.object({
            [field.camelCaseName]: z
              .number()
              .refine(
                value => {
                  if (field.rules.negative && value >= 0) {
                    return false;
                  }
                  return true;
                },
                {
                  message: 'Value must be negative',
                }
              )
              .refine(
                value => {
                  if (field.rules.positive && value <= 0) {
                    return false;
                  }
                  return true;
                },
                {
                  message: 'Value must be positive',
                }
              )
              .refine(
                value => {
                  if (!field.rules.greaterThan && !field.rules.greaterThanOrEqualTo) {
                    return true;
                  }
                  if (field.rules.greaterThan && !field.rules.greaterThanOrEqualTo) {
                    return value > field.rules.greaterThan;
                  }
                  if (!field.rules.greaterThan && field.rules.greaterThanOrEqualTo) {
                    return value >= field.rules.greaterThanOrEqualTo;
                  }
                  return true;
                },
                {
                  message: `Value must be greater than ${field.rules.greaterThan ?? field.rules.greaterThanOrEqualTo}`,
                }
              )
              .refine(
                value => {
                  if (!field.rules.lessThan && !field.rules.lessThanOrEqualTo) {
                    return true;
                  }
                  if (field.rules.lessThan && !field.rules.lessThanOrEqualTo) {
                    return value < field.rules.lessThan;
                  }
                  if (!field.rules.lessThan && field.rules.lessThanOrEqualTo) {
                    return value <= field.rules.lessThanOrEqualTo;
                  }
                  return true;
                },
                {
                  message: `Value must be less than ${field.rules.lessThan ?? field.rules.lessThanOrEqualTo}`,
                }
              ),
          }).shape;
        }
        if (field.type === 'select-field') {
          return z.object({
            [field.camelCaseName]: z.string().nullable(),
          }).shape;
        }
        if (field.type === 'date-field') {
          return z.object({
            [field.camelCaseName]: z.date(),
          });
        }
        if (field.type === 'switch-field') {
          const switchShapeArr = field.options.map(option => {
            return z.object({
              [option.camelCaseName]: z.boolean(),
            }).shape;
          });
          return z.object({
            ...Object.assign({}, ...switchShapeArr),
          }).shape;
        }
        if (field.type === 'radio-group-field') {
          return z.object({
            [field.camelCaseName]: z.string().nullable(),
          }).shape;
        }
        return null;
      })
      .filter(Boolean);
    return z.object({
      ...Object.assign({}, ...shapeArr),
    });
  }, [fields]);

  const defaultValues = useMemo(() => {
    const valueArr = fields
      .map(field => {
        if (field.type === 'text-field') {
          return {
            [field.camelCaseName]: '',
          };
        }
        if (field.type === 'textarea-field') {
          return {
            [field.camelCaseName]: '',
          };
        }
        if (field.type === 'number-field') {
          return {
            [field.camelCaseName]: 0,
          };
        }
        if (field.type === 'select-field') {
          return {
            [field.camelCaseName]: null,
          };
        }
        if (field.type === 'date-field') {
          return {
            [field.camelCaseName]: null,
          };
        }
        if (field.type === 'switch-field') {
          const switchValues = field.options.map(option => ({
            [option.camelCaseName]: false,
          }));
          return Object.assign({}, ...switchValues);
        }
        if (field.type === 'radio-group-field') {
          return {
            [field.camelCaseName]: null,
          };
        }
        return null;
      })
      .filter(Boolean);
    const values: z.input<typeof schema> = Object.assign({}, ...valueArr);
    return values;
  }, [fields]);
  return { schema, defaultValues };
};
