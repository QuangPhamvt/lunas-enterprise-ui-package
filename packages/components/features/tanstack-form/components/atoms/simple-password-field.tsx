'use client';

import { useCallback, useId, useState } from 'react';

import { useStore } from '@tanstack/react-form';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useTanStackFieldContext } from '../../tanstack-form';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export const SimplePasswordField: React.FC<Props> = ({ label, placeholder, required, disabled }) => {
  const id = useId();
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const [isVisible, setIsVisible] = useState(false);

  const _invalid = state.meta.isTouched && !state.meta.isValid;

  const toggleVisibility = useCallback(() => setIsVisible(prev => !prev), []);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      handleChange(value || null);
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
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={state.value ?? ''}
          aria-invalid={_invalid}
          autoComplete="current-password"
          placeholder={placeholder}
          disabled={disabled || isSubmitting}
          className="pr-9"
          onBlur={handleBlur}
          onChange={onChange}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          aria-controls={id}
          className="absolute inset-y-0 right-0 flex size-9 items-center justify-center text-muted outline-none transition-colors hover:text-text-positive focus-visible:text-text-positive disabled:pointer-events-none disabled:opacity-50"
          disabled={disabled || isSubmitting}
          onClick={toggleVisibility}
        >
          {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
        </button>
      </div>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
