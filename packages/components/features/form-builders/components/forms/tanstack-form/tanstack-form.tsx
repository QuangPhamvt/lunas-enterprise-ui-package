import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { TextField } from './fields/text-field';
import { TextareaField } from './fields/textarea-field';
import { FormBuilderTanStackForm } from './forms/form-builder-tanstack-form';
import { FormBuilderTanStackTitleField } from './forms/form-builder-tanstack-title-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm: useFormBuilderTanStack, withForm: withFormBuilderTanStackForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    TextField,
    TextareaField,
  },

  formComponents: {
    FormBuilderTanStackForm,
    FormBuilderTanStackTitleField,
  },
});

export { useFormBuilderTanStack, withFormBuilderTanStackForm };
