'use client';

import { memo, useCallback, useId } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { NumberInput } from '@/components/ui/inputs/number-input';

import { useTanStackFieldContext } from '../form-context';
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
export const NumberField = memo<NumberFieldProps>(
  ({
    label,
    description,
    placeholder,
    tooltip,
    helperText,
    orientation = 'responsive',
    showErrorMessage = true,
    rounding,
    decimalPlaces,
    precision,
    unit,
    required = false,
    disabled = false,
    allowNegative,
  }) => {
    const id = useId();
    const errorId = useId();

    const field = useTanStackFieldContext<number | null>();

    const isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);
    const isDisabled = disabled || isSubmitting;

    const _touched = field.state.meta.isDirty || field.state.meta.isTouched;
    const _invalid = _touched && !field.state.meta.isValid;
    const _isEmpty = required && field.state.value === null;
    const _hasErrors = !!field.state.meta.errors.length;

    const onValueChange = useCallback(
      (value: number | null) => {
        if (isDisabled) return;
        field.handleChange(value);
      },
      [isDisabled, field.handleChange]
    );

    return (
      <FieldGroup className="gap-y-4 px-4">
        <Field orientation={orientation} data-invalid={_invalid}>
          <FieldContent>
            <FieldLabel htmlFor={id} aria-required={_isEmpty}>
              {label}
              {tooltip && <FieldTooltip tooltip={tooltip} />}
            </FieldLabel>
            <FieldDescription>{description}</FieldDescription>
          </FieldContent>

          <FieldContentMain>
            <div className="relative w-full">
              <NumberInput
                id={id}
                value={field.state.value}
                aria-invalid={_invalid}
                aria-describedby={errorId}
                placeholder={placeholder}
                disabled={isDisabled}
                roundingRule={rounding}
                numberAfterDecimalPoint={decimalPlaces}
                precision={precision}
                unitText={unit}
                allowNegative={allowNegative}
                className={cn(isDisabled && 'pointer-events-none opacity-60')}
                onBlur={field.handleBlur}
                onValueChange={onValueChange}
              />
              {isSubmitting && (
                <div className="pointer-events-none absolute inset-s-2 inset-y-0 top-2.5 [&>svg]:size-3.5">
                  <Loader2Icon className="animate-spin text-primary-strong" />
                </div>
              )}
              {!isSubmitting && _touched && showErrorMessage && _hasErrors && (
                <div className="pointer-events-none absolute inset-s-2 inset-y-0 top-2.75 text-danger-strong [&>svg]:size-3.5">
                  <BanIcon />
                </div>
              )}
              <div className="mt-1 flex w-full items-start justify-between gap-x-2">
                {_touched && showErrorMessage ? <FieldError id={errorId} className="flex-1" errors={field.state.meta.errors} /> : <div />}
              </div>
            </div>
            <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    );
  }
);

NumberField.displayName = 'NumberField';
