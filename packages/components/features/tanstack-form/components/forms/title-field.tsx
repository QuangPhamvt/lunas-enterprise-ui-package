import { Field, FieldContent, FieldDescription, FieldGroup, FieldLegend, FieldSeparator } from '../ui/field';

export const TanStackTitleField: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field>
        <FieldContent>
          <FieldLegend>{title}</FieldLegend>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
