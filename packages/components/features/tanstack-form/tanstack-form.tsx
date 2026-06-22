import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { ArrayCol, ArrayHeaderRow, SimpleArrayField } from './components/atoms/simple-array-field';
import { SimpleBooleanField } from './components/atoms/simple-boolean-field';
import { SimpleComboboxField } from './components/atoms/simple-combobox-field';
import { SimpleDateField } from './components/atoms/simple-date-field';
import { SimpleRadioGroupField } from './components/atoms/simple-radio-group-field';
import { SimpleEmailField } from './components/atoms/simple-email-field';
import { SimpleNumberField } from './components/atoms/simple-number-field';
import { SimplePasswordField } from './components/atoms/simple-password-field';
import { SimpleSelectField } from './components/atoms/simple-select-field';
import { SimpleTextareaField } from './components/atoms/simple-textarea-field';
import { SimpleTextField } from './components/atoms/simple-text-field';
import { CheckboxField } from './components/fields/checkbox-field';
import { ComboboxField } from './components/fields/combobox-field';
import { DateField } from './components/fields/date-field';
import { EmailField } from './components/fields/email-field';
import { NumberField } from './components/fields/number-field';
import { PasswordField } from './components/fields/password-field';
import { RadioGroupField } from './components/fields/radio-group-field';
import { SelectField } from './components/fields/select-field';
import { SwitchField } from './components/fields/switch-field';
import { TextField } from './components/fields/text-field';
import { TextareaField } from './components/fields/textarea-field';
import { TextEditorField } from './components/fields/text-editor-field';
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

/**
 * Factory result from {@link createFormHook} pre-wired with all Lunas UI field and form components.
 *
 * ### `useTanStackForm`
 * Pre-configured TanStack Form hook that returns a type-safe form instance bound to all Lunas UI
 * field and form components.
 *
 * @example
 * import { useTanStackForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * const form = useTanStackForm({
 *   defaultValues: { name: '', email: '' },
 *   onSubmit: async ({ value }) => console.log(value),
 * });
 *
 * return (
 *   <form.Provider>
 *     <form.AppForm>
 *       <form.AppField name="name" children={(field) => <field.TextField label="Name" />} />
 *       <form.Subscribe selector={(s) => s.canSubmit}>
 *         {(canSubmit) => <form.TanStackActionSubmit disabled={!canSubmit} />}
 *       </form.Subscribe>
 *     </form.AppForm>
 *   </form.Provider>
 * );
 *
 * ### `withTanStackForm`
 * Higher-order component that wraps a sub-form component with access to the parent
 * `useTanStackForm` form context, enabling isolated field groups that still participate in the
 * top-level form state.
 *
 * @example
 * import { withTanStackForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * const AddressFields = withTanStackForm(
 *   { street: '', city: '' } as const,
 *   ({ form }) => (
 *     <>
 *       <form.AppField name="street" children={(f) => <f.TextField label="Street" />} />
 *       <form.AppField name="city" children={(f) => <f.TextField label="City" />} />
 *     </>
 *   ),
 * );
 *
 * ### `withTanStackFieldGroup`
 * Higher-order component that creates a reusable field-group component sharing the enclosing
 * `useTanStackForm` context without requiring additional form providers.
 *
 * @example
 * import { withTanStackFieldGroup } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * const ContactGroup = withTanStackFieldGroup(({ form }) => (
 *   <form.AppField name="phone" children={(f) => <f.TextField label="Phone" />} />
 * ));
 */
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
    TextEditorField,
    NumberField,
    EmailField,
    PasswordField,

    SelectField,
    ComboboxField,
    DateField,
    SwitchField,
    RadioGroupField,
    CheckboxField,

    SimpleTextField,
    SimpleEmailField,
    SimplePasswordField,
    SimpleTextareaField,
    SimpleNumberField,
    SimpleSelectField,
    SimpleArrayField,
    SimpleBooleanField,
    SimpleComboboxField,
    SimpleDateField,
    SimpleRadioGroupField,

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

    ArrayCol,
    ArrayHeaderRow,
  },
});

export {
  // Hooks & HOCs
  useTanStackForm,
  withTanStackForm,
  withTanStackFieldGroup,
  useTanStackFieldContext,
  useTanStackFormContext,
  // Form containers
  TanStackDialogForm,
  TanStackPopoverForm,
  TanStackContainerForm,
  TanStackSectionForm,
  TanStackCardForm,
  TanStackFieldGroup,
  TanStackTitleField,
  // Form actions
  TanStackActionsForm,
  TanStackActionSubmit,
  SubmitButton,
  CancelButton,
  // Array helpers
  ArrayCol,
  ArrayHeaderRow,
  // Rich field components
  TextField,
  TextareaField,
  TextEditorField,
  NumberField,
  EmailField,
  PasswordField,
  SelectField,
  ComboboxField,
  DateField,
  SwitchField,
  RadioGroupField,
  CheckboxField,
  // Simple (minimal) field components
  SimpleTextField,
  SimpleEmailField,
  SimplePasswordField,
  SimpleTextareaField,
  SimpleNumberField,
  SimpleSelectField,
  SimpleArrayField,
  SimpleBooleanField,
  SimpleComboboxField,
  SimpleDateField,
  SimpleRadioGroupField,
  // Field UI primitives
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldContentMain,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldNote,
  FieldTooltip,
  FieldSeparator,
  FieldError,
};
