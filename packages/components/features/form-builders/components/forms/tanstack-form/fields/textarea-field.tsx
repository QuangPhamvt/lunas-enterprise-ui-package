import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';
import { Loader2Icon } from 'lucide-react';

import type { FormBuilderTextareaField } from '@/components/features/form-builders/types';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../../fields';
import { useFieldContext } from '../tanstack-form';

export const TextareaField: React.FC<
  Pick<FormBuilderTextareaField, 'label' | 'description' | 'placeholder' | 'orientation' | 'rows' | 'showCharacterCount' | 'showErrorMessage'> & {
    maxLength?: number;
  }
> = ({ label, description, placeholder, orientation, maxLength, rows, showCharacterCount, showErrorMessage }) => {
  const field = useFieldContext<string>();

  const isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  const _count = useMemo(() => {
    return field.state.value ? field.state.value.length : 0;
  }, [field.state.value]);

  const _countText = useMemo(() => {
    if (maxLength) {
      return `${_count} / ${maxLength} character${_count === 1 || _count === 0 ? '' : 's'}`;
    }
    return `${_count} character${_count === 1 || _count === 0 ? '' : 's'}`;
  }, [_count, maxLength]);

  const _errors = useMemo(() => {
    return field.state.meta.errors;
  }, [field.state.meta.errors]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    event => {
      if (isSubmitting) return;
      if (maxLength && event.target.value.length > maxLength) {
        return;
      }
      field.handleChange(event.target.value);
    },
    [isSubmitting, maxLength, field.handleChange]
  );

  return (
    <FieldGroup>
      <Field orientation={orientation}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Textarea
            id={field.name}
            name={field.name}
            value={field.state.value}
            aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
            autoComplete="off"
            placeholder={placeholder}
            rows={rows}
            className="rounded!"
            onChange={onChange}
            onBlur={field.handleBlur}
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
