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
            [field.camelCaseName]: z.number(),
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
        return null;
      })
      .filter(Boolean);
    const values: z.input<typeof schema> = Object.assign({}, ...valueArr);
    return values;
  }, [fields]);
  return { schema, defaultValues };
};
