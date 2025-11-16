import { useMemo } from 'react';

import { useFormBuilderValueContext } from '../components/providers';
import type { FIELD_ID, FormBuilderField } from '../types';

export const useGetCurrentField = <T extends FormBuilderField>(fieldType: FIELD_ID, fieldId: string): T | null => {
  const { formBuilder } = useFormBuilderValueContext();
  const currentField = useMemo(() => {
    const field = formBuilder.form.find(f => f.id === fieldId);
    if (field && field.type === fieldType) {
      return field;
    }
    return null;
  }, [fieldId, fieldType, formBuilder.form]);
  return currentField as T | null;
};
