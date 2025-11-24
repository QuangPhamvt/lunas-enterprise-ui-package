import { useMemo } from 'react';

import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderSelectField as TFormBuilderSelectField } from '../../types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../ui/fields';
import { Select, SelectTrigger, SelectValue } from '../ui/select';

export const FormBuilderSelectField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderSelectField>('select-field', fieldId);

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
            <Select>
              <SelectTrigger className="pointer-events-none w-60">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </Select>
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
