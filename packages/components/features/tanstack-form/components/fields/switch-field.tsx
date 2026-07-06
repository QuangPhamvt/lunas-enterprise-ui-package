'use client';

import { useTanStackFieldContext } from '../form-context';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldNote, FieldSeparator, FieldTitle } from '../ui/field';
import { Switch } from '../ui/switch';

import type { SwitchFieldProps as Props } from '../../types';

/**
 * A TanStack Form-connected boolean toggle field rendered as a labelled switch,
 * positioned absolutely in the top-right corner of the field card.
 *
 * @example
 * import { SwitchField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="notifications">
 *   {() => (
 *     <SwitchField
 *       label="Enable notifications"
 *       description="Receive email alerts for important events"
 *       helperText="You can change this at any time"
 *     />
 *   )}
 * </form.Field>
 */
export const SwitchField: React.FC<Props> = ({ label, description, helperText }) => {
  const field = useTanStackFieldContext<boolean | null>();

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation="vertical" className="relative justify-between gap-y-1">
        <FieldContent>
          <FieldTitle className="cursor-pointer">
            <label htmlFor={field.name}>{label}</label>
          </FieldTitle>
          <FieldDescription>{description}</FieldDescription>
          <Switch
            id={field.name}
            checked={field.state.value ?? false}
            className="absolute top-1 right-1"
            onBlur={field.handleBlur}
            onCheckedChange={field.handleChange}
          />
        </FieldContent>
        <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
