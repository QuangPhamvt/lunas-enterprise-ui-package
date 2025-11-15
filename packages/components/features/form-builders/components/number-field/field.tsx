import { useMemo } from 'react';

import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../../components/ui/fields';
import { useFormBuilderValueContext } from '../providers';
import { NumberInput } from '../ui/number-input';

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
            <NumberInput placeholder="0" className="pointer-events-none" />
          </FieldContentMain>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
