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
import { TextEditorField } from './components/fields/text-editor-field';
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

/**
 * A TanStack Form-connected single-line text input with label, validation, and optional features.
 *
 * Must be rendered inside an `AppField` context from `useTanStackForm`.
 * The field value type is `string | null` — `null` represents an empty/unset state.
 *
 * ---
 *
 * **Basic usage**
 * @example
 * const { AppField } = useTanStackForm({ defaultValues: { name: null } });
 *
 * <AppField name="name">
 *   {field => <field.TextField label="Full name" placeholder="Nguyễn Văn A" />}
 * </AppField>
 *
 * ---
 *
 * **With validation**
 * @example
 * <AppField
 *   name="username"
 *   validators={{ onChange: ({ value }) => !value ? 'Bắt buộc' : undefined }}
 * >
 *   {field => <field.TextField label="Username" required />}
 * </AppField>
 *
 * ---
 *
 * **With character counter and max length**
 * @example
 * <AppField name="bio">
 *   {field => (
 *     <field.TextField
 *       label="Bio"
 *       counter
 *       maxLength={160}
 *       placeholder="Giới thiệu bản thân…"
 *     />
 *   )}
 * </AppField>
 *
 * ---
 *
 * **With clear button and helper note**
 * @example
 * <AppField name="search">
 *   {field => (
 *     <field.TextField
 *       label="Tìm kiếm"
 *       showClearButton
 *       helperText="Nhập ít nhất 3 ký tự để tìm kiếm."
 *     />
 *   )}
 * </AppField>
 *
 * ---
 *
 * **Horizontal layout**
 * @example
 * <AppField name="code">
 *   {field => (
 *     <field.TextField
 *       label="Mã sản phẩm"
 *       orientation="horizontal"
 *       tooltip="Mã duy nhất định danh sản phẩm trong hệ thống."
 *     />
 *   )}
 * </AppField>
 */
const TextField = lazyField<ComponentProps<typeof TextFieldType>>(() => import('./components/fields/text-field').then(m => ({ default: m.TextField })));
/**
 * A TanStack Form-connected multi-line text input with an optional character counter (which turns
 * warning at 80% of `maxLength` and danger at the limit) and inline validation error display.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { note: null as string | null } });
 *
 * <form.AppField
 *   name="note"
 *   children={({ TextareaField }) => <TextareaField label="Ghi chú" maxLength={500} counter />}
 * />
 * ```
 */
const TextareaField = lazyField<ComponentProps<typeof TextareaFieldType>>(() =>
  import('./components/fields/textarea-field').then(m => ({ default: m.TextareaField }))
);
/**
 * A TanStack Form-connected numeric input field supporting rounding rules,
 * decimal precision, unit labels, and submission-state feedback.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { quantity: null as number | null } });
 *
 * <form.AppField
 *   name="quantity"
 *   children={({ NumberField }) => (
 *     <NumberField
 *       label="Quantity"
 *       placeholder="0"
 *       unit="pcs"
 *       decimalPlaces={2}
 *       required
 *     />
 *   )}
 * />
 * ```
 */
const NumberField = lazyField<ComponentProps<typeof NumberFieldType>>(() => import('./components/fields/number-field').then(m => ({ default: m.NumberField })));
/**
 * A TanStack Form-connected email input field with an at-sign prefix icon,
 * optional clear button, and inline validation error display.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { email: null as string | null } });
 *
 * <form.AppField
 *   name="email"
 *   children={({ EmailField }) => (
 *     <EmailField
 *       label="Email address"
 *       placeholder="you@example.com"
 *       required
 *     />
 *   )}
 * />
 * ```
 */
const EmailField = lazyField<ComponentProps<typeof EmailFieldType>>(() => import('./components/fields/email-field').then(m => ({ default: m.EmailField })));
/**
 * A TanStack Form-connected password input field with a show/hide toggle button
 * and inline validation error display.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { password: null as string | null } });
 *
 * <form.AppField
 *   name="password"
 *   children={({ PasswordField }) => (
 *     <PasswordField
 *       label="Password"
 *       placeholder="Enter your password"
 *       helperText="Must be at least 8 characters"
 *     />
 *   )}
 * />
 * ```
 */
const PasswordField = lazyField<ComponentProps<typeof PasswordFieldType>>(() =>
  import('./components/fields/password-field').then(m => ({ default: m.PasswordField }))
);
/**
 * A TanStack Form-connected single-select dropdown with an optional clear button and inline
 * validation error display. Uses a Radix `Select` on desktop and a picker dialog on mobile.
 * Stores the selected option's `value` (`string | null`).
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { status: null as string | null } });
 *
 * <form.AppField
 *   name="status"
 *   children={({ SelectField }) => <SelectField label="Trạng thái" options={statusOptions} required />}
 * />
 * ```
 */
const SelectField = lazyField<ComponentProps<typeof SelectFieldType>>(() => import('./components/fields/select-field').then(m => ({ default: m.SelectField })));
/**
 * A TanStack Form-connected searchable single-select: type to filter `options`, optional clear
 * button, and inline validation error display. Opens a popover on desktop and a picker dialog on
 * mobile. Stores the selected option's `value` (`string | null`).
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { province: null as string | null } });
 *
 * <form.AppField
 *   name="province"
 *   children={({ ComboboxField }) => (
 *     <ComboboxField label="Tỉnh / thành" placeholder="Tìm tỉnh..." options={provinces} clearable />
 *   )}
 * />
 * ```
 */
const ComboboxField = lazyField<ComponentProps<typeof ComboboxFieldType>>(() =>
  import('./components/fields/combobox-field').then(m => ({ default: m.ComboboxField }))
);
/**
 * A TanStack Form-connected date picker: a trigger button showing the formatted date that opens a
 * calendar popover, with optional `minDate`/`maxDate` bounds and inline validation error display.
 * Stores a `Date | null`.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { deliveryDate: null as Date | null } });
 *
 * <form.AppField
 *   name="deliveryDate"
 *   children={({ DateField }) => <DateField label="Ngày giao hàng" minDate={new Date()} required />}
 * />
 * ```
 */
const DateField = lazyField<ComponentProps<typeof DateFieldType>>(() => import('./components/fields/date-field').then(m => ({ default: m.DateField })));
/**
 * A TanStack Form-connected boolean toggle field rendered as a labelled switch,
 * positioned absolutely in the top-right corner of the field card.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { notifications: false } });
 *
 * <form.AppField
 *   name="notifications"
 *   children={({ SwitchField }) => (
 *     <SwitchField
 *       label="Enable notifications"
 *       description="Receive email alerts for important events"
 *       helperText="You can change this at any time"
 *     />
 *   )}
 * />
 * ```
 */
const SwitchField = lazyField<ComponentProps<typeof SwitchFieldType>>(() => import('./components/fields/switch-field').then(m => ({ default: m.SwitchField })));
/**
 * A TanStack Form-connected radio group rendered as selectable option cards (each with an optional
 * description), dimmed while the form is submitting. Stores the chosen option's `value`.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { shipping: null as string | null } });
 *
 * <form.AppField
 *   name="shipping"
 *   children={({ RadioGroupField }) => (
 *     <RadioGroupField
 *       label="Hình thức giao hàng"
 *       options={[
 *         { value: 'standard', label: 'Tiêu chuẩn', description: '3–5 ngày' },
 *         { value: 'express', label: 'Hỏa tốc', description: 'Trong ngày' },
 *       ]}
 *     />
 *   )}
 * />
 * ```
 */
const RadioGroupField = lazyField<ComponentProps<typeof RadioGroupFieldType>>(() =>
  import('./components/fields/radio-group-field').then(m => ({ default: m.RadioGroupField }))
);
/**
 * A TanStack Form-connected checkbox group field that manages an array of selected string values,
 * supporting multi-selection and submission-state disabling.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { roles: [] as string[] } });
 *
 * <form.AppField
 *   name="roles"
 *   children={({ CheckboxField }) => (
 *     <CheckboxField
 *       label="Roles"
 *       options={[
 *         { value: 'admin', label: 'Admin' },
 *         { value: 'editor', label: 'Editor' },
 *       ]}
 *       helperText="Select one or more roles"
 *     />
 *   )}
 * />
 * ```
 */
const CheckboxField = lazyField<ComponentProps<typeof CheckboxFieldType>>(() =>
  import('./components/fields/checkbox-field').then(m => ({ default: m.CheckboxField }))
);

// ─── Simple (minimal) field components (lazy) ─────────────────────────────────

/**
 * Minimal single-line text input bound to the surrounding `AppField`. Use it for compact forms;
 * the non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { fullname: null as string | null } });
 *
 * <form.AppField name="fullname" children={({ SimpleTextField }) => <SimpleTextField label="Họ tên" required maxLength={100} />} />
 * ```
 */
const SimpleTextField = lazyField<ComponentProps<typeof SimpleTextFieldType>>(() =>
  import('./components/atoms/simple-text-field').then(m => ({ default: m.SimpleTextField }))
);
/**
 * Minimal email input bound to the surrounding `AppField`. Use it for compact forms; the
 * non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { email: null as string | null } });
 *
 * <form.AppField name="email" children={({ SimpleEmailField }) => <SimpleEmailField label="Email" placeholder="ban@vidu.com" required />} />
 * ```
 */
const SimpleEmailField = lazyField<ComponentProps<typeof SimpleEmailFieldType>>(() =>
  import('./components/atoms/simple-email-field').then(m => ({ default: m.SimpleEmailField }))
);
/**
 * Minimal password input with a show/hide toggle, bound to the surrounding `AppField`. Use it for
 * compact forms; the non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { password: null as string | null } });
 *
 * <form.AppField name="password" children={({ SimplePasswordField }) => <SimplePasswordField label="Mật khẩu" required />} />
 * ```
 */
const SimplePasswordField = lazyField<ComponentProps<typeof SimplePasswordFieldType>>(() =>
  import('./components/atoms/simple-password-field').then(m => ({ default: m.SimplePasswordField }))
);
/**
 * Minimal multi-line text input bound to the surrounding `AppField`. Use it for compact forms; the
 * non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { note: null as string | null } });
 *
 * <form.AppField name="note" children={({ SimpleTextareaField }) => <SimpleTextareaField label="Ghi chú" rows={4} maxLength={500} />} />
 * ```
 */
const SimpleTextareaField = lazyField<ComponentProps<typeof SimpleTextareaFieldType>>(() =>
  import('./components/atoms/simple-textarea-field').then(m => ({ default: m.SimpleTextareaField }))
);
/**
 * Minimal number input bound to the surrounding `AppField`; stores `number | null`. Use it for
 * compact forms; the non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { weight: null as number | null } });
 *
 * <form.AppField name="weight" children={({ SimpleNumberField }) => <SimpleNumberField label="Cân nặng" unit="kg" />} />
 * ```
 */
const SimpleNumberField = lazyField<ComponentProps<typeof SimpleNumberFieldType>>(() =>
  import('./components/atoms/simple-number-field').then(m => ({ default: m.SimpleNumberField }))
);
/**
 * Minimal single-select dropdown bound to the surrounding `AppField`. Use it for compact forms;
 * the non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { status: null as string | null } });
 *
 * <form.AppField name="status" children={({ SimpleSelectField }) => <SimpleSelectField label="Trạng thái" options={statusOptions} placeholder="Chọn trạng thái" />} />
 * ```
 */
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

/**
 * Minimal boolean field — a checkbox or switch bound to the surrounding `AppField`, with its label
 * and error. Use it for compact forms; the non-`Simple` variants add description, tooltip,
 * orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { notify: null as boolean | null } });
 *
 * <form.AppField name="notify" children={({ SimpleBooleanField }) => <SimpleBooleanField label="Nhận thông báo qua email" variant="switch" />} />
 * ```
 */
const SimpleBooleanField = lazyField<ComponentProps<typeof SimpleBooleanFieldType>>(() =>
  import('./components/atoms/simple-boolean-field').then(m => ({ default: m.SimpleBooleanField }))
);
/**
 * Minimal searchable single-select bound to the surrounding `AppField`. Use it for compact forms;
 * the non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { province: null as string | null } });
 *
 * <form.AppField name="province" children={({ SimpleComboboxField }) => <SimpleComboboxField label="Tỉnh / thành" options={provinces} placeholder="Chọn tỉnh" />} />
 * ```
 */
const SimpleComboboxField = lazyField<ComponentProps<typeof SimpleComboboxFieldType>>(() =>
  import('./components/atoms/simple-combobox-field').then(m => ({ default: m.SimpleComboboxField }))
);
/**
 * Minimal date picker bound to the surrounding `AppField`. Use it for compact forms; the
 * non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { deliveryDate: null as Date | null } });
 *
 * <form.AppField name="deliveryDate" children={({ SimpleDateField }) => <SimpleDateField label="Ngày giao" minDate={new Date()} />} />
 * ```
 */
const SimpleDateField = lazyField<ComponentProps<typeof SimpleDateFieldType>>(() =>
  import('./components/atoms/simple-date-field').then(m => ({ default: m.SimpleDateField }))
);
/**
 * Minimal radio group bound to the surrounding `AppField`. Use it for compact forms; the
 * non-`Simple` variants add description, tooltip, orientation and helper text.
 *
 * @example
 * ```tsx
 * const form = useTanStackForm({ defaultValues: { shipping: null as string | null } });
 *
 * <form.AppField name="shipping" children={({ SimpleRadioGroupField }) => <SimpleRadioGroupField label="Hình thức giao" options={shippingOptions} orientation="horizontal" />} />
 * ```
 */
const SimpleRadioGroupField = lazyField<ComponentProps<typeof SimpleRadioGroupFieldType>>(() =>
  import('./components/atoms/simple-radio-group-field').then(m => ({ default: m.SimpleRadioGroupField }))
);

// ─── Array field layout helpers (lazy, co-located with SimpleArrayField) ──────

/**
 * Layout helper for columns inside a `SimpleArrayField` row. Controls width
 * without repeating `<div className="w-24">` or `<div className="flex-1">`.
 *
 * @example
 * <SimpleArrayField defaultRow={...}>
 *   {i => (
 *     <>
 *       <ArrayCol>                 // flex-1 — takes remaining space
 *         <AppField name={`items[${i}].name`}>...</AppField>
 *       </ArrayCol>
 *       <ArrayCol width={96}>     // 96 px fixed
 *         <AppField name={`items[${i}].qty`}>...</AppField>
 *       </ArrayCol>
 *       <ArrayCol width="8rem">   // CSS string
 *         <AppField name={`items[${i}].tax`}>...</AppField>
 *       </ArrayCol>
 *     </>
 *   )}
 * </SimpleArrayField>
 */
const ArrayCol = lazyField<ComponentProps<typeof ArrayColType>>(() => import('./components/atoms/simple-array-field').then(m => ({ default: m.ArrayCol })));
/**
 * Styled header row for a `SimpleArrayField` table. Place it directly above
 * `<SimpleArrayField>` and use `<ArrayCol>` children with text labels to align
 * headers with their columns. A spacer matching the delete-button width is
 * appended automatically.
 *
 * @example
 * <ArrayHeaderRow>
 *   <ArrayCol>Name</ArrayCol>
 *   <ArrayCol width={96}>Price</ArrayCol>
 *   <ArrayCol width={80}>Qty</ArrayCol>
 * </ArrayHeaderRow>
 * <SimpleArrayField defaultRow={...}>
 *   {i => (...)}
 * </SimpleArrayField>
 */
const ArrayHeaderRow = lazyField<ComponentProps<typeof ArrayHeaderRowType>>(() =>
  import('./components/atoms/simple-array-field').then(m => ({ default: m.ArrayHeaderRow }))
);

// ─── Form containers (lazy) ───────────────────────────────────────────────────

/**
 * Renders a modal dialog that wraps a TanStack Form with a title, scrollable content area, and built-in submit/cancel actions.
 *
 * @example
 * import { TanStackDialogForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackDialogForm
 *   title="Create User"
 *   submitText="Create"
 *   className="max-w-lg"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <NameField />
 *   <EmailField />
 * </TanStackDialogForm>
 */
const TanStackDialogForm = lazyField<ComponentProps<typeof TanStackDialogFormType>>(() =>
  import('./components/forms/dialog-form').then(m => ({ default: m.TanStackDialogForm }))
);
/**
 * Renders a slide-in side-panel dialog that wraps a TanStack form with built-in submit and cancel actions.
 *
 * @example
 * import { TanStackPopoverForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackPopoverForm
 *   title="Edit Profile"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <EmailField />
 * </TanStackPopoverForm>
 */
const TanStackPopoverForm = lazyField<ComponentProps<typeof TanStackPopoverFormType>>(() =>
  import('./components/forms/popover-form').then(m => ({ default: m.TanStackPopoverForm }))
);
/**
 * Wraps a set of TanStack form sections in a vertically-stacked flex container.
 *
 * @example
 * import { TanStackContainerForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackContainerForm>
 *   <TanStackSectionForm title="Personal Info">
 *     {/* fields *\/}
 *   </TanStackSectionForm>
 * </TanStackContainerForm>
 */
const TanStackContainerForm = lazyField<ComponentProps<typeof TanStackContainerFormType>>(() =>
  import('./components/forms/container-form').then(m => ({ default: m.TanStackContainerForm }))
);
/**
 * Renders a card-like form section with a titled header, separator, and a content area for form fields.
 *
 * @example
 * import { TanStackSectionForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackSectionForm title="Account Settings">
 *   <EmailField />
 *   <PasswordField />
 * </TanStackSectionForm>
 */
const TanStackSectionForm = lazyField<ComponentProps<typeof TanStackSectionFormType>>(() =>
  import('./components/forms/section-form').then(m => ({ default: m.TanStackSectionForm }))
);
/**
 * Renders a card-style form section with a header, optional description, a delete button, and a content area for fields.
 *
 * @example
 * import { TanStackCardForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackCardForm
 *   title="Shipping Address"
 *   description="Where should we deliver your order?"
 *   onDelete={() => removeAddress(id)}
 * >
 *   <TextField name="street" />
 * </TanStackCardForm>
 */
const TanStackCardForm = lazyField<ComponentProps<typeof TanStackCardFormType>>(() =>
  import('./components/forms/card-form').then(m => ({ default: m.TanStackCardForm }))
);
/**
 * Renders a labeled field group with an optional description, helper text, and a bottom separator.
 *
 * @example
 * import { TanStackFieldGroup } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackFieldGroup
 *   label="Contact Details"
 *   description="Enter your contact information."
 *   helperText="All fields are required."
 *   orientation="horizontal"
 * >
 *   <EmailField />
 * </TanStackFieldGroup>
 */
const TanStackFieldGroup = lazyField<ComponentProps<typeof TanStackFieldGroupType>>(() =>
  import('./components/forms/group-field').then(m => ({ default: m.TanStackFieldGroup }))
);
/**
 * Renders a standalone section title with an optional description and helper note, followed by a separator.
 *
 * @example
 * import { TanStackTitleField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackTitleField
 *   title="Billing Address"
 *   description="Provide the address associated with your payment method."
 *   helperText="Must match your bank records."
 * />
 */
const TanStackTitleField = lazyField<ComponentProps<typeof TanStackTitleFieldType>>(() =>
  import('./components/forms/title-field').then(m => ({ default: m.TanStackTitleField }))
);
/**
 * Renders a form action bar with a Cancel button and a context-aware submit button (Add New or Update) driven by TanStack Form state.
 *
 * @example
 * import { TanStackActionsForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * // Inside a TanStack Form provider:
 * <TanStackActionsForm type="create" />
 *
 * // For an update workflow:
 * <TanStackActionsForm type="update" />
 */
const TanStackActionsForm = lazyField<ComponentProps<typeof TanStackActionsFormType>>(() =>
  import('./components/forms/actions-form').then(m => ({ default: m.TanStackActionsForm }))
);
/**
 * Renders a submit button wired to the current TanStack Form context, automatically handling loading and disabled states.
 *
 * @example
 * import { TanStackActionSubmit } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * // Inside a TanStack Form provider:
 * <TanStackActionSubmit label="Save Changes" className="mt-4" />
 */
const TanStackActionSubmit = lazyField<ComponentProps<typeof TanStackActionSubmitType>>(() =>
  import('./components/forms/action-submit').then(m => ({ default: m.TanStackActionSubmit }))
);

// ─── Field UI primitives (lazy) ───────────────────────────────────────────────

/**
 * Container `<div>` that groups a set of `Field` rows with container-query support for responsive layouts.
 *
 * @example
 * import { FieldGroup } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldGroup>
 *   <Field>…</Field>
 *   <Field>…</Field>
 * </FieldGroup>
 */
const FieldGroup = lazyField<ComponentProps<typeof FieldGroupType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldGroup })));
/**
 * Single form field row that arranges label, input, and meta elements with configurable orientation.
 *
 * @example
 * import { Field } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <Field orientation="horizontal">
 *   <FieldLabel htmlFor="username">Username</FieldLabel>
 *   <FieldContent><input id="username" /></FieldContent>
 * </Field>
 */
const Field = lazyField<ComponentProps<typeof FieldType>>(() => import('./components/ui/field').then(m => ({ default: m.Field })));
/**
 * Flex column wrapper that houses the primary input control together with description and error slots.
 *
 * @example
 * import { FieldContent } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldContent>
 *   <input type="text" />
 *   <FieldDescription>Enter your full name.</FieldDescription>
 * </FieldContent>
 */
const FieldContent = lazyField<ComponentProps<typeof FieldContentType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldContent })));
/**
 * Styled `<label>` element for a `Field`, extending the base `Label` with field-group-aware spacing and border states.
 *
 * @example
 * import { FieldLabel } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldLabel htmlFor="email" aria-required>Email</FieldLabel>
 */
const FieldLabel = lazyField<ComponentProps<typeof FieldLabelType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldLabel })));
/**
 * Positioned wrapper for the main input element that enables absolutely-placed adornments (icons, spinners).
 *
 * @example
 * import { FieldContentMain } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldContentMain>
 *   <input type="text" className="pr-8" />
 *   <SearchIcon className="absolute right-2 top-2" />
 * </FieldContentMain>
 */
const FieldContentMain = lazyField<ComponentProps<typeof FieldContentMainType>>(() =>
  import('./components/ui/field').then(m => ({ default: m.FieldContentMain }))
);
/**
 * Visual divider row that optionally displays a centered text label, used to separate logical sections within a `FieldGroup`.
 *
 * @example
 * import { FieldSeparator } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldSeparator>or</FieldSeparator>
 */
const FieldSeparator = lazyField<ComponentProps<typeof FieldSeparatorType>>(() => import('./components/ui/field').then(m => ({ default: m.FieldSeparator })));
/**
 * Validation message area (`role="alert"`) for a form field: renders `children`, a single error with
 * an icon, or a list of errors; renders nothing when there is nothing to show.
 */
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
