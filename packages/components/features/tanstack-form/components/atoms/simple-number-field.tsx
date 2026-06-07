'use client';

import { useCallback, useId } from 'react';

import { useStore } from '@tanstack/react-form';

import { Label } from '@/components/ui/label';
import { NumberInput } from '@/components/ui/inputs/number-input';

import { useTanStackFieldContext } from '../../tanstack-form';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  unit?: string;
  allowNegative?: boolean;
  disabled?: boolean;
};

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
