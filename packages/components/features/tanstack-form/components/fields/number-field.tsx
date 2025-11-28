import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import type { TFormBuilderNumberFieldSchema } from '@/components/features/form-builders/schema';

import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { NumberInput } from '../ui/number-input';

export const NumberField: React.FC<
  Pick<TFormBuilderNumberFieldSchema, 'label' | 'description' | 'orientation' | 'placeholder' | 'unitText' | 'showErrorMessage'>
> = ({ label, description, orientation, placeholder, unitText, showErrorMessage }) => {
  const field = useTanStackFieldContext<number>();

  const isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  const _errors = useMemo(() => {
    return field.state.meta.errors;
  }, [field.state.meta.errors]);

  const onValueChange = useCallback(
    (value?: number) => {
      if (isSubmitting) return;
      if (value === undefined) return;
      field.handleChange(value);
    },
    [isSubmitting, field.handleChange]
  );

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain className="flex justify-end">
          <div className="flex w-full max-w-60 flex-col">
            <NumberInput
              id={field.name}
              value={field.state.value}
              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
              placeholder={placeholder}
              unitText={unitText}
              onBlur={field.handleBlur}
              onValueChange={onValueChange}
            />
            <div className="mt-1 flex w-full flex-col items-end justify-end">{showErrorMessage && <FieldError errors={_errors} />}</div>
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
