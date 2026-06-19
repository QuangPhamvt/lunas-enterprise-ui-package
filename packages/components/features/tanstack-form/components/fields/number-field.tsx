'use client';

import { useCallback } from 'react';

import { useSelector } from '@tanstack/react-store';

import { BanIcon, Loader2Icon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { NumberInput } from '@/components/ui/inputs/number-input';

import { useTanStackFieldContext } from '../../tanstack-form';
import {
  Field,
  FieldContent,
  FieldContentMain,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldNote,
  FieldSeparator,
  FieldTooltip,
} from '../ui/field';

import type { NumberFieldProps } from '../../types';

/**
 * A TanStack Form-connected numeric input field supporting rounding rules,
 * decimal precision, unit labels, and submission-state feedback.
 *
 * @example
 * import { NumberField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="quantity">
 *   {() => (
 *     <NumberField
 *       label="Quantity"
 *       placeholder="0"
 *       unit="pcs"
 *       decimalPlaces={2}
 *       required
 *     />
 *   )}
 * </form.Field>
 */
export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  description,
  placeholder,

  tooltip,
  helperText,
  orientation = 'responsive',
  showErrorMessage = true,
  rounding,
  decimalPlaces,
  percision,
  unit,

  required,
  allowNegative,
}) => {
  const field = useTanStackFieldContext<number | null>();

  const isSubmitting = useSelector(field.form.store, ({ isSubmitting }) => isSubmitting);

  const _errors = field.state.meta.errors;
  const _isEmpty = required ? field.state.value === null : false;

  const onValueChange = useCallback(
    (value: number | null) => {
      if (isSubmitting) return;
      field.handleChange(value);
    },
    [isSubmitting, field.handleChange]
  );

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation} data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name} aria-required={_isEmpty}>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain>
          <div className="relative w-full">
            <NumberInput
              id={field.name}
              value={field.state.value}
              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid && field.state.meta.isDirty}
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
              <div className="absolute inset-s-2 inset-y-0 top-2.5 text-muted-weak [&>svg]:size-3.5">
                <Loader2Icon className="animate-spin text-primary-strong" />
              </div>
            )}
            {field.state.meta.isDirty && showErrorMessage && !!_errors.length && (
              <div className="absolute inset-s-2 inset-y-0 top-2.75 text-danger-strong [&>svg]:size-3.5">
                <BanIcon />
              </div>
            )}
            <div className="mt-1 flex w-full flex-col items-end justify-end">
              {field.state.meta.isDirty && showErrorMessage && <FieldError errors={_errors} />}
            </div>
          </div>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
