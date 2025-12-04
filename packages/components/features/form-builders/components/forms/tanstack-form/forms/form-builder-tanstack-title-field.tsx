import type { FormBuilderTitleField } from '@/components/features/form-builders/types';

import { FieldLegend, FieldSeparator, FieldSet } from '../../../../components/ui/fields';

export const FormBuilderTanStackTitleField: React.FC<Pick<FormBuilderTitleField, 'label' | 'description'>> = ({ label }) => {
  return (
    <FieldSet>
      <FieldLegend className="mb-0 px-4 py-2">{label}</FieldLegend>
      <FieldSeparator />
    </FieldSet>
  );
};
