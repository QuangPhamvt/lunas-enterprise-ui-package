import { TypeIcon } from 'lucide-react';

import type { FIELD_ID } from '../types';
import { FormBuilderTextField } from './text-field/field';
import { FormBuilderTextFieldTooltipFieldRules, FormBuilderTextFieldTooltipFieldType } from './text-field/tooltip';
import {
  FormBuilderTooltipField,
  FormBuilderTooltipFieldCopy,
  FormBuilderTooltipFieldSettings,
  FormBuilderTooltipFieldSettingsFieldType,
  FormBuilderTooltipFieldSettingsRules,
  FormBuilderTooltipFieldTrash,
} from './tooltip';

export const FormBuilderMapper: (fieldId: string) => Record<FIELD_ID, Record<'FIELD' | 'TOOLTIP' | 'SIDEBAR_FIELD', React.ReactNode>> = fieldId => ({
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
    TOOLTIP: 'Text Area Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Text Area Field</div>,
    FIELD: <div>Text Area Field</div>,
  },
  'number-field': {
    TOOLTIP: 'Number Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Number Field</div>,
    FIELD: <div>Number Field</div>,
  },
  'date-field': {
    TOOLTIP: 'Date Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Date Field</div>,
    FIELD: <div>Date Field</div>,
  },
  'switch-field': {
    TOOLTIP: 'Switch Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Switch Field</div>,
    FIELD: <div>Switch Field</div>,
  },
  'radio-group-field': {
    TOOLTIP: 'Radio Group Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Radio Group Field</div>,
    FIELD: <div>Radio Group Field</div>,
  },
  'select-field': {
    TOOLTIP: 'Select Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Select Field</div>,
    FIELD: <div>Select Field</div>,
  },
  'combobox-field': {
    TOOLTIP: 'Combobox Field',
    SIDEBAR_FIELD: <div className="px-2.5 py-2">Combobox Field</div>,
    FIELD: <div>Combobox Field</div>,
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
