'use client';

import { useCallback, useId } from 'react';

import { useStore } from '@tanstack/react-form';

import { AtSignIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useTanStackFieldContext } from '../form-context';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
};

export const SimpleEmailField: React.FC<Props> = ({ label, placeholder, required, maxLength, disabled }) => {
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
      <div className="relative">
        <Input
          id={id}
          name={name}
          type="email"
          value={state.value ?? ''}
          aria-invalid={_invalid}
          autoComplete="email"
          placeholder={placeholder}
          disabled={disabled || isSubmitting}
          className={cn('pl-9')}
          onBlur={handleBlur}
          onChange={onChange}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex size-9 items-center justify-center text-muted">
          <AtSignIcon size={14} />
        </div>
      </div>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
