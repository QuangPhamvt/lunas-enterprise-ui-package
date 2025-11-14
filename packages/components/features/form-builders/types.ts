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
  name: string;
  camelCaseName: string;
  label: string;
  description?: string;
};

export type FormBuilderTextField = FormBuilderFieldBase & {
  type: 'text-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;
  showCharacterCount: boolean;
  showClearButton: boolean;
  showErrorMessage: boolean;
  rules: {
    maxLength?: number;
    minLength?: number;
  };
};

export type FormBuilderTextareaField = FormBuilderFieldBase & {
  type: 'textarea-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;
  rows?: number;
  showCharacterCount: boolean;
  showErrorMessage: boolean;
  rules: {
    maxLength?: number;
    minLength?: number;
  };
};

export type FormBuilderNumberField = FormBuilderFieldBase & {
  type: 'number-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;
};

export type FormBuilderDateField = FormBuilderFieldBase & {
  type: 'date-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
};

export type FormBuilderSwitchField = FormBuilderFieldBase & {
  type: 'switch-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
};

export type FormBuilderRadioGroupField = FormBuilderFieldBase & {
  type: 'radio-group-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
};

export type FormBuilderSelectField = FormBuilderFieldBase & {
  type: 'select-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
};

export type FormBuilderComboboxField = FormBuilderFieldBase & {
  type: 'combobox-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
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
  name: string;
  description?: string;
  form: FormBuilderField[];
};
