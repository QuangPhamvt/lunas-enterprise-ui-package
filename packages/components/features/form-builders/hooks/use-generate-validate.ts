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
              .min(field.rules?.minLength || 0, `Minimum length is ${field.rules?.minLength}`)
              .max(field.rules?.maxLength || Infinity, `Maximum length is ${field.rules?.maxLength}`)
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
