'use client';

import { useStore } from '@tanstack/react-form';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { useTanStackFieldContext } from '../form-context';
import { FieldError } from '../ui/field';

type Props = {
  /** Field label rendered above the control. Omit to render label-less. */
  label?: string;
  /** When `true`, appends a required asterisk to the label. */
  required?: boolean;
  /** When `true`, disables the control. Also disabled automatically while the form is submitting. */
  disabled?: boolean;
  /** Choices to pick from. */
  options: Array<{ value: string; label: string }>;
  /**
   * Lay the options out in a column or a row.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Minimal radio group bound to the surrounding `AppField`. Use it for compact forms; the
 * non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { shipping: null as string | null } });
 *
 * <form.AppField name="shipping" children={({ SimpleRadioGroupField }) => <SimpleRadioGroupField label="Hình thức giao" options={shippingOptions} orientation="horizontal" />} />
 * ```
 */
export const SimpleRadioGroupField: React.FC<Props> = ({ label, required, disabled, options, orientation = 'vertical' }) => {
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isTouched && !state.meta.isValid;
  const isDisabled = disabled || isSubmitting;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label>
          {label}
          {required && <span className="text-danger-strong">*</span>}
        </Label>
      )}
      <RadioGroup
        name={name}
        value={state.value ?? ''}
        disabled={isDisabled}
        aria-invalid={_invalid}
        className={orientation === 'horizontal' ? 'flex flex-row flex-wrap gap-x-4 gap-y-2' : 'flex flex-col gap-2'}
        onValueChange={handleChange}
        onBlur={handleBlur}
      >
        {options.map(option => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem id={`${name}-${option.value}`} value={option.value} />
            <Label htmlFor={`${name}-${option.value}`} className="cursor-pointer font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
