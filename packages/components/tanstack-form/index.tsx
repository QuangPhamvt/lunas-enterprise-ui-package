import { createFormHook } from '@tanstack/react-form';

import { ArrayItemField, ArraysField } from './arrays-field';
import { fieldContext, formContext } from './config';
import { ComboboxField } from './fields/combobox-field';
import { DateField } from './fields/date-field';
import { NumberField } from './fields/number-field';
import { SelectField } from './fields/select-field';
import { TextField } from './fields/text-field';
import { TextareaField } from './fields/textarea-field';
import { TanStackForm, TanStackFormFooter, TanStackFormGroup } from './form';
import { SubscribeButton } from './subscribe-button';

const { useAppForm: useForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    TextField,
    TextareaField,
    NumberField,
    SelectField,
    ComboboxField,
    DateField,
    ArraysField,
    ArrayItemField,
  },
  formComponents: {
    TanStackForm,
    TanStackFormGroup,
    TanStackFormFooter,
    SubscribeButton,
  },
});

export { useForm };
