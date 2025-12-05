import { useMemo } from 'react';

import { nanoid } from 'nanoid';
import type z from 'zod';

import type { formBuilderSchema } from '../schema';
import type { FIELD_ID } from '../types';
import { toCamelCase } from '../utils';

export const useUpdateFieldMapper = (fieldId: string) => {
  const id = nanoid(10);
  const updateFieldMapper = useMemo<Record<FIELD_ID, Partial<z.input<typeof formBuilderSchema>['sections'][number]['fields'][number]>>>(() => {
    return {
      'title-field': {
        id: fieldId,
        type: 'title-field',

        label: 'Title Field',
        description: 'This is a title field',
        helperText: undefined,
      },

      'text-field': {
        id: fieldId,
        type: 'text-field',

        label: 'Text Field',
        placeholder: 'Enter text here',
        description: 'This is a text field',

        counter: false,
        tooltip: undefined,
        orientation: 'responsive',
        helperText: '',
        showClearButton: false,
        showErrorMessage: true,

        dataType: 'text',

        rules: {
          required: true,
          minLength: undefined,
          maxLength: undefined,
        },
      },
      'textarea-field': {
        id: fieldId,
        type: 'textarea-field',

        label: 'Text Area Field',
        placeholder: 'Enter text here',
        description: 'This is a text area field',

        orientation: 'responsive',
        counter: false,
        tooltip: undefined,
        helperText: '',
        showErrorMessage: true,

        rules: {
          required: true,
          minLength: undefined,
          maxLength: undefined,
          exactLength: undefined,
        },
      },
      'number-field': {
        id: fieldId,
        type: 'number-field',

        label: 'Number Field',
        description: 'This is a number field',
        placeholder: '0',
        defaultValue: undefined,

        orientation: 'responsive',
        tooltip: undefined,
        helperText: '',
        rounding: 'none',
        decimalPlaces: undefined,
        percision: undefined,
        unitText: '',
        showErrorMessage: true,

        rules: {
          required: true,
          min: undefined,
          max: undefined,
          integerOnly: false,
          positiveOnly: false,
          exactDigits: undefined,
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

        fields: [
          {
            id: `field-${id}`,
            name: `element-${id}`,
            camelCaseName: toCamelCase(`element-${id}`),
            type: 'empty',
          },
        ],
      },
      empty: {
        id: fieldId,
        label: 'Empty Field',
        type: 'empty',
      },
    };
  }, [fieldId, id]);
  return { updateFieldMapper };
};
