'use client';

import type { ComponentProps, ComponentType } from 'react';
import { lazy, Suspense } from 'react';

import { createFormHook } from '@tanstack/react-form';

import { Skeleton } from '@/components/ui/skeleton';

import type { ArrayCol as ArrayColType, ArrayHeaderRow as ArrayHeaderRowType, SimpleArrayFieldProps } from './components/atoms/simple-array-field';
import type { SimpleBooleanField as SimpleBooleanFieldType } from './components/atoms/simple-boolean-field';
import type { SimpleComboboxField as SimpleComboboxFieldType } from './components/atoms/simple-combobox-field';
import type { SimpleDateField as SimpleDateFieldType } from './components/atoms/simple-date-field';
import type { SimpleEmailField as SimpleEmailFieldType } from './components/atoms/simple-email-field';
import type { SimpleNumberField as SimpleNumberFieldType } from './components/atoms/simple-number-field';
import type { SimplePasswordField as SimplePasswordFieldType } from './components/atoms/simple-password-field';
import type { SimpleRadioGroupField as SimpleRadioGroupFieldType } from './components/atoms/simple-radio-group-field';
import type { SimpleSelectField as SimpleSelectFieldType } from './components/atoms/simple-select-field';
import type { SimpleTextField as SimpleTextFieldType } from './components/atoms/simple-text-field';
import type { SimpleTextareaField as SimpleTextareaFieldType } from './components/atoms/simple-textarea-field';
import type { CheckboxField as CheckboxFieldType } from './components/fields/checkbox-field';
import type { ComboboxField as ComboboxFieldType } from './components/fields/combobox-field';
import type { DateField as DateFieldType } from './components/fields/date-field';
import type { EmailField as EmailFieldType } from './components/fields/email-field';
import type { NumberField as NumberFieldType } from './components/fields/number-field';
import type { PasswordField as PasswordFieldType } from './components/fields/password-field';
import type { RadioGroupField as RadioGroupFieldType } from './components/fields/radio-group-field';
import type { SelectField as SelectFieldType } from './components/fields/select-field';
import type { SwitchField as SwitchFieldType } from './components/fields/switch-field';
import type { TextEditorField as TextEditorFieldType } from './components/fields/text-editor-field';
import type { TextField as TextFieldType } from './components/fields/text-field';
import type { TextareaField as TextareaFieldType } from './components/fields/textarea-field';
import { fieldContext, formContext, useTanStackFieldContext, useTanStackFormContext } from './components/form-context';
import type { TanStackActionSubmit as TanStackActionSubmitType } from './components/forms/action-submit';
import type { TanStackActionsForm as TanStackActionsFormType } from './components/forms/actions-form';
import type { TanStackCardForm as TanStackCardFormType } from './components/forms/card-form';
import type { TanStackContainerForm as TanStackContainerFormType } from './components/forms/container-form';
import type { TanStackDialogForm as TanStackDialogFormType } from './components/forms/dialog-form';
import type { TanStackFieldGroup as TanStackFieldGroupType } from './components/forms/group-field';
import type { TanStackPopoverForm as TanStackPopoverFormType } from './components/forms/popover-form';
import type { TanStackSectionForm as TanStackSectionFormType } from './components/forms/section-form';
import type { TanStackTitleField as TanStackTitleFieldType } from './components/forms/title-field';
import type {
  FieldContentMain as FieldContentMainType,
  FieldContent as FieldContentType,
  FieldError as FieldErrorType,
  FieldGroup as FieldGroupType,
  FieldLabel as FieldLabelType,
  FieldSeparator as FieldSeparatorType,
  Field as FieldType,
} from './components/ui/field';

/** Input-shaped pulse placeholder shown while a lazy field/form chunk is still loading. */
function FieldSkeleton() {
  return <Skeleton data-slot="tanstack-field-skeleton" className="h-9 w-full rounded" />;
}

/**
 * Wraps a `lazy()`-loaded component in its own `Suspense` boundary so it can be dropped
 * anywhere (inside or outside our own form containers) without callers needing to set up
 * Suspense themselves. Keeps this file itself small — the heavy per-field-type
 * implementations (Radix Select/Combobox/date-picker, the rich text editor, etc.) only load
 * when a form actually renders that field type.
 */
function lazyField<P extends object>(loader: () => Promise<{ default: ComponentType<P> }>): ComponentType<P> {
  const LazyComponent = lazy(loader);
  return (props: P) => (
    <Suspense fallback={<FieldSkeleton />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// ─── Rich field components (lazy) ─────────────────────────────────────────────

const TextField = lazyField<ComponentProps<typeof TextFieldType>>(() => import('./components/fields/text-field').then(m => ({ default: m.TextField })));
const TextareaField = lazyField<ComponentProps<typeof TextareaFieldType>>(() =>
  import('./components/fields/textarea-field').then(m => ({ default: m.TextareaField }))
);
const TextEditorField = lazyField<ComponentProps<typeof TextEditorFieldType>>(() =>
  import('./components/fields/text-editor-field').then(m => ({ default: m.TextEditorField }))
);
const NumberField = lazyField<ComponentProps<typeof NumberFieldType>>(() => import('./components/fields/number-field').then(m => ({ default: m.NumberField })));
const EmailField = lazyField<ComponentProps<typeof EmailFieldType>>(() => import('./components/fields/email-field').then(m => ({ default: m.EmailField })));
const PasswordField = lazyField<ComponentProps<typeof PasswordFieldType>>(() =>
  import('./components/fields/password-field').then(m => ({ default: m.PasswordField }))
);
const SelectField = lazyField<ComponentProps<typeof SelectFieldType>>(() => import('./components/fields/select-field').then(m => ({ default: m.SelectField })));
const ComboboxField = lazyField<ComponentProps<typeof ComboboxFieldType>>(() =>
  import('./components/fields/combobox-field').then(m => ({ default: m.ComboboxField }))
);
const DateField = lazyField<ComponentProps<typeof DateFieldType>>(() => import('./components/fields/date-field').then(m => ({ default: m.DateField })));
const SwitchField = lazyField<ComponentProps<typeof SwitchFieldType>>(() => import('./components/fields/switch-field').then(m => ({ default: m.SwitchField })));
const RadioGroupField = lazyField<ComponentProps<typeof RadioGroupFieldType>>(() =>
  import('./components/fields/radio-group-field').then(m => ({ default: m.RadioGroupField }))
);
const CheckboxField = lazyField<ComponentProps<typeof CheckboxFieldType>>(() =>
  import('./components/fields/checkbox-field').then(m => ({ default: m.CheckboxField }))
);

// ─── Simple (minimal) field components (lazy) ─────────────────────────────────

const SimpleTextField = lazyField<ComponentProps<typeof SimpleTextFieldType>>(() =>
  import('./components/atoms/simple-text-field').then(m => ({ default: m.SimpleTextField }))
);
const SimpleEmailField = lazyField<ComponentProps<typeof SimpleEmailFieldType>>(() =>
  import('./components/atoms/simple-email-field').then(m => ({ default: m.SimpleEmailField }))
);
const SimplePasswordField = lazyField<ComponentProps<typeof SimplePasswordFieldType>>(() =>
  import('./components/atoms/simple-password-field').then(m => ({ default: m.SimplePasswordField }))
);
const SimpleTextareaField = lazyField<ComponentProps<typeof SimpleTextareaFieldType>>(() =>
  import('./components/atoms/simple-textarea-field').then(m => ({ default: m.SimpleTextareaField }))
);
const SimpleNumberField = lazyField<ComponentProps<typeof SimpleNumberFieldType>>(() =>
  import('./components/atoms/simple-number-field').then(m => ({ default: m.SimpleNumberField }))
);
const SimpleSelectField = lazyField<ComponentProps<typeof SimpleSelectFieldType>>(() =>
  import('./components/atoms/simple-select-field').then(m => ({ default: m.SimpleSelectField }))
);
const LazySimpleArrayField = lazy(() =>
  import('./components/atoms/simple-array-field').then(m => ({ default: m.SimpleArrayField as ComponentType<SimpleArrayFieldProps<unknown>> }))
);

/** Kept as its own generic wrapper (instead of `lazyField`) so callers can still write `<SimpleArrayField<Row> />`. */
function SimpleArrayField<T>(props: SimpleArrayFieldProps<T>) {
  const Impl = LazySimpleArrayField as ComponentType<SimpleArrayFieldProps<T>>;
  return (
    <Suspense fallback={<FieldSkeleton />}>
      <Impl {...props} />
    </Suspense>
  );
}

const SimpleBooleanField = lazyField<ComponentProps<typeof SimpleBooleanFieldType>>(() =>
  import('./components/atoms/simple-boolean-field').then(m => ({ default: m.SimpleBooleanField }))
);
const SimpleComboboxField = lazyField<ComponentProps<typeof SimpleComboboxFieldType>>(() =>
  import('./components/atoms/simple-combobox-field').then(m => ({ default: m.SimpleComboboxField }))
);
const SimpleDateField = lazyField<ComponentProps<typeof SimpleDateFieldType>>(() =>
  import('./components/atoms/simple-date-field').then(m => ({ default: m.SimpleDateField }))
);
const SimpleRadioGroupField = lazyField<ComponentProps<typeof SimpleRadioGroupFieldType>>(() =>
  import('./components/atoms/simple-radio-group-field').then(m => ({ default: m.SimpleRadioGroupField }))
);

// ─── Array field layout helpers (lazy, co-located with SimpleArrayField) ──────

const ArrayCol = lazyField<ComponentProps<typeof ArrayColType>>(() => import('./components/atoms/simple-array-field').then(m => ({ default: m.ArrayCol })));
const ArrayHeaderRow = lazyField<ComponentProps<typeof ArrayHeaderRowType>>(() =>
  import('./components/atoms/simple-array-field').then(m => ({ default: m.ArrayHeaderRow }))
);

// ─── Form containers (lazy) ───────────────────────────────────────────────────

const TanStackDialogForm = lazyField<ComponentProps<typeof TanStackDialogFormType>>(() =>
  import('./components/forms/dialog-form').then(m => ({ default: m.TanStackDialogForm }))
);
const TanStackPopoverForm = lazyField<ComponentProps<typeof TanStackPopoverFormType>>(() =>
  import('./components/forms/popover-form').then(m => ({ default: m.TanStackPopoverForm }))
);
const TanStackContainerForm = lazyField<ComponentProps<typeof TanStackContainerFormType>>(() =>
  import('./components/forms/container-form').then(m => ({ default: m.TanStackContainerForm }))
);
const TanStackSectionForm = lazyField<ComponentProps<typeof TanStackSectionFormType>>(() =>
  import('./components/forms/section-form').then(m => ({ default: m.TanStackSectionForm }))
);
const TanStackCardForm = lazyField<ComponentProps<typeof TanStackCardFormType>>(() =>
  import('./components/forms/card-form').then(m => ({ default: m.TanStackCardForm }))
);
const TanStackFieldGroup = lazyField<ComponentProps<typeof TanStackFieldGroupType>>(() =>
  import('./components/forms/group-field').then(m => ({ default: m.TanStackFieldGroup }))
);
const TanStackTitleField = lazyField<ComponentProps<typeof TanStackTitleFieldType>>(() =>
  import('./components/forms/title-field').then(m => ({ default: m.TanStackTitleField }))
);
const TanStackActionsForm = lazyField<ComponentProps<typeof TanStackActionsFormType>>(() =>
  import('./components/forms/actions-form').then(m => ({ default: m.TanStackActionsForm }))
);
const TanStackActionSubmit = lazyField<ComponentProps<typeof TanStackActionSubmitType>>(() =>
  import('./components/forms/action-submit').then(m => ({ default: m.TanStackActionSubmit }))
);

// ─── Field UI primitives (lazy) ───────────────────────────────────────────────

const FieldGroup = lazyField<ComponentProps<typeof FieldGroupType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldGroup })));
const Field = lazyField<ComponentProps<typeof FieldType>>(() => import('./components/ui/field').then(m => ({ default: m.Field })));
const FieldContent = lazyField<ComponentProps<typeof FieldContentType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldContent })));
const FieldLabel = lazyField<ComponentProps<typeof FieldLabelType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldLabel })));
const FieldContentMain = lazyField<ComponentProps<typeof FieldContentMainType>>(() =>
  import('./components/ui/field').then(m => ({ default: m.FieldContentMain }))
);
const FieldSeparator = lazyField<ComponentProps<typeof FieldSeparatorType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldSeparator })));
const FieldError = lazyField<ComponentProps<typeof FieldErrorType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldError })));

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
  // Array helpers
  ArrayCol,
  ArrayHeaderRow,
  CheckboxField,
  ComboboxField,
  DateField,
  EmailField,
  Field,
  FieldContent,
  FieldContentMain,
  FieldError,
  // Field UI primitives
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  NumberField,
  PasswordField,
  RadioGroupField,
  SelectField,
  SimpleArrayField,
  SimpleBooleanField,
  SimpleComboboxField,
  SimpleDateField,
  SimpleEmailField,
  SimpleNumberField,
  SimplePasswordField,
  SimpleRadioGroupField,
  SimpleSelectField,
  SimpleTextareaField,
  // Simple (minimal) field components
  SimpleTextField,
  SwitchField,
  TanStackActionSubmit,
  // Form actions
  TanStackActionsForm,
  TanStackCardForm,
  TanStackContainerForm,
  // Form containers
  TanStackDialogForm,
  TanStackFieldGroup,
  TanStackPopoverForm,
  TanStackSectionForm,
  TanStackTitleField,
  TextareaField,
  TextEditorField,
  // Rich field components
  TextField,
  useTanStackFieldContext,
  // Hooks & HOCs
  useTanStackForm,
  useTanStackFormContext,
  withTanStackFieldGroup,
  withTanStackForm,
};
