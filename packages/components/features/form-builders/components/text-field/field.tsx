import { useMemo } from 'react';

import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../../components/ui/fields';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderTextField as TFormBuilderTextField } from '../../types';
import { Input } from '../ui/input';

export const FormBuilderTextField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderTextField>('text-field', fieldId);

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
