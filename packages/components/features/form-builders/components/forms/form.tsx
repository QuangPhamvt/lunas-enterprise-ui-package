import { revalidateLogic } from '@tanstack/react-form';

import { useGenerateValidate } from '../../hooks/use-generate-validate';
import type { FormBuilderValue } from '../../types';
import { useFormBuilderTanStack } from './tanstack-form';
import { FormBuilderTanStackFieldMapper } from './tanstack-form/mapper';

export const FormBuilderTanStackForm: React.FC<{
  formBuilder: FormBuilderValue;
}> = ({ formBuilder }) => {
  const { schema, defaultValues } = useGenerateValidate(formBuilder.form);
  const form = useFormBuilderTanStack({
    defaultValues,
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
  });
  const { FormBuilderTanStackForm } = form;
  return (
    <FormBuilderTanStackForm label={formBuilder.name} description={formBuilder.description ?? ''}>
      {formBuilder.form.map(field => {
        return FormBuilderTanStackFieldMapper({ form, field });
      })}
    </FormBuilderTanStackForm>
  );
};
