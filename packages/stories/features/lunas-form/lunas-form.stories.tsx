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

              counter: {
                max: 100,
              },
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

              counter: {
                max: 3000,
              },
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
      ],
    },
  },
};
