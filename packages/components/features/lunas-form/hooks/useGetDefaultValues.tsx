import { useMemo } from 'react';

import z from 'zod';

import type { LunasFormFormSection } from '../types';

// type DefaultValues = (typeof LunasFormFormSection['fields'][0])[];
type DefaultValues = {
  [x: string]: unknown;
};

export const useGetDefaultValues = (defaultValues: DefaultValues, sections: LunasFormFormSection[]) => {
  const _defaultValues = useMemo(() => {
    const _initial: Record<string, unknown> = {};
    sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'title-field') return;
        if (field.type === 'text-field') {
          const parsed = z.string().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
          if (!parsed.success) {
            console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
          }
          _initial[field.camelCaseName] = parsed.data;
        }
        if (field.type === 'textarea-field') {
          const parsed = z.string().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
          if (!parsed.success) {
            console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
          }
          _initial[field.camelCaseName] = parsed.data;
        }
        if (field.type === 'number-field') {
          const parsed = z.number().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
          if (!parsed.success) {
            console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
          }
          _initial[field.camelCaseName] = parsed.data;
        }
        if (field.type === 'select-field') {
          const parsed = z.string().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
          if (!parsed.success) {
            console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
          }
          _initial[field.camelCaseName] = parsed.data;
        }
        if (field.type === 'date-field') {
          const parsed = z.date().nullable().default(null).safeParse(defaultValues[field.camelCaseName]);
          if (!parsed.success) {
            console.warn(`Failed to parse default value for field ${field.camelCaseName}:`, parsed.error);
          }
          _initial[field.camelCaseName] = parsed.data;
        }
      });
    });
    return _initial;
  }, [defaultValues, sections]);
  return { defaultValues: _defaultValues };
};
