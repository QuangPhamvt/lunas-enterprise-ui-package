import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon } from 'lucide-react';
import type z from 'zod';

import { cn } from '@customafk/react-toolkit/utils';

import type { TanStackFormTextAreaFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldNote, FieldSeparator } from '../ui/field';
import { Textarea } from '@/components/ui/textarea';

type Props = Pick<
  z.input<typeof TanStackFormTextAreaFieldSchema>,
  'label' | 'description' | 'placeholder' | 'counter' | 'tooltip' | 'helperText' | 'orientation' | 'showErrorMessage'
> & {
  required?: boolean;
  maxLength?: number;
};

export const TextareaField: React.FC<Props> = ({
  label,
  description,
  placeholder,

  // tooltip,
  helperText,
  counter = false,
  orientation = 'responsive',
  showErrorMessage = true,

  required = false,
  maxLength,
}) => {
  const { form, state, name, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _count = useMemo(() => {
    return state.value ? state.value.length : 0;
  }, [state.value]);

  const _countText = useMemo(() => {
    if (!counter) return '';
    const unit = `character${[0, 1].includes(_count) ? '' : 's'}`;
    if (counter && maxLength) return `${_count} / ${maxLength} ${unit}`;
    return `${_count} ${unit}`;
  }, [_count, counter, maxLength]);

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
      if (counter && maxLength && value.length > maxLength) return;
      handleChange(value || null);
    },
    [isSubmitting, counter, maxLength, handleChange]
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
            className={cn(isSubmitting && 'pointer-events-none bg-muted-muted opacity-60')}
            onChange={onChange}
            onBlur={handleBlur}
          />
          {isSubmitting && (
            <div className="absolute inset-y-0 inset-e-2 top-2.5 text-muted-weak">
              <Loader2Icon size={14} className="animate-spin text-primary-strong" />
            </div>
          )}
          {showErrorMessage && !!_errors.length && (
            <div className="absolute inset-y-0 inset-e-2 top-2.5 text-danger-strong">
              <BanIcon size={14} />
            </div>
          )}
          <div className="mt-1 flex w-full items-start gap-x-2">
            {showErrorMessage && <FieldError className="flex-1" errors={_errors} />}
            {!!counter && <p className="h-4 flex-0 text-nowrap text-end text-text-positive-weak text-xs tabular-nums">{_countText}</p>}
          </div>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
