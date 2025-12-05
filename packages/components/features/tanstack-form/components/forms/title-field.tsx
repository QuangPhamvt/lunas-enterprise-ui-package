import { Field, FieldContent, FieldDescription, FieldGroup, FieldLegend, FieldNote, FieldSeparator } from '../ui/field';

export const TanStackTitleField: React.FC<{
  title: string;
  description?: string;
  helperText?: string;
}> = ({ title, description, helperText }) => {
  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field className="gap-0">
        <FieldContent>
          <FieldLegend className="mb-1">{title}</FieldLegend>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
