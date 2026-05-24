'use client';

import { memo, useCallback, useId, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon } from 'lucide-react';
import type z from 'zod';

import { cn } from '@customafk/react-toolkit/utils';

import { Textarea } from '@/components/ui/textarea';

import type { TanStackFormTextAreaFieldSchema } from '../../schema';
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

/**
 * Props for the TextareaField component, derived from the TanStack Form textarea field schema.
 */
type Props = Pick<
  z.input<typeof TanStackFormTextAreaFieldSchema>,
  'label' | 'description' | 'placeholder' | 'counter' | 'tooltip' | 'helperText' | 'orientation' | 'showErrorMessage'
> & {
  /** Marks the field as required; triggers an empty-state indicator when the value is null. */
  required?: boolean;
  /** Maximum number of characters allowed; enforced when `counter` is true. */
  maxLength?: number;
};

/**
 * A TanStack Form-connected multi-line textarea field with optional character counter,
 * error display, and submission-state feedback. Wrapped in `React.memo` to prevent
 * unnecessary re-renders.
 *
 * @example
 * import { TextareaField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="bio">
 *   {() => (
 *     <TextareaField
 *       label="Bio"
 *       placeholder="Tell us about yourself…"
 *       counter
 *       maxLength={200}
 *     />
 *   )}
 * </form.Field>
 */
export const TextareaField: React.FC<Props> = memo(
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
    maxLength,
  }) => {
    const id = useId();
    const { form, state, name, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

    const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

    const _count = state.value ? state.value.length : 0;

    const _countText = useMemo(() => {
      if (!counter) return '';
      const unit = `character${[0, 1].includes(_count) ? '' : 's'}`;
      if (counter && maxLength) return `${_count} / ${maxLength} character${!_count ? '' : 's'}`;
      return `${_count} ${unit}`;
    }, [_count, counter, maxLength]);

    const _invalid = state.meta.isDirty && state.meta.isTouched && !state.meta.isValid;
    const _isEmpty = required && state.value === null;
    const _errors = state.meta.errors;

    const _isNearLimit = maxLength && _count >= maxLength * 0.8;
    const _isAtLimit = maxLength && _count >= maxLength;

    const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
      ({ target: { value } }) => {
        if (isSubmitting) return;
        if (counter && maxLength && value.length > maxLength) return;
        handleChange(value || null);
      },
      [isSubmitting, counter, maxLength, handleChange]
    );

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
              value={state.value === null ? '' : state.value}
              aria-invalid={_invalid}
              autoCapitalize="none"
              autoComplete="off"
              placeholder={placeholder}
              className={cn(isSubmitting && 'pointer-events-none bg-muted-muted opacity-60')}
              onChange={onChange}
              onBlur={handleBlur}
            />
            {isSubmitting && (
              <div className="absolute inset-e-2 inset-y-0 top-2.5 text-muted-weak">
                <Loader2Icon size={14} className="animate-spin text-primary-strong" />
              </div>
            )}
            {state.meta.isDirty && showErrorMessage && !!_errors.length && (
              <div className="absolute inset-e-2 inset-y-0 top-2.5 text-danger-strong">
                <BanIcon size={14} />
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
  }
);
TextareaField.displayName = 'TextareaField';
