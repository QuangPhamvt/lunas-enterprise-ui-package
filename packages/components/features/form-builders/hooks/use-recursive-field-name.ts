import { useCallback } from 'react';

import { useStore } from '@tanstack/react-form';

import type z from 'zod';

import { useFormBuilderFormContext } from '../components/form-buidler-form';
import type { formBuilderSchema } from '../schema';
import type { UseFormBuilderFormContext } from '../types';

function recursiveFindFieldName(fieldId: string, section: z.output<typeof formBuilderSchema>['sections'][number], prefix: string): string {
  if (section.fields.length === 0) return '';

  // Tìm field trong level hiện tại
  for (let i = 0; i < section.fields.length; i++) {
    const field = section.fields[i];

    // Nếu tìm thấy field, trả về tên đầy đủ
    if (field.id === fieldId) {
      return `${prefix}[${i}]`;
    }

    // Nếu field là array-field, đệ quy tìm trong fields con
    if (field.type === 'array-field' && field.fields && field.fields.length > 0) {
      const result = recursiveFindFieldName(fieldId, { ...section, fields: field.fields }, `${prefix}[${i}].fields`);
      if (result) return result;
    }
  }

  return '';
}

export const useRecursiveFieldName = (sectionIndex: number) => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;
  const section = useStore(form.store, state => state.values.sections[sectionIndex]);

  const handleGetFieldName = useCallback(
    (fId: string) => {
      return recursiveFindFieldName(fId, section, `sections[${sectionIndex}].fields`);
    },
    [section, sectionIndex]
  );

  return { getFieldName: handleGetFieldName };
};
