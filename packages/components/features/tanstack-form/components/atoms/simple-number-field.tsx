'use client';

import { useCallback, useId } from 'react';

import { useStore } from '@tanstack/react-form';

import { Label } from '@/components/ui/label';
import { NumberInput } from '@/components/ui/inputs/number-input';

import { useTanStackFieldContext } from '../form-context';
import { FieldError } from '../ui/field';

type Props = {
  /** Field label rendered above the control. Omit to render label-less. */
  label?: string;
  /** Placeholder shown when the value is empty. */
  placeholder?: string;
  /** When `true`, appends a required asterisk to the label. */
  required?: boolean;
  /** Unit label shown inside the input after the number (e.g. `kg`, `₫`). */
  unit?: string;
  /** Allow values below zero. */
  allowNegative?: boolean;
  /** When `true`, disables the control. Also disabled automatically while the form is submitting. */
  disabled?: boolean;
};

/**
 * Minimal number input bound to the surrounding `AppField`; stores `number | null`. Use it for
 * compact forms; the non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { weight: null as number | null } });
 *
 * <form.AppField name="weight" children={({ SimpleNumberField }) => <SimpleNumberField label="Cân nặng" unit="kg" />} />
 * ```
 */
export const SimpleNumberField: React.FC<Props> = ({ label, placeholder, required, unit, allowNegative, disabled }) => {
  const id = useId();
  const { form, state, handleBlur, handleChange } = useTanStackFieldContext<number | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isTouched && !state.meta.isValid;

  const onValueChange = useCallback(
    (value: number | null) => {
      if (isSubmitting) return;
      handleChange(value);
    },
    [isSubmitting, handleChange]
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-danger-strong">*</span>}
        </Label>
      )}
      <NumberInput
        id={id}
        value={state.value}
        placeholder={placeholder}
        unitText={unit}
        allowNegative={allowNegative}
        disabled={disabled || isSubmitting}
        onBlur={handleBlur}
        onValueChange={onValueChange}
      />
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
