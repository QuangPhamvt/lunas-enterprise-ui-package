import { sleep } from '@customafk/react-toolkit/utils/sleep';

import { LunasForm } from '@/components/features/lunas-form/lunas-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/Lunas Form',
  component: LunasForm,
  argTypes: {
    formSchema: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof LunasForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValues: {
      textField1: 'Initial text value',
      textareaField1: 'This is some initial text for the textarea field. It can be quite long, up to 3000 characters.',
      numberField1: 42,
      selectField1: 'option2',
      dateField1: new Date('2025-05-15'),
    },
    formSchema: {
      sections: [
        {
          name: 'Section 1',
          fields: [
            {
              id: 'title-field-1',
              type: 'title-field',

              label: 'This is the Title Field',
              description: 'This is the description for the title field.',
              helperText: 'Helper text for the title field.',
            },
            {
              id: 'text-field-1',
              type: 'text-field',

              name: 'textField1',
              camelCaseName: 'textField1',

              label: 'Text Field 1',
              description: 'This is the description for Text Field 1.',
              placeholder: 'Enter text here',

              helperText: 'Helper text for Text Field 1. Max 100 characters. Min 10 characters.',
              showClearButton: true,
              showErrorMessage: true,

              rules: {
                required: true,
                maxLength: 100,
                minLength: 10,
              },
            },
            {
              id: 'textarea-field-1',
              type: 'textarea-field',

              name: 'textareaField1',
              camelCaseName: 'textareaField1',

              label: 'Textarea Field 1',
              description: 'This is the description for Textarea Field 1.',
              placeholder: 'Enter longer text here',

              helperText: 'Helper text for Textarea Field 1. Max 3000 characters. Min 50 characters.',
              showErrorMessage: true,

              rules: {
                required: true,
                maxLength: 3000,
                minLength: 50,
              },
            },
            {
              id: 'number-field-1',
              type: 'number-field',

              name: 'numberField1',
              camelCaseName: 'numberField1',

              label: 'Number Field 1',
              description: 'This is the description for Number Field 1.',
              placeholder: 'Enter a number',

              helperText: 'Helper text for Number Field 1. Must be between 1 and 1000.',
              orientation: 'responsive',
              showErrorMessage: true,
              rounding: 'none',
              decimalPlaces: 5,
              percision: 4,
              unit: '',

              rules: {
                required: true,
                min: {
                  value: 10,
                  inclusive: true,
                },
                max: {
                  value: 1000,
                  inclusive: false,
                },
                integerOnly: true,
                positiveOnly: false,
              },
            },
          ],
        },
        {
          name: 'Section 2',
          fields: [
            {
              id: 'select-field-1',
              type: 'select-field',

              name: 'selectField1',
              camelCaseName: 'selectField1',

              label: 'Select Field 1',
              description: 'This is the description for Select Field 1.',
              placeholder: 'Select an option',

              options: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ],
              helperText: 'Helper text for Select Field 1.',
              orientation: 'responsive',
              clearable: true,

              rules: {
                required: true,
              },
            },
            {
              id: 'date-field-1',
              type: 'date-field',

              name: 'dateField1',
              camelCaseName: 'dateField1',

              label: 'Date Field 1',
              description: 'This is the description for Date Field 1.',
              placeholder: 'Select a date',

              helperText: 'Helper text for Date Field 1.',
              orientation: 'responsive',

              rules: {
                required: true,
                minDate: new Date('2023-01-01'),
                maxDate: new Date('2025-12-31'),
              },
            },
            {
              id: 'switch-field-1',
              type: 'switch-field',

              name: 'switchField1',
              camelCaseName: 'switchField1',

              label: 'Switch Field 1',
              description: 'This is the description for Switch Field 1.',
              defaultValue: true,

              helperText: 'Helper text for Switch Field 1.',
            },
            {
              id: 'radio-group-field-1',
              type: 'radio-group-field',

              name: 'radioGroupField1',
              camelCaseName: 'radioGroupField1',

              label: 'Radio Group Field 1',
              description: 'This is the description for Radio Group Field 1.',

              options: [
                { label: 'Radio Option 1', value: 'radio1', description: 'Description for Radio Option 1' },
                { label: 'Radio Option 2', value: 'radio2', description: 'Description for Radio Option 2' },
                { label: 'Radio Option 3', value: 'radio3', description: 'Description for Radio Option 3' },
              ],

              defaultValue: 'radio2',

              helperText: 'Helper text for Radio Group Field 1.',
              orientation: 'responsive',
            },
            {
              id: 'checkbox-group-field-1',
              type: 'checkbox-group-field',

              name: 'checkboxGroupField1',
              camelCaseName: 'checkboxGroupField1',

              label: 'Checkbox Group Field 1',
              description: 'This is the description for Checkbox Group Field 1.',

              options: [
                { label: 'Checkbox Option 1', value: 'checkbox1' },
                { label: 'Checkbox Option 2', value: 'checkbox2' },
                { label: 'Checkbox Option 3', value: 'checkbox3' },
                { label: 'Checkbox Option 4', value: 'checkbox4' },
                { label: 'Checkbox Option 5', value: 'checkbox5' },
              ],

              defaultValue: ['checkbox1', 'checkbox3'],

              helperText: 'Helper text for Checkbox Group Field 1.',
              orientation: 'responsive',
            },
          ],
        },
      ],
    },

    // onCreate: async value => {
    //   await sleep(2000);
    //   console.log('Form Submitted:', value);
    // },

    onDebounceUpdate: async value => {
      await sleep(5000);
      console.log('Debounce Update:', value);
    },
  },
};
