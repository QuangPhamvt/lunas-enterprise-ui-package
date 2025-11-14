import { useMemo } from 'react';

import { Input } from '@/components/ui/input';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../forms';
import { useFormBuilderValueContext } from '../providers';

export const FormBuilderTextField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const { formBuilder } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const field = formBuilder.form.find(field => field.id === fieldId);
    if (field && field.type === 'text-field') {
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
            <Input className="pointer-events-none" placeholder={currentField.placeholder} />
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
