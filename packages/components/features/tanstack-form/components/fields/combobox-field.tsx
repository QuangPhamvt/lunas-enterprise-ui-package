import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import type { FormBuilderComboboxField } from '@/components/features/form-builders/types';

import { useTanStackFieldContext } from '../../tanstack-form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export const ComboboxField: React.FC<Pick<FormBuilderComboboxField, 'label' | 'description' | 'placeholder' | 'orientation' | 'options'>> = ({
  label,
  description,
  placeholder,
  orientation,

  options,
}) => {
  const field = useTanStackFieldContext<string | null>();

  const _isInvalid = useMemo(() => {
    return field.state.meta.isTouched && !field.state.meta.isValid;
  }, [field.state.meta.isTouched, field.state.meta.isValid]);

  const _errors = useMemo(() => {
    return field.state.meta.errors;
  }, [field.state.meta.errors]);

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} data-invalid={_isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain className="flex justify-end">
          <div className="flex w-full max-w-60 flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  color="muted"
                  size="lg"
                  className={cn(
                    'flex items-center justify-start rounded outline-border',
                    'hover:bg-transparent',
                    'focus:outline-1 focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak',
                    'data-[state=open]:text-text-positive-muted data-[state=open]:outline-1 data-[state=open]:outline-primary-strong data-[state=open]:ring-4 data-[state=open]:ring-primary-weak',
                    field.state.value === null && 'text-text-positive-muted'
                  )}
                >
                  {!!field.state.value && (
                    <p className="flex min-w-0 flex-1 items-center gap-2 text-start">{options?.find(({ value }) => value === field.state.value)?.label}</p>
                  )}
                  {!field.state.value && <p className="flex-1 text-start text-text-positive-muted">{placeholder}</p>}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" side="bottom" className="flex w-fit rounded p-0" onBlur={field.handleBlur}>
                <Command className="border-none">
                  <CommandInput placeholder={placeholder ?? 'Tìm kiếm'} />
                  <CommandList>
                    <CommandGroup className="max-h-40 overflow-y-auto">
                      {options.map(({ value, label }) => (
                        <CommandItem key={value} value={label} onSelect={() => field.handleChange(value)}>
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                  <CommandEmpty>Không có kết quả</CommandEmpty>
                </Command>
              </PopoverContent>
            </Popover>

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
