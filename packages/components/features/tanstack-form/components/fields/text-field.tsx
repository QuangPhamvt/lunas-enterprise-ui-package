import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { BanIcon, Loader2Icon, XIcon } from 'lucide-react';
import type z from 'zod';

import { cn } from '@customafk/react-toolkit/utils';

import type { TanStackFormTextFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldNote, FieldSeparator } from '../ui/field';
import { Input } from '../ui/input';

type Props = Pick<
  z.input<typeof TanStackFormTextFieldSchema>,
  'label' | 'description' | 'placeholder' | 'orientation' | 'counter' | 'tooltip' | 'helperText' | 'showClearButton' | 'showErrorMessage'
> & {
  required?: boolean;
  maxLength?: number;
};

export const TextField: React.FC<Props> = ({
  label,
  description,
  placeholder,

  counter = false,
  // tooltip,
  helperText,
  orientation = 'responsive',
  showClearButton = false,
  showErrorMessage = true,

  required = false,
  maxLength,
}) => {
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _showClearButton = useMemo(() => {
    return showClearButton && !isSubmitting;
  }, [showClearButton, isSubmitting]);

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

  const _isEmpty = useMemo(() => {
    if (required) return state.value === null;
    return false;
  }, [required, state.value]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      if (counter && maxLength && value.length > maxLength) return;
      handleChange(value || null);
    },
    [isSubmitting, counter, maxLength, handleChange]
  );

  const onClear = useCallback(() => {
    if (isSubmitting) return;
    handleChange('');
  }, [isSubmitting, handleChange]);

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation} data-invalid={_invalid}>
        <FieldContent>
          <FieldLabel aria-required={_isEmpty} htmlFor={name}>
            {label}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Input
            id={name}
            name={name}
            value={state.value === null ? '' : state.value}
            aria-invalid={_invalid}
            autoComplete="off"
            placeholder={placeholder}
            className={cn(isSubmitting && 'pointer-events-none bg-muted-muted opacity-60')}
            onBlur={handleBlur}
            onChange={onChange}
          />
          {_showClearButton && !state.meta.errors.length && (
            <button
              type="button"
              aria-label="Clear"
              className="absolute inset-y-0 end-0 top-3 flex h-fit w-8 cursor-pointer items-center justify-center rounded-e-md text-text-positive-weak outline-none transition-[color,box-shadow] hover:text-text-positive focus:text-text-positive-strong"
              onClick={onClear}
            >
              <XIcon size={14} aria-hidden="true" />
            </button>
          )}
          {isSubmitting && (
            <div className="absolute inset-y-0 end-2 top-2.5 text-muted-weak">
              <Loader2Icon size={14} className="animate-spin text-primary-strong" />
            </div>
          )}
          {showErrorMessage && !!state.meta.errors.length && (
            <div className="absolute inset-y-0 end-2 top-2.5 text-danger-strong">
              <BanIcon size={14} />
            </div>
          )}
          <div className="mt-1 flex w-full items-start justify-end *:basis-1/2">
            {showErrorMessage && <FieldError errors={state.meta.errors} />}
            {!!counter && <p className="text-end text-text-positive-weak text-xs tabular-nums leading-3.5">{_countText}</p>}
          </div>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
