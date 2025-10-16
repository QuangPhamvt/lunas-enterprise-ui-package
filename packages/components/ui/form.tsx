'use client';
import { createContext, useContext, useId } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, FormProvider, useFormContext, useFormState } from 'react-hook-form';

import { cn } from '@customafk/react-toolkit/utils';

import { type Label as LabelPrimitive, Slot as SlotPrimitive } from 'radix-ui';
import { Field, FieldDescription, FieldLabel } from './field';

const Form = FormProvider;

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
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

function FormItem({
  className,
  orientation = 'responsive',
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: 'vertical' | 'horizontal' | 'responsive';
}) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <Field orientation={orientation} {...props} className={className} />
    </FormItemContext.Provider>
  );
}

function FormLabel({ ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { formItemId } = useFormField();
  return <FieldLabel htmlFor={formItemId} {...props} />;
}

function FormControl({ ...props }: React.ComponentProps<typeof SlotPrimitive.Slot>) {
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
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <FieldDescription
      id={formDescriptionId}
      className={cn(
        'text-text-positive-weak text-sm/6 leading-normal font-normal',
        'group-has-[[data-orientation=horizontal]]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

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
