import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from '../../components/ui/fields';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderTitleField as TFormBuilderTitleField } from '../../types';

export const FormBuilderTitleField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderTitleField>('title-field', fieldId);

  if (!currentField) return null;

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>{currentField.label}</FieldLegend>
        <FieldDescription>{currentField.description}</FieldDescription>
        <FieldSeparator />
      </FieldSet>
    </FieldGroup>
  );
};
