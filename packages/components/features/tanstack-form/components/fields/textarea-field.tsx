import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon } from 'lucide-react';
import type z from 'zod';

import type { TanStackFormTextAreaFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Textarea } from '../ui/textarea';

type Props = Pick<
  z.input<typeof TanStackFormTextAreaFieldSchema>,
  'label' | 'description' | 'placeholder' | 'counter' | 'tooltip' | 'helperText' | 'orientation' | 'showErrorMessage'
> & {
  required?: boolean;
};

export const TextareaField: React.FC<Props> = ({
  label,
  description,
  placeholder,

  required = false,
  counter,
  // tooltip,
  helperText,
  orientation = 'responsive',
  showErrorMessage = true,
}) => {
  const { form, state, name, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _count = useMemo(() => {
    return state.value ? state.value.length : 0;
  }, [state.value]);

  const _countText = useMemo(() => {
    const unit = `character${[0, 1].includes(_count) ? '' : 's'}`;
    if (counter?.max) return `${_count} / ${counter.max} ${unit}`;
    return `${_count} ${unit}`;
  }, [_count, counter?.max]);

  const _invalid = useMemo(() => {
    return state.meta.isTouched && !state.meta.isValid;
  }, [state.meta.isTouched, state.meta.isValid]);

  const _errors = useMemo(() => {
    return state.meta.errors;
  }, [state.meta.errors]);

  const _isEmpty = useMemo(() => {
    if (required) return state.value === null;
    return false;
  }, [required, state.value]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      if (counter?.max && value.length > counter.max) return;
      handleChange(value || null);
    },
    [isSubmitting, counter?.max, handleChange]
  );

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} data-invalid={_invalid}>
        <FieldContent>
          <FieldLabel aria-required={_isEmpty} htmlFor={name}>
            {label}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Textarea
            id={name}
            name={name}
            value={state.value === null ? '' : state.value}
            aria-invalid={_invalid}
            autoComplete="off"
            placeholder={placeholder}
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
            {!!counter && <p className="text-end text-text-positive-weak text-xs">{_countText}</p>}
          </div>
          {!!helperText && (
            <div className="mt-1 text-wrap rounded bg-primary-bg-subtle p-2 text-text-positive-weak text-xs">
              <p>{helperText}</p>
            </div>
          )}
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
