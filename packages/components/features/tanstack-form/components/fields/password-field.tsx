import { useCallback, useMemo, useState } from 'react';

import { useStore } from '@tanstack/react-form';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import type z from 'zod';

import { Input } from '@/components/ui/input';

import type { TanStackFormPasswordFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldNote } from '../ui/field';

type Props = Pick<
  z.input<typeof TanStackFormPasswordFieldSchema>,
  'label' | 'description' | 'placeholder' | 'orientation' | 'tooltip' | 'helperText' | 'showErrorMessage'
>;
export const PasswordField: React.FC<Props> = ({ label, description, placeholder, orientation = 'responsive', helperText, showErrorMessage = true }) => {
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const _invalid = useMemo(() => {
    return state.meta.isDirty && state.meta.isTouched && !state.meta.isValid;
  }, [state.meta.isDirty, state.meta.isTouched, state.meta.isValid]);

  const toggleVisibility = useCallback(() => setIsVisible(prevState => !prevState), []);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (isSubmitting) return;
      handleChange(value || null);
    },
    [isSubmitting, handleChange]
  );

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field data-invalid={_invalid} orientation={orientation}>
        <FieldContent>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          <Input
            id={name}
            type={isVisible ? 'text' : 'password'}
            placeholder={placeholder}
            value={state.value ?? ''}
            aria-invalid={_invalid}
            autoComplete="new-password"
            onBlur={handleBlur}
            onChange={onChange}
          />

          <button
            className="absolute inset-e-0 inset-y-0 flex size-9 items-center justify-center rounded-e-md text-muted outline-none transition-[color,box-shadow] focus:z-10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
          </button>

          <div className="mt-1 flex w-full items-start justify-start">
            {showErrorMessage && state.meta.isDirty && <FieldError errors={state.meta.errors} />}
          </div>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
    </FieldGroup>
  );
};
