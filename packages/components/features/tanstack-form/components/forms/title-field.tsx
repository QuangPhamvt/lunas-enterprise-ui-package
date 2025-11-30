import { Field, FieldContent, FieldDescription, FieldGroup, FieldLegend, FieldSeparator } from '../ui/field';

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
        {!!helperText && (
          <div className="mt-1 text-wrap rounded bg-primary-bg-subtle p-2 text-text-positive-weak text-xs">
            <p>{helperText}</p>
          </div>
        )}
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
