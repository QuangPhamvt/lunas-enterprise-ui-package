import {
  CalendarIcon,
  ChevronDownCircleIcon,
  CircleDotIcon,
  FileSearchIcon,
  HashIcon,
  LayoutListIcon,
  LetterTextIcon,
  ToggleLeftIcon,
  TypeIcon,
  TypeOutlineIcon,
} from 'lucide-react';

import type { FIELD_ID } from '../types';
import { FormBuilderArrayField } from './array-field/field';
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

export const FormBuilderSidberMapper: Record<FIELD_ID, React.ReactNode> = {
  'title-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <TypeOutlineIcon size={16} />
      <p>Title Field</p>
    </div>
  ),
  'text-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <TypeIcon size={16} />
      <p>Text Field</p>
    </div>
  ),
  'textarea-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <LetterTextIcon size={16} />
      <p>TextArea Field</p>
    </div>
  ),
  'number-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <HashIcon size={16} />
      <p>Number Field</p>
    </div>
  ),
  'date-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <CalendarIcon size={16} />
      <p>Date Field</p>
    </div>
  ),
  'switch-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <ToggleLeftIcon size={16} />
      <p>Switch Group Field</p>
    </div>
  ),
  'radio-group-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <CircleDotIcon size={16} />
      <p>Radio Field</p>
    </div>
  ),
  'select-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <ChevronDownCircleIcon size={16} />
      <p>Select Field</p>
    </div>
  ),
  'combobox-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <FileSearchIcon size={16} />
      <p>Combobox Field</p>
    </div>
  ),
  'array-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <LayoutListIcon size={16} />
      <p>Array Field</p>
    </div>
  ),
  empty: <div className="px-2.5 py-2">Empty Field</div>,
};

export const FormBuilderMapper: (sectionIndex: number, fieldId: string) => Record<FIELD_ID, Record<'FIELD' | 'TOOLTIP', React.ReactNode>> = (
  sectionIndex,
  fieldId
) => ({
  'title-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderTitleFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderTitleField fieldId={fieldId} />,
  },
  'text-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderTextFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderTextFieldTooltipFieldRules sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderTextField fieldId={fieldId} />,
  },
  'textarea-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderTextareaFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderTextareaFieldTooltipFieldRules sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderTextareaField fieldId={fieldId} />,
  },
  'number-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderNumberFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNumberFieldTooltipFieldRules sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderNumberField fieldId={fieldId} />,
  },
  'date-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderDateFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderDateField fieldId={fieldId} />,
  },
  'switch-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderSwitchFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderSwitchField fieldId={fieldId} />,
  },
  'radio-group-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderRadioGroupFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderRadioGroupField fieldId={fieldId} />,
  },
  'select-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderSelectFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderSelectField fieldId={fieldId} />,
  },
  'combobox-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderComboboxFieldTooltipFieldType sectionIndex={sectionIndex} fieldId={fieldId} />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderComboboxField fieldId={fieldId} />,
  },
  'array-field': {
    TOOLTIP: (
      <FormBuilderTooltipField>
        <FormBuilderTooltipFieldCopy />
        <FormBuilderTooltipFieldSettings>
          <FormBuilderTooltipFieldSettingsFieldType>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsFieldType>
          <FormBuilderTooltipFieldSettingsRules>
            <FormBuilderNotImplement />
          </FormBuilderTooltipFieldSettingsRules>
        </FormBuilderTooltipFieldSettings>
        <FormBuilderTooltipFieldTrash fieldId={fieldId} />
      </FormBuilderTooltipField>
    ),
    FIELD: <FormBuilderArrayField fieldId={fieldId} />,
  },
  empty: {
    TOOLTIP: 'Empty Field',
    FIELD: (
      <div className="flex h-24 items-center justify-center rounded border border-border border-dashed bg-muted-muted px-2.5 py-2 text-text-positive-weak">
        <p>Empty Field</p>
      </div>
    ),
  },
});
