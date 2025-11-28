import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { Loader2Icon } from 'lucide-react';

import type { TFormBuilderTextAreaFieldSchema } from '@/components/features/form-builders/schema';

import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Textarea } from '../ui/textarea';

export const TextareaField: React.FC<
  Pick<TFormBuilderTextAreaFieldSchema, 'label' | 'description' | 'placeholder' | 'orientation' | 'rows' | 'showCharacterCount' | 'showErrorMessage'> & {
    maxLength: number | null;
  }
> = ({ label, description, placeholder, orientation, maxLength, rows, showCharacterCount, showErrorMessage }) => {
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
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
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
            className="rounded!"
            onChange={onChange}
            onBlur={handleBlur}
          />
          {isSubmitting && (
            <div className="absolute inset-y-0 end-2 top-2.5 text-muted-weak">
              <Loader2Icon size={14} className="animate-spin" />
            </div>
          )}
          <div className="mt-1 flex w-full flex-col items-end justify-end">
            {showCharacterCount && <p className="text-end text-text-positive-weak text-xs">{_countText}</p>}
            {showErrorMessage && <FieldError errors={_errors} />}
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
