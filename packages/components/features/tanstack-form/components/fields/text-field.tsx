import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { Loader2Icon, XIcon } from 'lucide-react';

import type { TFormBuilderTextFieldSchema } from '@/components/features/form-builders/schema';

import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Input } from '../ui/input';

export const TextField: React.FC<
  Pick<TFormBuilderTextFieldSchema, 'label' | 'description' | 'placeholder' | 'orientation' | 'showCharacterCount' | 'showClearButton' | 'showErrorMessage'> & {
    maxLength: number | null;
  }
> = ({ label, description, orientation, placeholder, maxLength, showClearButton, showCharacterCount, showErrorMessage }) => {
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _showClearButton = useMemo(() => {
    return showClearButton && !isSubmitting;
  }, [showClearButton, isSubmitting]);

  const _count = useMemo(() => {
    return state.value ? state.value.length : 0;
  }, [state.value]);

  const _countText = useMemo(() => {
    const unit = `character${[0, 1].includes(_count) ? '' : 's'}`;
    if (maxLength) {
      return `${_count} / ${maxLength} ${unit}`;
    }
    return `${_count} ${unit}`;
  }, [_count, maxLength]);

  const _invalid = useMemo(() => {
    return state.meta.isTouched && !state.meta.isValid;
  }, [state.meta.isTouched, state.meta.isValid]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      if (maxLength && value.length > maxLength) return;
      handleChange(value);
    },
    [isSubmitting, maxLength, handleChange]
  );

  return (
    <FieldGroup className="gap-y-4 px-4">
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
            aria-invalid={_invalid}
            autoComplete="off"
            placeholder={placeholder}
            className="rounded!"
            onBlur={handleBlur}
            onChange={onChange}
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
            {showCharacterCount && <p className="text-end text-text-positive-weak text-xs tabular-nums leading-3.5">{_countText}</p>}
            {showErrorMessage && <FieldError errors={state.meta.errors} />}
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
