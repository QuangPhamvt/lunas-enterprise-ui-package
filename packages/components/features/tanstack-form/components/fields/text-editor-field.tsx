'use client';

import { lazy, memo, Suspense, useCallback } from 'react';

import { useStore } from '@tanstack/react-form';

import { Skeleton } from '@/components/ui/skeleton';

import type { TextEditorFieldProps as Props } from '../../types';
import { useTanStackFieldContext } from '../form-context';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldNote, FieldSeparator, FieldTooltip } from '../ui/field';

/**
 * Loaded on demand: the editor pulls in tiptap + lowlight, and every consumer of
 * `features/tanstack-form` would otherwise pay for it even on forms with no rich-text field.
 */
const TextEditor = lazy(() => import('@/components/features/text-editor').then(m => ({ default: m.TextEditor })));

/**
 * A TanStack Form-connected rich-text field: label, description, tooltip and validation error
 * around a lazily loaded `TextEditor`. Stores the editor's sanitized HTML.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { content: null as string | null } });
 *
 * <form.AppField
 *   name="content"
 *   children={({ TextEditorField }) => (
 *     <TextEditorField label="Nội dung" maxLength={5000} enableImage onImageUpload={uploadImage} />
 *   )}
 * />
 * ```
 */
export const TextEditorField: React.FC<Props> = memo(
  ({
    label,
    description,
    placeholder,
    tooltip,
    helperText,
    showErrorMessage = true,
    required = false,
    maxLength,
    showCharacterCount,
    enableLink,
    enableBubbleMenu,
    enableTaskList,
    enableHighlight,
    enableColor,
    enableImage,
    enableTable,
    enableSlashCommand,
    onImageUpload,
    variant,
    size,
  }) => {
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
          <Suspense fallback={<Skeleton data-slot="text-editor-skeleton" className="h-40 w-full rounded-md" />}>
            <TextEditor
              value={state.value ?? ''}
              placeholder={placeholder}
              readOnly={isSubmitting}
              onChange={onChange}
              maxLength={maxLength}
              showCharacterCount={showCharacterCount}
              enableLink={enableLink}
              enableBubbleMenu={enableBubbleMenu}
              enableTaskList={enableTaskList}
              enableHighlight={enableHighlight}
              enableColor={enableColor}
              enableImage={enableImage}
              enableTable={enableTable}
              enableSlashCommand={enableSlashCommand}
              onImageUpload={onImageUpload}
              variant={variant}
              size={size}
            />
          </Suspense>
          {state.meta.isDirty && showErrorMessage && !!state.meta.errors.length && <FieldError errors={state.meta.errors} />}
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    );
  }
);
TextEditorField.displayName = 'TextEditorField';
