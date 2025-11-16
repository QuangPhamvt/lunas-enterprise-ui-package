import { useMemo } from 'react';

import { PackagePlusIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import type { FormBuilderSelectField } from '@/components/features/form-builders/types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../../../ui/fields';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { useFieldContext } from '../tanstack-form';

export const SelectField: React.FC<Pick<FormBuilderSelectField, 'label' | 'description' | 'placeholder' | 'orientation' | 'options'>> = ({
  label,
  description,
  placeholder,
  orientation,

  options,
}) => {
  const field = useFieldContext<string | null>();

  const _isInvalid = useMemo(() => {
    return field.state.meta.isTouched && !field.state.meta.isValid;
  }, [field.state.meta.isTouched, field.state.meta.isValid]);

  const _errors = useMemo(() => {
    return field.state.meta.errors;
  }, [field.state.meta.errors]);

  return (
    <FieldGroup>
      <Field orientation={orientation} data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain className="flex justify-end">
          <div className="flex w-full max-w-60 flex-col">
            <Select defaultValue={field.state.value ?? undefined} onValueChange={field.handleChange}>
              <SelectTrigger
                className={cn(
                  'w-full',
                  _isInvalid && 'border-danger',
                  _isInvalid && 'data-[state=open]:ring-danger-weak',
                  _isInvalid && 'data-[state=open]:border-danger-strong',
                  _isInvalid && 'focus:ring-danger-weak',
                  _isInvalid && 'focus:border-danger-strong'
                )}
                onBlur={field.handleBlur}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {!!options.length &&
                  options.map(option => {
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                {!options.length && (
                  <div className="flex items-center justify-center gap-x-2 rounded border border-border bg-muted-muted px-4 py-6.5 text-center text-sm text-text-positive-weak">
                    <PackagePlusIcon strokeWidth={1} />
                    No options available
                  </div>
                )}
              </SelectContent>
            </Select>

            <div className="mt-1 flex w-full flex-col items-end justify-end">
              <FieldError errors={_errors} />
            </div>
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
