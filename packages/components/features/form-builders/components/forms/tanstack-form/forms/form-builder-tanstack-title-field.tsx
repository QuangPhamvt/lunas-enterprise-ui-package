import type { FormBuilderTitleField } from '@/components/features/form-builders/types';
import { FieldDescription, FieldLegend, FieldSeparator, FieldSet } from '../../../../components/ui/fields';

export const FormBuilderTanStackTitleField: React.FC<Pick<FormBuilderTitleField, 'label' | 'description'>> = ({ label, description }) => {
  return (
    <FieldSet>
      <FieldLegend>{label}</FieldLegend>
      <FieldDescription>{description}</FieldDescription>
      <FieldSeparator />
    </FieldSet>
  );
};
