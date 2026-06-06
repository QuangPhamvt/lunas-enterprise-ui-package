'use client';

import { memo, useCallback } from 'react';

import { useStore } from '@tanstack/react-form';

import type z from 'zod';

import { TextEditor } from '@/components/features/text-editor';

import type { TanStackFormTextEditorFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldNote, FieldSeparator, FieldTooltip } from '../ui/field';

type Props = Pick<
  z.input<typeof TanStackFormTextEditorFieldSchema>,
  'label' | 'description' | 'placeholder' | 'tooltip' | 'helperText' | 'showErrorMessage'
> & {
  required?: boolean;
};

export const TextEditorField: React.FC<Props> = memo(({ label, description, placeholder, tooltip, helperText, showErrorMessage = true, required = false }) => {
  const { form, state, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useStore(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isDirty && state.meta.isTouched && !state.meta.isValid;
  const _isEmpty = required && state.value === null;

  const onChange = useCallback(
    (html: string) => {
      if (isSubmitting) return;
      handleChange(html || null);
    },
    [isSubmitting, handleChange]
  );

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation="vertical" data-invalid={_invalid}>
        <FieldContent>
          <FieldLabel aria-required={_isEmpty}>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <TextEditor value={state.value ?? ''} placeholder={placeholder} readOnly={isSubmitting} onChange={onChange} />
        {state.meta.isDirty && showErrorMessage && !!state.meta.errors.length && <FieldError errors={state.meta.errors} />}
        <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
});
TextEditorField.displayName = 'TextEditorField';
