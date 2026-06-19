'use client';

import { useCallback } from 'react';

import { useSelector } from '@tanstack/react-store';

import { AtSignIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Input } from '@/components/ui/input';
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
import { useTanStackFieldContext } from '../../tanstack-form';

import type { EmailFieldProps as Props } from '../../types';

/**
 * A TanStack Form-connected email input field with an at-sign prefix icon,
 * optional clear button, and inline validation error display.
 *
 * @example
 * import { EmailField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="email">
 *   {() => (
 *     <EmailField
 *       label="Email address"
 *       placeholder="you@example.com"
 *       required
 *     />
 *   )}
 * </form.Field>
 */
export const EmailField: React.FC<Props> = ({
  label,
  description,
  placeholder,
  tooltip,
  helperText,
  orientation = 'responsive',
  showErrorMessage = true,
  required = false,
  maxLength,
}) => {
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useSelector(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isDirty && state.meta.isTouched && !state.meta.isValid;
  const _isEmpty = required && state.value === null;
  const _showClear = !isSubmitting && !!state.value;

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      if (maxLength && value.length > maxLength) return;
      handleChange(value || null);
    },
    [isSubmitting, maxLength, handleChange]
  );

  const onClear = useCallback(() => {
    if (isSubmitting) return;
    handleChange(null);
  }, [isSubmitting, handleChange]);

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field data-invalid={_invalid} orientation={orientation}>
        <FieldContent>
          <FieldLabel htmlFor={name} aria-required={_isEmpty}>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Input
            id={name}
            name={name}
            value={state.value === null ? '' : state.value}
            aria-invalid={_invalid}
            autoComplete="email"
            placeholder={placeholder}
            className={cn('pl-9', _showClear && 'pr-9', isSubmitting && 'pointer-events-none bg-muted-muted opacity-60')}
            onBlur={handleBlur}
            onChange={onChange}
          />
          <div className="absolute top-0 left-0 flex size-9 items-center justify-center text-muted">
            <AtSignIcon size={14} />
          </div>

          {_showClear && (
            <button
              type="button"
              aria-label="Clear"
              className="absolute inset-e-0 inset-y-0 top-3 flex h-fit w-8 cursor-pointer items-center justify-center rounded-e-md text-text-positive-weak outline-none transition-[color,box-shadow] hover:text-text-positive focus:text-text-positive-strong"
              onClick={onClear}
            >
              <XIcon size={14} aria-hidden="true" />
            </button>
          )}

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
