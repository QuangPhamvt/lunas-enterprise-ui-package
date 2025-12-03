import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon } from 'lucide-react';
import type z from 'zod';

import type { TanStackFormNumberFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { NumberInput } from '../ui/number-input';
import { cn } from '@customafk/react-toolkit/utils';

type NumberFieldProps = Pick<
  z.input<typeof TanStackFormNumberFieldSchema>,
  | 'label'
  | 'description'
  | 'placeholder'
  | 'defaultValue'
  | 'tooltip'
  | 'helperText'
  | 'orientation'
  | 'showErrorMessage'
  | 'rounding'
  | 'decimalPlaces'
  | 'percision'
  | 'unit'
> & {
  required?: boolean;
  allowNegative?: boolean;
};

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  description,
  placeholder,

  // tooltip,
  helperText,
  orientation,
  showErrorMessage,
  rounding,
  decimalPlaces,
  percision,
  unit,

  required,
  allowNegative,
}) => {
  const field = useTanStackFieldContext<number | null>();

  const isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  const _errors = useMemo(() => {
    return field.state.meta.errors;
  }, [field.state.meta.errors]);

  const _isEmpty = useMemo(() => {
    if (required) return field.state.value === null;
    return false;
  }, [required, field.state.value]);

  const onValueChange = useCallback(
    (value: number | null) => {
      if (isSubmitting) return;
      field.handleChange(value);
    },
    [isSubmitting, field.handleChange]
  );

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name} aria-required={_isEmpty}>
            {label}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain className="flex justify-end">
          <div className="relative flex w-full flex-col items-end">
            <div className="relative w-full max-w-120">
              <NumberInput
                id={field.name}
                value={field.state.value}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                placeholder={placeholder}
                roundingRule={rounding}
                numberAfterDecimalPoint={decimalPlaces}
                precision={percision}
                unitText={unit}
                allowNegative={allowNegative}
                className={cn(isSubmitting && 'pointer-events-none bg-muted-muted opacity-60')}
                onBlur={field.handleBlur}
                onValueChange={onValueChange}
              />
              {isSubmitting && (
                <div className="absolute inset-y-0 start-2 top-2.5 text-muted-weak">
                  <Loader2Icon size={14} className="animate-spin text-primary-strong" />
                </div>
              )}
              {showErrorMessage && !!_errors.length && (
                <div className="absolute inset-y-0 start-2 top-2.75 text-danger-strong">
                  <BanIcon size={14} />
                </div>
              )}
              <div className="mt-1 flex w-full flex-col items-end justify-end">{showErrorMessage && <FieldError errors={_errors} />}</div>
            </div>
            {!!helperText && (
              <div className="mt-1 w-full text-wrap rounded bg-primary-bg-subtle p-2 text-text-positive-weak text-xs">
                <p>{helperText}</p>
              </div>
            )}
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
