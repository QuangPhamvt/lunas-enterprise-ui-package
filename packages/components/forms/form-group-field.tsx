import { Field, FieldContent, FieldDescription, FieldLabel } from '../ui/field';

type Props = {
  label?: string;
  description?: string;
};
export const FormGroupField: React.FC<React.PropsWithChildren<Props>> = ({ label, description, children }) => {
  return (
    <Field className="@md/field-group:flex-row @md/field-group:items-start">
      <FieldContent>
        <FieldLabel>{label}</FieldLabel>
        <FieldDescription>{description}</FieldDescription>
      </FieldContent>
      <div className="basis-3/5 w-full flex flex-col items-end">
        <div className="flex flex-col space-y-2 max-w-60 w-4/5">{children}</div>
      </div>
    </Field>
  );
};
