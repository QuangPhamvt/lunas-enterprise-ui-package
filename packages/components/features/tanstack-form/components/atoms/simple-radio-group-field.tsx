'use client';

import { useStore } from '@tanstack/react-form';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { useTanStackFieldContext } from '../form-context';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  options: Array<{ value: string; label: string }>;
  orientation?: 'horizontal' | 'vertical';
};

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
