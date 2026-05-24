'use client';

import { useCallback, useId, useMemo, useRef } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon, XIcon } from 'lucide-react';
import type z from 'zod';

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
} from '@/components/features/tanstack-form/components/ui/field';
import { useTanStackFieldContext } from '../../tanstack-form';

import type { TanStackFormTextFieldSchema } from '../../schema';

/**
 * Props for the TextField component, derived from the TanStack Form text field schema.
 */
type Props = Pick<
  z.input<typeof TanStackFormTextFieldSchema>,
  'label' | 'description' | 'placeholder' | 'orientation' | 'counter' | 'tooltip' | 'helperText' | 'showClearButton' | 'showErrorMessage'
> & {
  /** Marks the field as required; triggers an empty-state indicator when the value is null. */
  required?: boolean;
  /** Maximum number of characters allowed; enforced when `counter` is true. */
  maxLength?: number;
};

/**
 * A TanStack Form-connected single-line text input field with optional character counter,
 * clear button, error display, and submission-state feedback.
 *
 * @example
 * import { TextField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="username">
 *   {() => (
 *     <TextField
 *       label="Username"
 *       placeholder="Enter username"
 *       counter
 *       maxLength={50}
 *       showClearButton
 *     />
 *   )}
 * </form.Field>
 */
export const TextField: React.FC<Props> = ({
  label,
  description,
  placeholder,

  tooltip,
  helperText,
  counter = false,
  orientation = 'responsive',
  showClearButton = false,
  showErrorMessage = true,

  required = false,
  maxLength,
}) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _showClearButton = showClearButton && !isSubmitting && !!state.value;

  const _count = state.value ? state.value.length : 0;

  const _countText = useMemo(() => {
    if (!counter) return '';
    const unit = `character${[0, 1].includes(_count) ? '' : 's'}`;
    if (counter && maxLength) return `${_count} / ${maxLength} character${!_count ? '' : 's'}`;
    return `${_count} ${unit}`;
  }, [_count, counter, maxLength]);

  const _invalid = state.meta.isDirty && state.meta.isTouched && !state.meta.isValid;
  const _isEmpty = required && state.value === null;

  const _isNearLimit = maxLength && _count >= maxLength * 0.8;
  const _isAtLimit = maxLength && _count >= maxLength;

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      if (counter && maxLength && value.length > maxLength) return;
      handleChange(value || null);
    },
    [isSubmitting, counter, maxLength, handleChange]
  );

  const onClear = useCallback(() => {
    if (isSubmitting) return;
    handleChange(null);
    inputRef.current?.focus();
  }, [isSubmitting, handleChange]);

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation} data-invalid={_invalid}>
        <FieldContent>
          <FieldLabel aria-required={_isEmpty} htmlFor={id}>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Input
            ref={inputRef}
            id={id}
            name={name}
            value={state.value ?? ''}
            aria-invalid={_invalid}
            autoComplete="off"
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect="off"
            className={cn('pr-6', isSubmitting && 'pointer-events-none bg-muted-muted opacity-60')}
            onBlur={handleBlur}
            onChange={onChange}
          />
          {_showClearButton && (
            <button
              type="button"
              aria-label="Clear"
              className="absolute inset-e-0 inset-y-0 top-3 flex h-fit w-8 cursor-pointer items-center justify-center rounded-e-md text-text-positive-weak outline-none transition-[color,box-shadow] hover:text-text-positive focus:text-text-positive-intense [&>svg]:size-3.5"
              onClick={onClear}
            >
              <XIcon aria-hidden="true" />
            </button>
          )}
          {isSubmitting && (
            <div className="absolute inset-e-2 inset-y-0 top-2.5 text-muted-weak">
              <Loader2Icon size={14} className="animate-spin text-primary-strong" />
            </div>
          )}
          {!_showClearButton && state.meta.isDirty && showErrorMessage && !!state.meta.errors.length && (
            <div className="absolute inset-e-2 inset-y-0 top-2.5 text-danger-strong">
              <BanIcon aria-hidden="true" size={14} />
            </div>
          )}
          <div className="my-1 flex w-full items-start justify-between gap-x-2">
            {state.meta.isDirty && showErrorMessage ? <FieldError className="flex-1" errors={state.meta.errors} /> : <div />}
            {!!counter && (
              <p
                className={cn(
                  'h-4 flex-0 text-nowrap text-end text-xs tabular-nums transition-colors',
                  _isAtLimit ? 'font-medium text-danger-strong' : _isNearLimit ? 'text-warning-strong' : 'text-text-positive-weak'
                )}
              >
                {_countText}
              </p>
            )}
          </div>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
