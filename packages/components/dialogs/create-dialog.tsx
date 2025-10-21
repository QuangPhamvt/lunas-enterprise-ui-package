import { useCallback } from 'react';
import { useForm } from '@tanstack/react-form';
import { cn } from '@customafk/react-toolkit/utils';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type Props = {
  open?: boolean;
  label: string;
  description?: string;
  nameLabel?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (values: { name: string }) => Promise<void>;
};
export const CreateDialog: React.FC<Props> = ({
  open,
  label,
  description,
  nameLabel = 'Name',
  placeholder,
  minLength = 0,
  maxLength,
  onOpenChange,
  onSubmit,
}) => {
  const {
    Subscribe,
    Field: FormField,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: async values => {
      try {
        await onSubmit?.({ name: values.value.name.trim() });
        reset();
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    },
  });
  const handleInteractOutside = useCallback((event: CustomEvent<{ originalEvent: PointerEvent | FocusEvent }>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 border-none p-0" onInteractOutside={handleInteractOutside}>
        <DialogHeader className="border-border-weak flex-0 gap-2 border-b p-6 pb-4">
          <DialogTitle>{label || 'Create Entity'}</DialogTitle>
          <DialogDescription>{description || 'This is a create dialog where you can add your form elements.'}</DialogDescription>
        </DialogHeader>
        <div className="bg-muted-muted size-full p-2">
          <main className="bg-card shadow-card size-full flex-1 overflow-y-auto rounded-md p-4">
            <FormField
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (maxLength && value.length >= maxLength) {
                    return `${nameLabel} must be at most ${maxLength} characters`;
                  }
                },
                onSubmit: ({ value }) => {
                  if (!value.trim().length) {
                    return `${nameLabel} is required`;
                  }
                  if (value.trim().length < minLength) {
                    return `${nameLabel} must be at least ${minLength} characters`;
                  }
                  if (maxLength && value.trim().length > maxLength) {
                    return `${nameLabel} must be at most ${maxLength} characters`;
                  }
                },
              }}
              children={({ state, name, handleChange, handleBlur }) => {
                return (
                  <FieldGroup>
                    <Field orientation="vertical" className="gap-1" data-invalid={state.meta.isTouched && !state.meta.isValid}>
                      <FieldContent>
                        <FieldLabel htmlFor={name}>{nameLabel}</FieldLabel>
                      </FieldContent>
                      <div className="flex flex-col space-y-0.5">
                        <Input
                          id={name}
                          name={name}
                          value={state.value}
                          autoComplete="off"
                          aria-invalid={state.meta.isTouched && !state.meta.isValid}
                          placeholder={placeholder}
                          onBlur={handleBlur}
                          onChange={e => handleChange(e.target.value)}
                        />
                        <p
                          className={cn(
                            'text-text-positive-weak text-end text-xs',
                            maxLength !== undefined &&
                              state.value.length !== undefined &&
                              maxLength >= 10 &&
                              state.value.length >= maxLength - 10 &&
                              'text-warning',
                            maxLength !== undefined && state.value.length !== undefined && state.value.length >= maxLength && 'text-danger'
                          )}
                        >
                          {state.value.length ?? 0} Characters
                        </p>
                        <FieldError errors={state.meta.errors as any[]} />
                      </div>
                    </Field>
                  </FieldGroup>
                );
              }}
            />
          </main>
        </div>
        <DialogFooter className="border-border-weak border-t p-6 pt-4">
          <Subscribe
            selector={state => ({
              isSubmitting: state.isSubmitting,
              isDisabled: !state.isFormValid,
            })}
            children={({ isDisabled, isSubmitting }) => (
              <Button disabled={isDisabled} isLoading={isSubmitting} className="w-32" onClick={handleSubmit}>
                Create
              </Button>
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
