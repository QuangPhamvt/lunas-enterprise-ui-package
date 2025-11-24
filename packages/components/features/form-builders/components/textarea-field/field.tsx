import { useMemo } from 'react';

import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../../components/ui/fields';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderTextareaField as TFormBuilderTextareaField } from '../../types';
import { Textarea } from '../ui/textarea';

export const FormBuilderTextareaField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderTextareaField>('textarea-field', fieldId);

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
            <Textarea className="pointer-events-none" placeholder={currentField.placeholder} />
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
