'use client';

import { memo, useCallback, useId, useMemo, useState } from 'react';

import { useSelector } from '@tanstack/react-store';

import { BanIcon, CheckIcon, CopyIcon, Loader2Icon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Textarea } from '@/components/ui/textarea';

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

import type { TextareaFieldProps as Props } from '../../types';

export const TextareaField = memo<Props>(
  ({
    label,
    description,
    placeholder,

    tooltip,
    helperText,
    counter = false,
    orientation = 'responsive',
    showErrorMessage = true,

    required = false,
    disabled = false,
    maxLength,
  }) => {
    const id = useId();
    const errorId = useId();
    const [copied, setCopied] = useState(false);
    const { form, state, name, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

    const isSubmitting = useSelector(form.store, ({ isSubmitting }) => isSubmitting);
    const isDisabled = disabled || isSubmitting;

    const _count = state.value ? state.value.length : 0;

    const _countText = useMemo(() => {
      if (!counter) return '';
      if (counter && maxLength) return `${_count} / ${maxLength} ký tự`;
      return `${_count} ký tự`;
    }, [_count, counter, maxLength]);

    const _touched = state.meta.isDirty || state.meta.isTouched;
    const _invalid = _touched && !state.meta.isValid;
    const _isEmpty = required && state.value === null;
    const _hasErrors = !!state.meta.errors.length;
    const _showCopy = !!state.value && !isDisabled;

    const _isNearLimit = maxLength && _count >= maxLength * 0.8;
    const _isAtLimit = maxLength && _count >= maxLength;

    const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
      ({ target: { value } }) => {
        if (isDisabled) return;
        if (counter && maxLength && value.length > maxLength) return;
        handleChange(value || null);
      },
      [isDisabled, counter, maxLength, handleChange]
    );

    const onCopy = useCallback(async () => {
      if (!state.value) return;
      await navigator.clipboard.writeText(state.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }, [state.value]);

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
            <Textarea
              id={id}
              name={name}
              value={state.value ?? ''}
              aria-invalid={_invalid}
              aria-describedby={errorId}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              placeholder={placeholder}
              disabled={isDisabled}
              className={cn(isDisabled && 'pointer-events-none bg-muted-muted opacity-60')}
              onChange={onChange}
              onBlur={handleBlur}
            />
            {_showCopy && (
              <button
                type="button"
                aria-label="Sao chép"
                className="absolute inset-e-1 top-2 flex size-4 cursor-pointer items-center justify-center rounded-md outline-none transition-[color,transform] focus-visible:[&>svg]:scale-125 [&>svg]:size-3.5 [&>svg]:transition-transform"
                onClick={onCopy}
              >
                {copied ? (
                  <CheckIcon aria-hidden="true" className="text-success-strong" />
                ) : (
                  <CopyIcon
                    aria-hidden="true"
                    className="text-text-positive-weak transition-colors hover:text-text-positive focus-visible:text-primary-strong"
                  />
                )}
              </button>
            )}
            {isSubmitting && (
              <div className="absolute inset-e-2 inset-y-0 top-2.5 text-muted-weak">
                <Loader2Icon size={14} className="animate-spin text-primary-strong" />
              </div>
            )}
            {!_showCopy && _touched && showErrorMessage && _hasErrors && (
              <div className="absolute inset-e-2 inset-y-0 top-2.5 text-danger-strong">
                <BanIcon size={14} />
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
  }
);

TextareaField.displayName = 'TextareaField';
