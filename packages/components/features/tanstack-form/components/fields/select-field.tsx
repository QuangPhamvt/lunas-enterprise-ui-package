import { useMemo } from 'react';

import { PackagePlusIcon } from 'lucide-react';
import type z from 'zod';

import type { TanStackFormSelectFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldNote, FieldSeparator } from '../ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = Pick<
  z.input<typeof TanStackFormSelectFieldSchema>,
  'label' | 'description' | 'placeholder' | 'defaultValue' | 'options' | 'tooltip' | 'helperText' | 'orientation' | 'clearable'
> & {
  required?: boolean;
};

export const SelectField: React.FC<Props> = ({
  label,
  description,
  placeholder,

  orientation = 'responsive',

  options,
  helperText,
  required = false,
}) => {
  const field = useTanStackFieldContext<string | null>();

  const _isInvalid = useMemo(() => {
    return field.state.meta.isTouched && !field.state.meta.isValid;
  }, [field.state.meta.isTouched, field.state.meta.isValid]);

  const _isEmpty = useMemo(() => {
    if (required) return field.state.value === null;
    return false;
  }, [required, field.state.value]);

  const _errors = useMemo(() => {
    return field.state.meta.errors;
  }, [field.state.meta.errors]);

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation} data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name} aria-required={_isEmpty}>
            {label}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain className="flex flex-col">
          <Select defaultValue={field.state.value ?? undefined} onValueChange={field.handleChange}>
            <SelectTrigger aria-invalid={_isInvalid ? 'true' : undefined} onBlur={field.handleBlur}>
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

          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
