import { useMemo } from 'react';

import type z from 'zod';

import type { formBuilderSchema } from '../schema';
import type { FIELD_ID } from '../types';

export const useUpdateFieldMapper = (fieldId: string) => {
  const updateFieldMapper = useMemo<Record<FIELD_ID, Partial<z.input<typeof formBuilderSchema>['sections'][number]['fields'][number]>>>(() => {
    return {
      'title-field': {
        id: fieldId,
        label: 'Title Field',
        description: 'This is a title field',
        type: 'title-field',
      },
      'text-field': {
        id: fieldId,
        type: 'text-field',
        orientation: 'responsive',
        label: 'Text Field',
        placeholder: 'Enter text here',
        description: 'This is a text field',

        showClearButton: false,
        showCharacterCount: false,
        showErrorMessage: true,

        rules: {
          minLength: null,
          maxLength: null,
        },
      },
      'textarea-field': {
        id: fieldId,
        type: 'textarea-field',
        orientation: 'responsive',

        label: 'Text Area Field',
        placeholder: 'Enter text here',
        description: 'This is a text area field',
        rows: 4,

        showCharacterCount: false,
        showErrorMessage: true,

        rules: {
          minLength: null,
          maxLength: null,
        },
      },
      'number-field': {
        id: fieldId,
        type: 'number-field',
        orientation: 'responsive',

        label: 'Number Field',
        description: 'This is a number field',
        placeholder: '0',
        unitText: '',

        showErrorMessage: true,

        rules: {
          greaterThan: null,
          greaterThanOrEqualTo: null,

          lessThan: null,
          lessThanOrEqualTo: null,

          positive: false,
          negative: false,
        },
      },
      'date-field': {
        id: fieldId,
        type: 'date-field',
        orientation: 'responsive',

        label: 'Date Field',
        description: 'This is a date field',
        placeholder: 'Select a date',
      },
      'switch-field': {
        id: fieldId,
        type: 'switch-field',
        orientation: 'responsive',

        label: 'Switch Field',
        description: 'This is a switch field',

        options: [],
      },
      'radio-group-field': {
        id: fieldId,
        type: 'radio-group-field',
        orientation: 'responsive',

        label: 'Radio Group Field',
        description: 'This is a radio group field',

        options: [],
      },
      'select-field': {
        id: fieldId,
        type: 'select-field',
        orientation: 'responsive',

        label: 'Select Field',
        description: 'This is a select field',
        placeholder: 'Select an option',

        options: [],
      },
      'combobox-field': {
        id: fieldId,
        type: 'combobox-field',
        orientation: 'responsive',

        label: 'Combo Box Field',
        description: 'This is a combo box field',
        placeholder: 'Select or type an option',

        options: [],
      },
      'array-field': {
        id: fieldId,
        type: 'array-field',

        label: 'Array Field',

        fields: [],
      },
      empty: {
        id: fieldId,
        label: 'Empty Field',
        type: 'empty',
      },
    };
  }, [fieldId]);
  return { updateFieldMapper };
};
