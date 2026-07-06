'use client';

import { memo, useCallback, useId, useRef } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon, XIcon } from 'lucide-react';

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
import { useTanStackFieldContext } from '../form-context';

import type { TextFieldProps as Props } from '../../types';

/** Fraction of maxLength at which the counter turns warning color (80%). */
const COUNTER_WARNING_THRESHOLD = 0.8;

/** Pixel size for inline adornment icons (error ban, loading spinner). */
const ADORNMENT_ICON_SIZE = 14;

// Static handler — no closure deps, shared across all TextField instances
const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
  if (e.key === 'Enter') e.preventDefault();
};

/**
 * A TanStack Form-connected single-line text input with label, validation, and optional features.
 *
 * Must be rendered inside an `AppField` context from `useTanStackForm`.
 * The field value type is `string | null` — `null` represents an empty/unset state.
 *
 * ---
 *
 * **Basic usage**
 * @example
 * const { AppField } = useTanStackForm({ defaultValues: { name: null } });
 *
 * <AppField name="name">
 *   {field => <field.TextField label="Full name" placeholder="Nguyễn Văn A" />}
 * </AppField>
 *
 * ---
 *
 * **With validation**
 * @example
 * <AppField
 *   name="username"
 *   validators={{ onChange: ({ value }) => !value ? 'Bắt buộc' : undefined }}
 * >
 *   {field => <field.TextField label="Username" required />}
 * </AppField>
 *
 * ---
 *
 * **With character counter and max length**
 * @example
 * <AppField name="bio">
 *   {field => (
 *     <field.TextField
 *       label="Bio"
 *       counter
 *       maxLength={160}
 *       placeholder="Giới thiệu bản thân…"
 *     />
 *   )}
 * </AppField>
 *
 * ---
 *
 * **With clear button and helper note**
 * @example
 * <AppField name="search">
 *   {field => (
 *     <field.TextField
 *       label="Tìm kiếm"
 *       showClearButton
 *       helperText="Nhập ít nhất 3 ký tự để tìm kiếm."
 *     />
 *   )}
 * </AppField>
 *
 * ---
 *
 * **Horizontal layout**
 * @example
 * <AppField name="code">
 *   {field => (
 *     <field.TextField
 *       label="Mã sản phẩm"
 *       orientation="horizontal"
 *       tooltip="Mã duy nhất định danh sản phẩm trong hệ thống."
 *     />
 *   )}
 * </AppField>
 */
export const TextField = memo<Props>(
  ({
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

    const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);
    const isDisabled = disabled || isSubmitting;

    const _touched = state.meta.isDirty || state.meta.isTouched;
    const _invalid = _touched && !state.meta.isValid;
    const _isEmpty = required && state.value === null;
    const _hasErrors = state.meta.errors.length > 0;
    const _showClearButton = showClearButton && !isDisabled && !!state.value;

    // Counter values are only computed when the feature is active
    const _count = counter ? (state.value?.length ?? 0) : 0;
    const _isNearLimit = counter && !!maxLength && _count >= maxLength * COUNTER_WARNING_THRESHOLD;
    const _isAtLimit = counter && !!maxLength && _count >= maxLength;
    const _countText = counter ? (maxLength ? `${_count} / ${maxLength} ký tự` : `${_count} ký tự`) : null;

    // Skip the bottom row entirely when neither error nor counter will render
    const _showBottomRow = counter || (_touched && showErrorMessage);

    const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      ({ target: { value } }) => {
        if (counter && maxLength && value.length > maxLength) return;
        handleChange(value || null);
      },
      [counter, maxLength, handleChange]
    );

    const onClear = useCallback(() => {
      handleChange(null);
      inputRef.current?.focus();
    }, [handleChange]);

    return (
      <FieldGroup className="gap-y-4 px-4">
        <Field orientation={orientation} data-invalid={_invalid}>
          <FieldContent>
            <FieldLabel aria-required={_isEmpty} htmlFor={id}>
              {label}
              {tooltip && <FieldTooltip tooltip={tooltip} />}
            </FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
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
                aria-label="Xóa"
                className="absolute inset-e-1 top-2.5 flex size-4 cursor-pointer items-center justify-center rounded-md text-text-positive-weak outline-none transition-[color,transform] hover:text-text-positive focus-visible:text-primary-strong focus-visible:[&>svg]:scale-125 [&>svg]:size-3.5 [&>svg]:transition-transform"
                onClick={onClear}
              >
                <XIcon aria-hidden="true" />
              </button>
            )}
            {isSubmitting && (
              <div className="absolute inset-e-2 inset-y-0 top-2.5 text-muted-weak">
                <Loader2Icon size={ADORNMENT_ICON_SIZE} className="animate-spin text-primary-strong" />
              </div>
            )}
            {!_showClearButton && _touched && showErrorMessage && _hasErrors && (
              <div className="absolute inset-e-2 inset-y-0 top-2.5 text-danger-strong">
                <BanIcon aria-hidden="true" size={ADORNMENT_ICON_SIZE} />
              </div>
            )}
            {_showBottomRow && (
              <div className="my-1 flex w-full items-start justify-between gap-x-2">
                {_touched && showErrorMessage ? <FieldError id={errorId} className="flex-1" errors={state.meta.errors} /> : <div />}
                {counter && (
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
            )}
            <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    );
  }
);

TextField.displayName = 'TextField';
