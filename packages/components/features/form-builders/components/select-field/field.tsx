import { useMemo } from 'react';

import { useFormBuilderValueContext } from '../providers';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../ui/fields';
import { Select, SelectTrigger, SelectValue } from '../ui/select';

export const FormBuilderSelectField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder } = useFormBuilderValueContext();
  const currentField = useMemo(() => {
    const field = formBuilder.form.find(field => field.id === fieldId);
    if (field && field.type === 'select-field') {
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
