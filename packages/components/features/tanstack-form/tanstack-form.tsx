import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { ComboboxField } from './components/fields/combobox-field';
import { DateField } from './components/fields/date-field';
import { NumberField } from './components/fields/number-field';
import { RadioGroupField } from './components/fields/radio-group-field';
import { SelectField } from './components/fields/select-field';
import { SwitchField } from './components/fields/switch-field';
import { TextField } from './components/fields/text-field';
import { TextareaField } from './components/fields/textarea-field';
import { TanStackContainerForm } from './components/forms/container-form';
import { TanStackSectionForm } from './components/forms/section-form';
import { TanStackTitleField } from './components/forms/title-field';

const { fieldContext, formContext, useFieldContext: useTanStackFieldContext, useFormContext: useTanStackFormContext } = createFormHookContexts();

const {
  useAppForm: useTanStackForm,
  withForm: withTanStackForm,
  withFieldGroup: withTanStackFieldGroup,
} = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    TextField,
    TextareaField,
    NumberField,
    SelectField,
    ComboboxField,
    DateField,
    SwitchField,
    RadioGroupField,
  },
  formComponents: {
    TanStackContainerForm,
    TanStackSectionForm,
    TanStackTitleField,
  },
});

export { useTanStackForm, withTanStackForm, withTanStackFieldGroup, useTanStackFieldContext, useTanStackFormContext };
