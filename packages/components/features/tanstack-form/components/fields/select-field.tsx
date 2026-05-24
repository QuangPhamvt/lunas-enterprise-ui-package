'use client';

import { PackagePlusIcon } from 'lucide-react';
import type z from 'zod';

import type { TanStackFormSelectFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import {
  Field,
  FieldContent,
  FieldContentMain,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldNote,
  FieldSeparator,
  FieldTooltip,
} from '../ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * Props for the SelectField component, derived from the TanStack Form select field schema.
 */
type Props = Pick<
  z.input<typeof TanStackFormSelectFieldSchema>,
  'label' | 'description' | 'placeholder' | 'defaultValue' | 'options' | 'tooltip' | 'helperText' | 'orientation' | 'clearable'
> & {
  /** Marks the field as required; triggers an empty-state indicator when the value is null. */
  required?: boolean;
};

/**
 * A TanStack Form-connected single-select dropdown field backed by Radix UI Select,
 * with an empty-state illustration when no options are provided.
 *
 * @example
 * import { SelectField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="country">
 *   {() => (
 *     <SelectField
 *       label="Country"
 *       placeholder="Select a country"
 *       options={[
 *         { value: 'jp', label: 'Japan' },
 *         { value: 'vn', label: 'Vietnam' },
 *       ]}
 *       required
 *     />
 *   )}
 * </form.Field>
 */
export const SelectField: React.FC<Props> = ({
  label,
  description,
  placeholder,

  orientation = 'responsive',

  tooltip,
  options,
  helperText,
  required = false,
}) => {
  const field = useTanStackFieldContext<string | null>();

  const _isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const _isEmpty = required && field.state.value === null;
  const _errors = field.state.meta.errors;

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation} data-invalid={_isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name} aria-required={_isEmpty}>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain className="flex flex-col">
          <Select value={field.state.value ?? ''} onValueChange={field.handleChange}>
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
