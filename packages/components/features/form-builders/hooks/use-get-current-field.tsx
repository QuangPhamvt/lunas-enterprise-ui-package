import { useMemo } from 'react';

import { useFormBuilderValueContext } from '../components/providers';
import type { FIELD_ID, FormBuilderField } from '../types';

const getRecursionCurrentField = <T extends FormBuilderField>(fieldType: FIELD_ID, fieldId: string, formBuilderForm: FormBuilderField[]): T | null => {
  for (const field of formBuilderForm) {
    if (field.type === fieldType && field.id === fieldId) {
      return field as T;
    }

    if (field.type === 'array-field') {
      const arrayField = field;
      const foundField = getRecursionCurrentField<T>(fieldType, fieldId, arrayField.fields);
      if (foundField) {
        return foundField;
      }
    }
  }
  return null;
};

export const useGetCurrentField = <T extends FormBuilderField>(fieldType: FIELD_ID, fieldId: string): T | null => {
  const { formBuilder } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const field = formBuilder.sections
      .map(section => {
        const _field = getRecursionCurrentField<T>(fieldType, fieldId, section.fields);
        return _field;
      })
      .find(f => f !== null);
    return field || null;
  }, [fieldId, fieldType, formBuilder]);

  return currentField as T | null;
};
