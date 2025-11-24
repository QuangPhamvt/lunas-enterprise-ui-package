import { useMemo } from 'react';

import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../../components/ui/fields';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderNumberField as TFormBuilderNumberField } from '../../types';
import { NumberInput } from '../ui/number-input';

export const FormBuilderNumberField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderNumberField>('number-field', fieldId);

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

          <FieldContentMain>
            <NumberInput placeholder="0" className="pointer-events-none" />
          </FieldContentMain>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
