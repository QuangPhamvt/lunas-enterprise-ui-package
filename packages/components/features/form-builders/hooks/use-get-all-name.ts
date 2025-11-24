import { useStore } from '@tanstack/react-form';

import type z from 'zod';

import { useFormBuilderFormContext } from '../components/form-buidler-form';
import type { formBuilderSchema } from '../schema';
import type { UseFormBuilderFormContext } from '../types';

const recursiveCollectFieldNames = (
  sections: z.output<typeof formBuilderSchema>['sections'][number],
  prefix: string,
  names: string[],
  fieldId?: string | undefined
) => {
  sections.fields.forEach((field, index) => {
    const currentName = `${prefix}[${index}]`;
    if (!fieldId || field.id === fieldId) {
      names.push(currentName);
    }

    // Nếu field là array-field, đệ quy thu thập tên trong fields con
    if (field.type === 'array-field' && field.fields && field.fields.length > 0) {
      recursiveCollectFieldNames({ ...sections, fields: field.fields }, `${currentName}.fields`, names, fieldId);
    }
  });
};

export const useGetAllName = (fieldId?: string | undefined) => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;
  const sections = useStore(form.store, state => state.values.sections);

  const getAllNames = () => {
    const names: string[] = [];
    sections.forEach((section, sectionIndex) => {
      recursiveCollectFieldNames(section, `sections[${sectionIndex}].fields`, names, fieldId);
    });
    return names;
  };

  return { getAllNames };
};
