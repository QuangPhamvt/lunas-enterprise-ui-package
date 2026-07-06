'use client';

import { useCallback, useId } from 'react';

import { useStore } from '@tanstack/react-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useTanStackFieldContext } from '../form-context';
import { FieldError } from '../ui/field';

import type { SimpleTextFieldProps as Props } from '../../types';

export const SimpleTextField: React.FC<Props> = ({ label, placeholder, required, maxLength, disabled }) => {
  const id = useId();
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isTouched && !state.meta.isValid;

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      if (maxLength && value.length > maxLength) return;
      handleChange(value || null);
    },
    [isSubmitting, maxLength, handleChange]
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-danger-strong">*</span>}
        </Label>
      )}
      <Input
        id={id}
        name={name}
        value={state.value ?? ''}
        aria-invalid={_invalid}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled || isSubmitting}
        onBlur={handleBlur}
        onChange={onChange}
      />
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
