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
} from 'lucide-react';

import type { ARRAY_FIELD_ID } from '../../types';
import { FormBuilderArrayField } from './field';

export const ArrayFieldMapper: (fieldId: string) => Record<ARRAY_FIELD_ID, Record<'FIELD' | 'TOOLTIP' | 'SIDEBAR_FIELD', React.ReactNode>> = fieldId => ({
  'text-field': {
    TOOLTIP: <div>Text Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <TypeIcon size={16} />
        <p>Text Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderTextField with fieldId: {fieldId}</div>,
  },
  'textarea-field': {
    TOOLTIP: <div>TextArea Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <LetterTextIcon size={16} />
        <p>TextArea Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderTextareaField with fieldId: {fieldId}</div>,
  },
  'number-field': {
    TOOLTIP: <div>Number Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <HashIcon size={16} />
        <p>Number Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderNumberField with fieldId: {fieldId}</div>,
  },
  'date-field': {
    TOOLTIP: <div>Date Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <CalendarIcon size={16} />
        <p>Date Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderDateField with fieldId: {fieldId}</div>,
  },
  'switch-field': {
    TOOLTIP: <div>Switch Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <ToggleLeftIcon size={16} />
        <p>Switch Group Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderSwitchField with fieldId: {fieldId}</div>,
  },
  'radio-group-field': {
    TOOLTIP: <div>Radio Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <CircleDotIcon size={16} />
        <p>Radio Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderRadioGroupField with fieldId: {fieldId}</div>,
  },
  'select-field': {
    TOOLTIP: <div>Select Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <ChevronDownCircleIcon size={16} />
        <p>Select Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderSelectField with fieldId: {fieldId}</div>,
  },
  'combobox-field': {
    TOOLTIP: <div>Combobox Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <FileSearchIcon size={16} />
        <p>Combobox Field</p>
      </div>
    ),
    FIELD: <div>FormBuilderComboboxField with fieldId: {fieldId}</div>,
  },
  'array-field': {
    TOOLTIP: <div>Array Field Tooltip</div>,
    SIDEBAR_FIELD: (
      <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
        <LayoutListIcon size={16} />
        <p>Array Field</p>
      </div>
    ),
    FIELD: <FormBuilderArrayField fieldId={fieldId} />,
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
