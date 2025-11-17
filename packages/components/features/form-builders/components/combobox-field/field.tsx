import { useMemo } from 'react';

import { FieldSeparator } from '@/components/ui/field';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderComboboxField as TFormBuilderComboboxField } from '../../types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../ui/fields';
import { Input } from '../ui/input';

export const FormBuilderComboboxField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderComboboxField>('combobox-field', fieldId);
  const orientation = useMemo(() => {
    return currentField?.orientation || 'responsive';
  }, [currentField]);

  if (!currentField) return null;

  return (
    <FieldSet>
      <FieldGroup>
        <Field orientation={orientation}>
          <FieldContent>
            <FieldLabel>{currentField.label}</FieldLabel>
            <FieldDescription>{currentField.description}</FieldDescription>
          </FieldContent>
          <FieldContentMain className="flex justify-end">
            <Input className="pointer-events-none" placeholder={currentField.placeholder} />
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
