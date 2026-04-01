import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { CheckboxField } from './components/fields/checkbox-field';
import { DateField } from './components/fields/date-field';
import { EmailField } from './components/fields/email-field';
import { NumberField } from './components/fields/number-field';
import { PasswordField } from './components/fields/password-field';
import { RadioGroupField } from './components/fields/radio-group-field';
import { SelectField } from './components/fields/select-field';
import { SwitchField } from './components/fields/switch-field';
import { TextField } from './components/fields/text-field';
import { TextareaField } from './components/fields/textarea-field';
import { TanStackActionSubmit } from './components/forms/action-submit';
import { TanStackActionsForm } from './components/forms/actions-form';
import { TanStackCardForm } from './components/forms/card-form';
import { TanStackContainerForm } from './components/forms/container-form';
import { TanStackDialogForm } from './components/forms/dialog-form';
import { TanStackFieldGroup } from './components/forms/group-field';
import { TanStackPopoverForm } from './components/forms/popover-form';
import { TanStackSectionForm } from './components/forms/section-form';
import { TanStackTitleField } from './components/forms/title-field';
import { Field, FieldContent, FieldContentMain, FieldError, FieldGroup, FieldLabel, FieldSeparator } from './components/ui/field';

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
    EmailField,
    PasswordField,

    SelectField,
    DateField,
    SwitchField,
    RadioGroupField,
    CheckboxField,

    FieldGroup,
    Field,
    FieldContent,
    FieldLabel,
    FieldContentMain,
    FieldSeparator,
    FieldError,
  },
  formComponents: {
    TanStackDialogForm,
    TanStackPopoverForm,
    TanStackContainerForm,
    TanStackSectionForm,
    TanStackCardForm,
    TanStackFieldGroup,
    TanStackTitleField,

    TanStackActionsForm,
    TanStackActionSubmit,
  },
});

export {
  useTanStackForm,
  withTanStackForm,
  withTanStackFieldGroup,
  useTanStackFieldContext,
  useTanStackFormContext,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldContentMain,
  FieldSeparator,
  FieldError,
};
