// ─── Shared primitives ────────────────────────────────────────────────────────

/** Layout axis for a field's label–input arrangement. */
export type FieldOrientation = 'horizontal' | 'vertical' | 'responsive';

/** Rounding strategy applied to numeric field values. */
export type FieldRounding = 'up' | 'down' | 'nearest' | 'none';

/** A single option in a select, combobox, or checkbox group. */
export type SelectOption = {
  /** Display text shown to the user. */
  label: string;
  /** Internal value submitted with the form. */
  value: string;
};

/** A single option in a radio group, optionally with a supporting description. */
export type RadioOption = {
  /** Display text shown next to the radio button. */
  label: string;
  /** Internal value submitted with the form. */
  value: string;
  /** Optional secondary text rendered below the label. */
  description?: string;
};

// ─── Field value types ────────────────────────────────────────────────────────

/** Value type for text, email, password, textarea, and text-editor fields. `null` means empty. */
export type TextFieldValue = string | null;

/** Value type for number fields. `null` means empty. */
export type NumberFieldValue = number | null;

/** Value type for switch and boolean fields. `null` means unset. */
export type BooleanFieldValue = boolean | null;

/** Value type for date fields. `null` means no date selected. */
export type DateFieldValue = Date | null;

/** Value type for checkbox group fields. `null` means nothing selected. */
export type MultiSelectFieldValue = string[] | null;

// ─── Field props ──────────────────────────────────────────────────────────────

/** Props for {@link TextField} — a single-line text input. */
export type TextFieldProps = {
  /** Field label displayed above or beside the input. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Input placeholder shown when the value is empty. */
  placeholder?: string;
  /** Controls whether the label stacks above or sits beside the input. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** When `true`, displays a character count below the input. */
  counter?: boolean;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the input. */
  helperText?: string;
  /** When `true`, shows an × button to clear the current value. */
  showClearButton?: boolean;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
  /** Maximum number of characters the user may enter. */
  maxLength?: number;
  /** When `true`, disables the input. Also disabled automatically while the form is submitting. */
  disabled?: boolean;
};

/** Props for {@link TextareaField} — a multi-line text input. */
export type TextareaFieldProps = {
  /** Field label displayed above or beside the textarea. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Textarea placeholder shown when the value is empty. */
  placeholder?: string;
  /** Controls whether the label stacks above or sits beside the textarea. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** When `true`, displays a character count below the textarea. */
  counter?: boolean;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the textarea. */
  helperText?: string;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
  /** Maximum number of characters the user may enter. */
  maxLength?: number;
  /** When `true`, disables the textarea. Also disabled automatically while the form is submitting. */
  disabled?: boolean;
};

/** Props for {@link TextEditorField} — a rich-text (WYSIWYG) editor field. */
export type TextEditorFieldProps = {
  /** Field label displayed above the editor. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Placeholder shown inside the editor when the value is empty. */
  placeholder?: string;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the editor. */
  helperText?: string;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
};

/** Props for {@link EmailField} — a text input pre-configured for email addresses. */
export type EmailFieldProps = {
  /** Field label displayed above or beside the input. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Input placeholder shown when the value is empty. */
  placeholder?: string;
  /** Controls whether the label stacks above or sits beside the input. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the input. */
  helperText?: string;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
  /** Maximum number of characters the user may enter. */
  maxLength?: number;
};

/** Props for {@link NumberField} — a numeric input with optional rounding, precision, and unit. */
export type NumberFieldProps = {
  /** Field label displayed above or beside the input. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Input placeholder shown when the value is empty. */
  placeholder?: string;
  /** Controls whether the label stacks above or sits beside the input. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the input. */
  helperText?: string;
  /** Rounding strategy applied when the value changes. Defaults to `'none'`. */
  rounding?: FieldRounding;
  /** Number of decimal places displayed and enforced. */
  decimalPlaces?: number;
  /** Maximum number of significant digits (precision). */
  percision?: number;
  /** Unit label appended to the right of the input (e.g. `'kg'`, `'%'`). */
  unit?: string;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
  /** When `true`, the input accepts negative numbers. Defaults to `false`. */
  allowNegative?: boolean;
};

/** Props for {@link PasswordField} — a text input with a show/hide password toggle. */
export type PasswordFieldProps = {
  /** Field label displayed above or beside the input. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Input placeholder shown when the value is empty. */
  placeholder?: string;
  /** Controls whether the label stacks above or sits beside the input. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the input. */
  helperText?: string;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
};

/** Props for {@link SelectField} — a native-style dropdown for picking one option. */
export type SelectFieldProps = {
  /** Field label displayed above or beside the select. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Placeholder text shown when no option is selected. */
  placeholder?: string;
  /** List of options to display in the dropdown. */
  options: SelectOption[];
  /** Controls whether the label stacks above or sits beside the select. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the select. */
  helperText?: string;
  /** When `true`, shows a button to clear the current selection. Defaults to `false`. */
  clearable?: boolean;
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
  /** When `true`, disables the select. Also disabled automatically while the form is submitting. */
  disabled?: boolean;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
};

/** Props for {@link ComboboxField} — a searchable dropdown with keyboard navigation. On mobile it opens as a bottom drawer. */
export type ComboboxFieldProps = {
  /** Field label displayed above or beside the combobox. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Placeholder shown in the trigger button and the search input when nothing is selected. */
  placeholder?: string;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the combobox. */
  helperText?: string;
  /** Controls whether the label stacks above or sits beside the combobox. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** List of options to display in the dropdown. */
  options: SelectOption[];
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
  /** When `true`, disables the combobox. Also disabled automatically while the form is submitting. */
  disabled?: boolean;
  /** When `true`, shows a button to clear the current selection. Defaults to `false`. */
  clearable?: boolean;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
};

/** Props for {@link RadioGroupField} — a list of mutually exclusive radio buttons. */
export type RadioGroupFieldProps = {
  /** Field label displayed above the radio group. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** List of radio options, each with an optional description. */
  options: RadioOption[];
  /** Controls whether the label stacks above or sits beside the group. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** Helper note rendered below the group. */
  helperText?: string;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
};

/** Props for {@link CheckboxField} — a group of checkboxes for multi-value selection. */
export type CheckboxFieldProps = {
  /** Field label displayed above the checkbox group. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Controls whether the label stacks above or sits beside the group. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** List of checkbox options to display. */
  options: SelectOption[];
  /** Helper note rendered below the group. */
  helperText?: string;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
};

/** Props for {@link SwitchField} — a boolean toggle rendered as a labelled switch. */
export type SwitchFieldProps = {
  /** Field label displayed beside the switch. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Helper note rendered below the switch. */
  helperText?: string;
};

/** Props for {@link DateField} — a calendar date picker with quick-select presets. */
export type DateFieldProps = {
  /** Field label displayed above or beside the picker. */
  label: string;
  /** Secondary text rendered below the label. */
  description?: string;
  /** Placeholder shown in the trigger button when no date is selected. */
  placeholder?: string;
  /** Controls whether the label stacks above or sits beside the picker. Defaults to `'responsive'`. */
  orientation?: FieldOrientation;
  /** Tooltip text shown in an info icon beside the label. */
  tooltip?: string;
  /** Helper note rendered below the picker. */
  helperText?: string;
  /** When `false`, suppresses inline validation error messages. Defaults to `true`. */
  showErrorMessage?: boolean;
  /** Marks the field as required; highlights the label when the value is `null`. */
  required?: boolean;
  /** Earliest selectable date; days before this are hidden in the calendar. */
  minDate?: Date;
  /** Latest selectable date; days after this are hidden in the calendar. */
  maxDate?: Date;
};

// ─── Discriminated union of all field props ───────────────────────────────────

/**
 * Discriminated union of props for every field type, keyed by `fieldType`.
 * Use this when rendering fields dynamically from a config array.
 *
 * @example
 * function renderField(field: AnyFieldProps) {
 *   switch (field.fieldType) {
 *     case 'text': return <TextField {...field} />;
 *     case 'select': return <SelectField {...field} />;
 *     // …
 *   }
 * }
 */
export type AnyFieldProps =
  | ({ fieldType: 'text' } & TextFieldProps)
  | ({ fieldType: 'textarea' } & TextareaFieldProps)
  | ({ fieldType: 'text-editor' } & TextEditorFieldProps)
  | ({ fieldType: 'email' } & EmailFieldProps)
  | ({ fieldType: 'number' } & NumberFieldProps)
  | ({ fieldType: 'password' } & PasswordFieldProps)
  | ({ fieldType: 'select' } & SelectFieldProps)
  | ({ fieldType: 'combobox' } & ComboboxFieldProps)
  | ({ fieldType: 'radio-group' } & RadioGroupFieldProps)
  | ({ fieldType: 'checkbox' } & CheckboxFieldProps)
  | ({ fieldType: 'switch' } & SwitchFieldProps)
  | ({ fieldType: 'date' } & DateFieldProps);

/** The `fieldType` discriminant extracted from {@link AnyFieldProps}. */
export type FieldType = AnyFieldProps['fieldType'];
