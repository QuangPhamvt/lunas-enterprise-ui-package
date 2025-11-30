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
          ],
        },
      ],
    },
  },
};
