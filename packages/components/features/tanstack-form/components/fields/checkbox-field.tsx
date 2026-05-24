'use client';

import { useStore } from '@tanstack/react-form';

import type z from 'zod';

import type { TanStackFormCheckboxGroupFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldNote, FieldSeparator, FieldTooltip } from '../ui/field';
import { Checkbox } from '@/components/ui/checkbox';

/**
 * Props for the CheckboxField component, derived from the TanStack Form checkbox group field schema.
 */
type Props = Pick<z.input<typeof TanStackFormCheckboxGroupFieldSchema>, 'label' | 'description' | 'orientation' | 'options' | 'helperText' | 'tooltip'>;

/**
 * A TanStack Form-connected checkbox group field that manages an array of selected string values,
 * supporting multi-selection and submission-state disabling.
 *
 * @example
 * import { CheckboxField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="roles">
 *   {() => (
 *     <CheckboxField
 *       label="Roles"
 *       options={[
 *         { value: 'admin', label: 'Admin' },
 *         { value: 'editor', label: 'Editor' },
 *       ]}
 *       helperText="Select one or more roles"
 *     />
 *   )}
 * </form.Field>
 */
export const CheckboxField: React.FC<Props> = ({ label, description, options, tooltip, helperText, orientation }) => {
  const field = useTanStackFieldContext<string[] | null>();
  const isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation}>
        <FieldContent>
          <FieldLabel>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContent>
        <FieldContentMain>
          <FieldGroup className="flex flex-col gap-y-2">
            {options.map(option => {
              return (
                <Field key={option.value} orientation="horizontal">
                  <Checkbox
                    id={`${field.name}-${option.value}`}
                    name={field.name}
                    checked={field.state.value?.includes(option.value) ?? false}
                    disabled={isSubmitting}
                    onCheckedChange={checked => {
                      if (checked && field.state.value !== null) {
                        field.pushValue(option.value);
                      } else if (checked && field.state.value === null) {
                        field.setValue([option.value]);
                      } else if (!checked && field.state.value !== null) {
                        const index = field.state.value.indexOf(option.value);
                        if (index > -1) field.removeValue(index);
                      } else {
                        field.setValue(null);
                      }
                    }}
                  />
                  <FieldLabel htmlFor={`${field.name}-${option.value}`} className="text-text-positive">
                    {option.label}
                  </FieldLabel>
                </Field>
              );
            })}
          </FieldGroup>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
