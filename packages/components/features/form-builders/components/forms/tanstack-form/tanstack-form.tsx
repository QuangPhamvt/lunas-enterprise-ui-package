import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { TextField } from './fields/text-field';
import { FormBuilderTanStackForm } from './forms/form-builder-tanstack-form';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm: useFormBuilderTanStack, withForm: withFormBuilderTanStackForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    TextField,
  },

  formComponents: {
    FormBuilderTanStackForm,
  },
});

export { useFormBuilderTanStack, withFormBuilderTanStackForm };
