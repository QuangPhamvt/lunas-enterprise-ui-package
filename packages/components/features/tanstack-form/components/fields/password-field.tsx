'use client';

import { useCallback, useId, useState } from 'react';

import { useStore } from '@tanstack/react-form';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

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

import type { PasswordFieldProps as Props } from '../../types';

/**
 * A TanStack Form-connected password input field with a show/hide toggle button
 * and inline validation error display.
 *
 * @example
 * import { PasswordField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="password">
 *   {() => (
 *     <PasswordField
 *       label="Password"
 *       placeholder="Enter your password"
 *       helperText="Must be at least 8 characters"
 *     />
 *   )}
 * </form.Field>
 */
export const PasswordField: React.FC<Props> = ({
  label,
  description,
  placeholder,
  orientation = 'responsive',
  tooltip,
  helperText,
  showErrorMessage = true,
}) => {
  const id = useId();
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const _invalid = state.meta.isDirty && state.meta.isTouched && !state.meta.isValid;

  const toggleVisibility = useCallback(() => setIsVisible(prev => !prev), []);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      handleChange(value || null);
    },
    [isSubmitting, handleChange]
  );

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field data-invalid={_invalid} orientation={orientation}>
        <FieldContent>
          <FieldLabel htmlFor={id}>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Input
            id={id}
            name={name}
            type={isVisible ? 'text' : 'password'}
            placeholder={placeholder}
            value={state.value ?? ''}
            aria-invalid={_invalid}
            autoComplete="new-password"
            onBlur={handleBlur}
            onChange={onChange}
          />

          <button
            className="absolute inset-e-0 inset-y-0 flex size-9 items-center justify-center rounded-e-md text-muted outline-none transition-[color,box-shadow] focus:z-10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            aria-pressed={isVisible}
            aria-controls={id}
          >
            {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
          </button>

          <div className="mt-1 flex w-full items-start justify-start">
            {showErrorMessage && state.meta.isDirty && <FieldError errors={state.meta.errors} />}
          </div>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
