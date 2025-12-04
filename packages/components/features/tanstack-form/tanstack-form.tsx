import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { CheckboxField } from './components/fields/checkbox-field';
import { DateField } from './components/fields/date-field';
import { NumberField } from './components/fields/number-field';
import { RadioGroupField } from './components/fields/radio-group-field';
import { SelectField } from './components/fields/select-field';
import { SwitchField } from './components/fields/switch-field';
import { TextField } from './components/fields/text-field';
import { TextareaField } from './components/fields/textarea-field';
import { TanStackActionsForm } from './components/forms/actions-form';
import { TanStackContainerForm } from './components/forms/container-form';
import { TanStackDialogForm } from './components/forms/dialog-form';
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
    DateField,
    SwitchField,
    RadioGroupField,
    CheckboxField,
  },
  formComponents: {
    TanStackDialogForm,
    TanStackContainerForm,
    TanStackSectionForm,
    TanStackTitleField,
    TanStackActionsForm,
  },
});

export { useTanStackForm, withTanStackForm, withTanStackFieldGroup, useTanStackFieldContext, useTanStackFormContext };
