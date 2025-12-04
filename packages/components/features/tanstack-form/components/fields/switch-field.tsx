import type z from 'zod';

import type { TanStackFormSwitchFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldNote, FieldSeparator, FieldTitle } from '../ui/field';
import { Switch } from '../ui/switch';

type Props = Pick<z.input<typeof TanStackFormSwitchFieldSchema>, 'label' | 'description' | 'helperText'>;

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
