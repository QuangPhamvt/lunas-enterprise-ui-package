import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { DateField } from './fields/date-field';
import { NumberField } from './fields/number-field';
import { RadioGroupField } from './fields/radio-group';
import { SelectField } from './fields/select-field';
import { SwitchField } from './fields/switch-field';
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
    NumberField,
    SelectField,
    DateField,
    SwitchField,
    RadioGroupField,
  },

  formComponents: {
    FormBuilderTanStackForm,
    FormBuilderTanStackTitleField,
  },
});

export { useFormBuilderTanStack, withFormBuilderTanStackForm };
