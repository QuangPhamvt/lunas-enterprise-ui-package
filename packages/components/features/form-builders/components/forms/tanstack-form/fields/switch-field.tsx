import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '../../../ui/fields';
import { Switch } from '../../../ui/switch';
import { useFieldContext } from '../tanstack-form';

export const SwitchField: React.FC<{
  label: string;
  description?: string;
}> = ({ label, description }) => {
  const field = useFieldContext<boolean>();

  return (
    <FieldLabel htmlFor={field.name}>
      <Field orientation="horizontal" className="justify-between">
        <FieldContent>
          <FieldTitle>{label}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
      </Field>
    </FieldLabel>
  );
};
