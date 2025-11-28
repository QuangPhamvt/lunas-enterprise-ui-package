import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '../ui/field';
import { Switch } from '../ui/switch';

export const SwitchField: React.FC<{
  label: string;
  description?: string;
}> = ({ label, description }) => {
  const field = useTanStackFieldContext<boolean>();

  return (
    <FieldLabel htmlFor={field.name}>
      <Field orientation="horizontal" className="justify-between">
        <FieldContent>
          <FieldTitle>{label}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <Switch id={field.name} checked={field.state.value} onBlur={field.handleBlur} onCheckedChange={field.handleChange} />
      </Field>
    </FieldLabel>
  );
};
