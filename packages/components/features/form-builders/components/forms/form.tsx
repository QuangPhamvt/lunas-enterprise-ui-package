import { revalidateLogic } from '@tanstack/react-form';

import { useFormBuilderTanStack } from './tanstack-form';
import { FormBuilderTanStackFieldMapper } from './tanstack-form/mapper';
import type z from 'zod';
import type { formBuilderSchema } from '../../schema';

export const FormBuilderTanStackForm: React.FC<{
  formBuilder: z.infer<typeof formBuilderSchema>;
}> = ({ formBuilder }) => {
  // const { schema, defaultValues } = useGenerateValidate(formBuilder.form);
  if (formBuilder.sections[0].fields[0].type === 'array-field') {
    if (formBuilder.sections[0].fields[0].fields[0].type === 'array-field') {
      const data = formBuilder.sections[0].fields[0].fields[0];
    }
  }
  const form = useFormBuilderTanStack({
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
  });
  const { FormBuilderTanStackForm } = form;
  return (
    <FormBuilderTanStackForm>
      {formBuilder.form.map(field => {
        return FormBuilderTanStackFieldMapper({ form, field });
      })}
    </FormBuilderTanStackForm>
  );
};
