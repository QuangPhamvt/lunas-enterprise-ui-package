import { useMemo } from 'react';

import type { FormBuilderDateField } from '@/components/features/form-builders/types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel } from '../../../ui/fields';
import { useFieldContext } from '../tanstack-form';

export const DateField: React.FC<Pick<FormBuilderDateField, 'label' | 'description' | 'placeholder' | 'orientation'>> = ({
  label,
  description,
  placeholder,
  orientation,
}) => {
  const field = useFieldContext<Date>();

  const _isInvalid = useMemo(() => {
    return field.state.meta.isTouched && !field.state.meta.isValid;
  }, [field.state.meta.isTouched, field.state.meta.isValid]);

  return (
    <FieldGroup>
      <Field orientation={orientation} data-invalid={_isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain></FieldContentMain>
      </Field>
    </FieldGroup>
  );
};
