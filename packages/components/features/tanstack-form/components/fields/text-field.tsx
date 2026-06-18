'use client';

import { memo, useCallback, useId, useMemo, useRef } from 'react';

import { useSelector } from '@tanstack/react-store';

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

type Props = Pick<
  z.input<typeof TanStackFormTextFieldSchema>,
  'label' | 'description' | 'placeholder' | 'orientation' | 'counter' | 'tooltip' | 'helperText' | 'showClearButton' | 'showErrorMessage'
> & {
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
};

export const TextField = memo<Props>(({
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
  disabled = false,
  maxLength,
}) => {
  const id = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useSelector(form.store, ({ isSubmitting }) => isSubmitting);
  const isDisabled = disabled || isSubmitting;

  const _showClearButton = showClearButton && !isDisabled && !!state.value;

  const _count = state.value ? state.value.length : 0;

  const _countText = useMemo(() => {
    if (!counter) return '';
    const unit = `character${[0, 1].includes(_count) ? '' : 's'}`;
    if (counter && maxLength) return `${_count} / ${maxLength} character${!_count ? '' : 's'}`;
    return `${_count} ${unit}`;
  }, [_count, counter, maxLength]);

  const _touched = state.meta.isDirty || state.meta.isTouched;
  const _invalid = _touched && !state.meta.isValid;
  const _isEmpty = required && state.value === null;
  const _hasErrors = !!state.meta.errors.length;

  const _isNearLimit = maxLength && _count >= maxLength * 0.8;
  const _isAtLimit = maxLength && _count >= maxLength;

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isDisabled) return;
      if (counter && maxLength && value.length > maxLength) return;
      handleChange(value || null);
    },
    [isDisabled, counter, maxLength, handleChange]
  );

  const onClear = useCallback(() => {
    if (isDisabled) return;
    handleChange(null);
    inputRef.current?.focus();
  }, [isDisabled, handleChange]);

  const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>((e) => {
    if (e.key === 'Enter') e.preventDefault();
  }, []);

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
            aria-describedby={errorId}
            autoComplete="off"
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isDisabled}
            className={cn('pr-6', isDisabled && 'pointer-events-none bg-muted-muted opacity-60')}
            onBlur={handleBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          {_showClearButton && (
            <button
              type="button"
              aria-label="Clear"
              className="absolute inset-e-1 top-2.5 flex size-4 cursor-pointer items-center justify-center rounded-md text-text-positive-weak outline-none transition-[color,transform] hover:text-text-positive focus-visible:text-primary-strong focus-visible:[&>svg]:scale-125 [&>svg]:size-3.5 [&>svg]:transition-transform"
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
          {!_showClearButton && _touched && showErrorMessage && _hasErrors && (
            <div className="absolute inset-e-2 inset-y-0 top-2.5 text-danger-strong">
              <BanIcon aria-hidden="true" size={14} />
            </div>
          )}
          <div className="my-1 flex w-full items-start justify-between gap-x-2">
            {_touched && showErrorMessage ? <FieldError id={errorId} className="flex-1" errors={state.meta.errors} /> : <div />}
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
});

TextField.displayName = 'TextField';
