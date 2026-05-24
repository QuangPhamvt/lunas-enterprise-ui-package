'use client';

import { cn } from '@customafk/react-toolkit/utils';
import { type Label as LabelPrimitive, Slot as SlotPrimitive } from 'radix-ui';
import { createContext, memo, use, useId } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, FormProvider, useFormContext, useFormState } from 'react-hook-form';
import { Field, FieldDescription, FieldLabel } from './field';

/**
 * Re-export of react-hook-form's `FormProvider`; wrap your form with this to give all nested form components access to the form context.
 *
 * @example
 * ```tsx
 * import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@customafk/lunas-ui/ui/form';
 * import { useForm } from 'react-hook-form';
 *
 * const form = useForm<{ username: string }>();
 *
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField
 *       control={form.control}
 *       name="username"
 *       render={({ field }) => (
 *         <FormItem>
 *           <FormLabel>Username</FormLabel>
 *           <FormControl><input {...field} /></FormControl>
 *           <FormMessage />
 *         </FormItem>
 *       )}
 *     />
 *   </form>
 * </Form>
 * ```
 */
const Form = FormProvider;

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

/**
 * Connects a single react-hook-form field to the form context; renders a `Controller` and passes `name` down to nested FormItem, FormLabel, FormControl, and FormMessage.
 */
const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * Hook that returns the field state and IDs for the enclosing FormField.
 * Must be called inside a component rendered within a `<FormField>`.
 */
const useFormField = () => {
  const fieldContext = use(FormFieldContext);
  const itemContext = use(FormItemContext);
  const { getFieldState, control, resetField } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    control,
    resetField,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

/**
 * Container for a single form field — generates a unique ID and provides it via context to FormLabel, FormControl, and FormMessage.
 *
 * @param orientation - Layout direction: `'vertical'`, `'horizontal'`, or `'responsive'` (default).
 */
const FormItem = memo(
  ({
    className,
    orientation = 'responsive',
    ...props
  }: React.ComponentProps<'div'> & {
    orientation?: 'vertical' | 'horizontal' | 'responsive';
  }) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <Field orientation={orientation} {...props} className={className} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = 'FormItem';

/** Styled label automatically associated with the FormItem's control via `htmlFor`. */
const FormLabel = memo(({ ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  const { formItemId } = useFormField();
  return <FieldLabel htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = 'FormLabel';

/** Radix Slot wrapper that wires the correct `id`, `aria-describedby`, and `aria-invalid` attributes onto the underlying control element. */
const FormControl = memo(({ ...props }: React.ComponentProps<typeof SlotPrimitive.Slot>) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <SlotPrimitive.Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

/** Helper text displayed below the control that provides additional context about the field. */
function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <FieldDescription
      id={formDescriptionId}
      className={cn(
        'text-text-positive-weak text-sm/6 leading-normal font-normal',
        'group-has-data-[orientation=horizontal]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

/** Displays the validation error message for the field, or falls back to `children` when there is no error. */
function FormMessage({ className, children, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();

  return (
    <span data-slot="form-message" id={formMessageId} className={cn('text-danger text-xs', className)} {...props}>
      {error ? String(error?.message ?? '') : children}
    </span>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField };
