import { useMemo } from 'react';

import { NumberInput } from '@/components/ui/inputs/number-input';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../forms';
import { useFormBuilderValueContext } from '../providers';

export const FormBuilderNumberField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const field = formBuilder.form.find(field => field.id === fieldId);
    if (field && field.type === 'number-field') {
      return field;
    }
    return null;
  }, [fieldId, formBuilder.form]);

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
            <NumberInput className="pointer-events-none" />
          </FieldContentMain>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
