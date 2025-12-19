import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { DataGridNumberField } from '../components/fields/number-field';
import { DataGridSelectField } from '../components/fields/select-field';
import { DataGridTextField } from '../components/fields/text-field';

const { fieldContext, formContext, useFieldContext: useDataGridFieldContext, useFormContext: useDataGridFormContext } = createFormHookContexts();

const {
  useAppForm: useDataGridForm,
  withForm: withDataGridForm,
  withFieldGroup: withDataGridFieldGroup,
} = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    DataGridTextField,
    DataGridNumberField,
    DataGridSelectField,
  },
  formComponents: {},
});

export { useDataGridForm, withDataGridForm, withDataGridFieldGroup, useDataGridFieldContext, useDataGridFormContext };
