import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon } from 'lucide-react';

import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { NumberInput } from '../ui/number-input';

type NumberFieldProps = {
  label: string;
  description?: string;
  placeholder?: string;
  unitText?: string;

  orientation?: 'horizontal' | 'vertical' | 'responsive';
  showErrorMessage?: boolean;
};

export const NumberField: React.FC<NumberFieldProps> = ({ label, description, orientation, placeholder, unitText, showErrorMessage }) => {
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
          <div className="relative flex w-full max-w-60 flex-col">
            <NumberInput
              id={field.name}
              value={field.state.value}
              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
              placeholder={placeholder}
              unitText={unitText}
              onBlur={field.handleBlur}
              onValueChange={onValueChange}
            />
            {showErrorMessage && !!_errors.length && (
              <div className="absolute inset-y-0 start-2 top-2.75 text-danger-strong">
                <BanIcon size={14} />
              </div>
            )}
            <div className="mt-1 flex w-full flex-col items-end justify-end">{showErrorMessage && <FieldError errors={_errors} />}</div>
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
