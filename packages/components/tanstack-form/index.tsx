import { createFormHook } from '@tanstack/react-form';

import { ArrayField, ArrayItemField } from './arrays-field';
import { fieldContext, formContext } from './config';
import { ComboboxField } from './fields/combobox-field';
import { DateField } from './fields/date-field';
import { NumberField } from './fields/number-field';
import { RadioGroupField, TanStackRadioGroup } from './fields/radio-group-field';
import { SelectField } from './fields/select-field';
import { SwitchField, TanStackSwitchGroup } from './fields/switch-field';
import { TextField } from './fields/text-field';
import { TextareaField } from './fields/textarea-field';
import { TanStackForm, TanStackFormFooter, TanStackFormGroup } from './form';
import { SubscribeButton } from './subscribe-button';

const { useAppForm: useTanStackForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    TextField,
    TextareaField,
    NumberField,
    SelectField,
    ComboboxField,
    SwitchField,
    RadioGroupField,
    DateField,
    ArrayField,
    ArrayItemField,
  },
  formComponents: {
    TanStackForm,
    TanStackFormGroup,
    TanStackFormFooter,
    TanStackSwitchGroup,
    TanStackRadioGroup,
    SubscribeButton,
  },
});

export { useTanStackForm };
