export type DRAGGABLE_FIELD_ID = 'FIELD' | 'FORM_FIELD';

export type FIELD_ID =
  | 'text-field'
  | 'textarea-field'
  | 'number-field'
  | 'date-field'
  | 'switch-field'
  | 'radio-group-field'
  | 'select-field'
  | 'combobox-field'
  | 'empty';

export type FIELD = 'FIELD';

export type FORM_BUILDER = 'FORM_BUILDER';

export type FormBuilderFieldBase = {
  id: string;
  label: string;
  description?: string;
};

export type FormBuilderTextField = FormBuilderFieldBase & {
  type: 'text-field';
  placeholder?: string;
};

export type FormBuilderTextareaField = FormBuilderFieldBase & {
  type: 'textarea-field';
  placeholder?: string;
  rows?: number;
};

export type FormBuilderNumberField = FormBuilderFieldBase & {
  type: 'number-field';
  placeholder?: string;
};

export type FormBuilderDateField = FormBuilderFieldBase & {
  type: 'date-field';
};

export type FormBuilderSwitchField = FormBuilderFieldBase & {
  type: 'switch-field';
};

export type FormBuilderRadioGroupField = FormBuilderFieldBase & {
  type: 'radio-group-field';
};

export type FormBuilderSelectField = FormBuilderFieldBase & {
  type: 'select-field';
};

export type FormBuilderComboboxField = FormBuilderFieldBase & {
  type: 'combobox-field';
};

export type FormBuilderEmptyField = FormBuilderFieldBase & {
  type: 'empty';
};

export type FormBuilderField =
  | FormBuilderTextField
  | FormBuilderTextareaField
  | FormBuilderNumberField
  | FormBuilderDateField
  | FormBuilderSwitchField
  | FormBuilderRadioGroupField
  | FormBuilderSelectField
  | FormBuilderComboboxField
  | FormBuilderEmptyField;

export type FormBuilderValue = {
  id: string;
  name: string;
  form: FormBuilderField[];
};
