import { useMemo } from 'react';

import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from '../../components/ui/fields';
import { useFormBuilderValueContext } from '../providers';

export const FormBuilderTitleField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const field = formBuilder.form.find(field => field.id === fieldId);
    if (field && field.type === 'title-field') {
      return field;
    }
    return null;
  }, [fieldId, formBuilder.form]);

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
