'use client';

import { useCallback, useId } from 'react';

import { useStore } from '@tanstack/react-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useTanStackFieldContext } from '../form-context';
import { FieldError } from '../ui/field';

type Props = {
  /** Field label rendered above the control. Omit to render label-less. */
  label?: string;
  /** When `true`, appends a required asterisk to the label. */
  required?: boolean;
  /** When `true`, disables the control. Also disabled automatically while the form is submitting. */
  disabled?: boolean;
  /**
   * Render a checkbox or a switch.
   * @default 'checkbox'
   */
  variant?: 'checkbox' | 'switch';
};

/**
 * Minimal boolean field — a checkbox or switch bound to the surrounding `AppField`, with its label
 * and error. Use it for compact forms; the non-`Simple` variants add description, tooltip,
 * orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { notify: null as boolean | null } });
 *
 * <form.AppField name="notify" children={({ SimpleBooleanField }) => <SimpleBooleanField label="Nhận thông báo qua email" variant="switch" />} />
 * ```
 */
export const SimpleBooleanField: React.FC<Props> = ({ label, required, disabled, variant = 'checkbox' }) => {
  const id = useId();
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<boolean | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isTouched && !state.meta.isValid;
  const checked = state.value ?? false;
  const isDisabled = disabled || isSubmitting;

  const onCheckedChange = useCallback(
    (value: boolean) => {
      if (isSubmitting) return;
      handleChange(value);
    },
    [isSubmitting, handleChange]
  );

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 h-9">
        {variant === 'switch' ? (
          <Switch id={id} name={name} checked={checked} disabled={isDisabled} aria-invalid={_invalid} onBlur={handleBlur} onCheckedChange={onCheckedChange} />
        ) : (
          <Checkbox id={id} name={name} checked={checked} disabled={isDisabled} aria-invalid={_invalid} onBlur={handleBlur} onCheckedChange={onCheckedChange} />
        )}
        {label && (
          <Label htmlFor={id} className="cursor-pointer">
            {label}
            {required && <span className="text-danger-strong">*</span>}
          </Label>
        )}
      </div>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
