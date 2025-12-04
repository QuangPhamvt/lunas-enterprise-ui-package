import type { FormAsyncValidateOrFn, FormValidateOrFn, ReactFormExtendedApi } from '@tanstack/react-form';

import type z from 'zod';

import type { formBuilderSchema } from './schema';

type TFormData = z.output<typeof formBuilderSchema>;
type TOnMount = FormValidateOrFn<TFormData>;
type TOnChange = FormValidateOrFn<TFormData>;
type TOnChangeAsync = FormAsyncValidateOrFn<TFormData>;
type TOnBlur = FormValidateOrFn<TFormData>;
type TOnBlurAsync = FormAsyncValidateOrFn<TFormData>;
type TOnSubmit = FormValidateOrFn<TFormData>;
type TOnSubmitAsync = FormAsyncValidateOrFn<TFormData>;
type TOnDynamic = FormValidateOrFn<TFormData>;
type TOnDynamicAsync = FormAsyncValidateOrFn<TFormData>;
type TOnServer = FormAsyncValidateOrFn<TFormData>;
type TSubmitMeta = unknown;

export type DRAGGABLE_FIELD_ID = 'FIELD' | 'SECTION_FIELD' | 'FORM_FIELD' | 'FORM_ARRAY_FIELD';

export type FIELD_ID = 'title-field' | 'text-field' | 'textarea-field' | 'number-field' | 'select-field' | 'date-field' | 'empty';
// | 'switch-field'
// | 'radio-group-field'
// | 'combobox-field'
// | 'array-field'

export type ARRAY_FIELD_ID =
  | 'text-field'
  | 'textarea-field'
  | 'number-field'
  | 'date-field'
  | 'switch-field'
  | 'radio-group-field'
  | 'select-field'
  | 'combobox-field'
  | 'array-field'
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

export type FormBuilderTitleField = FormBuilderFieldBase & {
  type: 'title-field';
};

export type FormBuilderTextField = FormBuilderFieldBase & {
  type: 'text-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;
  showCharacterCount: boolean;
  showClearButton: boolean;
  showErrorMessage: boolean;
  rules: {
    maxLength: number | null;
    minLength: number | null;
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
    maxLength: number | null;
    minLength: number | null;
  };
};

export type FormBuilderNumberField = FormBuilderFieldBase & {
  type: 'number-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;
  showErrorMessage: boolean;

  rules: {
    greaterThan: number | null;
    greaterThanOrEqualTo: number | null;

    lessThan: number | null;
    lessThanOrEqualTo: number | null;

    positive?: boolean;
    negative?: boolean;
  };

  unitText?: string;
};

export type FormBuilderDateField = FormBuilderFieldBase & {
  type: 'date-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;
};

export type FormBuilderSwitchField = FormBuilderFieldBase & {
  type: 'switch-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';

  options: {
    name: string;
    camelCaseName: string;
    label: string;
    description?: string;
  }[];
};

export type FormBuilderRadioGroupField = FormBuilderFieldBase & {
  type: 'radio-group-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';

  options: {
    label: string;
    description?: string;
    value: string;
  }[];
};

export type FormBuilderSelectField = FormBuilderFieldBase & {
  type: 'select-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;

  options: {
    label: string;
    value: string;
  }[];
};

export type FormBuilderComboboxField = FormBuilderFieldBase & {
  type: 'combobox-field';
  orientation: 'horizontal' | 'vertical' | 'responsive';
  placeholder?: string;

  options: {
    label: string;
    value: string;
  }[];
};

export type FormBuilderArrayField = FormBuilderFieldBase & {
  type: 'array-field';
  description?: undefined;
  fields: Array<
    // | (T extends FormBuilderTextField ? FormBuilderTextField : never)
    // | (T extends FormBuilderTextareaField ? FormBuilderTextareaField : never)
    // | (T extends FormBuilderNumberField ? FormBuilderNumberField : never)
    // | (T extends FormBuilderDateField ? FormBuilderDateField : never)
    // | (T extends FormBuilderSwitchField ? FormBuilderSwitchField : never)
    // | (T extends FormBuilderRadioGroupField ? FormBuilderRadioGroupField : never)
    // | (T extends FormBuilderSelectField ? FormBuilderSelectField : never)
    // | (T extends FormBuilderComboboxField ? FormBuilderComboboxField : never)
    // | (T extends FormBuilderArrayField<any> ? FormBuilderArrayField<any> : never)
    // | (T extends FormBuilderEmptyField ? FormBuilderEmptyField : never)
    | FormBuilderTextField
    | FormBuilderTextareaField
    | FormBuilderNumberField
    | FormBuilderDateField
    | FormBuilderSwitchField
    | FormBuilderRadioGroupField
    | FormBuilderSelectField
    | FormBuilderComboboxField
    | FormBuilderArrayField
    | FormBuilderEmptyField
  >;
};

export type FormBuilderEmptyField = FormBuilderFieldBase & {
  type: 'empty';
};

export type FormBuilderField =
  | FormBuilderTitleField
  | FormBuilderTextField
  | FormBuilderTextareaField
  | FormBuilderNumberField
  | FormBuilderDateField
  | FormBuilderSwitchField
  | FormBuilderRadioGroupField
  | FormBuilderSelectField
  | FormBuilderComboboxField
  | FormBuilderArrayField
  | FormBuilderEmptyField;

export type FomrBuilderSection = {
  name: string;
  fields: FormBuilderField[];
};

export type FormBuilderValue = {
  sections: FomrBuilderSection[];
};

export type UseFormBuilderFormContext = ReactFormExtendedApi<
  TFormData,
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TOnDynamic,
  TOnDynamicAsync,
  TOnServer,
  TSubmitMeta
>;
