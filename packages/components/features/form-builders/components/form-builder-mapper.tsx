import {
  CalendarIcon,
  ChevronDownCircleIcon,
  CircleDotIcon,
  FileSearchIcon,
  HashIcon,
  LetterTextIcon,
  ToggleLeftIcon,
  TypeIcon,
  TypeOutlineIcon,
} from 'lucide-react';

import type { FIELD_ID } from '../types';
import { FormBuilderComboboxField } from './combobox-field/field';
import { FormBuilderComboboxFieldTooltipFieldType } from './combobox-field/tooltip';
import { FormBuilderDateField } from './date-field/field';
import { FormBuilderDateFieldTooltipFieldType } from './date-field/tooltip';
import { FormBuilderNotImplement } from './not-implement';
import { FormBuilderNumberField } from './number-field/field';
import { FormBuilderNumberFieldTooltipFieldRules, FormBuilderNumberFieldTooltipFieldType } from './number-field/tooltip';
import { FormBuilderRadioGroupField } from './radio-group-field/field';
import { FormBuilderRadioGroupFieldTooltipFieldType } from './radio-group-field/tooltip';
import { FormBuilderSelectField } from './select-field/field';
import { FormBuilderSelectFieldTooltipFieldType } from './select-field/tooltip';
import { FormBuilderSwitchField } from './switch-field/field';
import { FormBuilderSwitchFieldTooltipFieldType } from './switch-field/tooltip';
import { FormBuilderTextField } from './text-field/field';
import { FormBuilderTextFieldTooltipFieldRules, FormBuilderTextFieldTooltipFieldType } from './text-field/tooltip';
import { FormBuilderTextareaField } from './textarea-field/field';
import { FormBuilderTextareaFieldTooltipFieldRules, FormBuilderTextareaFieldTooltipFieldType } from './textarea-field/tooltip';
import { FormBuilderTitleField } from './title-field/field';
import { FormBuilderTitleFieldTooltipFieldType } from './title-field/tooltip';
import {
  FormBuilderTooltipField,
  FormBuilderTooltipFieldCopy,
  FormBuilderTooltipFieldSettings,
  FormBuilderTooltipFieldSettingsFieldType,
  FormBuilderTooltipFieldSettingsRules,
  FormBuilderTooltipFieldTrash,
} from './tooltip';

export const FormBuilderMapper: (fieldId: string) => Record<FIELD_ID, Record<'FIELD' | 'TOOLTIP' | 'SIDEBAR_FIELD', React.ReactNode>> = fieldId => ({
  'title-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderTitleFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <TypeOutlineIcon size={16} />
        <p>Title Field</p>
      </div>
    ),
    FIELD: <FormBuilderTitleField fieldId={fieldId} />,
  },
  'text-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderTextFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderTextFieldTooltipFieldRules fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <TypeIcon size={16} />
        <p>Text Field</p>
      </div>
    ),
    FIELD: <FormBuilderTextField fieldId={fieldId} />,
  },
  'textarea-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderTextareaFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderTextareaFieldTooltipFieldRules fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <LetterTextIcon size={16} />
        <p>TextArea Field</p>
      </div>
    ),
    FIELD: <FormBuilderTextareaField fieldId={fieldId} />,
  },
  'number-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderNumberFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNumberFieldTooltipFieldRules fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <HashIcon size={16} />
        <p>Number Field</p>
      </div>
    ),
    FIELD: <FormBuilderNumberField fieldId={fieldId} />,
  },
  'date-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderDateFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <CalendarIcon size={16} />
        <p>Date Field</p>
      </div>
    ),
    FIELD: <FormBuilderDateField fieldId={fieldId} />,
  },
  'switch-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderSwitchFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <ToggleLeftIcon size={16} />
        <p>Switch Group Field</p>
      </div>
    ),
    FIELD: <FormBuilderSwitchField fieldId={fieldId} />,
  },
  'radio-group-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderRadioGroupFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <CircleDotIcon size={16} />
        <p>Radio Field</p>
      </div>
    ),
    FIELD: <FormBuilderRadioGroupField fieldId={fieldId} />,
  },
  'select-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderSelectFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <ChevronDownCircleIcon size={16} />
        <p>Select Field</p>
      </div>
    ),
    FIELD: <FormBuilderSelectField fieldId={fieldId} />,
  },
  'combobox-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderComboboxFieldTooltipFieldType fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <FileSearchIcon size={16} />
        <p>Combobox Field</p>
      </div>
    ),
    FIELD: <FormBuilderComboboxField fieldId={fieldId} />,
  },
  empty: {
    TOOLTIP: 'Empty Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Empty Field</div>,
    FIELD: (
      <div className="flex h-24 items-center justify-center rounded border border-border border-dashed bg-muted-muted px-2.5 py-2 text-text-positive-weak">
        <p>Empty Field</p>
      </div>
    ),
  },
});
