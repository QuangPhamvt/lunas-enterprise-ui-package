import { useCallback } from 'react';

import { useStore } from '@tanstack/react-form';

import type { FormBuilderNumberField } from '@/components/features/form-builders/types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel } from '../../../../components/ui/fields';
import { NumberInput } from '../../../ui/number-input';
import { useFieldContext } from '../tanstack-form';

export const NumberField: React.FC<Pick<FormBuilderNumberField, 'label' | 'description' | 'orientation' | 'placeholder' | 'unitText'>> = ({
  label,
  description,
  orientation,
  placeholder,
  unitText,
}) => {
  const field = useFieldContext<number>();

  const isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  const onValueChange = useCallback(
    (value?: number) => {
      if (isSubmitting) return;
      if (value === undefined) return;
      field.handleChange(value);
    },
    [isSubmitting, field.handleChange]
  );

  return (
    <FieldGroup>
      <Field orientation={orientation} data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain>
          <NumberInput
            id={field.name}
            value={field.state.value}
            aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
            placeholder={placeholder}
            unitText={unitText}
            onBlur={field.handleBlur}
            onValueChange={onValueChange}
          />
        </FieldContentMain>
      </Field>
    </FieldGroup>
  );
};
