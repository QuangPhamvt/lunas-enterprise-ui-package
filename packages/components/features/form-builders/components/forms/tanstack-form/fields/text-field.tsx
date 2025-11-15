import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';
import { Loader2Icon, XIcon } from 'lucide-react';

import type { FormBuilderTextField } from '@/components/features/form-builders/types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../../../../components/ui/fields';
import { Input } from '../../../ui/input';
import { useFieldContext } from '../tanstack-form';

export const TextField: React.FC<
  Pick<FormBuilderTextField, 'label' | 'description' | 'orientation' | 'placeholder' | 'showCharacterCount' | 'showClearButton' | 'showErrorMessage'> & {
    maxLength?: number;
  }
> = ({ label, description, orientation, placeholder, maxLength, showClearButton, showCharacterCount, showErrorMessage }) => {
  const { form, name, state, handleBlur, handleChange } = useFieldContext<string>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _showClearButton = useMemo(() => {
    return showClearButton && !isSubmitting;
  }, [showClearButton, isSubmitting]);

  const _count = useMemo(() => {
    return state.value ? state.value.length : 0;
  }, [state.value]);

  const _countText = useMemo(() => {
    if (maxLength) {
      return `${_count} / ${maxLength} character${_count === 1 || _count === 0 ? '' : 's'}`;
    }
    return `${_count} character${_count === 1 || _count === 0 ? '' : 's'}`;
  }, [_count, maxLength]);

  const _errors = useMemo(() => {
    return state.meta.errors;
  }, [state.meta.errors]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      if (isSubmitting) return;
      if (maxLength && event.target.value.length > maxLength) {
        return;
      }
      handleChange(event.target.value);
    },
    [isSubmitting, maxLength, handleChange]
  );

  return (
    <FieldGroup>
      <Field orientation={orientation} data-invalid={state.meta.isTouched && !state.meta.isValid}>
        <FieldContent>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Input
            id={name}
            name={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            autoComplete="off"
            placeholder={placeholder}
            className="rounded!"
            onChange={onChange}
            onBlur={handleBlur}
          />
          {_showClearButton && (
            <button className="absolute inset-y-0 end-0 top-3 flex h-fit w-8 cursor-pointer items-center justify-center rounded-e-md text-text-positive-weak outline-none transition-[color,box-shadow] hover:text-text-positive focus:z-10 focus-visible:ring-2 focus-visible:ring-border">
              <XIcon size={14} aria-hidden="true" />
            </button>
          )}
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
