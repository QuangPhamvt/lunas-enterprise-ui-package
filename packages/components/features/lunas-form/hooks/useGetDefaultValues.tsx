import { useMemo } from 'react';

import z from 'zod';

import type { LunasFormFormSection } from '../types';

// type DefaultValues = (typeof LunasFormFormSection['fields'][0])[];
type DefaultValues = {
  [x: string]: unknown;
};

export const useGetDefaultValues = (defaultValues: DefaultValues, sections: LunasFormFormSection[]) => {
  const _defaultValues = useMemo(() => {
    const _initial: Record<string, string | number | Date | null> = {};
    sections.forEach(section => {
      section.fields.forEach(field => {
        switch (field.type) {
          case 'title-field': {
            break;
          }
          case 'text-field': {
            const parsed = z.string().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
            if (!parsed.success) {
              console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
            }
            _initial[field.camelCaseName] = parsed.data ?? null;
            break;
          }
          case 'textarea-field': {
            const parsed = z.string().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
            if (!parsed.success) {
              console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
            }
            _initial[field.camelCaseName] = parsed.data ?? null;
            break;
          }
          case 'number-field': {
            const parsed = z.number().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
            if (!parsed.success) {
              console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
            }
            _initial[field.camelCaseName] = parsed.data ?? null;
            break;
          }
          case 'select-field': {
            const parsed = z.string().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
            if (!parsed.success) {
              console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
            }
            _initial[field.camelCaseName] = parsed.data ?? null;
            break;
          }
          case 'date-field': {
            const parsed = z.date().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
            if (!parsed.success) {
              console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
            }
            _initial[field.camelCaseName] = parsed.data ?? null;
            break;
          }
          default:
            break;
        }
      });
    });
    return _initial;
  }, [defaultValues, sections]);
  return { defaultValues: _defaultValues };
};
