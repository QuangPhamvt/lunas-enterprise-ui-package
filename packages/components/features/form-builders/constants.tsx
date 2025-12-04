import { CalendarIcon, ChevronDownCircleIcon, HashIcon, LetterTextIcon, TypeIcon, TypeOutlineIcon } from 'lucide-react';

import type { FIELD, FIELD_ID, FORM_BUILDER } from './types';

export type TFormBuilderField = {
  id: FIELD_ID;
  tab: 'TYPOGRAPHY' | 'FORM_FIELDS';
  accepts: (FIELD | FORM_BUILDER)[];
};

export const FORM_BUILDER_FIELD: TFormBuilderField[] = [
  {
    id: 'title-field',
    tab: 'TYPOGRAPHY',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'text-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'textarea-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'number-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'select-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'date-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  // {
  //   id: 'switch-field',
  //   tab: 'FORM_FIELDS',
  //   accepts: ['FIELD', 'FORM_BUILDER'],
  // },
  // {
  //   id: 'radio-group-field',
  //   tab: 'FORM_FIELDS',
  //   accepts: ['FIELD', 'FORM_BUILDER'],
  // },
  // {
  //   id: 'combobox-field',
  //   tab: 'FORM_FIELDS',
  //   accepts: ['FIELD', 'FORM_BUILDER'],
  // },
  // {
  //   id: 'array-field',
  //   tab: 'FORM_FIELDS',
  //   accepts: ['FIELD', 'FORM_BUILDER'],
  // },
];

export const FORM_BUILDER_FIELD_MAPPER: Record<FIELD_ID, React.ReactNode> = {
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
  'select-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <ChevronDownCircleIcon size={16} />
      <p>Select Field</p>
    </div>
  ),
  'date-field': (
    <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
      <CalendarIcon size={16} />
      <p>Date Field</p>
    </div>
  ),
  // 'switch-field': (
  //   <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
  //     <ToggleLeftIcon size={16} />
  //     <p>Switch Group Field</p>
  //   </div>
  // ),
  // 'radio-group-field': (
  //   <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
  //     <CircleDotIcon size={16} />
  //     <p>Radio Field</p>
  //   </div>
  // ),
  // 'combobox-field': (
  //   <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
  //     <FileSearchIcon size={16} />
  //     <p>Combobox Field</p>
  //   </div>
  // ),
  // 'array-field': (
  //   <div className="flex items-center space-x-1 px-2.5 py-2 text-sm">
  //     <LayoutListIcon size={16} />
  //     <p>Array Field</p>
  //   </div>
  // ),
  empty: <div className="px-2.5 py-2">Empty Field</div>,
};
