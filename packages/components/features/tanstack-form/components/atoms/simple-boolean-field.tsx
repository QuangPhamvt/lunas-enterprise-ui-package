'use client';

import { useCallback, useId } from 'react';

import { useSelector } from '@tanstack/react-store';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useTanStackFieldContext } from '../../tanstack-form';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: 'checkbox' | 'switch';
};

export const SimpleBooleanField: React.FC<Props> = ({ label, required, disabled, variant = 'checkbox' }) => {
  const id = useId();
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<boolean | null>();

  const isSubmitting = useSelector(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isTouched && !state.meta.isValid;
  const checked = state.value ?? false;
  const isDisabled = disabled || isSubmitting;

  const onCheckedChange = useCallback(
    (value: boolean) => {
      if (isSubmitting) return;
      handleChange(value);
    },
    [isSubmitting, handleChange]
  );

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 h-9">
        {variant === 'switch' ? (
          <Switch id={id} name={name} checked={checked} disabled={isDisabled} aria-invalid={_invalid} onBlur={handleBlur} onCheckedChange={onCheckedChange} />
        ) : (
          <Checkbox id={id} name={name} checked={checked} disabled={isDisabled} aria-invalid={_invalid} onBlur={handleBlur} onCheckedChange={onCheckedChange} />
        )}
        {label && (
          <Label htmlFor={id} className="cursor-pointer">
            {label}
            {required && <span className="text-danger-strong">*</span>}
          </Label>
        )}
      </div>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
