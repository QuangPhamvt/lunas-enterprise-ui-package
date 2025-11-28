import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon } from 'lucide-react';

import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Textarea } from '../ui/textarea';

type TextareaFieldProps = {
  label: string;
  description?: string;
  placeholder?: string;

  orientation?: 'horizontal' | 'vertical' | 'responsive';
  required?: boolean;
  rows?: number;
  maxLength?: number | undefined;

  showCharacterCount?: boolean;
  showErrorMessage?: boolean;
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  description,
  placeholder,
  orientation = 'responsive',
  required = false,
  maxLength,
  rows,
  showCharacterCount = false,
  showErrorMessage = true,
}) => {
  const { form, state, name, handleBlur, handleChange } = useTanStackFieldContext<string>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _count = useMemo(() => {
    return state.value ? state.value.length : 0;
  }, [state.value]);

  const _countText = useMemo(() => {
    const unit = `character${[0, 1].includes(_count) ? '' : 's'}`;
    if (maxLength) return `${_count} / ${maxLength} ${unit}`;
    return `${_count} ${unit}`;
  }, [_count, maxLength]);

  const _errors = useMemo(() => {
    return state.meta.errors;
  }, [state.meta.errors]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      if (maxLength && value.length > maxLength) return;
      handleChange(value);
    },
    [isSubmitting, maxLength, handleChange]
  );

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation}>
        <FieldContent>
          <FieldLabel aria-required={required} htmlFor={name}>
            {label}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Textarea
            id={name}
            name={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            autoComplete="off"
            placeholder={placeholder}
            rows={rows}
            onChange={onChange}
            onBlur={handleBlur}
          />
          {isSubmitting && (
            <div className="absolute inset-y-0 end-2 top-2.5 text-muted-weak">
              <Loader2Icon size={14} className="animate-spin text-primary-strong" />
            </div>
          )}
          {showErrorMessage && !!_errors.length && (
            <div className="absolute inset-y-0 end-2 top-2.5 text-danger-strong">
              <BanIcon size={14} />
            </div>
          )}
          <div className="mt-1 flex w-full items-start justify-end *:basis-1/2">
            {showErrorMessage && <FieldError errors={_errors} />}
            {showCharacterCount && <p className="text-end text-text-positive-weak text-xs">{_countText}</p>}
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
